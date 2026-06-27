import { AdminRole } from '@prisma/client';

export function isAdminOrAbove(role: AdminRole): boolean {
  return role === AdminRole.SUPER_ADMIN || role === AdminRole.ADMIN;
}

export function isSuperAdmin(role: AdminRole): boolean {
  return role === AdminRole.SUPER_ADMIN;
}
