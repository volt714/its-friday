"use server"

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCurrentUser, canCreateOrDeleteEntities, canManageUsers, USER_EDITABLE_TASK_FIELDS, assert } from '@/lib/auth'
import crypto from 'crypto'

// Server-side actions for creating, updating, and deleting groups, tasks, and users
export async function createGroup(name: string) {
  const me = await getCurrentUser()
  assert(!!me && canCreateOrDeleteEntities(me.role), 'Not authorized')
  await prisma.group.create({ data: { name } })
  revalidatePath('/')
}

export async function createTask(params: {
  groupId: number
  title: string
  owner?: string | null
  ownerId?: number | null
  status?: 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK'
  startDate?: string | null
  dueDate?: string | null
  dropdown?: string | null
  assigneeIds?: number[] | null
}) {
  const me = await getCurrentUser()
  assert(!!me && canCreateOrDeleteEntities(me.role), 'Not authorized')
  const { groupId, title, owner, ownerId, status, startDate, dueDate, dropdown, assigneeIds } = params
  await prisma.task.create({
    data: {
      groupId,
      title,
      owner: owner ?? undefined,
      ...(ownerId !== null && ownerId !== undefined ? { ownerId } : {}),
      status: (status as any) ?? 'NOT_STARTED',
      startDate: startDate ? new Date(startDate) : undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      dropdown: dropdown ?? undefined,
      ...(assigneeIds && assigneeIds.length
        ? { assignees: { createMany: { data: assigneeIds.map((uid) => ({ userId: uid })) } } }
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
    startDate: string | null
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

  await prisma.task.update({
    where: { id },
    data: {
      ...sanitized,
      startDate: sanitized.startDate ? new Date(sanitized.startDate) : undefined,
      dueDate: sanitized.dueDate ? new Date(sanitized.dueDate) : undefined,
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

export async function deleteGroup(id: number) {
  const me = await getCurrentUser()
  assert(!!me && canCreateOrDeleteEntities(me.role), 'Not authorized')
  await prisma.group.delete({ where: { id } })
  revalidatePath('/')
}

// Users (owners) management
export async function createUser(data: { name: string; email?: string | null; role?: 'DEVELOPER' | 'ADMIN' | 'USER'; password?: string | null }) {
  'use server'
  const { name, email, role, password } = data
  // Allow unauthenticated creation; force role to USER when unauthenticated
  const me = await getCurrentUser()
  const roleToSet = !me ? 'USER' : (role as any) ?? undefined
  if (me?.role === 'ADMIN' && roleToSet && roleToSet !== 'USER') {
    throw new Error('Admins can only assign USER')
  }
  const passwordHash = password ? crypto.createHash('sha256').update(password).digest('hex') : null
  
  try {
    const client: any = prisma as any
    if (client.user?.create) {
      // Normal Prisma path when User model exists
      await client.user.create({ data: { name, email: email ?? null, role: roleToSet, passwordHash } })
    } else {
      // Fallback: create table if it doesn't exist and insert via raw SQL
      await prisma.$executeRawUnsafe(
        'CREATE TABLE IF NOT EXISTS `User` (\n' +
          ' `id` INTEGER NOT NULL AUTO_INCREMENT,\n' +
          ' `name` VARCHAR(191) NOT NULL,\n' +
          ' `email` VARCHAR(191) NULL,\n' +
          ' `avatar` VARCHAR(191) NULL,\n' +
          ' `role` ENUM("DEVELOPER","ADMIN","USER") NOT NULL DEFAULT "USER",\n' +
          ' `passwordHash` VARCHAR(191) NULL,\n' +
          ' `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),\n' +
          ' `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),\n' +
          ' UNIQUE INDEX `User_email_key` (`email`),\n' +
          ' PRIMARY KEY (`id`)\n' +
          ') DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;'
      )
      
      // Check if email already exists
      if (email) {
        const existingUser = await prisma.$queryRawUnsafe(
          'SELECT id FROM `User` WHERE `email` = ?',
          email
        ) as any[]
        
        if (existingUser.length > 0) {
          throw new Error(`User with email "${email}" already exists`)
        }
      }
      
      await prisma.$executeRaw`
        INSERT INTO \`User\` (\`name\`, \`email\`, \`passwordHash\`) VALUES (${name}, ${email ?? null}, ${passwordHash})
      `
    }
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
  const target = await (prisma as any).user?.findUnique?.({ where: { id }, select: { role: true } })
  if (target) {
    assert(canManageUsers(me.role, target.role), 'Not authorized')
  } else {
    assert(me.role === 'DEVELOPER' || me.role === 'ADMIN', 'Not authorized')
  }
  const client: any = prisma as any
  if (client.user?.delete) {
    await client.user.delete({ where: { id } })
  } else {
    await prisma.$executeRaw`
      DELETE FROM \`User\` WHERE \`id\` = ${id}
    `
  }
  revalidatePath('/')
}

// Form-based server actions for client forms
export async function createUserAction(formData: FormData) {
  'use server'
  const name = String(formData.get('name') || '').trim()
  const emailRaw = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '').trim()
  await createUser({ name, email: emailRaw || null, password: password || null })
}

export async function deleteUserAction(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  if (!Number.isNaN(id)) {
    await deleteUser(id)
  }
}

// Impersonation helpers for demo: set active user id cookie
export async function impersonateUser(id: number) {
  'use server'
  const user = await (prisma as any).user?.findUnique?.({ where: { id }, select: { id: true } })
  if (!user) throw new Error('User not found')
  const { cookies } = await import('next/headers')
  const store = await cookies()
  store.set('uid', String(id), { httpOnly: false, sameSite: 'lax', path: '/' })
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

// Role management
export async function updateUserRole(id: number, role: 'DEVELOPER' | 'ADMIN' | 'USER') {
  'use server'
  const me = await getCurrentUser()
  assert(!!me, 'Not authenticated')
  // Admin can only set USER; Developer can set any
  if (me.role === 'ADMIN' && role !== 'USER') throw new Error('Admins can only assign USER role')
  if (me.role === 'USER') throw new Error('Not authorized')
  await (prisma as any).user?.update?.({ where: { id }, data: { role } })
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

// Change password, allowed by self, Admin, or Developer
export async function changePassword(userId: number, newPassword: string) {
  'use server'
  const me = await getCurrentUser()
  assert(!!me, 'Not authenticated')
  if (me.id !== userId && me.role === 'USER') throw new Error('Not authorized')
  const passwordHash = crypto.createHash('sha256').update(newPassword).digest('hex')
  await (prisma as any).user?.update?.({ where: { id: userId }, data: { passwordHash } })
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

// Messages
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
  const isParticipant = task.ownerId === me.id || task.assignees.some((a) => a.userId === me.id)
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

// Sign out: clear uid cookie and go to login
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


