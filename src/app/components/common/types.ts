import { TaskLite } from '@/app/components/common/TaskDropdown';

export type SimpleUser = { id: number; name: string };

export type GroupWithTasks = {
  id: number;
  name: string;
  tasks: TaskLite[];
};
