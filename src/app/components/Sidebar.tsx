export default function Sidebar() {
  return (
    <div className="w-16 lg:w-64 bg-white border-r flex-shrink-0 overflow-y-auto">
      <div className="p-4">
        <div className="lg:hidden space-y-4">
          <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
          </button>
          <button className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-white font-bold text-sm">
            M
          </button>
        </div>
        <nav className="hidden lg:block space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <span>⭐</span>
              <span>Favorites</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
              <span>Workspaces</span>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button className="ml-auto text-gray-400 hover:text-gray-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors cursor-pointer">
                <div className="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center text-xs font-bold text-white">M</div>
                <span className="text-sm font-medium">Main workspace</span>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="ml-7 space-y-1">
                <div className="flex items-center gap-2 p-1 bg-gray-100 rounded text-sm cursor-pointer">
                  <span className="text-blue-600">📊</span>
                  <span className="font-medium">my-work</span>
                </div>
                <div className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded text-sm text-gray-600 cursor-pointer">
                  <span>📈</span>
                  <span>Dashboard and reporting</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}


