import React from 'react';
import { getLocale } from 'next-intl/server';

const content = {
  vi: {
    quote: 'Phần cứng là cây nỏ. Agentic AI là mũi tên. Chúng tôi làm cả hai.',
    p1: 'Một mô hình AI đặt trên máy chủ có thể rất chính xác mà vẫn vô dụng, nếu nó không nhìn thấy dây chuyền và không ai hành động theo nó. Giá trị chỉ xuất hiện ở nơi phần mềm chạm được vào thiết bị: camera nào, đặt ở đâu, suy luận tại biên hay trên máy chủ, ai duyệt cảnh báo, và điều gì xảy ra trong ba giây sau đó. Chúng tôi nhận trách nhiệm cho toàn bộ đường đi đó — chọn thiết bị, tích hợp, mô hình, giao diện vận hành, và bảo trì.',
    p2: 'Nỏ thần là vũ khí trong truyền thuyết Âu Lạc, được nhớ đến vì độ chính xác và vì một lần giương bắn ra nhiều mũi. Với một công ty làm thị giác máy tính cho an toàn và an ninh, chúng tôi không tìm được cái tên nào đúng hơn.',
  },
  en: {
    quote: 'The hardware is the crossbow. Agentic AI is the arrow. We build both.',
    p1: 'A model sitting on a server can be highly accurate and still worthless, if it cannot see the production line and nobody acts on what it says. Value appears only where software touches equipment: which camera, mounted where, inference at the edge or on the server, who approves an alert, and what happens in the three seconds after. We take responsibility for that entire path — device selection, integration, models, the operator interface, and maintenance.',
    p2: 'Nỏ Thần is a crossbow from the legends of Âu Lạc, ancient Vietnam, remembered for its precision and for loosing many arrows with a single pull. For a company building computer vision for safety and security, we could not find a truer name.',
  },
  sv: {
    quote: 'Hårdvaran är armborstet. Agentic AI är pilen. Vi bygger båda.',
    p1: 'En modell som körs på en server kan vara mycket precis och ändå värdelös, om den inte kan se produktionslinjen och ingen agerar på det den säger. Värdet uppstår bara där mjukvaran möter utrustningen: vilken kamera, monterad var, inferens vid kanten eller på servern, vem som godkänner ett larm, och vad som händer under de tre sekunderna efter. Vi tar ansvar för hela den kedjan — val av utrustning, integration, modeller, operatörsgränssnittet och underhåll.',
    p2: 'Nỏ Thần är ett armborst ur legenderna om Âu Lạc, det forntida Vietnam, känt för sin precision och för att avfyra många pilar med ett enda drag. För ett företag som bygger datorseende för säkerhet hittade vi inget sannare namn.',
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface BrandStoryProps {}

export const BrandStory: React.FC<BrandStoryProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);

  return (
    <section className="bg-paper py-20 px-6 md:px-12 lg:px-24" aria-label="Brand story">
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        <p className="font-display text-2xl md:text-3xl font-bold text-ink leading-snug border-l-[3px] border-orange pl-6">
          {t.quote}
        </p>
        <p className="text-body text-navy-400 leading-relaxed">{t.p1}</p>
        <p className="text-body text-navy-400 leading-relaxed">{t.p2}</p>
      </div>
    </section>
  );
};

export default BrandStory;
