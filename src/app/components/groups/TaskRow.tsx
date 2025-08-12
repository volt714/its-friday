import { getStatusColor } from '@/app/components/utils'
import type { Task } from '@prisma/client'
import { updateTask, deleteTask } from '@/app/actions'

export default function TaskRow({ task }: { task: Task }) {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-3 hover:bg-gray-50 items-center group transition-colors">
      <div className="col-span-4 flex items-center gap-2">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="text-gray-400 hover:text-yellow-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-blue-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
        <form action={async (formData: FormData) => {
          'use server'
          await updateTask(task.id, { title: String(formData.get('title') || '') })
        }} className="flex-1">
          <input
            name="title"
            defaultValue={task.title}
            className="bg-transparent border-none outline-none w-full focus:bg-white focus:border focus:px-2 focus:py-1 rounded transition-all"
          />
        </form>
      </div>
      <div className="col-span-2">
        <form action={async (formData: FormData) => {
          'use server'
          await updateTask(task.id, { owner: String(formData.get('owner') || '') })
        }}>
          {task.owner ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {task.owner.charAt(0).toUpperCase()}
              </div>
              <input
                name="owner"
                defaultValue={task.owner}
                className="bg-transparent border-none outline-none flex-1 focus:bg-white focus:border focus:px-2 focus:py-1 rounded transition-all"
              />
            </div>
          ) : (
            <input
              name="owner"
              placeholder=""
              className="bg-transparent border-none outline-none w-full focus:bg-white focus:border focus:px-2 focus:py-1 rounded text-gray-400 transition-all"
            />
          )}
        </form>
      </div>
      <div className="col-span-2">
        <form action={async (formData: FormData) => {
          'use server'
          await updateTask(task.id, { status: String(formData.get('status')) as any })
        }}>
          <select
            name="status"
            defaultValue={task.status as any}
            className={`rounded px-3 py-1 text-sm font-medium border-none outline-none cursor-pointer ${getStatusColor(task.status)}`}
          >
            <option value="WORKING_ON_IT">Working on it</option>
            <option value="DONE">Done</option>
            <option value="NOT_STARTED">Not Started</option>
            <option value="STUCK">Stuck</option>
          </select>
        </form>
      </div>
      <div className="col-span-2">
        <form action={async (formData: FormData) => {
          'use server'
          const v = String(formData.get('dueDate') || '')
          await updateTask(task.id, { dueDate: v })
        }}>
          <input
            name="dueDate"
            type="date"
            defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ''}
            className="bg-transparent border-none outline-none focus:bg-white focus:border focus:px-2 focus:py-1 rounded text-sm w-full transition-all"
          />
        </form>
      </div>
      <div className="col-span-1">
        <form action={async (formData: FormData) => {
          'use server'
          await updateTask(task.id, { dropdown: String(formData.get('dropdown') || '') })
        }}>
          <input
            name="dropdown"
            defaultValue={task.dropdown ?? ''}
            placeholder=""
            className="bg-transparent border-none outline-none w-full focus:bg-white focus:border focus:px-2 focus:py-1 rounded text-gray-400 transition-all"
          />
        </form>
      </div>
      <div className="col-span-1 flex justify-end">
        <form action={async () => {
          'use server'
          await deleteTask(task.id)
        }}>
          <button className="text-red-500 hover:text-red-700 text-xs p-1 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}


