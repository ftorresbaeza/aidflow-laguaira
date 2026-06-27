import { notFound } from 'next/navigation';
import { getDeliveryDetail, approveDelivery, rejectDelivery, markInTransit, completeDelivery } from '@/lib/actions/admin';
import Link from 'next/link';

const STATUS_STYLE: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  APROBADO: 'bg-blue-100 text-blue-800 border-blue-200',
  EN_TRANSITO: 'bg-purple-100 text-purple-800 border-purple-200',
  COMPLETADO: 'bg-green-100 text-green-800 border-green-200',
  RECHAZADO: 'bg-red-100 text-red-800 border-red-200',
};
const STATUS_LABEL: Record<string, string> = {
  PENDIENTE: 'Pendiente de aprobación', APROBADO: 'Aprobado',
  EN_TRANSITO: 'En tránsito', COMPLETADO: 'Completado ✓', RECHAZADO: 'Rechazado',
};
const PRIORITY_STYLE: Record<string, string> = {
  URGENTE: 'bg-red-600 text-white', ALTA: 'bg-amber-500 text-white', NORMAL: 'bg-green-600 text-white',
};
const ROLE_LABEL: Record<string, string> = {
  DONANTE: 'Donante', TRANSPORTISTA: 'Transportista', VOLUNTARIO: 'Voluntario', FAMILIAR: 'Familiar de paciente',
};
const AID_LABEL: Record<string, string> = {
  MEDICAMENTOS: 'Medicamentos', ALIMENTOS: 'Alimentos', AGUA: 'Agua', OTRO: 'Otros insumos',
};

export const dynamic = 'force-dynamic';

export default async function DeliveryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const delivery = await getDeliveryDetail(id);
  if (!delivery) notFound();

  const canApprove = delivery.status === 'PENDIENTE';
  const canTransit = delivery.status === 'APROBADO';
  const canComplete = delivery.status === 'EN_TRANSITO' || delivery.status === 'APROBADO';
  const canReject = !['RECHAZADO', 'COMPLETADO'].includes(delivery.status);

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/entregas" className="text-gray-400 hover:text-gray-600">← Volver</Link>
        <h1 className="text-xl font-bold text-gray-900">Detalle de Entrega</h1>
      </div>

      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{delivery.fullName}</h2>
            <p className="text-gray-500 font-mono text-sm">{delivery.cedula}</p>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full mt-1">
              {ROLE_LABEL[delivery.personRole] ?? delivery.personRole}
            </span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${PRIORITY_STYLE[delivery.priority]}`}>
              {delivery.priority}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full border ${STATUS_STYLE[delivery.status]}`}>
              {STATUS_LABEL[delivery.status]}
            </span>
          </div>
        </div>

        {delivery.phone && <p className="mt-3 text-sm text-gray-500">📞 {delivery.phone}</p>}
        {delivery.address && <p className="text-sm text-gray-500">📍 {delivery.address}</p>}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-700 mb-3 text-sm">Acciones</h3>
        <div className="flex flex-wrap gap-2">
          {canApprove && (
            <form action={async () => { 'use server'; await approveDelivery(id); }}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-xl transition-colors">
                ✓ Aprobar
              </button>
            </form>
          )}
          {canTransit && (
            <form action={async () => { 'use server'; await markInTransit(id); }}>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm px-4 py-2 rounded-xl transition-colors">
                🚚 Marcar en tránsito
              </button>
            </form>
          )}
          {canComplete && (
            <form action={async () => { 'use server'; await completeDelivery(id); }}>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-4 py-2 rounded-xl transition-colors">
                ✓ Marcar entregado
              </button>
            </form>
          )}
          {canReject && (
            <form action={async () => { 'use server'; await rejectDelivery(id); }}>
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-4 py-2 rounded-xl transition-colors">
                ✕ Rechazar
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Vehicle */}
      {delivery.plate && (
        <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5">
          <h3 className="font-semibold text-orange-800 mb-3">Vehículo</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-orange-600 text-xs font-medium">Placa</p>
              <p className="font-black text-gray-900 font-mono text-xl">{delivery.plate}</p>
            </div>
            {delivery.vehicleType && (
              <div><p className="text-orange-600 text-xs font-medium">Tipo</p><p className="font-semibold">{delivery.vehicleType}</p></div>
            )}
            {delivery.brand && (
              <div><p className="text-orange-600 text-xs font-medium">Marca</p><p className="font-semibold">{delivery.brand}</p></div>
            )}
            {delivery.color && (
              <div><p className="text-orange-600 text-xs font-medium">Color</p><p className="font-semibold">{delivery.color}</p></div>
            )}
            {delivery.driverName && (
              <div className="col-span-2"><p className="text-orange-600 text-xs font-medium">Conductor</p><p className="font-semibold">{delivery.driverName}</p></div>
            )}
          </div>
        </div>
      )}

      {/* Aid info */}
      <div className="bg-green-50 rounded-2xl border border-green-100 p-5">
        <h3 className="font-semibold text-green-800 mb-3">Insumos</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><p className="text-green-600 text-xs font-medium">Destino</p><p className="font-semibold">{delivery.destSector}</p></div>
          <div><p className="text-green-600 text-xs font-medium">Destinatario</p><p className="font-semibold">{delivery.recipient}</p></div>
          <div><p className="text-green-600 text-xs font-medium">Tipo</p><p className="font-semibold">{AID_LABEL[delivery.aidType] ?? delivery.aidType}</p></div>
          <div><p className="text-green-600 text-xs font-medium">Cantidad</p><p className="font-semibold">{delivery.quantity}</p></div>
        </div>
        {delivery.notes && (
          <div className="mt-3 pt-3 border-t border-green-200">
            <p className="text-green-600 text-xs font-medium">Notas</p>
            <p className="text-gray-700 text-sm mt-1">{delivery.notes}</p>
          </div>
        )}
      </div>

      {/* Scans */}
      {delivery.scans.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">Escaneos registrados ({delivery.scans.length})</h3>
          <div className="space-y-2">
            {delivery.scans.map((s) => (
              <div key={s.id} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-gray-600">{s.location ?? 'Punto de control'}</span>
                <span className="text-gray-400 text-xs">
                  {new Date(s.scannedAt).toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit log */}
      {delivery.actions.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">Historial de acciones</h3>
          <div className="space-y-2">
            {delivery.actions.map((a) => (
              <div key={a.id} className="text-sm border-l-2 border-gray-200 pl-3">
                <span className="font-medium text-gray-800">{STATUS_LABEL[a.action] ?? a.action}</span>
                {a.admin && <span className="text-gray-400 text-xs ml-2">por {a.admin.name ?? a.admin.email}</span>}
                {a.note && <p className="text-gray-500 text-xs mt-0.5">{a.note}</p>}
                <p className="text-gray-400 text-xs">{new Date(a.timestamp).toLocaleString('es-VE')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center text-xs text-gray-400 pb-4">
        ID: {delivery.id} · Registrado: {new Date(delivery.createdAt).toLocaleString('es-VE')}
      </div>
    </div>
  );
}
