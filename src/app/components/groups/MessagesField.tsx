"use client"

import { useEffect, useRef, useState, useTransition } from 'react'
import { addTaskMessage, listTaskMessages, updateTask } from '@/app/actions'

export default function MessagesField({
  taskId,
  value,
  disabled = false,
}: {
  taskId: number
  value: string | null | undefined
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState<string>(value ?? '')
  const [isPending, startTransition] = useTransition()
  const [history, setHistory] = useState<{ id: number; body: string; createdAt: string; user: { name: string } }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({})
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      // Initial placement just below the button (viewport coordinates for fixed positioning)
      let top = rect.bottom + 8
      let left = rect.left
      setPopoverStyle({ position: 'fixed', top, left, zIndex: 1000 })

      // After render, measure and adjust to keep within viewport
      requestAnimationFrame(() => {
        const el = popoverRef.current
        if (!el) return
        const w = el.offsetWidth
        const h = el.offsetHeight
        const vw = window.innerWidth
        const vh = window.innerHeight

        let newLeft = left
        let newTop = top

        // If overflowing right, shift left
        if (newLeft + w + 8 > vw) newLeft = Math.max(8, vw - w - 8)
        // If overflowing bottom, place above the button
        if (newTop + h + 8 > vh) newTop = Math.max(8, rect.top - h - 8)

        setPopoverStyle({ position: 'fixed', top: newTop, left: newLeft, zIndex: 1000 })
      })
    }
  }, [open])

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const el = popoverRef.current
      if (el && !el.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    // Load history when opening
    ;(async () => {
      try {
        const msgs = await listTaskMessages(taskId)
        setHistory(msgs as any)
      } catch {}
    })()
  }, [open, taskId])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        className={`p-1 rounded ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'} text-gray-700`}
        title="Messages"
        aria-label="Messages"
      >
        {/* Chat bubble with plus */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4v8z"></path>
          <path d="M12 8v6M9 11h6"></path>
        </svg>
      </button>

      {open && (
        <div ref={popoverRef} className="absolute" style={popoverStyle}>
          <div className="w-96 bg-white border rounded-lg shadow-lg p-3">
            <div className="text-sm font-medium text-gray-900 mb-2">Messages</div>
            <div className="max-h-56 overflow-auto mb-3 space-y-2">
              {history.length === 0 ? (
                <div className="text-xs text-gray-500">No messages yet.</div>
              ) : (
                history.map((m) => (
                  <div key={m.id} className="text-sm">
                    <div className="text-gray-900"><span className="font-medium">{m.user.name}</span> <span className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleString()}</span></div>
                    <div className="text-gray-700 whitespace-pre-wrap">{m.body}</div>
                  </div>
                ))
              )}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="w-full border rounded p-2 text-sm resize-none"
              placeholder="Write a note..."
              disabled={isPending || disabled}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="px-2 py-1 text-sm rounded border"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="px-3 py-1 text-sm rounded bg-blue-600 text-white disabled:opacity-50"
                disabled={isPending || disabled}
                onClick={() =>
                  startTransition(async () => {
                    const body = text.trim()
                    if (!body) return
                    await addTaskMessage(taskId, body)
                    setText('')
                    const msgs = await listTaskMessages(taskId)
                    setHistory(msgs as any)
                  })
                }
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


