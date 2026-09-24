import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import { site } from '@/data/site';
import MotionProvider from '@/components/MotionProvider';
import ThemeColorSync from '@/components/ThemeColorSync';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seoTitle,
  description: site.seoDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  keywords: [
    'Abdena Belachew',
    'enterprise software engineer',
    'full-stack developer',
    '.NET',
    'React',
    'SAP ABAP',
    'SAP Fiori',
    'ERP',
    'DevOps',
    'Ethiopia',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: site.seoTitle,
    description: site.seoDescription,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seoTitle,
    description: site.seoDescription,
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f7f3' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f0e' },
  ],
};

// Runs before first paint so a saved theme never flashes the wrong colors.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        <ThemeColorSync />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
