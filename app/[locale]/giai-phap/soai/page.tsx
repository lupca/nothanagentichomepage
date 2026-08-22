import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ScanEye,
  PackageSearch,
  HardHat,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';
import { AIDecisionWidget } from '@/components/AIDecisionWidget';

type Status = 'live' | 'poc' | 'roadmap';

const STATUS_LABEL: Record<'vi' | 'en', Record<Status, string>> = {
  vi: { live: 'đang chạy', poc: 'poc', roadmap: 'lộ trình' },
  en: { live: 'in production', poc: 'proven in poc', roadmap: 'on roadmap' },
};

const STATUS_CLASS: Record<Status, string> = {
  live: 'text-state-ok border-state-ok',
  poc: 'text-state-wait border-state-wait',
  roadmap: 'text-navy-400 border-navy-400',
};

function StatusTag({ status, locale }: { status: Status; locale: 'vi' | 'en' }) {
  return (
    <span
      className={`inline-block whitespace-nowrap text-caption font-mono uppercase tracking-wide px-2 py-0.5 border ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[locale][status]}
    </span>
  );
}

interface ProblemGroup {
  icon: React.ElementType;
  title: string;
  situation: string;
  whatItDoes: string;
  devices: string;
  dataFlow: string;
  status: Status;
}

interface Module {
  name: string;
  capability: string;
  stack: string;
}

interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

interface Phase {
  title: string;
  body: string;
  status: Status;
}

const content = {
  vi: {
    metaTitle: 'SOAI.VN — Giám sát sản xuất và an toàn lao động bằng AI Vision',
    metaDescription:
      'Nền tảng thị giác máy tính cho kiểm soát hàng hoá, an toàn lao động và giám sát vận hành. Sáu module đã nghiệm thu POC.',
    eyebrow: 'SOAI.VN — AI Vision',
    h1: 'Giám sát sản xuất, an toàn lao động và kiểm soát hàng hoá bằng thị giác máy tính',
    intro:
      'SOAI là nền tảng giám sát thông qua hình ảnh, xây cho doanh nghiệp sản xuất và quản lý hàng hoá tại Việt Nam. Kiến trúc plugin có hai lớp trừu tượng: AnalysisEngine cho phân tích và DeviceProvider cho nguồn hình. Mỗi bài toán khách hàng được ghép từ các module thị giác đã kiểm thử và triển khai với phần cứng tương ứng — camera IP, hộp xử lý biên, hoặc tích hợp trực tiếp vào camera hãng khi hạ tầng cho phép.',
    problemsEyebrow: 'Ba nhóm bài toán thực tế',
    problemsTitle: 'Từ hiện trường đến báo cáo',
    problems: [
      {
        icon: PackageSearch,
        title: 'Kiểm soát hàng hoá',
        situation:
          'Khâu đóng gói và xuất/nhập kho khó đối chiếu chính xác: đơn hàng lẫn mã, số lượng đếm tay sai lệch, khiếu nại không có bằng chứng để tra lại.',
        whatItDoes:
          'Bóc tách mã QR/mã vạch ngay trong video đóng gói và gắn mốc thời gian cho từng đơn (mở lại đúng đoạn clip khi có khiếu nại); đếm SKU dày đặc trên ảnh bằng mô hình phát hiện vật thể, xuất ảnh có khung nhận diện để đối soát thủ công khi cần; đối chiếu số lượng đếm được với phiếu xuất/nhập kho.',
        devices: 'Camera IP cố định tại trạm đóng gói (ONVIF/RTSP), hoặc camera có sẵn tại kho.',
        dataFlow:
          'Hình ảnh xử lý trong mạng nội bộ; kết quả (số lượng, mốc thời gian, ảnh có khung nhận diện) lưu tại hệ thống on-prem hoặc server riêng của khách hàng.',
        status: 'poc' as Status,
      },
      {
        icon: HardHat,
        title: 'An toàn lao động',
        situation:
          'Vi phạm bảo hộ lao động và xâm nhập vùng nguy hiểm thường chỉ được phát hiện sau khi sự cố xảy ra, vì giám sát thủ công không thể phủ hết ca và hết khu vực.',
        whatItDoes:
          'Phát hiện thiếu trang bị bảo hộ (mũ, vest) và người xuất hiện trong vùng hạn chế; các nghiệp vụ kiểm tra tuỳ biến — mô tả bằng lời kèm vài ảnh mẫu — được thêm vào hệ thống theo yêu cầu cụ thể của từng nhà máy, không cần huấn luyện lại mô hình từ đầu. Mọi phát hiện được chấm điểm độ tin cậy và đưa vào hàng chờ cho người vận hành duyệt, không có bước tự động hành động.',
        devices: 'Camera IP tại khu vực nguy hiểm/lối vào hạn chế; hộp xử lý biên khi cần suy luận tại chỗ.',
        dataFlow:
          'Suy luận có thể chạy tại biên (edge) để giảm băng thông và giữ hình ảnh trong cơ sở khách hàng; log quyết định lưu để truy vết sau này.',
        status: 'poc' as Status,
      },
      {
        icon: Activity,
        title: 'Giám sát vận hành',
        situation:
          'Quản lý ca sản xuất cần xem lại một khoảng thời gian cụ thể (một sự cố, một ca làm) nhưng không có công cụ tra cứu nhanh, chỉ có video thô lưu rời rạc.',
        whatItDoes:
          'Xem trực tiếp nhiều camera, chụp ảnh nhanh thủ công hoặc theo lịch định kỳ, liệt kê bản ghi theo thiết bị và cắt trích xuất chính xác theo khoảng thời gian cần xem — phục vụ điều tra sự cố hoặc báo cáo ca.',
        devices: 'Toàn bộ camera đã kết nối trong hệ thống quản lý thiết bị.',
        dataFlow: 'Luồng hình và bản ghi lưu trữ nội bộ; quyền truy cập theo tài khoản, chống truy cập tệp ngoài phạm vi cho phép.',
        status: 'poc' as Status,
      },
    ] satisfies ProblemGroup[],
    modulesEyebrow: 'Module hệ thống',
    modulesTitle: 'POC SOAI — 6 module đã nghiệm thu',
    modulesNote: 'Mỗi module dưới đây đã được kiểm thử và nghiệm thu trong POC, với stack kỹ thuật tương ứng.',
    modules: [
      {
        name: 'Phân tích video đóng gói',
        capability: 'Bóc tách mã QR trong video đóng hàng, gắn mốc thời gian bắt đầu/kết thúc cho từng đơn — tra được clip của bất kỳ khiếu nại nào trong vài giây.',
        stack: 'OpenCV · pyzbar · Celery',
      },
      {
        name: 'Đếm SKU trên ảnh',
        capability: 'Đếm vật thể dày đặc trong dưới 3 giây, xuất ảnh có khung phát hiện và lưu phiên bản mô hình đã dùng — đối soát được số liệu về sau.',
        stack: 'YOLOv8 · SAHI',
      },
      {
        name: 'Kiểm tra đúng/sai',
        capability: 'Nghiệp vụ mới định nghĩa bằng lời và vài ảnh mẫu, không cần huấn luyện lại. Mở rộng sang bài toán kiểm tra mới mất một ngày.',
        stack: 'VLM · few-shot',
      },
      {
        name: 'Quản lý thiết bị',
        capability: 'Khai báo và kiểm tra kết nối camera/thiết bị tập trung, mật khẩu mã hoá khi lưu — vận hành nhiều điểm camera từ một nơi.',
        stack: 'FastAPI · Fernet',
      },
      {
        name: 'Live view & snapshot',
        capability: 'Xem trực tiếp nhiều camera cùng lúc, chụp ảnh thủ công hoặc theo lịch định kỳ — giám sát chủ động thay vì chỉ xem lại sau sự cố.',
        stack: 'MJPEG · Celery Beat',
      },
      {
        name: 'Ghi & trích xuất video',
        capability: 'Liệt kê bản ghi theo thiết bị và cắt clip chính xác theo khoảng thời gian yêu cầu — phục vụ điều tra sự cố và làm bằng chứng.',
        stack: 'FFmpeg',
      },
    ] satisfies Module[],
    screenshotsEyebrow: 'Giao diện hệ thống đang chạy',
    screenshotsTitle: 'Ảnh chụp trực tiếp từ hệ thống SOAI',
    demoDataCaption: 'Ảnh chụp hệ thống SOAI với dữ liệu minh hoạ.',
    screenshots: [
      {
        src: '/media/soai/packing.png',
        alt: 'Màn hình Phân tích video đóng gói SOAI, cho phép tải video trạm đóng gói lên và xem lịch sử các phiên đóng hàng theo mã đơn',
        caption: 'Ảnh chụp hệ thống SOAI với dữ liệu minh hoạ.',
        width: 3200,
        height: 2000,
      },
      {
        src: '/media/soai/sku-counting.png',
        alt: 'Màn hình Đếm SKU trên ảnh SOAI, hiển thị độ chính xác trung bình 94%, độ trễ suy luận 48ms và khu vực tải ảnh kiểm kê lên',
        caption: 'Ảnh chụp hệ thống SOAI với dữ liệu minh hoạ.',
        width: 3200,
        height: 2000,
      },
      {
        src: '/media/soai/sku-counting-detail.png',
        alt: 'Kết quả đếm SKU của SOAI đối chiếu ảnh gốc với ảnh đã gắn khung nhận diện YOLOv8 + SAHI, đếm được 41 vật thể',
        caption: 'Ảnh chụp hệ thống SOAI với dữ liệu minh hoạ.',
        width: 3200,
        height: 2000,
      },
      {
        src: '/media/soai/devices.png',
        alt: 'Màn hình Quản lý thiết bị SOAI, liệt kê camera Axis và Hikvision đã đăng ký kèm trạng thái kết nối',
        caption: 'Ảnh chụp hệ thống SOAI với dữ liệu minh hoạ.',
        width: 3200,
        height: 2000,
      },
      {
        src: '/media/soai/liveview.png',
        alt: 'Màn hình Live View & Snapshot SOAI, xem trực tiếp một camera và lịch chụp ảnh tự động định kỳ',
        caption: 'Ảnh chụp hệ thống SOAI với dữ liệu minh hoạ.',
        width: 3200,
        height: 2000,
      },
      {
        src: '/media/soai/export.png',
        alt: 'Màn hình Ghi & trích xuất video SOAI, liệt kê các tác vụ xuất video FFmpeg theo khoảng thời gian và trạng thái xử lý',
        caption: 'Ảnh chụp hệ thống SOAI với dữ liệu minh hoạ.',
        width: 3200,
        height: 2000,
      },
    ] satisfies Screenshot[],
    videoTitle: 'Xem toàn bộ luồng thao tác',
    videoCaption: 'Video minh hoạ thao tác trên hệ thống SOAI, sử dụng dữ liệu minh hoạ.',
    roadmapEyebrow: 'Lộ trình 3 giai đoạn',
    roadmapTitle: 'Từ giám sát hàng hoá đến camera hãng',
    phases: [
      {
        title: 'Giai đoạn 1 — Xây dựng hệ thống giám sát hàng hoá',
        body: 'Hệ thống giám sát tại chỗ và khâu đóng hàng online: sáu module ở trên, đã nghiệm thu POC.',
        status: 'poc' as Status,
      },
      {
        title: 'Giai đoạn 2 — Nhúng AI vào camera qua ACAP',
        body: 'Nhúng mô hình phát hiện trực tiếp vào camera Axis và Hikvision qua ACAP là giai đoạn 2 của lộ trình SOAI. Hiện chưa triển khai; đang tìm hiểu điều kiện tham gia chương trình đối tác của từng hãng.',
        status: 'roadmap' as Status,
      },
      {
        title: 'Giai đoạn 3 — Mở rộng phạm vi giám sát',
        body: 'Mở rộng sang an toàn lao động, lưu thông hàng hoá và kiểm soát số lượng/tồn kho trên toàn bộ quy mô doanh nghiệp. Chưa triển khai.',
        status: 'roadmap' as Status,
      },
    ] satisfies Phase[],
    demoEyebrow: 'Minh hoạ tương tác',
    demoTitle: 'AI đề xuất — người vận hành quyết định',
    ctaTitle: 'Trao đổi kỹ thuật về SOAI',
    ctaBody: 'Gửi bài toán cụ thể của nhà máy hoặc kho hàng. Đội kỹ thuật SOAI phản hồi bằng đề xuất triển khai, kèm module và stack phù hợp.',
    ctaButton: 'Trao đổi kỹ thuật về SOAI',
    situationLabel: 'Hiện trạng',
    whatLabel: 'Hệ thống làm gì',
    devicesLabel: 'Yêu cầu thiết bị',
    dataLabel: 'Dữ liệu đi đâu',
    moduleCol: 'Module',
    capabilityCol: 'Năng lực',
    stackCol: 'Nền tảng kỹ thuật',
  },
  en: {
    metaTitle: 'SOAI.VN — AI Vision for Production Monitoring and Workplace Safety',
    metaDescription:
      'A computer-vision platform for goods control, workplace safety, and operations monitoring. Six modules verified in POC.',
    eyebrow: 'SOAI.VN — AI Vision',
    h1: 'Computer vision for production monitoring, workplace safety, and goods control',
    intro:
      'SOAI is a vision-based monitoring platform built for manufacturing and warehouse operators in Vietnam. The plugin architecture has two abstraction layers: AnalysisEngine for analysis and DeviceProvider for image sources. Each customer problem is assembled from tested vision modules and deployed with matching hardware — IP cameras, edge processing boxes, or direct integration into brand-name cameras where the infrastructure allows it.',
    problemsEyebrow: 'Three real problem groups',
    problemsTitle: 'From the shop floor to the report',
    problems: [
      {
        icon: PackageSearch,
        title: 'Goods control',
        situation:
          'Packing and warehouse in/out reconciliation is hard to get right by hand: orders get mixed up, manual counts drift, and complaints have no evidence trail to check against.',
        whatItDoes:
          'Extracts QR/barcodes directly from packing video and timestamps each order (pull up the exact clip for any complaint); counts dense SKUs in images with an object-detection model and exports annotated images for manual audit when needed; reconciles counted quantities against warehouse in/out records.',
        devices: 'Fixed IP cameras at the packing station (ONVIF/RTSP), or existing warehouse cameras.',
        dataFlow:
          'Images are processed on the local network; results (counts, timestamps, annotated images) are stored on-prem or on the customer’s own server.',
        status: 'poc' as Status,
      },
      {
        icon: HardHat,
        title: 'Workplace safety',
        situation:
          'PPE violations and entries into hazardous zones are usually caught only after an incident, because manual monitoring can’t cover every shift and every area.',
        whatItDoes:
          'Detects missing protective equipment (helmets, vests) and presence in restricted zones; custom checks — described in plain language with a handful of sample images — are added for a specific factory’s requirements without retraining a model from scratch. Every detection is scored for confidence and queued for a human operator to approve; nothing acts automatically.',
        devices: 'IP cameras at hazardous areas or restricted entry points; edge processing boxes when on-site inference is required.',
        dataFlow:
          'Inference can run at the edge to cut bandwidth and keep imagery inside the customer’s facility; decision logs are kept for later audit.',
        status: 'poc' as Status,
      },
      {
        icon: Activity,
        title: 'Operations monitoring',
        situation:
          'Shift managers need to pull up a specific window of time — an incident, a shift — but have no fast way to search through raw, scattered video files.',
        whatItDoes:
          'Live view across multiple cameras, manual or scheduled snapshots, per-device recording lists, and precise clip extraction for the exact time range needed — for incident investigation or shift reporting.',
        devices: 'All cameras already registered in the device management system.',
        dataFlow: 'Streams and recordings are stored internally; access is account-scoped, with protection against reading files outside the allowed path.',
        status: 'poc' as Status,
      },
    ] satisfies ProblemGroup[],
    modulesEyebrow: 'System modules',
    modulesTitle: 'SOAI POC — six modules verified',
    modulesNote: 'Each module below has been tested and verified in POC, with the matching technical stack.',
    modules: [
      {
        name: 'Packing video analysis',
        capability: 'Extracts QR codes from packing video and timestamps the start/end of each order — pull up the clip behind any complaint in seconds.',
        stack: 'OpenCV · pyzbar · Celery',
      },
      {
        name: 'SKU image counting',
        capability: 'Counts dense objects in under 3 seconds, exports annotated images, and records the model version used — so counts can be audited later.',
        stack: 'YOLOv8 · SAHI',
      },
      {
        name: 'Binary classification',
        capability: 'New checks are defined with plain language and a few sample images, no retraining required. A new inspection rule ships in a day.',
        stack: 'VLM · few-shot',
      },
      {
        name: 'Device management',
        capability: 'Central registration and connection testing for cameras/devices, with credentials encrypted at rest — run many camera sites from one place.',
        stack: 'FastAPI · Fernet',
      },
      {
        name: 'Live view & snapshot',
        capability: 'Live view across multiple cameras, manual or scheduled snapshots, for monitoring during a shift as well as after-the-fact review.',
        stack: 'MJPEG · Celery Beat',
      },
      {
        name: 'Video recording & export',
        capability: 'Per-device recording lists and precise clip extraction for a requested time range — for incident investigation and evidence.',
        stack: 'FFmpeg',
      },
    ] satisfies Module[],
    screenshotsEyebrow: 'Screenshots of the running system',
    screenshotsTitle: 'Screenshots straight from the SOAI system',
    demoDataCaption: 'SOAI system screenshot with demonstration data.',
    screenshots: [
      {
        src: '/media/soai/packing.png',
        alt: 'SOAI packing video analysis screen, letting an operator upload packing-station footage and browse past packing sessions by order code',
        caption: 'SOAI system screenshot with demonstration data.',
        width: 3200,
        height: 2000,
      },
      {
        src: '/media/soai/sku-counting.png',
        alt: 'SOAI SKU image counting screen, showing 94% average accuracy, 48ms inference latency, and the snapshot upload area',
        caption: 'SOAI system screenshot with demonstration data.',
        width: 3200,
        height: 2000,
      },
      {
        src: '/media/soai/sku-counting-detail.png',
        alt: 'SOAI SKU counting result comparing the raw snapshot against the YOLOv8 + SAHI annotated output, counting 41 items',
        caption: 'SOAI system screenshot with demonstration data.',
        width: 3200,
        height: 2000,
      },
      {
        src: '/media/soai/devices.png',
        alt: 'SOAI device management screen, listing registered Axis and Hikvision cameras with their connection status',
        caption: 'SOAI system screenshot with demonstration data.',
        width: 3200,
        height: 2000,
      },
      {
        src: '/media/soai/liveview.png',
        alt: 'SOAI live view and snapshot screen, watching a single camera feed alongside the periodic capture schedule',
        caption: 'SOAI system screenshot with demonstration data.',
        width: 3200,
        height: 2000,
      },
      {
        src: '/media/soai/export.png',
        alt: 'SOAI video recording and export screen, listing FFmpeg clip export jobs by time range and processing status',
        caption: 'SOAI system screenshot with demonstration data.',
        width: 3200,
        height: 2000,
      },
    ] satisfies Screenshot[],
    videoTitle: 'Watch the full workflow',
    videoCaption: 'SOAI system walkthrough video, using demonstration data.',
    roadmapEyebrow: 'Three-phase roadmap',
    roadmapTitle: 'From goods monitoring to brand-name cameras',
    phases: [
      {
        title: 'Phase 1 — Build the goods monitoring system',
        body: 'On-site monitoring and online packing analysis: the six modules above, verified in POC.',
        status: 'poc' as Status,
      },
      {
        title: 'Phase 2 — ACAP embedding into camera hardware',
        body: 'Embedding detection models directly into Axis and Hikvision cameras through ACAP is phase 2 of the SOAI roadmap. Not yet implemented; partner program requirements are still being confirmed with each vendor.',
        status: 'roadmap' as Status,
      },
      {
        title: 'Phase 3 — Extend monitoring scope',
        body: 'Extend to workplace safety, goods flow, and inventory/quantity control across the whole enterprise. Not yet implemented.',
        status: 'roadmap' as Status,
      },
    ] satisfies Phase[],
    demoEyebrow: 'Interactive demo',
    demoTitle: 'AI proposes — the operator decides',
    ctaTitle: 'Talk technical about SOAI',
    ctaBody: 'Send a specific problem from your factory or warehouse. The SOAI engineering team replies with a deployment proposal, including modules and stack.',
    ctaButton: 'Talk technical about SOAI',
    situationLabel: 'Situation',
    whatLabel: 'What the system does',
    devicesLabel: 'Device requirements',
    dataLabel: 'Where data flows',
    moduleCol: 'Module',
    capabilityCol: 'Capability',
    stackCol: 'Technical stack',
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

export default async function SoaiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'vi' ? 'vi' : 'en') as 'vi' | 'en';
  const t = pick(rawLocale);

  // Pull specific screenshots out of the flat list so each one can sit next to the
  // argument it proves, instead of dumping all six into one gallery grid.
  const findShot = (filename: string) => t.screenshots.find((s) => s.src.endsWith(filename));
  const packingShot = findShot('packing.png');
  const skuCountingDetailShot = findShot('sku-counting-detail.png');
  const devicesShot = findShot('devices.png');
  const placedFilenames = ['packing.png', 'sku-counting-detail.png', 'devices.png'];
  const remainingShots = t.screenshots.filter(
    (s) => !placedFilenames.some((name) => s.src.endsWith(name))
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper text-ink antialiased">
        <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-wider text-orange">
              <ScanEye className="w-4 h-4" />
              {t.eyebrow}
            </span>
            <h1 className="font-display text-h1 font-extrabold text-white">{t.h1}</h1>
            <p className="text-body text-white/80 leading-relaxed max-w-3xl">{t.intro}</p>
          </div>
        </section>

        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.problemsTitle}>
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.problemsEyebrow}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.problemsTitle}</h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {t.problems.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="bg-paper border border-line p-8 space-y-5"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-ink rounded-lg w-fit">
                          <Icon className="w-6 h-6 text-orange" />
                        </div>
                        <h3 className="text-h3 font-bold text-ink">{p.title}</h3>
                      </div>
                      <StatusTag status={p.status} locale={locale} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <p className="text-caption font-mono uppercase tracking-wide text-navy-400">{t.situationLabel}</p>
                        <p className="text-body text-navy-400 leading-relaxed">{p.situation}</p>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-caption font-mono uppercase tracking-wide text-navy-400">{t.whatLabel}</p>
                        <p className="text-body text-navy-400 leading-relaxed">{p.whatItDoes}</p>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-caption font-mono uppercase tracking-wide text-navy-400">{t.devicesLabel}</p>
                        <p className="text-body text-navy-400 leading-relaxed">{p.devices}</p>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-caption font-mono uppercase tracking-wide text-navy-400">{t.dataLabel}</p>
                        <p className="text-body text-navy-400 leading-relaxed">{p.dataFlow}</p>
                      </div>
                    </div>

                    {idx === 0 && packingShot && skuCountingDetailShot && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <figure className="space-y-1.5">
                          <div className="border border-line rounded-lg overflow-hidden shadow-sm bg-white">
                            <Image
                              src={packingShot.src}
                              alt={packingShot.alt}
                              width={packingShot.width}
                              height={packingShot.height}
                              sizes="(min-width: 768px) 25vw, 100vw"
                              className="w-full h-auto max-w-full block"
                            />
                          </div>
                          <figcaption className="text-caption font-mono text-navy-400">{packingShot.caption}</figcaption>
                        </figure>
                        <figure className="space-y-1.5">
                          <div className="border border-line rounded-lg overflow-hidden shadow-sm bg-white">
                            <Image
                              src={skuCountingDetailShot.src}
                              alt={skuCountingDetailShot.alt}
                              width={skuCountingDetailShot.width}
                              height={skuCountingDetailShot.height}
                              sizes="(min-width: 768px) 25vw, 100vw"
                              className="w-full h-auto max-w-full block"
                            />
                          </div>
                          <figcaption className="text-caption font-mono text-navy-400">{skuCountingDetailShot.caption}</figcaption>
                        </figure>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line" id="bang-chung-soai" aria-label={t.modulesTitle}>
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.modulesEyebrow}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.modulesTitle}</h2>
              <p className="text-body text-navy-400 leading-relaxed">{t.modulesNote}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 overflow-x-auto border border-line bg-white">
                <table className="w-full min-w-[640px] text-body">
                  <thead>
                    <tr>
                      <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line bg-paper">
                        {t.moduleCol}
                      </th>
                      <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line bg-paper">
                        {t.capabilityCol}
                      </th>
                      <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line bg-paper whitespace-nowrap">
                        {t.stackCol}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.modules.map((m, idx) => (
                      <tr key={idx} className="border-b border-line last:border-b-0">
                        <td className="px-4 py-3.5 font-semibold text-ink align-top whitespace-nowrap">{m.name}</td>
                        <td className="px-4 py-3.5 text-navy-400 align-top">{m.capability}</td>
                        <td className="px-4 py-3.5 font-mono text-caption text-navy-400 align-top whitespace-nowrap">{m.stack}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {devicesShot && (
                <figure className="space-y-1.5">
                  <div className="border border-line rounded-lg overflow-hidden shadow-sm bg-white">
                    <Image
                      src={devicesShot.src}
                      alt={devicesShot.alt}
                      width={devicesShot.width}
                      height={devicesShot.height}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="w-full h-auto max-w-full block"
                    />
                  </div>
                  <figcaption className="text-caption font-mono text-navy-400">{devicesShot.caption}</figcaption>
                </figure>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.screenshotsTitle}>
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.screenshotsEyebrow}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.screenshotsTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {remainingShots.map((s, idx) => (
                <figure key={idx} className="space-y-2">
                  <div className="border border-line rounded-lg overflow-hidden shadow-sm bg-paper">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={s.width}
                      height={s.height}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="w-full h-auto max-w-full block"
                    />
                  </div>
                  <figcaption className="text-caption font-mono text-navy-400">{s.caption}</figcaption>
                </figure>
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-h3 font-bold text-ink">{t.videoTitle}</h3>
              <div className="border border-line rounded-lg overflow-hidden shadow-sm bg-ink">
                <video
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  poster="/media/soai/walkthrough-poster.jpg"
                  className="w-full h-auto max-w-full block"
                >
                  <source src="/media/soai/walkthrough-v3.webm" type="video/webm" />
                </video>
              </div>
              <p className="text-caption font-mono text-navy-400">{t.videoCaption}</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.roadmapTitle}>
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.roadmapEyebrow}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.roadmapTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.phases.map((phase, idx) => (
                <div
                  key={idx}
                  className="bg-paper border border-line p-8 space-y-4"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
                  }}
                >
                  <StatusTag status={phase.status} locale={locale} />
                  <h3 className="text-h3 font-bold text-ink">{phase.title}</h3>
                  <p className="text-body text-navy-400 leading-relaxed">{phase.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.demoTitle}>
          <div className="max-w-4xl mx-auto space-y-4">
            <AIDecisionWidget />
          </div>
        </section>

        <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24" aria-label={t.ctaTitle}>
          <div className="max-w-4xl mx-auto space-y-6 text-center md:text-left">
            <h2 className="font-display text-2xl md:text-h2 font-bold text-white">{t.ctaTitle}</h2>
            <p className="text-body text-white/80 leading-relaxed max-w-2xl">{t.ctaBody}</p>
            <Link
              href={`/${rawLocale}#lead-capture`}
              className="inline-flex items-center gap-2 bg-orange text-white font-semibold text-body px-6 py-3.5 rounded-lg hover:bg-orange-400 transition-colors"
            >
              {t.ctaButton}
              <ArrowUpRight className="w-4 h-4" />
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
