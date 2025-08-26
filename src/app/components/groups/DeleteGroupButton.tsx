import { deleteGroup } from '@/app/actions/groupActions';
import CombinedButton from '@/app/components/common/button/combinedbutton';
import { TrashIcon } from '@/app/components/common/Icon/TrashIcon';
//import clsx from 'clsx';

interface DeleteGroupButtonProps {
  groupId: number;
  groupName: string;
  className?: string;
}

/**
 * A button that triggers a server action to delete a group,
 * protected by a confirmation dialog for safety.
 *
 * @param {number} groupId - The ID of the group to be deleted.
 * @param {string} groupName - The name of the group, used in the confirmation dialog.
 * @param {string} [className] - Optional Tailwind classes to override or extend styles.
 */
export default function DeleteGroupButton({
  groupId,
  groupName,
  className,
}: DeleteGroupButtonProps) {
  // Binding the action is a clean way to pass arguments to server actions.
  const deleteGroupWithId = deleteGroup.bind(null, groupId);

  const confirmMessage = `Are you sure you want to permanently delete the "${groupName}" group and all its tasks? This action cannot be undone.`;

  return (
    <form action={deleteGroupWithId}>
      <CombinedButton
        variant='confirmSubmit'
        confirmMessage={confirmMessage}
       // className={clsx(BASE_STYLES, className)}
        aria-label={`Delete ${groupName} group`}
      >
        <TrashIcon className="w-4 h-4" />
      </CombinedButton>
    </form>
  );
}