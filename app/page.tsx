'use client';

import Link from 'next/link';
import { useState } from 'react';

// ─── Illustrations ─────────────────────────────────────────────────────────────

function IllustrationHero() {
  return (
    <svg viewBox="0 0 500 300" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020617"/>
          <stop offset="55%" stopColor="#1e3a8a"/>
          <stop offset="100%" stopColor="#1e40af"/>
        </linearGradient>
        <linearGradient id="hTruck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#1d4ed8"/>
        </linearGradient>
        <linearGradient id="hCab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#1e40af"/>
        </linearGradient>
        <linearGradient id="hGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85"/>
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="500" height="300" fill="url(#hSky)"/>

      {/* Stars */}
      {[[25,18],[72,8],[140,22],[205,6],[288,16],[355,10],[438,20],[478,5],[60,35],[320,28]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i%3===0?1.8:1.2} fill="white" opacity={i%2===0?0.7:0.45}/>
      ))}

      {/* Mountains far */}
      <path d="M0 230 L45 145 L88 178 L128 112 L185 158 L238 92 L292 138 L345 76 L398 122 L445 88 L500 110 L500 300 L0 300Z"
        fill="#1e3a8a" opacity="0.55"/>
      {/* Mountains mid */}
      <path d="M0 258 L38 192 L78 218 L136 164 L196 204 L258 148 L318 192 L378 152 L438 188 L500 160 L500 300 L0 300Z"
        fill="#1e40af" opacity="0.38"/>
      {/* Mountains near */}
      <path d="M0 278 L32 248 L68 264 L118 232 L168 258 L228 222 L282 252 L342 220 L402 248 L462 228 L500 240 L500 300 L0 300Z"
        fill="#1e3a8a" opacity="0.32"/>

      {/* Ground */}
      <rect x="0" y="270" width="500" height="30" fill="url(#hGround)"/>
      <line x1="0" y1="285" x2="500" y2="285" stroke="white" strokeWidth="2" strokeDasharray="26 18" opacity="0.18"/>

      {/* ── TRUCK ── */}
      <ellipse cx="96" cy="280" rx="88" ry="8" fill="black" opacity="0.18"/>
      {/* Cargo container */}
      <rect x="14" y="198" width="112" height="72" rx="6" fill="url(#hTruck)"/>
      <line x1="14" y1="234" x2="126" y2="234" stroke="#1d4ed8" strokeWidth="1.5" opacity="0.55"/>
      <line x1="70" y1="198" x2="70" y2="270" stroke="#1d4ed8" strokeWidth="1.5" opacity="0.55"/>
      {/* Cab */}
      <rect x="118" y="186" width="66" height="84" rx="8" fill="url(#hCab)"/>
      {/* Windshield */}
      <rect x="124" y="194" width="52" height="36" rx="6" fill="#bfdbfe" opacity="0.88"/>
      {/* Cab lower door */}
      <rect x="124" y="234" width="52" height="36" rx="4" fill="#1e40af" opacity="0.25"/>
      <line x1="150" y1="234" x2="150" y2="270" stroke="#1d4ed8" strokeWidth="1.5" opacity="0.5"/>
      <rect x="140" y="250" width="10" height="4" rx="2" fill="#93c5fd" opacity="0.6"/>
      {/* Headlight */}
      <rect x="178" y="228" width="8" height="14" rx="3" fill="#fef9c3"/>
      {/* Mirror */}
      <rect x="182" y="196" width="8" height="10" rx="2" fill="#60a5fa"/>
      {/* Exhaust */}
      <rect x="12" y="192" width="5" height="20" rx="2" fill="#475569"/>
      <ellipse cx="14" cy="188" rx="4" ry="3" fill="#94a3b8" opacity="0.3"/>
      <ellipse cx="13" cy="181" rx="3" ry="2.5" fill="#94a3b8" opacity="0.18"/>
      {/* Wheels */}
      {[52, 118, 160].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy={274} r="20" fill="#0f172a"/>
          <circle cx={cx} cy={274} r="13" fill="#1e293b"/>
          <circle cx={cx} cy={274} r="7" fill="#334155"/>
          <circle cx={cx} cy={274} r="3" fill="#64748b"/>
        </g>
      ))}

      {/* Aid boxes on truck roof */}
      {[16, 50, 84].map((x,i) => (
        <g key={x}>
          <rect x={x} y={164} width={32} height={36} rx="4" fill={i===1?'#fbbf24':'#f59e0b'}/>
          <line x1={x+16} y1={164} x2={x+16} y2={200} stroke="#d97706" strokeWidth="1.5"/>
          <line x1={x} y1={182} x2={x+32} y2={182} stroke="#d97706" strokeWidth="1.5"/>
          <rect x={x+11} y={167} width={10} height={20} rx="2" fill="white" opacity="0.22"/>
          <rect x={x+7} y={171} width={18} height={10} rx="2" fill="white" opacity="0.22"/>
        </g>
      ))}

      {/* ── DOTTED PATH ── */}
      <path d="M188 268 Q300 258 398 266" stroke="white" strokeWidth="2" strokeDasharray="6 8" opacity="0.28"/>

      {/* ── PERSON 1 — blue, giving ── */}
      <g transform="translate(238,0)">
        <ellipse cx="0" cy="274" rx="22" ry="6" fill="black" opacity="0.16"/>
        {/* Legs / pants */}
        <rect x="-13" y="248" width="11" height="24" rx="5.5" fill="#1e40af"/>
        <rect x="2" y="248" width="11" height="24" rx="5.5" fill="#1e3a8a"/>
        {/* Torso */}
        <rect x="-18" y="206" width="36" height="44" rx="12" fill="#3b82f6"/>
        {/* Left arm — resting */}
        <path d="M-18 216 Q-32 228 -30 244" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round"/>
        {/* Right arm — extended giving */}
        <path d="M18 216 Q38 222 50 232" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round"/>
        {/* Head */}
        <circle cx="0" cy="194" r="20" fill="#fde68a"/>
        {/* Hair */}
        <path d="M-18 188 Q-13 172 0 170 Q13 172 18 188" fill="#92400e" opacity="0.82"/>
        {/* Eyes */}
        <circle cx="-6.5" cy="192" r="2.5" fill="#78350f"/>
        <circle cx="6.5" cy="192" r="2.5" fill="#78350f"/>
        {/* Smile */}
        <path d="M-5 200 Q0 205 5 200" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>

      {/* Box being handed */}
      <rect x="280" y="226" width="30" height="26" rx="5" fill="#f59e0b"/>
      <line x1="295" y1="226" x2="295" y2="252" stroke="#d97706" strokeWidth="1.5"/>
      <line x1="280" y1="239" x2="310" y2="239" stroke="#d97706" strokeWidth="1.5"/>
      <rect x="289" y="229" width="12} height={20} rx={2}" fill="white" opacity="0.2"/>

      {/* ── PERSON 2 — green, receiving ── */}
      <g transform="translate(360,0)">
        <ellipse cx="0" cy="274" rx="22" ry="6" fill="black" opacity="0.16"/>
        {/* Legs */}
        <rect x="-13" y="248" width="11" height="24" rx="5.5" fill="#065f46"/>
        <rect x="2" y="248" width="11" height="24" rx="5.5" fill="#047857"/>
        {/* Torso */}
        <rect x="-18" y="206" width="36" height="44" rx="12" fill="#10b981"/>
        {/* Left arm — reaching for box */}
        <path d="M-18 216 Q-40 224 -52 232" stroke="#10b981" strokeWidth="12" strokeLinecap="round"/>
        {/* Right arm — open */}
        <path d="M18 216 Q30 228 28 244" stroke="#10b981" strokeWidth="12" strokeLinecap="round"/>
        {/* Head */}
        <circle cx="0" cy="194" r="20" fill="#fde68a"/>
        {/* Hair (different style) */}
        <path d="M-18 192 Q-16 172 0 170 Q16 172 18 192" fill="#1c1917" opacity="0.7"/>
        <circle cx="-11" cy="179" r="5" fill="#1c1917" opacity="0.55"/>
        <circle cx="11" cy="179" r="5" fill="#1c1917" opacity="0.55"/>
        {/* Eyes */}
        <circle cx="-6.5" cy="192" r="2.5" fill="#1c1917"/>
        <circle cx="6.5" cy="192" r="2.5" fill="#1c1917"/>
        {/* Smile */}
        <path d="M-6 201 Q0 206 6 201" stroke="#1c1917" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>

      {/* ── QR PHONE ── */}
      <ellipse cx="453" cy="292" rx="26" ry="6" fill="black" opacity="0.14"/>
      {/* Phone body */}
      <rect x="426" y="148" width="54" height="100" rx="10" fill="white" opacity="0.97"/>
      {/* Screen */}
      <rect x="432" y="156" width="42" height="78" rx="5" fill="#f8fafc"/>
      {/* QR finder squares */}
      <rect x="436" y="160" width="14" height="14" rx="2" fill="#1e40af"/>
      <rect x="438" y="162" width="10" height="10" rx="1" fill="white"/>
      <rect x="440" y="164" width="6" height="6" fill="#1e40af"/>
      <rect x="454" y="160" width="14" height="14" rx="2" fill="#1e40af"/>
      <rect x="456" y="162" width="10" height="10" rx="1" fill="white"/>
      <rect x="458" y="164" width="6" height="6" fill="#1e40af"/>
      <rect x="436" y="178" width="14" height="14" rx="2" fill="#1e40af"/>
      <rect x="438" y="180" width="10" height="10" rx="1" fill="white"/>
      <rect x="440" y="182" width="6" height="6" fill="#1e40af"/>
      {/* QR data dots */}
      {[[454,178],[458,178],[462,178],[466,178],[454,182],[460,182],[466,182],[454,186],[456,186],[462,186],[466,186],[454,190],[460,190],[464,190]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="3.5" height="3.5" fill="#1e40af"/>
      ))}
      {/* Name strip */}
      <rect x="434" y="198" width="38" height="5" rx="2.5" fill="#dbeafe"/>
      <rect x="434" y="207" width="28" height="4" rx="2" fill="#e2e8f0"/>
      {/* Status badge */}
      <rect x="434" y="215" width="38" height="10" rx="5" fill="#d1fae5"/>
      <circle cx="442" cy="220" r="3.5" fill="#10b981"/>
      <path d="M440 220 L441.5 221.5 L445 218" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Home bar */}
      <rect x="441" y="240" width="20" height="3" rx="1.5" fill="#e2e8f0"/>
      {/* Check badge on phone */}
      <circle cx="476" cy="150" r="13" fill="#10b981"/>
      <path d="M469 150 L474 155 L483 144" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* ── HEARTS ── */}
      <path d="M318 166 C318 162 323 158.5 327 162 C331 158.5 336 162 336 166 C336 170 327 177 327 177 C327 177 318 170 318 166Z" fill="#f43f5e" opacity="0.9"/>
      <path d="M196 152 C196 149.5 199 147 201.5 149.5 C204 147 207 149.5 207 152 C207 154.5 201.5 158 201.5 158 C201.5 158 196 154.5 196 152Z" fill="#f43f5e" opacity="0.6"/>
      <path d="M406 122 C406 120 408.5 118 410.5 120 C412.5 118 415 120 415 122 C415 124 410.5 127 410.5 127 C410.5 127 406 124 406 122Z" fill="#fbbf24" opacity="0.8"/>
      <path d="M393 192 C393 190.5 395 189 396.5 190.5 C398 189 400 190.5 400 192 C400 193.5 396.5 196 396.5 196 C396.5 196 393 193.5 393 192Z" fill="#f43f5e" opacity="0.5"/>
      <path d="M175 224 C175 222.5 177 221 178.5 222.5 C180 221 182 222.5 182 224 C182 225.5 178.5 228 178.5 228 C178.5 228 175 225.5 175 224Z" fill="#fbbf24" opacity="0.45"/>
    </svg>
  );
}

