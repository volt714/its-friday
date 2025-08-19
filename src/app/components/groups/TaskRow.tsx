'use client';

import { useState } from 'react';
import type { Message } from '@/app/components/chat/types';
import { updateTask, deleteTask } from '@/app/actions/taskActions';
import type { SimpleUser } from '@/app/components/common/types';
import { Status, getStatusConfig } from '@/app/components/common/StatusSelect';
import { StatusBadge } from '@/app/components/common/StatusSelect';
import { getDueDateTone } from '@/app/components/common/DateInput';
import React from 'react'; // Explicitly import React for JSX transformation
import DateInput from '@/app/components/common/DateInput';
import OwnerSelect from '@/app/components/common/OwnerSelect';
import MessageToggleButton from '@/app/components/common/button/MessageToggleButton';
import StarButton from '@/app/components/common/button/StarButton';
import StatusSelect from '@/app/components/common/StatusSelect';
import DeleteTaskButton from '@/app/components/common/button/DeleteTaskButton';
import { useRouter } from 'next/navigation';
import TaskTitleInput from '@/app/components/common/TaskTitleInput';
import { TaskLite, getDropdownTone } from '@/app/components/common/TaskDropdown';
import TaskDropdown from '@/app/components/common/TaskDropdown';

interface TaskRowProps {
  task: TaskLite;
  users?: SimpleUser[];
  canEditCore?: boolean;
  onMessagesToggle?: (taskId: number) => void;
  isMessagesOpen?: boolean;
}

export default function TaskRow({ 
  task, 
  users = [], 
  canEditCore = false,
  onMessagesToggle,
  isMessagesOpen
}: TaskRowProps) {
  const isUser = !canEditCore;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<Status>(task.status);
  const [currentTitle, setCurrentTitle] = useState(task.title);
  const router = useRouter();

  const handleDateSubmit = async (fieldName: 'dueDate', formData: FormData) => {
    const newValue = String(formData.get(fieldName) || '');
    const currentValueISO = task[fieldName] ? new Date(task[fieldName] as string).toISOString().slice(0, 10) : '';
    if (newValue !== currentValueISO) {
      await updateTask(task.id, { [fieldName]: newValue });
    }
  };

  const handleDropdownSubmit = async (formData: FormData) => {
    const newDropdown = String(formData.get('dropdown') || '');
    if (newDropdown !== (task.dropdown ?? '')) {
      await updateTask(task.id, { dropdown: newDropdown });
    }
  };

  const handleDeleteTask = async () => {
    await deleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  const statusConfig = getStatusConfig(currentStatus);

  return (
    <>
      <div className="grid grid-cols-11 gap-0 items-center group hover:bg-[#F8F9FB] transition-colors duration-150 border-b border-[#E6E9F2] min-h-[40px] bg-white relative">
        
        <div className="col-span-1 flex justify-center px-3 py-2 border-r border-[#E6E9F2]">
          <div className="w-4 h-4 border-2 border-[#D0D4E7] rounded-[3px] hover:border-[#6161FF] cursor-pointer bg-white transition-colors duration-150 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white opacity-0 group-hover:opacity-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="col-span-3 px-3 py-2 border-r border-[#E6E9F2] flex items-center gap-2">
          <TaskTitleInput
            initialTitle={task.title}
            taskId={task.id}
            canEditCore={canEditCore}
            onTitleUpdate={setCurrentTitle}
          />
          
          <StarButton />

          <MessageToggleButton
            taskId={task.id}
            onMessagesToggle={onMessagesToggle!}
            messageCount={task.messageCount}
          />
        </div>

        <div className="col-span-2 px-3 py-2 border-r border-[#E6E9F2]">
          <OwnerSelect
            ownerId={task.ownerId}
            ownerName={task.owner}
            users={users}
            canEditCore={canEditCore}
            onOwnerChange={async (newOwnerId, newOwnerName) => {
              await updateTask(task.id, { ownerId: newOwnerId, owner: newOwnerName });
            }}
          />
        </div>

        <div className="col-span-2 px-3 py-2 border-r border-[#E6E9F2]">
          <StatusSelect
            currentStatus={currentStatus}
            onStatusChange={async (newStatus) => {
              setCurrentStatus(newStatus);
              await updateTask(task.id, { status: newStatus });
            }}
            disabled={false}
          />
        </div>

        <div className="col-span-2 px-3 py-2 border-r border-[#E6E9F2]">
          <form action={(formData) => handleDateSubmit('dueDate', formData)}>
            <DateInput
              name="dueDate"
              defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ''}
              onChange={(e) => e.target.form?.requestSubmit()}
              disabled={!(canEditCore || isUser)}
              getTone={getDueDateTone}
            />
          </form>
        </div>

       {/* <div className="col-span-1 px-3 py-2 border-r border-[#E6E9F2]">
          <TaskDropdown
                task={task}
                handleDropdownSubmit={handleDropdownSubmit}
                getDropdownTone={getDropdownTone}
                canEditCore={canEditCore}
              />
        </div>*/}

        <div className="col-span-1 px-3 py-2 flex justify-center items-center">
          {canEditCore && (
            <DeleteTaskButton
              taskId={task.id}
              currentTitle={currentTitle}
              canEditCore={canEditCore}
              onDeleteSuccess={() => { router.refresh(); }}
            />
          )}
        </div>
      </div>
    </>
  );
}
