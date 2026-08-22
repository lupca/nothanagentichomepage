import React from 'react';
import type { Metadata } from 'next';
import {
  Camera,
  Cable,
  BrainCircuit,
  Layers,
  Server,
  MonitorCheck,
  Cpu,
  Cloud,
  FlaskConical,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';

type Status = 'live' | 'poc' | 'roadmap';

interface DeviceRow {
  device: string;
  interfaces: string;
  status: Status;
  note: string;
}

interface Locale {
  metaTitle: string;
  metaDescription: string;
  eyebrowIntro: string;
  h1: string;
  introParagraph: string;
  eyebrowArch: string;
  archTitle: string;
  archIntro: string;
  pipeline: { icon: React.ElementType; title: string; sub: string; highlight?: boolean }[];
  abstractionTitle: string;
  abstractions: { icon: React.ElementType; title: string; body: string }[];
  eyebrowStrategy: string;
  strategyTitle: string;
  strategyIntro: string;
  serverCard: { status: Status; title: string; pros: string; note: string };
  edgeCard: { status: Status; title: string; pros: string; note: string };
  eyebrowMatrix: string;
  matrixTitle: string;
  matrixIntro: string;
  matrixHeaders: { device: string; interfaces: string; status: string; note: string };
  deviceRows: DeviceRow[];
  eyebrowTesting: string;
  testingTitle: string;
  testingIntro: string;
  testingStats: { value: string; label: string }[];
  eyebrowPrinciples: string;
  principlesTitle: string;
  principlesBody: string;
  principlesBody2: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

const STATUS_LABEL: Record<'vi' | 'en', Record<Status, string>> = {
  vi: { live: 'đang chạy', poc: 'poc', roadmap: 'lộ trình' },
  en: { live: 'in production', poc: 'proven in poc', roadmap: 'on roadmap' },
};

const STATUS_CLASS: Record<Status, string> = {
  live: 'text-state-ok border-state-ok',
  poc: 'text-state-wait border-state-wait',
  roadmap: 'text-navy-400 border-navy-400',
};

const content: { vi: Locale; en: Locale } = {
  vi: {
    metaTitle: 'Công nghệ — Kiến trúc kỹ thuật | Nỏ Thần Agentic',
    metaDescription:
      'Kiến trúc hệ thống SOAI: hai lớp trừu tượng DeviceProvider và AnalysisEngine, chiến lược suy luận biên/máy chủ, ma trận tích hợp thiết bị, phương pháp kiểm thử và hệ phân cấp ngoại lệ SOAIException.',
    eyebrowIntro: 'Kiến trúc kỹ thuật',
    h1: 'Công nghệ',
    introParagraph:
      'Hệ thống được xây trên hai lớp trừu tượng tách biệt hoàn toàn khỏi lõi xử lý: một cho nguồn ảnh (thiết bị), một cho năng lực phân tích (mô hình AI/CV). Cách chia này cho phép hệ thống mở rộng sang phần cứng mới hoặc bài toán kiểm tra mới bằng cách viết thêm plugin, để yên lõi đã kiểm thử.',
    eyebrowArch: 'Luồng xử lý',
    archTitle: 'Kiến trúc pipeline',
    archIntro:
      'Một sự kiện đi từ thiết bị vật lý đến màn hình vận hành qua sáu chặng. Hai chặng ở giữa — DeviceProvider và AnalysisEngine — là điểm mở duy nhất của hệ thống.',
    pipeline: [
      { icon: Camera, title: 'Thiết bị', sub: 'Camera IP · máy POS · máy quét mã' },
      { icon: Cable, title: 'DeviceProvider', sub: 'Lớp trừu tượng nguồn ảnh', highlight: true },
      { icon: BrainCircuit, title: 'AnalysisEngine', sub: 'Lớp trừu tượng phân tích AI/CV', highlight: true },
      { icon: Layers, title: 'Hàng đợi xử lý bất đồng bộ', sub: 'Celery worker' },
      { icon: Server, title: 'API', sub: 'FastAPI' },
      { icon: MonitorCheck, title: 'Giao diện vận hành', sub: 'React' },
    ],
    abstractionTitle: 'Vì sao có hai lớp trừu tượng',
    abstractions: [
      {
        icon: Cable,
        title: 'DeviceProvider',
        body:
          'Tách hoàn toàn logic lấy hình ảnh/video khỏi phần còn lại của hệ thống. Thêm một dòng camera mới, một đầu đọc mã, hay một máy POS nghĩa là viết một provider mới tuân theo interface có sẵn — không đụng đến worker, API hay giao diện đang chạy production.',
      },
      {
        icon: BrainCircuit,
        title: 'AnalysisEngine',
        body:
          'Tách logic suy luận (mô hình đếm vật thể, phân loại đúng/sai, mô hình ngôn ngữ-thị giác) khỏi phần điều phối tác vụ. Một nghiệp vụ kiểm tra mới là một engine mới cắm vào cùng interface; pipeline giữ nguyên.',
      },
    ],
    eyebrowStrategy: 'Suy luận biên hay máy chủ',
    strategyTitle: 'Chiến lược suy luận: biên vs. máy chủ',
    strategyIntro:
      'Đây là một đánh đổi kỹ thuật thật, không có lựa chọn đúng tuyệt đối. Chúng tôi triển khai suy luận tại máy chủ trước vì nó cho vòng lặp cập nhật mô hình nhanh nhất, và để ngỏ đường sang suy luận tại biên cho các trường hợp mà chính sách dữ liệu hoặc băng thông không cho phép.',
    serverCard: {
      status: 'poc',
      title: 'Suy luận tại máy chủ',
      pros: 'Cập nhật mô hình tức thời cho toàn bộ hệ thống, không cần đẩy firmware xuống từng thiết bị. Dễ giám sát, dễ rollback.',
      note: 'Cần băng thông ổn định để đẩy hình ảnh/video lên, và có độ trễ mạng cộng thêm vào SLA xử lý.',
    },
    edgeCard: {
      status: 'roadmap',
      title: 'Suy luận tại biên (ví dụ: Axis ACAP)',
      pros: 'Chưa triển khai. Nếu làm, độ trễ sẽ thấp hơn và hình ảnh không cần rời khỏi thiết bị — phù hợp khi chính sách dữ liệu khách hàng cấm đưa hình sản xuất ra ngoài mạng nội bộ.',
      note: 'Cập nhật mô hình sẽ phức tạp hơn (đóng gói và nạp lại theo từng thiết bị/hãng), và bị giới hạn bởi tài nguyên tính toán trên chip biên.',
    },
    eyebrowMatrix: 'Tích hợp mở',
    matrixTitle: 'Ma trận tích hợp thiết bị & giao thức',
    matrixIntro:
      'Trạng thái hiện tại của từng dòng thiết bị. "POC" nghĩa là đã tích hợp và kiểm thử trong môi trường thử nghiệm nội bộ. Chưa có quan hệ đối tác chính thức với hãng ở mức này.',
    matrixHeaders: { device: 'Dòng thiết bị', interfaces: 'Giao diện tích hợp', status: 'Trạng thái', note: 'Ghi chú' },
    deviceRows: [
      {
        device: 'Camera IP chuẩn mở',
        interfaces: 'ONVIF Profile S · RTSP',
        status: 'live',
        note: 'Live view, snapshot định kỳ, ghi và trích xuất clip theo mốc thời gian.',
      },
      {
        device: 'Axis',
        interfaces: 'VAPIX · ONVIF',
        status: 'poc',
        note: 'Điều khiển thiết bị và lấy luồng hình đã kiểm thử trong POC nội bộ. Chưa có quan hệ đối tác chính thức với Axis.',
      },
      {
        device: 'Axis — AI tại biên',
        interfaces: 'ACAP',
        status: 'roadmap',
        note: 'Đưa AnalysisEngine chạy trực tiếp trên camera qua nền tảng ACAP. Định hướng kỹ thuật, chưa triển khai.',
      },
      {
        device: 'Hikvision',
        interfaces: 'ISAPI · SDK',
        status: 'poc',
        note: 'Tích hợp luồng hình và quản lý thiết bị đã kiểm thử trong POC nội bộ.',
      },
      {
        device: 'Hộp xử lý biên',
        interfaces: 'x86 · NVIDIA Jetson',
        status: 'poc',
        note: 'Suy luận tại chỗ khi băng thông hoặc chính sách dữ liệu không cho phép đẩy hình lên máy chủ.',
      },
      {
        device: 'Thiết bị bán hàng',
        interfaces: 'POS · máy quét mã · in QR',
        status: 'roadmap',
        note: 'Thuộc giai đoạn kế tiếp của nền tảng, hướng tới kiểm soát hàng hoá tại điểm bán.',
      },
    ],
    eyebrowTesting: 'Phương pháp kiểm thử',
    testingTitle: '126/126 kịch bản test tự động',
    testingIntro:
      'Kiểm định độc lập trên 8 test suite, bao phủ từ unit test của từng module đến toàn bộ luồng dữ liệu và các kịch bản đầu vào lỗi.',
    testingStats: [
      { value: '10', label: 'Suite unit/integration backend — Models, Engines, Workers, APIs' },
      { value: '99', label: 'Kịch bản E2E — toàn bộ luồng Upload → Process → Storage → Query' },
      { value: '27', label: 'Test áp lực & dữ liệu bất thường — file hỏng, mã QR mờ, mất kết nối mạng' },
    ],
    eyebrowPrinciples: 'Nguyên tắc engineering',
    principlesTitle: 'Xử lý lỗi minh bạch',
    principlesBody:
      'Hệ thống không có đường fallback âm thầm và không nuốt exception ở bất kỳ tầng nào. Toàn bộ lỗi nghiệp vụ và lỗi hệ thống đi qua một hệ phân cấp ngoại lệ dùng riêng — SOAIException — để đảm bảo mọi sự cố (DB lỗi, file hỏng, mã QR mờ, FFmpeg thất bại, mất kết nối camera) đều quăng ra lỗi minh bạch, không bị bắt và bỏ qua.',
    principlesBody2:
      'Mỗi lỗi trả về một HTTP response tuân theo chuẩn RFC kèm mã lỗi rõ nghĩa, đồng thời ghi log chi tiết ở phía server. Trong giám sát sản xuất, một con số sai mà không ai biết là sai luôn tệ hơn một lỗi hiện ra ngay lập tức.',
    ctaTitle: 'Muốn xem sâu hơn?',
    ctaBody:
      'Chúng tôi có thể trao đổi trực tiếp với đội kỹ thuật của bạn về kiến trúc, kết quả kiểm thử, hoặc khả năng tích hợp với thiết bị cụ thể.',
    ctaPrimary: 'Trao đổi với đội kỹ thuật',
    ctaSecondary: 'Xem tài liệu kỹ thuật đầy đủ',
  },
  en: {
    metaTitle: 'Technology — Technical Architecture | Nỏ Thần Agentic',
    metaDescription:
      'System architecture behind SOAI: the DeviceProvider and AnalysisEngine abstraction layers, edge vs. server inference strategy, device integration matrix, testing methodology, and the SOAIException error hierarchy.',
    eyebrowIntro: 'Technical architecture',
    h1: 'Technology',
    introParagraph:
      'The system is built on two abstraction layers, fully decoupled from the processing core: one for image sources (devices), one for analysis capability (AI/CV models). This split lets the system extend to new hardware or new inspection tasks by writing a plugin, not by touching an already-tested core.',
    eyebrowArch: 'Processing flow',
    archTitle: 'Pipeline architecture',
    archIntro:
      'An event travels from a physical device to the operator dashboard through six stages. The two middle stages — DeviceProvider and AnalysisEngine — are the only extension points in the system.',
    pipeline: [
      { icon: Camera, title: 'Device', sub: 'IP camera · POS terminal · barcode scanner' },
      { icon: Cable, title: 'DeviceProvider', sub: 'Image-source abstraction layer', highlight: true },
      { icon: BrainCircuit, title: 'AnalysisEngine', sub: 'AI/CV analysis abstraction layer', highlight: true },
      { icon: Layers, title: 'Async processing queue', sub: 'Celery worker' },
      { icon: Server, title: 'API', sub: 'FastAPI' },
      { icon: MonitorCheck, title: 'Operator dashboard', sub: 'React' },
    ],
    abstractionTitle: 'Why two abstraction layers exist',
    abstractions: [
      {
        icon: Cable,
        title: 'DeviceProvider',
        body:
          'Fully decouples image/video acquisition from the rest of the system. Adding a new camera brand, a barcode reader, or a POS terminal means writing a new provider against the existing interface — no changes to the workers, the API, or the UI already running in production.',
      },
      {
        icon: BrainCircuit,
        title: 'AnalysisEngine',
        body:
          'Decouples inference logic (object counting, pass/fail classification, vision-language checks) from task orchestration. A new inspection task is a new engine plugged into the same interface, and the pipeline stays unchanged.',
      },
    ],
    eyebrowStrategy: 'Edge vs. server inference',
    strategyTitle: 'Inference strategy: edge vs. server',
    strategyIntro:
      'This is a real engineering trade-off with no single correct answer. We shipped server-side inference first because it gives the fastest model-update loop, and we are keeping the door open to edge inference for cases where data policy or bandwidth rules it out.',
    serverCard: {
      status: 'poc',
      title: 'Server-side inference',
      pros: 'Model updates roll out instantly across the whole fleet, no firmware push to individual devices. Easier to monitor and roll back.',
      note: 'Requires stable bandwidth to upload footage, and network latency adds to the processing SLA.',
    },
    edgeCard: {
      status: 'roadmap',
      title: 'Edge inference (e.g. Axis ACAP)',
      pros: 'Not yet implemented. If built, latency would drop and footage would stay on the device — for cases where a customer\'s data policy forbids sending production footage off-site.',
      note: 'Model updates would be more involved (packaging and pushing per device/vendor), and computation would be constrained by the edge chip.',
    },
    eyebrowMatrix: 'Open integration',
    matrixTitle: 'Device & protocol integration matrix',
    matrixIntro:
      'Current status per device family. "POC" means integrated and tested in an internal test environment — it does not imply a formal partnership with the vendor.',
    matrixHeaders: { device: 'Device family', interfaces: 'Integration interface', status: 'Status', note: 'Notes' },
    deviceRows: [
      {
        device: 'Open-standard IP cameras',
        interfaces: 'ONVIF Profile S · RTSP',
        status: 'live',
        note: 'Live view, scheduled snapshots, recording and time-ranged clip export.',
      },
      {
        device: 'Axis',
        interfaces: 'VAPIX · ONVIF',
        status: 'poc',
        note: 'Device control and stream access tested in an internal POC. No formal partnership with Axis at this stage.',
      },
      {
        device: 'Axis — edge AI',
        interfaces: 'ACAP',
        status: 'roadmap',
        note: 'Running AnalysisEngine directly on the camera via the ACAP platform. Technical direction, not yet built.',
      },
      {
        device: 'Hikvision',
        interfaces: 'ISAPI · SDK',
        status: 'poc',
        note: 'Stream integration and device management tested in an internal POC.',
      },
      {
        device: 'Edge compute boxes',
        interfaces: 'x86 · NVIDIA Jetson',
        status: 'poc',
        note: 'Local inference for cases where bandwidth or data policy forbids sending footage to a server.',
      },
      {
        device: 'Point-of-sale devices',
        interfaces: 'POS · barcode scanner · QR printer',
        status: 'roadmap',
        note: 'Part of the platform\'s next phase, targeting point-of-sale goods control.',
      },
    ],
    eyebrowTesting: 'Testing methodology',
    testingTitle: '126/126 automated test scenarios',
    testingIntro:
      'Independently verified across 8 test suites, covering everything from per-module unit tests to the full data flow and adversarial input scenarios.',
    testingStats: [
      { value: '10', label: 'Backend unit/integration suites — Models, Engines, Workers, APIs' },
      { value: '99', label: 'E2E scenarios — full Upload → Process → Storage → Query data flow' },
      { value: '27', label: 'Stress & adversarial-media tests — corrupted files, blurry QR codes, dropped network connections' },
    ],
    eyebrowPrinciples: 'Engineering principle',
    principlesTitle: 'Transparent error handling',
    principlesBody:
      'The system has no silent fallback path and swallows no exceptions at any layer. All business and system errors flow through a dedicated exception hierarchy — SOAIException — so every fault (a DB error, a corrupted file, a blurry QR code, a failed FFmpeg call, a dropped camera connection) surfaces as an explicit, uncaught error instead of being silently absorbed.',
    principlesBody2:
      'Every error returns an RFC-compliant HTTP response with a clear error code, and is logged in detail server-side. In production monitoring, a wrong number nobody knows is wrong is always worse than an error that shows up immediately.',
    ctaTitle: 'Want to go deeper?',
    ctaBody:
      'We can walk your technical team directly through the architecture, the test results, or integration feasibility for a specific device.',
    ctaPrimary: 'Talk to our engineering team',
    ctaSecondary: 'See the full technical documentation',
  },
};

function pick(locale: string): Locale {
  return content[locale as 'vi' | 'en'] ?? content.en;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = pick(locale);
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = pick(locale);
  const localeKey: 'vi' | 'en' = locale === 'vi' ? 'vi' : 'en';
  const statusLabel = STATUS_LABEL[localeKey];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper text-ink antialiased">
        {/* 1. Intro */}
        <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24" aria-label={t.h1}>
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-caption font-mono uppercase tracking-wider text-orange">{t.eyebrowIntro}</span>
            <h1 className="font-display text-[1.875rem] md:text-h1 font-bold leading-tight text-white">{t.h1}</h1>
            <p className="text-body text-paper/80 leading-relaxed max-w-2xl">{t.introParagraph}</p>
          </div>
        </section>

        {/* 2. Architecture pipeline */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.archTitle}>
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.eyebrowArch}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.archTitle}</h2>
              <p className="text-body text-navy-400 leading-relaxed">{t.archIntro}</p>
            </div>

            <div className="max-w-xl mx-auto flex flex-col gap-0" aria-hidden="true">
              {t.pipeline.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={idx}>
                    <div
                      className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 ${
                        step.highlight ? 'border-orange/50 bg-orange/5' : 'border-line bg-paper'
                      }`}
                    >
                      <Icon className={`w-5 h-5 shrink-0 ${step.highlight ? 'text-orange-600' : 'text-navy-400'}`} />
                      <div>
                        <p className="text-body font-semibold text-ink">{step.title}</p>
                        <p className="text-caption text-navy-400 font-mono">{step.sub}</p>
                      </div>
                    </div>
                    {idx < t.pipeline.length - 1 && (
                      <div className="flex justify-start pl-[1.85rem]">
                        <div className="w-px h-6 bg-line" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-h3 font-bold text-ink">{t.abstractionTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.abstractions.map((a, idx) => {
                  const Icon = a.icon;
                  return (
                    <div
                      key={idx}
                      className="p-8 bg-paper border border-line"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
                    >
                      <div className="p-3 bg-ink rounded-lg w-fit mb-5">
                        <Icon className="w-6 h-6 text-orange" />
                      </div>
                      <h4 className="text-h3 font-bold text-ink mb-3 font-mono">{a.title}</h4>
                      <p className="text-body text-navy-400 leading-relaxed">{a.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Edge vs server inference */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.strategyTitle}>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.eyebrowStrategy}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.strategyTitle}</h2>
              <p className="text-body text-navy-400 leading-relaxed">{t.strategyIntro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-line p-8 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="p-2.5 bg-ink rounded-lg w-fit">
                    <Cloud className="w-5 h-5 text-orange" />
                  </div>
                  <span
                    className={`inline-block whitespace-nowrap text-caption font-mono uppercase tracking-wide px-2 py-0.5 border ${STATUS_CLASS[t.serverCard.status]}`}
                  >
                    {statusLabel[t.serverCard.status]}
                  </span>
                </div>
                <h3 className="text-h3 font-bold text-ink">{t.serverCard.title}</h3>
                <p className="text-body text-navy-400 leading-relaxed">{t.serverCard.pros}</p>
                <p className="text-caption text-navy-400 leading-relaxed border-t border-line pt-3">{t.serverCard.note}</p>
              </div>

              <div className="bg-white border border-line p-8 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="p-2.5 bg-ink rounded-lg w-fit">
                    <Cpu className="w-5 h-5 text-orange" />
                  </div>
                  <span
                    className={`inline-block whitespace-nowrap text-caption font-mono uppercase tracking-wide px-2 py-0.5 border ${STATUS_CLASS[t.edgeCard.status]}`}
                  >
                    {statusLabel[t.edgeCard.status]}
                  </span>
                </div>
                <h3 className="text-h3 font-bold text-ink">{t.edgeCard.title}</h3>
                <p className="text-body text-navy-400 leading-relaxed">{t.edgeCard.pros}</p>
                <p className="text-caption text-navy-400 leading-relaxed border-t border-line pt-3">{t.edgeCard.note}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Device / protocol integration matrix */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.matrixTitle}>
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.eyebrowMatrix}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.matrixTitle}</h2>
              <p className="text-body text-navy-400 leading-relaxed">{t.matrixIntro}</p>
            </div>

            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[640px] text-body">
                <thead>
                  <tr className="bg-paper">
                    <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">
                      {t.matrixHeaders.device}
                    </th>
                    <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line whitespace-nowrap">
                      {t.matrixHeaders.interfaces}
                    </th>
                    <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">
                      {t.matrixHeaders.status}
                    </th>
                    <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">
                      {t.matrixHeaders.note}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.deviceRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-line last:border-b-0">
                      <td className="px-4 py-3.5 font-semibold text-ink align-top whitespace-nowrap">{row.device}</td>
                      <td className="px-4 py-3.5 font-mono text-caption text-navy-400 align-top whitespace-nowrap">{row.interfaces}</td>
                      <td className="px-4 py-3.5 align-top">
                        <span
                          className={`inline-block whitespace-nowrap text-caption font-mono uppercase tracking-wide px-2 py-0.5 border ${STATUS_CLASS[row.status]}`}
                        >
                          {statusLabel[row.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-navy-400 align-top">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Testing methodology */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.testingTitle}>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.eyebrowTesting}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink flex items-center gap-3">
                <FlaskConical className="w-6 h-6 text-orange-600" />
                {t.testingTitle}
              </h2>
              <p className="text-body text-navy-400 leading-relaxed">{t.testingIntro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.testingStats.map((s, idx) => (
                <div key={idx} className="bg-white border border-line p-6 space-y-2">
                  <p className="font-display text-h1 font-extrabold text-orange-600 leading-none">{s.value}</p>
                  <p className="text-caption text-navy-400 leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Engineering principles */}
        <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24" aria-label={t.principlesTitle}>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3">
              <span className="text-caption font-mono uppercase tracking-wider text-orange flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {t.eyebrowPrinciples}
              </span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-white">{t.principlesTitle}</h2>
            </div>

            <p className="text-body text-paper/80 leading-relaxed max-w-2xl">{t.principlesBody}</p>
            <p className="text-body text-paper/80 leading-relaxed max-w-2xl">{t.principlesBody2}</p>
          </div>
        </section>

        {/* 7. CTA */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24" aria-label={t.ctaTitle}>
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.ctaTitle}</h2>
            <p className="text-body text-navy-400 leading-relaxed max-w-2xl">{t.ctaBody}</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={`/${locale}#lead-capture`}
                className="bg-orange hover:bg-orange/90 text-ink font-extrabold px-8 py-4 rounded-lg shadow-lg hover:shadow-orange/20 transition-all text-center min-h-[48px] min-w-[220px] flex items-center justify-center gap-2 group"
              >
                {t.ctaPrimary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`/${locale}#lead-capture`}
                className="border border-line hover:border-ink text-ink font-semibold px-8 py-4 rounded-lg transition-all text-center min-h-[48px] min-w-[220px] flex items-center justify-center gap-2"
              >
                {t.ctaSecondary}
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
