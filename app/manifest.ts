import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BRJ Guardian - Control de Acceso',
    short_name: 'BRJ Guardian',
    description: 'Plataforma de control de acceso mediante códigos QR dinámicos',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#10b981',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['business', 'productivity'],
    shortcuts: [
      {
        name: 'Escanear QR',
        short_name: 'Escanear',
        url: '/escanear',
      },
      {
        name: 'Generar QR',
        short_name: 'Generar',
        url: '/generar',
      },
    ],
  };
}
