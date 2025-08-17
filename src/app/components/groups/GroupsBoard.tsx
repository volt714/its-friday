// Importing the GroupCard component, which likely renders individual group cards with tasks.
import GroupCard from './GroupCard'
// Importing AddNewGroupCard, probably a component for adding a new group.
import AddNewGroupCard from './AddNewGroupCard'
// Importing the Status type from a utility file, used for task statuses.
import type { Status } from '@/app/components/utils'

// --- TYPE DEFINITIONS ---
// Defining TaskLite type: A lightweight representation of a task with id, title, owner details, status, dates, and dropdown (e.g., priority).
type TaskLite = {
  id: number
  title: string
  owner: string | null
  ownerId: number | null
  status: Status
  startDate: string | Date | null
  dueDate: string | Date | null
  dropdown: string | null
}

// Defining GroupWithTasks type: Represents a group with id, name, and an array of TaskLite objects.
type GroupWithTasks = {
  id: number
  name: string
  tasks: TaskLite[]
}

// Defining User type: Simple user object with id and name, likely for task owners.
type User = { 
  id: number; 
  name: string; 
}

// --- SUB-COMPONENTS for clarity and maintainability ---

// 1. Board Header Component: A functional component that renders the header with board info, progress bar, etc.
const BoardHeader = ({
  groupCount,
  totalTasks,
  completedTasks,
}: {
  groupCount: number
  totalTasks: number
  completedTasks: number
}) => (
  // Header element: Sticky at top, with blurred background, border, and shadow for visual separation.
  <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
    // Container div: Centers content with max width, padding for responsiveness.
    <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 py-8">
      // Flex container: Arranges title and progress in column on mobile, row on desktop.
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
        // Flex for icon and title: Aligns board icon and text.
        <div className="flex items-center gap-6">
          // Board icon: Gradient background square with SVG icon representing a board or folder.
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-md ring-1 ring-indigo-100">
            // SVG icon: Custom path for a board-like symbol, white stroke.
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2m0 0l2 2m-2-2v6a2 2 0 01-2 2H6l-3-3V7a2 2 0 012-2h9.586a1 1 0 01.707.293l2.414 2.414z" />
            </svg>
          </div>
          // Title section: Board name and stats.
          <div>
            // Main title: "Project Groups" in large font.
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Project Groups</h1>
            // Subtitle: Shows number of groups and tasks, with singular/plural handling.
            <p className="text-base text-gray-500 mt-1">
              {groupCount} {groupCount === 1 ? 'group' : 'groups'} • {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
            </p>
          </div>
        </div>

        // Conditional progress section: Only shows if there are tasks.
        {totalTasks > 0 && (
          // Flex for progress stats: Aligns text, bar, and percentage.
          <div className="flex items-center gap-8">
            // Progress text: Hidden on small screens, shows completed/total.
            <div className="text-right hidden sm:block">
              <div className="text-base font-medium text-gray-600">Progress</div>
              <div className="text-xl font-semibold text-gray-900">
                {completedTasks}/{totalTasks}
              </div>
            </div>
            // Progress bar container: Gray background, rounded, with ARIA for accessibility.
            <div 
              className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={completedTasks}
              aria-valuemin={0}
              aria-valuemax={totalTasks}
            >
              // Filled bar: Green gradient, width based on completion percentage, with transition.
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
              />
            </div>
            // Percentage display: Green text, rounded calculation.
            <div className="text-lg font-semibold text-green-600 w-16 text-right">
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
            </div>
          </div>
        )}
      </div>
    </div>
  </header>
);

// 2. Statistics Section Component: Renders summary stats in cards.
const StatisticsSection = ({
  groupCount,
  totalTasks,
  completedTasks,
}: {
  groupCount: number
  totalTasks: number
  completedTasks: number
}) => (
  // Section for stats: Top margin, border, with heading.
  <section className="mt-24 pt-12 border-t border-gray-200/80" aria-labelledby="statistics-title">
    // Heading: "Board Summary" for accessibility.
    <h2 id="statistics-title" className="text-xl font-semibold text-gray-900 mb-10">Board Summary</h2>
    // Grid for stat cards: Responsive columns.
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Stat Card: Total Groups - White card with hover shadow. */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-md transition-all duration-300 ease-out">
        // Flex for content and icon.
        <div className="flex items-center justify-between">
          // Text: Label and value.
          <div>
            <p className="text-base font-medium text-gray-600">Total Groups</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{groupCount}</p>
          </div>
          // Icon: Blue background with SVG.
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2m0 0l2 2m-2-2v6a2 2 0 01-2 2H6l-3-3V7a2 2 0 012-2h9.586a1 1 0 01.707.293l2.414 2.414z" />
            </svg>
          </div>
        </div>
      </div>
      {/* Stat Card: Total Tasks - Similar structure, purple icon. */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-md transition-all duration-300 ease-out">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-medium text-gray-600">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalTasks}</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>
      {/* Stat Card: Completed - Green text and icon. */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-md transition-all duration-300 ease-out">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-medium text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{completedTasks}</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      {/* Stat Card: In Progress - Orange text and icon, calculated as total minus completed. */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-md transition-all duration-300 ease-out">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-medium text-gray-600">In Progress</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">{totalTasks - completedTasks}</p>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// 3. Empty State Component: Shown when no groups exist and user can't manage.
const EmptyStateView = () => (
  // Centered flex container for empty state message.
  <div className="flex flex-col items-center justify-center py-40 text-center max-w-3xl mx-auto">
    // Icon container: Gray circle with board SVG.
    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 ring-1 ring-gray-100">
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2m0 0l2 2m-2-2v6a2 2 0 01-2 2H6l-3-3V7a2 2 0 012-2h9.586a1 1 0 01.707.293l2.414 2.414z" />
      </svg>
    </div>
    // Title for empty state.
    <h3 className="text-xl font-semibold text-gray-900 mb-3">No Groups Yet</h3>
    // Description text.
    <p className="text-base text-gray-500 max-w-lg">
      Groups help organize your tasks and projects. Contact an admin to create your first group.
    </p>
  </div>
);


// --- MAIN COMPONENT ---
// Main exported component: GroupsBoard, takes groups, users, and canManage flag.
export default function GroupsBoard({ 
  groups, 
  users = [], 
  canManage = false 
}: { 
  groups: GroupWithTasks[]
  users?: User[]
  canManage?: boolean 
}) {
  // Array to hold completed tasks, augmented with original group name for reference.
  const completedTasks: (TaskLite & { originalGroupName: string })[] = [];
  // Mapping groups to filter out completed tasks, pushing them to completedTasks array.
  const groupsWithoutCompleted = groups.map(group => {
    // Filtering tasks: If 'DONE', add to completedTasks with group name, else keep.
    const tasksNotDone = group.tasks.filter(task => {
      if (task.status === 'DONE') {
        completedTasks.push({ ...task, originalGroupName: group.name });
        return false;
      }
      return true;
    });
    // Returning new group object with non-done tasks.
    return { ...group, tasks: tasksNotDone };
  });

  // Calculating total tasks across all groups.
  const totalTasks = groups.reduce((acc, group) => acc + group.tasks.length, 0);
  // Count of completed tasks from the array length.
  const completedTasksCount = completedTasks.length;
  // Boolean to check if there are any groups.
  const hasGroups = groups.length > 0;

  // Rendering the main div: Full height, light gray background.
  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      // Rendering BoardHeader with counts.
      <BoardHeader 
        groupCount={groups.length} 
        totalTasks={totalTasks} 
        completedTasks={completedTasksCount} 
      />

      // Main content: Centered with padding.
      <main className="max-w-screen-2xl mx-auto px-8 lg:px-12 py-16 md:py-20">
        // Conditional: If no groups and can't manage, show empty state.
        {!hasGroups && !canManage ? (
          <EmptyStateView />
        ) : (
          // Else, render groups.
          <div>
            // Space between group cards.
            <div className="space-y-16">
              // Mapping filtered groups to GroupCard components.
              {groupsWithoutCompleted.map((group, index) => (
                <GroupCard 
                  key={group.id}
                  group={group} 
                  index={index} 
                  users={users} 
                  canManage={canManage} 
                />
              ))}
              {/* Render Completed group if there are any completed tasks: Special GroupCard for completed tasks. */}
              {completedTasks.length > 0 && (
                <GroupCard
                  key="completed-group"
                  group={{
                    id: -1,  // Dummy ID for completed group.
                    name: 'Completed',
                    tasks: completedTasks.map(({ originalGroupName, ...task }) => task),  // Stripping originalGroupName for tasks.
                  }}
                  index={groups.length}  // Index after regular groups.
                  users={users} 
                  canManage={canManage}
                />
              )}
              // If canManage, render AddNewGroupCard.
              {canManage && <AddNewGroupCard />}
            </div>

            // If has groups, render statistics section.
            {hasGroups && (
              <StatisticsSection 
                groupCount={groups.length} 
                totalTasks={totalTasks} 
                completedTasks={completedTasksCount} 
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}