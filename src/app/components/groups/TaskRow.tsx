"use client"; // Client Component to enable interactivity and form actions

import { useState } from 'react';
import { updateTask, deleteTask } from '@/app/actions'; // Server actions for updating/deleting tasks
import { getDueDateTone, getDropdownTone, getStatusSelectBaseClasses } from '@/app/components/utils'; // Tailwind class helpers
import MessagesField from './MessagesField'
import OwnerField from './OwnerField'
import type { SimpleUser } from './OwnerField'
import React from 'react'

type Status = 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK'

// Minimal task shape used by this row component
type TaskLike = {
  id: number
  title: string
  owner: string | null
  ownerId?: number | null
  status: Status
  startDate?: Date | string | null
  dueDate?: Date | string | null
  dropdown?: string | null
  assignees?: { userId: number }[]
}

// TaskRow renders a single editable task line in the desktop table layout
export default function TaskRow({ task, users = [], canEditCore = false }: { task: TaskLike; users?: SimpleUser[]; canEditCore?: boolean }) {
  const isUser = !canEditCore
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ... (All your handler functions remain exactly the same)
  // Update task title on submit
  const handleTitleSubmit = async (formData: FormData) => {
    const newTitle = String(formData.get('title') || '');
    if (newTitle !== task.title) {
      await updateTask(task.id, { title: newTitle });
    }
  };

  // Update owner string (legacy field) on submit
  const handleOwnerSubmit = async (formData: FormData) => {
    const newOwner = String(formData.get('owner') || '');
    if (newOwner !== task.owner) {
      await updateTask(task.id, { owner: newOwner });
    }
  };

  // Update status on submit
  const handleStatusSubmit = async (formData: FormData) => {
    const newStatus = String(formData.get('status')) as Status;
    if (newStatus !== task.status) {
      await updateTask(task.id, { status: newStatus });
    }
  };

  // Update start date on submit; normalize to yyyy-mm-dd string for comparison
  const handleStartDateSubmit = async (formData: FormData) => {
    const newStartDate = String(formData.get('startDate') || '');
    const currentStartDateISO = task.startDate ? new Date(task.startDate).toISOString().slice(0, 10) : '';
    if (newStartDate !== currentStartDateISO) {
      await updateTask(task.id, { startDate: newStartDate });
    }
  };

  // Update due date on submit; normalize to yyyy-mm-dd string for comparison
  const handleDueDateSubmit = async (formData: FormData) => {
    const newDueDate = String(formData.get('dueDate') || '');
    const currentDueDateISO = task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '';
    if (newDueDate !== currentDueDateISO) {
      await updateTask(task.id, { dueDate: newDueDate });
    }
  };

  // Update custom dropdown field on submit
  const handleDropdownSubmit = async (formData: FormData) => {
    const newDropdown = String(formData.get('dropdown') || '');
    if (newDropdown !== (task.dropdown ?? '')) {
      await updateTask(task.id, { dropdown: newDropdown });
    }
  };

  // Delete task after confirmation
  const handleDeleteTask = async () => {
    await deleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  // Compute status color classes for select control - Monday.com light theme style
  const getStatusDisplayColorClass = (status: Status) => {
    switch (status) {
      case 'WORKING_ON_IT':
        return 'bg-[#00C875] hover:bg-[#00B368] text-white'; // Monday green (matching your image)
      case 'DONE':
        return 'bg-[#00C875] hover:bg-[#00B368] text-white'; // Monday green (matching your image)
      case 'NOT_STARTED':
        return 'bg-[#C4C4C4] hover:bg-[#B0B0B0] text-[#323338]'; // Monday gray
      case 'STUCK':
        return 'bg-[#E2445C] hover:bg-[#D13650] text-white'; // Monday red
      default:
        return 'bg-[#C4C4C4] hover:bg-[#B0B0B0] text-[#323338]';
    }
  };

  // Get status display text
  const getStatusDisplayText = (status: Status) => {
    switch (status) {
      case 'WORKING_ON_IT':
        return 'Working on it';
      case 'DONE':
        return 'Done';
      case 'NOT_STARTED':
        return 'Not Started';
      case 'STUCK':
        return 'Stuck';
      default:
        return 'Not Started';
    }
  };


  return (
    <>
      {/* Grid layout matching the table header structure:
        col-span-1: Checkbox
        col-span-3: Task Title
        col-span-2: Owner
        col-span-1: Start Date
        col-span-2: Status
        col-span-1: Due Date
        col-span-1: Messages
        col-span-1: Empty spacing
      */}
      <div className="grid grid-cols-12 gap-3 items-center group hover:bg-[#F5F6FA] transition-all duration-150 border-b border-[#E6E8F0] min-h-[48px] bg-white px-6">
        
        {/* Checkbox */}
        <div className="col-span-1 flex justify-center">
          <div className="w-4 h-4 border-2 border-[#C4C4C4] rounded-sm hover:border-[#6161FF] cursor-pointer bg-white transition-colors duration-150"></div>
        </div>

        {/* Task Title Section */}
        <div className="col-span-3 flex items-center gap-2">
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              className="text-[#676879] hover:text-[#FDAB3D] transition-colors p-1 rounded"
              aria-label="Mark task as important"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </button>
            <button
              className="text-[#676879] hover:text-[#6161FF] transition-colors p-1 rounded"
              aria-label="View task comments"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </button>
          </div>
          <form action={handleTitleSubmit} className="flex-1">
            <input
              name="title"
              defaultValue={task.title}
              disabled={!canEditCore}
              className={`bg-transparent border-none outline-none w-full text-[#323338] text-sm placeholder-[#9699A6] transition-all duration-150 ${
                canEditCore 
                  ? 'focus:bg-white focus:outline focus:outline-2 focus:outline-[#6161FF] focus:rounded-md focus:px-2 focus:py-1 hover:bg-[#F5F6FA]' 
                  : 'cursor-not-allowed opacity-60'
              }`}
              placeholder="Enter task name..."
              onBlur={(e) => canEditCore && e.target.form?.requestSubmit()}
              onKeyDown={(e) => {
                if (!canEditCore) return
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                  e.currentTarget.blur();
                }
              }}
            />
          </form>
        </div>

        {/* Task Owner Section */}
        <div className="col-span-2">
          <OwnerField 
            taskId={task.id} 
            owner={task.owner ?? null} 
            ownerId={(task as any).ownerId ?? null} 
            users={users} 
            canManageOwners={canEditCore} 
          />
        </div>

        {/* Start Date Section */}
        <div className="col-span-1">
          <form action={handleStartDateSubmit}>
            <input
              name="startDate"
              type="date"
              defaultValue={task.startDate ? new Date(task.startDate).toISOString().slice(0, 10) : ''}
              className="bg-transparent border-none outline-none text-[#323338] text-sm w-full
                         focus:bg-white focus:outline focus:outline-2 focus:outline-[#6161FF] 
                         focus:rounded-md focus:px-2 focus:py-1 hover:bg-[#F5F6FA] cursor-pointer
                         transition-all duration-150"
              onChange={(e) => e.target.form?.requestSubmit()}
              disabled={!canEditCore}
            />
          </form>
        </div>

        {/* Task Status Section */}
        <div className="col-span-2">
          <form action={handleStatusSubmit}>
            <select
              name="status"
              defaultValue={task.status}
              className={`appearance-none cursor-pointer transition-all duration-150 text-sm font-medium
                          border-none rounded-md px-3 py-1.5 w-full text-center outline-none
                          ${getStatusDisplayColorClass(task.status)}`}
              onChange={(e) => e.target.form?.requestSubmit()}
              disabled={false}
            >
              <option value="WORKING_ON_IT">Working on it</option>
              <option value="DONE">Done</option>
              <option value="NOT_STARTED">Not Started</option>
              <option value="STUCK">Stuck</option>
            </select>
          </form>
        </div>

        {/* Due Date Section */}
        <div className="col-span-1">
          <form action={handleDueDateSubmit}>
            <input
              name="dueDate"
              type="date"
              defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ''}
              className="bg-transparent border-none outline-none text-[#323338] text-sm w-full
                         focus:bg-white focus:outline focus:outline-2 focus:outline-[#6161FF] 
                         focus:rounded-md focus:px-2 focus:py-1 hover:bg-[#F5F6FA] cursor-pointer
                         transition-all duration-150"
              onChange={(e) => e.target.form?.requestSubmit()}
              disabled={false}
            />
          </form>
        </div>

        {/* Messages Section */}
        <div className="col-span-1 flex justify-center gap-2">
          <button className="text-[#676879] hover:text-[#6161FF] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </button>
          <button className="text-[#676879] hover:text-[#6161FF] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </button>
        </div>
        
        {/* Empty column for spacing */}
        <div className="col-span-1"></div>
      </div>
      
      {/* ... (Your Modal JSX remains unchanged) ... */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border border-[#E6E8F0]">
            <div className="p-6 border-b border-[#E6E8F0]">
              <h3 className="text-lg font-semibold text-[#323338] mb-2">Delete Task</h3>
              <p className="text-[#676879] text-sm">
                Are you sure you want to delete <span className="font-medium text-[#323338]">"{task.title}"</span>? 
                This action cannot be undone.
              </p>
            </div>
           
            <div className="p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-[#676879] hover:text-[#323338] font-medium text-sm 
                           hover:bg-[#F5F6FA] rounded-md transition-all duration-150"
              >
                Cancel
              </button>
              <form action={handleDeleteTask} className="inline-block">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E2445C] hover:bg-[#D13650] text-white font-medium text-sm 
                             rounded-md transition-all duration-150"
                >
                  Delete Task
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}