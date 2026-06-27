import { AidType, DeliveryStatus, PersonRole, Priority } from '@prisma/client';

type Delivery = {
  id: string;
  fullName: string;
  cedula: string;
  phone?: string | null;
  personRole: PersonRole;
  vehicleType?: string | null;
  plate?: string | null;
  brand?: string | null;
  color?: string | null;
  driverName?: string | null;
  destSector: string;
  recipient: string;
  aidType: AidType;
  quantity: string;
  priority: Priority;
  notes?: string | null;
  qrCode?: string | null;
  status: DeliveryStatus;
  createdAt: Date;
};

const ROLE_LABEL: Record<PersonRole, string> = {
  DONANTE: 'Donante',
  TRANSPORTISTA: 'Transportista',
  VOLUNTARIO: 'Voluntario',
  FAMILIAR: 'Familiar de paciente',
};

const AID_LABEL: Record<AidType, string> = {
  MEDICAMENTOS: 'Medicamentos',
  ALIMENTOS: 'Alimentos',
  AGUA: 'Agua',
  OTRO: 'Otros insumos',
};

const PRIORITY_CONFIG: Record<Priority, { label: string; classes: string }> = {
  URGENTE: { label: 'URGENTE', classes: 'bg-red-600 text-white' },
  ALTA: { label: 'ALTA', classes: 'bg-amber-500 text-white' },
  NORMAL: { label: 'NORMAL', classes: 'bg-green-600 text-white' },
};

const STATUS_CONFIG: Record<DeliveryStatus, { label: string; classes: string }> = {
  PENDIENTE: { label: 'Pendiente de aprobación', classes: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
  APROBADO: { label: 'Aprobado', classes: 'bg-blue-50 text-blue-800 border-blue-200' },
  EN_TRANSITO: { label: 'En tránsito', classes: 'bg-purple-50 text-purple-800 border-purple-200' },
  COMPLETADO: { label: 'Entregado', classes: 'bg-green-50 text-green-800 border-green-200' },
  RECHAZADO: { label: 'Rechazado', classes: 'bg-red-50 text-red-800 border-red-200' },
};

export function CredentialCard({ delivery }: { delivery: Delivery }) {
  const priority = PRIORITY_CONFIG[delivery.priority];
  const status = STATUS_CONFIG[delivery.status];
  const dateStr = new Date(delivery.createdAt).toLocaleString('es-VE', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-blue-700 px-5 py-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-xs font-medium uppercase tracking-wider">AidFlow La Guaira</p>
            <p className="font-bold text-lg leading-tight mt-0.5">{delivery.fullName}</p>
            <p className="text-blue-200 text-sm">{delivery.cedula}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${priority.classes}`}>
            {priority.label}
          </span>
        </div>
        <div className="mt-2">
          <span className="bg-blue-600 text-blue-100 text-xs px-2 py-0.5 rounded-full">
            {ROLE_LABEL[delivery.personRole]}
          </span>
        </div>
      </div>

      {/* QR Code */}
      <div className="flex justify-center py-5 bg-gray-50 border-b border-gray-100">
        {delivery.qrCode ? (
          <img
            src={delivery.qrCode}
            alt="Código QR de credencial"
            className="w-44 h-44 rounded-xl"
          />
        ) : (
          <div className="w-44 h-44 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            Generando QR...
          </div>
        )}
      </div>

      {/* Status */}
      <div className={`mx-4 mt-4 px-3 py-2 rounded-lg border text-center text-sm font-medium ${status.classes}`}>
        {status.label}
      </div>

      {/* Info grid */}
      <div className="px-4 py-4 space-y-3">
        {delivery.plate && (
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
            <div className="text-orange-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-orange-600 font-medium">Vehículo</p>
              <p className="font-bold text-gray-800 font-mono">{delivery.plate}</p>
              {(delivery.brand || delivery.color) && (
                <p className="text-xs text-gray-500">{[delivery.brand, delivery.color].filter(Boolean).join(' · ')}</p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 font-medium">Destino</p>
            <p className="font-semibold text-gray-800 mt-0.5">{delivery.destSector}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 font-medium">Destinatario</p>
            <p className="font-semibold text-gray-800 mt-0.5 truncate">{delivery.recipient}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-sm">
          <p className="text-xs text-gray-400 font-medium">{AID_LABEL[delivery.aidType]}</p>
          <p className="font-semibold text-gray-800 mt-0.5">{delivery.quantity}</p>
        </div>

        {delivery.notes && (
          <div className="bg-gray-50 rounded-xl p-3 text-sm">
            <p className="text-xs text-gray-400 font-medium">Notas</p>
            <p className="text-gray-700 mt-0.5">{delivery.notes}</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 pt-1">Registrado: {dateStr}</p>
        <p className="text-center text-xs text-gray-400 font-mono">ID: {delivery.id.slice(-8).toUpperCase()}</p>
      </div>
    </div>
  );
}
