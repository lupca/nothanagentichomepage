import React from 'react';
import { getLocale } from 'next-intl/server';
import { BrainCircuit, Cable, ShieldCheck } from 'lucide-react';
import { AIDecisionWidget } from './AIDecisionWidget';
import { Reveal } from './Reveal';

const content = {
  vi: {
    heading: 'Ba trụ năng lực',
    pillars: [
      {
        title: 'Lõi Agentic AI',
        body: 'Tác nhân quan sát dây chuyền, chấm điểm độ tin cậy cho từng phát hiện, và đưa đề xuất vào hàng đợi chờ người duyệt. Kết hợp mô hình thị giác YOLOv8 và SAHI với mô hình ngôn ngữ-thị giác (VLM) cho các bài kiểm tra định nghĩa bằng vài ảnh mẫu.',
      },
      {
        title: 'Tích hợp phần cứng',
        body: 'Lớp trừu tượng DeviceProvider tách nguồn hình ảnh khỏi lõi phân tích AnalysisEngine. Thêm một dòng camera, đầu đọc mã, hoặc thiết bị POS mới nghĩa là viết một plugin mới. Đội kỹ thuật cung cấp thiết bị và thực hiện triển khai tại nhà máy khách hàng.',
      },
      {
        title: 'Bảo mật theo kiến trúc',
        body: 'Thông tin đăng nhập thiết bị mã hoá bằng Fernet khi lưu. Mọi API xem và tải tệp kiểm tra chặn path traversal trước khi trả file. Hệ thống có thể chạy hoàn toàn trong mạng nội bộ nhà máy; hình ảnh sản xuất không cần rời khỏi cơ sở của khách hàng.',
      },
    ],
  },
  en: {
    heading: 'Three capability pillars',
    pillars: [
      {
        title: 'Agentic AI core',
        body: 'The agent watches the line, scores its own confidence for each detection, and places a proposal in a review queue. We combine specialised vision models (YOLOv8, SAHI) with a vision-language model for checks defined with a few sample images.',
      },
      {
        title: 'Hardware integration',
        body: 'A DeviceProvider abstraction separates the image source from the analysis core, AnalysisEngine. Supporting a new camera line, barcode reader, or POS device means writing a new plugin. Our team supplies the equipment and carries out deployment at the customer site.',
      },
      {
        title: 'Security by architecture',
        body: 'Device credentials are encrypted with Fernet at rest. Every file-viewing and file-download endpoint checks for path traversal before returning a file. The system can run entirely inside the plant network; production footage never has to leave the customer’s premises.',
      },
    ],
  },
  sv: {
    heading: 'Tre kompetenspelare',
    pillars: [
      {
        title: 'Agentic AI i kärnan',
        body: 'Agenten övervakar produktionslinjen, bedömer sin egen tillförlitlighet för varje upptäckt, och lägger ett förslag i en granskningskö. Vi kombinerar specialiserade synmodeller (YOLOv8, SAHI) med en vision-språkmodell för kontroller definierade med några exempelbilder.',
      },
      {
        title: 'Hårdvaruintegration',
        body: 'En abstraktion som kallas DeviceProvider separerar bildkällan från analyskärnan, AnalysisEngine. Att stödja en ny kameramodell, kodläsare eller kassaenhet innebär att skriva en ny plugin. Vårt team levererar utrustningen och utför installationen hos kunden.',
      },
      {
        title: 'Säkerhet i arkitekturen',
        body: 'Enhetsuppgifter krypteras med Fernet i vila. Alla API:er för filvisning och filnedladdning kontrollerar path traversal innan en fil returneras. Systemet kan köras helt inom fabrikens nätverk; kundernas produktionsbilder behöver aldrig lämna deras lokaler.',
      },
    ],
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface PillarsProps {}

export const Pillars: React.FC<PillarsProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);
  const icons = [BrainCircuit, Cable, ShieldCheck] as const;

  return (
    <section
      className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line"
      id="nang-luc"
      aria-label="Three capability pillars"
    >
      <div className="max-w-7xl mx-auto space-y-14">
        <Reveal className="max-w-2xl space-y-4">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">
            {t.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.pillars.map((pillar, idx) => {
            const Icon = icons[idx]!;
            return (
              <Reveal key={idx} delay={idx * 0.07}>
                <div
                  className="p-8 bg-paper border border-line h-full"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
                  }}
                >
                  <div className="p-3 bg-ink rounded-lg w-fit mb-5">
                    <Icon className="w-6 h-6 text-navy-400" />
                  </div>
                  <h3 className="text-h3 font-bold text-ink mb-3">{pillar.title}</h3>
                  <p className="text-body text-navy-400 leading-relaxed">{pillar.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <AIDecisionWidget />
        </Reveal>
      </div>
    </section>
  );
};

export default Pillars;
