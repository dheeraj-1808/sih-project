import React from 'react';

const StatusBadge = ({ status, size = 'sm' }) => {
  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-danger-100 text-danger-800';
      case 'in progress':
        return 'bg-warning-100 text-warning-800';
      case 'resolved':
        return 'bg-success-100 text-success-800';
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'on leave':
        return 'bg-warning-100 text-warning-800';
      case 'suspended':
        return 'bg-danger-100 text-danger-800';
      case 'resigned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'xs':
        return 'px-1.5 py-0.5 text-xs';
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-2 py-1 text-xs';
    }
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full font-medium ${getStatusClasses(status)} ${getSizeClasses(size)}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
