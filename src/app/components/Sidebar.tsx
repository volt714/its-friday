"use client"

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  X,
  Star,
  LayoutDashboard,
  BarChart3,
  LineChart,
  Users2,
  FolderKanban,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// Sidebar component provides a collapsible/pinnable navigation on desktop and a slide-in drawer on mobile

// Shape of a navigation item (label, route, and icon component)
type NavItem = { label: string; href: string; icon: React.ComponentType<{ className?: string }> }

// Base styles shared by all navigation links
const itemBase = 'group flex items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors'

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

  // Static favorites section
  const favorites: NavItem[] = [
    { label: 'Starred', href: '#', icon: Star }
  ]

  // Main workspace navigation links
  const workspaceItems: NavItem[] = [
    { label: 'Home', href: '#', icon: LayoutDashboard },
    { label: 'Projects', href: '#', icon: FolderKanban },
    { label: 'Analytics', href: '#', icon: BarChart3 },
    { label: 'Reports', href: '#', icon: LineChart },
    { label: 'User Management', href: '/users', icon: Users2 }
  ]

  // Helper to render a list of navigation items
  const renderItems = (items: NavItem[]) => (
    <ul className="space-y-1">
      {items.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <Link
            href={href}
            title={!isPinned ? label : undefined}
            className={`${itemBase} ${isPinned ? 'justify-start' : 'justify-center'}`}
          >
            <Icon className="w-4 h-4 text-gray-500 group-hover:text-gray-900" />
            {isPinned && <span className="truncate">{label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* Desktop / Large screens */}
      <div
        className={`${baseWidth} hidden lg:flex bg-white border-r flex-shrink-0 overflow-y-auto transition-all duration-200 relative`}
        aria-label="Sidebar"
      >
        {/* Edge collapse/expand control */}
        <button
          className="absolute -right-3 top-6 z-10 h-7 w-7 grid place-items-center rounded-full border bg-white shadow-sm hover:bg-gray-50 text-gray-700"
          onClick={() => setIsPinned((v) => !v)}
          title={isPinned ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-label={isPinned ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isPinned ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <div className="p-4 w-full">
          {/* Header with pin toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-yellow-400 to-amber-500 text-white font-bold text-sm grid place-items-center shadow-sm">M</div>
              {isPinned && (
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-gray-900">Main workspace</div>
                  <div className="text-xs text-gray-500">Acme Inc.</div>
                </div>
              )}
            </div>
          </div>

          {/* Favorites */}
          <div className="mb-6">
            <div className={`mb-2 text-[11px] tracking-wider uppercase text-gray-500 ${isPinned ? '' : 'text-center'}`}>
              Favorites
            </div>
            {renderItems(favorites)}
          </div>

          {/* Workspace */}
          <div>
            <div className={`mb-2 text-[11px] tracking-wider uppercase text-gray-500 ${isPinned ? '' : 'text-center'}`}>
              Workspace
            </div>
            {/* Workspace badge */}
            <div className={`flex items-center gap-3 rounded-md px-2 py-2 ${isPinned ? 'bg-blue-50' : ''} ${isPinned ? 'justify-start' : 'justify-center'} text-gray-900 mb-2`}>
              <div className="w-5 h-5 bg-yellow-400 rounded text-white text-[10px] font-bold grid place-items-center">M</div>
              {isPinned && <span className="text-sm font-medium">Main workspace</span>}
            </div>
            {renderItems(workspaceItems)}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden ${isMobileOpen ? 'fixed' : 'hidden'} inset-0 z-50`}
        aria-hidden={!isMobileOpen}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileOpen(false)}></div>
        <div className="absolute inset-y-0 left-0 w-72 bg-white border-r shadow-xl p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-yellow-400 to-amber-500 text-white font-bold text-sm grid place-items-center">M</div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-gray-900">Main workspace</div>
                <div className="text-xs text-gray-500">Acme Inc.</div>
              </div>
            </div>
            <button className={iconButton} onClick={() => setIsMobileOpen(false)} aria-label="Close sidebar">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mb-4">
            <div className="mb-2 text-[11px] tracking-wider uppercase text-gray-500">Favorites</div>
            <ul className="space-y-1">
              {favorites.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link href={href} className={itemBase}>
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 text-[11px] tracking-wider uppercase text-gray-500">Workspace</div>
            <ul className="space-y-1">
              {workspaceItems.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link href={href} className={itemBase}>
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
