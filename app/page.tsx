'use client';

import Link from 'next/link';
import { useState } from 'react';

// ─── Illustrations ────────────────────────────────────────────────────────────

function IllustrationHero() {
  return (
    <svg viewBox="0 0 480 320" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mountains / La Guaira background */}
      <path d="M0 200 L70 100 L140 160 L200 80 L280 140 L350 70 L420 120 L480 90 L480 320 L0 320Z" fill="#1e3a8a" opacity="0.25"/>
      <path d="M0 240 L60 150 L130 200 L210 120 L290 180 L370 110 L440 160 L480 130 L480 320 L0 320Z" fill="#1e3a8a" opacity="0.18"/>

      {/* Road */}
      <rect x="0" y="260" width="480" height="60" rx="0" fill="#dbeafe" opacity="0.15"/>
      <line x1="0" y1="290" x2="480" y2="290" stroke="white" strokeWidth="2" strokeDasharray="30 20" opacity="0.25"/>

      {/* Truck */}
      <rect x="28" y="210" width="110" height="52" rx="8" fill="#2563eb"/>
      <rect x="118" y="198" width="58" height="64" rx="7" fill="#1d4ed8"/>
      <rect x="124" y="206" width="44" height="28" rx="5" fill="#bfdbfe" opacity="0.9"/>
      <circle cx="62" cy="268" r="16" fill="#1e3a8a"/>
      <circle cx="62" cy="268" r="9" fill="#93c5fd"/>
      <circle cx="124" cy="268" r="16" fill="#1e3a8a"/>
      <circle cx="124" cy="268" r="9" fill="#93c5fd"/>

      {/* Aid boxes on truck */}
      <rect x="34" y="186" width="30" height="26" rx="4" fill="#f59e0b"/>
      <rect x="68" y="186" width="30" height="26" rx="4" fill="#fbbf24"/>
      <rect x="102" y="186" width="30" height="26" rx="4" fill="#f59e0b"/>
      <line x1="49" y1="186" x2="49" y2="212" stroke="#d97706" strokeWidth="1.5"/>
      <line x1="34" y1="199" x2="64" y2="199" stroke="#d97706" strokeWidth="1.5"/>
      <line x1="83" y1="186" x2="83" y2="212" stroke="#d97706" strokeWidth="1.5"/>
      <line x1="68" y1="199" x2="98" y2="199" stroke="#d97706" strokeWidth="1.5"/>
      <line x1="117" y1="186" x2="117" y2="212" stroke="#d97706" strokeWidth="1.5"/>
      <line x1="102" y1="199" x2="132" y2="199" stroke="#d97706" strokeWidth="1.5"/>

      {/* Dotted path */}
      <path d="M180 255 Q290 245 370 255" stroke="white" strokeWidth="2.5" strokeDasharray="10 8" opacity="0.4"/>

      {/* Person giving — blue top */}
      <circle cx="210" cy="148" r="22" fill="#fde68a"/>
      {/* Face */}
      <circle cx="203" cy="145" r="3" fill="#92400e"/>
      <circle cx="217" cy="145" r="3" fill="#92400e"/>
      <path d="M205 155 Q210 159 215 155" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="196" y="170" width="28" height="40" rx="10" fill="#3b82f6"/>
      {/* Left arm */}
      <path d="M196 180 Q178 192 168 200" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round"/>
      {/* Right arm extended giving */}
      <path d="M224 180 Q250 188 268 194" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round"/>
      {/* Box being handed */}
      <rect x="258" y="186" width="32" height="28" rx="5" fill="#f59e0b"/>
      <line x1="274" y1="186" x2="274" y2="214" stroke="#d97706" strokeWidth="1.5"/>
      <line x1="258" y1="200" x2="290" y2="200" stroke="#d97706" strokeWidth="1.5"/>

      {/* Person receiving — green top */}
      <circle cx="350" cy="152" r="22" fill="#fde68a"/>
      {/* Face */}
      <circle cx="343" cy="149" r="3" fill="#92400e"/>
      <circle cx="357" cy="149" r="3" fill="#92400e"/>
      <path d="M345 159 Q350 163 355 159" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="336" y="174" width="28" height="40" rx="10" fill="#059669"/>
      {/* Left arm reaching */}
      <path d="M336 184 Q310 192 296 196" stroke="#059669" strokeWidth="10" strokeLinecap="round"/>
      {/* Right arm */}
      <path d="M364 184 Q380 194 388 202" stroke="#059669" strokeWidth="10" strokeLinecap="round"/>

      {/* QR card floating */}
      <rect x="384" y="130" width="74" height="74" rx="12" fill="white" opacity="0.95"/>
      <rect x="392" y="138" width="20" height="20" rx="3" fill="#1e40af"/>
      <rect x="394" y="140" width="16" height="16" rx="2" fill="white"/>
      <rect x="396" y="142" width="12" height="12" rx="1" fill="#1e40af"/>
      <rect x="416" y="138" width="20" height="20" rx="3" fill="#1e40af"/>
      <rect x="418" y="140" width="16" height="16" rx="2" fill="white"/>
      <rect x="420" y="142" width="12" height="12" rx="1" fill="#1e40af"/>
      <rect x="392" y="162" width="20" height="20" rx="3" fill="#1e40af"/>
      <rect x="394" y="164" width="16" height="16" rx="2" fill="white"/>
      <rect x="396" y="166" width="12" height="12" rx="1" fill="#1e40af"/>
      <rect x="416" y="162" width="8" height="8" fill="#1e40af"/>
      <rect x="428" y="162" width="8" height="8" fill="#1e40af"/>
      <rect x="416" y="174" width="8" height="8" fill="#1e40af"/>
      <rect x="428" y="174" width="8" height="8" fill="#1e40af"/>
      <rect x="422" y="168" width="6" height="6" fill="#1e40af"/>
      {/* Check badge */}
      <circle cx="448" cy="132" r="14" fill="#10b981"/>
      <path d="M441 132 L445 136 L455 124" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Hearts */}
      <path d="M295 110 C295 106 300 103 304 106.5 C308 103 313 106 313 110 C313 114 304 121 304 121 C304 121 295 114 295 110Z" fill="#f43f5e" opacity="0.8"/>
      <path d="M163 125 C163 122 167 119.5 170 122 C173 119.5 177 122 177 125 C177 128 170 133 170 133 C170 133 163 128 163 125Z" fill="#f43f5e" opacity="0.55"/>
      <path d="M390 96 C390 94 393 92 395.5 94 C398 92 401 94 401 96 C401 98 395.5 102 395.5 102 C395.5 102 390 98 390 96Z" fill="#fbbf24" opacity="0.7"/>

      {/* Checkpoint sign */}
      <rect x="155" y="220" width="36" height="50" rx="2" fill="#374151"/>
      <rect x="150" y="215" width="46" height="24" rx="6" fill="#ef4444"/>
      <text x="173" y="232" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">CONTROL</text>
      <rect x="173" y="230" width="1" height="40" fill="#374151"/>
    </svg>
  );
}

