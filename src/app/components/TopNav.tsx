"use client"

import React from "react"
import { impersonateUserAction, signOutAction } from "@/app/actions"
import { Menu } from "lucide-react"

// SVG icon components
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <span className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors">
    {children}
  </span>
)

const ShareIcon = () => (
  <IconWrapper>
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
      />
    </svg>
  </IconWrapper>
)

const NotificationIcon = () => (
  <IconWrapper>
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-5-5M21 12H9l3-3m0 0l-3-3m3 3H3"
      />
    </svg>
  </IconWrapper>
)

const UserIcon = () => (
  <IconWrapper>
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  </IconWrapper>
)

const HelpIcon = () => (
  <IconWrapper>
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </IconWrapper>
)

const AppsIcon = () => (
  <IconWrapper>
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  </IconWrapper>
)

const SearchIcon = () => (
  <IconWrapper>
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </IconWrapper>
)

const InviteIcon = () => (
  <IconWrapper>
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  </IconWrapper>
)

export default function TopNav({
  users = [] as { id: number; name: string }[],
  canImpersonate = false,
}: {
  users?: { id: number; name: string }[]
  canImpersonate?: boolean
}) {
  return (
    <header className="bg-white border-b px-4 py-3 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Mobile sidebar toggle */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            aria-label="Toggle sidebar"
            onClick={() => window.dispatchEvent(new Event("sidebar:toggle"))}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-md flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">m</span>
            </div>
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">monday</span>
              <span className="hidden sm:inline text-sm text-gray-600 font-medium">.com</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
            See plans
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            className="hidden md:flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            title="Search"
          >
            <SearchIcon />
          </button>

          {/* Invite */}
          <button
            className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            title="Invite team members"
          >
            <InviteIcon />
          </button>

          {/* Share */}
          <button
            className="hidden lg:flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            title="Share"
          >
            <ShareIcon />
          </button>

          {/* Notifications */}
          <button
            className="relative flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            title="Notifications"
          >
            <NotificationIcon />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Help */}
          <button
            className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            title="Help & Support"
          >
            <HelpIcon />
          </button>

          {/* Apps */}
          <button
            className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            title="Apps"
          >
            <AppsIcon />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 mx-2" />

          {/* Impersonate */}
          {canImpersonate && (
            <form action={impersonateUserAction} className="flex items-center gap-2">
              <select
                name="uid"
                className="border rounded px-2 py-1 text-xs text-gray-700 focus:ring-2 focus:ring-blue-500"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Switch
              </button>
            </form>
          )}

          {/* Sign Out */}
          <form action={signOutAction}>
            <button className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
