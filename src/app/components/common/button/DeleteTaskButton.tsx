import React, { useState } from 'react';
import { deleteTask } from '@/app/actions/taskActions';
import CancelButton from './CancelButton';
import SubmitButton from './SubmitButton';

interface DeleteTaskButtonProps {
  taskId: number;
  currentTitle: string;
  canEditCore: boolean;
  onDeleteSuccess: () => void;
}

export interface DeleteGroupButtonProps {
  groupId: number;
  groupName: string;
  className?: string;
}

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({
  taskId,
  currentTitle,
  canEditCore,
  onDeleteSuccess,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteTask = async () => {
    await deleteTask(taskId);
    setShowDeleteConfirm(false);
    onDeleteSuccess();
  };

  return (
    <>
      {canEditCore && (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="opacity-0 group-hover:opacity-100 text-[#9699A6] hover:text-[#E2445C] transition-all duration-150 p-1 rounded"
          aria-label="Delete task"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 border border-[#E6E9F2]">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFE6E6] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#E2445C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#323338]">Delete Task</h3>
                  <p className="text-[#676879] text-sm mt-1">
                    Are you sure you want to delete "{currentTitle}"? This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
              <CancelButton onClick={() => setShowDeleteConfirm(false)} label="Cancel" />
                <form action={handleDeleteTask} className="inline-block">
                  <SubmitButton label="Delete Task" />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteTaskButton;