function IllustrationRegister() {
  return (
    <svg viewBox="0 0 120 100" className="w-full h-auto" fill="none">
      <rect x="20" y="10" width="80" height="80" rx="10" fill="#dbeafe"/>
      <rect x="32" y="24" width="56" height="6" rx="3" fill="#93c5fd"/>
      <rect x="32" y="36" width="42" height="6" rx="3" fill="#93c5fd"/>
      <rect x="32" y="48" width="50" height="6" rx="3" fill="#93c5fd"/>
      <rect x="32" y="60" width="36" height="6" rx="3" fill="#93c5fd"/>
      <circle cx="90" cy="78" r="18" fill="#2563eb"/>
      <path d="M82 78 L87 83 L98 72" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IllustrationQR() {
  return (
    <svg viewBox="0 0 120 100" className="w-full h-auto" fill="none">
      <rect x="20" y="10" width="80" height="80" rx="10" fill="#f0fdf4"/>
      <rect x="32" y="22" width="24" height="24" rx="4" fill="#16a34a"/>
      <rect x="35" y="25" width="18" height="18" rx="2" fill="#f0fdf4"/>
      <rect x="38" y="28" width="12" height="12" rx="1" fill="#16a34a"/>
      <rect x="64" y="22" width="24" height="24" rx="4" fill="#16a34a"/>
      <rect x="67" y="25" width="18" height="18" rx="2" fill="#f0fdf4"/>
      <rect x="70" y="28" width="12" height="12" rx="1" fill="#16a34a"/>
      <rect x="32" y="52" width="24" height="24" rx="4" fill="#16a34a"/>
      <rect x="35" y="55" width="18" height="18" rx="2" fill="#f0fdf4"/>
      <rect x="38" y="58" width="12" height="12" rx="1" fill="#16a34a"/>
      <rect x="64" y="52" width="10" height="10" fill="#16a34a"/>
      <rect x="78" y="52" width="10" height="10" fill="#16a34a"/>
      <rect x="64" y="66" width="10" height="10" fill="#16a34a"/>
      <rect x="78" y="66" width="10" height="10" fill="#16a34a"/>
      <rect x="71" y="59" width="7" height="7" fill="#16a34a"/>
      {/* Phone frame */}
      <rect x="74" y="5" width="38" height="62" rx="7" fill="white" stroke="#d1fae5" strokeWidth="1.5"/>
      <rect x="78" y="14" width="30" height="44" rx="3" fill="#f0fdf4"/>
      <circle cx="93" cy="64" r="3" fill="#d1fae5"/>
    </svg>
  );
}

function IllustrationCheckpoint() {
  return (
    <svg viewBox="0 0 120 100" className="w-full h-auto" fill="none">
      {/* Gate */}
      <rect x="10" y="30" width="10" height="60" rx="3" fill="#374151"/>
      <rect x="100" y="30" width="10" height="60" rx="3" fill="#374151"/>
      <rect x="10" y="30" width="100" height="16" rx="5" fill="#ef4444"/>
      <rect x="8" y="40" width="104" height="6" rx="3" fill="#fca5a5"/>
      {/* Barrier arm */}
      <rect x="10" y="38" width="70" height="7" rx="3" fill="#fbbf24"/>
      {/* Person with phone */}
      <circle cx="72" cy="55" r="10" fill="#fde68a"/>
      <rect x="64" y="65" width="16" height="22" rx="6" fill="#3b82f6"/>
      <rect x="80" y="52" width="14" height="20" rx="3" fill="white" stroke="#d1d5db" strokeWidth="1"/>
      <rect x="82" y="55" width="10" height="14" rx="1" fill="#dbeafe"/>
      {/* Scan lines */}
      <line x1="76" y1="58" x2="80" y2="58" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="76" y1="62" x2="80" y2="62" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="76" y1="66" x2="80" y2="66" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Check */}
      <circle cx="96" cy="42" r="10" fill="#10b981"/>
      <path d="M90 42 L94 46 L102 37" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IllustrationComplete() {
  return (
    <svg viewBox="0 0 120 100" className="w-full h-auto" fill="none">
      {/* Box */}
      <rect x="30" y="38" width="60" height="48" rx="6" fill="#fef3c7"/>
      <rect x="30" y="38" width="60" height="16" rx="6" fill="#fbbf24"/>
      {/* Ribbon */}
      <line x1="60" y1="38" x2="60" y2="86" stroke="#f59e0b" strokeWidth="2.5"/>
      <line x1="30" y1="54" x2="90" y2="54" stroke="#f59e0b" strokeWidth="2.5"/>
      {/* Bow */}
      <path d="M52 38 Q44 30 50 26 Q56 22 60 30" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M68 38 Q76 30 70 26 Q64 22 60 30" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Big check */}
      <circle cx="60" cy="17" r="15" fill="#10b981"/>
      <path d="M52 17 L57 22 L68 11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Hearts */}
      <path d="M14 48 C14 45 17 43 19.5 45 C22 43 25 45 25 48 C25 51 19.5 55 19.5 55 C19.5 55 14 51 14 48Z" fill="#f43f5e" opacity="0.6"/>
      <path d="M95 60 C95 57.5 98 56 100 58 C102 56 105 57.5 105 60 C105 62.5 100 66 100 66 C100 66 95 62.5 95 60Z" fill="#f43f5e" opacity="0.6"/>
    </svg>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconTruck = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
  </svg>
);
const IconHeart = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const IconUsers = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconClipboard = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);
const IconForm = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);
const IconQr = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);
const IconScan = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const IconDone = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const IconLogin = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
);
const IconDashboard = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const IconCheck = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);
const IconArrow = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

