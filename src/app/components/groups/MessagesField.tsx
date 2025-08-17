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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      let top = rect.bottom + 8
      let left = rect.left
      setPopoverStyle({ position: 'fixed', top, left, zIndex: 1000 })

      requestAnimationFrame(() => {
        const el = popoverRef.current
        if (!el) return
        const w = el.offsetWidth
        const h = el.offsetHeight
        const vw = window.innerWidth
        const vh = window.innerHeight

        let newLeft = left
        let newTop = top

        if (newLeft + w + 8 > vw) newLeft = Math.max(8, vw - w - 8)
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
    ;(async () => {
      try {
        const msgs = await listTaskMessages(taskId)
        setHistory(msgs as any)
      } catch {}
    })()
  }, [open, taskId])

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'
    ]
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0)
    return colors[hash % colors.length]
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        className={`p-2 rounded-lg border border-gray-300 bg-white shadow-sm transition-all duration-200
          ${disabled 
            ? 'cursor-not-allowed opacity-50 bg-gray-50' 
            : 'hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          }`}
        title="Messages"
        aria-label="Messages"
      >
        <div className="relative">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
            <path d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4v8z"></path>
            <path d="M12 8v6M9 11h6"></path>
          </svg>
          {history.length > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
          )}
        </div>
      </button>

      {open && (
        <div ref={popoverRef} className="absolute" style={popoverStyle}>
          <div className="w-96 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4v8z"></path>
                </svg>
                <h3 className="font-semibold text-gray-900 text-sm">Messages</h3>
                {history.length > 0 && (
                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    {history.length}
                  </span>
                )}
              </div>
              <button 
                className="p-1 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200" 
                onClick={() => setOpen(false)} 
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">No messages yet</p>
                  <p className="text-xs text-gray-400">Start a conversation about this task</p>
                </div>
              ) : (
                history.map((m, index) => {
                  const showAvatar = index === 0 || history[index - 1].user.name !== m.user.name
                  const isLastFromUser = index === history.length - 1 || history[index + 1].user.name !== m.user.name
                  
                  return (
                    <div key={m.id} className={`flex items-start gap-3 ${showAvatar ? '' : 'ml-11'}`}>
                      {showAvatar && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${getAvatarColor(m.user.name)}`}>
                          {getInitials(m.user.name)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        {showAvatar && (
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">{m.user.name}</span>
                            <span className="text-xs text-gray-500">{formatDate(m.createdAt)}</span>
                          </div>
                        )}
                        <div className={`bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 whitespace-pre-wrap ${isLastFromUser ? 'mb-0' : 'mb-1'}`}>
                          {m.body}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-100 p-4">
              <div className="space-y-3">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                  placeholder="Write a message..."
                  disabled={isPending || disabled}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault()
                      const body = text.trim()
                      if (!body || isPending || disabled) return
                      
                      startTransition(async () => {
                        await addTaskMessage(taskId, body)
                        setText('')
                        const msgs = await listTaskMessages(taskId)
                        setHistory(msgs as any)
                      })
                    }
                  }}
                />
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-mono">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-mono">Enter</kbd> to send
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg
                        hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                        transition-all duration-200"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm
                        flex items-center gap-2"
                      disabled={isPending || disabled || !text.trim()}
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
                      {isPending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                          </svg>
                          Send
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}