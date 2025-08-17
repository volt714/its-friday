'use client'  // This directive tells Next.js that this component should be rendered on the client-side only. It's useful for components that rely on browser-specific features like state management with hooks.

// Importing the useState hook from React. useState is used to add state to functional components.
import { useState } from 'react'

// ChatWidget is a purely client-side demo widget that toggles a floating chat panel. This is the main component we're defining here. It's a functional component that will render a chat interface.
export default function ChatWidget() {
  // Local open/close state for the floating chat widget. We're using useState to manage whether the chat panel is open or closed. Initial state is false (closed).
  const [open, setOpen] = useState(false)
  return (
    // This div is fixed to the bottom-right of the screen with z-50 to ensure it's on top of other elements. It acts as the container for the entire widget.
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating container holding the toggle and panel. The relative positioning allows the chat box to be positioned absolutely relative to this div. */}
      <div className="chat-container" style={{ position: 'relative' }}>
        {/* Toggle button. This button opens and closes the chat panel when clicked. It has styles for background, hover effects, text color, rounding, padding, shadow, and animations. */}
        <button
          className="chat-toggle bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110"
          onClick={() => setOpen((v) => !v)}  // The onClick handler toggles the 'open' state by negating its current value.
        >
          {/* An SVG icon representing a chat bubble. This is the visual for the toggle button. */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        {open && (  // Conditional rendering: If 'open' is true, render the chat box div below. This shows/hides the chat panel.
          // The chat-box div is the main panel for the chat. It's fixed positioned, sized to 80 width and 96 height, with white background, rounded corners, shadow, border, and flex-column layout.
          <div className="chat-box fixed bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-2xl border flex-col">
            {/* Header. This is the top bar of the chat panel with blue background, white text, padding, and flex layout for alignment. */}
            <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
              {/* Flex container for the title and status indicator. */}
              <div className="flex items-center gap-2">
                {/* A green dot indicating online status or activity. */}
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                {/* The chat title: "Team Chat". */}
                <span className="font-medium">Team Chat</span>
              </div>
              {/* Close button for the chat panel. It calls setOpen(false) on click to close the panel. */}
              <button className="text-white hover:text-gray-200 transition-colors" onClick={() => setOpen(false)}>
                {/* SVG icon for the close (X) button. */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Messages (static demo content). This section is flexible (flex-1), padded, scrollable, with space between messages and a light gray background. */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {/* A single message from "Alex". This div structures the avatar and message bubble. */}
              <div className="flex items-start gap-2">
                {/* Avatar: A purple circle with 'A' for Alex. Fixed size, centered text, no shrinking. */}
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">A</div>
                {/* Message container, flexible width. */}
                <div className="flex-1">
                  {/* Message bubble: White background, rounded, padded, with shadow. */}
                  <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                    {/* Sender info: Name and time, small gray text. */}
                    <div className="text-xs text-gray-500 mb-1">Alex • 2:30 PM</div>
                    {/* The message text itself. */}
                    <div className="text-sm">Hey team! How's the progress on the Q4 tasks?</div>
                  </div>
                </div>
              </div>
              {/* Another message from "Sarah". Similar structure to the previous one, but with green avatar. */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">S</div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">Sarah • 2:32 PM</div>
                    <div className="text-sm">Looking good! Just finished the prototype task 🎉</div>
                  </div>
                </div>
              </div>
              {/* A message from "You". This one is aligned to the right (justify-end) and has a blue background to indicate it's from the current user. */}
              <div className="flex justify-end">
                {/* No avatar here since it's from the user. The bubble is blue with white text. */}
                <div className="bg-blue-600 text-white rounded-lg px-3 py-2 shadow-sm max-w-xs">
                  <div className="text-xs text-blue-100 mb-1">You • 2:35 PM</div>
                  <div className="text-sm">Awesome work everyone! 👏</div>
                </div>
              </div>
              {/* Message from "Mike". Similar to others, with orange avatar. */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">M</div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">Mike • 2:40 PM</div>
                    <div className="text-sm">Need help with the testing phase. Anyone available?</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Composer. This is the bottom section for typing new messages, with a border on top. */}
            <div className="border-t p-3">
              {/* Flex container for input and send button. */}
              <div className="flex items-center gap-2">
                {/* Input field for typing messages. Flexible width, bordered, rounded, padded, with focus styles. */}
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyDown={(e) => {  // onKeyDown handler: If Enter is pressed and input is not empty, clear the input (simulating send, but no actual sending in this demo).
                    if (e.key === 'Enter') {
                      const input = e.currentTarget as HTMLInputElement
                      if (input.value.trim()) {
                        input.value = ''
                      }
                    }
                  }}
                />
                {/* Send button: Blue circle with send icon (paper plane). Hover effect. */}
                <button className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Inline styles using styled-jsx (Next.js feature). This adds responsive behavior and custom scrollbar styles. */}
            <style jsx>{`
              /* Responsive full-screen chat on small screens and custom scrollbars */
              @media (max-width: 640px) {
                .chat-box { width: 100vw !important; height: 100vh !important; bottom: 0 !important; right: 0 !important; border-radius: 0 !important; }  // On screens smaller than 640px, make the chat full-screen by overriding styles.
                .chat-box .rounded-t-lg { border-radius: 0 !important; }  // Remove top rounding for full-screen mode.
              }
              .chat-box ::-webkit-scrollbar { width: 4px; }  // Custom thin scrollbar for WebKit browsers.
              .chat-box ::-webkit-scrollbar-track { background: #f1f1f1; }  // Scrollbar track color.
              .chat-box ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 2px; }  // Scrollbar thumb color and rounding.
              .chat-box ::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }  // Hover color for thumb.
            `}</style>
          </div>
        )}
      </div>
    </div>
  )
}