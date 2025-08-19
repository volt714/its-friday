// ========================================
// IMPORTS SECTION
// ========================================
import React from 'react';
import DeleteGroupButton from './DeleteGroupButton';
import { GroupWithTasks } from '@/app/components/common/types';
import { GroupColorSet } from '@/app/components/groups/groupColors';

interface GroupHeaderProps {
  group: GroupWithTasks;
  colorSet: GroupColorSet;
  canManage: boolean;
}

export default function GroupHeader({
  group,
  colorSet,
  canManage,
}: GroupHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-[#F8F9FB] border-b border-[#E6E9F2]">
      <div className="flex items-center gap-3">
        <button className="text-[#676879] hover:text-[#323338] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`w-3 h-3 rounded-full ${colorSet.bg}`}></div>
        <h3 className="font-semibold text-[16px] text-[#323338]">{group.name}</h3>
        <span className="text-[13px] text-[#676879] bg-[#EBEDF5] px-2 py-0.5 rounded-full font-medium">
          {group.tasks.length}
        </span>
        {canManage && (
          <div className="ml-2">
            <DeleteGroupButton groupId={group.id} groupName={group.name} />
          </div>
        )}
      </div>
      {canManage && (
        <div className="flex items-center gap-2">
          <button className="text-[#9699A6] hover:text-[#6161FF] transition-colors p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
