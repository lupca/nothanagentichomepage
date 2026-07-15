import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
});

const SITE_URL = 'https://nothanagentic.vn';
const SITE_TITLE = 'NoThanagentic — Nền tảng Agentic AI cho Vận hành & Bán hàng Đa kênh';
const SITE_DESCRIPTION =
  'NoThanagentic là nền tảng Agentic AI tiên phong tại Việt Nam giúp doanh nghiệp tự động hóa toàn diện chuỗi cung ứng, tồn kho, dòng tiền và marketing đa kênh (Shopee, TikTok Shop, Lazada) với cơ chế con người phê duyệt minh bạch.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | NoThanagentic',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Agentic AI Việt Nam',
    'tự động hóa bán hàng đa kênh',
    'phần mềm quản lý tồn kho AI',
    'tự động hóa dòng tiền',
    'tích hợp Shopee TikTok Shop Lazada',
    'B2B SaaS Việt Nam',
  ],
  authors: [{ name: 'NoThanagentic' }],
  creator: 'NoThanagentic',
  publisher: 'NoThanagentic',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE_URL,
    siteName: 'NoThanagentic',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'NoThanagentic - Nền tảng Agentic AI vận hành đa kênh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${plusJakartaSans.variable}`}>
      <body className="bg-brand-surface text-brand-bg antialiased">
        {children}
      </body>
    </html>
  );
}
