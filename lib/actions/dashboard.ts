'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { DeliveryStatus, Priority } from '@prisma/client';
import { subDays } from 'date-fns';

export async function getDashboardData() {
  const session = await auth();
  if (!session) throw new Error('No autorizado');

  const sevenDaysAgo = subDays(new Date(), 7);

  const [counts, recentDeliveries, urgentPending] = await Promise.all([
    Promise.all([
      prisma.delivery.count({ where: { status: DeliveryStatus.PENDIENTE } }),
      prisma.delivery.count({ where: { status: DeliveryStatus.APROBADO } }),
      prisma.delivery.count({ where: { status: DeliveryStatus.EN_TRANSITO } }),
      prisma.delivery.count({ where: { status: DeliveryStatus.COMPLETADO } }),
      prisma.delivery.count({ where: { status: DeliveryStatus.RECHAZADO } }),
      prisma.delivery.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    ]),
    prisma.delivery.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        fullName: true,
        cedula: true,
        personRole: true,
        destSector: true,
        priority: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.delivery.count({
      where: {
        priority: Priority.URGENTE,
        status: { in: [DeliveryStatus.PENDIENTE, DeliveryStatus.APROBADO] },
      },
    }),
  ]);

  const [pending, aprobado, enTransito, completado, rechazado, lastWeek] = counts;

  return {
    stats: { pending, aprobado, enTransito, completado, rechazado, lastWeek, urgentPending },
    recentDeliveries,
  };
}
