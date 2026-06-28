import { notFound } from 'next/navigation';
import { getDeliveryById } from '@/lib/actions/registration';
import { CredentialCard } from '@/components/credencial/CredentialCard';
import { ShareButtons } from '@/components/credencial/ShareButtons';

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

        <ShareButtons
          deliveryId={delivery.id}
          fullName={delivery.fullName}
          qrCode={delivery.qrCode}
        />

        {/* Secondary actions */}
        <div className="mt-4 space-y-2">
          <a
            href="/registrar"
            className="block w-full text-center bg-white border border-gray-200 text-gray-600 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Registrar otra persona
          </a>
          <a
            href="/escanear"
            className="block w-full text-center text-gray-400 text-sm py-2 hover:text-gray-600 transition-colors"
          >
            Ir al escáner QR →
          </a>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4 px-4">
          Toma también una captura de pantalla del QR por si no tienes internet en el punto de control.
        </p>
      </div>
    </div>
  );
}
