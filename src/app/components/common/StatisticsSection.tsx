import React from 'react';

// ========================================
// STATISTICS SECTION COMPONENT
// ========================================
// Comprehensive statistics dashboard showing various metrics and insights
const StatisticsSection = ({
  groupCount,
  totalTasks,
  completedTasks,
}: {
  groupCount: number // Total number of groups
  totalTasks: number // Total number of tasks
  completedTasks: number // Number of completed tasks
}) => {
  // ----------------------------------------
  // STATISTICS CALCULATIONS
  // ----------------------------------------
  const inProgressTasks = totalTasks - completedTasks; // Calculate remaining tasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0; // Calculate completion percentage
  
  return (
    <section className="mt-24 pt-12 border-t border-gray-200/80" aria-labelledby="statistics-title">
      
      {/* ---------------------------------------- */}
      {/* SECTION HEADER */}
      {/* ---------------------------------------- */}
      <div className="flex items-center justify-between mb-10">
        <h2 id="statistics-title" className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="text-sm text-gray-500">
          {/* Show current date for context */}
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      {/* ---------------------------------------- */}
      {/* MAIN STATISTICS GRID */}
      {/* ---------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Total Groups Statistics Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-lg transition-all duration-300 ease-out hover:border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Groups</p>
              <p className="text-4xl font-bold text-gray-900 mt-3">{groupCount}</p>
              <p className="text-sm text-gray-600 mt-2">Active workspaces</p>
            </div>
            {/* Groups icon with gradient background */}
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2m0 0l2 2m-2-2v6a2 2 0 01-2 2H6l-3-3V7a2 2 0 012-2h9.586a1 1 0 01.707.293l2.414 2.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Tasks Statistics Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-lg transition-all duration-300 ease-out hover:border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Tasks</p>
              <p className="text-4xl font-bold text-gray-900 mt-3">{totalTasks}</p>
              <p className="text-sm text-gray-600 mt-2">All time tasks</p>
            </div>
            {/* Tasks icon with gradient background */}
            <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Completed Tasks Statistics Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-lg transition-all duration-300 ease-out hover:border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Completed</p>
              <p className="text-4xl font-bold text-green-600 mt-3">{completedTasks}</p>
              <p className="text-sm text-green-600 mt-2">{completionRate}% completion rate</p>
            </div>
            {/* Completion checkmark icon with gradient background */}
            <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* In Progress Tasks Statistics Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-lg transition-all duration-300 ease-out hover:border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">In Progress</p>
              <p className="text-4xl font-bold text-orange-500 mt-3">{inProgressTasks}</p>
              <p className="text-sm text-orange-600 mt-2">Tasks remaining</p>
            </div>
            {/* Clock/time icon with gradient background */}
            <div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------- */}
      {/* ADDITIONAL INSIGHTS SECTION */}
      {/* ---------------------------------------- */}
      {/* Only show additional insights if there are tasks */}
      {totalTasks > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          
          {/* Average Tasks Per Group Insight */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                {/* Trending up icon */}
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average per Group</p>
                {/* Calculate average tasks per group (avoid division by zero) */}
                <p className="text-xl font-bold text-gray-900">{groupCount > 0 ? Math.round(totalTasks / groupCount) : 0} tasks</p>
              </div>
            </div>
          </div>

          {/* Productivity Score Insight */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                {/* Dollar/value icon representing productivity */}
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Productivity Score</p>
                {/* Calculate productivity score with bonus points (max 100) */}
                <p className="text-xl font-bold text-gray-900">{Math.min(100, completionRate + 20)}/100</p>
              </div>
            </div>
          </div>

          {/* Active Groups Insight */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                {/* Fire icon representing activity */}
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Groups</p>
                <p className="text-xl font-bold text-gray-900">{groupCount} groups</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StatisticsSection;
