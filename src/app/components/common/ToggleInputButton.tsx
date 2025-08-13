'use client'

// ToggleInputButton shows/hides a target input by element id and focuses it when shown

export default function ToggleInputButton({ targetId, children, className }: { targetId: string; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
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
    >
      {children}
    </button>
  )
}


