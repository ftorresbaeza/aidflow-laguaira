// Must declare mocks before any imports (Jest hoists these)
jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));
jest.mock('@/lib/auth/auth', () => ({ auth: jest.fn() }));

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import { submitRegistration } from '@/lib/actions/registration';
import {
  approveDelivery,
  rejectDelivery,
  markInTransit,
  completeDelivery,
  recordScan,
} from '@/lib/actions/admin';

const PREFIX = 'TEST-ADM-';

let testAdminId: string;
const deliveryIds: string[] = [];

beforeAll(async () => {
  // Create a temporary admin user so deliveryAction FK is satisfied
  const hash = await bcrypt.hash('TestPass123!', 12);
  const admin = await prisma.user.create({
    data: {
      name: 'Test Admin Integration',
      email: 'test-admin-integ@aidflow.test',
      password: hash,
      role: 'ADMIN',
      isActive: true,
    },
  });
  testAdminId = admin.id;

  // Wire auth mock to return this admin for all tests
  (auth as jest.Mock).mockResolvedValue({
    user: { id: testAdminId, role: 'ADMIN', email: 'test-admin-integ@aidflow.test' },
  });
});

afterAll(async () => {
  // Delete child records before parents (no cascade in schema)
  await prisma.deliveryAction.deleteMany({ where: { deliveryId: { in: deliveryIds } } });
  await prisma.deliveryScan.deleteMany({ where: { deliveryId: { in: deliveryIds } } });
  await prisma.delivery.deleteMany({ where: { id: { in: deliveryIds } } });
  await prisma.delivery.deleteMany({ where: { cedula: { startsWith: PREFIX } } });
  if (testAdminId) await prisma.user.delete({ where: { id: testAdminId } });
  await prisma.$disconnect();
});

async function createDelivery(cedulaSuffix: string): Promise<string> {
  const result = await submitRegistration({
    fullName: 'Test Admin Action',
    cedula: `${PREFIX}${cedulaSuffix}`,
    personRole: 'DONANTE',
    destSector: 'La Guaira',
    recipient: 'Test Destinatario',
    aidType: 'ALIMENTOS',
    quantity: '5 kg',
    priority: 'NORMAL',
  });
  if (!result.success) throw new Error(`createDelivery failed: ${JSON.stringify(result)}`);
  deliveryIds.push(result.deliveryId);
  return result.deliveryId;
}

async function tokenOf(id: string): Promise<string> {
  const d = await prisma.delivery.findUnique({ where: { id }, select: { qrToken: true } });
  return d!.qrToken!;
}

// ── Status transitions ────────────────────────────────────────────────────────

describe('approveDelivery', () => {
  it('changes status to APROBADO', async () => {
    const id = await createDelivery('AP1');
    const result = await approveDelivery(id);
    expect(result.success).toBe(true);
    const delivery = await prisma.delivery.findUnique({ where: { id } });
    expect(delivery?.status).toBe('APROBADO');
  });

  it('creates a DeliveryAction with the admin id', async () => {
    const id = await createDelivery('AP2');
    await approveDelivery(id);
    const action = await prisma.deliveryAction.findFirst({ where: { deliveryId: id } });
    expect(action).not.toBeNull();
    expect(action?.action).toBe('APROBADO');
    expect(action?.adminId).toBe(testAdminId);
  });
});

describe('rejectDelivery', () => {
  it('changes status to RECHAZADO', async () => {
    const id = await createDelivery('RJ1');
    const result = await rejectDelivery(id, 'Sin documentación');
    expect(result.success).toBe(true);
    const delivery = await prisma.delivery.findUnique({ where: { id } });
    expect(delivery?.status).toBe('RECHAZADO');
  });

  it('saves the rejection note in DeliveryAction', async () => {
    const id = await createDelivery('RJ2');
    await rejectDelivery(id, 'No coordinado previamente');
    const action = await prisma.deliveryAction.findFirst({ where: { deliveryId: id } });
    expect(action?.note).toBe('No coordinado previamente');
  });

  it('works without a note', async () => {
    const id = await createDelivery('RJ3');
    const result = await rejectDelivery(id);
    expect(result.success).toBe(true);
    const action = await prisma.deliveryAction.findFirst({ where: { deliveryId: id } });
    expect(action?.note).toBeNull();
  });
});

