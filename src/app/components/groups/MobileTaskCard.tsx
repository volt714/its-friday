import { getStatusColor, getStatusSelectBaseClasses, getOwnerBadgeColor, getDueDateTone, getDropdownTone } from '@/app/components/utils'
import type { Task } from '@prisma/client'
import { updateTask, deleteTask } from '@/app/actions'

export default function MobileTaskCard({ task }: { task: Task }) {
  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow text-gray-900">
      <div className="flex items-start justify-between mb-3">
        <form action={async (formData: FormData) => {
          'use server'
          await updateTask(task.id, { title: String(formData.get('title') || '') })
        }} className="flex-1">
          <input
            name="title"
            defaultValue={task.title}
            className="font-medium bg-transparent border-none outline-none w-full focus:bg-gray-50 focus:px-2 focus:py-1 rounded transition-all placeholder-gray-500"
          />
        </form>
        <form action={async () => {
          'use server'
          await deleteTask(task.id)
        }}>
          <button className="text-red-500 hover:text-red-700 ml-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </form>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <label className="text-gray-700 text-xs block mb-1">Owner</label>
          <form action={async (formData: FormData) => {
            'use server'
            await updateTask(task.id, { owner: String(formData.get('owner') || '') })
          }}>
            {task.owner ? (
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-semibold ${getOwnerBadgeColor(task.owner)}`}>
                  {task.owner.charAt(0).toUpperCase()}
                </div>
                 <input
                  name="owner"
                  defaultValue={task.owner}
                   className="bg-transparent border-none outline-none flex-1 focus:bg-gray-50 focus:px-1 rounded text-sm"
                />
              </div>
            ) : (
              <input
                name="owner"
                placeholder="Unassigned"
                className="bg-transparent border-none outline-none w-full focus:bg-gray-50 focus:px-1 rounded text-gray-700 placeholder-gray-500 text-sm"
              />
            )}
          </form>
        </div>
        <div>
          <label className="text-gray-700 text-xs block mb-1">Status</label>
          <form action={async (formData: FormData) => {
            'use server'
            await updateTask(task.id, { status: String(formData.get('status')) as any })
          }}>
            <select
              name="status"
              defaultValue={task.status as any}
              className={`${getStatusSelectBaseClasses()} text-xs cursor-pointer w-full ${getStatusColor(task.status)}`}
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
          <form action={async (formData: FormData) => {
            'use server'
            const v = String(formData.get('dueDate') || '')
            await updateTask(task.id, { dueDate: v })
          }}>
            <input
              name="dueDate"
              type="date"
              defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ''}
              className={`bg-transparent border-none outline-none focus:bg-gray-50 focus:px-1 rounded text-sm w-full ${getDueDateTone(task.dueDate as any)}`}
            />
          </form>
        </div>
        <div>
          <label className="text-gray-700 text-xs block mb-1">Dropdown</label>
          <form action={async (formData: FormData) => {
            'use server'
            await updateTask(task.id, { dropdown: String(formData.get('dropdown') || '') })
          }}>
            <input
              name="dropdown"
              defaultValue={task.dropdown ?? ''}
              placeholder="Add value"
              className={`bg-transparent border-none outline-none w-full focus:bg-gray-50 focus:px-1 rounded text-sm ${getDropdownTone(task.dropdown)}`}
            />
          </form>
        </div>
      </div>
    </div>
  )
}


