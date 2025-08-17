import GroupCard from './GroupCard'
import AddNewGroupCard from './AddNewGroupCard'
import type { Status } from '@/app/components/utils'

// --- TYPE DEFINITIONS ---
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

type GroupWithTasks = {
  id: number
  name: string
  tasks: TaskLite[]
}

type User = { 
  id: number; 
  name: string; 
}

// --- SUB-COMPONENTS for clarity and maintainability ---

// 1. Board Header Component
const BoardHeader = ({
  groupCount,
  totalTasks,
  completedTasks,
}: {
  groupCount: number
  totalTasks: number
  completedTasks: number
}) => (
  <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
    <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-md ring-1 ring-indigo-100">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2m0 0l2 2m-2-2v6a2 2 0 01-2 2H6l-3-3V7a2 2 0 012-2h9.586a1 1 0 01.707.293l2.414 2.414z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Project Groups</h1>
            <p className="text-base text-gray-500 mt-1">
              {groupCount} {groupCount === 1 ? 'group' : 'groups'} • {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
            </p>
          </div>
        </div>

        {totalTasks > 0 && (
          <div className="flex items-center gap-8">
            <div className="text-right hidden sm:block">
              <div className="text-base font-medium text-gray-600">Progress</div>
              <div className="text-xl font-semibold text-gray-900">
                {completedTasks}/{totalTasks}
              </div>
            </div>
            <div 
              className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={completedTasks}
              aria-valuemin={0}
              aria-valuemax={totalTasks}
            >
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
              />
            </div>
            <div className="text-lg font-semibold text-green-600 w-16 text-right">
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
            </div>
          </div>
        )}
      </div>
    </div>
  </header>
);

// 2. Statistics Section Component
const StatisticsSection = ({
  groupCount,
  totalTasks,
  completedTasks,
}: {
  groupCount: number
  totalTasks: number
  completedTasks: number
}) => (
  <section className="mt-24 pt-12 border-t border-gray-200/80" aria-labelledby="statistics-title">
    <h2 id="statistics-title" className="text-xl font-semibold text-gray-900 mb-10">Board Summary</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Stat Card: Total Groups */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-md transition-all duration-300 ease-out">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-medium text-gray-600">Total Groups</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{groupCount}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2m0 0l2 2m-2-2v6a2 2 0 01-2 2H6l-3-3V7a2 2 0 012-2h9.586a1 1 0 01.707.293l2.414 2.414z" />
            </svg>
          </div>
        </div>
      </div>
      {/* Stat Card: Total Tasks */}
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
      {/* Stat Card: Completed */}
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
      {/* Stat Card: In Progress */}
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

// 3. Empty State Component
const EmptyStateView = () => (
  <div className="flex flex-col items-center justify-center py-40 text-center max-w-3xl mx-auto">
    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 ring-1 ring-gray-100">
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2m0 0l2 2m-2-2v6a2 2 0 01-2 2H6l-3-3V7a2 2 0 012-2h9.586a1 1 0 01.707.293l2.414 2.414z" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">No Groups Yet</h3>
    <p className="text-base text-gray-500 max-w-lg">
      Groups help organize your tasks and projects. Contact an admin to create your first group.
    </p>
  </div>
);


// --- MAIN COMPONENT ---
export default function GroupsBoard({ 
  groups, 
  users = [], 
  canManage = false 
}: { 
  groups: GroupWithTasks[]
  users?: User[]
  canManage?: boolean 
}) {
  // Separate completed tasks and keep track of their original group
  const completedTasks: (TaskLite & { originalGroupName: string })[] = [];
  const groupsWithoutCompleted = groups.map(group => {
    const tasksNotDone = group.tasks.filter(task => {
      if (task.status === 'DONE') {
        completedTasks.push({ ...task, originalGroupName: group.name });
        return false;
      }
      return true;
    });
    return { ...group, tasks: tasksNotDone };
  });

  const totalTasks = groups.reduce((acc, group) => acc + group.tasks.length, 0);
  const completedTasksCount = completedTasks.length;
  const hasGroups = groups.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      <BoardHeader 
        groupCount={groups.length} 
        totalTasks={totalTasks} 
        completedTasks={completedTasksCount} 
      />

      <main className="max-w-screen-2xl mx-auto px-8 lg:px-12 py-16 md:py-20">
        {!hasGroups && !canManage ? (
          <EmptyStateView />
        ) : (
          <div>
            <div className="space-y-16">
              {groupsWithoutCompleted.map((group, index) => (
                <GroupCard 
                  key={group.id}
                  group={group} 
                  index={index} 
                  users={users} 
                  canManage={canManage} 
                />
              ))}
              {/* Render Completed group if there are any completed tasks */}
              {completedTasks.length > 0 && (
                <GroupCard
                  key="completed-group"
                  group={{
                    id: -1,
                    name: 'Completed',
                    tasks: completedTasks.map(({ originalGroupName, ...task }) => task),
                  }}
                  index={groups.length}
                  users={users}
                  canManage={canManage}
                />
              )}
              {canManage && <AddNewGroupCard />}
            </div>

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