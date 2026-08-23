import type { Metadata } from 'next';
import {
  Handshake,
  Code2,
  PackageCheck,
  Cpu,
  ShieldCheck,
  Timer,
  MessagesSquare,
  FlaskConical,
  Rocket,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';
import PartnerInquiryForm from '@/components/PartnerInquiryForm';

type Locale = 'vi' | 'en' | 'sv';
type Status = 'live' | 'poc' | 'roadmap';

interface ValueProp {
  title: string;
  body: string;
}

interface CooperationForm {
  icon: React.ElementType;
  title: string;
  body: string;
  tag?: Status;
}

interface DeviceRow {
  device: string;
  interfaces: string;
  status: Status;
  note: string;
}

interface ProcessStep {
  title: string;
  body: string;
}

const STATUS_LABEL: Record<Locale, Record<Status, string>> = {
  vi: { live: 'đang chạy', poc: 'poc', roadmap: 'lộ trình' },
  en: { live: 'in production', poc: 'poc', roadmap: 'on roadmap' },
  sv: { live: 'i drift', poc: 'poc', roadmap: 'på färdplan' },
};

const STATUS_CLASS: Record<Status, string> = {
  live: 'text-state-ok border-state-ok',
  poc: 'text-state-wait border-state-wait',
  roadmap: 'text-navy-400 border-navy-400',
};

function StatusTag({ status, locale }: { status: Status; locale: Locale }) {
  return (
    <span
      className={`inline-block whitespace-nowrap text-caption font-mono uppercase tracking-wide px-2 py-0.5 border ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[locale][status]}
    </span>
  );
}

const content = {
  vi: {
    metaTitle: 'Đối tác giải pháp cho hãng phần cứng camera - Nỏ Thần Agentic',
    metaDescription:
      'Nỏ Thần Agentic tiếp cận các hãng phần cứng camera (Axis, Hikvision) với vị thế đối tác giải pháp: phát triển phần mềm trên nền tảng của hãng và tích hợp thiết bị cho dự án trọn gói tại Việt Nam.',
    eyebrow: 'Đối tác',
    h1: 'Dành cho các hãng phần cứng',
    intro:
      'Chúng tôi tiếp cận các hãng sản xuất camera và thiết bị giám sát với vị thế đối tác giải pháp (Solution Partner): vừa phát triển phần mềm trên nền tảng của hãng, vừa tích hợp và cung cấp thiết bị cho dự án trọn gói tại Việt Nam. Đây là hướng đi công ty đang theo đuổi; chưa có thoả thuận ký kết với hãng phần cứng nào. Trang này trình bày cụ thể những gì chúng tôi mang lại khi hai bên làm việc cùng nhau.',
    valuesEyebrow: 'Vì sao hợp tác với chúng tôi',
    valuesTitle: 'Giá trị chúng tôi mang lại cho hãng phần cứng',
    values: [
      {
        title: 'Phần mềm làm thiết bị của bạn đáng giá hơn.',
        body: 'Mỗi bài toán nghiệp vụ chúng tôi giải trực tiếp trên camera của hãng (đếm hàng, phát hiện vi phạm bảo hộ, trích xuất bằng chứng theo mốc thời gian) là một lý do cụ thể để khách hàng doanh nghiệp chọn thiết bị đó thay vì một thiết bị rẻ hơn không có lớp phần mềm đi kèm. Camera có phần mềm phân tích đi kèm giải quyết được bài toán vận hành cụ thể ngay khi lắp đặt.',
      },
      {
        title: 'Mô hình thu phí định kỳ, kèm phần cứng đồng bộ.',
        body: 'Mô hình kinh doanh của chúng tôi là phần mềm thuê theo chu kỳ (tháng/quý/năm) kết hợp cung cấp thiết bị. Khách hàng còn dùng hệ thống thì chúng tôi còn bảo trì và cải tiến theo hợp đồng đã ký, không dừng lại ở buổi nghiệm thu.',
      },
      {
        title: 'Đội kỹ thuật nội bộ.',
        body: 'Bốn người trong đội kỹ thuật là nhân sự của công ty. Người viết code cho SOAI cũng là người đi lắp đặt tại nhà máy, nên trao đổi kỹ thuật sâu về API hoặc hiệu năng suy luận đi thẳng tới người đã viết code đó.',
      },
    ] satisfies ValueProp[],
    formsEyebrow: 'Mô hình hợp tác',
    formsTitle: 'Các hình thức hợp tác chúng tôi theo đuổi',
    forms: [
      {
        icon: Code2,
        title: 'Phát triển phần mềm trên nền tảng của hãng (ADP/ISV)',
        body: 'Tham gia chương trình đối tác phát triển phần mềm chính thức của hãng, xây dựng ứng dụng và tích hợp trên nền tảng do hãng cung cấp, mang thêm giá trị phân tích và tự động hoá cho khách hàng dùng thiết bị của hãng.',
      },
      {
        icon: PackageCheck,
        title: 'Tích hợp và cung cấp thiết bị cho dự án trọn gói',
        body: 'Đóng vai trò system integrator: chọn, tích hợp và cung cấp thiết bị của hãng cho các dự án giám sát sản xuất, an toàn lao động và kiểm soát hàng hoá tại doanh nghiệp Việt Nam, kèm phần mềm phân tích do chúng tôi phát triển.',
      },
      {
        icon: Cpu,
        title: 'Đồng phát triển AI tại biên trên camera',
        body: 'Nhúng mô hình phát hiện chạy trực tiếp trên phần cứng của hãng qua nền tảng phát triển tại biên (ACAP hoặc tương đương) là hướng hợp tác đề xuất. Chưa triển khai.',
        tag: 'roadmap' as Status,
      },
    ] satisfies CooperationForm[],
    matrixEyebrow: 'Kiến trúc mở',
    matrixTitle: 'Ma trận tích hợp thiết bị',
    matrixNote:
      'Một lớp trừu tượng DeviceProvider tách nguồn hình ảnh khỏi lõi phân tích. Thêm một dòng thiết bị mới là viết thêm plugin, không sửa lõi. Đây cũng là lý do tích hợp với nền tảng của một hãng mới không đòi hỏi viết lại hệ thống.',
    matrixCols: { device: 'Dòng thiết bị', interfaces: 'Giao diện tích hợp', status: 'Trạng thái', note: 'Ghi chú' },
    deviceRows: [
      {
        device: 'Camera IP theo chuẩn mở',
        interfaces: 'ONVIF Profile S · RTSP',
        status: 'live',
        note: 'Live view, snapshot định kỳ, ghi và trích xuất clip theo mốc thời gian.',
      },
      {
        device: 'Axis',
        interfaces: 'VAPIX · ONVIF',
        status: 'poc',
        note: 'Điều khiển thiết bị và lấy luồng hình. Đang trao đổi để tham gia chương trình đối tác của hãng.',
      },
      {
        device: 'Axis - AI tại biên',
        interfaces: 'ACAP',
        status: 'roadmap',
        note: 'Nhúng mô hình phát hiện trực tiếp trên camera qua ACAP. Chưa triển khai; là mục tiêu hợp tác kỹ thuật đề xuất với hãng.',
      },
      {
        device: 'Hikvision',
        interfaces: 'ISAPI · SDK',
        status: 'poc',
        note: 'Tích hợp luồng hình và quản lý thiết bị.',
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
        note: 'Thuộc giai đoạn 2 của nền tảng VOMA. Chưa triển khai.',
      },
    ] satisfies DeviceRow[],
    processEyebrow: 'Bắt đầu như thế nào',
    processTitle: 'Quy trình làm việc',
    process: [
      { title: 'Trao đổi ban đầu', body: 'Giới thiệu ngắn về nhu cầu của hãng và năng lực của chúng tôi, xác định phù hợp hay không.' },
      { title: 'Đánh giá kỹ thuật chung', body: 'Hai bên xem xét API/SDK, yêu cầu tích hợp và ràng buộc dữ liệu cụ thể.' },
      { title: 'POC thử nghiệm', body: 'Triển khai một kịch bản thực tế trên thiết bị của hãng để kiểm chứng trước khi mở rộng.' },
      { title: 'Triển khai', body: 'Nhân rộng cho dự án thực tế với cả hai lớp phần mềm và phần cứng.' },
    ] satisfies ProcessStep[],
    ctaEyebrow: 'Liên hệ',
    ctaTitle: 'Bắt đầu trao đổi',
    ctaBody: 'Để lại thông tin, đội kỹ thuật sẽ phản hồi trực tiếp với đề xuất phù hợp cho hình thức hợp tác bạn quan tâm.',
    formLabels: {
      heading: 'Bắt đầu trao đổi',
      body: 'Để lại thông tin, đội kỹ thuật sẽ phản hồi trực tiếp với đề xuất phù hợp cho hình thức hợp tác bạn quan tâm.',
      companyLabel: 'Tên hãng / tổ chức',
      companyPlaceholder: 'Ví dụ: Axis Communications',
      emailLabel: 'Email công việc',
      emailPlaceholder: 'name@company.com',
      regionLabel: 'Khu vực',
      regionPlaceholder: 'Việt Nam / Đông Nam Á',
      interestLabel: 'Loại hợp tác quan tâm',
      interestPlaceholder: 'Chọn loại hợp tác',
      interestOptions: [
        { value: 'software-platform', label: 'Phát triển phần mềm trên nền tảng' },
        { value: 'device-integration', label: 'Tích hợp & cung cấp thiết bị' },
        { value: 'edge-ai', label: 'AI tại biên (ACAP hoặc tương đương)' },
        { value: 'other', label: 'Khác' },
      ],
      noteLabel: 'Ghi chú',
      notePlaceholder: 'Mô tả ngắn về mục tiêu hợp tác (không bắt buộc)...',
      submitLabel: 'Gửi yêu cầu trao đổi',
      submittingLabel: 'Đang gửi thông tin...',
      successTitle: 'Đã gửi thành công!',
      successBody: 'Cảm ơn, đội ngũ sẽ phản hồi trong thời gian sớm nhất.',
      resetLabel: 'Gửi một yêu cầu khác',
      submitErrorLabel: 'Đã có lỗi khi gửi thông tin. Vui lòng thử lại, hoặc liên hệ trực tiếp qua email support@nothanagentic.vn hoặc số điện thoại 0983650552.',
      errors: {
        errCompany: 'Tên hãng/tổ chức phải có ít nhất 2 ký tự',
        errEmailRequired: 'Vui lòng nhập email công việc',
        errEmailInvalid: 'Định dạng email công việc không hợp lệ',
        errRegion: 'Vui lòng nhập khu vực',
        errInterest: 'Vui lòng chọn loại hợp tác quan tâm',
      },
    },
  },
  en: {
    metaTitle: 'Solution Partner for Camera Hardware Manufacturers - Nỏ Thần Agentic',
    metaDescription:
      'Nỏ Thần Agentic approaches camera and surveillance hardware manufacturers (Axis, Hikvision) as a solution partner: developing software on the manufacturer’s platform and integrating hardware for turnkey deployments in Vietnam.',
    eyebrow: 'Partners',
    h1: 'For hardware manufacturers',
    intro:
      'We approach camera and surveillance hardware manufacturers as a Solution Partner: developing software on the manufacturer’s platform, and integrating and supplying their hardware for turnkey projects in Vietnam. This is the direction we are pursuing; no agreement is signed with a hardware manufacturer yet. This page lays out concretely what we bring when the two of us work together.',
    valuesEyebrow: 'Why partner with us',
    valuesTitle: 'What we bring to a hardware manufacturer',
    values: [
      {
        title: 'Software makes your hardware worth more.',
        body: 'Every business problem we solve directly on the manufacturer’s camera (counting goods, detecting PPE violations, pulling timestamped evidence) is a concrete reason for a business customer to choose that device over a cheaper one with no software layer attached. A camera with analytics software attached solves a specific operating problem the moment it is installed.',
      },
      {
        title: 'Recurring subscription revenue, bundled hardware.',
        body: 'Our business model is subscription software (monthly/quarterly/annual) bundled with hardware. As long as a customer is running the system, we keep maintaining and improving it under the signed contract, past the sign-off milestone.',
      },
      {
        title: 'An in-house engineering team.',
        body: 'Four people on the engineering team are company staff. The person who writes SOAI’s code is the same person who installs it at the factory, so a deep technical conversation about the API or inference performance goes straight to the person who wrote that code.',
      },
    ] satisfies ValueProp[],
    formsEyebrow: 'Cooperation models',
    formsTitle: 'The partnership models we pursue',
    forms: [
      {
        icon: Code2,
        title: 'Software development on the manufacturer’s platform (ADP/ISV)',
        body: 'Joining a manufacturer’s formal software developer partner program, building applications and integrations on the platform they provide, adding analytics and automation value for customers already running their hardware.',
      },
      {
        icon: PackageCheck,
        title: 'Hardware integration and supply for turnkey projects',
        body: 'Acting as system integrator: selecting, integrating, and supplying the manufacturer’s hardware for production monitoring, workplace safety, and goods-control projects at Vietnamese enterprises, paired with our own analytics software.',
      },
      {
        icon: Cpu,
        title: 'Co-developing edge AI on the camera',
        body: 'Embedding detection models directly on the manufacturer’s hardware through their edge development platform (ACAP or equivalent) is a proposed cooperation track. Not yet implemented.',
        tag: 'roadmap' as Status,
      },
    ] satisfies CooperationForm[],
    matrixEyebrow: 'Open architecture',
    matrixTitle: 'Device integration matrix',
    matrixNote:
      'A DeviceProvider abstraction layer separates the image source from the analytics core. Adding a new device line means writing a plugin, not rewriting the core. It’s also why integrating a new manufacturer’s platform doesn’t require rebuilding the system.',
    matrixCols: { device: 'Device line', interfaces: 'Integration interface', status: 'Status', note: 'Note' },
    deviceRows: [
      {
        device: 'Open-standard IP cameras',
        interfaces: 'ONVIF Profile S · RTSP',
        status: 'live',
        note: 'Live view, scheduled snapshots, recording, and timestamped clip extraction.',
      },
      {
        device: 'Axis',
        interfaces: 'VAPIX · ONVIF',
        status: 'poc',
        note: 'Device control and video stream access. Currently in discussion to join the vendor’s partner program.',
      },
      {
        device: 'Axis - edge AI',
        interfaces: 'ACAP',
        status: 'roadmap',
        note: 'Embedding detection models directly on the camera via ACAP. Not yet implemented; a proposed technical partnership goal with the vendor.',
      },
      {
        device: 'Hikvision',
        interfaces: 'ISAPI · SDK',
        status: 'poc',
        note: 'Video stream integration and device management.',
      },
      {
        device: 'Edge processing boxes',
        interfaces: 'x86 · NVIDIA Jetson',
        status: 'poc',
        note: 'On-site inference when bandwidth or data policy doesn’t allow pushing footage to a central server.',
      },
      {
        device: 'Point-of-sale devices',
        interfaces: 'POS · barcode scanner · QR printing',
        status: 'roadmap',
        note: 'Part of phase 2 of the VOMA platform. Not yet implemented.',
      },
    ] satisfies DeviceRow[],
    processEyebrow: 'How we start',
    processTitle: 'Working process',
    process: [
      { title: 'Initial conversation', body: 'A short introduction to the manufacturer’s needs and our capabilities, to check for fit.' },
      { title: 'Joint technical review', body: 'Both sides review the API/SDK, integration requirements, and specific data constraints.' },
      { title: 'Pilot POC', body: 'Deploy one real-world scenario on the manufacturer’s hardware to validate before scaling up.' },
      { title: 'Deployment', body: 'Roll out to real projects across both the software and hardware layers.' },
    ] satisfies ProcessStep[],
    ctaEyebrow: 'Contact',
    ctaTitle: 'Start a conversation',
    ctaBody: 'Leave your details and our engineering team will reply directly with a proposal fitted to the cooperation model you’re interested in.',
    formLabels: {
      heading: 'Start a conversation',
      body: 'Leave your details and our engineering team will reply directly with a proposal fitted to the cooperation model you’re interested in.',
      companyLabel: 'Company / organization name',
      companyPlaceholder: 'e.g. Axis Communications',
      emailLabel: 'Work email',
      emailPlaceholder: 'name@company.com',
      regionLabel: 'Region',
      regionPlaceholder: 'Vietnam / Southeast Asia',
      interestLabel: 'Cooperation model of interest',
      interestPlaceholder: 'Select a cooperation model',
      interestOptions: [
        { value: 'software-platform', label: 'Software development on your platform' },
        { value: 'device-integration', label: 'Device integration & supply' },
        { value: 'edge-ai', label: 'Edge AI (ACAP or equivalent)' },
        { value: 'other', label: 'Other' },
      ],
      noteLabel: 'Note',
      notePlaceholder: 'A short description of what you have in mind (optional)...',
      submitLabel: 'Send inquiry',
      submittingLabel: 'Sending...',
      successTitle: 'Sent successfully!',
      successBody: 'Thank you. Our team will get back to you as soon as possible.',
      resetLabel: 'Send another inquiry',
      submitErrorLabel: 'Something went wrong sending your request. Please try again, or reach us directly at support@nothanagentic.vn or +84 983 650 552.',
      errors: {
        errCompany: 'Company/organization name must be at least 2 characters',
        errEmailRequired: 'Please enter your work email',
        errEmailInvalid: 'Invalid work email format',
        errRegion: 'Please enter a region',
        errInterest: 'Please select a cooperation model',
      },
    },
  },
  sv: {
    metaTitle: 'Lösningspartner för tillverkare av kamerahårdvara - Nỏ Thần Agentic',
    metaDescription:
      'Nỏ Thần Agentic närmar sig tillverkare av kamera- och övervakningshårdvara (Axis, Hikvision) som en lösningspartner: vi utvecklar programvara på tillverkarens plattform och integrerar hårdvaran i nyckelfärdiga projekt i Vietnam.',
    eyebrow: 'Partners',
    h1: 'För hårdvarutillverkare',
    intro:
      'Vi närmar oss tillverkare av kamera- och övervakningshårdvara som en lösningspartner (Solution Partner): vi utvecklar programvara på tillverkarens plattform, och integrerar samt levererar deras hårdvara i nyckelfärdiga projekt i Vietnam. Det här är riktningen vi driver; inget avtal är undertecknat med någon hårdvarutillverkare ännu. Den här sidan beskriver konkret vad vi tillför när vi samarbetar.',
    valuesEyebrow: 'Varför samarbeta med oss',
    valuesTitle: 'Vad vi tillför en hårdvarutillverkare',
    values: [
      {
        title: 'Programvara gör er hårdvara mer värd.',
        body: 'Varje affärsproblem vi löser direkt på tillverkarens kamera (lagerräkning, upptäckt av bristande skyddsutrustning, tidsstämplade bevis) är ett konkret skäl för en företagskund att välja just den enheten framför en billigare utan tillhörande mjukvarulager. En kamera med analysprogramvara löser ett konkret driftproblem direkt vid installation.',
      },
      {
        title: 'Återkommande abonnemangsintäkter, hårdvara i samma paket.',
        body: 'Vår affärsmodell bygger på abonnemangsbaserad programvara (månads-, kvartals- eller årsvis) kombinerad med hårdvaruleverans. Så länge en kund använder systemet fortsätter vi underhålla och förbättra det enligt det tecknade avtalet, inte bara fram till slutbesiktningen.',
      },
      {
        title: 'Ett internt utvecklingsteam.',
        body: 'Fyra personer i utvecklingsteamet är anställda i företaget. Samma person som skriver koden för SOAI installerar den på fabriken, så en djup teknisk fråga om API:et eller inferensprestanda går direkt till personen som skrev koden.',
      },
    ] satisfies ValueProp[],
    formsEyebrow: 'Samarbetsmodeller',
    formsTitle: 'Samarbetsformer vi driver',
    forms: [
      {
        icon: Code2,
        title: 'Programvaruutveckling på tillverkarens plattform (ADP/ISV)',
        body: 'Att gå med i en tillverkares formella partnerprogram för mjukvaruutvecklare, och bygga applikationer och integrationer på den plattform de tillhandahåller, vilket ger analys- och automatiseringsvärde till kunder som redan använder deras hårdvara.',
      },
      {
        icon: PackageCheck,
        title: 'Hårdvaruintegration och leverans för nyckelfärdiga projekt',
        body: 'Att agera systemintegratör: välja ut, integrera och leverera tillverkarens hårdvara till projekt för produktionsövervakning, arbetsmiljösäkerhet och varukontroll hos vietnamesiska företag, tillsammans med vår egen analysprogramvara.',
      },
      {
        icon: Cpu,
        title: 'Samutveckling av edge-AI på kameran',
        body: 'Att bädda in detekteringsmodeller direkt i tillverkarens hårdvara via deras utvecklingsplattform för edge (ACAP eller motsvarande) är ett föreslaget samarbetsspår. Ej implementerat ännu.',
        tag: 'roadmap' as Status,
      },
    ] satisfies CooperationForm[],
    matrixEyebrow: 'Öppen arkitektur',
    matrixTitle: 'Integrationsmatris för enheter',
    matrixNote:
      'Ett abstraktionslager, DeviceProvider, separerar bildkällan från analyskärnan. Att lägga till en ny enhetstyp innebär att skriva ett nytt plugin, inte att skriva om kärnan. Det är också skälet till att integration med en ny tillverkares plattform inte kräver att systemet byggs om.',
    matrixCols: { device: 'Enhetstyp', interfaces: 'Integrationsgränssnitt', status: 'Status', note: 'Anteckning' },
    deviceRows: [
      {
        device: 'IP-kameror med öppen standard',
        interfaces: 'ONVIF Profile S · RTSP',
        status: 'live',
        note: 'Livevisning, schemalagda ögonblicksbilder, inspelning och tidsstämplad klippextraktion.',
      },
      {
        device: 'Axis',
        interfaces: 'VAPIX · ONVIF',
        status: 'poc',
        note: 'Enhetsstyrning och åtkomst till videoström. Diskussioner pågår om att gå med i tillverkarens partnerprogram.',
      },
      {
        device: 'Axis - edge-AI',
        interfaces: 'ACAP',
        status: 'roadmap',
        note: 'Att bädda in detekteringsmodeller direkt i kameran via ACAP. Ej implementerat; ett föreslaget tekniskt samarbetsmål med tillverkaren.',
      },
      {
        device: 'Hikvision',
        interfaces: 'ISAPI · SDK',
        status: 'poc',
        note: 'Integration av videoström och enhetshantering.',
      },
      {
        device: 'Edge-processorenheter',
        interfaces: 'x86 · NVIDIA Jetson',
        status: 'poc',
        note: 'Inferens på plats när bandbredd eller datapolicy inte tillåter att bilder skickas till en central server.',
      },
      {
        device: 'Kassaenheter (POS)',
        interfaces: 'POS · streckkodsläsare · QR-utskrift',
        status: 'roadmap',
        note: 'Del av fas 2 i VOMA-plattformen. Ej implementerat.',
      },
    ] satisfies DeviceRow[],
    processEyebrow: 'Så börjar vi',
    processTitle: 'Arbetsprocess',
    process: [
      { title: 'Inledande dialog', body: 'En kort introduktion till tillverkarens behov och vår kompetens, för att se om det finns en matchning.' },
      { title: 'Gemensam teknisk genomgång', body: 'Båda parter går igenom API/SDK, integrationskrav och specifika datavillkor.' },
      { title: 'Pilot-POC', body: 'Ett verkligt scenario driftsätts på tillverkarens hårdvara för att verifieras innan skalning.' },
      { title: 'Driftsättning', body: 'Utrullning till verkliga projekt i både programvaru- och hårdvarulagret.' },
    ] satisfies ProcessStep[],
    ctaEyebrow: 'Kontakt',
    ctaTitle: 'Starta en dialog',
    ctaBody: 'Lämna era uppgifter och vårt utvecklingsteam återkommer direkt med ett förslag anpassat till den samarbetsform ni är intresserade av.',
    formLabels: {
      heading: 'Starta en dialog',
      body: 'Lämna era uppgifter och vårt utvecklingsteam återkommer direkt med ett förslag anpassat till den samarbetsform ni är intresserade av.',
      companyLabel: 'Företag / organisation',
      companyPlaceholder: 't.ex. Axis Communications',
      emailLabel: 'Arbetsmejl',
      emailPlaceholder: 'namn@foretag.com',
      regionLabel: 'Region',
      regionPlaceholder: 'Vietnam / Sydostasien',
      interestLabel: 'Önskad samarbetsform',
      interestPlaceholder: 'Välj en samarbetsform',
      interestOptions: [
        { value: 'software-platform', label: 'Programvaruutveckling på er plattform' },
        { value: 'device-integration', label: 'Hårdvaruintegration & leverans' },
        { value: 'edge-ai', label: 'Edge-AI (ACAP eller motsvarande)' },
        { value: 'other', label: 'Annat' },
      ],
      noteLabel: 'Meddelande',
      notePlaceholder: 'En kort beskrivning av vad ni har i åtanke (valfritt)...',
      submitLabel: 'Skicka förfrågan',
      submittingLabel: 'Skickar...',
      successTitle: 'Skickat!',
      successBody: 'Tack. Vårt team återkommer så snart som möjligt.',
      resetLabel: 'Skicka en till förfrågan',
      submitErrorLabel: 'Något gick fel när förfrågan skickades. Försök igen, eller kontakta oss direkt på support@nothanagentic.vn eller +84 983 650 552.',
      errors: {
        errCompany: 'Företags-/organisationsnamnet måste vara minst 2 tecken',
        errEmailRequired: 'Ange en arbetsmejladress',
        errEmailInvalid: 'Ogiltigt format på arbetsmejladressen',
        errRegion: 'Ange en region',
        errInterest: 'Välj en samarbetsform',
      },
    },
  },
} as const;

function pick(locale: string) {
  return content[locale as Locale] ?? content.en;
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

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (['vi', 'en', 'sv'].includes(rawLocale) ? rawLocale : 'en') as Locale;
  const t = pick(rawLocale);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper text-ink antialiased">
        {/* 1. Intro */}
        <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-wider text-orange">
              <Handshake className="w-4 h-4" />
              {t.eyebrow}
            </span>
            <h1 className="font-display text-h1 font-extrabold text-white">{t.h1}</h1>
            <p className="text-body text-white/80 leading-relaxed max-w-3xl">{t.intro}</p>
          </div>
        </section>

        {/* 2. Value propositions */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.valuesTitle}>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.valuesEyebrow}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.valuesTitle}</h2>
            </div>

            <div className="space-y-8">
              {t.values.map((v, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="font-mono text-caption text-orange-600 mt-1.5 shrink-0">0{idx + 1}</span>
                  <div className="space-y-2">
                    <p className="text-h3 font-bold text-ink">{v.title}</p>
                    <p className="text-body text-navy-400 leading-relaxed">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Cooperation forms */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.formsTitle}>
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.formsEyebrow}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.formsTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.forms.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-line p-8 space-y-4"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-3 bg-ink rounded-lg w-fit">
                        <Icon className="w-6 h-6 text-orange" />
                      </div>
                      {f.tag && <StatusTag status={f.tag} locale={locale} />}
                    </div>
                    <h3 className="text-h3 font-bold text-ink">{f.title}</h3>
                    <p className="text-body text-navy-400 leading-relaxed">{f.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Device matrix */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.matrixTitle}>
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.matrixEyebrow}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.matrixTitle}</h2>
              <p className="text-body text-navy-400 leading-relaxed">{t.matrixNote}</p>
            </div>

            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[640px] text-body">
                <thead>
                  <tr className="bg-paper">
                    <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">
                      {t.matrixCols.device}
                    </th>
                    <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line whitespace-nowrap">
                      {t.matrixCols.interfaces}
                    </th>
                    <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">
                      {t.matrixCols.note}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.deviceRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-line last:border-b-0">
                      <td className="px-4 py-3.5 font-semibold text-ink align-top whitespace-nowrap">{row.device}</td>
                      <td className="px-4 py-3.5 font-mono text-caption text-navy-400 align-top whitespace-nowrap">{row.interfaces}</td>
                      <td className="px-4 py-3.5 text-navy-400 align-top">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Working process */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.processTitle}>
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.processEyebrow}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.processTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {t.process.map((step, idx) => {
                const icons = [MessagesSquare, ShieldCheck, FlaskConical, Rocket];
                const Icon = icons[idx] ?? Timer;
                return (
                  <div key={idx} className="bg-white border border-line p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-caption text-orange-600">0{idx + 1}</span>
                      <Icon className="w-5 h-5 text-navy-400" />
                    </div>
                    <p className="text-body font-bold text-ink">{step.title}</p>
                    <p className="text-caption text-navy-400 leading-relaxed">{step.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Partner inquiry form */}
        <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden" id="doi-tac-lien-he" aria-label={t.ctaTitle}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,84,30,0.1),transparent_50%)]" />

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-wider text-orange">
                {t.ctaEyebrow}
              </span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-white leading-tight">{t.ctaTitle}</h2>
              <p className="text-body text-paper/80 leading-relaxed">{t.ctaBody}</p>
            </div>

            <PartnerInquiryForm labels={t.formLabels} />
          </div>
        </section>
      </main>
      <Footer />
      <CommandPalette />
      <FloatingContact />
    </>
  );
}
