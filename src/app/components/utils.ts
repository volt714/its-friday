// Shared UI utilities and types for statuses, groups, and priorities
import React from 'react';

// UI utilities, types, and components for statuses, groups, and priorities used across the app

// Types
// Canonical set of status values supported by the app
export type Status = 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK';

// Configuration describing how a status should be rendered in the UI
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
// Visual and textual mapping for each status
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
/**
 * Returns a combined background and text color class for the given status.
 */
export function getStatusColor(status: Status | string): string {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? `${config.bgColor} text-white` : 'bg-gray-500 text-white';
}

/** Returns the text color class for the given status. */
export function getStatusTextColor(status: Status | string): string {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? config.textColor : 'text-gray-500';
}

/** Returns the border color class for the given status. */
export function getStatusBorderColor(status: Status | string): string {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? config.borderColor : 'border-gray-500';
}

/** Returns a soft background color class for the given status. */
export function getStatusLightBg(status: Status | string): string {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? config.lightBg : 'bg-gray-50';
}

/** Returns the human-readable text label for the given status. */
export function getStatusText(status: Status | string): string {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? config.text : 'Not Started';
}

/** Returns the icon React component for the given status. */
export function getStatusIcon(status: Status | string): React.ComponentType<{ className?: string }> {
  const statusKey = status as Status;
  const config = STATUS_CONFIG[statusKey];
  return config ? config.icon : NotStartedIcon;
}

/** Returns the full configuration object for the given status. */
export function getStatusConfig(status: Status | string): StatusConfig {
  const statusKey = status as Status;
  return STATUS_CONFIG[statusKey] || STATUS_CONFIG.NOT_STARTED;
}

// Enhanced group colors with better variety and accessibility
// Group color palettes used for differentiating groups visually
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

/** Returns the left border color class for a group at the given index. */
export function getGroupColor(index: number): string {
  return GROUP_COLORS[index % GROUP_COLORS.length].border;
}

/** Returns the full color set object for a group at the given index. */
export function getGroupColorSet(index: number) {
  return GROUP_COLORS[index % GROUP_COLORS.length];
}

// Priority levels with colors
// Supported priority levels
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// Visual/text mapping for each priority level
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

/** Returns background and text color classes for a given priority. */
export function getPriorityColor(priority: Priority | string): string {
  const priorityKey = priority as Priority;
  const config = PRIORITY_CONFIG[priorityKey];
  return config ? `${config.bgColor} ${config.textColor}` : 'bg-gray-100 text-gray-800';
}

/** Returns the human-readable text label for a given priority. */
export function getPriorityText(priority: Priority | string): string {
  const priorityKey = priority as Priority;
  const config = PRIORITY_CONFIG[priorityKey];
  return config ? config.text : 'Medium';
}

// Utility function to get all available statuses
/** Returns all defined statuses as a list. */
export function getAllStatuses(): Status[] {
  return Object.keys(STATUS_CONFIG) as Status[];
}

// Utility function to check if status is valid
/** Type guard that checks whether a string is a valid Status. */
export function isValidStatus(status: string): status is Status {
  return status in STATUS_CONFIG;
}

// React component for status badge
/** Props for the StatusBadge React component. */
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