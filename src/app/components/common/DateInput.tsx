import React from 'react';

interface DateInputProps {
  name: string;
  defaultValue: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getTone: (value: string | null | undefined) => string;
}

export function getDueDateTone(dateStr: string | null | undefined): string {
  if (!dateStr) return 'text-gray-700 placeholder-gray-500';
  const now = new Date();
  const d = new Date(dateStr);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((d.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'text-red-700';
  if (diffDays === 0) return 'text-amber-700';
  if (diffDays <= 3) return 'text-amber-700';
  return 'text-emerald-700';
}

const DateInput: React.FC<DateInputProps> = ({
  name,
  defaultValue,
  disabled,
  onChange,
  getTone,
}) => {
  return (
    <input
      name={name}
      type="date"
      defaultValue={defaultValue}
      className={`bg-transparent border-none outline-none text-[13px] w-full
                 hover:bg-[#F8F9FB] focus:bg-white focus:ring-2 focus:ring-[#6161FF]/20 
                 focus:border-[#6161FF] rounded-[4px] px-3 py-1 cursor-pointer
                 transition-all duration-150 ${getTone(defaultValue)}`}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default DateInput;
