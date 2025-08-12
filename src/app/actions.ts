"use server"

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createGroup(name: string) {
  await prisma.group.create({ data: { name } })
  revalidatePath('/')
}

export async function createTask(params: {
  groupId: number
  title: string
  owner?: string | null
  status?: 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK'
  dueDate?: string | null
  dropdown?: string | null
}) {
  const { groupId, title, owner, status, dueDate, dropdown } = params
  await prisma.task.create({
    data: {
      groupId,
      title,
      owner: owner ?? undefined,
      status: (status as any) ?? 'NOT_STARTED',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      dropdown: dropdown ?? undefined,
    },
  })
  revalidatePath('/')
}

export async function updateTask(
  id: number,
  fields: Partial<{
    title: string
    owner: string | null
    status: 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK'
    dueDate: string | null
    dropdown: string | null
    groupId: number
  }>,
) {
  await prisma.task.update({
    where: { id },
    data: {
      ...fields,
      dueDate: fields.dueDate ? new Date(fields.dueDate) : undefined,
    },
  })
  revalidatePath('/')
}

export async function deleteTask(id: number) {
  await prisma.task.delete({ where: { id } })
  revalidatePath('/')
}

export async function deleteGroup(id: number) {
  await prisma.group.delete({ where: { id } })
  revalidatePath('/')
}


