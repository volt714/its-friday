"use client"

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Pin, PinOff, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'

// Sidebar component provides a collapsible/pinnable navigation on desktop and a slide-in drawer on mobile

export default function Sidebar() {
  // Whether the sidebar is pinned open on desktop
  const [isPinned, setIsPinned] = useState<boolean>(true)
  // Whether the mobile drawer is currently open
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  // Load persisted pin state
  useEffect(() => {
    try {
      const raw = localStorage.getItem('sidebar:pinned')
      if (raw != null) setIsPinned(JSON.parse(raw))
    } catch {}
  }, [])

  // Persist pin state
  useEffect(() => {
    try {
      localStorage.setItem('sidebar:pinned', JSON.stringify(isPinned))
    } catch {}
  }, [isPinned])

  // Listen for a global toggle event from the top nav (mobile)
  useEffect(() => {
    const handler = () => setIsMobileOpen((v) => !v)
    window.addEventListener('sidebar:toggle' as any, handler as any)
    return () => window.removeEventListener('sidebar:toggle' as any, handler as any)
  }, [])

  // Compute width utility class depending on pin state
  const baseWidth = useMemo(() => (isPinned ? 'w-64' : 'w-16'), [isPinned])
  // Shared styles for small icon buttons
  const iconButton = 'p-2 hover:bg-gray-100 rounded-md transition-colors text-gray-700'

  return (
    <>
      {/* Desktop / Large screens */}
      <div className={`${baseWidth} hidden lg:flex bg-white border-r flex-shrink-0 overflow-y-auto transition-all duration-200`}
        aria-label="Sidebar">
        <div className="p-4 w-full">
          {/* Header with pin toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-white font-bold text-sm">M</div>
              {isPinned && <span className="text-sm font-semibold text-gray-900">Main workspace</span>}
            </div>
            <button
              className={iconButton}
              onClick={() => setIsPinned((v) => !v)}
              title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
              aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
            >
              {isPinned ? <Pin className="w-4 h-4" /> : <PinOff className="w-4 h-4" />}
            </button>
          </div>

          {/* Nav */}
          <nav className="space-y-4">
            <div>
              <div className={`text-xs text-gray-700 mb-2 flex items-center gap-1 ${isPinned ? '' : 'justify-center'}`}>
                <span>⭐</span>
                {isPinned && <span>Favorites</span>}
              </div>
            </div>
            <div>
              <div className={`text-xs text-gray-700 mb-2 flex items-center gap-2 ${isPinned ? '' : 'justify-center'}`}>
                {isPinned && <span>Workspaces</span>}
              </div>
              <div className="space-y-1">
                <div className={`flex items-center gap-2 p-2 ${isPinned ? 'bg-blue-50 hover:bg-blue-100' : ''} rounded transition-colors cursor-pointer`}>
                  <div className="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center text-xs font-bold text-white">M</div>
                  {isPinned && <span className="text-sm font-medium text-gray-900">Main workspace</span>}
                </div>
                <div className={`ml-${isPinned ? '7' : '0'} space-y-1`}>
                  <div className={`flex items-center gap-2 p-1 ${isPinned ? 'bg-gray-100' : ''} rounded text-sm cursor-pointer text-gray-900 justify-${isPinned ? 'start' : 'center'}`}>
                    <span className="text-blue-600">📊</span>
                    {isPinned && <span className="font-medium">my-work</span>}
                  </div>
                  <div className={`flex items-center gap-2 p-1 hover:bg-gray-100 rounded text-sm text-gray-800 cursor-pointer justify-${isPinned ? 'start' : 'center'}`}>
                    <span>📈</span>
                    {isPinned && <span>Dashboard and reporting</span>}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/users" className={`flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm font-medium text-gray-800 transition-colors ${isPinned ? '' : 'justify-center'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h-4v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2H0V10a2 2 0 012-2h20a2 2 0 012 2v10h-4zm-1-7a4 4 0 10-8 0 4 4 0 008 0z" />
                  </svg>
                  {isPinned && <span>User Management</span>}
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className={`lg:hidden ${isMobileOpen ? 'fixed' : 'hidden'} inset-0 z-50`}
        aria-hidden={!isMobileOpen}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileOpen(false)}></div>
        <div className="absolute inset-y-0 left-0 w-72 bg-white border-r shadow-xl p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-white font-bold text-sm">M</div>
              <span className="text-sm font-semibold text-gray-900">Main workspace</span>
            </div>
            <button className={iconButton} onClick={() => setIsMobileOpen(false)} aria-label="Close sidebar">
              <X className="w-4 h-4" />
            </button>
          </div>
          <nav className="space-y-1">
            <Link href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm font-medium text-gray-800 transition-colors">
              📊 <span>my-work</span>
            </Link>
            <Link href="/users" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm font-medium text-gray-800 transition-colors">
              👥 <span>User Management</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}


