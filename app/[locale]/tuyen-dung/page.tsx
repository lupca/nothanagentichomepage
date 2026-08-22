import React from 'react';
import type { Metadata } from 'next';
import { Camera, Cable, Handshake, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';

interface JobPosting {
  id: string;
  icon: React.ElementType;
  tag: string;
  title: string;
  summary: string;
  work: string;
  benefits: string[];
  arrangement: string;
  employmentType: string[];
}

interface Content {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string[];
  officeNote: string;
  jobsEyebrow: string;
  jobsHeading: string;
  benefitsLabel: string;
  arrangementLabel: string;
  applyLabel: string;
  applyBody: string;
  applyEmail: string;
  jobs: JobPosting[];
}

const content: Record<'vi' | 'en', Content> = {
  vi: {
    metaTitle: 'Tuyển dụng — Nỏ Thần Agentic',
    metaDescription:
      'Nỏ Thần Agentic đang tìm kỹ sư Computer Vision/AI, kỹ sư Backend & tích hợp thiết bị, và chuyên viên giải pháp/triển khai cho VOMA.VN và SOAI.VN. Đội ngũ nhỏ, giai đoạn đầu, quyền hạn thực và tiếp cận trực tiếp hệ thống production.',
    eyebrow: 'Tuyển dụng',
    heading: 'Làm cùng một đội ngũ nhỏ, đang xây thật',
    intro: [
      'Chúng tôi là một nhóm nhỏ, đang ở giai đoạn đầu: một người phụ trách chung và vài kỹ sư phụ trách trực tiếp từng dịch vụ (VOMA.VN, SOAI.VN). Không có phòng nhân sự, không có nhiều tầng quản lý, không có đội ngũ "chuyên gia" đông đảo — chỉ có người làm thật và hệ thống đang chạy thật.',
      'Ở quy mô này, người vào sau tiếp cận trực tiếp kiến trúc hệ thống production, làm việc trực tiếp với khách hàng thật ngay từ đầu, và có ảnh hưởng rõ ràng lên hướng đi của sản phẩm.',
    ],
    officeNote:
      'Văn phòng làm việc tập trung (tầng 1, dự kiến hoàn thiện giữa hoặc cuối tháng 9) dùng cho họp kỹ thuật và nghiên cứu phần cứng; phần lớn công việc hiện tại được sắp xếp theo tiến độ từng dự án, không theo giờ hành chính cố định.',
    jobsEyebrow: 'Vị trí đang tuyển',
    jobsHeading: '3 vị trí, gắn với lộ trình thật của VOMA và SOAI',
    benefitsLabel: 'Những gì bạn sẽ có',
    arrangementLabel: 'Hình thức & đãi ngộ',
    applyLabel: 'Ứng tuyển',
    applyBody:
      'Gửi email giới thiệu ngắn về bản thân và (nếu có) một sản phẩm/đoạn code bạn tự hào. Không cần CV hình thức.',
    applyEmail: 'lienhe@nothanagentic.vn',
    jobs: [
      {
        id: 'cv-ai-engineer',
        icon: Camera,
        tag: 'SOAI.VN',
        title: 'Kỹ sư Computer Vision / AI',
        summary:
          'Mở rộng hệ thống thị giác máy tính của SOAI từ POC đã nghiệm thu sang các bài toán kiểm tra mới và triển khai tại biên (edge).',
        work:
          'SOAI đã có 6 module thị giác máy tính chạy được trên YOLOv8/SAHI (đếm SKU dày đặc) và VLM few-shot (kiểm tra đúng/sai định nghĩa bằng lời). Giai đoạn tới cần đưa các mô hình này chạy ổn định trên thiết bị biên, tối ưu tốc độ suy luận, và mở rộng sang các bài kiểm tra mới theo yêu cầu khách hàng — an toàn lao động, kiểm soát tồn kho, giám sát dây chuyền. Bạn sẽ làm việc trực tiếp trên pipeline production đang phục vụ khách hàng thật.',
        benefits: [
          'Trực tiếp làm việc với khách hàng thật của SOAI, không qua trung gian',
          'Tiếp cận sâu vào kiến trúc hệ thống production (DeviceProvider, pipeline suy luận, Celery)',
          'Lộ trình tăng vai trò và cổ phần/quản trị khi SOAI mở rộng quy mô',
        ],
        arrangement:
          'Part-time: hỗ trợ chi phí duy trì 3–5 triệu VNĐ/tháng (chính thức từ tháng 9). Full-time: hợp đồng lao động và đóng BHXH đầy đủ theo quy định. Đánh giá lại năng lực và thu nhập mỗi 3 tháng dựa trên đóng góp thực tế.',
        employmentType: ['PART_TIME', 'FULL_TIME'],
      },
      {
        id: 'backend-device-integration',
        icon: Cable,
        tag: 'SOAI.VN / VOMA.VN',
        title: 'Kỹ sư Backend & Tích hợp thiết bị',
        summary:
          'Mở rộng lớp DeviceProvider của SOAI để nói chuyện được với nhiều dòng camera/thiết bị hơn, và chuẩn bị hạ tầng backend cho giai đoạn tích hợp POS của VOMA.',
        work:
          'Hệ thống hiện dùng FastAPI và Celery, với một lớp trừu tượng DeviceProvider tách nguồn hình ảnh khỏi lõi phân tích. Công việc chính là viết thêm provider cho các giao thức camera công nghiệp mới (ONVIF, VAPIX, ISAPI) để mở rộng danh mục thiết bị hỗ trợ, đồng thời hỗ trợ giai đoạn 2 của VOMA — tích hợp cổng thanh toán và phần cứng bán lẻ (máy POS, máy quét mã vạch, thiết bị tạo mã QR).',
        benefits: [
          'Tiếp cận sâu vào kiến trúc hệ thống production đang chạy (FastAPI, Celery, mã hoá thông tin thiết bị)',
          'Trực tiếp tham gia giai đoạn tích hợp phần cứng mới của cả VOMA và SOAI',
          'Lộ trình tăng vai trò và cổ phần/quản trị khi dịch vụ mở rộng quy mô',
        ],
        arrangement:
          'Part-time: hỗ trợ chi phí duy trì 3–5 triệu VNĐ/tháng (chính thức từ tháng 9). Full-time: hợp đồng lao động và đóng BHXH đầy đủ theo quy định. Đánh giá lại năng lực và thu nhập mỗi 3 tháng dựa trên đóng góp thực tế.',
        employmentType: ['PART_TIME', 'FULL_TIME'],
      },
      {
        id: 'solutions-deployment-specialist',
        icon: Handshake,
        tag: 'VOMA.VN hoặc SOAI.VN',
        title: 'Chuyên viên Giải pháp / Triển khai',
        summary:
          'Làm việc trực tiếp với khách hàng để hiểu bài toán nghiệp vụ thật, thay vì chỉ nhận yêu cầu rồi giao lại cho kỹ sư.',
        work:
          'Vai trò này khảo sát và triển khai giải pháp tại cơ sở khách hàng cho VOMA (bán hàng đa kênh, kế toán, kho bãi) hoặc SOAI (giám sát sản xuất, an toàn lao động), tùy năng lực và nhu cầu ở từng thời điểm. Bạn sẽ trực tiếp gặp khách hàng, xác định yêu cầu thực tế, và phối hợp với kỹ sư để đưa giải pháp vào vận hành — thay vì chỉ chuyển tiếp một bản spec.',
        benefits: [
          'Trực tiếp làm việc với khách hàng thật ngay từ những dự án đầu tiên',
          'Tiếp cận kiến trúc hệ thống đang chạy production của cả VOMA và SOAI',
          'Lộ trình thăng tiến, tăng thu nhập và nhận cổ phần/vai trò quản trị khi dịch vụ mở rộng quy mô',
        ],
        arrangement:
          'Part-time: hỗ trợ chi phí duy trì 3–5 triệu VNĐ/tháng (chính thức từ tháng 9). Full-time: hợp đồng lao động và đóng BHXH đầy đủ theo quy định. Đánh giá lại năng lực và thu nhập mỗi 3 tháng dựa trên đóng góp thực tế và doanh thu dịch vụ.',
        employmentType: ['PART_TIME', 'FULL_TIME'],
      },
    ],
  },
  en: {
    metaTitle: 'Careers — Nỏ Thần Agentic',
    metaDescription:
      'Nỏ Thần Agentic is hiring a Computer Vision/AI engineer, a Backend & device integration engineer, and a Solutions/Deployment specialist for VOMA.VN and SOAI.VN. Small, early-stage team, real ownership, direct access to production systems.',
    eyebrow: 'Careers',
    heading: 'Join a small team that is actually building',
    intro: [
      'We are a small, early-stage team: one lead running the overall direction, and a handful of engineers each directly responsible for one service (VOMA.VN, SOAI.VN). No HR department, no layers of management, no large bench of "experts" — just people doing the work and systems that are actually running.',
      'At this size, anyone who joins gets direct access to the production system architecture, works with real customers from day one, and has a real say in product direction.',
    ],
    officeNote:
      'A dedicated ground-floor office (expected ready mid-to-late September) will be used for technical meetings and hardware research; most work today is scheduled around project deadlines, not fixed office hours.',
    jobsEyebrow: 'Open positions',
    jobsHeading: '3 roles, tied to the real VOMA and SOAI roadmap',
    benefitsLabel: 'What you get',
    arrangementLabel: 'Arrangement & compensation',
    applyLabel: 'Apply',
    applyBody:
      'Send a short email about yourself and, if you have one, a project or piece of code you are proud of. No formal CV required.',
    applyEmail: 'lienhe@nothanagentic.vn',
    jobs: [
      {
        id: 'cv-ai-engineer',
        icon: Camera,
        tag: 'SOAI.VN',
        title: 'Computer Vision / AI Engineer',
        summary:
          'Extend SOAI’s computer vision system from a validated POC into new inspection types and edge deployment.',
        work:
          "SOAI already runs 6 computer vision modules validated end to end, built on YOLOv8/SAHI (dense SKU counting) and a few-shot VLM (pass/fail checks defined in plain language). The next phase is getting these models running reliably on edge hardware, optimizing inference speed, and extending coverage to new inspection types customers are asking for — labor safety, inventory control, line monitoring. You'll work directly on the production pipeline already serving real customers.",
        benefits: [
          'Direct work with SOAI’s real customers, no middle layer',
          'Deep access to the production system architecture (DeviceProvider, inference pipeline, Celery)',
          'A path to a larger role and equity/leadership as SOAI scales',
        ],
        arrangement:
          'Part-time: a 3–5 million VND/month maintenance stipend (official from September). Full-time: a formal labor contract with full social insurance (BHXH) per regulations. Compensation is reviewed every 3 months based on actual contribution.',
        employmentType: ['PART_TIME', 'FULL_TIME'],
      },
      {
        id: 'backend-device-integration',
        icon: Cable,
        tag: 'SOAI.VN / VOMA.VN',
        title: 'Backend & Device Integration Engineer',
        summary:
          "Extend SOAI's DeviceProvider layer to talk to more camera/device protocols, and help build the backend for VOMA's upcoming POS integration phase.",
        work:
          'The system runs on FastAPI and Celery, with a DeviceProvider abstraction that decouples image sources from the analysis core. The core work is writing new providers for industrial camera protocols (ONVIF, VAPIX, ISAPI) to widen supported hardware, alongside supporting VOMA’s phase 2 — integrating payment gateways and retail hardware (POS terminals, barcode scanners, QR code devices).',
        benefits: [
          'Deep access to the live production architecture (FastAPI, Celery, encrypted device credentials)',
          'Direct involvement in new hardware integration for both VOMA and SOAI',
          'A path to a larger role and equity/leadership as the services scale',
        ],
        arrangement:
          'Part-time: a 3–5 million VND/month maintenance stipend (official from September). Full-time: a formal labor contract with full social insurance (BHXH) per regulations. Compensation is reviewed every 3 months based on actual contribution.',
        employmentType: ['PART_TIME', 'FULL_TIME'],
      },
      {
        id: 'solutions-deployment-specialist',
        icon: Handshake,
        tag: 'VOMA.VN or SOAI.VN',
        title: 'Solutions / Deployment Specialist',
        summary:
          'Work directly with customers to understand real business problems, rather than taking a spec and handing it off to engineers.',
        work:
          'This role scopes and deploys solutions on-site for VOMA (multi-channel sales, accounting, warehousing) or SOAI (production monitoring, labor safety), depending on capability and need at the time. You will meet customers directly, define real requirements, and work with engineers to get the solution into operation.',
        benefits: [
          'Direct work with real customers from the very first projects',
          'Access to the production system architecture of both VOMA and SOAI',
          'A path to promotion, higher compensation, and equity/leadership as the services scale',
        ],
        arrangement:
          'Part-time: a 3–5 million VND/month maintenance stipend (official from September). Full-time: a formal labor contract with full social insurance (BHXH) per regulations. Compensation is reviewed every 3 months based on contribution and service revenue.',
        employmentType: ['PART_TIME', 'FULL_TIME'],
      },
    ],
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en'] ?? content.en;
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

  const jobPostingsJsonLd = t.jobs.map((job) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.work,
    datePosted: '2026-08-22',
    validThrough: '2026-11-20',
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Nỏ Thần Agentic',
      sameAs: 'https://nothanagentic.vn',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hà Nội',
        addressCountry: 'VN',
      },
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingsJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-paper text-ink antialiased">
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">
                {t.eyebrow}
              </span>
              <h1 className="font-display text-2xl md:text-h1 font-bold text-ink">{t.heading}</h1>
            </div>
            <div className="max-w-2xl space-y-4">
              {t.intro.map((p, idx) => (
                <p key={idx} className="text-body text-navy-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <p className="text-caption font-mono text-navy-400 max-w-2xl leading-relaxed">
              {t.officeNote}
            </p>
          </div>
        </section>

        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24" aria-label={t.jobsHeading}>
          <div className="max-w-7xl mx-auto space-y-14">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">
                {t.jobsEyebrow}
              </span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.jobsHeading}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.jobs.map((job) => {
                const Icon = job.icon;
                return (
                  <div
                    key={job.id}
                    className="p-8 bg-paper border border-line flex flex-col gap-5"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-3 bg-ink rounded-lg w-fit">
                        <Icon className="w-6 h-6 text-orange" />
                      </div>
                      <span className="text-caption font-mono uppercase tracking-wider text-orange-600 text-right">
                        {job.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-h3 font-bold text-ink">{job.title}</h3>
                      <p className="text-body text-navy-400 leading-relaxed">{job.summary}</p>
                    </div>

                    <p className="text-body text-navy-400 leading-relaxed">{job.work}</p>

                    <div className="space-y-2">
                      <span className="text-caption font-mono uppercase tracking-wider text-navy-400">
                        {t.benefitsLabel}
                      </span>
                      <ul className="space-y-2">
                        {job.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-body text-navy-400 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-state-ok mt-1 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-line space-y-2">
                      <span className="text-caption font-mono uppercase tracking-wider text-navy-400">
                        {t.arrangementLabel}
                      </span>
                      <p className="text-caption text-navy-400 leading-relaxed">{job.arrangement}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-ink py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="max-w-2xl space-y-4">
            <h2 className="font-display text-2xl md:text-h2 font-bold text-white">{t.applyLabel}</h2>
            <p className="text-body text-white/70 leading-relaxed">{t.applyBody}</p>
            <a
              href={`mailto:${t.applyEmail}`}
              className="inline-flex items-center gap-2 text-body font-semibold text-orange hover:text-orange-400"
            >
              {t.applyEmail}
            </a>
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
