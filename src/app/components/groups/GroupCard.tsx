'use client';  // This directive indicates that this component should be rendered on the client-side in Next.js, allowing the use of hooks like useState and browser-specific features.

// Importing a utility function to get color sets for groups, likely for visual distinction based on index.
import { getGroupColorSet } from '@/app/components/utils'
// Importing the Status type, which is probably an enum for task statuses like 'NOT_STARTED', 'WORKING_ON_IT', etc.
import type { Status } from '@/app/components/utils'
// Importing a mobile-specific task card component for responsive design.
import MobileTaskCard from './MobileTaskCard'
// Importing server actions for creating tasks, deleting groups, updating tasks, and deleting tasks. These are likely Next.js server actions.
import { createTask, deleteGroup, updateTask, deleteTask } from '@/app/actions'
// Importing a confirm submit button component, probably for handling deletions with confirmation.
import ConfirmSubmitButton from '@/app/components/common/ConfirmSubmitButton'
// Importing a delete group button component.
import DeleteGroupButton from './DeleteGroupButton'
// Importing a toggle input button, though it's not used in this code snippet—might be a leftover or for future use.
import ToggleInputButton from '@/app/components/common/ToggleInputButton'
// Importing an add task input component.
import AddTaskInput from '@/app/components/common/AddTaskInput'
// Importing a messages field component for displaying message counts or inputs.
import MessagesField from './MessagesField'
// Importing an owner field component and its type.
import OwnerField from './OwnerField'
import type { SimpleUser } from './OwnerField'
// Importing useState hook from React for managing local component state.
import { useState } from 'react'

// Defining a type for a lightweight task object, including id, title, owner info, status, dates, dropdown (perhaps priority), and optional message count.
type TaskLite = {
  id: number
  title: string
  owner: string | null
  ownerId: number | null
  status: Status
  startDate: string | Date | null
  dueDate: string | Date | null
  dropdown: string | null
  messageCount?: number // Add optional message count
}

// Defining a type for a group that contains tasks, with id, name, and an array of TaskLite objects.
type GroupWithTasks = {
  id: number
  name: string
  tasks: TaskLite[]
}

