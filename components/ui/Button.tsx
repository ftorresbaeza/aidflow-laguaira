'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md hover:shadow-lg',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
  danger: 'bg-red-500 hover:bg-red-400 text-white shadow-md hover:shadow-lg',
  success: 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md hover:shadow-lg',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
  outline: 'bg-transparent border-2 border-slate-200 hover:border-slate-300 text-slate-700',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-2xl gap-2',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500/50
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
        active:scale-[0.98]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children && <span>{children}</span>}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'primary' | 'danger' | 'warning' | 'success' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
}

const iconVariantStyles: Record<string, string> = {
  primary: 'text-blue-600 hover:bg-blue-50 hover:scale-110',
  danger: 'text-red-600 hover:bg-red-50 hover:scale-110',
  warning: 'text-orange-600 hover:bg-orange-50 hover:scale-110',
  success: 'text-emerald-600 hover:bg-emerald-50 hover:scale-110',
  neutral: 'text-gray-500 hover:bg-gray-100 hover:scale-110',
};

const iconSizeStyles: Record<string, string> = {
  sm: 'p-1 w-6 h-6',
  md: 'p-1.5 w-8 h-8',
  lg: 'p-2 w-10 h-10',
};

export function IconButton({ icon, variant = 'neutral', size = 'md', tooltip, className = '', ...props }: IconButtonProps) {
  return (
    <button
      title={tooltip}
      className={`
        rounded-lg transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
        ${iconVariantStyles[variant]}
        ${iconSizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {icon}
    </button>
  );
}