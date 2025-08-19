'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { addTaskMessage, listTaskMessages } from '@/app/actions/messageActions';
import { getTaskSummary } from '@/app/actions/taskActions';
import { Message } from '@/app/components/chat/types';
import { formatDate } from '@/app/utils/date';
import { getInitials } from '@/app/utils/user';
import EmptyStateMessage from '@/app/components/common/EmptyStateMessage';
import MessageItem from '@/app/components/chat/MessageItem';
import InputToolbar from '@/app/components/chat/InputToolbar';
import ConfirmSubmitButton from '@/app/components/common/button/ConfirmSubmitButton';

interface MessagesPanelProps {
  taskId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function MessagesPanel({
  taskId,
  isOpen,
  onClose
}: MessagesPanelProps) {
  const [text, setText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'updates' | 'files' | 'activity'>('updates');
  const [history, setHistory] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [summary, setSummary] = useState<{ title: string; assignedAt: Date | string | null; ownerName?: string } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    const fetchMessages = async () => {
      try {
        const msgs = await listTaskMessages(taskId);
        setHistory(msgs as Message[]);
        const task = await getTaskSummary(taskId);
        setSummary(task ? { title: task.title, assignedAt: task.assignedAt as any, ownerName: task.ownerUser?.name } : null);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    
    fetchMessages();
  }, [isOpen, taskId]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const sendMessage = async (): Promise<void> => {
    const body = text.trim();
    if (!body || isPending) return;
    
    startTransition(async () => {
      try {
        await addTaskMessage(taskId, body);
        setText('');
        
        const msgs = await listTaskMessages(taskId);
        setHistory(msgs as Message[]);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    });
  };

  const renderEmptyState = () => (
    <EmptyStateMessage
      iconPath="M15 17h5l-5-5 5-5H15m-6 10l4-4-4-4-4 4 4 4z"
      title="No updates yet"
      description="Activity will appear here"
    />
  );

  const renderMessage = (update: Message) => (
    <MessageItem key={update.id} message={update} />
  );

  const renderInputToolbar = () => (
    <InputToolbar />
  );

  const renderFilesTab = () => (
    <EmptyStateMessage
      iconPath="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
      title="No files attached"
      description="Upload files to share with your team"
    />
  );

  const renderActivityTab = () => (
    <EmptyStateMessage
      iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      title="No activity yet"
      description="Task changes will appear here"
    />
  );

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl flex flex-col z-[9999]">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M15 17h5l-5-5 5-5H15m-6 10l4-4-4-4-4 4 4 4z"></path>
              </svg>
              <h3 className="font-medium text-gray-900 text-sm truncate">{summary?.title ?? 'Message'}</h3>
            </div>
            {summary?.assignedAt && (
              <div className="mt-1 text-xs text-gray-500">Assigned {new Date(summary.assignedAt).toLocaleDateString()} {summary.ownerName ? `to ${summary.ownerName}` : ''}</div>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              Update via email
            </button>
            <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              Give feedback
            </button>
            <button 
              className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" 
              onClick={onClose} 
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 px-4 py-2 border-b border-gray-100">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('updates')}
            className={`pb-2 px-1 text-sm font-medium transition-colors ${
              activeTab === 'updates'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Updates / {history.length}
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`pb-2 px-1 text-sm font-medium transition-colors ${
              activeTab === 'files'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700'
            }`}
          >
            Files
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`pb-2 px-1 text-sm font-medium transition-colors ${
              activeTab === 'activity'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700'
            }`}
          >
            Activity Log
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'updates' && (
          <>
            {/* Messages list */}
            <div className="flex-1 overflow-y-auto">
              {history.length === 0 ? renderEmptyState() : (
                <div className="divide-y divide-gray-50">
                  {history.map(renderMessage)}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="flex-shrink-0 border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  D
                </div>
                
                <div className="flex-1">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                    placeholder="Write an update and mention others with @"
                    disabled={isPending}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  
                  <div className="flex items-center justify-between mt-2">
                    {renderInputToolbar()}
                    
                    <ConfirmSubmitButton
                      onClick={sendMessage}
                      isLoading={isPending}
                      disabled={!text.trim()}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      Update
                    </ConfirmSubmitButton>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'files' && (
          <div className="flex-1 p-4">
            {renderFilesTab()}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="flex-1 p-4">
            {renderActivityTab()}
          </div>
        )}
      </div>
    </div>
  );
}
