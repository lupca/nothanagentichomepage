import type { Metadata } from 'next';
import Link from 'next/link';
import { Handshake, Building2, Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';

interface Copy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  partnerEyebrow: string;
  partnerTitle: string;
  partnerBody: string;
  partnerCta: string;
  businessEyebrow: string;
  businessTitle: string;
  businessBody: string;
  businessCta: string;
  detailsEyebrow: string;
  detailsTitle: string;
  detailsNote: string;
}

const content: Record<'vi' | 'en' | 'sv', Copy> = {
  vi: {
    metaTitle: 'Liên hệ | Nỏ Thần Agentic',
    metaDescription:
      'Hai hướng liên hệ với Nỏ Thần Agentic: hãng phần cứng muốn hợp tác kỹ thuật, hoặc doanh nghiệp có bài toán giám sát/kiểm soát hàng hoá cụ thể cần giải quyết.',
    eyebrow: 'Liên hệ',
    h1: 'Liên hệ',
    intro:
      'Chúng tôi có hai luồng làm việc khác nhau, tuỳ vào việc bạn là hãng phần cứng muốn hợp tác kỹ thuật, hay doanh nghiệp đang có một bài toán cụ thể cần giải quyết. Chọn đúng luồng dưới đây để đi thẳng vào phần liên quan.',
    partnerEyebrow: 'Dành cho hãng phần cứng',
    partnerTitle: 'Đối tác / hãng phần cứng',
    partnerBody:
      'Bạn đại diện một hãng camera hoặc thiết bị phần cứng, muốn trao đổi về tích hợp kỹ thuật, chương trình đối tác, hoặc đưa AI trực tiếp vào thiết bị của mình? Trao đổi hợp tác được xử lý qua form dành riêng cho đối tác.',
    partnerCta: 'Đi tới form hợp tác đối tác',
    businessEyebrow: 'Dành cho doanh nghiệp',
    businessTitle: 'Doanh nghiệp có bài toán cụ thể',
    businessBody:
      'Bạn đang cần giám sát sản xuất, kiểm soát hàng hoá, hoặc an toàn lao động bằng hình ảnh và muốn trao đổi trực tiếp về bài toán của mình? Gửi thông tin qua form liên hệ chính trên trang chủ, chúng tôi sẽ phản hồi trực tiếp.',
    businessCta: 'Đi tới form liên hệ',
    detailsEyebrow: 'Thông tin liên hệ',
    detailsTitle: 'Liên hệ trực tiếp',
    detailsNote: 'Đây là trang điều hướng, không phải một form thứ ba — hai lối trên đã dẫn tới đúng form cần dùng.',
  },
  en: {
    metaTitle: 'Contact | Nỏ Thần Agentic',
    metaDescription:
      'Two ways to reach Nỏ Thần Agentic: hardware vendors looking for a technical partnership, or businesses with a specific monitoring or inventory-control problem to solve.',
    eyebrow: 'Contact',
    h1: 'Contact',
    intro:
      'We run two different tracks depending on who you are: a hardware vendor exploring a technical partnership, or a business with a specific problem to solve. Pick the right one below to go straight to the relevant form.',
    partnerEyebrow: 'For hardware vendors',
    partnerTitle: 'Partner / hardware vendor',
    partnerBody:
      'Are you with a camera or hardware vendor and want to discuss technical integration, a partner program, or embedding AI directly on your device? Partnership conversations go through the dedicated partner form.',
    partnerCta: 'Go to the partner form',
    businessEyebrow: 'For businesses',
    businessTitle: 'Business with a specific problem',
    businessBody:
      'Do you need production monitoring, inventory control, or safety monitoring via computer vision, and want to talk about your specific case? Send your details through the main contact form on the homepage and we will reply directly.',
    businessCta: 'Go to the contact form',
    detailsEyebrow: 'Contact details',
    detailsTitle: 'Reach us directly',
    detailsNote: 'This is a routing page, not a third form — the two paths above already lead to the right form.',
  },
  sv: {
    metaTitle: 'Kontakt | Nỏ Thần Agentic',
    metaDescription:
      'Två vägar att kontakta Nỏ Thần Agentic: hårdvarutillverkare som söker ett tekniskt partnerskap, eller företag med ett specifikt övervaknings- eller lagerstyrningsproblem att lösa.',
    eyebrow: 'Kontakt',
    h1: 'Kontakt',
    intro:
      'Vi har två separata spår beroende på vem du är: en hårdvarutillverkare som utreder ett tekniskt partnerskap, eller ett företag med ett specifikt problem att lösa. Välj rätt spår nedan för att komma direkt till relevant formulär.',
    partnerEyebrow: 'För hårdvarutillverkare',
    partnerTitle: 'Partner / hårdvarutillverkare',
    partnerBody:
      'Representerar du en kamera- eller hårdvarutillverkare och vill diskutera teknisk integration, ett partnerprogram, eller att bädda in AI direkt i er enhet? Partnerskapssamtal hanteras via det dedikerade partnerformuläret.',
    partnerCta: 'Gå till partnerformuläret',
    businessEyebrow: 'För företag',
    businessTitle: 'Företag med ett specifikt problem',
    businessBody:
      'Behöver ni produktionsövervakning, lagerstyrning eller arbetsmiljöövervakning med hjälp av datorseende, och vill diskutera ert specifika fall? Skicka era uppgifter via huvudkontaktformuläret på startsidan så återkommer vi direkt.',
    businessCta: 'Gå till kontaktformuläret',
    detailsEyebrow: 'Kontaktuppgifter',
    detailsTitle: 'Nå oss direkt',
    detailsNote: 'Detta är en navigeringssida, inte ett tredje formulär — de två vägarna ovan leder redan till rätt formulär.',
  },
};

