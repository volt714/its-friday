import React from 'react';

type AddTaskInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function AddTaskInput({ value, onChange, onKeyDown }: AddTaskInputProps) {
  return (
    <input
      name="title"
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="flex-1 bg-transparent border border-[#E6E9F2] rounded-[4px] px-3 py-2 text-[14px] text-[#323338] \
                         placeholder-[#9699A6] focus:outline-none focus:ring-2 focus:ring-[#6161FF]/20 focus:border-[#6161FF]\
                         transition-all duration-150"
      placeholder="Enter task name..."
      autoFocus
    />
  );
}