type RoleId = 'transportista' | 'voluntario' | 'familiar' | 'coordinador';

const ROLES: { id: RoleId; label: string; sub: string; Icon: React.FC<{ className?: string }>; accent: string }[] = [
  { id: 'transportista', label: 'Transportista',        sub: 'Llevas insumos en vehículo',     Icon: IconTruck,     accent: 'blue'   },
  { id: 'voluntario',   label: 'Voluntario / Donante', sub: 'Aportas ayuda directamente',      Icon: IconHeart,     accent: 'rose'   },
  { id: 'familiar',     label: 'Familiar',             sub: 'Llevas ayuda a alguien afectado', Icon: IconUsers,     accent: 'amber'  },
  { id: 'coordinador',  label: 'Coordinador',          sub: 'Gestionas y supervisas entregas', Icon: IconClipboard, accent: 'violet' },
];

const ACCENT: Record<string, { icon: string; tag: string; btn: string; stepBg: string; border: string }> = {
  blue:   { icon: 'bg-blue-600',   tag: 'bg-blue-100 text-blue-700',    btn: 'bg-blue-600 hover:bg-blue-700',   stepBg: 'bg-blue-600',   border: 'border-blue-200' },
  rose:   { icon: 'bg-rose-600',   tag: 'bg-rose-100 text-rose-700',    btn: 'bg-rose-600 hover:bg-rose-700',   stepBg: 'bg-rose-500',   border: 'border-rose-200' },
  amber:  { icon: 'bg-amber-500',  tag: 'bg-amber-100 text-amber-700',  btn: 'bg-amber-500 hover:bg-amber-600', stepBg: 'bg-amber-500',  border: 'border-amber-200'},
  violet: { icon: 'bg-violet-600', tag: 'bg-violet-100 text-violet-700',btn: 'bg-violet-600 hover:bg-violet-700',stepBg: 'bg-violet-600',border: 'border-violet-200'},
};

