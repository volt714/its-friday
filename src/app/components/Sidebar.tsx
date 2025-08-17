"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  X,
  Star,
  LayoutDashboard,
  BarChart3,
  LineChart,
  Users2,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Type definition for nav items
interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

// Base styles for nav items
const itemBase =
  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"

export default function Sidebar() {
  const [isPinned, setIsPinned] = useState<boolean>(true)
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  // Load saved pin state
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sidebar:pinned")
      if (saved != null) setIsPinned(JSON.parse(saved))
    } catch {}
  }, [])

  // Save pin state
  useEffect(() => {
    try {
      localStorage.setItem("sidebar:pinned", JSON.stringify(isPinned))
    } catch {}
  }, [isPinned])

  // Handle mobile toggle event
  useEffect(() => {
    const handler = () => setIsMobileOpen((v) => !v)
    window.addEventListener("sidebar:toggle" as any, handler as any)
    return () => window.removeEventListener("sidebar:toggle" as any, handler as any)
  }, [])

  const baseWidth = useMemo(() => (isPinned ? "w-64" : "w-16"), [isPinned])
  const iconButton =
    "p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"

  const favorites: NavItem[] = [{ label: "Starred", href: "#", icon: Star }]

  const workspaceItems: NavItem[] = [
    { label: "Home", href: "#", icon: LayoutDashboard },
    { label: "Projects", href: "#", icon: FolderKanban },
    { label: "Analytics", href: "#", icon: BarChart3 },
    { label: "Reports", href: "#", icon: LineChart },
    { label: "User Management", href: "/users", icon: Users2 },
  ]

  const renderItems = (items: NavItem[]) => (
    <ul className="space-y-1">
      {items.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <Link
            href={href}
            title={!isPinned ? label : undefined}
            className={`${itemBase} ${isPinned ? "justify-start" : "justify-center"}`}
          >
            <Icon className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
            {isPinned && <span className="truncate">{label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`${baseWidth} hidden lg:flex flex-col bg-white border-r shadow-sm overflow-y-auto transition-all duration-300 relative`}
        aria-label="Sidebar"
      >
        {/* Collapse / Expand Button */}
        <button
          className="absolute -right-3 top-6 z-10 h-7 w-7 grid place-items-center rounded-full border bg-white shadow hover:bg-gray-50 text-gray-600"
          onClick={() => setIsPinned((v) => !v)}
          title={isPinned ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={isPinned ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isPinned ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <div className="p-4 w-full space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-yellow-400 to-amber-500 text-white font-bold text-sm grid place-items-center shadow">
              M
            </div>
            {isPinned && (
              <div className="leading-tight">
                <div className="text-sm font-semibold text-gray-900">Main workspace</div>
                <div className="text-xs text-gray-500">Acme Inc.</div>
              </div>
            )}
          </div>

          {/* Favorites */}
          <div>
            <div
              className={`mb-2 text-[11px] tracking-wider uppercase font-semibold text-gray-500 ${
                isPinned ? "" : "text-center"
              }`}
            >
              Favorites
            </div>
            {renderItems(favorites)}
          </div>

          {/* Workspace */}
          <div>
            <div
              className={`mb-2 text-[11px] tracking-wider uppercase font-semibold text-gray-500 ${
                isPinned ? "" : "text-center"
              }`}
            >
              Workspace
            </div>
            <div
              className={`flex items-center gap-3 rounded-lg px-3 py-2 mb-2 ${
                isPinned ? "bg-blue-50" : ""
              } ${isPinned ? "justify-start" : "justify-center"} text-gray-900`}
            >
              <div className="w-6 h-6 bg-yellow-400 rounded text-white text-xs font-bold grid place-items-center">
                M
              </div>
              {isPinned && <span className="text-sm font-medium">Main workspace</span>}
            </div>
            {renderItems(workspaceItems)}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden ${isMobileOpen ? "fixed" : "hidden"} inset-0 z-50`} aria-hidden={!isMobileOpen}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileOpen(false)}></div>
        <div className="absolute inset-y-0 left-0 w-72 bg-white border-r shadow-xl p-4 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-yellow-400 to-amber-500 text-white font-bold text-sm grid place-items-center">
                M
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-gray-900">Main workspace</div>
                <div className="text-xs text-gray-500">Acme Inc.</div>
              </div>
            </div>
            <button className={iconButton} onClick={() => setIsMobileOpen(false)} aria-label="Close sidebar">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Favorites */}
          <div className="mb-6">
            <div className="mb-2 text-[11px] tracking-wider uppercase font-semibold text-gray-500">Favorites</div>
            {renderItems(favorites)}
          </div>

          {/* Workspace */}
          <div>
            <div className="mb-2 text-[11px] tracking-wider uppercase font-semibold text-gray-500">Workspace</div>
            {renderItems(workspaceItems)}
          </div>
        </div>
      </div>
    </>
  )
}
