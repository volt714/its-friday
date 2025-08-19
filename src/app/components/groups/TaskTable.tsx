// ========================================
// IMPORTS SECTION
// ========================================
import React from 'react';
import TaskRow from './TaskRow';
import { TaskLite } from '@/app/components/common/TaskDropdown';
import { SimpleUser } from '@/app/components/common/types';

interface TaskTableProps {
  tasks: TaskLite[];
  users: SimpleUser[];
  canManage: boolean;
  onMessagesToggle: (taskId: number) => void;
  openMessagesTaskId: number | null;
}

export default function TaskTable({
  tasks,
  users,
  canManage,
  onMessagesToggle,
  openMessagesTaskId,
}: TaskTableProps) {
  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-12 gap-0 px-6 py-2 bg-[#F8F9FB] border-b border-[#E6E9F2]">
        <div className="col-span-1 text-center text-[12px] font-semibold text-[#9699A6] uppercase tracking-wide border-r border-[#E6E9F2] px-3">
          <div className="w-4 h-4 mx-auto">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="col-span-3 text-[12px] font-semibold text-[#9699A6] uppercase tracking-wide px-3 border-r border-[#E6E9F2]">Task</div>
        <div className="col-span-2 text-[12px] font-semibold text-[#9699A6] uppercase tracking-wide px-3 border-r border-[#E6E9F2]">Owner</div>
        <div className="col-span-2 text-[12px] font-semibold text-[#9699A6] uppercase tracking-wide px-3 border-r border-[#E6E9F2]">Status</div>
        <div className="col-span-2 text-[12px] font-semibold text-[#9699A6] uppercase tracking-wide px-3 border-r border-[#E6E9F2]">Due date</div>
      {/*  <div className="col-span-1 text-[12px] font-semibold text-[#9699A6] uppercase tracking-wide px-3 border-r border-[#E6E9F2]">Dropdown</div>
        <div className="col-span-1 text-center text-[12px] font-semibold text-[#9699A6] uppercase tracking-wide px-3">Numbers</div>*/}
      </div>
      <div>
        {tasks.map((task: TaskLite) => (
          <TaskRow 
            key={task.id} 
            task={task as any} 
            users={users} 
            canEditCore={canManage}
            onMessagesToggle={onMessagesToggle}
            isMessagesOpen={openMessagesTaskId === task.id}
          />
        ))}
      </div>
    </div>
  );
}
