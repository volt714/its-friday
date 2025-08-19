import { useState } from 'react';
//import type { TaskLite } from '@/app/components/common/TaskDropdown';
import { createTask } from '@/app/actions';

interface AddTaskFormProps {
  groupId: number;
  onTaskAdded: () => void;
}

export default function AddTaskForm({ groupId, onTaskAdded }: AddTaskFormProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleCreateTask = async (formData: FormData) => {
    const title = String(formData.get('title') || '').trim();
    
    if (!title) {
      return;
    }
    
    try {
      await createTask({
        groupId: groupId,
        title: title,
        owner: String(formData.get('owner') || ''),
        status: 'NOT_STARTED',
        //startDate: null,
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

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

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

  return (
    <div className="px-6 py-3 border-t border-[#E6E9F2] bg-[#FCFCFC]">
      {!isAddingTask ? (
        <button
          type="button"
          onClick={handleAddTaskClick}
          className="flex items-center gap-2 text-[#9699A6] hover:text-[#6161FF] text-[14px] font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add task
        </button>
      ) : (
        <form action={handleCreateTask} className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <svg className="w-4 h-4 text-[#6161FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <input
              name="title"
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={handleTaskInputKeyDown}
              className="flex-1 bg-transparent border border-[#E6E9F2] rounded-[4px] px-3 py-2 text-[14px] text-[#323338] 
                         placeholder-[#9699A6] focus:outline-none focus:ring-2 focus:ring-[#6161FF]/20 focus:border-[#6161FF]
                         transition-all duration-150"
              placeholder="Enter task name..."
              autoFocus
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="px-3 py-1.5 bg-[#6161FF] text-white text-[13px] font-medium rounded-[4px] 
                         hover:bg-[#5151FF] disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors duration-150"
            >
              Add
            </button>
            <button
              type="button"
              onClick={handleCancelAdd}
              className="px-3 py-1.5 text-[#676879] hover:text-[#323338] text-[13px] font-medium 
                         hover:bg-[#F8F9FB] rounded-[4px] transition-colors duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