// This is the TaskRow component, which renders a single row for a task in the desktop table view. It takes a task, optional users list, and a flag for edit permissions.
function TaskRow({ task, users = [], canEditCore = false }: { task: TaskLite; users?: SimpleUser[]; canEditCore?: boolean }) {
  // Determining if the current view is for a regular user (no core edits) based on canEditCore.
  const isUser = !canEditCore
  // State for showing the delete confirmation modal.
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // State to track the current status, initialized with the task's status, for optimistic updates.
  const [currentStatus, setCurrentStatus] = useState<Status>(task.status);
  // State to track the current title, for optimistic updates when editing.
  const [currentTitle, setCurrentTitle] = useState(task.title);

  // Handler for submitting title changes: Gets new title from form, updates local state if changed, and calls updateTask action.
  const handleTitleSubmit = async (formData: FormData) => {
    const newTitle = String(formData.get('title') || '');
    if (newTitle !== task.title) {
      setCurrentTitle(newTitle);
      await updateTask(task.id, { title: newTitle });
    }
  };

  // Handler for owner changes: Updates task owner if changed.
  const handleOwnerSubmit = async (formData: FormData) => {
    const newOwner = String(formData.get('owner') || '');
    if (newOwner !== task.owner) {
      await updateTask(task.id, { owner: newOwner });
    }
  };

  // Handler for status changes: Updates local state and calls updateTask.
  const handleStatusSubmit = async (formData: FormData) => {
    const newStatus = String(formData.get('status')) as Status;
    if (newStatus !== currentStatus) {
      setCurrentStatus(newStatus);
      await updateTask(task.id, { status: newStatus });
    }
  };

  // Handler for start date changes: Compares ISO strings and updates if different. Note: startDate isn't used in the JSX, might be a placeholder.
  const handleStartDateSubmit = async (formData: FormData) => {
    const newStartDate = String(formData.get('startDate') || '');
    const currentStartDateISO = task.startDate ? new Date(task.startDate).toISOString().slice(0, 10) : '';
    if (newStartDate !== currentStartDateISO) {
      await updateTask(task.id, { startDate: newStartDate });
    }
  };

  // Handler for due date changes: Similar to start date, updates if changed.
  const handleDueDateSubmit = async (formData: FormData) => {
    const newDueDate = String(formData.get('dueDate') || '');
    const currentDueDateISO = task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '';
    if (newDueDate !== currentDueDateISO) {
      await updateTask(task.id, { dueDate: newDueDate });
    }
  };

  // Handler for dropdown (priority?) changes: Updates if different from current value.
  const handleDropdownSubmit = async (formData: FormData) => {
    const newDropdown = String(formData.get('dropdown') || '');
    if (newDropdown !== (task.dropdown ?? '')) {
      await updateTask(task.id, { dropdown: newDropdown });
    }
  };

  // Handler for deleting the task: Calls deleteTask action and hides confirmation.
  const handleDeleteTask = async () => {
    await deleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  // Utility function to get styling config based on status: Returns background, hover, text colors, and label for each status.
  const getStatusConfig = (status: Status) => {
    switch (status) {
      case 'WORKING_ON_IT':
        return {
          bg: 'bg-[#FDAB3D]',
          hover: 'hover:bg-[#E6941A]',
          text: 'text-white',
          label: 'Working on it'
        };
      case 'DONE':
        return {
          bg: 'bg-[#00C875]',
          hover: 'hover:bg-[#00B368]',
          text: 'text-white',
          label: 'Done'
        };
      case 'NOT_STARTED':
        return {
          bg: 'bg-[#C4C4C4]',
          hover: 'hover:bg-[#AFAFAF]',
          text: 'text-[#323338]',
          label: 'Not Started'
        };
      case 'STUCK':
        return {
          bg: 'bg-[#E2445C]',
          hover: 'hover:bg-[#D13650]',
          text: 'text-white',
          label: 'Stuck'
        };
      default:
        return {
          bg: 'bg-[#C4C4C4]',
          hover: 'hover:bg-[#AFAFAF]',
          text: 'text-[#323338]',
          label: 'Not Started'
        };
    }
  };

  // Getting the config for the current status.
  const statusConfig = getStatusConfig(currentStatus);

  // Rendering the task row: A grid with 12 columns for the table-like structure.
  return (
    <>
      <div className="grid grid-cols-12 gap-0 items-center group hover:bg-[#F8F9FB] transition-colors duration-150 border-b border-[#E6E9F2] min-h-[40px] bg-white relative">
        
        {/* Checkbox - Column 1: A checkbox for selecting the task, with hover effects. */}
        <div className="col-span-1 flex justify-center px-3 py-2 border-r border-[#E6E9F2]">
          <div className="w-4 h-4 border-2 border-[#D0D4E7] rounded-[3px] hover:border-[#6161FF] cursor-pointer bg-white transition-colors duration-150 flex items-center justify-center">
            {/* Checkmark icon - hidden by default, shown on hover/checked */}
            <svg className="w-2.5 h-2.5 text-white opacity-0 group-hover:opacity-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Task Title with Star and Message Icons - Columns 2-4: Form for editing title, star button for favoriting, and messages field. */}
        <div className="col-span-3 px-3 py-2 border-r border-[#E6E9F2] flex items-center gap-2">
          <form action={handleTitleSubmit} className="flex-1">
            <input
              name="title"
              value={currentTitle}
              disabled={!canEditCore}
              className={`bg-transparent border-none outline-none w-full text-[#323338] text-[14px] font-normal placeholder-[#9699A6] transition-all duration-150 ${
                canEditCore 
                  ? 'hover:bg-[#F8F9FB] focus:bg-white focus:ring-2 focus:ring-[#6161FF]/20 focus:border-[#6161FF] rounded-[4px] px-2 py-1' 
                  : 'cursor-not-allowed opacity-70'
              }`}
              placeholder="Enter task name..."
              onChange={(e) => setCurrentTitle(e.target.value)}  // Updates local title state on change.
              onBlur={(e) => canEditCore && e.target.form?.requestSubmit()}  // Submits on blur if editable.
              onKeyDown={(e) => {  // Handles Enter to submit and Escape implicitly via blur.
                if (!canEditCore) return
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                  e.currentTarget.blur();
                }
              }}
            />
          </form>
          
          {/* Star Icon: Button to favorite the task, with color change on hover. */}
          <button className="text-[#D0D4E7] hover:text-[#FDAB3D] transition-colors p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>

          {/* Messages with Count: Component for displaying or editing messages related to the task. */}
          <MessagesField 
            taskId={task.id}
            value={null}
            disabled={!canEditCore}
          />
        </div>

        {/* Owner - Columns 5-6: Select dropdown for assigning owner, submits on change if editable. */}
        <div className="col-span-2 px-3 py-2 border-r border-[#E6E9F2]">
          <form action={handleOwnerSubmit}>
            <select
              name="owner"
              value={task.owner || ''}
              className="bg-transparent border-none outline-none text-[#323338] text-[13px] w-full
                         hover:bg-[#F8F9FB] focus:bg-white focus:ring-2 focus:ring-[#6161FF]/20 
                         focus:border-[#6161FF] rounded-[4px] px-2 py-1 cursor-pointer
                         transition-all duration-150"
              onChange={(e) => e.target.form?.requestSubmit()}  // Submits form on selection change.
              disabled={!canEditCore}
            >
              <option value="">Unassigned</option>
              {users.map((user) => (  // Mapping users to options.
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </form>
        </div>

        {/* Status - Columns 7-8: Select for status, with dynamic styling based on config, updates on change. */}
        <div className="col-span-2 px-3 py-2 border-r border-[#E6E9F2]">
          <form action={handleStatusSubmit}>
            <select
              name="status"
              value={currentStatus}
              className={`appearance-none cursor-pointer transition-all duration-150 text-[13px] font-medium
                          border-none rounded-[4px] px-3 py-1.5 w-full text-center outline-none
                          ${statusConfig.bg} ${statusConfig.hover} ${statusConfig.text}
                          focus:ring-2 focus:ring-offset-1 focus:ring-current/30`}
              onChange={(e) => {
                const newStatus = e.target.value as Status;
                setCurrentStatus(newStatus);  // Optimistic update.
                e.target.form?.requestSubmit();  // Submit change.
              }}
              disabled={false}  // Always enabled? Might be a bug or intentional.
            >
              <option value="NOT_STARTED">Not Started</option>
              <option value="WORKING_ON_IT">Working on it</option>
              <option value="DONE">Done</option>
              <option value="STUCK">Stuck</option>
            </select>
          </form>
        </div>

        {/* Due Date - Columns 9-10: Date input for due date, submits on change. */}
        <div className="col-span-2 px-3 py-2 border-r border-[#E6E9F2]">
          <form action={handleDueDateSubmit}>
            <input
              name="dueDate"
              type="date"
              defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ''}
              className="bg-transparent border-none outline-none text-[#323338] text-[13px] w-full
                         hover:bg-[#F8F9FB] focus:bg-white focus:ring-2 focus:ring-[#6161FF]/20 
                         focus:border-[#6161FF] rounded-[4px] px-2 py-1 cursor-pointer
                         transition-all duration-150"
              onChange={(e) => e.target.form?.requestSubmit()}  // Submits on date selection.
              disabled={!canEditCore}
            />
          </form>
        </div>

        {/* Dropdown - Column 11: Select for priority or custom dropdown, submits on change. */}
        <div className="col-span-1 px-3 py-2 border-r border-[#E6E9F2]">
          <form action={handleDropdownSubmit}>
            <select
              name="dropdown"
              value={task.dropdown || ''}
              className="bg-transparent border-none outline-none text-[#323338] text-[13px] w-full
                         hover:bg-[#F8F9FB] focus:bg-white focus:ring-2 focus:ring-[#6161FF]/20 
                         focus:border-[#6161FF] rounded-[4px] px-2 py-1 cursor-pointer
                         transition-all duration-150"
              onChange={(e) => e.target.form?.requestSubmit()}
              disabled={!canEditCore}
            >
              <option value="">-</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </form>
        </div>

        {/* Numbers/Actions - Column 12: Delete button visible on hover if editable. */}
        <div className="col-span-1 px-3 py-2 flex justify-center items-center">
          {canEditCore && (
            <button
              onClick={() => setShowDeleteConfirm(true)}  // Shows confirmation modal.
              className="opacity-0 group-hover:opacity-100 text-[#9699A6] hover:text-[#E2445C] transition-all duration-150 p-1 rounded"
              aria-label="Delete task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal: Overlay with confirmation dialog for deleting the task. */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 border border-[#E6E9F2]">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFE6E6] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#E2445C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#323338]">Delete Task</h3>
                  <p className="text-[#676879] text-sm mt-1">
                    Are you sure you want to delete "{currentTitle}"? This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}  // Cancels deletion.
                  className="px-4 py-2 text-[#676879] hover:text-[#323338] font-medium text-sm 
                             hover:bg-[#F8F9FB] rounded-md transition-colors duration-150"
                >
                  Cancel
                </button>
                <form action={handleDeleteTask} className="inline-block">  // Form to handle delete action.
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#E2445C] hover:bg-[#D13650] text-white font-medium text-sm 
                               rounded-md transition-colors duration-150"
                  >
                    Delete Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// The main exported component: GroupCard, which renders a card for a task group, including header, tasks table (desktop), mobile cards, and add task functionality.
export default function GroupCard({ 
  group, 
  index, 
  users = [], 
  canManage = false 
}: { 
  group: GroupWithTasks; 
  index: number; 
  users?: { id: number; name: string }[]; 
  canManage?: boolean 
}) {
  // State for new task title when adding.
  const [newTaskTitle, setNewTaskTitle] = useState('');
  // State to toggle adding task mode.
  const [isAddingTask, setIsAddingTask] = useState(false);
  // Unique ID for toggle, based on group ID.
  const toggleId = `add-task-${group.id}`;
  // Getting color set for the group based on index.
  const colorSet = getGroupColorSet(index);
  
  // Handler for creating a new task: Trims title, creates if not empty, resets state on success.
  const handleCreateTask = async (formData: FormData) => {
    const title = String(formData.get('title') || '').trim();
    
    if (!title) {
      // Don't create empty tasks
      return;
    }
    
    try {
      await createTask({
        groupId: group.id,
        title: title,
        owner: String(formData.get('owner') || ''),
        status: 'NOT_STARTED',
        startDate: null,
        dueDate: null, // Changed from empty string to null
        dropdown: null, // Changed from empty string to null
      });
      
      // Reset form state after successful creation
      setNewTaskTitle('');
      setIsAddingTask(false);
    } catch (error) {
      console.error('Error creating task:', error);
      // You might want to show an error message to the user here
    }
  };

  // Handler to start adding a task.
  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  // Handler to cancel adding a task.
  const handleCancelAdd = () => {
    setIsAddingTask(false);
    setNewTaskTitle('');
  };

  // Keydown handler for task input: Enter to submit if valid, Escape to cancel.
  const handleTaskInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form && newTaskTitle.trim()) {
        form.requestSubmit();
      }
    } else if (e.key === 'Escape') {
      handleCancelAdd();
    }
  };
  
  // Rendering the group card: A container with header, table or mobile views, and add task section if manageable.
  return (
    <div className="bg-white rounded-[8px] border border-[#E6E9F2] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"> 
      {/* Group Header: Includes collapse button, color dot, name, task count, delete if manageable, and add button. */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#F8F9FB] border-b border-[#E6E9F2]"> 
        <div className="flex items-center gap-3">
          <button className="text-[#676879] hover:text-[#323338] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`w-3 h-3 rounded-full ${colorSet.bg}`}></div>
          
          <h3 className="font-semibold text-[16px] text-[#323338]">{group.name}</h3>
          
          <span className="text-[13px] text-[#676879] bg-[#EBEDF5] px-2 py-0.5 rounded-full font-medium">
            {group.tasks.length}
          </span>
          
          {canManage && (
            <div className="ml-2">
              <DeleteGroupButton groupId={group.id} groupName={group.name} />
            </div>
          )}
        </div>
        
        {canManage && (
          <div className="flex items-center gap-2">
            <button className="text-[#9699A6] hover:text-[#6161FF] transition-colors p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Table Header: Visible on large screens, grid headers for columns. */}
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
          <div className="col-span-1 text-[12px] font-semibold text-[#9699A6] uppercase tracking-wide px-3 border-r border-[#E6E9F2]">Dropdown</div>
          <div className="col-span-1 text-center text-[12px] font-semibold text-[#9699A6] uppercase tracking-wide px-3">Numbers</div>
        </div>

        {/* Task Rows: Mapping tasks to TaskRow components for desktop view. */}
        <div>
          {group.tasks.map((task: TaskLite) => (
            <TaskRow key={task.id} task={task as any} users={users} canEditCore={canManage} />
          ))}
        </div>
      </div>

      {/* Mobile Layout: Shows MobileTaskCard for each task on smaller screens. */}
      <div className="lg:hidden space-y-3 p-4">
        {group.tasks.map((task: TaskLite) => (
          <MobileTaskCard key={task.id} task={task as any} canEditCore={canManage} />
        ))}
      </div>

      {/* Add Task Footer: If manageable, shows button to add task or the input form when active. */}
      {canManage && (
        <div className="px-6 py-3 border-t border-[#E6E9F2] bg-[#FCFCFC]">
          {!isAddingTask ? (
            <button
              type="button"
              onClick={handleAddTaskClick}  // Toggles to add mode.
              className="flex items-center gap-2 text-[#9699A6] hover:text-[#6161FF] text-[14px] font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add task
            </button>
          ) : (
            <form action={handleCreateTask} className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <svg className="w-4 h-4 text-[#6161FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <input
                  name="title"
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}  // Updates title state.
                  onKeyDown={handleTaskInputKeyDown}  // Handles Enter and Escape.
                  className="flex-1 bg-transparent border border-[#E6E9F2] rounded-[4px] px-3 py-2 text-[14px] text-[#323338] 
                             placeholder-[#9699A6] focus:outline-none focus:ring-2 focus:ring-[#6161FF]/20 focus:border-[#6161FF]
                             transition-all duration-150"
                  placeholder="Enter task name..."
                  autoFocus  // Focuses input automatically.
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={!newTaskTitle.trim()}  // Disabled if empty.
                  className="px-3 py-1.5 bg-[#6161FF] text-white text-[13px] font-medium rounded-[4px] 
                             hover:bg-[#5151FF] disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-150"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={handleCancelAdd}  // Cancels add mode.
                  className="px-3 py-1.5 text-[#676879] hover:text-[#323338] text-[13px] font-medium 
                             hover:bg-[#F8F9FB] rounded-[4px] transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}