"use server"

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCurrentUser, assert } from '@/lib/auth'

export async function updateUserRole(id: number, role: 'DEVELOPER' | 'ADMIN' | 'USER') {
  'use server'
  const me = await getCurrentUser()
  assert(!!me, 'Not authenticated')
  // Admin can only set USER; Developer can set any
  if (me.role === 'ADMIN' && role !== 'USER') throw new Error('Admins can only assign USER role')
  if (me.role === 'USER') throw new Error('Not authorized')
  await prisma.user.update({ where: { id }, data: { role } })
  revalidatePath('/users')
  revalidatePath('/')
}

export async function updateUserRoleAction(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  const role = String(formData.get('role')) as any
  if (!Number.isNaN(id) && (role === 'DEVELOPER' || role === 'ADMIN' || role === 'USER')) {
    await updateUserRole(id, role)
  }
}
