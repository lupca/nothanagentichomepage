import React from 'react';
import { getLocale } from 'next-intl/server';
import { KeyRound, ShieldAlert, Server } from 'lucide-react';

const content = {
  vi: {
    tag: 'Nguyên tắc engineering',
    heading: 'Lỗi phải kêu.',
    body: 'Hệ thống của chúng tôi không có đường fallback âm thầm và không nuốt exception. Video hỏng, mã QR mờ, mất kết nối camera, FFmpeg lỗi — mọi sự cố đều bật lên thành mã lỗi rõ ràng kèm log, thay vì trả về một kết quả trông có vẻ hợp lý. Trong giám sát sản xuất, một con số sai mà không ai biết là sai thì tệ hơn hẳn một lỗi hiện ra.',
    cards: [
      { title: 'Mã hoá khi lưu', body: 'Thông tin đăng nhập thiết bị mã hoá bằng Fernet.' },
      { title: 'Chặn path traversal', body: 'Mọi API đọc/tải tệp đều kiểm tra đường dẫn trước khi trả file.' },
      { title: 'Chủ quyền dữ liệu', body: 'Triển khai được hoàn toàn trong mạng nội bộ khách hàng, on-prem.' },
    ],
  },
  en: {
    tag: 'Engineering principle',
    heading: 'Failures must be loud.',
    body: 'Our systems have no silent fallback path and swallow no exceptions. Corrupt video, a blurred QR code, a dropped camera connection, an FFmpeg failure — every fault surfaces as an explicit error with a log entry, rather than a plausible-looking result. In production monitoring, a wrong number nobody knows is wrong is far worse than a visible error.',
    cards: [
      { title: 'Encrypted at rest', body: 'Device credentials are encrypted using Fernet.' },
      { title: 'Path traversal blocked', body: 'Every file-read/download API validates the path before returning a file.' },
      { title: 'Data sovereignty', body: 'Fully deployable inside the customer’s internal network, on-prem.' },
    ],
  },
  sv: {
    tag: 'Teknisk princip',
    heading: 'Fel måste synas.',
    body: 'Våra system har ingen tyst reservlösning och sväljer inga undantag. Skadad video, en suddig QR-kod, en tappad kameraanslutning, ett FFmpeg-fel — varje störning blir ett tydligt felmeddelande med en loggpost, i stället för ett resultat som ser rimligt ut men inte är det. Vid produktionsövervakning är ett felaktigt tal som ingen vet är felaktigt betydligt värre än ett synligt fel.',
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
        <div className="space-y-3">
          <span className="text-caption font-mono uppercase tracking-wider text-orange">{t.tag}</span>
          <h2 className="font-display text-2xl md:text-h2 font-bold text-white">{t.heading}</h2>
        </div>

        <p className="text-body text-paper/80 leading-relaxed max-w-2xl">{t.body}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {t.cards.map((card, idx) => {
            const Icon = icons[idx]!;
            return (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-2.5">
                <Icon className="w-5 h-5 text-orange" />
                <p className="text-body font-bold text-white">{card.title}</p>
                <p className="text-caption text-white/60 leading-relaxed">{card.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Security;