const FLOWS: Record<RoleId, {
  steps: { Icon: React.FC<{ className?: string }>; title: string; body: string }[];
  needs: string[];
  cta: { label: string; href: string };
}> = {
  transportista: {
    steps: [
      { Icon: IconForm,  title: 'Llena el formulario',     body: 'Ingresa tu nombre, cédula, datos del vehículo (placa, marca, color) y los insumos que transportas.' },
      { Icon: IconQr,    title: 'Guarda tu código QR',     body: 'Al terminar obtienes un QR único. Toma captura de pantalla o deja la página abierta en tu celular.' },
      { Icon: IconScan,  title: 'Pasa el punto de control',body: 'Muestras el QR. El operador lo escanea y verifica tu nombre, placa y la carga en segundos.' },
      { Icon: IconDone,  title: 'Entrega completada',      body: 'El coordinador marca la entrega. Queda registro oficial de toda la operación.' },
    ],
    needs: ['Cédula (formato V-12345678)', 'Placa del vehículo', 'Nombre de quien recibe', 'Sector o dirección de destino', 'Qué llevas y cuánto (ej: 20 kg arroz)'],
    cta: { label: 'Registrarme ahora', href: '/registrar' },
  },
  voluntario: {
    steps: [
      { Icon: IconForm, title: 'Regístrate',               body: 'Completa el formulario con tu nombre, cédula y los insumos que estás aportando. Sin cuenta ni contraseña.' },
      { Icon: IconQr,   title: 'Obtén tu QR',             body: 'Tu credencial digital se genera al instante. Solo muestra la pantalla de tu celular en el control.' },
      { Icon: IconScan, title: 'Pasa el control',          body: 'El operador escanea tu QR, confirma tu identidad y el tipo de ayuda que llevas.' },
      { Icon: IconDone, title: 'Tu aporte queda registrado', body: 'Tu contribución queda documentada con fecha, hora y destino. Gracias por tu ayuda.' },
    ],
    needs: ['Cédula de identidad', 'Descripción de lo que aportas', 'Nombre o sector del destinatario'],
    cta: { label: 'Registrarme ahora', href: '/registrar' },
  },
  familiar: {
    steps: [
      { Icon: IconForm, title: 'Ingresa tus datos',        body: 'Escribe tu nombre, cédula y lo que llevas: alimentos, agua, medicamentos, ropa.' },
      { Icon: IconQr,   title: 'Indica a quién ayudas',   body: 'Escribe el nombre de tu familiar y el lugar al que te diriges. Eso queda registrado.' },
      { Icon: IconScan, title: 'Muestra el QR',           body: 'En el control muestras el código de tu celular. El operador verifica y te deja pasar.' },
      { Icon: IconDone, title: 'Ayuda entregada',         body: 'El coordinador confirma que la ayuda llegó y queda registro oficial.' },
    ],
    needs: ['Cédula de identidad', 'Nombre del familiar', 'Sector o dirección de destino', 'Lo que llevas (tipo y cantidad)'],
    cta: { label: 'Registrarme ahora', href: '/registrar' },
  },
  coordinador: {
    steps: [
      { Icon: IconLogin,     title: 'Entra con tu usuario',   body: 'Ve a /login con tu email y contraseña. Si no tienes acceso, contacta a tu supervisor.' },
      { Icon: IconDashboard, title: 'Revisa el panel',        body: 'Ves en tiempo real cuántos registros hay pendientes, aprobados, en tránsito o completados.' },
      { Icon: IconScan,      title: 'Gestiona las entregas',  body: 'Entra a cada registro, revisa los datos y cambia el estado. Cada acción queda registrada.' },
      { Icon: IconDone,      title: 'Monitorea el campo',     body: 'Cada escaneo de QR queda registrado con hora y lugar. Ves el recorrido de cada entrega.' },
    ],
    needs: ['Email y contraseña (los otorga el supervisor)', 'Para pedir acceso: habla con tu coordinador principal'],
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
      <header className="bg-blue-800 text-white px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <IconHeart className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base">AidFlow</span>
            <span className="text-blue-300 text-xs hidden sm:inline">· La Guaira · Ayuda Humanitaria</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-blue-200 text-xs">Sistema activo</span>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="max-w-5xl mx-auto px-5 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-full px-3 py-1 mb-5">
              <IconHeart className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-amber-200 text-xs font-semibold">Proyecto de ayuda solidaria</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Muévete con tu ayuda.<br />
              <span className="text-blue-300">Rápido, sin papeles.</span>
            </h1>
            <p className="text-blue-100/80 mt-4 text-base leading-relaxed">
              Regístrate en 2 minutos, obtén un código QR y pasa los puntos de control sin complicaciones. Todo desde tu celular.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <Link href="/registrar"
                className="flex items-center justify-center gap-2 bg-white text-blue-900 font-bold px-6 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-lg">
                <IconForm className="w-4 h-4" />
                Quiero registrarme
              </Link>
              <Link href="/escanear"
                className="flex items-center justify-center gap-2 bg-blue-600/60 border border-blue-400/40 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-blue-600/80 transition-colors text-sm">
                <IconQr className="w-4 h-4" />
                Soy operador de control
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <IllustrationHero />
          </div>
        </div>
      </div>

      {/* ── PROCESO VISUAL ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">¿Cómo funciona en 4 pasos?</h2>
          <p className="text-gray-500 mt-2 text-sm">Para cualquier persona que quiera pasar con ayuda humanitaria</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { Illus: IllustrationRegister, label: 'Paso 1', title: 'Te registras',      body: 'Llenas el formulario con tus datos e información de lo que llevas',        bg: 'bg-blue-50',   border: 'border-blue-100'  },
            { Illus: IllustrationQR,       label: 'Paso 2', title: 'Obtienes tu QR',    body: 'Al instante recibes un código QR único. Guárdalo en tu celular',            bg: 'bg-green-50',  border: 'border-green-100' },
            { Illus: IllustrationCheckpoint, label: 'Paso 3', title: 'Pasas el control', body: 'El operador escanea tu QR y verifica tu identidad. Sin papeles',           bg: 'bg-orange-50', border: 'border-orange-100'},
            { Illus: IllustrationComplete, label: 'Paso 4', title: 'Entrega lista',     body: 'El coordinador marca la entrega como completada. Queda el registro oficial', bg: 'bg-amber-50',  border: 'border-amber-100' },
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className={`${step.bg} border ${step.border} rounded-2xl p-4 flex flex-col items-center text-center h-full`}>
                <div className="w-full max-w-[100px] mx-auto mb-3">
                  <step.Illus />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{step.label}</span>
                <p className="font-bold text-gray-900 text-sm mt-1">{step.title}</p>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{step.body}</p>
              </div>
              {/* Arrow connector */}
              {i < 3 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm">
                  <IconArrow className="w-3 h-3 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── WIZARD POR ROL ─────────────────────────────────────────────────── */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">Guía según tu caso</h2>
            <p className="text-gray-500 mt-2 text-sm">Selecciona quién eres para ver exactamente qué tienes que hacer</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {ROLES.map(r => {
              const isActive = r.id === active;
              const ra = ACCENT[r.accent];
              return (
                <button key={r.id} onClick={() => setActive(r.id)}
                  className={`flex flex-col items-center text-center gap-2 py-4 px-3 rounded-xl border-2 transition-all duration-150 ${
                    isActive ? `${ra.border} bg-white shadow-md` : 'border-gray-200 bg-gray-50 hover:bg-white'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isActive ? ra.icon : 'bg-gray-200'}`}>
                    <r.Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800 leading-tight">{r.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">{r.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6 md:p-8">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-5 ${a.tag}`}>{role.label}</span>
                {flow.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-xl ${a.stepBg} text-white flex items-center justify-center shrink-0`}>
                        <step.Icon className="w-4 h-4" />
                      </div>
                      {i < flow.steps.length - 1 && <div className="w-px bg-gray-300 flex-1 my-1.5" style={{ minHeight: 20 }} />}
                    </div>
                    <div className={`${i < flow.steps.length - 1 ? 'pb-5' : ''} flex-1`}>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Paso {i + 1}</p>
                      <p className="font-bold text-gray-900 text-sm">{step.title}</p>
                      <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:w-72 border-t md:border-t-0 md:border-l border-gray-200 bg-white flex flex-col p-6 md:p-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="font-bold text-gray-800 text-sm">Ten esto a mano</p>
                  </div>
                  <ul className="space-y-3">
                    {flow.needs.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                          <IconCheck className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-600 text-sm leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Link href={flow.cta.href}
                    className={`flex items-center justify-center gap-2 w-full ${a.btn} text-white font-bold py-3 rounded-xl text-sm transition-colors`}>
                    {flow.cta.label}
                    <IconArrow className="w-4 h-4" />
                  </Link>
                  <p className="text-gray-400 text-xs text-center mt-2">Gratuito · Sin registro previo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PREGUNTAS FRECUENTES ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Preguntas frecuentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { q: '¿Necesito instalar alguna aplicación?',    a: 'No. Funciona desde el navegador de tu celular (Chrome, Safari, etc.). Solo necesitas internet.' },
            { q: '¿Qué hago si perdí mi código QR?',         a: 'Guarda la URL de tu credencial al registrarte. También puedes pedirle al coordinador que busque tu registro por nombre o cédula.' },
            { q: '¿Cuánto tarda el registro?',               a: 'Aproximadamente 2 a 3 minutos. Al finalizar obtienes el QR de inmediato, sin aprobación previa.' },
            { q: '¿Cómo sé que mi entrega fue registrada?',  a: 'El coordinador cambia el estado de tu registro a "Completado". Puedes ver el estado en la URL de tu credencial.' },
            { q: '¿Para qué sirve el código QR?',            a: 'Es tu credencial digital. El operador en el punto de control lo escanea para verificar quién eres y qué llevas, sin papeles.' },
            { q: '¿Qué pasa si no tengo internet en el control?', a: 'Toma captura de pantalla de tu QR antes de salir. El operador puede escanearlo desde la imagen aunque no tengas señal.' },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="font-bold text-gray-900 text-sm">{q}</p>
              <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white px-5 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center">
              <IconHeart className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-black text-gray-800 text-sm">AidFlow La Guaira</span>
              <span className="text-gray-400 text-xs ml-2">· Sistema solidario de ayuda humanitaria</span>
            </div>
          </div>
          <Link href="/login" className="text-gray-400 text-xs hover:text-gray-600 transition-colors">
            Acceso para coordinadores →
          </Link>
        </div>
      </footer>

    </div>
  );
}
