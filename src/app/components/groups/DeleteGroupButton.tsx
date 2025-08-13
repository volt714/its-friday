import ConfirmSubmitButton from '@/app/components/common/ConfirmSubmitButton'
import { deleteGroup } from '@/app/actions'

// DeleteGroupButton wraps a server action with a confirmation UX for safety
export default function DeleteGroupButton({
  groupId,
  groupName,
  className,
}: {
  groupId: number
  groupName: string
  className?: string
}) {
  return (
    <form
      action={async () => {
        'use server'
        await deleteGroup(groupId)
      }}
    >
      <ConfirmSubmitButton
        confirmMessage={`Are you sure you want to delete "${groupName}" group and all its tasks?`}
        className={className ?? 'text-red-500 hover:text-red-700 text-xs p-1 hover:bg-red-50 rounded transition-colors'}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </ConfirmSubmitButton>
    </form>
  )
}


