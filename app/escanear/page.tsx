'use client';

import { useState, useCallback } from 'react';
import { recordScan } from '@/lib/actions/admin';
import { QRScanner } from '@/components/scanner/QRScanner';

type ScanResult = Awaited<ReturnType<typeof recordScan>>;

function decodeQRPayload(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload;
  } catch {
    return null;
  }
}

const PRIORITY_STYLE: Record<string, { label: string; classes: string; bg: string }> = {
  URGENTE: { label: 'URGENTE', classes: 'text-red-700 bg-red-50 border-red-200', bg: 'bg-red-600' },
  ALTA: { label: 'ALTA', classes: 'text-amber-700 bg-amber-50 border-amber-200', bg: 'bg-amber-500' },
  NORMAL: { label: 'NORMAL', classes: 'text-green-700 bg-green-50 border-green-200', bg: 'bg-green-600' },
};

const ROLE_LABEL: Record<string, string> = {
  DONANTE: 'Donante',
  TRANSPORTISTA: 'Transportista',
  VOLUNTARIO: 'Voluntario',
  FAMILIAR: 'Familiar de paciente',
};

const AID_LABEL: Record<string, string> = {
  MEDICAMENTOS: 'Medicamentos',
  ALIMENTOS: 'Alimentos',
  AGUA: 'Agua',
  OTRO: 'Otros insumos',
};

const STATUS_LABEL: Record<string, string> = {
  PENDIENTE: 'Pendiente de aprobación',
  APROBADO: 'Aprobado',
  EN_TRANSITO: 'En tránsito',
  COMPLETADO: 'Entregado',
  RECHAZADO: 'Rechazado ⚠️',
};

export default function EscanearPage() {
  const [scanning, setScanning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [rawPayload, setRawPayload] = useState<Record<string, string> | null>(null);

  const handleScan = useCallback(async (token: string) => {
    if (loading) return;
    setScanning(false);
    setLoading(true);

    const decoded = decodeQRPayload(token);
    setRawPayload(decoded);

    const res = await recordScan(token);
    setResult(res);
    setLoading(false);
  }, [loading]);

  function reset() {
    setScanning(true);
    setResult(null);
    setRawPayload(null);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-900 px-4 pt-safe-top pb-4">
        <div className="flex items-center gap-3 pt-4">
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
      </div>

      {/* Scanner area */}
      {scanning && (
        <div className="px-4">
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

      {/* Result */}
      {result && !loading && (
        <div className="px-4 pb-8">
          {result.success && result.delivery ? (
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              {/* Priority banner */}
              <div className={`px-5 py-3 text-white text-center font-bold text-sm ${
                PRIORITY_STYLE[result.delivery.priority]?.bg ?? 'bg-blue-600'
              }`}>
                Prioridad {PRIORITY_STYLE[result.delivery.priority]?.label ?? result.delivery.priority}
              </div>

              <div className="p-5 space-y-4">
                {/* Person */}
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Identificación</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{result.delivery.fullName}</p>
                  <p className="text-gray-500 font-mono">{result.delivery.cedula}</p>
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full mt-1">
                    {ROLE_LABEL[result.delivery.personRole] ?? result.delivery.personRole}
                  </span>
                </div>

                {/* Vehicle */}
                {result.delivery.plate && (
                  <div className="bg-orange-50 rounded-xl p-3">
                    <p className="text-xs text-orange-600 font-medium">Vehículo / Placa</p>
                    <p className="text-2xl font-black text-gray-900 font-mono tracking-wider mt-0.5">
                      {result.delivery.plate}
                    </p>
                  </div>
                )}

                {/* Destination */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 font-medium">Destino</p>
                    <p className="font-bold text-gray-800 text-sm mt-0.5">{result.delivery.destSector}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 font-medium">Destinatario</p>
                    <p className="font-bold text-gray-800 text-sm mt-0.5 truncate">{result.delivery.recipient}</p>
                  </div>
                </div>

                {/* Aid */}
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-xs text-green-600 font-medium">{AID_LABEL[result.delivery.aidType] ?? result.delivery.aidType}</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{result.delivery.quantity}</p>
                </div>

                {/* Status */}
                <div className={`rounded-xl p-3 border text-center text-sm font-semibold ${
                  PRIORITY_STYLE[result.delivery.priority]?.classes ?? 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  Estado: {STATUS_LABEL[result.delivery.status] ?? result.delivery.status}
                </div>

                <p className="text-center text-xs text-gray-400">
                  ✓ QR verificado — escaneo registrado
                </p>
              </div>
            </div>
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

          <button
            onClick={reset}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-colors"
          >
            Escanear otro QR
          </button>
        </div>
      )}
    </div>
  );
}
