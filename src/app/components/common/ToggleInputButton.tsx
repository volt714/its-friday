'use client'

export default function ToggleInputButton({ targetId, children, className }: { targetId: string; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const input = document.getElementById(targetId) as HTMLInputElement | null
        if (input) {
          const isHidden = input.style.display === 'none' || !input.style.display
          input.style.display = isHidden ? 'block' : 'none'
          if (!isHidden) return
          input.focus()
        }
      }}
    >
      {children}
    </button>
  )
}


