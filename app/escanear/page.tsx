'use client';

import { useState, useCallback } from 'react';
import { recordScan } from '@/lib/actions/admin';
import { QRScanner } from '@/components/scanner/QRScanner';
import { useScanQueue } from '@/hooks/useScanQueue';
import type { ScanRecord } from '@/lib/db/local-db';

type ScanResult = Awaited<ReturnType<typeof recordScan>>;

const PRIORITY_STYLE: Record<string, { label: string; classes: string; bg: string; dot: string }> = {
  URGENTE: { label: 'URGENTE', classes: 'text-red-700 bg-red-50 border-red-200', bg: 'bg-red-600', dot: 'bg-red-500' },
  ALTA:    { label: 'ALTA',    classes: 'text-amber-700 bg-amber-50 border-amber-200', bg: 'bg-amber-500', dot: 'bg-amber-500' },
  NORMAL:  { label: 'NORMAL',  classes: 'text-green-700 bg-green-50 border-green-200', bg: 'bg-green-600', dot: 'bg-green-500' },
};

const ROLE_LABEL: Record<string, string> = {
  DONANTE: 'Donante', TRANSPORTISTA: 'Transportista',
  VOLUNTARIO: 'Voluntario', FAMILIAR: 'Familiar de paciente',
};

const AID_LABEL: Record<string, string> = {
  MEDICAMENTOS: 'Medicamentos', ALIMENTOS: 'Alimentos', AGUA: 'Agua', OTRO: 'Otros insumos',
};

