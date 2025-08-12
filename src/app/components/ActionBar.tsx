export default function ActionBar() {
  return (
    <div className="bg-white border-b px-4 lg:px-6 py-3 flex-shrink-0">
      <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto text-gray-900">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center gap-1">
          <span>+</span>
          <span className="hidden sm:inline">New task</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="border rounded px-3 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-1 text-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </button>
          <button className="border rounded px-3 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-1 text-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden sm:inline">Person</span>
          </button>
          <button className="border rounded px-3 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-1 text-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="border rounded px-3 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-1 text-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span className="hidden sm:inline">Sort</span>
          </button>
          <button className="border rounded px-3 py-2 text-sm hover:bg-gray-50 transition-colors whitespace-nowrap flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
            <span className="hidden sm:inline">Hide</span>
          </button>
          <button className="border rounded px-3 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-1 hidden lg:flex text-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Group by</span>
          </button>
        </div>
        <button className="text-gray-700 hover:text-gray-900 p-2">⋯</button>
      </div>
    </div>
  )
}


