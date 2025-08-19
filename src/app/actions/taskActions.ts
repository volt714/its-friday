"use server"

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCurrentUser, canCreateOrDeleteEntities, USER_EDITABLE_TASK_FIELDS, assert } from '@/lib/auth'

export async function createTask(params: {
  groupId: number
  title: string
  owner?: string | null
  ownerId?: number | null
  status?: 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK'
  dueDate?: string | null
  dropdown?: string | null
  assigneeIds?: number[] | null
}) {
  const me = await getCurrentUser()
  assert(!!me && canCreateOrDeleteEntities(me.role), 'Not authorized')
  const { groupId, title, owner, ownerId, status, dueDate, dropdown, assigneeIds } = params
  await prisma.task.create({
    data: {
      groupId,
      title,
      owner: owner ?? undefined,
      ...(ownerId !== null && ownerId !== undefined ? { ownerId } : {}),
      status: (status as any) ?? 'NOT_STARTED',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      dropdown: dropdown ?? undefined,
      updatedAt: new Date(),
      ...(assigneeIds && assigneeIds.length
        ? { taskassignment: { createMany: { data: assigneeIds.map((uid) => ({ userId: uid, level: 0 })) } } }
        : {}),
    },
  })
  revalidatePath('/')
}

export async function updateTask(
  id: number,
  fields: Partial<{
    title: string
    owner: string | null
    ownerId: number | null
    status: 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK'
    dueDate: string | null
    dropdown: string | null
    groupId: number
    assigneeIds: number[] | null
  }>,
) {
  const me = await getCurrentUser()
  if (!me) throw new Error('Not authenticated')

  // Users can only edit specific fields; Admin/Dev can edit anything
  const isPrivileged = canCreateOrDeleteEntities(me.role)
  const sanitized: any = {}
  for (const [key, value] of Object.entries(fields)) {
    if (isPrivileged || USER_EDITABLE_TASK_FIELDS.has(key)) {
      sanitized[key] = value
    }
  }

  const ownerIdProvided = Object.prototype.hasOwnProperty.call(sanitized, 'ownerId')
  await prisma.task.update({
    where: { id },
    data: {
      ...sanitized,
      dueDate: sanitized.dueDate ? new Date(sanitized.dueDate) : undefined,
      assignedAt: ownerIdProvided ? (sanitized.ownerId == null ? null : new Date()) : undefined,
      ...(Array.isArray(sanitized.assigneeIds)
        ? {
            assignees: {
              deleteMany: {},
              createMany: { data: (sanitized.assigneeIds as number[]).map((uid) => ({ userId: uid })) },
            },
          }
        : {}),
    },
  })
  revalidatePath('/')
}

export async function deleteTask(id: number) {
  const me = await getCurrentUser()
  assert(!!me && canCreateOrDeleteEntities(me.role), 'Not authorized')
  await prisma.task.delete({ where: { id } })
  revalidatePath('/')
}

// Assign or unassign task owner (Admin/Developer only)
export async function assignTaskOwner(taskId: number, userId: number) {
  'use server'
  const me = await getCurrentUser()
  assert(!!me && canCreateOrDeleteEntities(me.role), 'Not authorized')
  await updateTask(taskId, { ownerId: userId })
  revalidatePath('/users')
}

export async function unassignTaskOwner(taskId: number) {
  'use server'
  const me = await getCurrentUser()
  assert(!!me && canCreateOrDeleteEntities(me.role), 'Not authorized')
  await updateTask(taskId, { ownerId: null })
  revalidatePath('/users')
}

// Form actions for assignment
export async function assignTaskOwnerAction(formData: FormData) {
  'use server'
  const taskId = Number(formData.get('taskId'))
  const userId = Number(formData.get('userId'))
  if (!Number.isNaN(taskId) && !Number.isNaN(userId)) {
    await assignTaskOwner(taskId, userId)
  }
}

export async function unassignTaskOwnerAction(formData: FormData) {
  'use server'
  const taskId = Number(formData.get('taskId'))
  if (!Number.isNaN(taskId)) {
    await unassignTaskOwner(taskId)
  }
}

// Form action: update limited task fields (status/dueDate/dropdown)
export async function updateTaskFieldsAction(formData: FormData) {
  'use server'
  const id = Number(formData.get('taskId'))
  const status = String(formData.get('status') || '') as any
  const dueDate = String(formData.get('dueDate') || '')
  const dropdown = String(formData.get('dropdown') || '')
  if (Number.isNaN(id)) return
  const fields: any = {}
  if (status === 'WORKING_ON_IT' || status === 'DONE' || status === 'NOT_STARTED' || status === 'STUCK') {
    fields.status = status
  }
  if (dueDate) fields.dueDate = dueDate
  if (dropdown) fields.dropdown = dropdown
  await updateTask(id, fields)
  revalidatePath('/users')
}

// Task summary for UI panels
export async function getTaskSummary(taskId: number) {
  'use server'
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { id: true, title: true, assignedAt: true, user: { select: { name: true } } },
  })
  return task
}
