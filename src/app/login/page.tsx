import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage({ searchParams }: { searchParams: any }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 hover:shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h1>
        {searchParams?.error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md p-3">
            {decodeURIComponent(Array.isArray(searchParams.error) ? searchParams.error[0] : searchParams.error)}
          </div>
        )}
        {searchParams?.success && (
          <div className="mb-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md p-3">
            {decodeURIComponent(Array.isArray(searchParams.success) ? searchParams.success[0] : searchParams.success)}
          </div>
        )}
        <form
          action={async (formData: FormData) => {
            'use server';
            const name = String(formData.get('name') || '').trim();
            const password = String(formData.get('password') || '');
            if (!name || !password) redirect('/login?error=' + encodeURIComponent('Missing credentials'));
            const crypto = await import('crypto');
            const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
            const user = await (prisma as any).user?.findFirst?.({ where: { name, passwordHash }, select: { id: true } });
            if (!user) redirect('/login?error=' + encodeURIComponent('Invalid credentials'));
            const { cookies } = await import('next/headers');
            const store = await cookies();
            store.set('uid', String(user.id), { httpOnly: false, sameSite: 'lax', path: '/' });
            revalidatePath('/');
            redirect('/');
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              name="name"
              required
              autoComplete="username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="develop123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium rounded-lg py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="text-xs text-gray-500 mt-4 text-center">Default Developer: develop123 / Test123</div>
        <div className="mt-6 text-sm flex justify-between">
          <Link className="text-blue-600 hover:underline font-medium" href="/">
            Back to Home
          </Link>
          <Link className="text-blue-600 hover:underline font-medium" href="/signup">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}