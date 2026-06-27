import Link from 'next/link';

export const metadata = {
  title: 'AidFlow La Guaira — Coordinación de Ayuda Humanitaria',
  description: 'Plataforma para registrar y controlar la entrega de insumos humanitarios en La Guaira.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700">
      {/* Hero */}
      <div className="px-5 pt-12 pb-8 text-center text-white">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/15 rounded-3xl mb-5 backdrop-blur-sm border border-white/20">
          <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black tracking-tight">AidFlow</h1>
        <p className="text-blue-200 font-semibold text-lg mt-0.5">La Guaira · Ayuda Humanitaria</p>
        <p className="text-blue-100/80 text-sm mt-3 max-w-xs mx-auto leading-relaxed">
          Sistema de registro y control de entrega de insumos para la emergencia
        </p>
      </div>

      {/* Main cards */}
      <div className="px-4 pb-6 space-y-3 max-w-md mx-auto">

        {/* Registrarse */}
        <Link href="/registrar"
          className="block bg-white rounded-2xl p-5 shadow-xl active:scale-[0.98] transition-transform">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-lg">Registrarme</h2>
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm mt-1 leading-snug">
                Llena tus datos y obtén tu credencial QR para trasladar insumos
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {['Donante', 'Transportista', 'Voluntario', 'Familiar'].map(r => (
                  <span key={r} className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">{r}</span>
                ))}
              </div>
            </div>
          </div>
        </Link>

        {/* Scanner */}
        <Link href="/escanear"
          className="block bg-white rounded-2xl p-5 shadow-xl active:scale-[0.98] transition-transform">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-lg">Escanear QR</h2>
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm mt-1 leading-snug">
                Para operadores en puntos de control: verifica credenciales QR en tiempo real
              </p>
              <span className="inline-block bg-orange-50 text-orange-700 text-xs font-medium px-2 py-0.5 rounded-full mt-3">
                Punto de control
              </span>
            </div>
          </div>
        </Link>

        {/* Ver mi credencial */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
          <p className="text-white/80 text-sm text-center font-medium mb-3">
            ¿Ya te registraste? Accede a tu credencial
          </p>
          <p className="text-white/60 text-xs text-center">
            Usa el enlace que recibiste al registrarte o busca tu credencial en el historial del navegador
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 px-5 py-8 max-w-md mx-auto">
        <h3 className="text-white font-bold text-center mb-5 text-sm uppercase tracking-wider">¿Cómo funciona?</h3>
        <div className="space-y-4">
          {[
            { n: '1', title: 'Te registras', desc: 'Llenas el formulario con tus datos, los del vehículo y los insumos que llevas.', color: 'bg-blue-500' },
            { n: '2', title: 'Obtienes tu QR', desc: 'Se genera una credencial digital con código QR que puedes guardar o compartir.', color: 'bg-purple-500' },
            { n: '3', title: 'Pasan el control', desc: 'En el punto de control escanean tu QR y verifican tu identidad y vehículo.', color: 'bg-green-500' },
            { n: '4', title: 'Entregas los insumos', desc: 'El coordinador marca la entrega como completada en el panel de administración.', color: 'bg-amber-500' },
          ].map(step => (
            <div key={step.n} className="flex gap-3 items-start">
              <div className={`w-7 h-7 ${step.color} rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5`}>
                {step.n}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{step.title}</p>
                <p className="text-blue-200/80 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority legend */}
      <div className="px-5 pb-8 max-w-md mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-white/80 text-xs font-semibold mb-3 text-center uppercase tracking-wider">Niveles de prioridad</p>
          <div className="flex gap-2 justify-center">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-white/70 text-xs">Urgente</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-white/70 text-xs">Alta</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-white/70 text-xs">Normal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin link — subtle */}
      <div className="pb-10 text-center">
        <Link href="/login" className="text-blue-300/60 text-xs hover:text-blue-200 transition-colors">
          Acceso para coordinadores →
        </Link>
      </div>
    </div>
  );
}
