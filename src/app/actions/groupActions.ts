"use server"

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCurrentUser, canCreateOrDeleteEntities, assert } from '@/lib/auth'

export async function createGroup(name: string) {
  const me = await getCurrentUser()
  assert(!!me && canCreateOrDeleteEntities(me.role), 'Not authorized')
  await prisma.group.create({ data: { name } })
  revalidatePath('/')
}

export async function deleteGroup(id: number) {
  const me = await getCurrentUser()
  assert(!!me && canCreateOrDeleteEntities(me.role), 'Not authorized')
  await prisma.group.delete({ where: { id } })
  revalidatePath('/')
}