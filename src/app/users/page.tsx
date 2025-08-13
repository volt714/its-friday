import { prisma } from "@/lib/prisma";
import { createUserAction, deleteUserAction } from "@/app/actions";
import { revalidatePath } from "next/cache";

// UserManagementPage lists users and provides simple form actions to add or delete users
export default async function UserManagementPage() {
  let users: { id: number; name: string; email: string | null; createdAt: Date }[] = [];
  const userClient = (prisma as any).user;

  if (userClient?.findMany) {
    users = await userClient.findMany({
      select: { id: true, name: true, email: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New User</h2>
        <form action={async (formData) => {
          "use server";
          await createUserAction(formData);
          revalidatePath("/users");
        }} className="space-y-4">
          {/* Name field */}
          <div>
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="john.doe@example.com"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add User
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Users</h2>
        {users.length === 0 ? (
          <p className="text-gray-600">No users found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {users.map((user) => (
              <li key={user.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-900">{user.name}</p>
                  {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
                </div>
                <form action={async (formData) => {
                  "use server";
                  await deleteUserAction(formData);
                  revalidatePath("/users");
                }}>
                  <input type="hidden" name="id" value={user.id} />
                  <button
                    type="submit"
                    className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
