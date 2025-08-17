// ProjectHeader component renders the project title area and quick actions
export default function ProjectHeader() {
  return (
    <header className="bg-white border-b px-4 lg:px-6 py-4 flex-shrink-0 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-gray-900">
        {/* Left Section: Title and Controls */}
        <div className="flex items-center gap-3">
          {/* Project Title */}
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight">my-work</h1>

          {/* Collapse/Expand */}
          <button
            className="text-gray-500 hover:text-gray-800 p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Toggle project menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Context Badge */}
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium">Main table</span>

          {/* More Options */}
          <button
            className="text-gray-500 hover:text-gray-800 p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="More options"
          >
            ⋯
          </button>
        </div>

        {/* Right Section: Quick Actions */}
        <div className="flex items-center gap-2 lg:gap-3 text-sm font-medium">
          {/* Assistant */}
          <button className="text-blue-700 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors">
            🎯 Sidekick
          </button>

          {/* Integrations */}
          <button className="hidden sm:inline px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            🔗 Integrate
          </button>

          {/* Automations */}
          <button className="hidden sm:inline px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            ⚡ Automate
          </button>

          {/* Share */}
          <button className="hidden lg:inline px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            📤 Share
          </button>

          {/* Invite */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md shadow-sm transition-colors">
            Invite / 1
          </button>

          {/* Settings */}
          <button
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Project settings"
          >
            ⚙️
          </button>

          {/* Overflow */}
          <button
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="More actions"
          >
            ⋯
          </button>
        </div>
      </div>
    </header>
  )
}
