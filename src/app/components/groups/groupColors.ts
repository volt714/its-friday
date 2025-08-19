export const GROUP_COLORS = [
  {
    border: 'border-l-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    accent: 'bg-blue-500',
    name: 'blue'
  },
  {
    border: 'border-l-green-500',
    bg: 'bg-green-50',
    text: 'text-green-700',
    accent: 'bg-green-500',
    name: 'green'
  },
  {
    border: 'border-l-red-500',
    bg: 'bg-red-50',
    text: 'text-red-700',
    accent: 'bg-red-500',
    name: 'red'
  },
  {
    border: 'border-l-purple-500',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    accent: 'bg-purple-500',
    name: 'purple'
  },
  {
    border: 'border-l-orange-500',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    accent: 'bg-orange-500',
    name: 'orange'
  },
  {
    border: 'border-l-teal-500',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    accent: 'bg-teal-500',
    name: 'teal'
  },
  {
    border: 'border-l-indigo-500',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    accent: 'bg-indigo-500',
    name: 'indigo'
  },
  {
    border: 'border-l-pink-500',
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    accent: 'bg-pink-500',
    name: 'pink'
  },
  {
    border: 'border-l-gray-500',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    accent: 'bg-gray-500',
    name: 'gray'
  },
  {
    border: 'border-l-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    accent: 'bg-yellow-500',
    name: 'yellow'
  },
  {
    border: 'border-l-rose-500',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    accent: 'bg-rose-500',
    name: 'rose'
  },
];

export interface GroupColorSet {
  border: string;
  bg: string;
  text: string;
  accent: string;
  name: string;
}

/** Returns the left border color class for a group at the given index. */
export function getGroupColor(index: number): string {
  return GROUP_COLORS[index % GROUP_COLORS.length].border;
}

/** Returns the full color set object for a group at the given index. */
export function getGroupColorSet(index: number) {
  return GROUP_COLORS[index % GROUP_COLORS.length];
}
