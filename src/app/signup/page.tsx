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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 hover:shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h1>
        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md p-3">
            {decodeURIComponent(error)}
          </div>
        )}
        <form action={handleSubmit} className="space-y-5">
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
              autoComplete="new-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              name="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="DEVELOPER">Developer</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-medium rounded-lg py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          <Link className="text-blue-600 hover:underline font-medium" href="/login">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}