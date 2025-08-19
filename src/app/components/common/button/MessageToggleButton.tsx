import React from 'react';

interface MessageToggleButtonProps {
  taskId: number;
  onMessagesToggle: (taskId: number) => void;
  messageCount?: number;
}

const MessageToggleButton: React.FC<MessageToggleButtonProps> = ({
  taskId,
  onMessagesToggle,
  messageCount = 0,
}) => {
  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={() => onMessagesToggle(taskId)}
        className="relative text-gray-400 hover:text-blue-500 transition-colors p-1.5 rounded-md hover:bg-gray-50"
        title="Updates"
        aria-label="Updates"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5-5 5-5H15m-6 10l4-4-4-4-4 4 4 4z" />
        </svg>
        
        {messageCount > 0 && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-4 bg-red-500 text-white rounded-full text-[10px] font-medium px-1">
            {messageCount > 9 ? '9+' : messageCount}
          </div>
        )}
      </button>
    </div>
  );
};

export default MessageToggleButton;
