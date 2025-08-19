import React from 'react';

type CancelButtonProps = {
  onClick: () => void;
  label?: string; // Optional label for flexibility (default: "Cancel")
};

export default function CancelButton({ onClick, label = 'Cancel' }: CancelButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 text-[#676879] hover:text-[#323338] text-[13px] font-medium
                 hover:bg-[#F8F9FB] rounded-[4px] transition-colors duration-150"
    >
      {label}
    </button>
  );
}
