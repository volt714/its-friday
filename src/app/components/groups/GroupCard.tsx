import { getGroupColor } from '@/app/components/utils'
import type { Group, Task } from '@prisma/client'
import TaskRow from './TaskRow'
import MobileTaskCard from './MobileTaskCard'
import { createTask, deleteGroup } from '@/app/actions'
import ConfirmSubmitButton from '@/app/components/common/ConfirmSubmitButton'
import ToggleInputButton from '@/app/components/common/ToggleInputButton'
import AddTaskInput from '@/app/components/common/AddTaskInput'

export default function GroupCard({ group, index }: { group: Group & { tasks: Task[] }; index: number }) {
  const toggleId = `add-task-${group.id}`
  return (
    <div className={`bg-white rounded-lg ${getGroupColor(index)} border-l-4 overflow-hidden shadow-sm`}>
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 bg-gray-50/50 border-b">
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <h3 className="font-semibold text-gray-900">{group.name}</h3>
          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{group.tasks.length}</span>
          <form
            action={async () => {
              'use server'
              await deleteGroup(group.id)
            }}
            className="ml-2"
          >
            <ConfirmSubmitButton
              confirmMessage={`Are you sure you want to delete "${group.name}" group and all its tasks?`}
              className="text-red-500 hover:text-red-700 text-xs p-1 hover:bg-red-50 rounded transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </ConfirmSubmitButton>
          </form>
        </div>
        <form
          action={async (formData: FormData) => {
            'use server'
            await createTask({
              groupId: group.id,
              title: String(formData.get('title') || 'New task'),
              owner: String(formData.get('owner') || ''),
              status: 'NOT_STARTED',
              dueDate: '',
              dropdown: '',
            })
          }}
          className="hidden lg:flex gap-2 items-center"
        >
          <ToggleInputButton targetId={toggleId} className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-2 transition-colors">
            <span className="text-lg">+</span>
            <span>Add task</span>
          </ToggleInputButton>
          <AddTaskInput id={toggleId} name="title" placeholder="Enter task name" />
        </form>
      </div>

      <div className="overflow-x-auto">
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-4 px-6 py-2 bg-white border-b text-sm font-medium text-gray-500">
            <div className="col-span-4">Task</div>
            <div className="col-span-2">Owner</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Due date</div>
            <div className="col-span-1">Dropdown</div>
            <div className="col-span-1"></div>
          </div>
          <div className="divide-y">
            {group.tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        </div>
        <div className="lg:hidden space-y-2 p-4">
          {group.tasks.map((t) => (
            <MobileTaskCard key={t.id} task={t} />
          ))}
        </div>
      </div>

      <div className="px-6 py-3 border-t bg-gray-50/30">
        <form
          action={async (formData: FormData) => {
            'use server'
            await createTask({
              groupId: group.id,
              title: String(formData.get('title') || 'New task'),
              owner: String(formData.get('owner') || ''),
              status: 'NOT_STARTED',
              dueDate: '',
              dropdown: '',
            })
          }}
          className="flex items-center gap-2"
        >
          <ToggleInputButton targetId={`${toggleId}-bottom`} className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-2 transition-colors">
            <span className="text-lg">+</span>
            <span>Add task</span>
          </ToggleInputButton>
          <AddTaskInput id={`${toggleId}-bottom`} name="title" placeholder="Enter task name" />
        </form>
      </div>
    </div>
  )
}


