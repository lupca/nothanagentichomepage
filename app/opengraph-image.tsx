import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NoThanagentic - Nền tảng Agentic AI vận hành đa kênh';
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
          backgroundColor: '#1D0B3B',
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(242,92,5,0.35), transparent 45%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="56" height="48" viewBox="0 0 19 16" fill="none">
            <path d="M9.5 0L19 16H0L9.5 0Z" fill="#F25C05" />
            <circle cx="9.5" cy="10" r="3" fill="#1D0B3B" />
          </svg>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, color: '#FFFFFF' }}>
            NoThan<span style={{ color: '#F25C05' }}>agentic</span>
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
          Tự động hóa toàn diện chuỗi cung ứng & Marketing
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '28px',
            fontSize: 26,
            color: 'rgba(248,246,240,0.8)',
            maxWidth: '820px',
          }}
        >
          Nền tảng Agentic AI tiên phong tại Việt Nam cho vận hành bán hàng đa kênh
        </div>
      </div>
    ),
    { ...size }
  );
}
