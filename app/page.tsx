'use client';

import Link from 'next/link';
import { useState } from 'react';

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconTruck = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
  </svg>
);
const IconHeart = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const IconUsers = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconClipboard = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);
const IconForm = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);
const IconQr = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);
const IconScan = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const IconDone = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const IconLogin = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
);
const IconDashboard = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const IconCheck = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);
const IconArrow = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

type RoleId = 'transportista' | 'voluntario' | 'familiar' | 'coordinador';

const ROLES: { id: RoleId; label: string; sub: string; Icon: React.FC<{ className?: string }>; accent: string }[] = [
  { id: 'transportista', label: 'Transportista',         sub: 'Llevas insumos en vehículo',       Icon: IconTruck,     accent: 'blue'   },
  { id: 'voluntario',    label: 'Voluntario / Donante',  sub: 'Aportas ayuda directamente',        Icon: IconHeart,     accent: 'rose'   },
  { id: 'familiar',      label: 'Familiar',              sub: 'Llevas ayuda a alguien afectado',   Icon: IconUsers,     accent: 'amber'  },
  { id: 'coordinador',   label: 'Coordinador',           sub: 'Gestionas y supervisas entregas',   Icon: IconClipboard, accent: 'violet' },
];

const ACCENT: Record<string, { icon: string; step: string; tag: string; btn: string; check: string }> = {
  blue:   { icon: 'bg-blue-600',   step: 'bg-blue-600',   tag: 'bg-blue-100 text-blue-700',   btn: 'bg-blue-600 hover:bg-blue-700',   check: 'text-blue-600'   },
  rose:   { icon: 'bg-rose-600',   step: 'bg-rose-500',   tag: 'bg-rose-100 text-rose-700',   btn: 'bg-rose-600 hover:bg-rose-700',   check: 'text-rose-600'   },
  amber:  { icon: 'bg-amber-500',  step: 'bg-amber-500',  tag: 'bg-amber-100 text-amber-700', btn: 'bg-amber-500 hover:bg-amber-600', check: 'text-amber-600'  },
  violet: { icon: 'bg-violet-600', step: 'bg-violet-600', tag: 'bg-violet-100 text-violet-700',btn: 'bg-violet-600 hover:bg-violet-700',check: 'text-violet-600'},
};

