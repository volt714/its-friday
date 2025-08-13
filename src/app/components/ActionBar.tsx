// Import icon components from the lucide-react icon library
import { Plus, Search, UserRound, Filter, ArrowUpDown, EyeOff, LayoutGrid, EllipsisVertical } from 'lucide-react'

// ActionBar component renders the top toolbar with common board actions
export default function ActionBar() {
  return (
    <>
      {/* Outer container for the action bar; white background with bottom border and padding */}
      <div className="bg-white border-b px-3 sm:px-4 lg:px-6 py-2 flex-shrink-0">
      {/* Toolbar wrapper: flex layout, wraps on small screens, accessible with role/aria-label */}
      <div className="flex items-center flex-wrap gap-2 lg:gap-3 overflow-x-auto text-gray-900" role="toolbar" aria-label="Board actions">
        {/* Primary action: create new task */}
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-md transition-colors whitespace-nowrap inline-flex items-center gap-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Create new task"
        >
          {/* Plus icon indicates creation */}
          <Plus className="w-4 h-4" />
          {/* Text label shown on small screens and up */}
          <span className="hidden sm:inline">New task</span>
        </button>

        {/* Secondary actions group */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <button
            type="button"
            className="border rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            title="Search"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* Person button (e.g., filter by assignee) */}
          <button
            type="button"
            className="border rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            title="Person"
            aria-label="Person"
          >
            <UserRound className="w-4 h-4" />
            <span className="hidden sm:inline">Person</span>
          </button>

          {/* Filter button */}
          <button
            type="button"
            className="border rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            title="Filter"
            aria-label="Filter"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>

          {/* Sort button */}
          <button
            type="button"
            className="border rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            title="Sort"
            aria-label="Sort"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="hidden sm:inline">Sort</span>
          </button>

          {/* Hide button (toggle visibility of fields/columns) */}
          <button
            type="button"
            className="border rounded-md px-3 py-2 text-sm hover:bg-gray-50 transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            title="Hide"
            aria-label="Hide"
          >
            <EyeOff className="w-4 h-4" />
            <span className="hidden sm:inline">Hide</span>
          </button>

          {/* Group by button (visible on large screens) */}
          <button
            type="button"
            className="border rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap inline-flex items-center gap-1.5 hidden lg:flex text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            title="Group by"
            aria-label="Group by"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Group by</span>
          </button>
        </div>

        {/* Kebab menu: more options */}
        <button
          type="button"
          className="text-gray-700 hover:text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          title="More options"
          aria-label="More options"
        >
          <EllipsisVertical className="w-5 h-5" />
        </button>
      </div>
      </div>
    </>
  )
}


