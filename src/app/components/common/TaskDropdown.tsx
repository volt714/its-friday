import React from 'react';
import { Status } from '@/app/components/common/StatusSelect';

interface TaskDropdownProps {
  task: TaskLite;
  handleDropdownSubmit: (formData: FormData) => Promise<void>;
  getDropdownTone: (value: string | null | undefined) => string;
  canEditCore: boolean;
}

export type TaskLite = {
  id: number;
  title: string;
  owner: string | null;
  ownerId: number | null;
  status: Status;
  dueDate: string | Date | null;
  dropdown: string | null;
  messageCount?: number;
};

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export const PRIORITY_CONFIG: Record<Priority, {
  color: string;
  bgColor: string;
  textColor: string;
  text: string;
  icon: string;
}> = {
  LOW: {
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    text: 'Low',
    icon: '↓',
  },
  MEDIUM: {
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    text: 'Medium',
    icon: '→',
  },
  HIGH: {
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    text: 'High',
    icon: '↑',
  },
  CRITICAL: {
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    text: 'Critical',
    icon: '⚠',
  },
};

/** Returns background and text color classes for a given priority. */
export function getPriorityColor(priority: Priority | string): string {
  const priorityKey = priority as Priority;
  const config = PRIORITY_CONFIG[priorityKey];
  return config ? `${config.bgColor} ${config.textColor}` : 'bg-gray-100 text-gray-800';
}

/** Returns the human-readable text label for a given priority. */
export function getPriorityText(priority: Priority | string): string {
  const priorityKey = priority as Priority;
  const config = PRIORITY_CONFIG[priorityKey];
  return config ? config.text : 'Medium';
};

export function getDropdownTone(value: string | null | undefined): string {
  if (!value) return 'text-gray-700 placeholder-gray-500';
  return 'bg-blue-50 text-blue-900 ring-1 ring-blue-200';
}

const TaskDropdown: React.FC<TaskDropdownProps> = ({
  task,
  handleDropdownSubmit,
  getDropdownTone,
  canEditCore,
}) => {
  return (
    <form action={handleDropdownSubmit}>
      <select
        name="dropdown"
        value={task.dropdown || ''}
        className={`bg-transparent border-none outline-none text-[13px] w-full
                   hover:bg-white focus:ring-2 focus:ring-[#6161FF]/20 
                   focus:border-[#6161FF] rounded-[4px] px-3 py-1 cursor-pointer
                   transition-all duration-150 ${getDropdownTone(task.dropdown)}`}
        onChange={(e) => e.target.form?.requestSubmit()}
        disabled={!canEditCore}
      >
        <option value="">-</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </form>
  );
};

export default TaskDropdown;
