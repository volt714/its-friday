// ========================================
// IMPORTS SECTION
// ========================================
import React from 'react';

// ========================================
// BOARD HEADER COMPONENT
// ========================================
// Sticky header component that shows board title, stats, and overall progress
const BoardHeader = ({
  groupCount,
  totalTasks,
  completedTasks,
}: {
  groupCount: number // Total number of groups in the board
  totalTasks: number // Total number of tasks across all groups
  completedTasks: number // Number of completed tasks
}) => (
  <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
    <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
        
        {/* ---------------------------------------- */}
        {/* BOARD TITLE SECTION */}
        {/* ---------------------------------------- */}
        <div className="flex items-center gap-6">
          {/* Enhanced Board Icon with gradient background */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-blue-100">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {/* Dashboard/Board icon SVG path */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H9z" />
            </svg>
          </div>
          {/* Board title and metadata */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Project Dashboard</h1>
            <p className="text-base text-gray-600 mt-1 font-medium">
              {/* Display group count with proper pluralization */}
              {groupCount} {groupCount === 1 ? 'group' : 'groups'} • {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} total
            </p>
          </div>
        </div>

        {/* ---------------------------------------- */}
        {/* PROGRESS SECTION */}
        {/* ---------------------------------------- */}
        {/* Only show progress section if there are tasks */}
        {totalTasks > 0 && (
          <div className="flex items-center gap-8">
            {/* Progress statistics text (hidden on small screens) */}
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Overall Progress</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                {/* Show completed tasks out of total tasks */}
                {completedTasks}<span className="text-lg text-gray-400">/{totalTasks}</span>
              </div>
            </div>
            
            {/* Enhanced Progress Bar with gradient */}
            <div 
              className="w-56 h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner"
              role="progressbar" // Accessibility: screen readers can understand this is a progress indicator
              aria-valuenow={completedTasks}
              aria-valuemin={0}
              aria-valuemax={totalTasks}
            >
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 transition-all duration-700 ease-out rounded-full shadow-sm"
                style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }} // Calculate percentage width
              />
            </div>
            
            {/* Percentage Display */}
            <div className="text-2xl font-bold text-blue-600 w-20 text-right">
              {/* Calculate and display completion percentage */}
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
            </div>
          </div>
        )}
      </div>
    </div>
  </header>
);

export default BoardHeader;
