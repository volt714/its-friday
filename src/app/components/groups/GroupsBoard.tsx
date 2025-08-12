import type { Group, Task } from '@prisma/client'
import GroupCard from './GroupCard'
import AddNewGroupCard from './AddNewGroupCard'

export default function GroupsBoard({ groups, users = [] }: { groups: (Group & { tasks: Task[] })[]; users?: { id: number; name: string }[] }) {
  return (
    <div className="space-y-4">
      {groups.map((group, index) => (
        <GroupCard key={group.id} group={group} index={index} users={users} />
      ))}
      <AddNewGroupCard />
    </div>
  )
}


