import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Nỏ Thần Agentic — giải pháp phần cứng và phần mềm với Agentic AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0B0B1F',
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(232,84,30,0.35), transparent 45%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="56" height="48" viewBox="0 0 19 16" fill="none">
            <path d="M9.5 0L19 16H0L9.5 0Z" fill="#E8541E" />
            <circle cx="9.5" cy="10" r="3" fill="#1B1B4B" />
          </svg>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, color: '#FFFFFF' }}>
            NỎ THẦN <span style={{ color: '#E8541E' }}>AGENTIC</span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '48px',
            fontSize: 54,
            fontWeight: 800,
            lineHeight: 1.2,
            color: '#FFFFFF',
            maxWidth: '920px',
          }}
        >
          AI chạy trên thiết bị thật, trong nhà máy thật.
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '28px',
            fontSize: 26,
            color: 'rgba(245,244,240,0.8)',
            maxWidth: '820px',
          }}
        >
          Giải pháp phần cứng + phần mềm, lõi Agentic AI, cho giám sát sản xuất và an toàn lao động
        </div>
      </div>
    ),
    { ...size }
  );
}
