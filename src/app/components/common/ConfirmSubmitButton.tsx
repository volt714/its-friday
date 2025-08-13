'use client'

import React from 'react'

// ConfirmSubmitButton wraps a submit button and prompts the user for confirmation before allowing submit
export default function ConfirmSubmitButton({
  confirmMessage,
  className,
  children,
}: {
  confirmMessage: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        // Cancel the submit if the user does not confirm
        if (!confirm(confirmMessage)) {
          e.preventDefault()
        }
      }}
    >
      {children}
    </button>
  )
}


