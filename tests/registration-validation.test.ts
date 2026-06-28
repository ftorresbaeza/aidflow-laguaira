// Mock dependencies before any imports so validation logic can be tested without DB or QR libs
jest.mock('@/lib/db/prisma', () => ({
  prisma: {
    delivery: {
      create: jest.fn().mockResolvedValue({ id: 'mock-delivery-id' }),
      update: jest.fn().mockResolvedValue({}),
    },
  },
}));

jest.mock('qrcode', () => ({
  toDataURL: jest.fn().mockResolvedValue('data:image/png;base64,fakeqr'),
}));

jest.mock('@/lib/utils/qr-signature', () => ({
  signQR: jest.fn().mockResolvedValue('fake.jwt.token'),
}));

import { submitRegistration } from '@/lib/actions/registration';
import type { RegistrationInput } from '@/lib/actions/registration';

const validDonante: RegistrationInput = {
  fullName: 'Juan Pérez',
  cedula: 'V-12345678',
  personRole: 'DONANTE',
  destSector: 'La Maiquetía',
  recipient: 'María López',
  aidType: 'ALIMENTOS',
  quantity: '20 kg de arroz',
  priority: 'NORMAL',
};

describe('Registration Validation (unit)', () => {
  describe('Valid submissions', () => {
    it('accepts a valid DONANTE registration', async () => {
      const result = await submitRegistration(validDonante);
      expect(result.success).toBe(true);
    });

    it('accepts a VOLUNTARIO registration', async () => {
      const result = await submitRegistration({ ...validDonante, personRole: 'VOLUNTARIO' });
      expect(result.success).toBe(true);
    });

    it('accepts a FAMILIAR registration', async () => {
      const result = await submitRegistration({ ...validDonante, personRole: 'FAMILIAR' });
      expect(result.success).toBe(true);
    });

    it('accepts a TRANSPORTISTA with plate and vehicleType', async () => {
      const result = await submitRegistration({
        ...validDonante,
        personRole: 'TRANSPORTISTA',
        vehicleType: 'CAMION',
        plate: 'AB123CD',
      });
      expect(result.success).toBe(true);
    });

    it('accepts optional fields when provided', async () => {
      const result = await submitRegistration({
        ...validDonante,
        phone: '+58 412 1234567',
        address: 'Calle Principal, La Guaira',
        notes: 'Entregar con cuidado',
        priority: 'URGENTE',
      });
      expect(result.success).toBe(true);
    });

    it('defaults priority to NORMAL when omitted', async () => {
      const { priority: _, ...withoutPriority } = validDonante;
      const result = await submitRegistration(withoutPriority as RegistrationInput);
      expect(result.success).toBe(true);
    });

    it('accepts notes up to 500 characters', async () => {
      const result = await submitRegistration({
        ...validDonante,
        notes: 'x'.repeat(500),
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Rejected submissions', () => {
    it('rejects fullName shorter than 2 characters', async () => {
      const result = await submitRegistration({ ...validDonante, fullName: 'J' });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.fieldErrors?.fullName).toBeDefined();
    });

    it('rejects cedula shorter than 5 characters', async () => {
      const result = await submitRegistration({ ...validDonante, cedula: 'V-1' });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.fieldErrors?.cedula).toBeDefined();
    });

    it('rejects TRANSPORTISTA without plate', async () => {
      const result = await submitRegistration({
        ...validDonante,
        personRole: 'TRANSPORTISTA',
        vehicleType: 'CAMION',
        // no plate
      });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.fieldErrors?.plate).toBeDefined();
    });

    it('rejects TRANSPORTISTA without vehicleType', async () => {
      const result = await submitRegistration({
        ...validDonante,
        personRole: 'TRANSPORTISTA',
        plate: 'AB123CD',
        // no vehicleType
      });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.fieldErrors?.vehicleType).toBeDefined();
    });

    it('rejects empty destSector', async () => {
      const result = await submitRegistration({ ...validDonante, destSector: '' });
      expect(result.success).toBe(false);
    });

    it('rejects recipient shorter than 2 characters', async () => {
      const result = await submitRegistration({ ...validDonante, recipient: 'A' });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.fieldErrors?.recipient).toBeDefined();
    });

    it('rejects empty quantity', async () => {
      const result = await submitRegistration({ ...validDonante, quantity: '' });
      expect(result.success).toBe(false);
    });

    it('rejects notes longer than 500 characters', async () => {
      const result = await submitRegistration({
        ...validDonante,
        notes: 'x'.repeat(501),
      });
      expect(result.success).toBe(false);
    });
  });
});
