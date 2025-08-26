'use client'

import React from 'react'

// ConfirmSubmitButton wraps a submit button and prompts the user for confirmation before allowing submit
export default function ConfirmSubmitButton({
  confirmMessage,
  className,
  children,
  isLoading = false,
  onClick,
  ...props
}: {
  confirmMessage?: string;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        if (confirmMessage && !confirm(confirmMessage)) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          onClick(e);
        }
      }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}


