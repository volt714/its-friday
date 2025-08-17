'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createUserAction } from '../actions'
import Link from 'next/link'

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState('USER')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      const result = await createUserAction(formData)
      if (result?.success) {
        router.push('/login?success=' + encodeURIComponent(result.message))
      }
    } catch (error: any) {
      router.push('/signup?error=' + encodeURIComponent(error.message || 'Failed to create user'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Sign up</h1>
        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {decodeURIComponent(error)}
          </div>
        )}
        <form action={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input name="name" required autoComplete="username" className="w-full border rounded px-3 py-2 text-sm" placeholder="develop123" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input name="password" type="password" required autoComplete="new-password" className="w-full border rounded px-3 py-2 text-sm" placeholder="••••••" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="DEVELOPER">Developer</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        <div className="mt-3 text-sm">
          <Link className="text-blue-600 hover:underline" href="/login">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  )
}
