import { notFound } from 'next/navigation';
import { getDeliveryById } from '@/lib/actions/registration';
import { CredentialCard } from '@/components/credencial/CredentialCard';

export default async function CredencialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const delivery = await getDeliveryById(id);

  if (!delivery) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl mb-3 shadow">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Registro exitoso</h1>
          <p className="text-sm text-gray-500 mt-1">Guarde o comparta este QR como credencial</p>
        </div>

        <CredentialCard delivery={delivery} />

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <a
            href="/registrar"
            className="block w-full text-center bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Registrar otra persona
          </a>
          <a
            href="/escanear"
            className="block w-full text-center bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Ir al escáner QR
          </a>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5 px-4">
          Comparta este enlace o tome una captura de pantalla del QR para presentarlo en los puntos de control.
        </p>
      </div>
    </div>
  );
}
