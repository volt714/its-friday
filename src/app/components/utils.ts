import React from 'react';

// Types
export type Status = 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK';

export interface StatusConfig {
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  lightBg: string;
}

// Status Icons
export const WorkingOnItIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  React.createElement('svg', {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 10V3L4 14h7v7l9-11h-7z"
  }))
);

export const DoneIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  React.createElement('svg', {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  }))
);

export const NotStartedIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  React.createElement('svg', {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  }))
);

export const StuckIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  React.createElement('svg', {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  }))
);

// Status Configuration Map
export const STATUS_CONFIG: Record<Status, StatusConfig> = {
  WORKING_ON_IT: {
    color: 'amber',
    bgColor: 'bg-amber-500',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-500',
    lightBg: 'bg-amber-50',
    text: 'Working on',
    icon: WorkingOnItIcon,
  },
  DONE: {
    color: 'green',
    bgColor: 'bg-green-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
    lightBg: 'bg-green-50',
    text: 'Done',
    icon: DoneIcon,
  },
  NOT_STARTED: {
    color: 'gray',
    bgColor: 'bg-gray-500',
    textColor: 'text-gray-500',
    borderColor: 'border-gray-500',
    lightBg: 'bg-gray-50',
    text: 'Not Started',
    icon: NotStartedIcon,
  },
  STUCK: {
    color: 'red',
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
    borderColor: 'border-red-500',
    lightBg: 'bg-red-50',
    text: 'Stuck',
    icon: StuckIcon,
  },
};

// Enhanced utility functions
export function getStatusColor(status: Status | string): string {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? `${config.bgColor} text-white` : 'bg-gray-500 text-white';
}

export function getStatusTextColor(status: Status | string): string {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? config.textColor : 'text-gray-500';
}

export function getStatusBorderColor(status: Status | string): string {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? config.borderColor : 'border-gray-500';
}

export function getStatusLightBg(status: Status | string): string {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? config.lightBg : 'bg-gray-50';
}

export function getStatusText(status: Status | string): string {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? config.text : 'Not Started';
}

export function getStatusIcon(status: Status | string): React.ComponentType<{ className?: string }> {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? config.icon : NotStartedIcon;
}

export function getStatusConfig(status: Status | string): StatusConfig {
  const statusKey = status as Status;
  return STATUS_CONFIG[statusKey] || STATUS_CONFIG.NOT_STARTED;
}

// Enhanced group colors with better variety and accessibility
export const GROUP_COLORS = [
  {
    border: 'border-l-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    accent: 'bg-blue-500',
    name: 'blue'
  },
  {
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    accent: 'bg-emerald-500',
    name: 'emerald'
  },
  {
    border: 'border-l-purple-500',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    accent: 'bg-purple-500',
    name: 'purple'
  },
  {
    border: 'border-l-pink-500',
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    accent: 'bg-pink-500',
    name: 'pink'
  },
  {
    border: 'border-l-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    accent: 'bg-amber-500',
    name: 'amber'
  },
  {
    border: 'border-l-indigo-500',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    accent: 'bg-indigo-500',
    name: 'indigo'
  },
  {
    border: 'border-l-teal-500',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    accent: 'bg-teal-500',
    name: 'teal'
  },
  {
    border: 'border-l-rose-500',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    accent: 'bg-rose-500',
    name: 'rose'
  },
];

export function getGroupColor(index: number): string {
  return GROUP_COLORS[index % GROUP_COLORS.length].border;
}

export function getGroupColorSet(index: number) {
  return GROUP_COLORS[index % GROUP_COLORS.length];
}

// Priority levels with colors
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export const PRIORITY_CONFIG: Record<Priority, {
  color: string;
  bgColor: string;
  textColor: string;
  text: string;
  icon: string;
}> = {
  LOW: {
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    text: 'Low',
    icon: '↓',
  },
  MEDIUM: {
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    text: 'Medium',
    icon: '→',
  },
  HIGH: {
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    text: 'High',
    icon: '↑',
  },
  CRITICAL: {
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    text: 'Critical',
    icon: '⚠',
  },
};

export function getPriorityColor(priority: Priority | string): string {
  const priorityKey = priority as Priority;
  const config = PRIORITY_CONFIG[priorityKey];
  return config ? `${config.bgColor} ${config.textColor}` : 'bg-gray-100 text-gray-800';
}

export function getPriorityText(priority: Priority | string): string {
  const priorityKey = priority as Priority;
  const config = PRIORITY_CONFIG[priorityKey];
  return config ? config.text : 'Medium';
}

// Utility function to get all available statuses
export function getAllStatuses(): Status[] {
  return Object.keys(STATUS_CONFIG) as Status[];
}

// Utility function to check if status is valid
export function isValidStatus(status: string): status is Status {
  return status in STATUS_CONFIG;
}

// React component for status badge
export interface StatusBadgeProps {
  status: Status | string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'soft';
  showIcon?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  variant = 'solid',
  showIcon = true,
  className = ''
}) => {
  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const variantClasses = {
    solid: `${config.bgColor} text-white`,
    outline: `border-2 ${config.borderColor} ${config.textColor} bg-transparent`,
    soft: `${config.lightBg} ${config.textColor}`
  };
  
  return React.createElement('span', {
    className: `inline-flex items-center gap-1.5 font-medium rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`
  }, [
    showIcon && React.createElement(Icon, { 
      key: 'icon',
      className: size === 'sm' ? 'w-3 h-3' : 'w-4 h-4' 
    }),
    config.text
  ].filter(Boolean));
};

// Export all utilities for easy importing
export const statusUtils = {
  getStatusColor,
  getStatusTextColor,
  getStatusBorderColor,
  getStatusLightBg,
  getStatusText,
  getStatusIcon,
  getStatusConfig,
  getGroupColor,
  getGroupColorSet,
  getPriorityColor,
  getPriorityText,
  getAllStatuses,
  isValidStatus,
  STATUS_CONFIG,
  GROUP_COLORS,
  PRIORITY_CONFIG,
};

// Extra UI helpers for richer styling
export function getStatusSelectBaseClasses(): string {
  return 'rounded-full px-3 py-1 text-sm font-semibold border-0 shadow-sm ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-black/20';
}

export function getOwnerBadgeColor(owner: string | null | undefined): string {
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
}

export function getDueDateTone(dateStr: string | null | undefined): string {
  if (!dateStr) return 'text-gray-700 placeholder-gray-500';
  const now = new Date();
  const d = new Date(dateStr);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((d.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'text-red-700';
  if (diffDays === 0) return 'text-amber-700';
  if (diffDays <= 3) return 'text-amber-700';
  return 'text-emerald-700';
}

export function getDropdownTone(value: string | null | undefined): string {
  if (!value) return 'text-gray-700 placeholder-gray-500';
  return 'bg-blue-50 text-blue-900 ring-1 ring-blue-200';
}