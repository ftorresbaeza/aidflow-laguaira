import { getDashboardData } from '@/lib/actions/dashboard';
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

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const { stats, recentDeliveries } = await getDashboardData();

  const cards = [
    { label: 'Pendientes', value: stats.pending, color: 'bg-yellow-500', href: '/admin/entregas?status=PENDIENTE' },
    { label: 'Aprobados', value: stats.aprobado, color: 'bg-blue-500', href: '/admin/entregas?status=APROBADO' },
    { label: 'En tránsito', value: stats.enTransito, color: 'bg-purple-500', href: '/admin/entregas?status=EN_TRANSITO' },
    { label: 'Completados', value: stats.completado, color: 'bg-green-500', href: '/admin/entregas?status=COMPLETADO' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
        {stats.urgentPending > 0 && (
          <Link href="/admin/entregas?priority=URGENTE&status=PENDIENTE"
            className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl animate-pulse">
            ⚠️ {stats.urgentPending} urgente{stats.urgentPending > 1 ? 's' : ''} pendiente{stats.urgentPending > 1 ? 's' : ''}
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${c.color} rounded-xl mb-3`} />
            <p className="text-3xl font-black text-gray-900">{c.value}</p>
            <p className="text-sm text-gray-500 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-2xl font-bold text-red-600">{stats.rechazado}</p>
          <p className="text-xs text-gray-500">Rechazados</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-2xl font-bold text-gray-800">{stats.pending + stats.aprobado + stats.enTransito + stats.completado + stats.rechazado}</p>
          <p className="text-xs text-gray-500">Total registros</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-2xl font-bold text-blue-600">{stats.lastWeek}</p>
          <p className="text-xs text-gray-500">Últimos 7 días</p>
        </div>
      </div>

      {/* Recent */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">Registros recientes</h2>
          <Link href="/admin/entregas" className="text-blue-600 text-sm hover:underline">Ver todos →</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {recentDeliveries.length === 0 ? (
            <p className="text-center text-gray-400 py-10">Sin registros aún</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentDeliveries.map((d) => (
                <Link key={d.id} href={`/admin/entregas/${d.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${PRIORITY_STYLE[d.priority]}`}>
                    {d.priority}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{d.fullName}</p>
                    <p className="text-xs text-gray-400 truncate">→ {d.destSector}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLE[d.status]}`}>
                    {STATUS_LABEL[d.status]}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