function IllustrationRegister() {
  return (
    <svg viewBox="0 0 140 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dbeafe"/>
          <stop offset="100%" stopColor="#bfdbfe"/>
        </linearGradient>
      </defs>
      {/* Background card */}
      <rect x="8" y="8" width="124" height="104" rx="14" fill="url(#rBg)"/>
      {/* Phone body */}
      <rect x="38" y="16" width="64" height="96" rx="10" fill="white" filter="url(#shadow)"/>
      <rect x="38" y="16" width="64" height="96" rx="10" fill="white"/>
      {/* Slight shadow */}
      <rect x="40" y="18" width="60" height="92" rx="8" fill="#f8fafc"/>
      {/* Camera notch */}
      <rect x="58" y="20" width="24" height="5" rx="2.5" fill="#e2e8f0"/>
      {/* Form fields */}
      <rect x="46" y="32" width="46" height="5" rx="2.5" fill="#bfdbfe"/>
      <rect x="46" y="32" width="20" height="5" rx="2.5" fill="#93c5fd"/>
      <rect x="46" y="41" width="48" height="8" rx="4" fill="white" stroke="#dbeafe" strokeWidth="1.5"/>
      <rect x="49" y="44" width="24" height="2.5" rx="1.25" fill="#94a3b8"/>

      <rect x="46" y="55" width="30" height="5" rx="2.5" fill="#bfdbfe"/>
      <rect x="46" y="55" width="14" height="5" rx="2.5" fill="#93c5fd"/>
      <rect x="46" y="64" width="48" height="8" rx="4" fill="white" stroke="#dbeafe" strokeWidth="1.5"/>
      <rect x="49" y="67" width="18" height="2.5" rx="1.25" fill="#94a3b8"/>

      <rect x="46" y="78" width="36" height="5" rx="2.5" fill="#bfdbfe"/>
      <rect x="46" y="78" width="18" height="5" rx="2.5" fill="#93c5fd"/>
      <rect x="46" y="87" width="48" height="8" rx="4" fill="#2563eb"/>
      <rect x="60" y="89.5" width="20" height="3" rx="1.5" fill="white" opacity="0.9"/>
      {/* Home bar */}
      <rect x="57" y="104" width="26" height="3" rx="1.5" fill="#e2e8f0"/>
      {/* Floating check badge */}
      <circle cx="96" cy="24" r="13" fill="#10b981"/>
      <path d="M89.5 24 L94 28.5 L102.5 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Stars */}
      <circle cx="24" cy="30" r="3" fill="#60a5fa" opacity="0.5"/>
      <circle cx="18" cy="70" r="2" fill="#93c5fd" opacity="0.4"/>
      <circle cx="122" cy="90" r="2.5" fill="#60a5fa" opacity="0.4"/>
    </svg>
  );
}

