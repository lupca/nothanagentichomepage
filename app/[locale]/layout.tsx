import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Archivo, IBM_Plex_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import '../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
});

const archivo = Archivo({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['500', '600', '700'],
  variable: '--font-archivo',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
});

const SITE_URL = 'https://nothanagentic.vn';
const SITE_TITLE = 'Nỏ Thần Agentic - Giải pháp phần cứng và phần mềm, lõi Agentic AI';
const SITE_DESCRIPTION =
  'Nỏ Thần Agentic xây và triển khai giải pháp trọn gói phần cứng và phần mềm cho giám sát sản xuất, an toàn lao động và kiểm soát hàng hoá tại doanh nghiệp Việt Nam, với Agentic AI làm lõi và bảo mật là mặc định.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Nỏ Thần Agentic',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'giám sát an toàn lao động bằng AI',
    'camera AI nhà máy',
    'đếm hàng tự động bằng hình ảnh',
    'tích hợp AI vào camera',
    'Agentic AI Việt Nam',
    'ONVIF integration Vietnam',
    'edge AI system integrator Vietnam',
  ],
  authors: [{ name: 'Nỏ Thần Agentic' }],
  creator: 'Nỏ Thần Agentic',
  publisher: 'Nỏ Thần Agentic',
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
    siteName: 'Nỏ Thần Agentic',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Nỏ Thần Agentic - giải pháp phần cứng và phần mềm với Agentic AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${plusJakartaSans.variable} ${archivo.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        {/* If JavaScript fails to load, framer-motion's inline `initial` style
            (opacity:0) on [data-reveal] elements would otherwise never animate
            in. This noscript rule forces them visible - !important in a
            stylesheet wins over a plain inline style. */}
        <noscript>
          <style>{'[data-reveal]{opacity:1 !important;transform:none !important;}'}</style>
        </noscript>
        <NextIntlClientProvider locale={locale as Locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
