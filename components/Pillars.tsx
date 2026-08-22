import React from 'react';
import { getLocale } from 'next-intl/server';
import { BrainCircuit, Cable, ShieldCheck } from 'lucide-react';
import { AIDecisionWidget } from './AIDecisionWidget';

const content = {
  vi: {
    heading: 'Ba trụ năng lực',
    pillars: [
      {
        title: 'Lõi Agentic AI',
        body: 'Không phải chatbot. Là tác nhân quan sát dây chuyền, đánh giá độ tin cậy, đề xuất quyết định và chờ người duyệt. Kết hợp mô hình thị giác chuyên biệt (YOLOv8, SAHI) với mô hình ngôn ngữ-thị giác cho các bài kiểm tra tuỳ biến theo mô tả bằng lời.',
      },
      {
        title: 'Tích hợp phần cứng',
        body: 'Một lớp trừu tượng DeviceProvider tách nguồn hình ảnh khỏi lõi phân tích: thêm dòng camera mới, đầu đọc mã, hay thiết bị POS là viết thêm plugin, không sửa lõi. Chúng tôi cung cấp cả thiết bị và triển khai tại chỗ, không chỉ giao phần mềm.',
      },
      {
        title: 'Bảo mật toàn diện',
        body: 'Thông tin đăng nhập thiết bị mã hoá khi lưu. Mọi API xem và tải tệp chặn path traversal. Hệ thống chạy được hoàn toàn trong mạng nhà máy — hình ảnh sản xuất của khách hàng không cần rời khỏi cơ sở của họ.',
      },
    ],
  },
  en: {
    heading: 'Three capability pillars',
    pillars: [
      {
        title: 'Agentic AI core',
        body: 'Not a chatbot. An agent that watches the line, scores its own confidence, proposes a decision, and waits for a human to approve it. We combine specialised vision models (YOLOv8, SAHI) with vision-language models for checks you can define in plain language.',
      },
      {
        title: 'Hardware integration',
        body: 'A DeviceProvider abstraction separates the image source from the analysis core: supporting a new camera line, barcode reader, or POS device means writing a plugin, not touching the core. We supply the equipment and do the on-site deployment, not just hand over software.',
      },
      {
        title: 'Security throughout',
        body: 'Device credentials are encrypted at rest. Every file-viewing and file-download endpoint blocks path traversal. The system can run entirely inside the plant network — our customers’ production footage never has to leave their premises.',
      },
    ],
  },
  sv: {
    heading: 'Tre kompetenspelare',
    pillars: [
      {
        title: 'Agentic AI i kärnan',
        body: 'Ingen chatbot. En agent som övervakar produktionslinjen, bedömer sin egen tillförlitlighet, föreslår ett beslut och väntar på att en människa godkänner det. Vi kombinerar specialiserade synmodeller (YOLOv8, SAHI) med vision-språkmodeller för kontroller du kan definiera i vanlig text.',
      },
      {
        title: 'Hårdvaruintegration',
        body: 'En abstraktion som kallas DeviceProvider separerar bildkällan från analyskärnan: att stödja en ny kameramodell, kodläsare eller kassaenhet innebär att skriva en plugin, inte att ändra kärnan. Vi levererar utrustningen och gör installationen på plats — inte bara mjukvaran.',
      },
      {
        title: 'Säkerhet genomgående',
        body: 'Enhetsuppgifter krypteras i vila. Alla API:er för filvisning och filnedladdning blockerar path traversal. Systemet kan köras helt inom fabrikens nätverk — våra kunders produktionsbilder behöver aldrig lämna deras lokaler.',
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
      className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line"
      id="nang-luc"
      aria-label="Three capability pillars"
    >
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="max-w-2xl space-y-4">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.pillars.map((pillar, idx) => {
            const Icon = icons[idx]!;
            return (
              <div
                key={idx}
                className="p-8 bg-paper border border-line"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
                }}
              >
                <div className="p-3 bg-ink rounded-lg w-fit mb-5">
                  <Icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-h3 font-bold text-ink mb-3">{pillar.title}</h3>
                <p className="text-body text-navy-400 leading-relaxed">{pillar.body}</p>
              </div>
            );
          })}
        </div>

        <AIDecisionWidget />
      </div>
    </section>
  );
};

export default Pillars;
