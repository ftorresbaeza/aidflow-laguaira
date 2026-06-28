'use client';

import Link from 'next/link';
import { useState } from 'react';

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function IconTruck({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M8 18h8M8 18a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v10M8 18a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zm-8-6h8M4 10h2" />
    </svg>
  );
}
function IconHeart({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}
function IconUsers({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconClipboard({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}
function IconPencil({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}
function IconQr({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
    </svg>
  );
}
function IconShield({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
function IconCheck({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
function IconChartBar({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
function IconBell({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}
function IconLock({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}
function IconPhone({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}
function IconArrow({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES = [
  {
    id: 'transportista' as const,
    label: 'Transportista',
    sub: 'Llevas insumos en vehículo',
    Icon: IconTruck,
    color: 'blue',
  },
  {
    id: 'voluntario' as const,
    label: 'Voluntario / Donante',
    sub: 'Aportas ayuda humanitaria',
    Icon: IconHeart,
    color: 'rose',
  },
  {
    id: 'familiar' as const,
    label: 'Familiar',
    sub: 'Llevas ayuda a un ser querido',
    Icon: IconUsers,
    color: 'amber',
  },
  {
    id: 'coordinador' as const,
    label: 'Coordinador',
    sub: 'Gestionas las entregas',
    Icon: IconClipboard,
    color: 'purple',
  },
] as const;

type RoleId = typeof ROLES[number]['id'];

const COLOR_MAP = {
  blue:   { bg: 'bg-blue-600',   light: 'bg-blue-50',   ring: 'ring-blue-500',   text: 'text-blue-600',   btn: 'bg-blue-600 hover:bg-blue-700',   badge: 'bg-blue-100 text-blue-700'   },
  rose:   { bg: 'bg-rose-600',   light: 'bg-rose-50',   ring: 'ring-rose-500',   text: 'text-rose-600',   btn: 'bg-rose-600 hover:bg-rose-700',   badge: 'bg-rose-100 text-rose-700'   },
  amber:  { bg: 'bg-amber-500',  light: 'bg-amber-50',  ring: 'ring-amber-500',  text: 'text-amber-600',  btn: 'bg-amber-500 hover:bg-amber-600',  badge: 'bg-amber-100 text-amber-700'  },
  purple: { bg: 'bg-purple-600', light: 'bg-purple-50', ring: 'ring-purple-500', text: 'text-purple-600', btn: 'bg-purple-600 hover:bg-purple-700', badge: 'bg-purple-100 text-purple-700' },
};

const FLOWS: Record<RoleId, {
  steps: { StepIcon: React.FC<{ className?: string }>; title: string; body: string }[];
  needs: string[];
  cta: { label: string; href: string };
}> = {
  transportista: {
    steps: [
      { StepIcon: IconPencil,   title: 'Llena el formulario',          body: 'Ingresa tu nombre, número de cédula, datos del vehículo (placa, marca, color) y los insumos que vas a entregar.' },
      { StepIcon: IconQr,       title: 'Recibe tu credencial QR',      body: 'Al completar el registro, se genera automáticamente un código QR único para ti. Guarda la pantalla o deja la página abierta.' },
      { StepIcon: IconShield,   title: 'Pasa el punto de control',     body: 'El operador escanea tu QR con su celular. El sistema muestra tu nombre, placa e información de la carga en segundos.' },
      { StepIcon: IconCheck,    title: 'Entrega completada',           body: 'Al llegar al destino, el coordinador marca tu entrega como completada. Queda un registro oficial de la operación.' },
    ],
    needs: ['Cédula de identidad (V-XXXXXXXX)', 'Placa del vehículo', 'Nombre del destinatario', 'Sector o dirección de destino', 'Tipo y cantidad de insumos (ej: 50 kg arroz)'],
    cta: { label: 'Registrarme como transportista', href: '/registrar' },
  },
  voluntario: {
    steps: [
      { StepIcon: IconPencil,   title: 'Regístrate en el sistema',    body: 'Completa el formulario con tu nombre, cédula, y describe los insumos que estás donando o la ayuda que prestas.' },
      { StepIcon: IconQr,       title: 'Obtén tu credencial digital', body: 'Tu QR se genera al instante. No necesitas imprimir nada: solo muestra la pantalla de tu celular al llegar al control.' },
      { StepIcon: IconShield,   title: 'Verifica en el control',      body: 'El operador escanea tu QR, confirma tu identidad y la naturaleza de la ayuda que llevas.' },
      { StepIcon: IconCheck,    title: 'Ayuda registrada',            body: 'Tu aporte queda registrado oficialmente en el sistema con fecha, hora y destino. Gracias por tu ayuda.' },
    ],
    needs: ['Cédula de identidad', 'Descripción de los insumos que aportas', 'Nombre del destinatario o sector', 'Tu rol: Voluntario o Donante'],
    cta: { label: 'Registrarme', href: '/registrar' },
  },
  familiar: {
    steps: [
      { StepIcon: IconPencil,   title: 'Ingresa tus datos',           body: 'Llena el formulario con tu información y describe los insumos que llevas (alimentos, agua, medicamentos, ropa, etc.).' },
      { StepIcon: IconQr,       title: 'Indica a quién ayudas',       body: 'Escribe el nombre de tu familiar y el sector a donde te diriges. Esto queda registrado para control oficial.' },
      { StepIcon: IconShield,   title: 'Muestra tu QR en el control', body: 'El operador escanea el código, verifica tu identidad y autoriza tu paso. Sin formularios en papel, sin filas largas.' },
      { StepIcon: IconCheck,    title: 'Llega con tu familiar',       body: 'Tu paso queda registrado. El coordinador puede confirmar que la ayuda llegó correctamente.' },
    ],
    needs: ['Cédula de identidad', 'Nombre del familiar que recibe la ayuda', 'Sector o dirección de destino', 'Lo que llevas (tipo y cantidad aproximada)'],
    cta: { label: 'Registrarme', href: '/registrar' },
  },
  coordinador: {
    steps: [
      { StepIcon: IconLock,     title: 'Inicia sesión',               body: 'Accede en /login con tu email y contraseña. Solo personal autorizado tiene credenciales. Contacta a tu SUPER_ADMIN si no tienes acceso.' },
      { StepIcon: IconChartBar, title: 'Revisa el panel principal',   body: 'Ve en tiempo real cuántos registros están pendientes, aprobados, en tránsito o completados. Las urgencias aparecen destacadas en rojo.' },
      { StepIcon: IconBell,     title: 'Aprueba o rechaza entregas',  body: 'Entra al detalle de cada registro, revisa los datos del transportista y la carga, y cambia el estado. Cada acción queda registrada con tu nombre.' },
      { StepIcon: IconShield,   title: 'Monitorea los escaneos',      body: 'Cada vez que se escanea un QR en campo, el sistema registra la hora y ubicación. Puedes ver el recorrido completo de cada entrega.' },
    ],
    needs: ['Email y contraseña (otorgados por SUPER_ADMIN)', 'Para crear nuevos coordinadores: ir a Admin → Usuarios', 'Credenciales de acceso: /login'],
    cta: { label: 'Ir al panel de administración', href: '/login' },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState<RoleId>('transportista');

  const role = ROLES.find(r => r.id === activeRole)!;
  const flow = FLOWS[activeRole];
  const c = COLOR_MAP[role.color];

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        <div className="max-w-5xl mx-auto px-5 py-14 md:py-20 flex flex-col md:flex-row md:items-center md:gap-12">
          <div className="text-white md:flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-xs font-medium">Sistema activo · La Guaira, Venezuela</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Coordina la ayuda.<br />
              <span className="text-blue-300">Sin papeles. Sin filas.</span>
            </h1>
            <p className="text-blue-100/80 mt-4 text-base md:text-lg leading-relaxed max-w-md">
              AidFlow digitaliza el registro y control de entrega de insumos humanitarios. Regístrate en 2 minutos y obtén tu credencial QR digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <Link href="/registrar"
                className="flex items-center justify-center gap-2 bg-white text-blue-900 font-bold px-6 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-lg">
                <IconPencil className="w-4 h-4" />
                Registrarme ahora
              </Link>
              <Link href="/escanear"
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-colors text-sm">
                <IconQr className="w-4 h-4" />
                Escanear credencial QR
              </Link>
            </div>
          </div>

          {/* Stats strip — desktop */}
          <div className="hidden md:grid grid-cols-2 gap-3 md:w-64 lg:w-72 mt-8 md:mt-0">
            {[
              { label: 'Sin instalar apps', desc: 'Funciona en cualquier navegador', Icon: IconPhone },
              { label: 'QR firmado digitalmente', desc: 'Cada credencial es única', Icon: IconLock },
              { label: 'Control en tiempo real', desc: 'Estado actualizado al instante', Icon: IconChartBar },
              { label: 'Historial completo', desc: 'Cada escaneo queda registrado', Icon: IconClipboard },
            ].map(f => (
              <div key={f.label} className="bg-white/10 border border-white/15 rounded-2xl p-4">
                <f.Icon className="w-5 h-5 text-blue-300 mb-2" />
                <p className="text-white text-xs font-semibold leading-snug">{f.label}</p>
                <p className="text-blue-200/60 text-xs mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WIZARD ─────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">

        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">¿Cómo funciona para ti?</h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Selecciona tu rol y te explicamos paso a paso qué debes hacer</p>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {ROLES.map(r => {
            const active = r.id === activeRole;
            const rc = COLOR_MAP[r.color];
            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`flex flex-col items-center text-center gap-2.5 py-5 px-3 rounded-2xl border-2 transition-all duration-200 ${
                  active
                    ? `${rc.light} border-current ${rc.text} shadow-md scale-[1.02]`
                    : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${active ? rc.bg : 'bg-gray-100'} transition-colors`}>
                  <r.Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div>
                  <p className={`font-bold text-sm ${active ? '' : 'text-gray-700'}`}>{r.label}</p>
                  <p className={`text-xs mt-0.5 ${active ? 'opacity-70' : 'text-gray-400'}`}>{r.sub}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Wizard panel */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-5">

            {/* Steps — left */}
            <div className="md:col-span-3 p-7 md:p-10">
              <div className={`inline-flex items-center gap-2 ${c.badge} rounded-full px-3 py-1 text-xs font-semibold mb-6`}>
                <role.Icon className="w-3.5 h-3.5" />
                {role.label}
              </div>

              <div className="space-y-0">
                {flow.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Number + connector */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} text-white flex items-center justify-center shrink-0 shadow-md`}>
                        <step.StepIcon className="w-5 h-5" />
                      </div>
                      {i < flow.steps.length - 1 && (
                        <div className={`w-0.5 flex-1 my-2 ${c.light} border-l-2 border-dashed border-gray-200`} style={{ minHeight: 28 }} />
                      )}
                    </div>
                    {/* Content */}
                    <div className={`pb-6 ${i === flow.steps.length - 1 ? 'pb-0' : ''} flex-1`}>
                      <div className={`text-xs font-bold uppercase tracking-widest ${c.text} mb-0.5`}>Paso {i + 1}</div>
                      <p className="font-bold text-gray-900 text-sm md:text-base">{step.title}</p>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div className="md:col-span-2 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col">

              {/* What you need */}
              <div className="p-7 md:p-8 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="font-bold text-gray-800 text-sm">Ten esto a mano</p>
                </div>
                <ul className="space-y-3">
                  {flow.needs.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <IconCheck className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-7 md:px-8 pb-7 md:pb-8">
                <Link
                  href={flow.cta.href}
                  className={`flex items-center justify-center gap-2 w-full ${c.btn} text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-md`}
                >
                  {flow.cta.label}
                  <IconArrow className="w-4 h-4" />
                </Link>
                <p className="text-gray-400 text-xs text-center mt-3">Sin registro previo · Gratis · En tu celular</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── FEATURES STRIP ─────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-14">
          <h3 className="text-center text-lg font-black text-gray-800 mb-8">Por qué AidFlow</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { Icon: IconPhone,    title: 'Sin instalar nada',           body: 'Desde cualquier celular con internet, directo en el navegador.' },
              { Icon: IconLock,     title: 'QR infalsificable',           body: 'Cada credencial está firmada digitalmente. No puede ser copiada ni alterada.' },
              { Icon: IconChartBar, title: 'Tiempo real',                 body: 'Los coordinadores ven el estado de cada entrega al instante.' },
              { Icon: IconClipboard,title: 'Trazabilidad total',          body: 'Cada escaneo y cambio de estado queda registrado con fecha, hora y responsable.' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                  <f.Icon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="font-bold text-gray-900 text-sm">{f.title}</p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRIORITY LEGEND ────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-gray-800 text-sm">Niveles de prioridad</p>
          <p className="text-gray-500 text-xs mt-0.5">El sistema prioriza las entregas más urgentes automáticamente</p>
        </div>
        <div className="flex gap-4">
          {[
            { color: 'bg-red-500', label: 'Urgente', sub: 'Atención inmediata' },
            { color: 'bg-amber-500', label: 'Alta', sub: 'Pronto' },
            { color: 'bg-gray-300', label: 'Normal', sub: 'Flujo estándar' },
          ].map(p => (
            <div key={p.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 ${p.color} rounded-full shrink-0`} />
              <div>
                <p className="text-gray-800 text-xs font-semibold">{p.label}</p>
                <p className="text-gray-400 text-xs">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 py-6 px-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <IconHeart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-800 text-sm">AidFlow La Guaira</span>
            <span className="text-gray-400 text-xs">· Ayuda humanitaria</span>
          </div>
          <Link href="/login" className="text-gray-400 text-xs hover:text-gray-600 transition-colors">
            Acceso para coordinadores →
          </Link>
        </div>
      </div>

    </div>
  );
}
