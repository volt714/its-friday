import React from 'react';

type SubmitButtonProps = {
  disabled?: boolean;
  label?: string; // Optional label (default: "Add")
};

export default function SubmitButton({ disabled = false, label = 'Add' }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="px-3 py-1.5 bg-[#6161FF] text-white text-[13px] font-medium rounded-[4px]
                 hover:bg-[#5151FF] disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors duration-150"
    >
      {label}
    </button>
  );
}
