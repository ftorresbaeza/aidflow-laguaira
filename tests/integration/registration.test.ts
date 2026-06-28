import { submitRegistration, getDeliveryById } from '@/lib/actions/registration';
import { prisma } from '@/lib/db/prisma';
import { verifyQR } from '@/lib/utils/qr-signature';

// Unique prefix so cleanup is safe and won't touch real records
const PREFIX = 'TEST-REG-';

afterAll(async () => {
  await prisma.delivery.deleteMany({ where: { cedula: { startsWith: PREFIX } } });
  await prisma.$disconnect();
});

function cedula(suffix: string) {
  return `${PREFIX}${suffix}`;
}

const base = {
  fullName: 'Test Registro',
  personRole: 'DONANTE' as const,
  destSector: 'La Maiquetía',
  recipient: 'Test Destinatario',
  aidType: 'ALIMENTOS' as const,
  quantity: '10 kg de arroz',
  priority: 'NORMAL' as const,
};

describe('submitRegistration (integration)', () => {
  it('creates a delivery and returns a deliveryId', async () => {
    const result = await submitRegistration({ ...base, cedula: cedula('001') });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(typeof result.deliveryId).toBe('string');
      expect(result.deliveryId.length).toBeGreaterThan(0);
    }
  });

  it('persists delivery with status PENDIENTE', async () => {
    const result = await submitRegistration({ ...base, cedula: cedula('002'), priority: 'ALTA' });
    expect(result.success).toBe(true);
    if (result.success) {
      const delivery = await prisma.delivery.findUnique({ where: { id: result.deliveryId } });
      expect(delivery?.status).toBe('PENDIENTE');
      expect(delivery?.priority).toBe('ALTA');
      expect(delivery?.fullName).toBe('Test Registro');
    }
  });

  it('generates a valid signed JWT qrToken', async () => {
    const result = await submitRegistration({ ...base, cedula: cedula('003'), priority: 'URGENTE' });
    expect(result.success).toBe(true);
    if (result.success) {
      const delivery = await prisma.delivery.findUnique({ where: { id: result.deliveryId } });
      expect(delivery?.qrToken).toBeTruthy();

      const payload = await verifyQR(delivery!.qrToken!);
      expect(payload).not.toBeNull();
      expect(payload?.deliveryId).toBe(result.deliveryId);
      expect(payload?.cedula).toBe(cedula('003'));
      expect(payload?.priority).toBe('URGENTE');
      expect(payload?.iss).toBe('aidflow-laguaira');
    }
  });

  it('generates a base64 PNG QR image', async () => {
    const result = await submitRegistration({ ...base, cedula: cedula('004') });
    expect(result.success).toBe(true);
    if (result.success) {
      const delivery = await prisma.delivery.findUnique({ where: { id: result.deliveryId } });
      expect(delivery?.qrCode).toMatch(/^data:image\/png;base64,/);
    }
  });

  it('uppercases cedula and plate', async () => {
    const result = await submitRegistration({
      ...base,
      cedula: 'test-reg-005',
      personRole: 'TRANSPORTISTA',
      vehicleType: 'AUTO',
      plate: 'ab123cd',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const delivery = await prisma.delivery.findUnique({ where: { id: result.deliveryId } });
      expect(delivery?.cedula).toBe('TEST-REG-005');
      expect(delivery?.plate).toBe('AB123CD');
    }
  });

  it('qrToken payload contains the final deliveryId (not "temp")', async () => {
    const result = await submitRegistration({ ...base, cedula: cedula('006') });
    expect(result.success).toBe(true);
    if (result.success) {
      const delivery = await prisma.delivery.findUnique({ where: { id: result.deliveryId } });
      const payload = await verifyQR(delivery!.qrToken!);
      expect(payload?.deliveryId).toBe(result.deliveryId);
      expect(payload?.deliveryId).not.toBe('temp');
    }
  });

  it('returns success: false for TRANSPORTISTA missing plate', async () => {
    const result = await submitRegistration({
      ...base,
      cedula: cedula('007'),
      personRole: 'TRANSPORTISTA',
      vehicleType: 'CAMION',
      // no plate
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors?.plate).toBeDefined();
    }
  });
});

describe('getDeliveryById (integration)', () => {
  it('returns the delivery for a valid ID', async () => {
    const reg = await submitRegistration({ ...base, cedula: cedula('010') });
    expect(reg.success).toBe(true);
    if (reg.success) {
      const delivery = await getDeliveryById(reg.deliveryId);
      expect(delivery).not.toBeNull();
      expect(delivery?.id).toBe(reg.deliveryId);
      expect(delivery?.status).toBe('PENDIENTE');
      expect(delivery?.qrCode).toMatch(/^data:image\/png;base64,/);
    }
  });

  it('returns null for a non-existent ID', async () => {
    const result = await getDeliveryById('nonexistent-id-00000000000');
    expect(result).toBeNull();
  });
});
