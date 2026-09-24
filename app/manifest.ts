import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// Lets phones "Add to Home Screen" with a proper name, icon and colors.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Abdena B.',
    description: site.seoDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0f0e',
    theme_color: '#0b0f0e',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/pwa-icon/192', type: 'image/png', sizes: '192x192' },
      { src: '/pwa-icon/512', type: 'image/png', sizes: '512x512' },
      { src: '/pwa-icon/512', type: 'image/png', sizes: '512x512', purpose: 'maskable' },
    ],
  };
}
