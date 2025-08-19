'use client';

// ========================================
// IMPORTS SECTION
// ========================================
// Component imports for building the dashboard layout
import GroupCard from './GroupCard' // Individual group card component
import AddNewGroupCard from './AddNewGroupCard' // Component for adding new groups
import { GroupWithTasks, SimpleUser } from '@/app/components/common/types'
//import { Status } from '@/app/components/common/StatusSelect';
import BoardHeader from '@/app/components/common/BoardHeader';
///import StatisticsSection from '@/app/components/common/StatisticsSection';
import EmptyStateView from '@/app/components/common/EmptyStateView';
//import { TaskLite } from '@/app/components/common/TaskDropdown';
import CompletedTasksCard from './CompletedTasksCard';
import { GroupBoardDataProvider } from '@/app/components/common/GroupBoardDataProvider';


// ========================================
// MAIN GROUPS BOARD COMPONENT
// ========================================
// Main dashboard component that orchestrates the entire board layout and functionality
export default function GroupsBoard({ 
  groups, 
  users = [], 
  canManage = false 
}: { 
  groups: GroupWithTasks[] // Array of all groups with their tasks
  users?: SimpleUser[] // Available users for task assignment
  canManage?: boolean // Whether current user can create/manage groups
}) {
  // ----------------------------------------
  // DATA PROCESSING AND CALCULATIONS
  // ----------------------------------------
  return (
    <GroupBoardDataProvider groups={groups}>
      {({ completedTasks, groupsWithoutCompleted, totalTasks, completedTasksCount, hasGroups }) => (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 antialiased">
          
          {/* ---------------------------------------- */}
          {/* BOARD HEADER */}
          {/* ---------------------------------------- */}
          <BoardHeader 
            groupCount={groups.length} 
            totalTasks={totalTasks}
            completedTasks={completedTasksCount} 
          />
          {/* ---------------------------------------- */}
          {/* MAIN CONTENT AREA */}
          {/* ---------------------------------------- */}
          <main className="max-w-screen-2xl mx-auto px-8 lg:px-12 py-16 md:py-20">
            
            {/* Show empty state if no groups exist and user cannot manage */}
            {!hasGroups && !canManage ? (
              <EmptyStateView />
            ) : (
              <div>
                
                {/* ---------------------------------------- */}
                {/* GROUPS SECTION */}
                {/* ---------------------------------------- */}
                <div className="space-y-12">
                  
                  {/* Render all active groups (tasks that are not completed) */}
                  {groupsWithoutCompleted.map((group, index) => (
                    <div key={group.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                      <GroupCard 
                        group={group} 
                        index={index} // Pass index for color assignment
                        users={users} // Pass users for task assignment dropdown
                        canManage={canManage} // Pass management permissions
                      />
                    </div>
                  ))}
                  
                  {/* ---------------------------------------- */}
                  {/* COMPLETED TASKS SECTION */}
                  {/* ---------------------------------------- */}
                  {/* Only show completed tasks section if there are completed tasks */}
                  {completedTasks.length > 0 && (
                    <CompletedTasksCard
                        completedTasks={completedTasks}
                        groupsLength={groups.length}
                        users={users}
                        canManage={canManage}
                    />
                )}
                  
                  {/* ---------------------------------------- */}
                  {/* ADD NEW GROUP SECTION */}
                  {/* ---------------------------------------- */}
                  {/* Only show add new group card if user has management permissions */}
                  {canManage && (
                    <div className="transform transition-all duration-300 hover:scale-[1.02]">
                      <AddNewGroupCard />
                    </div>
                  )}
                </div>

                {/* ---------------------------------------- */}
                {/* STATISTICS SECTION */}
                {/* ---------------------------------------- */}
                {/*hasGroups && (
                  <StatisticsSection 
                    groupCount={groups.length} 
                    totalTasks={totalTasks} 
                    completedTasks={completedTasksCount} 
                  />
                )*/}
              </div>
            )}
          </main>
        </div>
      )}
    </GroupBoardDataProvider>
  )
}