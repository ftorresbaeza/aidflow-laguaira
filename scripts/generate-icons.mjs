import sharp from 'sharp';

/**
 * Generates PWA icons from logo.png (BRJ Guardian).
 * The logo is placed on a white square canvas with padding,
 * then resized to each required dimension.
 */

const SIZES = [
  { size: 512, output: 'public/icon-512.png' },
  { size: 192, output: 'public/icon-192.png' },
  { size: 180, output: 'public/apple-touch-icon.png' },
  { size: 32,  output: 'public/favicon-32.png' },
  { size: 16,  output: 'public/favicon-16.png' },
];

// Build a padded square canvas at 512px with the logo centred
const CANVAS = 512;
const PADDING = 56; // ~11% each side
const LOGO_FIT = CANVAS - PADDING * 2;

// Resize logo to fit within the padded area
const logoResized = await sharp('public/logo.png')
  .resize({ width: LOGO_FIT, height: LOGO_FIT, fit: 'inside' })
  .toBuffer();

const logoMeta = await sharp(logoResized).metadata();
const left = Math.round((CANVAS - logoMeta.width) / 2);
const top  = Math.round((CANVAS - logoMeta.height) / 2);

// Compose: white background + centred logo
const master = await sharp({
  create: { width: CANVAS, height: CANVAS, channels: 4, background: '#ffffff' },
})
  .composite([{ input: logoResized, left, top }])
  .png()
  .toBuffer();

for (const { size, output } of SIZES) {
  await sharp(master).resize(size, size).png().toFile(output);
  console.log(`✓ ${output} (${size}×${size})`);
}

console.log('\nAll icons generated from logo.png');