function IllustrationQR() {
  return (
    <svg viewBox="0 0 140 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="qBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dcfce7"/>
          <stop offset="100%" stopColor="#bbf7d0"/>
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="124" height="104" rx="14" fill="url(#qBg)"/>
      {/* Phone */}
      <rect x="36" y="14" width="68" height="96" rx="11" fill="white"/>
      <rect x="39" y="17" width="62" height="90" rx="8" fill="#f0fdf4"/>
      {/* Camera */}
      <rect x="57" y="19" width="26" height="5" rx="2.5" fill="#d1fae5"/>
      {/* QR code area */}
      <rect x="44" y="28" width="52" height="52" rx="4" fill="white"/>
      {/* Corner finders */}
      <rect x="47" y="31" width="14" height="14" rx="2" fill="#16a34a"/>
      <rect x="49" y="33" width="10" height="10" rx="1" fill="#f0fdf4"/>
      <rect x="51" y="35" width="6" height="6" fill="#16a34a"/>
      <rect x="79" y="31" width="14" height="14" rx="2" fill="#16a34a"/>
      <rect x="81" y="33" width="10" height="10" rx="1" fill="#f0fdf4"/>
      <rect x="83" y="35" width="6" height="6" fill="#16a34a"/>
      <rect x="47" y="59" width="14" height="14" rx="2" fill="#16a34a"/>
      <rect x="49" y="61" width="10" height="10" rx="1" fill="#f0fdf4"/>
      <rect x="51" y="63" width="6" height="6" fill="#16a34a"/>
      {/* Data modules */}
      {[[79,59],[83,59],[87,59],[79,63],[85,63],[79,67],[83,67],[87,67],[79,71],[85,71],[87,71]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="3.5" height="3.5" fill="#16a34a"/>
      ))}
      {/* Scan guide corners */}
      <path d="M44 28 L44 34 M44 28 L50 28" stroke="#15803d" strokeWidth="2" strokeLinecap="round"/>
      <path d="M96 28 L96 34 M96 28 L90 28" stroke="#15803d" strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 80 L44 74 M44 80 L50 80" stroke="#15803d" strokeWidth="2" strokeLinecap="round"/>
      <path d="M96 80 L96 74 M96 80 L90 80" stroke="#15803d" strokeWidth="2" strokeLinecap="round"/>
      {/* Name strip */}
      <rect x="44" y="86" width="52" height="5" rx="2.5" fill="#d1fae5"/>
      <rect x="44" y="95" width="36" height="4" rx="2" fill="#dcfce7"/>
      {/* Home bar */}
      <rect x="55" y="103" width="30" height="3" rx="1.5" fill="#d1fae5"/>
      {/* Check badge */}
      <circle cx="96" cy="22" r="13" fill="#16a34a"/>
      <path d="M89.5 22 L94 26.5 L102.5 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Sparkles */}
      <circle cx="20" cy="28" r="3" fill="#4ade80" opacity="0.55"/>
      <circle cx="16" cy="90" r="2" fill="#86efac" opacity="0.5"/>
      <circle cx="122" cy="50" r="2.5" fill="#4ade80" opacity="0.45"/>
    </svg>
  );
}

