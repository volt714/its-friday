import React from 'react';

interface PopoverToggleButtonProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  onClick: () => void;
  disabled: boolean;
  title: string;
  children: React.ReactNode;
}

const PopoverToggleButton: React.FC<PopoverToggleButtonProps> = ({
  buttonRef,
  onClick,
  disabled,
  title,
  children,
}) => {
  return (
    <button
      ref={buttonRef}
      type="button"
      className="p-2 rounded-lg border border-gray-300 bg-white shadow-sm transition-all duration-200
                 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PopoverToggleButton;
