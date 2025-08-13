import { getGroupColorSet } from '@/app/components/utils'
import type { Status } from '@/app/components/utils'
import TaskRow from './TaskRow'
import MobileTaskCard from './MobileTaskCard'
import { createTask, deleteGroup } from '@/app/actions'
import ConfirmSubmitButton from '@/app/components/common/ConfirmSubmitButton'
import DeleteGroupButton from './DeleteGroupButton'
import ToggleInputButton from '@/app/components/common/ToggleInputButton'
import AddTaskInput from '@/app/components/common/AddTaskInput'

// GroupCard displays a group header, its task list (desktop and mobile variants), and quick add-task controls
type TaskLite = {
  id: number
  title: string
  owner: string | null
  ownerId: number | null
  status: Status
  startDate: string | Date | null
  dueDate: string | Date | null
  dropdown: string | null
}

type GroupWithTasks = {
  id: number
  name: string
  tasks: TaskLite[]
}

export default function GroupCard({ group, index, users = [], canManage = false }: { group: GroupWithTasks; index: number; users?: { id: number; name: string }[]; canManage?: boolean }) {
  // Unique ids for toggleable inputs and computed color set for this group's accent
  const toggleId = `add-task-${group.id}`
  const colorSet = getGroupColorSet(index)
  return (
    <div className={`bg-white rounded-lg ${colorSet.border} border-l-4 overflow-hidden shadow-sm text-gray-900`}> 
      {/* Header: group name, count, and actions */}
      <div className={`flex items-center justify-between px-4 lg:px-6 py-3 ${colorSet.bg} border-b`}> 
        <div className="flex items-center gap-3">
          <button className="text-gray-700 hover:text-gray-900 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <h3 className={`font-semibold ${colorSet.text}`}>{group.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded ${colorSet.text} ${colorSet.bg}`}>{group.tasks.length}</span>
          {canManage && (
            <div className="ml-2 opacity-100">
              <DeleteGroupButton groupId={group.id} groupName={group.name} />
            </div>
          )}
        </div>
        {canManage && (
        <form
          action={async (formData: FormData) => {
            'use server'
            await createTask({
              groupId: group.id,
              title: String(formData.get('title') || 'New task'),
              owner: String(formData.get('owner') || ''),
              status: 'NOT_STARTED',
              startDate: null,
              dueDate: '',
              dropdown: '',
            })
          }}
          className="hidden lg:flex gap-2 items-center"
        >
          {/* Toggle quick input row for adding a task (desktop only) */}
          <ToggleInputButton targetId={toggleId} className="text-gray-700 hover:text-gray-900 text-sm flex items-center gap-2 transition-colors">
            <span className="text-lg">+</span>
            <span>Add task</span>
          </ToggleInputButton>
          <AddTaskInput id={toggleId} name="title" placeholder="Enter task name" />
        </form>
        )}
      </div>

      <div className="overflow-x-auto">
        {/* Desktop table layout */}
        <div className="hidden lg:block min-w-[920px]">
          <div className="grid grid-cols-12 gap-3 px-6 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700 tracking-normal">
            <div className="col-span-3">Task</div>
            <div className="col-span-2">Owner</div>
            <div className="col-span-1">Start date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Due date</div>
            <div className="col-span-1">Messages</div>
            <div className="col-span-1"></div>
          </div>
          <div className="divide-y">
             {group.tasks.map((task: TaskLite) => (
               <TaskRow key={task.id} task={task as any} users={users} canEditCore={canManage} />
             ))}
          </div>
        </div>
        {/* Mobile card layout */}
        <div className="lg:hidden space-y-2 p-4">
          {group.tasks.map((t: TaskLite) => (
            <MobileTaskCard key={t.id} task={t as any} canEditCore={canManage} />
          ))}
        </div>
      </div>

      {/* Bottom quick add row (visible on all breakpoints) */}
       <div className="px-6 py-3 border-t bg-gray-50/30">
        {canManage && (
        <form
          action={async (formData: FormData) => {
            'use server'
            await createTask({
              groupId: group.id,
              title: String(formData.get('title') || 'New task'),
              owner: String(formData.get('owner') || ''),
              status: 'NOT_STARTED',
              startDate: null,
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
        )}
      </div>
    </div>
  )
}


