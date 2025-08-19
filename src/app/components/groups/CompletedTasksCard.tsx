
import React from 'react';
import GroupCard from './GroupCard';
import { TaskLite } from '@/app/components/common/TaskDropdown';
import { SimpleUser } from '@/app/components/common/types';

interface CompletedTasksCardProps {
  completedTasks: (TaskLite & { originalGroupName: string })[];
  groupsLength: number;
  users: SimpleUser[];
  canManage: boolean;
}

export default function CompletedTasksCard({
  completedTasks,
  groupsLength,
  users,
  canManage,
}: CompletedTasksCardProps) {
  return (
    <div className="transform transition-all duration-300 hover:scale-[1.02]">
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
          <h2 className="text-lg font-semibold text-gray-700">Completed Tasks</h2>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {completedTasks.length} completed
          </span>
        </div>
      </div>
      <GroupCard
        key="completed-group"
        group={{
          id: -1,
          name: 'Completed',
          tasks: completedTasks.map(({ originalGroupName, ...task }) => task),
        }}
        index={groupsLength}
        users={users}
        canManage={canManage}
      />
    </div>
  );
}
