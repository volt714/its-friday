import GroupCard from './GroupCard'
import AddNewGroupCard from './AddNewGroupCard'
import type { Status } from '@/app/components/utils'

// GroupsBoard renders a vertical list of groups, each with its tasks, and a control to add new groups
type TaskLite = {
  id: number
  title: string
  owner: string | null
  ownerId: number | null
  status: Status
  dueDate: string | Date | null
  dropdown: string | null
}

type GroupWithTasks = {
  id: number
  name: string
  tasks: TaskLite[]
}

export default function GroupsBoard({ groups, users = [] }: { groups: GroupWithTasks[]; users?: { id: number; name: string }[] }) {
  return (
    <div className="space-y-4">
      {/* Render each group with a deterministic color set based on its index */}
      {groups.map((group, index) => (
        <GroupCard key={group.id} group={group} index={index} users={users} />
      ))}
      {/* Card for creating a new group */}
      <AddNewGroupCard />
    </div>
  )
}


