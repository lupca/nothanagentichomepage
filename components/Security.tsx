import React from 'react';
import { getLocale } from 'next-intl/server';
import { KeyRound, ShieldAlert, Server } from 'lucide-react';
import { Reveal } from './Reveal';

const content = {
  vi: {
    tag: 'Nguyên tắc engineering',
    heading: 'Xử lý lỗi và ghi log',
    body: 'Hệ thống định nghĩa một hệ phân cấp ngoại lệ SOAIException và không nuốt exception ở bất kỳ tầng nào. Video hỏng, mã QR mờ, mất kết nối camera, hoặc lỗi FFmpeg đều trả về mã lỗi HTTP tuân theo chuẩn RFC, kèm một dòng log chi tiết ghi lại thời điểm và nguyên nhân.',
    cards: [
      { title: 'Mã hoá khi lưu', body: 'Thông tin đăng nhập thiết bị mã hoá bằng Fernet.' },
      { title: 'Chặn path traversal', body: 'Mọi API đọc/tải tệp đều kiểm tra đường dẫn trước khi trả file.' },
      { title: 'Chủ quyền dữ liệu', body: 'Triển khai được hoàn toàn trong mạng nội bộ khách hàng, on-prem.' },
    ],
  },
  en: {
    tag: 'Engineering principle',
    heading: 'Error handling and logging',
    body: 'The system defines a SOAIException class hierarchy and does not swallow exceptions at any layer. Corrupt video, a blurred QR code, a dropped camera connection, or an FFmpeg failure each return an RFC-compliant HTTP error response, together with a detailed log entry.',
    cards: [
      { title: 'Encrypted at rest', body: 'Device credentials are encrypted using Fernet.' },
      { title: 'Path traversal blocked', body: 'Every file-read/download API validates the path before returning a file.' },
      { title: 'Data sovereignty', body: 'Fully deployable inside the customer’s internal network, on-prem.' },
    ],
  },
  sv: {
    tag: 'Teknisk princip',
    heading: 'Felhantering och loggning',
    body: 'Systemet definierar en klasshierarki, SOAIException, och sväljer inga undantag i något lager. Skadad video, en suddig QR-kod, en tappad kameraanslutning eller ett FFmpeg-fel returnerar vart och ett ett RFC-kompatibelt HTTP-felsvar, tillsammans med en detaljerad loggpost.',
    cards: [
      { title: 'Krypterat i vila', body: 'Enhetsuppgifter krypteras med Fernet.' },
      { title: 'Skydd mot path traversal', body: 'Alla API:er för filläsning/nedladdning validerar sökvägen innan en fil returneras.' },
      { title: 'Datasuveränitet', body: 'Kan installeras helt inom kundens interna nätverk, on-prem.' },
    ],
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface SecurityProps {}

export const Security: React.FC<SecurityProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);
  const icons = [KeyRound, ShieldAlert, Server] as const;

  return (
    <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24" id="bao-mat" aria-label="Security and engineering principles">
      <div className="max-w-4xl mx-auto space-y-8">
        <Reveal className="space-y-3">
          <span className="text-caption font-mono uppercase tracking-wider text-orange">{t.tag}</span>
          <h2 className="font-display text-2xl md:text-h2 font-bold text-white">{t.heading}</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-body text-paper/80 leading-relaxed max-w-2xl">{t.body}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {t.cards.map((card, idx) => {
            const Icon = icons[idx]!;
            return (
              <Reveal key={idx} delay={idx * 0.07}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-2.5 h-full">
                  <Icon className="w-5 h-5 text-orange" />
                  <p className="text-body font-bold text-white">{card.title}</p>
                  <p className="text-caption text-white/60 leading-relaxed">{card.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Security;
