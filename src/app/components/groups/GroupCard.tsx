'use client';

// ========================================
// IMPORTS SECTION
// ========================================
import { useState } from 'react'
import { Message } from '@/app/components/chat/types'
import { SimpleUser, GroupWithTasks } from '@/app/components/common/types'
import { getGroupColorSet, GroupColorSet } from '@/app/components/groups/groupColors';
import type { Status } from '@/app/components/common/StatusSelect'
import DeleteGroupButton from './DeleteGroupButton'
import TaskRow from './TaskRow'
import MessagesPanel from '@/app/components/chat/MessagesPanel'
import AddTaskForm from '@/app/components/common/AddTaskForm';
import { useRouter } from 'next/navigation';
import { updateTask } from '@/app/actions/taskActions';
import { TaskLite } from '@/app/components/common/TaskDropdown';
import TaskTable from './TaskTable';
import GroupHeader from './GroupHeader';

export default function GroupCard({ 
  group, 
  index, 
  users = [], 
  canManage = false 
}: { 
  group: GroupWithTasks; 
  index: number; 
  users?: SimpleUser[]; 
  canManage?: boolean 
}) {
  // ----------------------------------------
  // STATE MANAGEMENT
  // ----------------------------------------
  const [openMessagesTaskId, setOpenMessagesTaskId] = useState<number | null>(null);
  const colorSet = getGroupColorSet(index);
  const router = useRouter();
  
  // ----------------------------------------
  // TASK CREATION HANDLERS
  // ----------------------------------------
  const handleMessagesToggle = (taskId: number) => {
    setOpenMessagesTaskId(openMessagesTaskId === taskId ? null : taskId);
  };

  const handleCloseMessages = () => {
    setOpenMessagesTaskId(null);
  };
  
  return (
    <>
      {/* ---------------------------------------- */}
      {/* MAIN GROUP CARD CONTAINER */}
      {/* ---------------------------------------- */}
      <div className="bg-white rounded-[8px] border border-[#E6E9F2] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"> 
        
        {/* Group Header */}
        <GroupHeader
          group={group}
          colorSet={colorSet}
          canManage={canManage}
        />

        {/* Desktop Table Layout */}
        <TaskTable
          tasks={group.tasks}
          users={users}
          canManage={canManage}
          onMessagesToggle={handleMessagesToggle}
          openMessagesTaskId={openMessagesTaskId}
        />

        {/* Mobile Layout */}
        {/*
        <div className="lg:hidden space-y-3 p-4">
          {group.tasks.map((task: TaskLite) => (
            <div key={task.id} className="mb-3">
              <TaskRow 
                task={task}
                users={users} 
                canEditCore={canManage}
                onMessagesToggle={handleMessagesToggle}
                isMessagesOpen={openMessagesTaskId === task.id}
              />
            </div>
          ))}
        </div>*/}

        {/* Add Task Footer */}
        {canManage && (
          <AddTaskForm groupId={group.id} onTaskAdded={() => router.refresh()} />
        )}
      </div>

      {/* Messages Panel - Fixed Right Sidebar */}
      {openMessagesTaskId && (
        <MessagesPanel 
          taskId={openMessagesTaskId}
          isOpen={true}
          onClose={handleCloseMessages}
        />
      )}
    </>
  );
}