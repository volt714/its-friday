import type { Status } from '@prisma/client'

export function getStatusColor(status: Status | string): string {
  switch (status) {
    case 'WORKING_ON_IT':
      return 'bg-orange-500 text-white'
    case 'DONE':
      return 'bg-green-500 text-white'
    case 'NOT_STARTED':
      return 'bg-gray-500 text-white'
    case 'STUCK':
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

export function getStatusText(status: Status | string): string {
  switch (status) {
    case 'WORKING_ON_IT':
      return 'Working on it'
    case 'DONE':
      return 'Done'
    case 'NOT_STARTED':
      return 'Not Started'
    case 'STUCK':
      return 'Stuck'
    default:
      return 'Not Started'
  }
}

export function getGroupColor(index: number): string {
  const colors = [
    'border-l-blue-500',
    'border-l-green-500',
    'border-l-purple-500',
    'border-l-pink-500',
    'border-l-yellow-500',
    'border-l-indigo-500',
  ]
  return colors[index % colors.length]
}