function pick(locale: string): Copy {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = pick(locale);
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = pick(locale);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper text-ink antialiased">
        {/* 1. Intro */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.eyebrow}</span>
            <h1 className="font-display text-h1 font-bold text-ink">{t.h1}</h1>
            <p className="text-body text-navy-400 leading-relaxed max-w-3xl">{t.intro}</p>
          </div>
        </section>

        {/* 2. Two routing cards */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="bg-white border border-line p-8 space-y-5 flex flex-col"
              style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
            >
              <Handshake className="w-8 h-8 text-orange-600" aria-hidden="true" />
              <div className="space-y-3 flex-1">
                <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.partnerEyebrow}</span>
                <h2 className="font-display text-h3 font-bold text-ink">{t.partnerTitle}</h2>
                <p className="text-body text-navy-400 leading-relaxed">{t.partnerBody}</p>
              </div>
              <Link
                href={`/${locale}/doi-tac#doi-tac-lien-he`}
                className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-wider text-orange-600 hover:text-orange transition-colors"
              >
                {t.partnerCta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div
              className="bg-white border border-line p-8 space-y-5 flex flex-col"
              style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
            >
              <Building2 className="w-8 h-8 text-orange-600" aria-hidden="true" />
              <div className="space-y-3 flex-1">
                <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.businessEyebrow}</span>
                <h2 className="font-display text-h3 font-bold text-ink">{t.businessTitle}</h2>
                <p className="text-body text-navy-400 leading-relaxed">{t.businessBody}</p>
              </div>
              <Link
                href={`/${locale}#lead-capture`}
                className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-wider text-orange-600 hover:text-orange transition-colors"
              >
                {t.businessCta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Real contact details, reused from Footer */}
        <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3">
              <span className="text-caption font-mono uppercase tracking-wider text-orange">{t.detailsEyebrow}</span>
              <h2 className="font-display text-h2 font-bold text-white">{t.detailsTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-orange shrink-0" aria-hidden="true" />
                <span className="text-body text-paper/75">lienhe@nothanagentic.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-orange shrink-0" aria-hidden="true" />
                <span className="text-body text-paper/75">097 6007006</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-body text-paper/75">Phố Lê Văn Hiến, Phường Đức Thắng, Quận Bắc Từ Liêm, Hà Nội</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-white/15 bg-white/5 text-caption">
              <ShieldCheck className="w-5 h-5 text-state-ok shrink-0" aria-hidden="true" />
              <p className="m-0 text-paper/75">{t.detailsNote}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CommandPalette />
      <FloatingContact />
    </>
  );
}
