import { createTask } from '@/app/actions/taskActions';
import AddTaskInput from './AddTaskInput';
import { useAddTaskForm } from './useAddTaskForm';
import AddTaskToggleButton from './button/AddTaskToggleButton';
import PlusIcon from './Icon/PlusIcon';
import CancelButton from './button/CancelButton';
import SubmitButton from './button/SubmitButton';

interface AddTaskFormProps {
  groupId: number;
  onTaskAdded: () => void;
}

export default function AddTaskForm({ groupId, onTaskAdded }: AddTaskFormProps) {
  const {
    newTaskTitle,
    setNewTaskTitle,
    isAddingTask,
    handleCreateTask,
    handleAddTaskClick,
    handleCancelAdd,
    handleTaskInputKeyDown,
  } = useAddTaskForm(onTaskAdded, createTask, groupId);

  return (
    <div className="px-6 py-3 border-t border-[#E6E9F2] bg-[#FCFCFC]">
      {!isAddingTask ? (
        <AddTaskToggleButton onClick={handleAddTaskClick} />
      ) : (
        <form action={handleCreateTask} className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <PlusIcon className="w-4 h-4 text-[#6161FF]" />
            <AddTaskInput
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              onKeyDown={handleTaskInputKeyDown}
            />
          </div>
          <div className="flex items-center gap-2">
          <SubmitButton disabled={!newTaskTitle.trim()} label="Add" />
          <CancelButton onClick={handleCancelAdd} label="Cancel" />
          </div>
        </form>
      )}
    </div>
  );
}
