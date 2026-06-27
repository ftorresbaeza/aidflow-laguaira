import { getAllDeliveries } from '@/lib/actions/admin';
import { DeliveryStatus, Priority } from '@prisma/client';
import Link from 'next/link';

const STATUS_STYLE: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  APROBADO: 'bg-blue-100 text-blue-800',
  EN_TRANSITO: 'bg-purple-100 text-purple-800',
  COMPLETADO: 'bg-green-100 text-green-800',
  RECHAZADO: 'bg-red-100 text-red-800',
};
const STATUS_LABEL: Record<string, string> = {
  PENDIENTE: 'Pendiente', APROBADO: 'Aprobado',
  EN_TRANSITO: 'En tránsito', COMPLETADO: 'Completado', RECHAZADO: 'Rechazado',
};
const PRIORITY_STYLE: Record<string, string> = {
  URGENTE: 'bg-red-600 text-white',
  ALTA: 'bg-amber-500 text-white',
  NORMAL: 'bg-gray-200 text-gray-700',
};
const ROLE_LABEL: Record<string, string> = {
  DONANTE: 'Donante', TRANSPORTISTA: 'Transportista',
  VOLUNTARIO: 'Voluntario', FAMILIAR: 'Familiar',
};

export const dynamic = 'force-dynamic';

export default async function EntregasPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; priority?: string; search?: string }>;
}) {
  const sp = await searchParams;
  const deliveries = await getAllDeliveries({
    status: sp.status as DeliveryStatus | undefined,
    priority: sp.priority as Priority | undefined,
    search: sp.search,
  });

  const ALL_STATUSES = Object.values(DeliveryStatus);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Entregas</h1>
        <a href="/api/export/entregas"
          className="bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors">
          Exportar CSV
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/entregas"
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${!sp.status ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
          Todos
        </Link>
        {ALL_STATUSES.map((s) => (
          <Link key={s} href={`/admin/entregas?status=${s}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${sp.status === s ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {STATUS_LABEL[s]}
          </Link>
        ))}
      </div>

      {/* Search */}
      <form method="GET">
        {sp.status && <input type="hidden" name="status" value={sp.status} />}
        <input
          type="search"
          name="search"
          defaultValue={sp.search}
          placeholder="Buscar por nombre, cédula, placa, sector..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {deliveries.length === 0 ? (
          <p className="text-center text-gray-400 py-12">Sin registros con este filtro</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {deliveries.map((d) => (
              <Link key={d.id} href={`/admin/entregas/${d.id}`}
                className="flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors">
                <span className={`mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${PRIORITY_STYLE[d.priority]}`}>
                  {d.priority}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900">{d.fullName}</p>
                    <span className="text-xs text-gray-400">{d.cedula}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {ROLE_LABEL[d.personRole] ?? d.personRole}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap text-xs text-gray-500">
                    {d.plate && <span className="font-mono font-bold text-gray-700">{d.plate}</span>}
                    <span>→ {d.destSector}</span>
                    <span>{d.quantity}</span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLE[d.status]}`}>
                    {STATUS_LABEL[d.status]}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(d.createdAt).toLocaleDateString('es-VE')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
