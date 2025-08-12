import { prisma } from '@/lib/prisma'
import TopNav from '@/app/components/TopNav'
import Sidebar from '@/app/components/Sidebar'
import ProjectHeader from '@/app/components/ProjectHeader'
import ActionBar from '@/app/components/ActionBar'
import GroupsBoard from '@/app/components/groups/GroupsBoard'
import ChatWidget from '@/app/components/chat/ChatWidget'

export default async function Home() {
  const groups = await prisma.group.findMany({
    orderBy: { order: 'asc' },
    include: { tasks: { orderBy: { id: 'asc' } } },
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ProjectHeader />
          <ActionBar />
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <GroupsBoard groups={groups} />
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  )
}


