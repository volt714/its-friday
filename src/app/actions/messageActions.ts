"use server"

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCurrentUser, assert } from '@/lib/auth'

export async function addTaskMessage(taskId: number, body: string) {
  'use server'
  const me = await getCurrentUser()
  assert(!!me, 'Not authenticated')
  // Only participants (owner, assignee) or Admin/Developer can post
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { ownerId: true, assignees: { select: { userId: true } } },
  })
  assert(!!task, 'Task not found')
  const isPrivileged = me.role === 'DEVELOPER' || me.role === 'ADMIN'
  const isParticipant = task.ownerId === me.id || task.assignees.some((a: any) => a.userId === me.id)
  assert(isPrivileged || isParticipant, 'Not authorized')
  await prisma.taskMessage.create({ data: { taskId, userId: me.id, body } })
  revalidatePath('/')
}

export async function listTaskMessages(taskId: number) {
  'use server'
  const messages = await prisma.taskMessage.findMany({
    where: { taskId },
    select: { id: true, body: true, createdAt: true, user: { select: { name: true } } },
    orderBy: { createdAt: 'asc' },
  })
  return messages
}
