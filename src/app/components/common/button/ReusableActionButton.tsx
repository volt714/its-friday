import React, { useState } from 'react';

export type ReusableActionButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  confirmMessage?: string;
  confirmType?: 'dialog' | 'modal';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'danger' | 'secondary';
  className?: string;
  children: React.ReactNode;
  modalTitle?: string;
  modalBody?: React.ReactNode;
};

export default function ReusableActionButton({
  onClick,
  confirmMessage,
  confirmType = 'dialog',
  isLoading = false,
  disabled = false,
  icon,
  variant = 'primary',
  className = '',
  children,
  modalTitle,
  modalBody,
  ...props
}: ReusableActionButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [showModal, setShowModal] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<React.MouseEvent<HTMLButtonElement, MouseEvent> | null>(null);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled || isLoading) return;
    if (confirmMessage) {
      if (confirmType === 'dialog') {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
          return;
        }
        onClick(e);
      } else if (confirmType === 'modal') {
        setPendingEvent(e);
        setShowModal(true);
      }
    } else {
      onClick(e);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    if (pendingEvent) {
      onClick(pendingEvent);
      setPendingEvent(null);
    }
  };

  // Basic style variants
  const baseStyles =
    'px-3 py-1.5 text-[13px] font-medium rounded-[4px] transition-colors duration-150 flex items-center gap-2';
  const variantStyles = {
    primary: 'bg-[#6161FF] text-white hover:bg-[#5151FF]',
    danger: 'bg-[#E2445C] text-white hover:bg-[#D13650]',
    secondary: 'bg-[#676879] text-white hover:bg-[#323338]',
  };

  return (
    <>
      <button
        type="button"
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        onClick={handleButtonClick}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
      {confirmType === 'modal' && showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 border border-[#E6E9F2]">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#323338]">{modalTitle || 'Are you sure?'}</h3>
                <div className="text-[#676879] text-sm mt-1">{modalBody || confirmMessage}</div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-[#676879] hover:text-[#323338] font-medium text-sm hover:bg-[#F8F9FB] rounded-md transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalConfirm}
                  className="px-4 py-2 bg-[#E2445C] hover:bg-[#D13650] text-white font-medium text-sm rounded-md transition-colors duration-150"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
