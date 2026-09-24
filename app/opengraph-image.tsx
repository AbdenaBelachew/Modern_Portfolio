import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = site.seoTitle;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Link-preview card, rendered at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0b0f0e',
          color: '#e6ebe8',
          backgroundImage:
            'linear-gradient(#1a2321 1px, transparent 1px), linear-gradient(90deg, #1a2321 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: '#929c97', letterSpacing: 3 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#3cc2a8' }} />
          <span>ENGINEERING ENTERPRISE SOFTWARE</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 108, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>{site.name}</div>
          <div style={{ marginTop: 28, fontSize: 40, color: '#c9d1cd' }}>{site.title}</div>
          <div style={{ marginTop: 40, display: 'flex', gap: 28, fontSize: 26, color: '#3cc2a8' }}>
            {site.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
