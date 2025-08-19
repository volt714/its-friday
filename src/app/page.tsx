// Import Prisma client and UI components used in the main page layout
import { prisma } from '@/lib/prisma'
import TopNav from '@/app/components/TopNav'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'
import Sidebar from '@/app/components/Sidebar'
import ProjectHeader from '@/app/components/ProjectHeader'
import ActionBar from '@/app/components/ActionBar'
import GroupsBoard from '@/app/components/groups/GroupsBoard'
import ChatWidget from '@/app/components/chat/ChatWidget'
//import { GroupWithTasks, SimpleUser } from '@/app/components/common/types'

// Home page fetches groups and users, then renders the main layout with navigation and the board
export default async function Home() {
  // Get current user for filtering
  const me = await getCurrentUser()

  // Fetch groups and tasks. If regular USER, filter tasks to those assigned to them
  const groups = await (prisma as any).group.findMany({
    orderBy: { order: 'asc' },
    include: {
      task: {
        orderBy: { id: 'asc' },
        where: me && me.role === 'USER'
          ? ({
              OR: [
                { ownerId: me.id },
                { taskassignment: { some: { userId: me.id } } },
              ],
            } as any)
          : undefined,
        include: { taskassignment: { select: { userId: true } } },
      },
    },
  })
  // Map 'task' to 'tasks' for UI compatibility
  const groupsWithTasks = groups.map((group: any) => ({
    ...group,
    tasks: group.task,
  }))
  // Fetch a minimal list of users for owner selection (if the model exists)
  let users: { id: number; name: string }[] = []
  const userClient = (prisma as any).user
  if (userClient?.findMany) {
    users = await userClient.findMany({ select: { id: true, name: true } })
  }

  if (!me) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm text-center">
          <h1 className="text-xl font-semibold mb-2">You are not signed in</h1>
          <p className="text-sm text-gray-600 mb-4">Please sign in to continue.</p>
          <Link href="/login" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Go to Sign In</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky top navigation bar */}
     <TopNav users={users} canImpersonate={me.role === 'DEVELOPER'} /> 
      <div className="flex flex-1 overflow-hidden">
        {/* Collapsible sidebar */}
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Project title bar and quick actions */}
          <ProjectHeader />
          <ActionBar />
          {/* Scrollable board area */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            {/* Kanban-like board of groups and tasks */}
            <GroupsBoard groups={groupsWithTasks} users={users} canManage={me.role === 'ADMIN' || me.role === 'DEVELOPER'} />
          </div>
        </div>
      </div>
      {/* Floating chat widget */}
      <ChatWidget />
    </div>
  )
}


