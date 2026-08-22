import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import BrandStory from '@/components/BrandStory';
import Pillars from '@/components/Pillars';
import Platforms from '@/components/Platforms';
import DeviceMatrix from '@/components/DeviceMatrix';
import Evidence from '@/components/Evidence';
import Security from '@/components/Security';
import PartnerSection from '@/components/PartnerSection';
import Commitments from '@/components/Commitments';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://nothanagentic.vn/#organization',
  name: 'Nỏ Thần Agentic',
  alternateName: 'No Than Agentic',
  url: 'https://nothanagentic.vn',
  logo: 'https://nothanagentic.vn/icon.png',
  description:
    'Nỏ Thần Agentic xây và triển khai giải pháp trọn gói phần cứng và phần mềm cho giám sát sản xuất, an toàn lao động và kiểm soát hàng hoá tại doanh nghiệp Việt Nam, với Agentic AI làm lõi.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Phố Lê Văn Hiến',
    addressLocality: 'Phường Đông Ngạc',
    addressRegion: 'Hà Nội',
    addressCountry: 'VN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'lienhe@nothanagentic.vn',
    telephone: '+84-98-365-0552',
    contactType: 'sales',
    areaServed: 'VN',
    availableLanguage: ['vi', 'en', 'sv'],
  },
  knowsAbout: [
    'Computer vision',
    'Edge AI',
    'Industrial safety monitoring',
    'ONVIF integration',
    'Agentic AI',
  ],
  sameAs: ['https://voma.vn'],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-paper text-ink antialiased">
        <Hero />
        <StatsStrip />
        <BrandStory />
        <Pillars />
        <Platforms />
        <DeviceMatrix />
        <Evidence />
        <Security />
        <PartnerSection />
        <Commitments />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <CommandPalette />
      <FloatingContact />
    </>
  );
}
