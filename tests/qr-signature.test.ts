/**
 * @jest-environment node
 */
import { signQR, verifyQR, DeliveryQRPayload } from '@/lib/utils/qr-signature';

const basePayload: DeliveryQRPayload = {
  deliveryId: 'ctest123',
  cedula: 'V-12345678',
  fullName: 'Juan Pérez',
  personRole: 'DONANTE',
  destSector: 'La Maiquetía',
  recipient: 'María López',
  aidType: 'ALIMENTOS',
  priority: 'NORMAL',
  createdAt: new Date().toISOString(),
};

describe('QR Signature', () => {
  describe('signQR', () => {
    it('returns a JWT string with three parts', async () => {
      const token = await signQR(basePayload);
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('tokens from different payloads are different', async () => {
      const t1 = await signQR(basePayload);
      const t2 = await signQR({ ...basePayload, deliveryId: 'other-id' });
      expect(t1).not.toBe(t2);
    });

    it('includes optional plate in the token', async () => {
      const token = await signQR({ ...basePayload, plate: 'AB123CD' });
      const result = await verifyQR(token);
      expect(result?.plate).toBe('AB123CD');
    });
  });

  describe('verifyQR', () => {
    it('returns payload for a valid token', async () => {
      const token = await signQR(basePayload);
      const result = await verifyQR(token);
      expect(result).not.toBeNull();
      expect(result?.deliveryId).toBe('ctest123');
      expect(result?.fullName).toBe('Juan Pérez');
      expect(result?.cedula).toBe('V-12345678');
      expect(result?.destSector).toBe('La Maiquetía');
    });

    it('returns null for a tampered token', async () => {
      const token = await signQR(basePayload);
      const parts = token.split('.');
      const tampered = `${parts[0]}.${parts[1]}XXXX.${parts[2]}`;
      const result = await verifyQR(tampered);
      expect(result).toBeNull();
    });

    it('returns null for a corrupted signature', async () => {
      const token = await signQR(basePayload);
      const parts = token.split('.');
      const corrupted = `${parts[0]}.${parts[1]}.badsignature`;
      const result = await verifyQR(corrupted);
      expect(result).toBeNull();
    });

    it('returns null for a completely invalid string', async () => {
      expect(await verifyQR('not.a.jwt')).toBeNull();
    });

    it('returns null for an empty string', async () => {
      expect(await verifyQR('')).toBeNull();
    });

    it('plate is undefined when not included in payload', async () => {
      const token = await signQR(basePayload);
      const result = await verifyQR(token);
      expect(result?.plate).toBeUndefined();
    });

    it('roundtrip preserves all fields accurately', async () => {
      const payload: DeliveryQRPayload = {
        ...basePayload,
        deliveryId: 'full-roundtrip-id',
        plate: 'XY456ZW',
        personRole: 'TRANSPORTISTA',
        priority: 'URGENTE',
        aidType: 'MEDICAMENTOS',
      };
      const token = await signQR(payload);
      const result = await verifyQR(token);
      expect(result?.deliveryId).toBe('full-roundtrip-id');
      expect(result?.cedula).toBe('V-12345678');
      expect(result?.personRole).toBe('TRANSPORTISTA');
      expect(result?.plate).toBe('XY456ZW');
      expect(result?.priority).toBe('URGENTE');
      expect(result?.aidType).toBe('MEDICAMENTOS');
      expect(result?.recipient).toBe('María López');
    });
  });
});
