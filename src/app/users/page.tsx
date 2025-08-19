// Import Prisma client accessor for database queries
import { prisma } from "@/lib/prisma";
// Import server actions to create and delete users
import { createUserAction, deleteUserAction } from '@/app/actions/userActions';
import { updateUserRoleAction } from '@/app/actions/roleActions';
import { impersonateUser } from '@/app/actions/impersonationActions';
import { changePasswordAction } from '@/app/actions/userActions';
import { assignTaskOwnerAction, unassignTaskOwnerAction, updateTaskFieldsAction } from '@/app/actions/taskActions';
// Import Next.js helper to revalidate cache for /users path after mutations
import { revalidatePath } from "next/cache";
import { getCurrentUser } from '@/lib/auth'

// UserManagementPage lists users and provides simple form actions to add or delete users
export default async function UserManagementPage() {
  const me = await getCurrentUser()
  // Initialize users array with expected shape
  let users: { id: number; name: string; email: string | null; role?: 'DEVELOPER'|'ADMIN'|'USER' }[] = [];
  // Access the Prisma user model (allows mocking by reading from prisma as any)
  const userClient = (prisma as any).user;

  // If the Prisma client is available, fetch users from the database
  if (userClient?.findMany) {
    // Query for recent users selecting only needed fields
    users = await userClient.findMany({
      select: { id: true, name: true, email: true, role: true },
      orderBy: { id: 'desc' },
    });
  }

  // Fetch tasks to populate Common pool and per-user lists
  let tasks: { id: number; title: string; ownerId: number | null; status: 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK'; dueDate: Date | null }[] = []
  const taskClient = (prisma as any).task
  if (taskClient?.findMany) {
    tasks = await taskClient.findMany({
      select: { id: true, title: true, ownerId: true, status: true, dueDate: true },
      orderBy: { id: 'desc' },
    })
  }

  const isPrivileged = !!me && (me.role === 'ADMIN' || me.role === 'DEVELOPER')
  const commonTasks = tasks.filter((t) => t.ownerId == null)

  // Render the page UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">User Management</h1>

        {/* Common pool: visible to Admin/Developer only */}
        {isPrivileged && (
          <div className="bg-white shadow-lg rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Common Tasks</h2>
            {commonTasks.length === 0 ? (
              <p className="text-sm text-gray-500">No unassigned tasks.</p>
            ) : (
              <div className="space-y-3">
                {commonTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between border rounded-lg px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-xs text-gray-500">ID: {task.id}</div>
                    </div>
                    <form action={assignTaskOwnerAction} className="flex items-center space-x-2">
                      <input type="hidden" name="taskId" value={task.id} />
                      <select
                        name="userId"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Assign to…
                        </option>
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name} {u.role ? `(${u.role})` : ''}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                      >
                        Assign
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Per-user task lists */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Tasks</h2>
          {!me ? (
            <p className="text-sm text-gray-500">Sign in to view tasks.</p>
          ) : (
            <div className="space-y-8">
              {(isPrivileged ? users : users.filter((u) => u.id === me.id)).map((u) => {
                const userTasks = tasks.filter((t) => t.ownerId === u.id)
                return (
                  <div key={u.id}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{u.name} {u.role ? `(${u.role})` : ''}</h3>
                      <div className="text-xs text-gray-500">{userTasks.length} task(s)</div>
                    </div>
                    {userTasks.length === 0 ? (
                      <p className="text-sm text-gray-500">No tasks.</p>
                    ) : (
                      <ul className="divide-y divide-gray-100 border rounded-lg">
                        {userTasks.map((task) => (
                          <li key={task.id} className="flex items-center justify-between px-4 py-3 gap-4">
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">{task.title}</div>
                              <div className="text-xs text-gray-500">Status: {task.status}{task.dueDate ? ` • Due ${new Date(task.dueDate).toLocaleDateString()}` : ''}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Limited edit form: status + due date for the task owner */}
                              <form action={updateTaskFieldsAction} className="flex items-center gap-2">
                                <input type="hidden" name="taskId" value={task.id} />
                                <select
                                  name="status"
                                  defaultValue={task.status}
                                  className="border border-gray-300 rounded-md px-2 py-1 text-xs"
                                  disabled={!me || (me.id !== u.id && !isPrivileged)}
                                >
                                  <option value="NOT_STARTED">NOT_STARTED</option>
                                  <option value="WORKING_ON_IT">WORKING_ON_IT</option>
                                  <option value="STUCK">STUCK</option>
                                  <option value="DONE">DONE</option>
                                </select>
                                <input
                                  type="date"
                                  name="dueDate"
                                  defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ''}
                                  className="border border-gray-300 rounded-md px-2 py-1 text-xs"
                                  disabled={!me || (me.id !== u.id && !isPrivileged)}
                                />
                                <button
                                  type="submit"
                                  className="px-3 py-1.5 text-xs rounded-md bg-gray-800 text-white disabled:opacity-50"
                                  disabled={!me || (me.id !== u.id && !isPrivileged)}
                                >
                                  Save
                                </button>
                              </form>
                              {isPrivileged && (
                                <form action={unassignTaskOwnerAction}>
                                  <input type="hidden" name="taskId" value={task.id} />
                                  <button type="submit" className="px-3 py-1.5 text-xs rounded-md border border-gray-300 hover:bg-gray-100">Unassign</button>
                                </form>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Existing user creation */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-12">
          {/* Section header for the create user form */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New User</h2>
          {/* Form posts to a server action to create a user, then revalidates the /users page */}
          <form action={async (formData) => {
            "use server";
            await createUserAction(formData);
            revalidatePath("/users");
          }} className="space-y-6">
            {/* Name field */}
            <div>
              {/* Label for the user's full name */}
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>
            {/* Optional email */}
            <div>
              {/* Label for the optional email address */}
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                placeholder="john.doe@example.com"
              />
            </div>
            {/* Role selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                id="role"
                name="role"
                defaultValue={me?.role === 'USER' ? 'USER' : 'USER'}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              >
                <option value="USER">USER</option>
                <option value="ADMIN" disabled={!!me && me.role === 'ADMIN'}>ADMIN</option>
                <option value="DEVELOPER" disabled={!!me && me.role !== 'DEVELOPER'}>DEVELOPER</option>
              </select>
            </div>
            {/* Optional initial password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                placeholder="Set a password"
              />
            </div>
            {/* Submit button to trigger user creation */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium rounded-lg py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Add User
            </button>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8">
          {/* Section header for existing users list */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Existing Users</h2>
          <p className="text-sm text-gray-600 mb-6">Signed in as: <span className="font-medium">{me?.name ?? 'Guest'}</span> {me?.role ? `(${me.role})` : ''}</p>
          {/* If there are no users, show an empty state; otherwise render the table */}
          {users.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    {/* Created At column removed since User table no longer has timestamps */}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email || '-'}</div>
                      </td>
                      {/* Created At cell removed */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.role ?? 'USER'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          {/* Impersonate */}
                          <form action={async () => { "use server"; await impersonateUser(user.id); revalidatePath('/users') }}>
                            <button className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition duration-200" disabled={!me || me.role === 'USER'}>Use</button>
                          </form>
                          {/* Role select (Dev can set any; Admin can set USER only) */}
                          <form action={updateUserRoleAction} className="flex items-center space-x-2">
                            <input type="hidden" name="id" value={user.id} />
                            <select 
                              name="role" 
                              defaultValue={user.role ?? 'USER'} 
                              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                              disabled={!me || (me.role === 'ADMIN' && user.role !== 'USER') || me.role === 'USER'}
                            >
                              <option value="USER">USER</option>
                              <option value="ADMIN">ADMIN</option>
                              <option value="DEVELOPER">DEVELOPER</option>
                            </select>
                            <button 
                              type="submit" 
                              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                              disabled={!me || me.role === 'USER'}
                            >
                              Save
                            </button>
                          </form>
                          {/* Change Password (self, Admin, Dev) */}
                          <form action={async (formData) => { "use server"; await changePasswordAction(formData); revalidatePath('/users') }} className="flex items-center space-x-2">
                            <input type="hidden" name="id" value={user.id} />
                            <input 
                              type="password" 
                              name="password" 
                              placeholder="New password" 
                              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400" 
                            />
                            <button 
                              type="submit" 
                              className="px-4 py-2 text-sm rounded-md bg-gray-600 text-white hover:bg-gray-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={!me || (me.id !== user.id && me.role === 'USER')}
                            >
                              Set
                            </button>
                          </form>
                          {/* Inline delete form per user, calls server action then revalidates */}
                          <form action={async (formData) => {
                            "use server";
                            await deleteUserAction(formData);
                            revalidatePath("/users");
                          }}>
                            {/* Hidden field to pass the user's id to the server action */}
                            <input type="hidden" name="id" value={user.id} />
                            {/* Submit button to delete the user */}
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={!me || me.role === 'USER'}
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}