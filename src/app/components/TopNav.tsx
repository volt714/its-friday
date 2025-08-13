"use client"

import React from 'react';
import { Menu } from 'lucide-react'

// TopNav renders the site header with brand, global actions, and user menu
// Icon components for better organization and reusability
const ShareIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const NotificationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5M21 12H9l3-3m0 0l-3-3m3 3H3" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const HelpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AppsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const InviteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default function TopNav() {
  return (
    <header className="bg-white border-b px-4 py-3 shadow-sm z-50 sticky top-0">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        {/* Left Section - Logo and CTA */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Mobile sidebar toggle */}
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex lg:hidden"
            aria-label="Toggle sidebar"
            onClick={() => {
              // Dispatch a simple custom event for Sidebar to listen to
              window.dispatchEvent(new Event('sidebar:toggle'))
            }}
          >
            <Menu className="w-5 h-5" />
          </button>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-blue-600 rounded-md flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">m</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-gray-900 tracking-tight">monday</span>
              <span className="text-sm text-gray-600 hidden sm:inline font-medium">.com</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            See plans
          </button>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center gap-1">
          {/* Search Button - Hidden on mobile */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hidden md:flex items-center justify-center group"
            title="Search"
          >
            <SearchIcon />
          </button>

          {/* Invite Button */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center justify-center group"
            title="Invite team members"
          >
            <InviteIcon />
          </button>

          {/* Share Button - Hidden on smaller screens */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hidden lg:flex items-center justify-center group"
            title="Share"
          >
            <ShareIcon />
          </button>

          {/* Notifications */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center justify-center group relative"
            title="Notifications"
          >
            <NotificationIcon />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Help */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center justify-center group"
            title="Help & Support"
          >
            <HelpIcon />
          </button>

          {/* Apps Menu */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center justify-center group"
            title="Apps"
          >
            <AppsIcon />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 mx-2"></div>

          {/* Profile Avatar */}
          <button 
            className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            title="Profile menu"
          >
            D
          </button>
        </div>
      </div>
    </header>
  );
}