import React from 'react';

export default function PlusIcon({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}
