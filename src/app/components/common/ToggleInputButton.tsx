'use client'

// ToggleInputButton shows/hides a target input by element id and focuses it when shown

export default function ToggleInputButton({ targetId, children, className, disabled = false }: { targetId: string; children: React.ReactNode; className?: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      className={`${className ?? ''} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={() => {
        if (disabled) return
        const input = document.getElementById(targetId) as HTMLInputElement | null
        if (input) {
          // Toggle display style between none/block
          const isHidden = input.style.display === 'none' || !input.style.display
          input.style.display = isHidden ? 'block' : 'none'
          if (!isHidden) return
          // Focus the input when it becomes visible for immediate typing
          input.focus()
        }
      }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}


