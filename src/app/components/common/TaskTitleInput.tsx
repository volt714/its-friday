import React, { useState } from 'react';
import { updateTask } from '@/app/actions/taskActions';

interface TaskTitleInputProps {
  initialTitle: string;
  taskId: number;
  canEditCore: boolean;
  onTitleUpdate?: (newTitle: string) => void;
}

const TaskTitleInput: React.FC<TaskTitleInputProps> = ({
  initialTitle,
  taskId,
  canEditCore,
  onTitleUpdate,
}) => {
  const [currentTitle, setCurrentTitle] = useState(initialTitle);

  const handleTitleSubmit = async (formData: FormData) => {
    const newTitle = String(formData.get('title') || '');
    if (newTitle !== initialTitle) {
      setCurrentTitle(newTitle);
      await updateTask(taskId, { title: newTitle });
      if (onTitleUpdate) {
        onTitleUpdate(newTitle);
      }
    }
  };

  return (
    <form action={handleTitleSubmit} className="flex-1">
      <input
        name="title"
        value={currentTitle}
        disabled={!canEditCore}
        className={`bg-transparent border-none outline-none w-full text-[#323338] text-[14px] font-normal placeholder-[#9699A6] transition-all duration-150 ${
          canEditCore 
            ? 'hover:bg-[#F8F9FB] focus:bg-white focus:ring-2 focus:ring-[#6161FF]/20 focus:border-[#6161FF] rounded-[4px] px-2 py-1' 
            : 'cursor-not-allowed opacity-70'
        }`}
        placeholder="Enter task name..."
        onChange={(e) => setCurrentTitle(e.target.value)}
        onBlur={(e) => canEditCore && e.target.form?.requestSubmit()}
        onKeyDown={(e) => {
          if (!canEditCore) return
          if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
            e.currentTarget.blur();
          }
        }}
      />
    </form>
  );
};

export default TaskTitleInput;
