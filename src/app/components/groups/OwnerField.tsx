"use client"  // This directive ensures the component is rendered on the client-side in Next.js, allowing use of hooks like useState, useEffect, etc.

// Importing React hooks: useMemo for memoized values, useState for state, useTransition for non-blocking updates, useRef for references, useEffect for side effects.
import { useMemo, useState, useTransition, useRef, useEffect } from 'react'
// Importing server actions: updateTask to update task details, createUserAction and deleteUserAction for user management.
import { updateTask } from '@/app/actions/taskActions';
import { createUserAction, deleteUserAction } from '@/app/actions/userActions';
// Importing a utility to get badge color based on owner name.
import { SimpleUser } from '@/app/components/common/types';
// Importing createPortal from React DOM for rendering popover in body.
import { createPortal } from 'react-dom'
import OwnerSelect from '@/app/components/common/OwnerSelect';
import UserAvatar from '@/app/components/common/UserAvatar';
import ManageOwnersPopover from '@/app/components/common/ManageOwnersPopover';
import PopoverToggleButton from '@/app/components/common/PopoverToggleButton';

// Main component: OwnerField, for displaying and editing task owner, with avatar, dropdown, and manage button if allowed.
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
  
  // useTransition: For handling updates without blocking UI, isPending shows loading state.
  const [isPending, startTransition] = useTransition()
  // State for toggling manage popover.
  const [open, setOpen] = useState(false)
  // State for error messages in add user form.
  const [error, setError] = useState<string | null>(null)
  // Ref for the add user form.
  const formRef = useRef<HTMLFormElement>(null)
  // Ref for the manage button to position popover.
  const buttonRef = useRef<HTMLButtonElement>(null)
  // State for popover styles (position).
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({})

  // Memoized current owner name: Finds name from users if ownerId, else uses owner prop.
  const value = ownerId ?? 0
  // Size classes for select: Smaller for 'sm', default for 'md'.
  const sizeClasses = size === 'sm' 
    ? 'text-xs px-3 py-1.5 h-8' 
    : 'text-sm px-4 py-2.5 h-10'

  // Memoized current name: Looks up from users or uses owner.
  const currentName = useMemo(() => {
    if (ownerId) {
      const u = users.find((u) => u.id === ownerId)
      return u?.name ?? owner ?? ''
    }
    return owner ?? ''
  }, [ownerId, users, owner])  // Dependencies: Recalculates if these change.

  // useEffect: Sets popover position when open, using button position and scroll.
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setPopoverStyle({
        position: 'fixed',
        top: rect.bottom + window.scrollY + 8,  // Below button, accounting for scroll.
        left: rect.left + window.scrollX,
        zIndex: 1000,
      })
    }
  }, [open])  // Runs when open changes.

  // Rendering: Flex for avatar, select, and manage button.
  return (
    <div className="flex items-center gap-3 relative">
      {/* Avatar: If name, colored circle with initial; else gray with user icon. */}
      <UserAvatar name={currentName} size={size} />

      {/* Owner dropdown: Select for choosing owner, updates task on change. */}
      <div className="flex-1 min-w-0">
        <OwnerSelect
          ownerId={ownerId}
          ownerName={currentName}
          users={users}
          canEditCore={canManageOwners}
          onOwnerChange={(selectedId, selectedName) => {
            startTransition(async () => {
              await updateTask(taskId, {
                ownerId: selectedId || null,
                owner: selectedName,
                startDate: selectedId ? new Date().toISOString().slice(0, 10) : null,
              } as any);
            });
          }}
        />
      </div>

      {/* Manage users button: Shown if canManageOwners, toggles popover. */}
      {canManageOwners && (
        <PopoverToggleButton
          buttonRef={buttonRef}
          onClick={() => setOpen((v) => !v)}
          disabled={!canManageOwners}
          title="Manage owners"
        >
          // SVG users icon.
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        </PopoverToggleButton>
      )}

      <ManageOwnersPopover
        open={open}
        onClose={() => setOpen(false)}
        users={users}
        buttonRef={buttonRef}
      />
    </div>
  )
}