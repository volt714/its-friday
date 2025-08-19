"use server"

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function impersonateUser(id: number) {
  'use server'
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true } })
  if (!user) throw new Error('User not found')
  const { cookies } = await import('next/headers')
  const store = await cookies()
  store.set('uid', String(id), { httpOnly: true, sameSite: 'lax', path: '/' })
  revalidatePath('/')
  revalidatePath('/users')
}

export async function impersonateUserAction(formData: FormData) {
  'use server'
  const id = Number(formData.get('uid'))
  if (!Number.isNaN(id)) {
    await impersonateUser(id)
  }
}