describe('markInTransit', () => {
  it('changes status to EN_TRANSITO', async () => {
    const id = await createDelivery('TR1');
    await approveDelivery(id);
    const result = await markInTransit(id);
    expect(result.success).toBe(true);
    const delivery = await prisma.delivery.findUnique({ where: { id } });
    expect(delivery?.status).toBe('EN_TRANSITO');
  });
});

describe('completeDelivery', () => {
  it('changes status to COMPLETADO after full flow', async () => {
    const id = await createDelivery('CO1');
    await approveDelivery(id);
    await markInTransit(id);
    const result = await completeDelivery(id);
    expect(result.success).toBe(true);
    const delivery = await prisma.delivery.findUnique({ where: { id } });
    expect(delivery?.status).toBe('COMPLETADO');
  });

  it('records the full action history', async () => {
    const id = await createDelivery('CO2');
    await approveDelivery(id);
    await markInTransit(id);
    await completeDelivery(id);
    const actions = await prisma.deliveryAction.findMany({
      where: { deliveryId: id },
      orderBy: { timestamp: 'asc' },
    });
    expect(actions.map(a => a.action)).toEqual(['APROBADO', 'EN_TRANSITO', 'COMPLETADO']);
  });
});

// ── recordScan ────────────────────────────────────────────────────────────────

describe('recordScan', () => {
  it('returns delivery data for a valid QR token', async () => {
    const id = await createDelivery('SC1');
    const token = await tokenOf(id);
    const result = await recordScan(token);
    expect(result.success).toBe(true);
    expect(result.delivery?.id).toBe(id);
    expect(result.delivery?.fullName).toBe('Test Admin Action');
    expect(result.delivery?.status).toBe('PENDIENTE');
  });

  it('creates a DeliveryScan record with location', async () => {
    const id = await createDelivery('SC2');
    const token = await tokenOf(id);
    await recordScan(token, 'Punto Control Norte');
    const scan = await prisma.deliveryScan.findFirst({ where: { deliveryId: id } });
    expect(scan).not.toBeNull();
    expect(scan?.location).toBe('Punto Control Norte');
    expect(scan?.scannedAt).toBeInstanceOf(Date);
  });

  it('creates a scan without location when omitted', async () => {
    const id = await createDelivery('SC3');
    const token = await tokenOf(id);
    await recordScan(token);
    const scan = await prisma.deliveryScan.findFirst({ where: { deliveryId: id } });
    expect(scan).not.toBeNull();
    expect(scan?.location).toBeNull();
  });

  it('returns error for an invalid token', async () => {
    const result = await recordScan('invalid.jwt.token');
    expect(result.success).toBe(false);
    expect(result.error).toBe('QR inválido o manipulado');
  });

  it('returns error for an empty token', async () => {
    const result = await recordScan('');
    expect(result.success).toBe(false);
    expect(result.error).toBe('QR inválido o manipulado');
  });

  it('returns error when scanning a RECHAZADO delivery', async () => {
    const id = await createDelivery('SC4');
    await rejectDelivery(id);
    const token = await tokenOf(id);
    const result = await recordScan(token);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Este registro fue rechazado');
  });

  it('allows scanning a COMPLETADO delivery', async () => {
    const id = await createDelivery('SC5');
    await approveDelivery(id);
    await markInTransit(id);
    await completeDelivery(id);
    const token = await tokenOf(id);
    const result = await recordScan(token);
    expect(result.success).toBe(true);
    expect(result.delivery?.status).toBe('COMPLETADO');
  });
});
