import React from 'react';

interface UserAvatarProps {
  name: string | null | undefined;
  size?: 'sm' | 'md';
}

const getOwnerBadgeColor = (owner: string | null | undefined): string => {
  if (!owner) return 'bg-gray-300 text-gray-800';
  const palette = [
    'bg-red-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-blue-500',
    'bg-fuchsia-500',
    'bg-cyan-500',
    'bg-teal-500',
    'bg-indigo-500',
  ];
  let hash = 0;
  for (let i = 0; i < owner.length; i++) hash = (hash * 31 + owner.charCodeAt(i)) >>> 0;
  return palette[hash % palette.length] + ' text-white';
};

const UserAvatar: React.FC<UserAvatarProps> = ({ name, size = 'md' }) => {
  const avatarSizeClasses = size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm';

  return (
    <>
      {name ? (
        <div className={`rounded-full flex items-center justify-center text-white font-semibold shadow-sm ${getOwnerBadgeColor(name)} ${avatarSizeClasses}`}>
          {name.charAt(0).toUpperCase()}
        </div>
      ) : (
        <div className={`rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center ${avatarSizeClasses}`}>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </>
  );
};

export default UserAvatar;
