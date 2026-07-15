import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import UseCases from '@/components/UseCases';
import AIDecisionWidget from '@/components/AIDecisionWidget';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://nothanagentic.vn/#organization',
      name: 'NoThanagentic',
      url: 'https://nothanagentic.vn',
      logo: 'https://nothanagentic.vn/icon.svg',
      description:
        'Nền tảng Agentic AI tiên phong tại Việt Nam cho vận hành bán hàng đa kênh: tự động hóa tồn kho, dòng tiền và marketing.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Phố Lê Văn Hiến',
        addressLocality: 'Phường Đức Thắng, Quận Bắc Từ Liêm',
        addressRegion: 'Hà Nội',
        addressCountry: 'VN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'lienhe@nothanagentic.vn',
        telephone: '+84-97-600-7006',
        contactType: 'customer service',
        areaServed: 'VN',
        availableLanguage: ['vi'],
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'NoThanagentic',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Hệ sinh thái Agentic AI vận hành và bán hàng đa kênh cho doanh nghiệp Việt Nam: tự động hóa tồn kho, dòng tiền và chiến dịch marketing với cơ chế con người phê duyệt.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'VND',
        description: 'Dùng thử miễn phí 7 ngày',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '32',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Hệ thống tích hợp được với những kênh bán hàng và vận chuyển nào?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NoThanagentic tích hợp API 2 chiều với Shopee, TikTok Shop, Lazada, đơn vị vận chuyển GHTK và cổng thanh toán MoMo, đồng bộ theo thời gian thực.',
          },
        },
        {
          '@type': 'Question',
          name: 'Dữ liệu kinh doanh của doanh nghiệp có được bảo mật không?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hệ thống tuân thủ tiêu chuẩn bảo mật quốc tế ISO/IEC 27001, mã hóa truyền tải SSL/TLS và lưu trữ AES-256, phân quyền truy cập theo vai trò (RBAC).',
          },
        },
        {
          '@type': 'Question',
          name: 'Thời gian triển khai hệ thống mất bao lâu để bắt đầu hoạt động?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nhờ kiến trúc API dựng sẵn, việc kết nối dữ liệu và cấu hình AI Decision Support chỉ mất từ 3 đến 5 ngày làm việc.',
          },
        },
      ],
    },
  ],
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
      <main className="min-h-screen bg-brand-surface text-brand-bg antialiased">
        <Hero />
        <HowItWorks />
        <UseCases />
        <AIDecisionWidget />
        <Testimonials />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <CommandPalette />
      <FloatingContact />
    </>
  );
}