function IllustrationCheckpoint() {
  return (
    <svg viewBox="0 0 140 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffedd5"/>
          <stop offset="100%" stopColor="#fed7aa"/>
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="124" height="104" rx="14" fill="url(#cBg)"/>
      {/* Ground */}
      <rect x="8" y="96" width="124" height="16" rx="0" fill="#fef3c7" opacity="0.6"/>
      {/* Left pillar */}
      <rect x="22" y="38" width="12" height="66" rx="4" fill="#374151"/>
      <rect x="22" y="38" width="12" height="14" rx="4" fill="#ef4444"/>
      {/* Right pillar */}
      <rect x="106" y="38" width="12" height="66" rx="4" fill="#374151"/>
      <rect x="106" y="38" width="12" height="14" rx="4" fill="#ef4444"/>
      {/* Barrier arm */}
      <rect x="22" y="46" width="72" height="8" rx="4" fill="#f59e0b"/>
      {/* Barrier stripes */}
      {[30,46,62].map(x=>(
        <rect key={x} x={x} y={46} width={10} height={8} rx="1" fill="#dc2626" opacity="0.25"/>
      ))}
      {/* Barrier pivot hinge */}
      <circle cx="28" cy="50" r="5" fill="#6b7280"/>
      <circle cx="28" cy="50" r="3" fill="#9ca3af"/>
      {/* Scan beam */}
      <line x1="22" y1="70" x2="106" y2="70" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"/>
      {/* Person */}
      <ellipse cx="76" cy="100" rx="12" ry="4" fill="black" opacity="0.1"/>
      {/* Person legs */}
      <rect x="70" y="84" width="6" height="14" rx="3" fill="#1e40af"/>
      <rect x="78" y="84" width="6" height="14" rx="3" fill="#1e3a8a"/>
      {/* Person body */}
      <rect x="66" y="62" width="22" height="24" rx="8" fill="#3b82f6"/>
      {/* Left arm */}
      <path d="M66 70 Q58 74 56 80" stroke="#3b82f6" strokeWidth="7" strokeLinecap="round"/>
      {/* Right arm holding phone */}
      <path d="M88 70 Q96 72 98 68" stroke="#3b82f6" strokeWidth="7" strokeLinecap="round"/>
      {/* Phone held */}
      <rect x="94" y="58" width="16" height="24" rx="4" fill="white"/>
      <rect x="96" y="61" width="12" height="18" rx="2" fill="#dbeafe"/>
      {/* QR on phone */}
      <rect x="98" y="63" width="4" height="4" fill="#1e40af"/>
      <rect x="104" y="63" width="4" height="4" fill="#1e40af"/>
      <rect x="98" y="69" width="4" height="4" fill="#1e40af"/>
      <rect x="104" y="69" width="2" height="2" fill="#1e40af"/>
      <rect x="108" y="69" width="2" height="2" fill="#1e40af"/>
      {/* Person head */}
      <circle cx="77" cy="54" r="12" fill="#fde68a"/>
      <circle cx="73" cy="52" r="2" fill="#78350f"/>
      <circle cx="81" cy="52" r="2" fill="#78350f"/>
      <path d="M74 58 Q77 61 80 58" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Hair */}
      <path d="M66 50 Q68 42 77 41 Q86 42 88 50" fill="#92400e" opacity="0.75"/>
      {/* Check approved badge */}
      <circle cx="112" cy="38" r="14" fill="#10b981"/>
      <path d="M105 38 L110 43 L119 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* CONTROL label */}
      <rect x="36" y="24" width="46" height="12" rx="6" fill="#ef4444"/>
      <rect x="38" y="26" width="42" height="8" rx="4" fill="#dc2626"/>
    </svg>
  );
}

