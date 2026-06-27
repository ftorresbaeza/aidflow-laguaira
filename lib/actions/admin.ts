'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { verifyQR } from '@/lib/utils/qr-signature';
import { AdminRole, DeliveryStatus, Priority } from '@prisma/client';
import { revalidatePath } from 'next/cache';

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error('No autorizado');
  if (![AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.OPERADOR].includes(session.user.role)) {
    throw new Error('No autorizado');
  }
  return session;
}

export async function getStats() {
  await requireAdmin();
  const [pending, aprobado, enTransito, completado, rechazado] = await Promise.all([
    prisma.delivery.count({ where: { status: DeliveryStatus.PENDIENTE } }),
    prisma.delivery.count({ where: { status: DeliveryStatus.APROBADO } }),
    prisma.delivery.count({ where: { status: DeliveryStatus.EN_TRANSITO } }),
    prisma.delivery.count({ where: { status: DeliveryStatus.COMPLETADO } }),
    prisma.delivery.count({ where: { status: DeliveryStatus.RECHAZADO } }),
  ]);
  return { pending, aprobado, enTransito, completado, rechazado, total: pending + aprobado + enTransito + completado + rechazado };
}

export async function getAllDeliveries(filters?: {
  status?: DeliveryStatus;
  priority?: Priority;
  search?: string;
}) {
  await requireAdmin();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};
  if (filters?.status) where.status = filters.status;
  if (filters?.priority) where.priority = filters.priority;
  if (filters?.search) {
    where.OR = [
      { fullName: { contains: filters.search, mode: 'insensitive' } },
      { cedula: { contains: filters.search, mode: 'insensitive' } },
      { plate: { contains: filters.search, mode: 'insensitive' } },
      { destSector: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  return prisma.delivery.findMany({
    where,
    orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      fullName: true,
      cedula: true,
      personRole: true,
      plate: true,
      destSector: true,
      recipient: true,
      aidType: true,
      quantity: true,
      priority: true,
      status: true,
      createdAt: true,
    },
  });
}

export async function getDeliveryDetail(id: string) {
  await requireAdmin();
  return prisma.delivery.findUnique({
    where: { id },
    include: {
      scans: { orderBy: { scannedAt: 'desc' }, take: 10 },
      actions: {
        orderBy: { timestamp: 'desc' },
        include: { admin: { select: { name: true, email: true } } },
      },
    },
  });
}

async function changeStatus(
  id: string,
  newStatus: DeliveryStatus,
  note?: string
) {
  const session = await requireAdmin();
  await prisma.$transaction([
    prisma.delivery.update({ where: { id }, data: { status: newStatus } }),
    prisma.deliveryAction.create({
      data: { deliveryId: id, action: newStatus, adminId: session.user.id, note },
    }),
  ]);
  revalidatePath('/admin');
  revalidatePath(`/admin/entregas/${id}`);
}

export async function approveDelivery(id: string) {
  await changeStatus(id, DeliveryStatus.APROBADO);
  return { success: true };
}

export async function rejectDelivery(id: string, note?: string) {
  await changeStatus(id, DeliveryStatus.RECHAZADO, note);
  return { success: true };
}

export async function markInTransit(id: string) {
  await changeStatus(id, DeliveryStatus.EN_TRANSITO);
  return { success: true };
}

export async function completeDelivery(id: string) {
  await changeStatus(id, DeliveryStatus.COMPLETADO);
  return { success: true };
}

export async function recordScan(token: string, location?: string): Promise<{
  success: boolean;
  delivery?: {
    id: string;
    fullName: string;
    cedula: string;
    personRole: string;
    plate?: string | null;
    destSector: string;
    recipient: string;
    aidType: string;
    quantity: string;
    priority: string;
    status: string;
  };
  error?: string;
}> {
  const payload = await verifyQR(token);
  if (!payload) return { success: false, error: 'QR inválido o manipulado' };

  const delivery = await prisma.delivery.findUnique({
    where: { qrToken: token },
  });

  if (!delivery) return { success: false, error: 'Registro no encontrado' };
  if (delivery.status === DeliveryStatus.RECHAZADO) {
    return { success: false, error: 'Este registro fue rechazado' };
  }

  await prisma.deliveryScan.create({
    data: {
      deliveryId: delivery.id,
      location,
    },
  });

  return {
    success: true,
    delivery: {
      id: delivery.id,
      fullName: delivery.fullName,
      cedula: delivery.cedula,
      personRole: delivery.personRole,
      plate: delivery.plate,
      destSector: delivery.destSector,
      recipient: delivery.recipient,
      aidType: delivery.aidType,
      quantity: delivery.quantity,
      priority: delivery.priority,
      status: delivery.status,
    },
  };
}
