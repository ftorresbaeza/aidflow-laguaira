import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// ─── SVG: Solo escudo (para logo-small, favicons) ───────────────────────────
const shieldSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" width="200" height="220">
  <defs>
    <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <!-- Borde dorado del escudo -->
  <path d="M100 8 L188 44 L188 118 Q188 174 100 214 Q12 174 12 118 L12 44 Z"
        fill="#f59e0b"/>
  <!-- Cuerpo azul del escudo -->
  <path d="M100 20 L176 52 L176 118 Q176 166 100 202 Q24 166 24 118 L24 52 Z"
        fill="url(#sg)"/>
  <!-- Letra G grande -->
  <text x="100" y="160" text-anchor="middle"
        font-family="Arial Black, Arial, sans-serif" font-weight="900"
        font-size="90" fill="#f59e0b" opacity="0.95">G</text>
  <!-- BRJ pequeño en la parte superior -->
  <text x="100" y="62" text-anchor="middle"
        font-family="Arial, sans-serif" font-weight="700"
        font-size="20" fill="#bfdbfe" letter-spacing="4">BRJ</text>
</svg>`;

// ─── SVG: Logo completo con texto (para logo.png, icon-192, icon-512) ────────
const fullLogoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">
  <rect width="320" height="320" fill="#0f172a" rx="16"/>
  <defs>
    <linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <!-- Borde dorado del escudo -->
  <path d="M160 18 L238 50 L238 118 Q238 168 160 208 Q82 168 82 118 L82 50 Z"
        fill="#f59e0b"/>
  <!-- Cuerpo azul del escudo -->
  <path d="M160 30 L226 58 L226 118 Q226 160 160 196 Q94 160 94 118 L94 58 Z"
        fill="url(#sg2)"/>
  <!-- Letra G -->
  <text x="160" y="170" text-anchor="middle"
        font-family="Arial Black, Arial, sans-serif" font-weight="900"
        font-size="80" fill="#f59e0b" opacity="0.95">G</text>
  <!-- BRJ en escudo -->
  <text x="160" y="74" text-anchor="middle"
        font-family="Arial, sans-serif" font-weight="700"
        font-size="18" fill="#bfdbfe" letter-spacing="3">BRJ</text>
  <!-- Nombre principal -->
  <text x="160" y="240" text-anchor="middle"
        font-family="Arial Black, Arial, sans-serif" font-weight="900"
        font-size="28" fill="#ffffff" letter-spacing="1">BRJ GUARDIAN</text>
  <!-- Tagline -->
  <text x="160" y="268" text-anchor="middle"
        font-family="Arial, sans-serif" font-weight="400"
        font-size="11" fill="#64748b" letter-spacing="1.5">SERVIR, PREVENIR Y PROTEGER</text>
</svg>`;

// ─── SVG: Logo horizontal para embedding en QR (logo-small usado a 240x80) ──
const horizontalLogoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
  <rect width="300" height="100" fill="#0f172a" rx="8"/>
  <defs>
    <linearGradient id="sg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <!-- Escudo pequeño -->
  <path d="M50 8 L88 22 L88 54 Q88 76 50 92 Q12 76 12 54 L12 22 Z" fill="#f59e0b"/>
  <path d="M50 16 L80 28 L80 54 Q80 72 50 86 Q20 72 20 54 L20 28 Z" fill="url(#sg3)"/>
  <text x="50" y="70" text-anchor="middle"
        font-family="Arial Black, Arial, sans-serif" font-weight="900"
        font-size="36" fill="#f59e0b" opacity="0.95">G</text>
  <!-- Texto -->
  <text x="164" y="40" text-anchor="middle"
        font-family="Arial Black, Arial, sans-serif" font-weight="900"
        font-size="26" fill="#ffffff">BRJ GUARDIAN</text>
  <text x="164" y="64" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="12" fill="#64748b"
        letter-spacing="1.5">SERVIR, PREVENIR Y PROTEGER</text>
</svg>`;

async function generate() {
  const tasks = [
    // logo.png — logo completo cuadrado, 153x151 → 160x160
    { svg: fullLogoSVG, file: 'logo.png', w: 160, h: 160 },
    // logo-small.png — logo horizontal para QR embedding, 81x80 → 300x100
    { svg: horizontalLogoSVG, file: 'logo-small.png', w: 300, h: 100 },
    // favicons
    { svg: shieldSVG, file: 'favicon-16.png', w: 16, h: 16 },
    { svg: shieldSVG, file: 'favicon-32.png', w: 32, h: 32 },
    // PWA icons
    { svg: fullLogoSVG, file: 'icon-192.png', w: 192, h: 192 },
    { svg: fullLogoSVG, file: 'icon-512.png', w: 512, h: 512 },
    { svg: fullLogoSVG, file: 'apple-touch-icon.png', w: 192, h: 192 },
  ];

  for (const { svg, file, w, h } of tasks) {
    const outPath = join(publicDir, file);
    await sharp(Buffer.from(svg))
      .resize(w, h, { fit: 'fill' })
      .png()
      .toFile(outPath);
    console.log(`✓ ${file} (${w}x${h})`);
  }

  console.log('\n✅ Todos los assets de BRJ Guardian generados correctamente.');
}

generate().catch(err => { console.error(err); process.exit(1); });
