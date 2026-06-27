import { SignJWT, jwtVerify } from 'jose';

const QR_SECRET = new TextEncoder().encode(
  process.env.QR_SECRET_KEY || 'aidflow-laguaira-qr-secret-change-in-production'
);

export interface DeliveryQRPayload {
  deliveryId: string;
  cedula: string;
  fullName: string;
  personRole: string;
  plate?: string;
  destSector: string;
  recipient: string;
  aidType: string;
  priority: string;
  createdAt: string;
  iss?: string;
}

export async function signQR(payload: DeliveryQRPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setIssuer('aidflow-laguaira')
    .sign(QR_SECRET);
}

export async function verifyQR(token: string): Promise<DeliveryQRPayload | null> {
  try {
    const { payload } = await jwtVerify(token, QR_SECRET, {
      issuer: 'aidflow-laguaira',
    });
    return payload as unknown as DeliveryQRPayload;
  } catch {
    return null;
  }
}
