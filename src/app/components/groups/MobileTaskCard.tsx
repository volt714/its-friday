import { getStatusColor, getStatusSelectBaseClasses, getOwnerBadgeColor, getDueDateTone, getDropdownTone } from '@/app/components/utils'
import type { Task } from '@prisma/client'
import { updateTask, deleteTask } from '@/app/actions'

// MobileTaskCard renders a compact editable view of a task for small screens
export default function MobileTaskCard({ task, canEditCore = false }: { task: Task; canEditCore?: boolean }) {
  // Wrapper functions for server actions since this component is used within a client component
  const handleUpdateTitle = async (formData: FormData) => {
    await updateTask(task.id, { title: String(formData.get('title') || '') })
  }
  
  const handleDeleteTask = async () => {
    await deleteTask(task.id)
  }
  
  const handleUpdateStartDate = async (formData: FormData) => {
    const v = String(formData.get('startDate') || '')
    await updateTask(task.id, { startDate: v })
  }
  
  const handleUpdateOwner = async (formData: FormData) => {
    await updateTask(task.id, { owner: String(formData.get('owner') || '') })
  }
  
  const handleUpdateStatus = async (formData: FormData) => {
    await updateTask(task.id, { status: String(formData.get('status')) as any })
  }
  
  const handleUpdateDueDate = async (formData: FormData) => {
    const v = String(formData.get('dueDate') || '')
    await updateTask(task.id, { dueDate: v })
  }
  
  const handleUpdateDropdown = async (formData: FormData) => {
    await updateTask(task.id, { dropdown: String(formData.get('dropdown') || '') })
  }

  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow text-gray-900">
      {/* Title and delete button */}
      <div className="flex items-start justify-between mb-3">
        <form action={handleUpdateTitle} className="flex-1">
          <input
            name="title"
            defaultValue={task.title}
            disabled={!canEditCore}
            className={`font-medium bg-transparent border-none outline-none w-full rounded transition-all placeholder-gray-500 ${
              canEditCore ? 'focus:bg-gray-50 focus:px-2 focus:py-1' : 'cursor-not-allowed opacity-70'
            }`}
          />
        </form>
        <form action={handleDeleteTask}>
          <button className="text-red-500 hover:text-red-700 ml-2" disabled={!canEditCore}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </form>
      </div>
      {/* Editable fields */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <label className="text-gray-700 text-xs block mb-1">Start date</label>
          <form action={handleUpdateStartDate}>
            <input
              name="startDate"
              type="date"
              defaultValue={task.startDate ? new Date(task.startDate).toISOString().slice(0, 10) : ''}
              disabled={!canEditCore}
              className={`bg-transparent border-none outline-none rounded text-sm w-full ${canEditCore ? 'focus:bg-gray-50 focus:px-1' : 'cursor-not-allowed opacity-70'}`}
            />
          </form>
        </div>
        <div>
          <label className="text-gray-700 text-xs block mb-1">Owner</label>
          <form action={handleUpdateOwner}>
            {task.owner ? (
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-semibold ${getOwnerBadgeColor(task.owner)}`}>
                  {task.owner.charAt(0).toUpperCase()}
                </div>
                 <input
                  name="owner"
                  defaultValue={task.owner}
                   disabled={!canEditCore}
                   className={`bg-transparent border-none outline-none flex-1 rounded text-sm ${canEditCore ? 'focus:bg-gray-50 focus:px-1' : 'cursor-not-allowed opacity-70'}`}
                />
              </div>
            ) : (
              <input
                name="owner"
                placeholder="Unassigned"
                disabled={!canEditCore}
                className={`bg-transparent border-none outline-none w-full rounded text-gray-700 placeholder-gray-500 text-sm ${canEditCore ? 'focus:bg-gray-50 focus:px-1' : 'cursor-not-allowed opacity-70'}`}
              />
            )}
          </form>
        </div>
        <div>
          <label className="text-gray-700 text-xs block mb-1">Status</label>
          <form action={handleUpdateStatus}>
            <select
              name="status"
              defaultValue={task.status as any}
              className={`${getStatusSelectBaseClasses()} text-xs cursor-pointer w-full ${getStatusColor(task.status)}`}
              disabled={!canEditCore}
            >
              <option value="WORKING_ON_IT">Working on it</option>
              <option value="DONE">Done</option>
              <option value="NOT_STARTED">Not Started</option>
              <option value="STUCK">Stuck</option>
            </select>
          </form>
        </div>
        <div>
          <label className="text-gray-700 text-xs block mb-1">Due date</label>
          <form action={handleUpdateDueDate}>
            <input
              name="dueDate"
              type="date"
              defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ''}
              disabled={!canEditCore}
              className={`bg-transparent border-none outline-none rounded text-sm w-full ${getDueDateTone(task.dueDate as any)} ${canEditCore ? 'focus:bg-gray-50 focus:px-1' : 'cursor-not-allowed opacity-70'}`}
            />
          </form>
        </div>
        <div>
          <label className="text-gray-700 text-xs block mb-1">Dropdown</label>
          <form action={handleUpdateDropdown}>
            <input
              name="dropdown"
              defaultValue={task.dropdown ?? ''}
              placeholder="Add value"
              disabled={!canEditCore}
              className={`bg-transparent border-none outline-none w-full rounded text-sm ${getDropdownTone(task.dropdown)} ${canEditCore ? 'focus:bg-gray-50 focus:px-1' : 'cursor-not-allowed opacity-70'}`}
            />
          </form>
        </div>
      </div>
    </div>
  )
}


