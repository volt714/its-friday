"use client"  // This directive specifies that this component should be rendered on the client-side in Next.js, enabling the use of client-side hooks like useState, useEffect, etc.

// Importing necessary React hooks: useEffect for side effects, useRef for mutable references, useState for state management, and useTransition for handling concurrent updates without blocking the UI.
import { useEffect, useRef, useState, useTransition } from 'react'
// Importing server actions: addTaskMessage to add a new message, listTaskMessages to fetch messages for a task, and updateTask (though not used in this component, possibly a leftover import).
import { addTaskMessage, listTaskMessages, updateTask } from '@/app/actions'

// The default exported component: MessagesField, which handles displaying and managing messages for a specific task. It takes taskId, an initial value (unused effectively), and a disabled flag.
export default function MessagesField({
  taskId,
  value,
  disabled = false,
}: {
  taskId: number
  value: string | null | undefined
  disabled?: boolean
}) {
  // State for toggling the popover open/closed.
  const [open, setOpen] = useState(false)
  // State for the current text in the message input textarea.
  const [text, setText] = useState<string>(value ?? '')
  // useTransition hook: isPending indicates if a transition is active, startTransition wraps async operations to keep UI responsive.
  const [isPending, startTransition] = useTransition()
  // State for message history: An array of message objects with id, body, createdAt, and user info.
  const [history, setHistory] = useState<{ id: number; body: string; createdAt: string; user: { name: string } }[]>([])
  // Ref for the button element to calculate popover position.
  const buttonRef = useRef<HTMLButtonElement>(null)
  // State for dynamic popover styles (position, etc.).
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({})
  // Ref for the popover div to check dimensions and outside clicks.
  const popoverRef = useRef<HTMLDivElement>(null)
  // Ref for scrolling to the bottom of messages.
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // useEffect: Runs when popover opens, calculates and sets popover position to avoid overflowing the viewport.
  useEffect(() => {
    if (open && buttonRef.current) {
      // Gets the button's bounding rectangle for positioning.
      const rect = buttonRef.current.getBoundingClientRect()
      // Initial position below the button.
      let top = rect.bottom + 8
      let left = rect.left
      // Sets initial fixed position.
      setPopoverStyle({ position: 'fixed', top, left, zIndex: 1000 })

      // Uses requestAnimationFrame for smooth DOM measurement after render.
      requestAnimationFrame(() => {
        const el = popoverRef.current
        if (!el) return
        // Gets popover dimensions.
        const w = el.offsetWidth
        const h = el.offsetHeight
        // Viewport dimensions.
        const vw = window.innerWidth
        const vh = window.innerHeight

        // Adjusts left if overflowing right.
        let newLeft = left
        let newTop = top

        if (newLeft + w + 8 > vw) newLeft = Math.max(8, vw - w - 8)
        // Adjusts top if overflowing bottom, places above button if needed.
        if (newTop + h + 8 > vh) newTop = Math.max(8, rect.top - h - 8)

        // Updates style with adjusted position.
        setPopoverStyle({ position: 'fixed', top: newTop, left: newLeft, zIndex: 1000 })
      })
    }
  }, [open])  // Depends on open state.

  // useEffect: Handles closing popover on clicks outside the popover or button.
  useEffect(() => {
    if (!open) return
    // Event handler: Checks if click is outside popover and button.
    const onDown = (e: MouseEvent) => {
      const el = popoverRef.current
      if (el && !el.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    // Adds mousedown listener.
    document.addEventListener('mousedown', onDown)
    // Cleanup: Removes listener on unmount or when open changes.
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])  // Depends on open.

  // useEffect: Fetches message history when popover opens.
  useEffect(() => {
    if (!open) return
    ;(async () => {
      try {
        // Calls server action to list messages.
        const msgs = await listTaskMessages(taskId)
        // Sets history state.
        setHistory(msgs as any)
      } catch {}  // Silent catch, no error handling shown.
    })()
  }, [open, taskId])  // Depends on open and taskId.

  // useEffect: Loads initial message history on component mount for badge count.
  useEffect(() => {
    ;(async () => {
      try {
        const msgs = await listTaskMessages(taskId)
        setHistory(msgs as any)
      } catch {}
    })()
  }, [taskId])  // Depends on taskId.

  // useEffect: Auto-scrolls to bottom of messages when history updates.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])  // Depends on history.

  // Utility function: Formats date string to relative time (time if today, weekday+time if week, date+time otherwise).
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

  // Utility: Gets initials from user name (first two letters uppercase).
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Utility: Assigns a color class based on name hash for avatars.
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'
    ]
    // Simple hash from char codes.
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0)
    // Modulo for color index.
    return colors[hash % colors.length]
  }

  // Rendering: Relative div for positioning.
  return (
    <div className="relative flex items-center">
      // Button to toggle popover: Icon for messages, disabled if prop set.
      <button
        ref={buttonRef}  // Ref for positioning.
        type="button"
        onClick={() => !disabled && setOpen((v) => !v)}  // Toggles open if not disabled.
        disabled={disabled}
        className="text-[#D0D4E7] hover:text-[#6161FF] transition-colors p-1"
        title="Messages"
        aria-label="Messages"
      >
        // SVG chat icon.
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
      
      {/* Message count badge - positioned absolutely on top right: Shows if history has messages. */}
      {history.length > 0 && (
        <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 bg-[#579BFC] text-white rounded-full text-[10px] font-medium px-1">
          {history.length}
        </div>
      )}

      // Conditional popover: If open, render absolute div with styles.
      {open && (
        <div ref={popoverRef} className="absolute" style={popoverStyle}>
          // Main popover container: Fixed width, white bg, border, shadow.
          <div className="w-96 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
            {/* Header: Gray bg, title, count, close button. */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              // Flex for icon and title.
              <div className="flex items-center gap-2">
                // SVG speech bubble icon.
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4v8z"></path>
                </svg>
                // Header text.
                <h3 className="font-semibold text-gray-900 text-sm">Messages</h3>
                // Conditional count badge.
                {history.length > 0 && (
                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    {history.length}
                  </span>
                )}
              </div>
              // Close button: X icon, hover effects.
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

            {/* Messages: Scrollable area for history. */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              // If no messages, show empty state.
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  // Icon for empty.
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  // Text prompts.
                  <p className="text-sm text-gray-500 mb-1">No messages yet</p>
                  <p className="text-xs text-gray-400">Start a conversation about this task</p>
                </div>
              ) : (
                // Map history to message bubbles.
                history.map((m, index) => {
                  // Logic: Show avatar only if first or different user from previous.
                  const showAvatar = index === 0 || history[index - 1].user.name !== m.user.name
                  // Logic: If last message from this user.
                  const isLastFromUser = index === history.length - 1 || history[index + 1].user.name !== m.user.name
                  
                  // Render message div.
                  return (
                    <div key={m.id} className={`flex items-start gap-3 ${showAvatar ? '' : 'ml-11'}`}>  // Indent if no avatar.
                      // Conditional avatar: Colored circle with initials.
                      {showAvatar && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${getAvatarColor(m.user.name)}`}>
                          {getInitials(m.user.name)}
                        </div>
                      )}
                      // Message content.
                      <div className="flex-1 min-w-0">
                        // Show user name and date if avatar shown.
                        {showAvatar && (
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">{m.user.name}</span>
                            <span className="text-xs text-gray-500">{formatDate(m.createdAt)}</span>
                          </div>
                        )}
                        // Message bubble: Gray bg, text.
                        <div className={`bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 whitespace-pre-wrap ${isLastFromUser ? 'mb-0' : 'mb-1'}`}>
                          {m.body}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
              // Ref div for scrolling to bottom.
              <div ref={messagesEndRef} />
            </div>

            {/* Input area: Border top, padding. */}
            <div className="border-t border-gray-100 p-4">
              <div className="space-y-3">
                // Textarea for new message: Resizable none, focus rings.
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}  // Updates text state.
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                  placeholder="Write a message..."
                  disabled={isPending || disabled}  // Disabled during pending or prop.
                  onKeyDown={(e) => {  // Handles Cmd/Ctrl + Enter to send.
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault()
                      const body = text.trim()
                      if (!body || isPending || disabled) return
                      
                      // Wraps send in transition: Add message, clear text, refetch history.
                      startTransition(async () => {
                        await addTaskMessage(taskId, body)
                        setText('')
                        const msgs = await listTaskMessages(taskId)
                        setHistory(msgs as any)
                      })
                    }
                  }}
                />
                
                // Flex for hint and buttons.
                <div className="flex items-center justify-between">
                  // Hint for send shortcut.
                  <p className="text-xs text-gray-500">
                    Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-mono">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-mono">Enter</kbd> to send
                  </p>
                  
                  // Buttons: Close and Send.
                  <div className="flex gap-2">
                    // Close button: White bg, border, hover.
                    <button
                      type="button"
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg
                        hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                        transition-all duration-200"
                      onClick={() => setOpen(false)}  // Closes popover.
                    >
                      Close
                    </button>
                    // Send button: Blue bg, disabled if pending/empty/disabled.
                    <button
                      type="button"
                      className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm
                        flex items-center gap-2"
                      disabled={isPending || disabled || !text.trim()}
                      onClick={() =>
                        // Wraps send in transition, similar to keydown.
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
                      // Conditional: Spinner if pending, else icon and text.
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
                          // Send icon.
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