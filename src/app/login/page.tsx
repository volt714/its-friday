import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Sign in</h1>
        {searchParams?.error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {decodeURIComponent(searchParams.error)}
          </div>
        )}
        <form action={async (formData: FormData) => {
          'use server'
          const name = String(formData.get('name') || '').trim()
          const password = String(formData.get('password') || '')
          if (!name || !password) redirect('/login?error=' + encodeURIComponent('Missing credentials'))
          const crypto = await import('crypto')
          const passwordHash = crypto.createHash('sha256').update(password).digest('hex')
          const user = await (prisma as any).user?.findFirst?.({ where: { name, passwordHash }, select: { id: true } })
          if (!user) redirect('/login?error=' + encodeURIComponent('Invalid credentials'))
          const { cookies } = await import('next/headers')
          const store = await cookies()
          store.set('uid', String(user.id), { httpOnly: false, sameSite: 'lax', path: '/' })
          revalidatePath('/')
          redirect('/')
        }} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input name="name" required autoComplete="username" className="w-full border rounded px-3 py-2 text-sm" placeholder="develop123" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input name="password" type="password" required autoComplete="current-password" className="w-full border rounded px-3 py-2 text-sm" placeholder="••••••" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700">Sign in</button>
        </form>
        <div className="text-xs text-gray-500 mt-3">Default Developer: develop123 / Test123</div>
        <div className="mt-3 text-sm">
          <Link className="text-blue-600 hover:underline" href="/">Back to home</Link>
        </div>
      </div>
    </div>
  )
}


