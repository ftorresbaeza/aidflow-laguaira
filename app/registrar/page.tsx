import RegistrationForm from '@/components/registrar/RegistrationForm';

export const metadata = {
  title: 'Registrarse - AidFlow La Guaira',
  description: 'Regístrese para coordinar la entrega de insumos humanitarios',
};

export default function RegistrarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">AidFlow La Guaira</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Regístrese para recibir su credencial QR de acceso humanitario
          </p>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
}
