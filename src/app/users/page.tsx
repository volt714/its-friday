// Import Prisma client accessor for database queries
import { prisma } from "@/lib/prisma";
// Import server actions to create and delete users
import { createUserAction, deleteUserAction, updateUserRoleAction, impersonateUser } from "@/app/actions";
// Import Next.js helper to revalidate cache for /users path after mutations
import { revalidatePath } from "next/cache";
import { getCurrentUser } from '@/lib/auth'

// UserManagementPage lists users and provides simple form actions to add or delete users
export default async function UserManagementPage() {
  const me = await getCurrentUser()
  // Initialize users array with expected shape
  let users: { id: number; name: string; email: string | null; createdAt: Date; role?: 'DEVELOPER'|'ADMIN'|'USER' }[] = [];
  // Access the Prisma user model (allows mocking by reading from prisma as any)
  const userClient = (prisma as any).user;

  // If the Prisma client is available, fetch users from the database
  if (userClient?.findMany) {
    // Query for recent users selecting only needed fields
    users = await userClient.findMany({
      select: { id: true, name: true, email: true, createdAt: true, role: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Render the page UI
  return (
    <div className="container mx-auto p-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        {/* Section header for the create user form */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New User</h2>
        {/* Form posts to a server action to create a user, then revalidates the /users page */}
        <form action={async (formData) => {
          "use server";
          await createUserAction(formData);
          revalidatePath("/users");
        }} className="space-y-4">
          {/* Name field */}
          <div>
            {/* Label for the user's full name */}
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          {/* Optional email */}
          <div>
            {/* Label for the optional email address */}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="john.doe@example.com"
            />
          </div>
          {/* Optional initial password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Initial Password (Optional)</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Set a temporary password"
            />
          </div>
          {/* Submit button to trigger user creation */}
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add User
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {/* Section header for existing users list */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Existing Users</h2>
        <p className="text-sm text-gray-600 mb-4">Signed in as: <span className="font-medium">{me?.name ?? 'Guest'}</span> {me?.role ? `( ${me.role} )` : ''}</p>
        {/* If there are no users, show an empty state; otherwise render the list */}
        {users.length === 0 ? (
          <p className="text-gray-600">No users found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {/* Iterate and render each user row */}
            {users.map((user) => (
              <li key={user.id} className="py-4 flex items-center justify-between">
                <div>
                  {/* User display name */}
                  <p className="text-lg font-medium text-gray-900">{user.name}</p>
                  {/* Show email only when provided */}
                  {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
                </div>
                <div className="flex items-center gap-2">
                  {/* Impersonate */}
                  <form action={async () => { "use server"; await impersonateUser(user.id); revalidatePath('/users') }}>
                    <button className="px-3 py-1.5 text-sm rounded border">Use</button>
                  </form>
                  {/* Role select (Dev can set any; Admin can set USER only) */}
                  <form action={updateUserRoleAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={user.id} />
                    <select name="role" defaultValue={user.role ?? 'USER'} className="border rounded px-2 py-1 text-sm"
                      disabled={!me || (me.role === 'ADMIN' && user.role !== 'USER') || me.role === 'USER'}>
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="DEVELOPER">DEVELOPER</option>
                    </select>
                    <button type="submit" className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white disabled:opacity-50" disabled={!me || me.role === 'USER'}>Save</button>
                  </form>
                  {/* Change Password (self, Admin, Dev) */}
                  <form action={async (formData) => { "use server"; const { changePasswordAction } = await import('@/app/actions'); await changePasswordAction(formData); revalidatePath('/users') }} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={user.id} />
                    <input type="password" name="password" placeholder="New password" className="border rounded px-2 py-1 text-sm" />
                    <button type="submit" className="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200"
                      disabled={!me || (me.id !== user.id && me.role === 'USER')}>Set</button>
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
                      className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      disabled={!me || me.role === 'USER'}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
