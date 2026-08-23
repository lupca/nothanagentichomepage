import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';
import { Check, Users, GitBranch, Building2, Mail, Phone, MapPin } from 'lucide-react';

interface TeamRow {
  role: string;
  desc: string;
}

interface LegalRow {
  label: string;
  value: string;
}

interface Content {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  teamEyebrow: string;
  teamTitle: string;
  teamNote: string;
  team: TeamRow[];
  roadmapEyebrow: string;
  roadmapTitle: string;
  roadmapTag: string;
  roadmapBody: string[];
  commitEyebrow: string;
  commitTitle: string;
  commitSub: string;
  commitments: string[];
  legalEyebrow: string;
  legalTitle: string;
  legal: LegalRow[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
}

const content: Record<'vi' | 'en' | 'sv', Content> = {
  vi: {
    metaTitle: 'Công ty - Nỏ Thần Agentic',
    metaDescription:
      'Tầm nhìn, đội ngũ, mô hình quản trị và thông tin pháp lý của Nỏ Thần Agentic, công ty giải pháp phần cứng và phần mềm lấy Agentic AI làm cốt lõi.',
    eyebrow: 'Công ty',
    h1: 'Giải pháp phần cứng và phần mềm, lấy Agentic AI làm lõi',
    intro:
      'Mô hình kinh doanh cốt lõi là SaaS thu phí theo chu kỳ (tháng/quý/năm), kết hợp cung cấp phần cứng đồng bộ. Phần mềm và thiết bị đi cùng nhau, không tách rời. Đội kỹ thuật làm việc trực tiếp với khách hàng để xác định bài toán nghiệp vụ cụ thể trước khi triển khai.',
    teamEyebrow: 'Đội ngũ',
    teamTitle: 'Ai đang trực tiếp làm việc',
    teamNote:
      'Phân công rõ vai trò theo từng dịch vụ. Đội ngũ đang mở rộng cùng tốc độ phát triển của SOAI.VN và VOMA.VN.',
    team: [
      { role: 'Ban điều hành', desc: 'Điều hành tổng thể, định hướng kinh doanh, chi phí và thủ tục pháp lý.' },
      { role: 'Đội kỹ thuật', desc: 'Phụ trách kỹ thuật và giải pháp tổng thể cho toàn bộ các dịch vụ.' },
      { role: 'Đội giải pháp VOMA', desc: 'Trực tiếp phụ trách giải pháp dịch vụ VOMA.VN.' },
      { role: 'Đội giải pháp SOAI', desc: 'Trực tiếp phụ trách giải pháp dịch vụ SOAI.VN.' },
    ],
    roadmapEyebrow: 'Lộ trình',
    roadmapTitle: 'Mô hình quản trị & định hướng',
    roadmapTag: 'Kế hoạch, chưa triển khai',
    roadmapBody: [
      'Khi từng dịch vụ, SOAI.VN và VOMA.VN, đạt quy mô lớn, chúng tôi có kế hoạch tách thành các công ty con độc lập, trao quyền điều hành cho nhân sự nòng cốt đang trực tiếp phụ trách giải pháp đó.',
      'Đây là lộ trình cấu trúc dài hạn; công ty hiện chưa vận hành theo mô hình này. Chúng tôi công bố nó ở đây vì đối tác thẩm định có quyền biết hướng đi, không chỉ trạng thái hiện tại.',
    ],
    commitEyebrow: 'Cam kết',
    commitTitle: 'Sáu cam kết',
    commitSub: 'Chỉ những cam kết khách hàng có thể bắt lỗi được.',
    commitments: [
      'Lộ trình công khai. Ba giai đoạn của mỗi nền tảng được công bố và cập nhật, kèm ngày.',
      'Dữ liệu là của khách hàng. Xuất toàn bộ dữ liệu ra định dạng mở bất kỳ lúc nào, không phí, không điều kiện.',
      'Bảo trì cam kết theo hợp đồng. Ghi rõ thời hạn và mức phản hồi trong hợp đồng, không để "theo thoả thuận".',
      'Minh bạch khi thẩm định. Cung cấp báo cáo tài chính, danh sách nhân sự và tài liệu kiến trúc cho đối tác trong quá trình đánh giá.',
      'Không khoá bằng phần cứng. Chúng tôi cung cấp thiết bị nhưng không khoá phần mềm vào thiết bị của mình, chuẩn mở là mặc định.',
      'Quyết định nhanh. Không qua nhiều tầng phê duyệt, đối tác tiếp cận trực tiếp đội kỹ thuật và có thể bắt đầu một POC ngay khi hai bên thống nhất phạm vi.',
    ],
    legalEyebrow: 'Pháp lý',
    legalTitle: 'Thông tin pháp lý',
    legal: [
      { label: 'Tên công ty', value: 'Công ty TNHH Nỏ Thần Agentic' },
      { label: 'Mã số thuế', value: '0111579329, đăng ký lần đầu ngày 23/07/2026' },
      { label: 'Địa chỉ', value: 'Số 1, ngõ 141/3, phố Lê Văn Hiến, phường Đông Ngạc, Hà Nội' },
      { label: 'Người đại diện pháp luật', value: 'Ông Đào Duy Hưng' },
      { label: 'Email', value: 'contact@nothanagentic.vn' },
      { label: 'Điện thoại', value: '0983 650 552' },
    ],
    ctaTitle: 'Muốn xem thêm trước khi hợp tác?',
    ctaBody: 'Chúng tôi cung cấp báo cáo tài chính, danh sách nhân sự và tài liệu kiến trúc cho đối tác trong quá trình thẩm định.',
    ctaButton: 'Liên hệ',
  },
  en: {
    metaTitle: 'Company - Nỏ Thần Agentic',
    metaDescription:
      'Vision, team, governance roadmap, and legal information for Nỏ Thần Agentic, a hardware and software solutions company built on Agentic AI.',
    eyebrow: 'Company',
    h1: 'Building end-to-end solutions with Agentic AI at the core',
    intro:
      'Our core business model is a subscription SaaS (monthly/quarterly/annual) bundled with synchronized hardware. Software and devices ship together, not as separate purchases. The engineering team works directly with customers to define the business problem before deployment.',
    teamEyebrow: 'Team',
    teamTitle: 'Who is actually doing the work',
    teamNote:
      'Clear ownership per service. The team is growing alongside SOAI.VN and VOMA.VN.',
    team: [
      { role: 'Executive management', desc: 'Overall management: business direction, cost control, and legal matters.' },
      { role: 'Engineering team', desc: 'Technical lead, owning the overall technical solution across all services.' },
      { role: 'VOMA solution team', desc: 'Owns the VOMA.VN service solution directly.' },
      { role: 'SOAI solution team', desc: 'Owns the SOAI.VN service solution directly.' },
    ],
    roadmapEyebrow: 'Roadmap',
    roadmapTitle: 'Governance model & direction',
    roadmapTag: 'Planned, not yet in effect',
    roadmapBody: [
      'As each service, SOAI.VN and VOMA.VN, reaches significant scale, we plan to spin it off as an independent subsidiary and hand operating authority to the core team member already responsible for that solution.',
      'This is a long-term structural plan, not our current corporate structure. We state it plainly here because a due-diligence partner deserves to know the direction we are heading, not only where we stand today.',
    ],
    commitEyebrow: 'Commitments',
    commitTitle: 'Six commitments',
    commitSub: 'Only commitments a customer can hold us to.',
    commitments: [
      'Public roadmap. The three phases of every platform are published and updated, with dates.',
      'Your data stays yours. Export all of it in an open format at any time, free of charge and without conditions.',
      'Contracted maintenance. Response times and coverage windows are written into the contract, not left to "as agreed."',
      'Transparency during due diligence. We share financial statements, team rosters, and architecture documentation with partners during evaluation.',
      'No hardware lock-in. We supply devices, but we do not lock software to our own hardware. Open standards are the default.',
      'Fast decisions. No layers of approval to work through. Partners get direct access to the engineering team and can start a POC as soon as scope is agreed.',
    ],
    legalEyebrow: 'Legal',
    legalTitle: 'Legal information',
    legal: [
      { label: 'Company name', value: 'No Than Agentic Company Limited' },
      { label: 'Tax code', value: '0111579329, first registered 23 July 2026' },
      { label: 'Address', value: 'So 1, ngo 141/3, pho Le Van Hien, Dong Ngac ward, Hanoi, Vietnam' },
      { label: 'Legal representative', value: 'Mr. Đào Duy Hưng' },
      { label: 'Email', value: 'contact@nothanagentic.vn' },
      { label: 'Phone', value: '+84 983 650 552' },
    ],
    ctaTitle: 'Want to see more before you commit?',
    ctaBody: 'We share financial statements, team rosters, and architecture documentation with partners during due diligence.',
    ctaButton: 'Contact us',
  },
  sv: {
    metaTitle: 'Företaget - Nỏ Thần Agentic',
    metaDescription:
      'Vision, team, styrningsmodell och juridisk information för Nỏ Thần Agentic, ett hårdvaru- och mjukvaruföretag med Agentic AI i kärnan.',
    eyebrow: 'Företaget',
    h1: 'Vi bygger helhetslösningar med Agentic AI i kärnan',
    intro:
      'Vår kärnaffärsmodell är en SaaS-prenumeration (månad/kvartal/år) i kombination med synkroniserad hårdvara. Mjukvara och enheter levereras tillsammans, inte som separata köp. Utvecklingsteamet arbetar direkt med kunden för att definiera affärsproblemet innan driftsättning.',
    teamEyebrow: 'Team',
    teamTitle: 'Vilka som faktiskt utför arbetet',
    teamNote:
      'Tydligt ägarskap per tjänst. Teamet växer i takt med SOAI.VN och VOMA.VN.',
    team: [
      { role: 'Företagsledning', desc: 'Övergripande ledning: affärsinriktning, kostnadskontroll och juridiska frågor.' },
      { role: 'Utvecklingsteam', desc: 'Teknisk ledning, ansvarar för den övergripande tekniska lösningen för samtliga tjänster.' },
      { role: 'VOMA-lösningsteam', desc: 'Ansvarar direkt för lösningen bakom tjänsten VOMA.VN.' },
      { role: 'SOAI-lösningsteam', desc: 'Ansvarar direkt för lösningen bakom tjänsten SOAI.VN.' },
    ],
    roadmapEyebrow: 'Färdplan',
    roadmapTitle: 'Styrningsmodell och inriktning',
    roadmapTag: 'Planerat, ännu inte genomfört',
    roadmapBody: [
      'När respektive tjänst, SOAI.VN och VOMA.VN, når betydande skala planerar vi att knoppa av den som ett fristående dotterbolag och överlåta det operativa ansvaret till den nyckelperson som redan ansvarar för lösningen.',
      'Detta är en långsiktig strukturell plan, inte vår nuvarande bolagsstruktur. Vi skriver ut det tydligt här, eftersom en partner som genomför due diligence har rätt att veta vart vi är på väg, inte bara var vi står idag.',
    ],
    commitEyebrow: 'Åtaganden',
    commitTitle: 'Sex åtaganden',
    commitSub: 'Bara åtaganden som en kund faktiskt kan hålla oss ansvariga för.',
    commitments: [
      'Offentlig färdplan. Varje plattforms tre faser publiceras och uppdateras, med datum.',
      'Din data förblir din. Exportera all data i ett öppet format när som helst, kostnadsfritt och utan villkor.',
      'Avtalad support. Svarstider och supportfönster skrivs in i avtalet, inte lämnas som "enligt överenskommelse".',
      'Transparens vid due diligence. Vi delar finansiella rapporter, personallistor och arkitekturdokumentation med partner under utvärderingen.',
      'Ingen hårdvarulåsning. Vi levererar utrustning, men låser inte mjukvaran till vår egen hårdvara. Öppna standarder är default.',
      'Snabba beslut. Inga onödiga godkännandenivåer. Partner får direkt tillgång till teknikteamet och kan starta en POC så snart omfattningen är fastställd.',
    ],
    legalEyebrow: 'Juridik',
    legalTitle: 'Juridisk information',
    legal: [
      { label: 'Företagsnamn', value: 'No Than Agentic Company Limited' },
      { label: 'Organisationsnummer (MST)', value: '0111579329, förstaregistrerat 23 juli 2026' },
      { label: 'Adress', value: 'So 1, ngo 141/3, pho Le Van Hien, Dong Ngac, Hanoi, Vietnam' },
      { label: 'Juridisk företrädare', value: 'Herr Đào Duy Hưng' },
      { label: 'E-post', value: 'contact@nothanagentic.vn' },
      { label: 'Telefon', value: '+84 983 650 552' },
    ],
    ctaTitle: 'Vill du se mer innan ni går vidare?',
    ctaBody: 'Vi delar finansiella rapporter, personallistor och arkitekturdokumentation med partner under due diligence.',
    ctaButton: 'Kontakta oss',
  },
};

function pick(locale: string): Content {
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
        {/* 1. Intro / vision */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-caption font-mono uppercase tracking-wider text-orange-600">
              {t.eyebrow}
            </span>
            <h1 className="font-display text-h1 font-bold text-ink max-w-3xl">{t.h1}</h1>
            <p className="text-body text-navy-400 leading-relaxed max-w-2xl">{t.intro}</p>
          </div>
        </section>

        {/* 2. Team */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">
                {t.teamEyebrow}
              </span>
              <h2 className="font-display text-h2 font-bold text-ink">{t.teamTitle}</h2>
              <p className="text-body text-navy-400 leading-relaxed">{t.teamNote}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.team.map((row, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-line p-8"
                  style={{
                    clipPath:
                      'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange/10 text-orange rounded-full shrink-0">
                      <Users className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-display text-h3 font-semibold text-ink">{row.role}</h3>
                      <p className="text-body text-navy-400 leading-relaxed">{row.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Governance roadmap */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl space-y-6">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">
                {t.roadmapEyebrow}
              </span>
              <h2 className="font-display text-h2 font-bold text-ink">{t.roadmapTitle}</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-state-wait/40 bg-state-wait/10 text-caption font-mono uppercase tracking-wider text-state-wait">
                <GitBranch className="w-4 h-4" />
                {t.roadmapTag}
              </div>
              <div className="space-y-4 pt-2">
                {t.roadmapBody.map((p, idx) => (
                  <p key={idx} className="text-body text-navy-400 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Five (+1) commitments */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">
                {t.commitEyebrow}
              </span>
              <h2 className="font-display text-h2 font-bold text-ink">{t.commitTitle}</h2>
              <p className="text-body text-navy-400 leading-relaxed">{t.commitSub}</p>
            </div>
            <ul className="space-y-4">
              {t.commitments.map((c, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="p-1 bg-state-ok/10 text-state-ok rounded-full shrink-0 mt-0.5">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                  <span className="text-body text-ink leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Legal information */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">
                {t.legalEyebrow}
              </span>
              <h2 className="font-display text-h2 font-bold text-ink flex items-center gap-3">
                <Building2 className="w-6 h-6 text-orange" />
                {t.legalTitle}
              </h2>
            </div>
            <div className="max-w-2xl border border-line divide-y divide-line">
              {t.legal.map((row, idx) => {
                const Icon =
                  row.label.toLowerCase().includes('mail') || row.label.toLowerCase().includes('post')
                    ? Mail
                    : row.label.toLowerCase().includes('phone') ||
                      row.label.toLowerCase().includes('điện') ||
                      row.label.toLowerCase().includes('telefon')
                    ? Phone
                    : row.label.toLowerCase().includes('address') ||
                      row.label.toLowerCase().includes('địa') ||
                      row.label.toLowerCase().includes('adress')
                    ? MapPin
                    : Building2;
                return (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 p-5 bg-paper/40"
                  >
                    <div className="flex items-center gap-2.5 sm:w-40 shrink-0">
                      <Icon className="w-4 h-4 text-orange shrink-0" />
                      <span className="text-caption font-mono uppercase tracking-wider text-navy-400">
                        {row.label}
                      </span>
                    </div>
                    <span className="text-body text-ink">{row.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. CTA */}
        <section className="bg-ink py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-display text-h2 font-bold text-white">{t.ctaTitle}</h2>
            <p className="text-body text-white/70 leading-relaxed">{t.ctaBody}</p>
            <a
              href={`/${locale}#lead-capture`}
              className="inline-flex items-center justify-center px-6 py-3 bg-orange text-white font-semibold rounded hover:bg-orange-400 transition-colors"
            >
              {t.ctaButton}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <CommandPalette />
      <FloatingContact />
    </>
  );
}
