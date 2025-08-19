"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  X,
  Star,
  Home,
  Briefcase,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  ChevronLeft, // <-- Added
  Plus,
  Search,
  BarChart3,
  Users2,
  Settings,
  FolderKanban,
} from "lucide-react"
import { NavItem, WorkspaceItem } from "@/app/components/Sidebar/types"

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)
  const [isWorkspaceExpanded, setIsWorkspaceExpanded] = useState<boolean>(true)
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState<boolean>(true)
  
  // --- New state for desktop sidebar visibility ---
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  // Handle mobile toggle event
  useEffect(() => {
    const handler = () => setIsMobileOpen((prev) => !prev)
    window.addEventListener("sidebar:toggle" as any, handler as any)
    return () => window.removeEventListener("sidebar:toggle" as any, handler as any)
  }, [])

  // Main navigation items
  const mainNavItems: NavItem[] = [
    { label: "Home", href: "/", icon: Home, isActive: true },
    { label: "My work", href: "/my-work", icon: Briefcase },
    { label: "More", href: "/more", icon: MoreHorizontal },
  ]

  // Favorites items
  const favoriteItems: NavItem[] = [
    { label: "Starred Projects", href: "/favorites", icon: Star },
  ]

  // Workspace items
  const workspaceItems: WorkspaceItem[] = [
    { label: "my-work", href: "/my-work", icon: FolderKanban, isActive: true },
    { label: "Dashboard and reporting", href: "/dashboard", icon: BarChart3 },
    { label: "User Management", href: "/users", icon: Users2 },
    { label: "Project Settings", href: "/settings", icon: Settings },
  ]

  const renderMainNavItems = () => (
    <ul className="space-y-0.5">
      {mainNavItems.map(({ label, href, icon: Icon, isActive }) => (
        <li key={label}>
          <Link
            href={href}
            title={label}
            className={`
              flex items-center gap-3 py-2.5 rounded-md text-sm font-medium transition-colors
              ${isCollapsed ? "px-3 justify-center" : "px-3"}
              ${
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
            {!isCollapsed && <span className="truncate">{label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )

  const renderSectionHeader = (
    title: string,
    isExpanded: boolean,
    onToggle: () => void,
    showAdd = false
  ) => (
    <div className={`flex items-center justify-between group ${isCollapsed ? "px-2" : "px-3 py-2"}`}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-800 transition-colors w-full"
      >
        {isExpanded ? (
          <ChevronDown className="w-3 h-3 shrink-0" />
        ) : (
          <ChevronRight className="w-3 h-3 shrink-0" />
        )}
        {!isCollapsed && <span>{title}</span>}
      </button>
      {showAdd && !isCollapsed && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 rounded hover:bg-gray-100" title="Add workspace">
            <Plus className="w-3 h-3 text-gray-500" />
          </button>
          <button className="p-1 rounded hover:bg-gray-100" title="Search workspaces">
            <Search className="w-3 h-3 text-gray-500" />
          </button>
          <button className="p-1 rounded hover:bg-gray-100" title="More options">
            <MoreHorizontal className="w-3 h-3 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  )

  const renderWorkspaceSelector = () => (
    <div className="px-3 mb-4">
      <div className="flex items-center justify-between p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="text-sm font-medium text-gray-900">Main workspace</span>
        </div>
        <div className="flex items-center gap-1">
          <ChevronDown className="w-4 h-4 text-gray-500" />
          <button className="p-1 rounded hover:bg-blue-50" title="Add new workspace">
            <Plus className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  )

  const renderItemList = (items: (NavItem | WorkspaceItem)[]) => (
    <ul className={`space-y-0.5 ${!isCollapsed && "px-3"}`}>
      {items.map(({ label, href, icon: Icon, isActive }) => (
        <li key={label}>
          <Link
            href={href}
            title={label}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
              ${isCollapsed ? "justify-center" : ""}
              ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
            {!isCollapsed && <span className="truncate">{label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-50 overflow-x-hidden">
      <div className="p-4 bg-white border-b border-gray-200">
        {renderMainNavItems()}
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="py-3 border-b border-gray-200 bg-white">
          {renderSectionHeader("Favorites", isFavoritesExpanded, () =>
            setIsFavoritesExpanded(!isFavoritesExpanded)
          )}
          {isFavoritesExpanded && (
            <div className="mt-1">
              {renderItemList(favoriteItems)}
            </div>
          )}
        </div>

        <div className="flex-1 py-3 bg-gray-50">
          {renderSectionHeader("Workspaces", isWorkspaceExpanded, () =>
            setIsWorkspaceExpanded(!isWorkspaceExpanded), true
          )}
          {isWorkspaceExpanded && (
            <div className="mt-2 space-y-3">
              {!isCollapsed && renderWorkspaceSelector()}
              {renderItemList(workspaceItems)}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-semibold">U</span>
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">User Name</div>
                <div className="text-xs text-gray-500 truncate">user@company.com</div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
            </>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* --- Desktop Sidebar --- */}
      <aside
        className={`
          hidden lg:flex flex-col relative
          border-r border-gray-200 bg-gray-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}
        `}
        aria-label="Sidebar navigation"
      >
        <SidebarContent />
        {/* --- Toggle Button --- */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10
            bg-white border-2 border-gray-200 rounded-full w-6 h-6 
            flex items-center justify-center text-gray-600 
            hover:bg-gray-100 hover:text-gray-900 transition-all"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* --- Mobile Sidebar (Fly-out) --- */}
      <div
        className={`lg:hidden ${isMobileOpen ? "fixed" : "hidden"} inset-0 z-50`}
        aria-hidden={!isMobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
        <div className="absolute inset-y-0 left-0 w-80 max-w-[80vw] bg-gray-50 shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Main workspace</div>
                <div className="text-xs text-gray-500">Acme Inc.</div>
              </div>
            </div>
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </div>
    </>
  )
}