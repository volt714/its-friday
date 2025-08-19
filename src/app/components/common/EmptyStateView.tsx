// ========================================
// EMPTY STATE COMPONENT
// ========================================
// Component shown when there are no groups and user cannot manage them
const EmptyStateView = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center max-w-4xl mx-auto">
    
    {/* ---------------------------------------- */}
    {/* EMPTY STATE ICON */}
    {/* ---------------------------------------- */}
    <div className="w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-8 ring-1 ring-gray-200 shadow-inner">
      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {/* Large empty dashboard icon */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14-7l2 2m0 0l2 2m-2-2v6a2 2 0 01-2 2H6l-3-3V7a2 2 0 012-2h9.586a1 1 0 01.707.293l2.414 2.414z" />
      </svg>
    </div>
    
    {/* ---------------------------------------- */}
    {/* EMPTY STATE CONTENT */}
    {/* ---------------------------------------- */}
    <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h3>
    <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
      Your project groups and tasks will appear here. Get started by asking an administrator to create your first group, 
      or explore the interface to see how task management works.
    </p>
    
    {/* Helpful tip box */}
    <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
      <p className="text-sm text-blue-800 font-medium">
        💡 <strong>Tip:</strong> Groups help organize related tasks and enable team collaboration with updates, assignments, and progress tracking.
      </p>
    </div>
  </div>
);

export default EmptyStateView;
