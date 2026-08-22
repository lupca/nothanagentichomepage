import type { Metadata } from 'next';
import Link from 'next/link';
import { KeyRound, ShieldAlert, Server, Lock, FileCheck, Users, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';

type Status = 'live' | 'poc' | 'roadmap';

interface RoadmapRow {
  item: string;
  status: Status;
  milestone: string;
}

interface Copy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  s1Eyebrow: string;
  s1Title: string;
  s1Body: string[];
  s2Eyebrow: string;
  s2Title: string;
  s2Body: string[];
  s3Eyebrow: string;
  s3Title: string;
  s3Body: string[];
  s4Eyebrow: string;
  s4Title: string;
  s4Body: string[];
  s5Eyebrow: string;
  s5Title: string;
  s5Body: string[];
  s6Eyebrow: string;
  s6Title: string;
  s6Body: string[];
  s7Eyebrow: string;
  s7Title: string;
  s7Intro: string;
  tableItem: string;
  tableStatus: string;
  tableMilestone: string;
  rows: RoadmapRow[];
  s7Note: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  statusLabel: Record<Status, string>;
}

const content: Record<'vi' | 'en' | 'sv', Copy> = {
  vi: {
    metaTitle: 'Bảo mật và chủ quyền dữ liệu | Nỏ Thần Agentic',
    metaDescription:
      'Cách Nỏ Thần Agentic xử lý dữ liệu hình ảnh, kiểm soát truy cập, mã hoá thông tin thiết bị, chặn path traversal và nguyên tắc "lỗi phải kêu" — cùng lộ trình tuân thủ trung thực cho đối tác thẩm định.',
    eyebrow: 'Bảo mật',
    h1: 'Bảo mật và chủ quyền dữ liệu',
    intro:
      'Với chúng tôi, bảo mật không phải một ô cần tick trong hồ sơ năng lực — đó là lý do hệ thống có thể chạy được trong mạng nhà máy mà hình ảnh sản xuất của khách hàng không cần rời khỏi cơ sở của họ. Trang này trình bày thẳng những câu hỏi mà một đội thẩm định kỹ thuật thường đặt ra, kèm trạng thái thực tế — không tô vẽ.',
    s1Eyebrow: 'Vị trí dữ liệu',
    s1Title: 'Dữ liệu lưu ở đâu?',
    s1Body: [
      'Hệ thống có thể triển khai hoàn toàn on-premises — trong mạng nội bộ của khách hàng, không cần kết nối ra Internet để hoạt động.',
      'Suy luận AI được thực hiện tại biên (edge inference), ngay trên hộp xử lý đặt tại nhà máy hoặc trên camera. Nhờ vậy, hình ảnh và video sản xuất không nhất thiết phải rời khỏi cơ sở của khách hàng để được phân tích.',
    ],
    s2Eyebrow: 'Kiểm soát truy cập',
    s2Title: 'Ai xem được gì?',
    s2Body: [
      'Hệ thống áp dụng kiểm soát truy cập theo vai trò (role-based access control): mỗi người dùng được cấp quyền riêng theo vị trí công việc, thay vì một tài khoản dùng chung có toàn quyền.',
      'Quyền xem live view, snapshot, video lưu trữ hay cấu hình thiết bị được phân theo vai trò, giúp giới hạn phạm vi tiếp cận dữ liệu nhạy cảm ở mức cần thiết.',
    ],
    s3Eyebrow: 'Mã hoá',
    s3Title: 'Mã hoá thế nào?',
    s3Body: [
      'Thông tin đăng nhập thiết bị (tài khoản, mật khẩu camera) được mã hoá tại chỗ (at-rest) bằng thuật toán đối xứng Fernet trước khi lưu vào cơ sở dữ liệu — không lưu ở dạng plaintext.',
      'Dữ liệu truyền đi được bảo vệ bằng SSL/TLS theo thực hành tiêu chuẩn, áp dụng cho các kết nối giữa client, máy chủ và thiết bị.',
    ],
    s4Eyebrow: 'An toàn API',
    s4Title: 'Chống tấn công qua đường dẫn file (path traversal)',
    s4Body: [
      'Mọi API cho phép xem hoặc tải tệp — ảnh snapshot, video ghi lại, file xuất báo cáo — đều kiểm tra và chuẩn hoá đường dẫn trước khi trả file về cho client.',
      'Cách làm này chặn một trong những lỗ hổng phổ biến nhất của hệ thống quản lý file: dùng ký tự "../" hoặc đường dẫn tuyệt đối để đọc file nằm ngoài phạm vi được phép.',
    ],
    s5Eyebrow: 'Nguyên tắc engineering',
    s5Title: 'Xử lý sự cố ra sao?',
    s5Body: [
      'Chúng tôi theo nguyên tắc "lỗi phải kêu": không có đường fallback âm thầm, không nuốt exception. Toàn bộ hệ thống dùng một hệ thống ngoại lệ tuỳ biến (SOAIException) — mọi sự cố đều bật lên thành lỗi rõ ràng, kèm HTTP response tuân thủ chuẩn RFC và ghi log chi tiết.',
      'Vì sao điều này quan trọng với bảo mật: một exception bị nuốt âm thầm có thể che giấu chính xác thứ mà một đội bảo mật cần nhìn thấy — một truy cập bất thường, một lỗi toàn vẹn dữ liệu, hay dấu hiệu sớm của một cuộc xâm nhập. Hệ thống báo lỗi rõ ràng và ghi log đầy đủ giúp sự cố được phát hiện và điều tra, thay vì bị che khuất sau một kết quả trông có vẻ bình thường.',
    ],
    s6Eyebrow: '',
    s6Title: '',
    s6Body: [],
    s7Eyebrow: 'Trung thực với đối tác',
    s7Title: 'Lộ trình tuân thủ',
    s7Intro:
      'Nỏ Thần Agentic hiện chưa nắm giữ các chứng nhận như ISO/IEC 27001 hay SOC 2. Chúng tôi nói rõ điều này ngay từ đầu vì cho rằng một hồ sơ trung thực, có trạng thái rõ ràng, đáng tin hơn một hồ sơ trông "đủ" nhưng không chịu được kiểm tra. Bảng dưới đây phản ánh đúng thực trạng hiện tại.',
    tableItem: 'Mục',
    tableStatus: 'Trạng thái',
    tableMilestone: 'Mốc dự kiến',
    rows: [
      { item: 'Mã hoá dữ liệu tại chỗ (Fernet)', status: 'live', milestone: 'Đã áp dụng trong sản phẩm' },
      { item: 'Kiểm soát truy cập theo vai trò', status: 'live', milestone: 'Đã áp dụng trong sản phẩm' },
      { item: 'Chặn path traversal trên API file', status: 'live', milestone: 'Đã áp dụng trong sản phẩm' },
      { item: 'Ngoại lệ minh bạch (SOAIException) & log', status: 'live', milestone: 'Đã áp dụng trong sản phẩm' },
      { item: 'Chứng nhận ISO/IEC 27001', status: 'roadmap', milestone: 'Đang xây dựng lộ trình, chưa có mốc công bố' },
      { item: 'Chứng nhận SOC 2', status: 'roadmap', milestone: 'Đang xây dựng lộ trình, chưa có mốc công bố' },
    ],
    s7Note:
      'Chúng tôi không hiển thị logo hay huy hiệu chứng nhận nào mà mình chưa thực sự đạt được. Nếu quy trình thẩm định của đối tác yêu cầu bằng chứng cụ thể hơn cho từng dòng ở trên, chúng tôi sẵn sàng cung cấp tài liệu kỹ thuật chi tiết theo yêu cầu.',
    ctaTitle: 'Cần xem hồ sơ bảo mật chi tiết hơn?',
    ctaBody:
      'Chúng tôi có thể cung cấp tài liệu kỹ thuật chi tiết về kiến trúc, mã hoá, kiểm soát truy cập và quy trình xử lý sự cố cho đội thẩm định của đối tác.',
    ctaButton: 'Yêu cầu tài liệu bảo mật chi tiết',
    statusLabel: { live: 'đang chạy', poc: 'poc', roadmap: 'lộ trình' },
  },
  en: {
    metaTitle: 'Security & Data Sovereignty | Nỏ Thần Agentic',
    metaDescription:
      'How Nỏ Thần Agentic handles video data, access control, device credential encryption, path-traversal protection, and the "errors must be loud" principle — plus an honest compliance roadmap for partner due diligence.',
    eyebrow: 'Security',
    h1: 'Security and data sovereignty',
    intro:
      'For us, security is not a checkbox on a capability sheet — it is the reason the system can run inside a factory network without a customer\'s production footage ever having to leave their premises. This page answers the questions a technical due-diligence team typically asks, with real status attached — no polish.',
    s1Eyebrow: 'Data location',
    s1Title: 'Where is data stored?',
    s1Body: [
      'The system can be deployed fully on-premises — inside the customer\'s own network, with no internet connection required to operate.',
      'AI inference runs at the edge, on a processing box on the factory floor or on the camera itself. As a result, production footage does not have to leave the customer\'s premises to be analyzed.',
    ],
    s2Eyebrow: 'Access control',
    s2Title: 'Who can see what?',
    s2Body: [
      'The system applies role-based access control: each user is granted permissions specific to their job function, rather than a single shared account with full access.',
      'Access to live view, snapshots, stored video, and device configuration is segmented by role, limiting exposure of sensitive data to what is actually needed.',
    ],
    s3Eyebrow: 'Encryption',
    s3Title: 'How is data encrypted?',
    s3Body: [
      'Device credentials (camera usernames and passwords) are encrypted at rest using Fernet symmetric encryption before being written to the database — never stored as plaintext.',
      'Data in transit is protected via SSL/TLS as standard practice, applied to connections between clients, the server, and devices.',
    ],
    s4Eyebrow: 'API safety',
    s4Title: 'Path traversal protection',
    s4Body: [
      'Every API that serves or downloads a file — snapshots, recorded video, exported reports — validates and normalizes the requested path before returning the file to the client.',
      'This closes one of the most common vulnerabilities in file-serving systems: using "../" sequences or absolute paths to read files outside the permitted scope.',
    ],
    s5Eyebrow: 'Engineering principle',
    s5Title: 'How are faults handled?',
    s5Body: [
      'We follow an "errors must be loud" principle: no silent fallback, no swallowed exceptions. The whole system runs on a custom exception hierarchy (SOAIException) — every fault surfaces as an explicit error, with an RFC-compliant HTTP response and a detailed log entry.',
      'Why this matters for security specifically: a silently swallowed exception can hide exactly what a security team needs to see — an abnormal access pattern, a data-integrity fault, or an early sign of a breach. Loud errors and complete logs mean an incident gets noticed and investigated, instead of being masked behind a result that merely looks normal.',
    ],
    s6Eyebrow: '',
    s6Title: '',
    s6Body: [],
    s7Eyebrow: 'Honesty with partners',
    s7Title: 'Compliance roadmap',
    s7Intro:
      'Nỏ Thần Agentic does not currently hold certifications such as ISO/IEC 27001 or SOC 2. We state this upfront, because we believe an honest profile with clear status beats one that looks "complete" but cannot withstand scrutiny. The table below reflects the actual current state.',
    tableItem: 'Item',
    tableStatus: 'Status',
    tableMilestone: 'Expected milestone',
    rows: [
      { item: 'Encryption at rest (Fernet)', status: 'live', milestone: 'Implemented in production' },
      { item: 'Role-based access control', status: 'live', milestone: 'Implemented in production' },
      { item: 'Path-traversal protection on file APIs', status: 'live', milestone: 'Implemented in production' },
      { item: 'Explicit exception handling (SOAIException) & logging', status: 'live', milestone: 'Implemented in production' },
      { item: 'ISO/IEC 27001 certification', status: 'roadmap', milestone: 'Roadmap being scoped, no public date yet' },
      { item: 'SOC 2 certification', status: 'roadmap', milestone: 'Roadmap being scoped, no public date yet' },
    ],
    s7Note:
      'We do not display any certification badge or logo we have not actually earned. If a partner\'s due-diligence process needs more specific evidence for any line above, we are glad to provide detailed technical documentation on request.',
    ctaTitle: 'Need more detailed security documentation?',
    ctaBody:
      'We can provide detailed technical documentation on architecture, encryption, access control, and incident handling for a partner\'s due-diligence team.',
    ctaButton: 'Request detailed security documentation',
    statusLabel: { live: 'in production', poc: 'proven in POC', roadmap: 'on roadmap' },
  },
  sv: {
    metaTitle: 'Säkerhet och datasuveränitet | Nỏ Thần Agentic',
    metaDescription:
      'Hur Nỏ Thần Agentic hanterar videodata, åtkomstkontroll, kryptering av enhetsuppgifter, skydd mot path traversal och principen att fel alltid ska synas — samt en ärlig efterlevnadsplan för partnerns due diligence.',
    eyebrow: 'Säkerhet',
    h1: 'Säkerhet och datasuveränitet',
    intro:
      'För oss är säkerhet inte en ruta att kryssa i på ett kompetensblad — det är anledningen till att systemet kan köras inne i ett fabriksnätverk utan att kundens produktionsbilder någonsin behöver lämna anläggningen. Den här sidan går rakt på de frågor ett tekniskt due diligence-team brukar ställa, med verklig status — utan polish.',
    s1Eyebrow: 'Datalagring',
    s1Title: 'Var lagras data?',
    s1Body: [
      'Systemet kan driftsättas helt on-premises — inne i kundens eget nätverk, utan att internetuppkoppling krävs för drift.',
      'AI-inferens körs vid kanten (edge inference), direkt på en processorenhet på fabriksgolvet eller på kameran själv. Det innebär att produktionsbilder inte behöver lämna kundens anläggning för att analyseras.',
    ],
    s2Eyebrow: 'Åtkomstkontroll',
    s2Title: 'Vem kan se vad?',
    s2Body: [
      'Systemet tillämpar rollbaserad åtkomstkontroll (role-based access control): varje användare tilldelas behörigheter utifrån sin arbetsroll, i stället för ett delat konto med full åtkomst.',
      'Åtkomst till livevy, ögonblicksbilder, lagrad video och enhetskonfiguration är uppdelad per roll, vilket begränsar exponeringen av känslig data till vad som faktiskt behövs.',
    ],
    s3Eyebrow: 'Kryptering',
    s3Title: 'Hur krypteras data?',
    s3Body: [
      'Enhetsuppgifter (kamerans användarnamn och lösenord) krypteras at rest med symmetrisk Fernet-kryptering innan de skrivs till databasen — de lagras aldrig i klartext.',
      'Data i transit skyddas med SSL/TLS som standardpraxis, tillämpat på anslutningar mellan klient, server och enheter.',
    ],
    s4Eyebrow: 'API-säkerhet',
    s4Title: 'Skydd mot path traversal',
    s4Body: [
      'Varje API som visar eller levererar en fil — ögonblicksbilder, inspelad video, exporterade rapporter — validerar och normaliserar den begärda sökvägen innan filen returneras till klienten.',
      'Detta stänger en av de vanligaste sårbarheterna i filhanteringssystem: att använda "../"-sekvenser eller absoluta sökvägar för att läsa filer utanför den tillåtna omfattningen.',
    ],
    s5Eyebrow: 'Ingenjörsprincip',
    s5Title: 'Hur hanteras fel?',
    s5Body: [
      'Vi följer principen att fel alltid ska synas: ingen tyst fallback, inga nedsvalda undantag (swallowed exceptions). Hela systemet bygger på en egen exception-hierarki (SOAIException) — varje fel exponeras som ett tydligt fel, med ett RFC-kompatibelt HTTP-svar och en detaljerad loggpost.',
      'Varför detta är särskilt viktigt för säkerheten: ett tyst nedsvalt undantag kan dölja precis det ett säkerhetsteam behöver se — ett avvikande åtkomstmönster, ett dataintegritetsfel, eller ett tidigt tecken på ett intrång. Tydliga felmeddelanden och fullständig loggning gör att en incident upptäcks och utreds, i stället för att döljas bakom ett resultat som bara ser normalt ut.',
    ],
    s6Eyebrow: '',
    s6Title: '',
    s6Body: [],
    s7Eyebrow: 'Ärlighet mot partner',
    s7Title: 'Efterlevnadsplan',
    s7Intro:
      'Nỏ Thần Agentic innehar för närvarande inte certifieringar som ISO/IEC 27001 eller SOC 2. Vi säger det rakt ut, eftersom vi tror att en ärlig profil med tydlig status är mer värd än en som ser "komplett" ut men inte klarar en granskning. Tabellen nedan speglar det faktiska nuläget.',
    tableItem: 'Punkt',
    tableStatus: 'Status',
    tableMilestone: 'Planerad milstolpe',
    rows: [
      { item: 'Kryptering av data at rest (Fernet)', status: 'live', milestone: 'Implementerat i produktion' },
      { item: 'Rollbaserad åtkomstkontroll', status: 'live', milestone: 'Implementerat i produktion' },
      { item: 'Skydd mot path traversal i filAPI:er', status: 'live', milestone: 'Implementerat i produktion' },
      { item: 'Explicit felhantering (SOAIException) och loggning', status: 'live', milestone: 'Implementerat i produktion' },
      { item: 'ISO/IEC 27001-certifiering', status: 'roadmap', milestone: 'Planering pågår, inget publikt datum ännu' },
      { item: 'SOC 2-certifiering', status: 'roadmap', milestone: 'Planering pågår, inget publikt datum ännu' },
    ],
    s7Note:
      'Vi visar aldrig en certifieringsbadge eller logotyp som vi inte faktiskt har uppnått. Om en partners due diligence-process kräver mer specifik dokumentation för någon av punkterna ovan, tillhandahåller vi gärna detaljerad teknisk dokumentation på begäran.',
    ctaTitle: 'Behöver ni mer detaljerad säkerhetsdokumentation?',
    ctaBody:
      'Vi kan tillhandahålla detaljerad teknisk dokumentation om arkitektur, kryptering, åtkomstkontroll och incidenthantering till en partners due diligence-team.',
    ctaButton: 'Begär detaljerad säkerhetsdokumentation',
    statusLabel: { live: 'i drift', poc: 'poc', roadmap: 'på färdplanen' },
  },
};

