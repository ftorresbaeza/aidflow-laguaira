import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

const AID_LABEL: Record<string, string> = {
  MEDICAMENTOS: 'Medicamentos', ALIMENTOS: 'Alimentos', AGUA: 'Agua', OTRO: 'Otros',
};
const ROLE_LABEL: Record<string, string> = {
  DONANTE: 'Donante', TRANSPORTISTA: 'Transportista', VOLUNTARIO: 'Voluntario', FAMILIAR: 'Familiar',
};
const STATUS_LABEL: Record<string, string> = {
  PENDIENTE: 'Pendiente', APROBADO: 'Aprobado',
  EN_TRANSITO: 'En tránsito', COMPLETADO: 'Completado', RECHAZADO: 'Rechazado',
};

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const deliveries = await prisma.delivery.findMany({
    orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
  });

  const headers = [
    'Fecha', 'Nombre', 'Cédula', 'Teléfono', 'Rol',
    'Placa', 'Tipo Vehículo', 'Marca', 'Color', 'Conductor',
    'Sector Destino', 'Destinatario', 'Tipo Ayuda', 'Cantidad', 'Prioridad', 'Estado', 'Notas',
  ];

  const rows = deliveries.map((d) => [
    new Date(d.createdAt).toLocaleString('es-VE'),
    d.fullName,
    d.cedula,
    d.phone ?? '',
    ROLE_LABEL[d.personRole] ?? d.personRole,
    d.plate ?? '',
    d.vehicleType ?? '',
    d.brand ?? '',
    d.color ?? '',
    d.driverName ?? '',
    d.destSector,
    d.recipient,
    AID_LABEL[d.aidType] ?? d.aidType,
    d.quantity,
    d.priority,
    STATUS_LABEL[d.status] ?? d.status,
    d.notes ?? '',
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="aidflow-entregas-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
