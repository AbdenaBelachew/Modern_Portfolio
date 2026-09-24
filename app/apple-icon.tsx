import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
        <span style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4 }}>AB</span>
        <div style={{ marginTop: 6, width: 44, height: 7, borderRadius: 4, background: '#3cc2a8' }} />
      </div>
    ),
    size,
  );
}
