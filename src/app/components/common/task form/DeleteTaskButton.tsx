
import React from 'react';
import { deleteTask } from '@/app/actions/taskActions';
import CombinedButton from '../button/combinedbutton';
import { TrashIcon } from '../Icon/TrashIcon';

interface DeleteTaskButtonProps {
  taskId: number;
  currentTitle: string;
  canEditCore: boolean;
  onDeleteSuccess: () => void;
}

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({
  taskId,
  currentTitle,
  canEditCore,
  onDeleteSuccess,
}) => {
  const deleteAction = async () => {
    await deleteTask(taskId);
    onDeleteSuccess();
  };

  const confirmMessage = `Are you sure you want to permanently delete the "${currentTitle}" task? This action cannot be undone.`;

  return (
    <>
      {canEditCore && (
        <form action={deleteAction}>
          <CombinedButton
            variant="confirmSubmit"
            confirmMessage={confirmMessage}
            className="opacity-0 group-hover:opacity-100 text-[#9699A6] hover:text-[#E2445C] transition-all duration-150 p-1 rounded"
            aria-label="Delete task"
          >
            <TrashIcon className="w-4 h-4" />
          </CombinedButton>
        </form>
      )}
    </>
  );
};

export default DeleteTaskButton;

