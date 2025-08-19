import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { TaskLite } from '@/app/components/common/TaskDropdown';
import { Priority, getPriorityColor, getPriorityText } from '@/app/components/common/TaskDropdown';

export type Status = 'WORKING_ON_IT' | 'DONE' | 'NOT_STARTED' | 'STUCK';

export function getStatusSelectBaseClasses(): string {
  return 'rounded-full px-3 py-1 text-sm font-semibold border-0 shadow-sm ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-black/20';
}

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

/** Returns all defined statuses as a list. */
export function getAllStatuses(): Status[] {
  return Object.keys(STATUS_CONFIG) as Status[];
}

/** Type guard that checks whether a string is a valid Status. */
export function isValidStatus(status: string): status is Status {
  return status in STATUS_CONFIG;
}

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

interface StatusSelectProps {
  currentStatus: Status;
  onStatusChange: (newStatus: Status) => void;
  disabled?: boolean;
}

const StatusSelect: React.FC<StatusSelectProps> = ({
  currentStatus,
  onStatusChange,
  disabled = false,
}) => {
  const statusConfig = getStatusConfig(currentStatus);

  return (
    <form>
      <select
        name="status"
        value={currentStatus}
        className={`appearance-none cursor-pointer transition-all duration-150 text-[13px] font-medium
                    border-none rounded-[4px] px-3 py-1.5 w-full text-center outline-none
                    ${statusConfig.bgColor} ${statusConfig.textColor}
                    focus:ring-2 focus:ring-offset-1 focus:ring-current/30`}
        onChange={(e) => onStatusChange(e.target.value as Status)}
        disabled={disabled}
      >
        <option value="NOT_STARTED">Not Started</option>
        <option value="WORKING_ON_IT">Working on it</option>
        <option value="DONE">Done</option>
        <option value="STUCK">Stuck</option>
      </select>
    </form>
  );
};

export default StatusSelect;
