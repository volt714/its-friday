import { useState } from 'react';

export function useAddTaskForm(onTaskAdded: () => void, createTask: Function, groupId: number) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleCreateTask = async (formData: FormData) => {
    const title = String(formData.get('title') || '').trim();
    if (!title) return;
    try {
      await createTask({
        groupId: groupId,
        title: title,
        owner: String(formData.get('owner') || ''),
        status: 'NOT_STARTED',
        dueDate: null,
        dropdown: null,
      });
      setNewTaskTitle('');
      setIsAddingTask(false);
      onTaskAdded();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleAddTaskClick = () => setIsAddingTask(true);
  const handleCancelAdd = () => {
    setIsAddingTask(false);
    setNewTaskTitle('');
  };
  const handleTaskInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form && newTaskTitle.trim()) {
        form.requestSubmit();
      }
    } else if (e.key === 'Escape') {
      handleCancelAdd();
    }
  };

  return {
    newTaskTitle,
    setNewTaskTitle,
    isAddingTask,
    setIsAddingTask,
    handleCreateTask,
    handleAddTaskClick,
    handleCancelAdd,
    handleTaskInputKeyDown,
  };
}
