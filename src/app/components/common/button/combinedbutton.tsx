import React from 'react';

type ButtonVariant = 'submit' | 'cancel' | 'star' | 'toggle' | 'confirm' | 'message';

type ButtonProps = {
  variant?: ButtonVariant;
  disabled?: boolean;
  label?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit';
  className?: string;
  children?: React.ReactNode;
  // Star specific
  isStarred?: boolean;
  // Toggle specific
  targetId?: string;
  // Confirm specific
  confirmMessage?: string;
  isLoading?: boolean;
  // Message specific
  taskId?: number;
  messageCount?: number;
  onMessagesToggle?: (taskId: number) => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  submit: 'px-3 py-1.5 bg-[#6161FF] text-white text-[13px] font-medium rounded-[4px] hover:bg-[#5151FF] disabled:opacity-50 disabled:cursor-not-allowed',
  cancel: 'px-3 py-1.5 text-[#676879] hover:text-[#323338] text-[13px] font-medium hover:bg-[#F8F9FB] rounded-[4px]',
  star: 'text-[#D0D4E7] hover:text-[#FDAB3D] p-1',
  toggle: '',
  confirm: '',
  message: 'relative text-gray-400 hover:text-blue-500 transition-colors p-1.5 rounded-md hover:bg-gray-50'
};

const VARIANT_LABELS: Record<ButtonVariant, string> = {
  submit: 'Add',
  cancel: 'Cancel',
  star: '',
  toggle: '',
  confirm: '',
  message: ''
};

export default function Button({ 
  variant = 'submit', 
  disabled = false, 
  label, 
  onClick,
  type,
  className = '',
  children,
  isStarred = false,
  targetId,
  confirmMessage,
  isLoading = false,
  taskId,
  messageCount = 0,
  onMessagesToggle,
  ...props
}: ButtonProps) {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (variant) {
      case 'toggle':
        if (targetId) {
          const input = document.getElementById(targetId) as HTMLInputElement;
          if (input) {
            const isHidden = input.style.display === 'none' || !input.style.display;
            input.style.display = isHidden ? 'block' : 'none';
            if (isHidden) input.focus();
          }
        }
        break;
        
      case 'confirm':
        if (confirmMessage && !confirm(confirmMessage)) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
        break;
        
      case 'message':
        if (taskId !== undefined && onMessagesToggle) {
          onMessagesToggle(taskId);
        }
        break;
        
      default:
        onClick?.(e);
    }
  };

  const buttonType = type || (variant === 'submit' ? 'submit' : 'button');
  const buttonLabel = label || VARIANT_LABELS[variant];
  const disabledClass = (disabled || isLoading) ? 'cursor-not-allowed opacity-50' : '';
  const finalClassName = `transition-colors duration-150 ${VARIANT_STYLES[variant]} ${disabledClass} ${className}`.trim();

  const renderIcon = () => {
    if (variant === 'star') {
      return (
        <svg className="w-4 h-4" fill={isStarred ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }
    
    if (variant === 'message') {
      return (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5-5 5-5H15m-6 10l4-4-4-4-4 4 4 4z" />
          </svg>
          {messageCount > 0 && (
            <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-4 bg-red-500 text-white rounded-full text-[10px] font-medium px-1">
              {messageCount > 9 ? '9+' : messageCount}
            </div>
          )}
        </>
      );
    }
    
    if (isLoading) {
      return (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    }
    
    return null;
  };

  const content = variant === 'star' || variant === 'message' || variant === 'addTask' || isLoading ? renderIcon() : (children || buttonLabel);

  const buttonElement = (
    <button
      type={buttonType}
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={finalClassName}
      title={variant === 'message' ? 'Updates' : undefined}
      aria-label={variant === 'message' ? 'Updates' : undefined}
      {...props}
    >
      {content}
    </button>
  );

  return variant === 'message' ? (
    <div className="relative flex items-center">{buttonElement}</div>
  ) : buttonElement;
}

// Convenience exports
export const SubmitButton = (props: Omit<ButtonProps, 'variant'>) => <Button {...props} variant="submit" />;
export const CancelButton = (props: Omit<ButtonProps, 'variant'>) => <Button {...props} variant="cancel" />;
export const StarButton = (props: Omit<ButtonProps, 'variant'>) => <Button {...props} variant="star" />;
export const ToggleInputButton = (props: Omit<ButtonProps, 'variant'>) => <Button {...props} variant="toggle" />;
export const ConfirmSubmitButton = (props: Omit<ButtonProps, 'variant'>) => <Button {...props} variant="confirm" />;
export const MessageToggleButton = (props: Omit<ButtonProps, 'variant'>) => <Button {...props} variant="message" />;