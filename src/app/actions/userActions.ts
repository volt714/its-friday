"use server"

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCurrentUser, canCreateOrDeleteEntities, canManageUsers, assert } from '@/lib/auth'
import crypto from 'crypto'

export async function createUser(data: { name: string; email?: string | null; role?: 'DEVELOPER' | 'ADMIN' | 'USER'; password?: string | null }) {
  'use server'
  const { name, email, role, password } = data
  // Validate required fields
  if (!name || !password) {
    throw new Error('Name and password are required')
  }
  // For signup (unauthenticated), allow any role
  // For authenticated users creating other users, enforce role hierarchy
  const me = await getCurrentUser()
  let roleToSet: 'DEVELOPER' | 'ADMIN' | 'USER'
  if (!me) {
    // Signup case - allow any role
    roleToSet = role || 'USER'
  } else {
    // Authenticated user creating another user - enforce restrictions
    roleToSet = role || 'USER'
    if (me.role === 'ADMIN' && roleToSet !== 'USER') {
      throw new Error('Admins can only assign USER role')
    }
  }
  // Always hash the password since it's required
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex')
  try {
    await prisma.user.create({ 
        data: { 
          name: name.trim(), 
          email: email ?? null, 
          role: roleToSet, 
          passwordHash 
        } 
      })
    revalidatePath('/')
  } catch (error: any) {
    if (error.code === 'P2002' || error.message?.includes('Duplicate entry')) {
      throw new Error(`User with email "${email}" already exists`)
    }
    throw new Error(`Failed to create user: ${error.message || 'Unknown error'}`)
  }
}

export async function deleteUser(id: number) {
  'use server'
  const me = await getCurrentUser()
  assert(!!me, 'Not authenticated')
  // Fetch target to enforce role hierarchy
  const target = await prisma.user.findUnique({ where: { id }, select: { role: true } })
  if (target) {
    assert(canManageUsers(me.role, target.role), 'Not authorized')
  } else {
    assert(me.role === 'DEVELOPER' || me.role === 'ADMIN', 'Not authorized')
  }
  await prisma.user.delete({ where: { id } })
  revalidatePath('/')
}

export async function createUserAction(formData: FormData) {
  'use server'
  const name = String(formData.get('name') || '').trim()
  const emailRaw = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '').trim()
  if (!password) {
    throw new Error('Password is required')
  }
  const role = String(formData.get('role') || 'USER') as 'DEVELOPER' | 'ADMIN' | 'USER'
  try {
    await createUser({ name, email: emailRaw || null, password, role })
    return { success: true, message: 'Account created successfully. Please sign in.' }
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create user')
  }
}

export async function deleteUserAction(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  if (!Number.isNaN(id)) {
    await deleteUser(id)
  }
}

export async function changePassword(userId: number, newPassword: string) {
  'use server'
  const me = await getCurrentUser()
  assert(!!me, 'Not authenticated')
  if (me.id !== userId && me.role === 'USER') throw new Error('Not authorized')
  const passwordHash = crypto.createHash('sha256').update(newPassword).digest('hex')
  await prisma.user.update({ where: { id: userId }, data: { passwordHash } })
  revalidatePath('/users')
}

export async function changePasswordAction(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  const password = String(formData.get('password') || '')
  if (!Number.isNaN(id) && password) {
    await changePassword(id, password)
  }
}

export async function signOutAction() {
  'use server'
  const { cookies } = await import('next/headers')
  const store = await cookies()
  store.delete('uid')
  const { revalidatePath } = await import('next/cache')
  revalidatePath('/')
  revalidatePath('/users')
  const { redirect } = await import('next/navigation')
  redirect('/login')
}