const FLOWS: Record<RoleId, {
  steps: { Icon: React.FC<{ className?: string }>; title: string; body: string }[];
  needs: string[];
  cta: { label: string; href: string };
}> = {
  transportista: {
    steps: [
      { Icon: IconForm, title: 'Llena el formulario',      body: 'Escribe tu nombre completo, número de cédula, datos de tu vehículo (placa, marca, color) y los insumos que llevas.' },
      { Icon: IconQr,   title: 'Guarda tu código QR',      body: 'Al terminar, el sistema te genera un código QR personal. Toma captura de pantalla o deja la página abierta en tu celular.' },
      { Icon: IconScan, title: 'Muéstralo en el control',  body: 'En el punto de control, el operador escanea tu QR. En segundos verifica tu nombre, placa y la carga que transportas.' },
      { Icon: IconDone, title: 'Entrega lista',            body: 'Cuando llegas al destino, el coordinador marca tu entrega como completada. Queda registro oficial de toda la operación.' },
    ],
    needs: [
      'Tu número de cédula (formato V-12345678)',
      'Placa de tu vehículo',
      'Nombre de quien recibe la ayuda',
      'Sector o dirección de entrega',
      'Qué llevas y en qué cantidad (ej: 20 kg de arroz)',
    ],
    cta: { label: 'Registrarme ahora', href: '/registrar' },
  },
  voluntario: {
    steps: [
      { Icon: IconForm, title: 'Regístrate',               body: 'Completa el formulario con tu nombre, cédula y describe la ayuda que estás aportando. No necesitas cuenta ni contraseña.' },
      { Icon: IconQr,   title: 'Obtén tu QR',              body: 'Se genera tu credencial digital al instante. Solo muestra la pantalla de tu celular en el control, sin imprimir nada.' },
      { Icon: IconScan, title: 'Pasa el control',          body: 'El operador escanea tu código y confirma tu identidad y el tipo de ayuda que llevas. Rápido, sin papeles.' },
      { Icon: IconDone, title: 'Tu aporte queda registrado', body: 'Tu contribución queda documentada en el sistema con fecha, hora y destino. Gracias por ayudar.' },
    ],
    needs: [
      'Tu número de cédula',
      'Descripción de lo que aportas (alimentos, ropa, medicamentos…)',
      'Nombre de quien recibe o sector de destino',
    ],
    cta: { label: 'Registrarme ahora', href: '/registrar' },
  },
  familiar: {
    steps: [
      { Icon: IconForm, title: 'Ingresa tus datos',        body: 'Escribe tu nombre, cédula y describe lo que llevas: alimentos, agua, medicamentos, ropa u otros insumos.' },
      { Icon: IconQr,   title: 'Indica a quién ayudas',    body: 'Escribe el nombre de tu familiar y el lugar al que te diriges. Así queda registrado hacia dónde va la ayuda.' },
      { Icon: IconScan, title: 'Presenta el QR',           body: 'En el punto de control muestras el QR de tu celular. El operador verifica y te deja pasar. Sin filas largas.' },
      { Icon: IconDone, title: 'Ayuda entregada',          body: 'El coordinador confirma que la ayuda llegó. Queda un registro de que tu familiar fue atendido.' },
    ],
    needs: [
      'Tu número de cédula',
      'Nombre del familiar que recibe la ayuda',
      'Sector o dirección a la que vas',
      'Lo que llevas (tipo y cantidad aproximada)',
    ],
    cta: { label: 'Registrarme ahora', href: '/registrar' },
  },
  coordinador: {
    steps: [
      { Icon: IconLogin,     title: 'Entra con tu usuario',      body: 'Ve a /login e ingresa con tu email y contraseña. Si no tienes acceso, contacta a tu supervisor para que te cree un usuario.' },
      { Icon: IconDashboard, title: 'Revisa el panel',           body: 'Verás en tiempo real cuántas entregas hay pendientes, aprobadas, en tránsito y completadas. Las urgentes se destacan en rojo.' },
      { Icon: IconScan,      title: 'Aprueba o rechaza',         body: 'Entra a cada registro, revisa los datos y cambia el estado. Cada acción queda registrada con tu nombre y la hora.' },
      { Icon: IconDone,      title: 'Monitorea desde campo',     body: 'Cada vez que se escanea un QR en un punto de control, el sistema lo registra. Puedes ver el recorrido completo de cada entrega.' },
    ],
    needs: [
      'Email y contraseña (los otorga el supervisor)',
      'Para pedir acceso: habla con tu coordinador principal',
      'Para crear nuevos usuarios: Admin → Usuarios (solo SUPER_ADMIN)',
    ],
    cta: { label: 'Entrar al panel', href: '/login' },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [active, setActive] = useState<RoleId>('transportista');
  const role = ROLES.find(r => r.id === active)!;
  const flow = FLOWS[active];
  const a = ACCENT[role.accent];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="bg-blue-700 text-white px-5 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <IconHeart className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-black text-base">AidFlow</span>
              <span className="text-blue-200 text-xs ml-2">La Guaira · Ayuda Humanitaria</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-blue-200 text-xs">Sistema activo</span>
          </div>
        </div>
      </header>

      {/* ── INTRO ──────────────────────────────────────────────────────────── */}
      <div className="bg-blue-700 text-white pb-10 px-5">
        <div className="max-w-4xl mx-auto pt-6 pb-2 text-center">
          <h1 className="text-3xl md:text-4xl font-black leading-tight">
            Regístrate y muévete<br className="hidden sm:block" /> con tu ayuda sin complicaciones
          </h1>
          <p className="text-blue-100 mt-3 text-base max-w-xl mx-auto leading-relaxed">
            Este sistema te permite registrarte, obtener un código QR y pasar los puntos de control de forma rápida y organizada. Sin papeles. Desde tu celular.
          </p>
        </div>
      </div>

      {/* ── ACCIONES RÁPIDAS ───────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 -mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/registrar"
            className="bg-white border-2 border-blue-600 rounded-2xl p-5 flex items-center gap-4 shadow hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <IconForm className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-black text-gray-900 text-base">Quiero registrarme</p>
              <p className="text-gray-500 text-sm mt-0.5">Llena el formulario y obtén tu código QR</p>
            </div>
            <IconArrow className="w-5 h-5 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link href="/escanear"
            className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
              <IconQr className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-black text-gray-900 text-base">Soy operador de control</p>
              <p className="text-gray-500 text-sm mt-0.5">Escaneo códigos QR en el punto de control</p>
            </div>
            <IconArrow className="w-5 h-5 text-gray-300 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── GUÍA PASO A PASO ───────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="mb-6">
          <h2 className="text-xl font-black text-gray-900">¿Cómo funciona? Elige tu caso</h2>
          <p className="text-gray-500 text-sm mt-1">Selecciona quién eres y te explicamos exactamente qué hacer</p>
        </div>

        {/* Role tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {ROLES.map(r => {
            const isActive = r.id === active;
            const ra = ACCENT[r.accent];
            return (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={`flex flex-col items-center text-center gap-2 py-4 px-3 rounded-xl border-2 transition-all duration-150 ${
                  isActive
                    ? `border-current bg-white shadow-md ${ra.tag.split(' ')[1]}`
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isActive ? ra.icon : 'bg-gray-100'}`}>
                  <r.Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div>
                  <p className={`font-bold text-sm leading-tight ${isActive ? '' : 'text-gray-700'}`}>{r.label}</p>
                  <p className={`text-xs mt-0.5 leading-tight ${isActive ? 'opacity-60' : 'text-gray-400'}`}>{r.sub}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Steps + needs panel */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Steps */}
            <div className="flex-1 p-6 md:p-8">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-5 ${a.tag}`}>
                {role.label}
              </span>
              <div>
                {flow.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-xl ${a.step} text-white flex items-center justify-center shrink-0`}>
                        <step.Icon className="w-4 h-4" />
                      </div>
                      {i < flow.steps.length - 1 && (
                        <div className="w-px bg-gray-200 flex-1 my-1.5" style={{ minHeight: 20 }} />
                      )}
                    </div>
                    <div className={`${i < flow.steps.length - 1 ? 'pb-5' : ''} flex-1`}>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Paso {i + 1}</p>
                      <p className="font-bold text-gray-900 text-sm">{step.title}</p>
                      <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Needs + CTA */}
            <div className="md:w-72 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col p-6 md:p-8 gap-6">
              <div>
                <p className="font-bold text-gray-800 text-sm mb-3">Ten esto a mano antes de empezar</p>
                <ul className="space-y-2.5">
                  {flow.needs.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5`}>
                        <IconCheck className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Link
                  href={flow.cta.href}
                  className={`flex items-center justify-center gap-2 w-full ${a.btn} text-white font-bold py-3 rounded-xl text-sm transition-colors`}
                >
                  {flow.cta.label}
                  <IconArrow className="w-4 h-4" />
                </Link>
                <p className="text-gray-400 text-xs text-center mt-2">Gratuito · Sin registro previo</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── PREGUNTAS FRECUENTES ───────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 pb-10">
        <h2 className="text-xl font-black text-gray-900 mb-4">Preguntas frecuentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              q: '¿Necesito instalar alguna aplicación?',
              a: 'No. Todo funciona desde el navegador de tu celular (Chrome, Safari, etc.). Solo necesitas internet.',
            },
            {
              q: '¿Qué hago si ya me registré y perdí el QR?',
              a: 'Guarda la URL de tu credencial cuando te la muestren. También puedes pedirle al coordinador que busque tu registro por nombre o cédula.',
            },
            {
              q: '¿Cuánto tiempo tarda el registro?',
              a: 'Aproximadamente 2 a 3 minutos. Al finalizar obtienes el QR de inmediato, no hay aprobación previa.',
            },
            {
              q: '¿Cómo sé que mi entrega fue registrada?',
              a: 'El coordinador cambia el estado de tu registro a "Completado". Puedes ver el estado actual entrando a la URL de tu credencial.',
            },
            {
              q: '¿Para qué sirve el código QR?',
              a: 'Es tu credencial digital. El operador en el punto de control lo escanea para verificar quién eres, qué llevas y a dónde vas, sin necesidad de papeles.',
            },
            {
              q: '¿Qué pasa si no tengo conexión a internet?',
              a: 'Toma una captura de pantalla de tu QR antes de ir al control. El operador puede escanearlo desde una imagen aunque no tengas señal en el momento.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="font-bold text-gray-900 text-sm">{q}</p>
              <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white px-5 py-5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <span>AidFlow La Guaira · Sistema de coordinación de ayuda humanitaria</span>
          <Link href="/login" className="hover:text-gray-600 transition-colors">
            Acceso para coordinadores →
          </Link>
        </div>
      </footer>

    </div>
  );
}
