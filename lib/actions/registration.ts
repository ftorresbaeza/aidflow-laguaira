'use server';

import { prisma } from '@/lib/db/prisma';
import { signQR } from '@/lib/utils/qr-signature';
import { AidType, PersonRole, Priority, VehicleType } from '@prisma/client';
import QRCode from 'qrcode';
import { z } from 'zod';

const RegistrationSchema = z
  .object({
    fullName: z.string().min(2, 'Nombre requerido').max(100),
    cedula: z.string().min(5, 'Cédula requerida').max(15),
    phone: z.string().optional(),
    address: z.string().optional(),
    personRole: z.nativeEnum(PersonRole),
    vehicleType: z.nativeEnum(VehicleType).optional(),
    plate: z.string().optional(),
    brand: z.string().optional(),
    color: z.string().optional(),
    driverName: z.string().optional(),
    destSector: z.string().min(1, 'Sector de destino requerido'),
    recipient: z.string().min(2, 'Nombre del destinatario requerido'),
    aidType: z.nativeEnum(AidType),
    quantity: z.string().min(1, 'Cantidad requerida'),
    priority: z.nativeEnum(Priority).default(Priority.NORMAL),
    notes: z.string().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.personRole === PersonRole.TRANSPORTISTA && !data.plate) {
      ctx.addIssue({
        path: ['plate'],
        code: 'custom',
        message: 'Placa del vehículo requerida para transportistas',
      });
    }
    if (data.personRole === PersonRole.TRANSPORTISTA && !data.vehicleType) {
      ctx.addIssue({
        path: ['vehicleType'],
        code: 'custom',
        message: 'Tipo de vehículo requerido para transportistas',
      });
    }
  });

export type RegistrationInput = z.infer<typeof RegistrationSchema>;

export type RegistrationResult =
  | { success: true; deliveryId: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitRegistration(
  formData: RegistrationInput
): Promise<RegistrationResult> {
  const parsed = RegistrationSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Datos inválidos',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;
  const now = new Date();

  const qrPayload = {
    deliveryId: '',
    cedula: data.cedula,
    fullName: data.fullName,
    personRole: data.personRole,
    plate: data.plate,
    destSector: data.destSector,
    recipient: data.recipient,
    aidType: data.aidType,
    priority: data.priority,
    createdAt: now.toISOString(),
  };

  // Generamos un ID temporal para el payload, luego lo actualizamos
  const tempToken = await signQR({ ...qrPayload, deliveryId: 'temp' });

  try {
    const delivery = await prisma.delivery.create({
      data: {
        fullName: data.fullName,
        cedula: data.cedula.toUpperCase(),
        phone: data.phone,
        address: data.address,
        personRole: data.personRole,
        vehicleType: data.vehicleType,
        plate: data.plate?.toUpperCase(),
        brand: data.brand,
        color: data.color,
        driverName: data.driverName,
        destSector: data.destSector,
        recipient: data.recipient,
        aidType: data.aidType,
        quantity: data.quantity,
        priority: data.priority,
        notes: data.notes,
        qrToken: tempToken,
      },
    });

    // Firma final con el ID real
    const finalToken = await signQR({ ...qrPayload, deliveryId: delivery.id });

    // Genera imagen QR en base64
    const qrImageData = await QRCode.toDataURL(finalToken, {
      width: 300,
      margin: 2,
      color: { dark: '#1e3a8a', light: '#ffffff' },
    });

    await prisma.delivery.update({
      where: { id: delivery.id },
      data: { qrToken: finalToken, qrCode: qrImageData },
    });

    return { success: true, deliveryId: delivery.id };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Error al guardar el registro. Intenta nuevamente.' };
  }
}

export async function getDeliveryById(id: string) {
  return prisma.delivery.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      cedula: true,
      phone: true,
      personRole: true,
      vehicleType: true,
      plate: true,
      brand: true,
      color: true,
      driverName: true,
      destSector: true,
      recipient: true,
      aidType: true,
      quantity: true,
      priority: true,
      notes: true,
      qrCode: true,
      qrToken: true,
      status: true,
      createdAt: true,
    },
  });
}
