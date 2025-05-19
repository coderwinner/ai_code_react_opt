import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ variant, label }) => {
  const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
  
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {label}
    </span>
  );
};

export default Badge;