import { ImageResponse } from 'next/og';

const sizes = [192, 512] as const;

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return sizes.map((size) => ({ size: String(size) }));
}

// PNG app icons for the web manifest. The mark sits inside the maskable safe zone.
export async function GET(_req: Request, { params }: { params: Promise<{ size: string }> }) {
  const size = Number((await params).size);
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0f0e',
          color: '#e6ebe8',
        }}
      >
        <span style={{ fontSize: size * 0.34, fontWeight: 700, letterSpacing: -size * 0.015 }}>AB</span>
        <div style={{ marginTop: size * 0.03, width: size * 0.2, height: size * 0.035, borderRadius: size, background: '#3cc2a8' }} />
      </div>
    ),
    { width: size, height: size },
  );
}
