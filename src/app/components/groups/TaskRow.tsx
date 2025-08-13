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

  // Update task title on submit
  const handleTitleSubmit = async (formData: FormData) => {
    // 'use server'; <-- REMOVED: This directive should not be here
    const newTitle = String(formData.get('title') || '');
    if (newTitle !== task.title) { // Only update if changed
      await updateTask(task.id, { title: newTitle });
    }
  };

  // Update owner string (legacy field) on submit
  const handleOwnerSubmit = async (formData: FormData) => {
    // 'use server'; <-- REMOVED
    const newOwner = String(formData.get('owner') || '');
    if (newOwner !== task.owner) { // Only update if changed
      await updateTask(task.id, { owner: newOwner });
    }
  };

  // Update status on submit
  const handleStatusSubmit = async (formData: FormData) => {
    // 'use server'; <-- REMOVED
    const newStatus = String(formData.get('status')) as Status;
    if (newStatus !== task.status) { // Only update if changed
      await updateTask(task.id, { status: newStatus });
    }
  };

  // Update start date on submit; normalize to yyyy-mm-dd string for comparison
  const handleStartDateSubmit = async (formData: FormData) => {
    // 'use server'; <-- REMOVED
    const newStartDate = String(formData.get('startDate') || '');
    // Convert newStartDate to Date or null before comparing, handle potential invalid date string
    const currentStartDateISO = task.startDate ? new Date(task.startDate).toISOString().slice(0, 10) : '';
    if (newStartDate !== currentStartDateISO) { // Only update if changed
      await updateTask(task.id, { startDate: newStartDate });
    }
  };

  // Update due date on submit; normalize to yyyy-mm-dd string for comparison
  const handleDueDateSubmit = async (formData: FormData) => {
    // 'use server'; <-- REMOVED
    const newDueDate = String(formData.get('dueDate') || '');
    // Convert newDueDate to Date or null before comparing, handle potential invalid date string
    const currentDueDateISO = task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '';
    if (newDueDate !== currentDueDateISO) { // Only update if changed
      await updateTask(task.id, { dueDate: newDueDate });
    }
  };

  // Update custom dropdown field on submit
  const handleDropdownSubmit = async (formData: FormData) => {
    // 'use server'; <-- REMOVED
    const newDropdown = String(formData.get('dropdown') || '');
    if (newDropdown !== (task.dropdown ?? '')) { // Only update if changed
      await updateTask(task.id, { dropdown: newDropdown });
    }
  };

  // Delete task after confirmation
  const handleDeleteTask = async () => {
    // 'use server'; <-- REMOVED
    await deleteTask(task.id);
    setShowDeleteConfirm(false); // Close the modal after deletion
  };

  // Compute status color classes for select control
  const getStatusDisplayColorClass = (status: Status) => {
    switch (status) {
      case 'WORKING_ON_IT':
        return 'bg-green-500 text-white'; // Green for 'Working on it'
      case 'DONE':
        return 'bg-orange-500 text-white'; // Orange for 'Done'
      case 'NOT_STARTED':
        return 'bg-gray-600 text-white'; // Dark gray for 'Not Started'
      case 'STUCK':
        return 'bg-red-500 text-white'; // Orange for 'Stuck'
      default:
        return 'bg-gray-200 text-gray-800'; // Default neutral color
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-3 px-6 py-3 hover:bg-gray-50 items-center group transition-colors text-gray-900">
        {/* Task Title Section */}
        <div className="col-span-3 flex items-center gap-2">
          {/* Action Buttons (Star and Comment) - visible on hover */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="text-gray-700 hover:text-yellow-500 transition-colors"
              aria-label="Mark task as important"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <button
              className="text-gray-700 hover:text-blue-500 transition-colors"
              aria-label="View task comments"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
          {/* Editable Task Title Input */}
          <form action={handleTitleSubmit} className="flex-1">
            <input
              name="title"
              defaultValue={task.title}
              disabled={!canEditCore}
              className={`bg-transparent border-none outline-none w-full placeholder-gray-400 rounded-md transition-all text-gray-900 text-[15px] ${
                canEditCore ? 'focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:px-2 focus:py-1' : 'cursor-not-allowed opacity-70'
              }`}
              onBlur={(e) => canEditCore && e.target.form?.requestSubmit()} // Submit on blur
              onKeyDown={(e) => {
                if (!canEditCore) return
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent new line in input
                  e.currentTarget.form?.requestSubmit(); // Submit on Enter
                  e.currentTarget.blur(); // Remove focus after submit
                }
              }}
            />
          </form>
        </div>

        {/* Task Owner Section */}
        <div className="col-span-2">
          <OwnerField taskId={task.id} owner={task.owner ?? null} ownerId={(task as any).ownerId ?? null} users={users} canManageOwners={canEditCore} />
        </div>

        {/* Start Date Section */}
        <div className="col-span-1">
           <form action={handleStartDateSubmit}>
            <input
              name="startDate"
              type="date"
              defaultValue={task.startDate ? new Date(task.startDate).toISOString().slice(0, 10) : ''}
              className="bg-transparent border-none outline-none
                          focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:px-2 focus:py-1 rounded-md text-sm w-full transition-all"
              onChange={(e) => e.target.form?.requestSubmit()} // Submit on change
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
              // Dynamically apply color based on status, explicitly matching the image
              className={`${getStatusSelectBaseClasses()} cursor-pointer appearance-none transition-all ${getStatusDisplayColorClass(task.status)} text-sm`}
              onChange={(e) => e.target.form?.requestSubmit()} // Submit on change
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
              className={`bg-transparent border-none outline-none
                          focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:px-2 focus:py-1 rounded-md text-sm w-full transition-all
                          ${getDueDateTone(task.dueDate as any)}`} // Use utility for due date tone
              onChange={(e) => e.target.form?.requestSubmit()} // Submit on change
              disabled={false}
            />
          </form>
        </div>

        {/* Messages (uses dropdown column to persist notes) */}
        <div className="col-span-1">
          <MessagesField taskId={task.id} value={task.dropdown} disabled={!canEditCore} />
        </div>

        {/* Delete Button Section */}
        <div className="col-span-1 flex justify-end">
          <button
            onClick={() => setShowDeleteConfirm(true)} // Show confirmation modal on click
            className="text-red-500 hover:text-red-700 text-xs p-1 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-md transition-all"
            aria-label="Delete task"
            disabled={!canEditCore}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete the task &quot;{task.title}&quot;? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <form action={handleDeleteTask} className="inline-block">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