function pick(locale: string): Copy {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

const STATUS_CLASS: Record<Status, string> = {
  live: 'text-state-ok border-state-ok',
  poc: 'text-state-wait border-state-wait',
  roadmap: 'text-navy-400 border-navy-400',
};

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

  const StatusTag = ({ status }: { status: Status }) => (
    <span
      className={`inline-block whitespace-nowrap text-caption font-mono uppercase tracking-wide px-2 py-0.5 border ${STATUS_CLASS[status]}`}
    >
      {t.statusLabel[status]}
    </span>
  );

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

        {/* 2. Where is data stored */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-3">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.s1Eyebrow}</span>
              <h2 className="font-display text-h2 font-bold text-ink flex items-center gap-3">
                <Server className="w-6 h-6 text-orange-600" aria-hidden="true" />
                {t.s1Title}
              </h2>
            </div>
            <div className="space-y-4">
              {t.s1Body.map((p, i) => (
                <p key={i} className="text-body text-navy-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Who sees what */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-3">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.s2Eyebrow}</span>
              <h2 className="font-display text-h2 font-bold text-ink flex items-center gap-3">
                <Users className="w-6 h-6 text-orange-600" aria-hidden="true" />
                {t.s2Title}
              </h2>
            </div>
            <div className="space-y-4">
              {t.s2Body.map((p, i) => (
                <p key={i} className="text-body text-navy-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Encryption */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-3">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.s3Eyebrow}</span>
              <h2 className="font-display text-h2 font-bold text-ink flex items-center gap-3">
                <KeyRound className="w-6 h-6 text-orange-600" aria-hidden="true" />
                {t.s3Title}
              </h2>
            </div>
            <div className="space-y-4">
              {t.s3Body.map((p, i) => (
                <p key={i} className="text-body text-navy-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Path traversal */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-3">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.s4Eyebrow}</span>
              <h2 className="font-display text-h2 font-bold text-ink flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-orange-600" aria-hidden="true" />
                {t.s4Title}
              </h2>
            </div>
            <div className="space-y-4">
              {t.s4Body.map((p, i) => (
                <p key={i} className="text-body text-navy-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Incident handling — on dark ink background, echoing Security.tsx */}
        <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-3">
              <span className="text-caption font-mono uppercase tracking-wider text-orange">{t.s5Eyebrow}</span>
              <h2 className="font-display text-h2 font-bold text-white flex items-center gap-3">
                <Lock className="w-6 h-6 text-orange" aria-hidden="true" />
                {t.s5Title}
              </h2>
            </div>
            <div className="space-y-4">
              {t.s5Body.map((p, i) => (
                <p key={i} className="text-body text-paper/80 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Compliance roadmap — the critical, most-scrutinized section */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.s7Eyebrow}</span>
              <h2 className="font-display text-h2 font-bold text-ink flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-orange-600" aria-hidden="true" />
                {t.s7Title}
              </h2>
              <p className="text-body text-navy-400 leading-relaxed max-w-3xl">{t.s7Intro}</p>
            </div>

            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[560px] text-body">
                <thead>
                  <tr className="bg-paper">
                    <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">
                      {t.tableItem}
                    </th>
                    <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line whitespace-nowrap">
                      {t.tableStatus}
                    </th>
                    <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">
                      {t.tableMilestone}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((row, idx) => (
                    <tr key={idx} className="border-b border-line last:border-b-0">
                      <td className="px-4 py-3.5 font-semibold text-ink align-top">{row.item}</td>
                      <td className="px-4 py-3.5 align-top">
                        <StatusTag status={row.status} />
                      </td>
                      <td className="px-4 py-3.5 text-navy-400 align-top">{row.milestone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="p-6 bg-paper border border-line flex items-start gap-4"
              style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
            >
              <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-body text-navy-400 leading-relaxed">{t.s7Note}</p>
            </div>
          </div>
        </section>

        {/* 8. CTA */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-display text-h2 font-bold text-ink">{t.ctaTitle}</h2>
            <p className="text-body text-navy-400 leading-relaxed max-w-2xl mx-auto">{t.ctaBody}</p>
            <Link
              href={`/${locale}#lead-capture`}
              className="inline-block bg-orange text-white font-display font-bold px-8 py-4 hover:bg-orange-600 transition-colors"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
            >
              {t.ctaButton}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <CommandPalette />
      <FloatingContact />
    </>
  );
}
