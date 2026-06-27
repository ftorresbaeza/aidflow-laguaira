'use client';

import { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  neutral: 'bg-gray-100 text-gray-600',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-slate-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  neutral: 'bg-gray-500',
};

export function Badge({ children, variant = 'default', size = 'sm', dot = false }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${variantStyles[variant]}
        ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'}
      `}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  isActive?: boolean;
  labelActive?: string;
  labelInactive?: string;
}

export function StatusBadge({ isActive = true, labelActive = 'Activo', labelInactive = 'Inactivo' }: StatusBadgeProps) {
  return (
    <Badge variant={isActive ? 'success' : 'danger'} dot>
      {isActive ? labelActive : labelInactive}
    </Badge>
  );
}

interface RoleBadgeProps {
  role: string;
}

const roleColors: Record<string, BadgeVariant> = {
  SUPER_ADMIN: 'danger',
  DIRECTOR: 'warning',
  ADMIN: 'info',
  GESTION: 'default',
  GUARD: 'success',
  PENDING: 'neutral',
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const labels: Record<string, string> = {
    SUPER_ADMIN: 'Super Admin',
    DIRECTOR: 'Director',
    ADMIN: 'Admin',
    GESTION: 'Gestión',
    GUARD: 'Guardia',
    PENDING: 'Pendiente',
  };

  return (
    <Badge variant={roleColors[role] || 'neutral'}>
      {labels[role] || role}
    </Badge>
  );
}