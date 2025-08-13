// ProjectHeader component renders the project title area and quick actions
export default function ProjectHeader() {
  return (
    <div className="bg-white border-b px-4 lg:px-6 py-4 flex-shrink-0">
      {/* Layout wrapper: stacks on mobile, spreads horizontally on large screens */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-gray-900">
        {/* Left: title and small controls */}
        <div className="flex items-center gap-3">
          {/* Project/board title */}
          <h1 className="text-xl lg:text-2xl font-bold">my-work</h1>
          {/* Collapse/expand chevron */}
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {/* Context badge */}
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">Main table</span>
          {/* More options */}
          <button className="text-gray-700 hover:text-gray-900">⋯</button>
        </div>
        {/* Right: quick actions */}
        <div className="flex items-center gap-2 lg:gap-3 text-sm">
          {/* Assistant */}
          <button className="text-blue-700 hover:bg-blue-100 px-2 py-1 rounded transition-colors">🎯 Sidekick</button>
          {/* Integrations (hide on very small screens) */}
          <button className="text-gray-800 hover:bg-gray-100 px-2 py-1 rounded transition-colors hidden sm:inline">🔗 Integrate</button>
          {/* Automations */}
          <button className="text-gray-800 hover:bg-gray-100 px-2 py-1 rounded transition-colors hidden sm:inline">⚡ Automate</button>
          {/* Share (hide until large screens) */}
          <button className="text-gray-800 hover:bg-gray-100 px-2 py-1 rounded transition-colors hidden lg:inline">📤 Share</button>
          {/* Invite button emphasizes primary action */}
          <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors">Invite / 1</button>
          {/* Settings */}
          <button className="text-gray-800 hover:bg-gray-100 p-2 rounded transition-colors">⚙️</button>
          {/* Overflow */}
          <button className="text-gray-800 hover:bg-gray-100 p-2 rounded transition-colors">⋯</button>
        </div>
      </div>
    </div>
  )
}


