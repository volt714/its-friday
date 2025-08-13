"use client"

import { useMemo, useState, useTransition, useRef, useEffect } from 'react'
import { updateTask, createUserAction, deleteUserAction } from '@/app/actions'
import { getOwnerBadgeColor } from '@/app/components/utils'
import { createPortal } from 'react-dom'

export type SimpleUser = { id: number; name: string }

export default function OwnerField({
  taskId,
  owner,
  ownerId,
  users,
  size = 'md',
  canManageOwners = false,
}: {
  taskId: number
  owner: string | null
  ownerId: number | null
  users: SimpleUser[]
  size?: 'sm' | 'md'
  canManageOwners?: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({})

  const value = ownerId ?? 0
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'

  const currentName = useMemo(() => {
    if (ownerId) {
      const u = users.find((u) => u.id === ownerId)
      return u?.name ?? owner ?? ''
    }
    return owner ?? ''
  }, [ownerId, users, owner])

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setPopoverStyle({
        position: 'fixed',
        top: rect.bottom + window.scrollY + 8, // 8px below the button
        left: rect.left + window.scrollX,
        zIndex: 1000,
      })
    }
  }, [open])

  return (
    <div className="flex items-center gap-2 relative">
      {/*currentName ? (
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold ${getOwnerBadgeColor(currentName)}`}>
          {currentName.charAt(0).toUpperCase()}
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-gray-200" />
      )*/}
      {/*owner name dropdown*/}
           <select
        className={`border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${sizeClasses}`}
        value={value}
        onChange={(e) => {
          const selectedId = Number(e.target.value)
          const selectedUser = users.find((u) => u.id === selectedId)
          startTransition(async () => {
            await updateTask(taskId, {
              ownerId: selectedId || null,
              owner: selectedUser?.name ?? null,
              // Set start date when someone is assigned (if not already set)
              startDate: selectedId ? new Date().toISOString().slice(0, 10) : null,
            } as any)
          })
        }}
        disabled={isPending || !canManageOwners}
      >
        <option value={0}>Unassigned</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      {/* Toolbar trigger to manage users */}
     {/* <button
        ref={buttonRef}
        type="button"
        className="p-1 rounded hover:bg-gray-100 text-gray-700"
        title="Manage owners"
        onClick={() => canManageOwners && setOpen((v) => !v)}
        disabled={!canManageOwners}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A3 3 0 017 17h10a3 3 0 011.879.804L21 20H3l2.121-2.196zM12 3a5 5 0 00-5 5v2a5 5 0 005 5 5 5 0 005-5V8a5 5 0 00-5-5z" />
        </svg>
      </button>*/}

      {open && canManageOwners && createPortal(
        <div className="absolute z-50 w-72 bg-white border rounded-lg shadow-lg p-3" style={popoverStyle}>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-gray-900 text-sm">Owners</div>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>
          <div className="max-h-56 overflow-auto space-y-1 mb-3">
            {users.length === 0 && <div className="text-xs text-gray-500">No users yet.</div>}
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between text-sm">
                <span>{u.name}</span>
                <form action={deleteUserAction}>
                  <input type="hidden" name="id" value={u.id} />
                  <button className="text-red-600 hover:text-red-700 text-xs" type="submit">Remove</button>
                </form>
              </div>
            ))}
          </div>
          <form ref={formRef} action={async (formData: FormData) => {
            try {
              setError(null)
              await createUserAction(formData)
              formRef.current?.reset()
              // Refresh the page to get updated user list
              window.location.reload()
            } catch (e) {
              setError(e instanceof Error ? e.message : 'Failed to create user')
            }
          }} className="space-y-2">
            <input name="name" placeholder="Full name" className="w-full border rounded px-2 py-1 text-sm" required />
            <input name="email" placeholder="Email (optional)" className="w-full border rounded px-2 py-1 text-sm" />
            {error && <div className="text-red-600 text-xs">{error}</div>}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="px-2 py-1 text-sm rounded border">Close</button>
              <button type="submit" className="px-2 py-1 text-sm rounded bg-blue-600 text-white">Add</button>
            </div>
          </form>
        </div>,
        document.body // Portal target
      )}
    </div>
  )
}


