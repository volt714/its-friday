'use client'

import { useState } from 'react'

// ChatWidget is a purely client-side demo widget that toggles a floating chat panel
export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="chat-container" style={{ position: 'relative' }}>
        {/* Toggle button */}
        <button
          className="chat-toggle bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        {open && (
          <div className="chat-box fixed bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-2xl border flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="font-medium">Team Chat</span>
              </div>
              <button className="text-white hover:text-gray-200 transition-colors" onClick={() => setOpen(false)}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Messages (static demo content) */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">A</div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">Alex • 2:30 PM</div>
                    <div className="text-sm">Hey team! How's the progress on the Q4 tasks?</div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">S</div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">Sarah • 2:32 PM</div>
                    <div className="text-sm">Looking good! Just finished the prototype task 🎉</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-lg px-3 py-2 shadow-sm max-w-xs">
                  <div className="text-xs text-blue-100 mb-1">You • 2:35 PM</div>
                  <div className="text-sm">Awesome work everyone! 👏</div>
                </div>
              </div>
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
            {/* Composer */}
            <div className="border-t p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.currentTarget as HTMLInputElement
                      if (input.value.trim()) {
                        input.value = ''
                      }
                    }
                  }}
                />
                <button className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
            <style jsx>{`
              /* Responsive full-screen chat on small screens and custom scrollbars */
              @media (max-width: 640px) {
                .chat-box { width: 100vw !important; height: 100vh !important; bottom: 0 !important; right: 0 !important; border-radius: 0 !important; }
                .chat-box .rounded-t-lg { border-radius: 0 !important; }
              }
              .chat-box ::-webkit-scrollbar { width: 4px; }
              .chat-box ::-webkit-scrollbar-track { background: #f1f1f1; }
              .chat-box ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 2px; }
              .chat-box ::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
            `}</style>
          </div>
        )}
      </div>
    </div>
  )
}


