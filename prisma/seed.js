/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const existing = await prisma.group.count()
  if (existing > 0) return

  const toDo = await prisma.group.create({ data: { name: 'To-Do', order: 1 } })
  const completed = await prisma.group.create({ data: { name: 'Completed', order: 2 } })
  const newGroup = await prisma.group.create({ data: { name: 'New Group', order: 3 } })

  await prisma.task.createMany({
    data: [
      { title: '123', owner: 'D', status: 'WORKING_ON_IT', groupId: toDo.id },
      { title: 'test', status: 'DONE', groupId: toDo.id },
      { title: 'Item name', status: 'NOT_STARTED', groupId: toDo.id },
      { title: 'prototype', status: 'STUCK', groupId: toDo.id },
    ],
  })

  await prisma.task.createMany({
    data: [
      { title: '—', status: 'NOT_STARTED', groupId: completed.id },
    ],
  })

  await prisma.task.createMany({
    data: [
      { title: '—', status: 'NOT_STARTED', groupId: newGroup.id },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


