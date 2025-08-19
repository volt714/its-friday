import React from 'react';
import { SimpleUser } from '@/app/components/common/types';

interface OwnerSelectProps {
  ownerId: number | null;
  ownerName: string | null | undefined;
  users: SimpleUser[];
  canEditCore: boolean;
  onOwnerChange: (newOwnerId: number, newOwnerName: string | null) => void;
}

const OwnerSelect: React.FC<OwnerSelectProps> = ({
  ownerId,
  ownerName,
  users,
  canEditCore,
  onOwnerChange,
}) => {
  return (
    <select
      name="owner"
      value={ownerId || 0}
      className="bg-transparent border-none outline-none text-[#323338] text-[13px] w-full
                 hover:bg-[#F8F9FB] focus:bg-white focus:ring-2 focus:ring-[#6161FF]/20 
                 focus:border-[#6161FF] rounded-[4px] px-3 py-1 cursor-pointer
                 transition-all duration-150"
      onChange={(e) => {
        const selectedId = Number(e.target.value);
        const selectedUser = users.find(u => u.id === selectedId);
        onOwnerChange(selectedId, selectedUser?.name || null);
      }}
      disabled={!canEditCore}
    >
      <option value={0}>Unassigned</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default OwnerSelect;