function IllustrationComplete() {
  return (
    <svg viewBox="0 0 140 120" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef3c7"/>
          <stop offset="100%" stopColor="#fde68a"/>
        </linearGradient>
        <linearGradient id="dBox" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#f59e0b"/>
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="124" height="104" rx="14" fill="url(#dBg)"/>
      {/* Bottom box (larger) */}
      <rect x="28" y="74" width="84" height="36" rx="6" fill="url(#dBox)"/>
      <line x1="28" y1="92" x2="112" y2="92" stroke="#d97706" strokeWidth="1.5"/>
      <line x1="70" y1="74" x2="70" y2="110" stroke="#d97706" strokeWidth="1.5"/>
      {/* Aid cross on bottom box */}
      <rect x="48" y="78" width="8" height="20" rx="3" fill="white" opacity="0.35"/>
      <rect x="44" y="82" width="16" height="8" rx="3" fill="white" opacity="0.35"/>
      {/* Top box (smaller) */}
      <rect x="38" y="48" width="64" height="30" rx="6" fill="#fbbf24"/>
      <line x1="38" y1="63" x2="102" y2="63" stroke="#d97706" strokeWidth="1.5"/>
      <line x1="70" y1="48" width="0" height="30" stroke="#d97706" strokeWidth="1.5"/>
      {/* Aid cross on top box */}
      <rect x="56" y="52" width="6" height="16" rx="2.5" fill="white" opacity="0.35"/>
      <rect x="52" y="56" width="14" height="6" rx="2.5" fill="white" opacity="0.35"/>
      {/* Shadow under boxes */}
      <ellipse cx="70" cy="112" rx="40" ry="5" fill="#d97706" opacity="0.18"/>
      {/* Big check circle */}
      <circle cx="96" cy="36" r="22" fill="#10b981"/>
      <circle cx="96" cy="36" r="18" fill="#059669"/>
      <path d="M87 36 L93 42 L105 26" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Hearts */}
      <path d="M18 52 C18 49 21.5 47 24 49.5 C26.5 47 30 49 30 52 C30 55 24 59 24 59 C24 59 18 55 18 52Z" fill="#f43f5e" opacity="0.7"/>
      <path d="M110 72 C110 70 112.5 68.5 114.5 70.5 C116.5 68.5 119 70 119 72 C119 74 114.5 77 114.5 77 C114.5 77 110 74 110 72Z" fill="#f43f5e" opacity="0.6"/>
      {/* Sparkles */}
      <circle cx="24" cy="28" r="3" fill="#fbbf24" opacity="0.65"/>
      <circle cx="20" cy="90" r="2" fill="#fbbf24" opacity="0.5"/>
      <path d="M114 20 L116 14 L118 20 L124 22 L118 24 L116 30 L114 24 L108 22Z" fill="#fbbf24" opacity="0.55"/>
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
const IconScan = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700">
        <div className="max-w-5xl mx-auto px-5 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
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
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/25 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-colors text-sm">
                <IconQr className="w-4 h-4" />
                Soy operador de control
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 max-w-sm mx-auto w-full md:max-w-none">
            <IllustrationHero />
          </div>
        </div>
      </div>

      {/* ── PROCESO VISUAL ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">El proceso en 4 pasos</h2>
          <p className="text-gray-500 mt-2 text-sm">Para cualquier persona que quiera pasar con ayuda humanitaria</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { Illus: IllustrationRegister,   label: 'Paso 1', title: 'Te registras',      body: 'Llenas el formulario con tus datos e información de lo que llevas',        bg: 'bg-blue-50',   border: 'border-blue-100'   },
            { Illus: IllustrationQR,         label: 'Paso 2', title: 'Obtienes tu QR',    body: 'Al instante recibes un código QR único. Guárdalo en tu celular',            bg: 'bg-green-50',  border: 'border-green-100'  },
            { Illus: IllustrationCheckpoint, label: 'Paso 3', title: 'Pasas el control',  body: 'El operador escanea tu QR y verifica tu identidad. Sin papeles',            bg: 'bg-orange-50', border: 'border-orange-100' },
            { Illus: IllustrationComplete,   label: 'Paso 4', title: 'Entrega lista',     body: 'El coordinador marca la entrega como completada. Queda el registro oficial', bg: 'bg-amber-50',  border: 'border-amber-100'  },
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className={`${step.bg} border ${step.border} rounded-2xl p-4 flex flex-col items-center text-center h-full`}>
                <div className="w-full max-w-[110px] mx-auto mb-3">
                  <step.Illus />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{step.label}</span>
                <p className="font-bold text-gray-900 text-sm mt-1">{step.title}</p>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{step.body}</p>
              </div>
              {i < 3 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm">
                  <IconArrow className="w-3 h-3 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTORES — quién hace qué ────────────────────────────────────────── */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">¿Quién hace qué?</h2>
            <p className="text-gray-500 mt-2 text-sm">Tres tipos de actores trabajan juntos para coordinar la ayuda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Ciudadano */}
            <div className="border border-blue-100 rounded-2xl overflow-hidden">
              <div className="bg-blue-600 px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <IconUsers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Ciudadano</p>
                  <p className="text-blue-200 text-xs">Donante · Transportista · Familiar · Voluntario</p>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { step: '1', text: 'Accede a /registrar desde su celular' },
                  { step: '2', text: 'Llena el formulario con sus datos y los insumos' },
                  { step: '3', text: 'Recibe su credencial QR digital al instante' },
                  { step: '4', text: 'Muestra el QR en el punto de control' },
                  { step: '5', text: 'Consulta el estado de su entrega en /credencial' },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                    <p className="text-gray-600 text-sm leading-snug">{text}</p>
                  </div>
                ))}
                <div className="pt-2">
                  <Link href="/registrar" className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:underline">
                    Ir a registrarme <IconArrow className="w-3 h-3"/>
                  </Link>
                </div>
              </div>
            </div>

            {/* Operador de control */}
            <div className="border border-orange-100 rounded-2xl overflow-hidden">
              <div className="bg-orange-500 px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <IconQr className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Operador de Control</p>
                  <p className="text-orange-100 text-xs">En puntos de control · Sin necesidad de cuenta</p>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { step: '1', text: 'Abre /escanear en su celular — sin login' },
                  { step: '2', text: 'Activa la cámara y apunta al QR del ciudadano' },
                  { step: '3', text: 'Verifica nombre, cédula, placa e insumos en pantalla' },
                  { step: '4', text: 'El sistema registra el escaneo automáticamente' },
                  { step: '5', text: 'Autoriza el paso o alerta al coordinador si hay problema' },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                    <p className="text-gray-600 text-sm leading-snug">{text}</p>
                  </div>
                ))}
                <div className="pt-2">
                  <Link href="/escanear" className="inline-flex items-center gap-1.5 text-orange-600 text-xs font-bold hover:underline">
                    Abrir escáner <IconArrow className="w-3 h-3"/>
                  </Link>
                </div>
              </div>
            </div>

            {/* Coordinador admin */}
            <div className="border border-violet-100 rounded-2xl overflow-hidden">
              <div className="bg-violet-600 px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <IconClipboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Coordinador</p>
                  <p className="text-violet-200 text-xs">Admin · Acceso con usuario y contraseña</p>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { step: '1', text: 'Inicia sesión en /login con email y contraseña' },
                  { step: '2', text: 'Revisa el dashboard con estadísticas en tiempo real' },
                  { step: '3', text: 'Aprueba o rechaza entregas desde el listado' },
                  { step: '4', text: 'Cambia el estado: Aprobado → En tránsito → Completado' },
                  { step: '5', text: 'Exporta todos los datos a CSV para reportes' },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                    <p className="text-gray-600 text-sm leading-snug">{text}</p>
                  </div>
                ))}
                <div className="pt-2">
                  <Link href="/login" className="inline-flex items-center gap-1.5 text-violet-600 text-xs font-bold hover:underline">
                    Acceder al panel <IconArrow className="w-3 h-3"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Flow arrows — desktop only */}
          <div className="hidden md:flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-bold text-blue-600">Ciudadano</span>
              <span>se registra y genera QR</span>
            </div>
            <IconArrow className="w-4 h-4 text-gray-300"/>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-bold text-orange-500">Operador</span>
              <span>escanea y verifica en campo</span>
            </div>
            <IconArrow className="w-4 h-4 text-gray-300"/>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-bold text-violet-600">Coordinador</span>
              <span>gestiona y cierra el ciclo</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── WIZARD POR ROL ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-gray-900">Guía paso a paso según tu caso</h2>
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

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-6 md:p-8">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-5 ${a.tag}`}>{role.label}</span>
              {flow.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-xl ${a.stepBg} text-white flex items-center justify-center shrink-0`}>
                      <step.Icon className="w-4 h-4" />
                    </div>
                    {i < flow.steps.length - 1 && <div className="w-px bg-gray-200 flex-1 my-1.5" style={{ minHeight: 20 }} />}
                  </div>
                  <div className={`${i < flow.steps.length - 1 ? 'pb-5' : ''} flex-1`}>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Paso {i + 1}</p>
                    <p className="font-bold text-gray-900 text-sm">{step.title}</p>
                    <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:w-72 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50 flex flex-col p-6 md:p-8">
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

      {/* ── PREGUNTAS FRECUENTES ───────────────────────────────────────────── */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-5 py-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Preguntas frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { q: '¿Necesito instalar alguna aplicación?',         a: 'No. Funciona desde el navegador de tu celular (Chrome, Safari, etc.). Solo necesitas internet.' },
              { q: '¿Qué hago si perdí mi código QR?',             a: 'Guarda la URL de tu credencial al registrarte. También puedes pedirle al coordinador que busque tu registro por nombre o cédula.' },
              { q: '¿Cuánto tarda el registro?',                   a: 'Aproximadamente 2 a 3 minutos. Al finalizar obtienes el QR de inmediato, sin aprobación previa.' },
              { q: '¿Cómo sé que mi entrega fue registrada?',      a: 'El coordinador cambia el estado de tu registro a "Completado". Puedes ver el estado en la URL de tu credencial.' },
              { q: '¿Para qué sirve el código QR?',                a: 'Es tu credencial digital. El operador en el punto de control lo escanea para verificar quién eres y qué llevas, sin papeles.' },
              { q: '¿Qué pasa si no tengo internet en el control?',a: 'Toma captura de pantalla de tu QR antes de salir. El operador puede escanearlo desde la imagen aunque no tengas señal.' },
            ].map(({ q, a: ans }) => (
              <div key={q} className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <p className="font-bold text-gray-900 text-sm">{q}</p>
                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{ans}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white px-5 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center">
              <IconHeart className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-gray-800 text-sm">AidFlow La Guaira</span>
            <span className="text-gray-400 text-xs ml-1">· Sistema solidario de ayuda humanitaria</span>
          </div>
          <Link href="/login" className="text-gray-400 text-xs hover:text-gray-600 transition-colors">
            Acceso para coordinadores →
          </Link>
        </div>
      </footer>

    </div>
  );
}
