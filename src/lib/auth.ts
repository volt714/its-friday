import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export type RoleString = 'DEVELOPER' | 'ADMIN' | 'USER'
export type CurrentUser = { id: number; name: string; email: string | null; role: RoleString }

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const store = await cookies()
    const uid = store.get('uid')?.value
    const id = uid ? Number(uid) : NaN
    if (!uid || Number.isNaN(id)) return null
    const user = await (prisma as any).user?.findUnique?.({ where: { id }, select: { id: true, name: true, email: true, role: true } })
    return (user as CurrentUser) ?? null
  } catch {
    return null
  }
}

export function roleRank(role: RoleString): number {
  switch (role) {
    case 'DEVELOPER':
      return 3
    case 'ADMIN':
      return 2
    default:
      return 1
  }
}

export function isAtLeast(role: RoleString, minimum: RoleString): boolean {
  return roleRank(role) >= roleRank(minimum)
}

export function canManageUsers(actorRole: RoleString, targetRole?: RoleString): boolean {
  if (actorRole === 'DEVELOPER') return true
  if (actorRole === 'ADMIN') {
    if (!targetRole) return true // creating new USER will be enforced at callsite
    return targetRole === 'USER'
  }
  return false
}

export function canCreateOrDeleteEntities(actorRole: RoleString): boolean {
  return actorRole === 'DEVELOPER' || actorRole === 'ADMIN'
}

export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

export const USER_EDITABLE_TASK_FIELDS = new Set(['status', 'startDate', 'dueDate', 'dropdown'])


