"use server"

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Server-side actions for creating, updating, and deleting groups, tasks, and users
export async function createGroup(name: string) {
  await prisma.group.create({ data: { name } })
  revalidatePath('/')
}

export async function createTask(params: {
  groupId: number
  title: string
  owner?: string | null
  ownerId?: number | null
  status?: 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK'
  dueDate?: string | null
  dropdown?: string | null
}) {
  const { groupId, title, owner, ownerId, status, dueDate, dropdown } = params
  await prisma.task.create({
    data: {
      groupId,
      title,
      owner: owner ?? undefined,
      ...(ownerId !== null && ownerId !== undefined ? { ownerId } : {}),
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
    ownerId: number | null
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

// Users (owners) management
export async function createUser(data: { name: string; email?: string | null }) {
  'use server'
  const { name, email } = data
  
  try {
    const client: any = prisma as any
    if (client.user?.create) {
      // Normal Prisma path when User model exists
      await client.user.create({ data: { name, email: email ?? null } })
    } else {
      // Fallback: create table if it doesn't exist and insert via raw SQL
      await prisma.$executeRawUnsafe(
        'CREATE TABLE IF NOT EXISTS `User` (\n' +
          ' `id` INTEGER NOT NULL AUTO_INCREMENT,\n' +
          ' `name` VARCHAR(191) NOT NULL,\n' +
          ' `email` VARCHAR(191) NULL,\n' +
          ' `avatar` VARCHAR(191) NULL,\n' +
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
        INSERT INTO \`User\` (\`name\`, \`email\`) VALUES (${name}, ${email ?? null})
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
  await createUser({ name, email: emailRaw || null })
}

export async function deleteUserAction(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  if (!Number.isNaN(id)) {
    await deleteUser(id)
  }
}


