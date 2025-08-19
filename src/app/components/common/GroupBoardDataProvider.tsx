// ========================================
// IMPORTS SECTION
// ========================================
import { useMemo } from 'react';
import { GroupWithTasks } from '@/app/components/common/types';
import { TaskLite } from '@/app/components/common/TaskDropdown';
import React, { ReactNode } from 'react';

interface UseGroupBoardDataResult {
  completedTasks: (TaskLite & { originalGroupName: string })[];
  groupsWithoutCompleted: GroupWithTasks[];
  totalTasks: number;
  completedTasksCount: number;
  hasGroups: boolean;
}

interface GroupBoardDataProviderProps {
  groups: GroupWithTasks[];
  children: (data: UseGroupBoardDataResult) => ReactNode;
}

export function GroupBoardDataProvider({ groups, children }: GroupBoardDataProviderProps) {
  const { completedTasks, groupsWithoutCompleted, totalTasks, completedTasksCount, hasGroups } = useMemo(() => {
    const completedTasks: (TaskLite & { originalGroupName: string })[] = [];
    const groupsWithoutCompleted = groups.map(group => {
      const tasksNotDone = group.tasks.filter((task: TaskLite) => {
        if (task.status === 'DONE') {
          completedTasks.push({ ...task, originalGroupName: group.name });
          return false;
        }
        return true;
      });
      return { ...group, tasks: tasksNotDone };
    });

    const totalTasks = groups.reduce((acc, group) => acc + group.tasks.length, 0);
    const completedTasksCount = completedTasks.length;
    const hasGroups = groups.length > 0;

    return { completedTasks, groupsWithoutCompleted, totalTasks, completedTasksCount, hasGroups };
  }, [groups]);

  return <>{children({ completedTasks, groupsWithoutCompleted, totalTasks, completedTasksCount, hasGroups })}</>;
}
