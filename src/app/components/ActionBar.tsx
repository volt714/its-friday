// Import icon components from the lucide-react icon library
import { Plus, Search, UserRound, Filter, ArrowUpDown, EyeOff, LayoutGrid, EllipsisVertical } from 'lucide-react'

// ActionBar component renders the top toolbar with common board actions
export default function ActionBar() {
  return (
    <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-2.5 flex-shrink-0 sticky top-0 z-10">
      <div
        className="flex items-center justify-between flex-wrap gap-2 lg:gap-3 overflow-x-auto text-gray-900"
        role="toolbar"
        aria-label="Board actions"
      >
        {/* Primary and secondary actions group */}
        <div className="flex items-center gap-1.5 lg:gap-2">
          {/* Primary action: create new task */}
          <button
            type="button"
            className="border border-gray-300 rounded-md px-2.5 py-1.5 text-sm hover:bg-gray-100 transition duration-200 whitespace-nowrap inline-flex items-center gap-1.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 font-medium"
            aria-label="Create new task"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Task</span>
          </button>

          {/* Secondary actions */}
          {[
            { icon: Search, label: 'Search' },
            { icon: UserRound, label: 'Person' },
            { icon: Filter, label: 'Filter' },
            { icon: ArrowUpDown, label: 'Sort' },
            { icon: EyeOff, label: 'Hide' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              className="border border-gray-300 rounded-md px-2.5 py-1.5 text-sm hover:bg-gray-100 transition duration-200 whitespace-nowrap inline-flex items-center gap-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              title={label}
              aria-label={label}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}

          {/* Group by button (visible on large screens) */}
          <button
            type="button"
            className="border border-gray-300 rounded-md px-2.5 py-1.5 text-sm hover:bg-gray-100 transition duration-200 whitespace-nowrap hidden lg:inline-flex items-center gap-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            title="Group by"
            aria-label="Group by"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Group by</span>
          </button>
        </div>

        {/* Kebab menu: more options */}
        <button
          type="button"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition duration-200"
          title="More options"
          aria-label="More options"
        >
          <EllipsisVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}