const STATUS_LABEL: Record<string, string> = {
  PENDIENTE: 'Pendiente', APROBADO: 'Aprobado',
  EN_TRANSITO: 'En tránsito', COMPLETADO: 'Entregado', RECHAZADO: 'Rechazado',
};

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'hace un momento';
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`;
  return `hace ${Math.floor(diff / 86400)} d`;
}

// ── Scan result card ──────────────────────────────────────────────────────────

function DeliveryCard({ delivery, offline = false }: {
  delivery: NonNullable<ScanResult['delivery']>;
  offline?: boolean;
}) {
  const p = PRIORITY_STYLE[delivery.priority] ?? PRIORITY_STYLE.NORMAL;
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
      <div className={`px-5 py-2.5 text-white text-center font-bold text-sm flex items-center justify-center gap-2 ${p.bg}`}>
        {offline && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 12h.01M3 3l18 18" />
          </svg>
        )}
        Prioridad {p.label}
      </div>
      <div className="p-5 space-y-4">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Identificación</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{delivery.fullName}</p>
          <p className="text-gray-500 font-mono">{delivery.cedula}</p>
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full mt-1">
            {ROLE_LABEL[delivery.personRole] ?? delivery.personRole}
          </span>
        </div>

        {delivery.plate && (
          <div className="bg-orange-50 rounded-xl p-3">
            <p className="text-xs text-orange-600 font-medium">Placa del vehículo</p>
            <p className="text-2xl font-black text-gray-900 font-mono tracking-wider mt-0.5">{delivery.plate}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 font-medium">Destino</p>
            <p className="font-bold text-gray-800 text-sm mt-0.5">{delivery.destSector}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 font-medium">Destinatario</p>
            <p className="font-bold text-gray-800 text-sm mt-0.5 truncate">{delivery.recipient}</p>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-3">
          <p className="text-xs text-green-600 font-medium">{AID_LABEL[delivery.aidType] ?? delivery.aidType}</p>
          <p className="font-semibold text-gray-800 mt-0.5">{delivery.quantity}</p>
        </div>

        <div className={`rounded-xl p-3 border text-center text-sm font-semibold ${p.classes}`}>
          Estado: {STATUS_LABEL[delivery.status] ?? delivery.status}
        </div>

        {offline ? (
          <p className="text-center text-xs text-amber-600 font-medium">
            Guardado localmente · Se sincronizará con internet
          </p>
        ) : (
          <p className="text-center text-xs text-gray-400">
            QR verificado · escaneo registrado
          </p>
        )}
      </div>
    </div>
  );
}

// ── History item ──────────────────────────────────────────────────────────────

function HistoryItem({ record }: { record: ScanRecord }) {
  const dot = PRIORITY_STYLE[record.delivery.priority]?.dot ?? 'bg-gray-400';
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-800 last:border-0">
      <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-semibold text-white text-sm truncate">{record.delivery.fullName}</p>
          <p className="text-gray-500 text-xs flex-shrink-0">{timeAgo(record.scannedAt)}</p>
        </div>
        <p className="text-gray-400 text-xs font-mono">{record.delivery.cedula}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {record.delivery.plate && (
            <span className="text-orange-400 text-xs font-mono font-bold">{record.delivery.plate}</span>
          )}
          <span className="text-gray-500 text-xs">{record.delivery.destSector}</span>
          <span className={`text-xs font-semibold ${
            record.delivery.status === 'RECHAZADO' ? 'text-red-400'
            : record.delivery.status === 'COMPLETADO' ? 'text-green-400'
            : 'text-gray-400'
          }`}>
            {STATUS_LABEL[record.delivery.status] ?? record.delivery.status}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EscanearPage() {
  const [scanning, setScanning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [offlineDelivery, setOfflineDelivery] = useState<ScanResult['delivery'] | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const { pendingCount, history, syncing, queueScan, saveToHistory, syncPending } = useScanQueue();

  const handleScan = useCallback(async (token: string) => {
    if (loading) return;
    setScanning(false);
    setLoading(true);
    setOfflineDelivery(null);

    try {
      const res = await recordScan(token);
      setResult(res);
      if (res.success && res.delivery) {
        await saveToHistory({ token, scannedAt: Date.now(), delivery: res.delivery });
      }
    } catch {
      // Network error — try to show local decoded data and queue for later
      setResult({ success: false, error: 'Sin conexión' });
      // Decode payload locally to show partial info while offline
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const p = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
          if (p.deliveryId) {
            const localDelivery = {
              id: p.deliveryId,
              fullName: p.fullName ?? '—',
              cedula: p.cedula ?? '—',
              personRole: p.personRole ?? 'DONANTE',
              plate: p.plate ?? null,
              destSector: p.destSector ?? '—',
              recipient: p.recipient ?? '—',
              aidType: p.aidType ?? 'OTRO',
              quantity: '—',
              priority: p.priority ?? 'NORMAL',
              status: 'PENDIENTE',
            };
            setOfflineDelivery(localDelivery);
            await queueScan(token);
          }
        }
      } catch { /* invalid token */ }
    }

    setLoading(false);
  }, [loading, saveToHistory, queueScan]);

  function reset() {
    setScanning(true);
    setResult(null);
    setOfflineDelivery(null);
    setLoading(false);
    setShowHistory(false);
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-900 px-4 pt-safe-top pb-4 sticky top-0 z-10 border-b border-gray-800">
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Punto de Control</h1>
              <p className="text-gray-400 text-xs">AidFlow La Guaira</p>
            </div>
          </div>

          {/* Pending badge + sync button */}
          <div className="flex items-center gap-2">
            {pendingCount > 0 && (
              <button
                onClick={syncPending}
                disabled={syncing}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
              >
                {syncing ? (
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                {pendingCount} pendiente{pendingCount !== 1 ? 's' : ''}
              </button>
            )}

            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  showHistory ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Historial
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Historial local */}
      {showHistory && !loading && (
        <div className="px-4 py-4 border-b border-gray-800">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Últimos {history.length} escaneos · guardados localmente
          </p>
          {history.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-4">Sin historial todavía</p>
          ) : (
            <div>
              {history.map((r) => (
                <HistoryItem key={r.id} record={r} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scanner area */}
      {scanning && !showHistory && (
        <div className="px-4 pt-4">
          <div className="bg-gray-800 rounded-2xl overflow-hidden aspect-square max-w-sm mx-auto">
            <QRScanner onScan={handleScan} />
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            Apunta la cámara al código QR de la credencial
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p>Verificando credencial...</p>
        </div>
      )}

      {/* Offline queued result */}
      {!loading && offlineDelivery && (
        <div className="px-4 pb-4 pt-2">
          <div className="bg-amber-900/30 border border-amber-700 rounded-2xl p-3 mb-3 flex items-start gap-2">
            <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 12h.01M3 3l18 18" />
            </svg>
            <div>
              <p className="text-amber-300 text-sm font-bold">Sin conexión — guardado localmente</p>
              <p className="text-amber-400 text-xs mt-0.5">El escaneo se registrará en el servidor cuando vuelva el internet.</p>
            </div>
          </div>
          <DeliveryCard delivery={offlineDelivery} offline />
        </div>
      )}

      {/* Online result */}
      {result && !loading && !offlineDelivery && (
        <div className="px-4 pb-4 pt-2">
          {result.success && result.delivery ? (
            <DeliveryCard delivery={result.delivery} />
          ) : (
            <div className="bg-red-900 rounded-3xl p-6 text-center">
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg">QR Inválido</h3>
              <p className="text-red-300 mt-2">{result.error}</p>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      {!scanning && !loading && (
        <div className="px-4 pb-8 space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-colors"
          >
            Escanear otro QR
          </button>
        </div>
      )}
    </div>
  );
}
