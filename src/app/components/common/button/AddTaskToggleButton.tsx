import React from 'react';
import PlusIcon from '../Icon/PlusIcon';

type AddTaskToggleButtonProps = {
  onClick: () => void;
};

export default function AddTaskToggleButton({ onClick }: AddTaskToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-[#9699A6] hover:text-[#6161FF] text-[14px] font-medium transition-colors"
    >
      <PlusIcon className="w-4 h-4" />
      Add task
    </button>
  );
}
