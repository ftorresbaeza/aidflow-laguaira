'use client';

import Link from 'next/link';
import { useState } from 'react';

const ROLES = [
  { id: 'transportista', label: 'Transportista', emoji: '🚛' },
  { id: 'voluntario', label: 'Voluntario / Donante', emoji: '🤝' },
  { id: 'familiar', label: 'Familiar', emoji: '👨‍👩‍👧' },
  { id: 'coordinador', label: 'Coordinador', emoji: '📋' },
] as const;

type RoleId = typeof ROLES[number]['id'];

const FLOWS: Record<RoleId, { steps: { icon: string; title: string; body: string }[]; needs: string[]; cta: { label: string; href: string; color: string } }> = {
  transportista: {
    steps: [
      { icon: '📝', title: 'Completa el formulario', body: 'Ingresa tu nombre, cédula, datos del vehículo (placa, marca, color) y los insumos que transportas al sector de destino.' },
      { icon: '📲', title: 'Guarda tu QR', body: 'Recibirás una credencial digital con código QR. Toma captura de pantalla o deja la URL abierta en tu celular.' },
      { icon: '🛑', title: 'Pasa por el punto de control', body: 'El operador escanea tu QR, verifica tu placa e identidad, y registra tu paso al sistema.' },
      { icon: '✅', title: 'Completa la entrega', body: 'Al llegar al destino, el coordinador marca tu registro como COMPLETADO. Misión cumplida.' },
    ],
    needs: ['Cédula de identidad (V-XXXXXXXX)', 'Placa del vehículo', 'Nombre del destinatario', 'Sector o dirección de entrega', 'Tipo y cantidad de insumos'],
    cta: { label: 'Registrarme como transportista', href: '/registrar', color: 'bg-blue-600 hover:bg-blue-700' },
  },
  voluntario: {
    steps: [
      { icon: '📝', title: 'Regístrate en el sistema', body: 'Llena el formulario con tu nombre, cédula, y los insumos o ayuda que estás aportando.' },
      { icon: '📲', title: 'Obtén tu credencial QR', body: 'Tu credencial digital queda disponible de inmediato. No necesitas imprimir nada: solo tener acceso a la URL.' },
      { icon: '🔍', title: 'Verifica en el control', body: 'El operador escanea tu QR para confirmar tu identidad y el tipo de ayuda que llevas.' },
      { icon: '🎯', title: 'Entrega los insumos', body: 'El coordinador registra la entrega exitosa y queda un historial completo en el sistema.' },
    ],
    needs: ['Cédula de identidad', 'Descripción de los insumos que aportas', 'Nombre del destinatario o sector', 'Tu rol: Voluntario o Donante'],
    cta: { label: 'Registrarme', href: '/registrar', color: 'bg-green-600 hover:bg-green-700' },
  },
  familiar: {
    steps: [
      { icon: '📝', title: 'Ingresa tus datos', body: 'Completa el formulario con tu información y la de los insumos que llevas a tu familiar afectado.' },
      { icon: '📍', title: 'Indica el destino', body: 'Especifica el sector y el nombre del familiar que recibirá la ayuda. Esto queda registrado.' },
      { icon: '📲', title: 'Presenta tu QR en el control', body: 'El operador verifica tu identidad y autoriza el paso. No necesitas nada físico, solo el QR en tu celular.' },
      { icon: '💛', title: 'Llega a tu destino', body: 'Con el registro activo, el coordinador puede rastrear que la ayuda llegó correctamente.' },
    ],
    needs: ['Cédula de identidad', 'Nombre del familiar que recibe la ayuda', 'Sector o dirección de destino', 'Descripción de lo que llevas (alimentos, agua, medicamentos, etc.)'],
    cta: { label: 'Registrarme', href: '/registrar', color: 'bg-amber-600 hover:bg-amber-700' },
  },
  coordinador: {
    steps: [
      { icon: '🔑', title: 'Inicia sesión', body: 'Accede con tu email y contraseña al panel de administración en /login. Solo personal autorizado.' },
      { icon: '📊', title: 'Revisa el dashboard', body: 'Ve en tiempo real cuántos registros están pendientes, aprobados, en tránsito y completados. Las urgencias aparecen destacadas.' },
      { icon: '✔️', title: 'Aprueba o rechaza entregas', body: 'Entra al detalle de cada registro, revisa los datos y cambia el estado según corresponda. Queda un historial de cada acción.' },
      { icon: '📡', title: 'Monitorea puntos de control', body: 'Los escaneos en campo se registran automáticamente. Puedes ver desde dónde y cuándo se escaneó cada QR.' },
    ],
    needs: ['Email y contraseña (solo personal autorizado)', 'Si no tienes acceso, contacta a un SUPER_ADMIN para crear tu usuario'],
    cta: { label: 'Ir al panel de administración', href: '/login', color: 'bg-purple-600 hover:bg-purple-700' },
  },
};

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState<RoleId>('transportista');
  const flow = FLOWS[activeRole];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">

      {/* Hero */}
      <div className="px-5 pt-10 pb-6 text-center text-white">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 rounded-2xl mb-4 border border-white/20">
          <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black tracking-tight">AidFlow</h1>
        <p className="text-blue-300 font-semibold mt-0.5">La Guaira · Ayuda Humanitaria</p>
        <p className="text-blue-100/70 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
          Plataforma de registro y control de entrega de insumos para la emergencia
        </p>
      </div>

      {/* Role picker */}
      <div className="max-w-lg mx-auto px-4 pb-4">
        <p className="text-white/60 text-xs text-center mb-3 uppercase tracking-wider font-semibold">¿Quién eres?</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ROLES.map(r => (
            <button
              key={r.id}
              onClick={() => setActiveRole(r.id)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeRole === r.id
                  ? 'bg-white text-blue-900 shadow-lg scale-[1.03]'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <span className="text-xl">{r.emoji}</span>
              <span className="text-center leading-tight">{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Flow wizard */}
      <div className="max-w-lg mx-auto px-4 pb-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Steps */}
          <div className="p-5 space-y-4">
            <h2 className="font-bold text-gray-900 text-base">¿Cómo funciona para ti?</h2>
            {flow.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-lg shrink-0">
                    {step.icon}
                  </div>
                  {i < flow.steps.length - 1 && (
                    <div className="w-px flex-1 bg-blue-100 mt-2 mb-0" style={{ minHeight: '16px' }} />
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-blue-400 uppercase tracking-wider">Paso {i + 1}</span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What you need */}
          <div className="bg-amber-50 border-t border-amber-100 px-5 py-4">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">Qué necesitas tener a mano</p>
            <ul className="space-y-1">
              {flow.needs.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-amber-900">
                  <span className="mt-0.5 text-amber-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="px-5 py-4">
            <Link
              href={flow.cta.href}
              className={`block w-full text-center text-white font-bold py-3 rounded-xl transition-colors text-sm ${flow.cta.color}`}
            >
              {flow.cta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Divider info cards */}
      <div className="max-w-lg mx-auto px-4 pb-4 grid grid-cols-2 gap-3">
        <div className="bg-white/10 border border-white/15 rounded-xl p-4">
          <p className="text-2xl mb-1">📱</p>
          <p className="text-white font-semibold text-sm">Sin instalar nada</p>
          <p className="text-blue-200/70 text-xs mt-1 leading-snug">Funciona directo en tu navegador, desde cualquier celular</p>
        </div>
        <div className="bg-white/10 border border-white/15 rounded-xl p-4">
          <p className="text-2xl mb-1">🔒</p>
          <p className="text-white font-semibold text-sm">QR firmado digitalmente</p>
          <p className="text-blue-200/70 text-xs mt-1 leading-snug">Cada credencial es única e infalsificable</p>
        </div>
        <div className="bg-white/10 border border-white/15 rounded-xl p-4">
          <p className="text-2xl mb-1">⚡</p>
          <p className="text-white font-semibold text-sm">Control en tiempo real</p>
          <p className="text-blue-200/70 text-xs mt-1 leading-snug">Los administradores ven el estado de cada entrega al instante</p>
        </div>
        <div className="bg-white/10 border border-white/15 rounded-xl p-4">
          <p className="text-2xl mb-1">🗂️</p>
          <p className="text-white font-semibold text-sm">Historial completo</p>
          <p className="text-blue-200/70 text-xs mt-1 leading-snug">Cada escaneo y cambio de estado queda registrado con fecha y hora</p>
        </div>
      </div>

      {/* Priority legend */}
      <div className="max-w-lg mx-auto px-4 pb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between gap-2">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider shrink-0">Prioridad</p>
          <div className="flex gap-3">
            {[{ color: 'bg-red-500', label: 'Urgente' }, { color: 'bg-amber-500', label: 'Alta' }, { color: 'bg-gray-300', label: 'Normal' }].map(p => (
              <div key={p.label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 ${p.color} rounded-full`} />
                <span className="text-white/70 text-xs">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin link */}
      <div className="pb-10 text-center">
        <Link href="/login" className="text-blue-400/50 text-xs hover:text-blue-300 transition-colors">
          Acceso para coordinadores →
        </Link>
      </div>
    </div>
  );
}
