import type { Metadata } from 'next';
import { Newspaper, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';

interface Article {
  slug: string;
  title: string;
  datePublished: string;
  excerpt: string;
  body: string[];
}

interface Copy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  readMore: string;
  articles: Article[];
}

const content: Record<'vi' | 'en', Copy> = {
  vi: {
    metaTitle: 'Ghi chú kỹ thuật | Nỏ Thần Agentic',
    metaDescription:
      'Ghi chú kỹ thuật từ đội ngũ Nỏ Thần Agentic về các quyết định kiến trúc thực tế trong hệ thống giám sát hình ảnh SOAI — kiến trúc plugin, đếm SKU bằng SAHI, kiểm thử, và nguyên tắc "lỗi phải kêu".',
    eyebrow: 'Ghi chú kỹ thuật',
    h1: 'Tin tức & ghi chú kỹ thuật',
    intro:
      'Đây không phải trang tin tức doanh nghiệp. Đây là những ghi chú ngắn giải thích vì sao chúng tôi chọn một cách làm cụ thể, viết từ chính đội ngũ đã đưa ra quyết định đó — dựa trên hệ thống SOAI đã nghiệm thu POC.',
    readMore: 'Đọc tiếp',
    articles: [
      {
        slug: 'kien-truc-plugin-tich-hop-thiet-bi',
        title: 'Vì sao chúng tôi chọn kiến trúc plugin cho tích hợp thiết bị',
        datePublished: '2026-07-15',
        excerpt:
          'Camera IP không nói cùng một ngôn ngữ. ONVIF, VAPIX, ISAPI mỗi hãng một kiểu — nên chúng tôi tách phần đọc hình ảnh khỏi phần phân tích, để thêm một hãng mới không đụng tới lõi hệ thống.',
        body: [
          'Khi bắt đầu tích hợp camera cho hệ thống giám sát SOAI, chúng tôi gặp ngay một sự thật khó chịu: mỗi hãng camera có một giao thức riêng. Camera IP theo chuẩn mở dùng ONVIF Profile S và RTSP. Axis dùng VAPIX song song với ONVIF. Hikvision dùng ISAPI và SDK riêng của họ. Không có một API duy nhất để "nói chuyện" với tất cả camera trên đời, và sẽ không bao giờ có.',
          'Nếu viết logic đọc từng loại camera lẫn vào logic phân tích AI, mỗi lần thêm một hãng mới là một lần sửa lõi — rủi ro làm hỏng thứ đang chạy ổn định chỉ để thêm một thứ mới. Vì vậy chúng tôi dựng hai lớp trừu tượng tách biệt: `DeviceProvider` chịu trách nhiệm duy nhất là lấy được hình ảnh/video từ một thiết bị, bất kể giao thức gì bên dưới; `AnalysisEngine` chịu trách nhiệm duy nhất là phân tích một khung hình hoặc một video, không quan tâm hình đó lấy từ đâu.',
          'Kết quả thực tế: thêm hỗ trợ một dòng camera mới nghĩa là viết một plugin `DeviceProvider` mới tuân theo interface đã định nghĩa, không phải sửa lại engine phân tích hay các module đã nghiệm thu (đếm SKU, phân tích video đóng gói, live view...). Tương tự, thêm một nghiệp vụ kiểm tra AI mới là viết một `AnalysisEngine` mới, không phải đụng vào lớp đọc thiết bị.',
          'Đây cũng là lý do chúng tôi có thể đàm phán hợp tác kỹ thuật với Axis và Hikvision mà không cần viết lại hệ thống — dù mỗi hãng có SDK và tài liệu khác nhau, chúng tôi chỉ cần một plugin tuân theo cùng một hợp đồng interface.',
        ],
      },
      {
        slug: 'dem-sku-anh-mo-sahi-yolov8',
        title: 'Đếm SKU trên ảnh mờ: vì sao chúng tôi dùng SAHI cùng YOLOv8',
        datePublished: '2026-06-28',
        excerpt:
          'Một lần chạy suy luận nhìn cả bức ảnh thường bỏ lỡ những vật thể nhỏ, xếp dày và chen lấn nhau. Cắt ảnh thành từng lát trước khi đưa vào mô hình giải quyết đúng vấn đề đó.',
        body: [
          'Bài toán đếm SKU trên ảnh nghe đơn giản — đếm số hộp, số sản phẩm trong một khung hình — nhưng khó ở chỗ các vật thể thường nhỏ so với toàn bức ảnh, xếp sát nhau, và đôi khi ảnh có phần mờ do góc chụp hoặc điều kiện ánh sáng thực tế tại nhà máy hoặc kho hàng.',
          'Một mô hình object detection tiêu chuẩn như YOLOv8 chạy một lần suy luận trên toàn bức ảnh sẽ có xu hướng bỏ lỡ các vật thể nhỏ nằm dày đặc, vì mô hình phải "nhìn" cả bức ảnh lớn trong một lần và các vật thể nhỏ chiếm quá ít pixel để mô hình tự tin phát hiện.',
          'SAHI (Slicing Aided Hyper Inference) giải quyết vấn đề này bằng một cách rất trực tiếp: cắt ảnh gốc thành nhiều lát nhỏ chồng lấn nhau, chạy suy luận YOLOv8 riêng trên từng lát, rồi ghép kết quả lại và loại bỏ các phát hiện trùng lặp ở vùng chồng lấn. Vì mỗi lát nhỏ hơn, vật thể nhỏ trong lát đó chiếm tỷ lệ pixel lớn hơn — mô hình phát hiện chính xác hơn.',
          'Trong module đã nghiệm thu, cách kết hợp YOLOv8 và SAHI này cho ra kết quả đếm trong thời hạn SLA dưới 3 giây, kèm ảnh xuất ra có vẽ khung bounding box cho từng vật thể được đếm, và hệ thống lưu lại `model_version` đã dùng cho lần đếm đó — để khi khách hàng hỏi "vì sao lần này đếm khác lần trước", chúng tôi có thể tra ngược lại chính xác phiên bản mô hình đã chạy.',
        ],
      },
      {
        slug: '126-kich-ban-test-khong-ngoai-le-bi-nuot',
        title: '126 kịch bản test, không có ngoại lệ bị nuốt: cách chúng tôi kiểm thử hệ thống giám sát',
        datePublished: '2026-06-03',
        excerpt:
          'Với một hệ thống giám sát, phần mềm chạy "có vẻ ổn" trên ảnh hỏng còn nguy hiểm hơn phần mềm báo lỗi rõ ràng. Vì vậy khoảng một phần năm bộ test của chúng tôi cố tình đưa dữ liệu xấu vào hệ thống.',
        body: [
          'Bộ test của hệ thống SOAI được chia thành ba lớp. Lớp thứ nhất là 10 test suite unit và integration ở backend, bao phủ models, các `AnalysisEngine`, các worker xử lý bất đồng bộ (Celery) và các API. Lớp thứ hai là 99 kịch bản end-to-end, đi qua toàn bộ luồng dữ liệu thật: Upload → Process → Storage → Query — tức là kiểm tra không chỉ một hàm chạy đúng, mà cả một chuỗi bước từ lúc người dùng tải video lên đến lúc họ tra được kết quả.',
          'Lớp thứ ba là 27 bài test áp lực và đối kháng (stress & adversarial media test): đưa vào hệ thống video/ảnh mờ, file bị hỏng cấu trúc, mã QR không đọc được rõ, và kết nối mạng bị ngắt giữa lúc xử lý.',
          'Vì sao lớp thứ ba này quan trọng hơn ở một hệ thống giám sát so với phần mềm thông thường: nếu một ứng dụng quản lý văn bản gặp file hỏng và báo lỗi, người dùng thử lại là xong. Nhưng nếu một hệ thống giám sát gặp video hỏng hoặc ảnh mờ và im lặng trả về "không phát hiện vi phạm" — trông giống một kết quả bình thường — thì đó là một lỗ hổng an toàn thực sự, vì không ai biết hệ thống đã thất bại.',
          'Đó là lý do 27 bài test adversarial này không phải là phần "để có cho đủ bộ", mà là phần chúng tôi coi trọng nhất trong toàn bộ 126 kịch bản: chúng kiểm tra đúng cái ranh giới giữa "hệ thống báo lỗi rõ ràng" và "hệ thống im lặng trả về kết quả sai".',
        ],
      },
      {
        slug: 'vi-sao-khong-co-fallback-im-lang',
        title: 'Vì sao chúng tôi không có đường fallback im lặng',
        datePublished: '2026-05-12',
        excerpt:
          'Một exception bị nuốt âm thầm có thể biến một video hỏng thành một kết quả "không có vi phạm" trông hoàn toàn bình thường. Chúng tôi chọn để lỗi kêu lên, thay vì để nó biến mất.',
        body: [
          'Hãy tưởng tượng một tình huống cụ thể: một file video ghi lại quá trình đóng hàng bị hỏng một phần do lỗi ghi đĩa, và khi hệ thống cố trích xuất khung hình bằng FFmpeg, lệnh gọi thất bại. Có hai cách một hệ thống có thể xử lý việc này. Cách thứ nhất: bắt lỗi, trả về một kết quả mặc định rỗng — ví dụ "không tìm thấy mã QR" hoặc "không phát hiện vi phạm" — và tiếp tục chạy. Cách thứ hai: để lỗi đó nổi lên thành một exception rõ ràng, kèm thông tin vì sao thất bại.',
          'Chúng tôi chọn cách thứ hai một cách có chủ đích, và gọi nó là nguyên tắc "lỗi phải kêu". Toàn bộ hệ thống SOAI dùng một hệ thống ngoại lệ tuỳ biến gọi là `SOAIException`, phân theo loại lỗi cụ thể (lỗi cơ sở dữ liệu, file hỏng, lỗi xử lý media, lỗi kết nối thiết bị...). Mọi sự cố đều đi qua hệ thống này, được quăng lên thành một lỗi minh bạch kèm HTTP response tuân thủ chuẩn RFC, và được ghi log chi tiết.',
          'Lý do điều này quan trọng với đúng bản chất của một hệ thống giám sát: giá trị của hệ thống nằm ở việc nó có thể trả lời chính xác "có" hoặc "không" cho một câu hỏi nghiệp vụ (có đủ hàng không, có vi phạm an toàn không). Một cách fallback im lặng — trả về mặc định khi gặp lỗi — sẽ biến một sự cố kỹ thuật thành một câu trả lời nghiệp vụ sai, và người xem báo cáo sẽ không có cách nào phân biệt được "không có vi phạm thật" với "hệ thống đã thất bại nhưng không ai biết".',
          'Nói cách khác, một lỗi hiện rõ và được ghi log là một sự cố có thể sửa. Một lỗi bị nuốt âm thầm là một sự cố sẽ quay lại tìm chúng tôi — dưới dạng một khách hàng mất niềm tin vào dữ liệu mà hệ thống báo cáo.',
        ],
      },
    ],
  },
  en: {
    metaTitle: 'Technical notes | Nỏ Thần Agentic',
    metaDescription:
      'Technical notes from the Nỏ Thần Agentic team on real architecture decisions in the SOAI monitoring system — plugin architecture, SAHI-based SKU counting, testing strategy, and the "errors must be loud" principle.',
    eyebrow: 'Technical notes',
    h1: 'News & technical notes',
    intro:
      'This is not a corporate news feed. These are short notes explaining why we made a specific engineering choice, written by the team that made it — grounded in the SOAI system we have actually built and tested through a POC acceptance cycle.',
    readMore: 'Read more',
    articles: [
      {
        slug: 'plugin-architecture-device-integration',
        title: 'Why we chose a plugin architecture for device integration',
        datePublished: '2026-07-15',
        excerpt:
          'IP cameras do not speak one language. ONVIF, VAPIX, and ISAPI are each different, so we separated image acquisition from analysis — adding a new brand no longer touches the core.',
        body: [
          'When we started integrating cameras for the SOAI monitoring system, we ran into an inconvenient fact immediately: every camera vendor has its own protocol. Open-standard IP cameras use ONVIF Profile S and RTSP. Axis uses VAPIX alongside ONVIF. Hikvision uses ISAPI and its own SDK. There is no single API that talks to every camera in existence, and there never will be.',
          'If device-reading logic for each brand were mixed into the AI analysis logic, every new vendor added would mean touching the core — risking breakage of something already running reliably just to add something new. So we built two separate abstraction layers: `DeviceProvider`, whose only job is to fetch images or video from a device regardless of the protocol underneath, and `AnalysisEngine`, whose only job is to analyze a frame or a video without caring where it came from.',
          'The practical result: adding support for a new camera line means writing a new `DeviceProvider` plugin that follows the defined interface, not modifying the analysis engine or the already-accepted modules (SKU counting, packing video analysis, live view, and so on). Likewise, adding a new AI check is a new `AnalysisEngine`, not a change to the device layer.',
          'This is also why we can pursue technical partnership conversations with Axis and Hikvision without rewriting the system — even though each vendor has a different SDK and documentation, we only need one plugin conforming to the same interface contract.',
        ],
      },
      {
        slug: 'counting-skus-in-blurry-images-sahi-yolov8',
        title: 'Counting SKUs in blurry images: why we use SAHI with YOLOv8',
        datePublished: '2026-06-28',
        excerpt:
          'A single inference pass over a whole image tends to miss small, densely packed objects. Slicing the image before running the model solves exactly that problem.',
        body: [
          'SKU counting sounds simple — count the boxes or units in a frame — but it is hard because the objects are usually small relative to the whole image, packed tightly together, and sometimes the image itself is partially blurred due to camera angle or real lighting conditions on a factory floor or in a warehouse.',
          'A standard object detection model like YOLOv8, run once over the full image, tends to miss small objects packed densely, because the model has to take in the whole large image at once and small objects occupy too few pixels for it to detect confidently.',
          'SAHI (Slicing Aided Hyper Inference) addresses this directly: it slices the source image into overlapping tiles, runs YOLOv8 inference separately on each tile, then merges the results and removes duplicate detections in the overlapping regions. Because each tile is smaller, a small object within it occupies a larger share of pixels — so the model detects it more accurately.',
          'In the accepted module, combining YOLOv8 with SAHI this way delivers counts within a sub-3-second SLA, along with an exported image showing bounding boxes for each counted object, and the system records the `model_version` used for that count — so when a customer asks why a count differs from a previous run, we can trace back to exactly which model version produced it.',
        ],
      },
      {
        slug: '126-test-scenarios-no-swallowed-exceptions',
        title: '126 test scenarios, no swallowed exceptions: how we test a monitoring system',
        datePublished: '2026-06-03',
        excerpt:
          'In a monitoring system, software that looks fine while processing corrupted input is more dangerous than software that fails loudly. That is why roughly a fifth of our test suite deliberately feeds it bad data.',
        body: [
          'The SOAI test suite is organized into three layers. The first is 10 backend unit and integration suites, covering the models, the `AnalysisEngine` implementations, the asynchronous workers (Celery), and the APIs. The second is 99 end-to-end scenarios exercising the actual data flow: Upload → Process → Storage → Query — checking not just that a single function works, but that the whole chain from a user uploading a video to querying the result holds up.',
          'The third layer is 27 stress and adversarial-media tests: feeding the system blurry video or images, structurally corrupted files, QR codes that are not cleanly readable, and network connections that drop mid-processing.',
          'Why this third layer matters more here than in typical software: if a document management app hits a corrupted file and throws an error, the user just retries. But if a monitoring system hits a corrupted video or a blurry image and silently returns "no violation found" — which looks exactly like a normal result — that is a genuine safety gap, because nobody knows the system has failed.',
          'That is why these 27 adversarial tests are not a box-ticking addition — they are the part of the full 126-scenario suite we weight most heavily. They test exactly the boundary between "the system reports a clear error" and "the system silently returns a wrong result".',
        ],
      },
      {
        slug: 'why-we-have-no-silent-fallback',
        title: 'Why we have no silent fallback path',
        datePublished: '2026-05-12',
        excerpt:
          'A silently swallowed exception can turn a corrupted video into a "no violation found" result that looks entirely normal. We chose to let errors be loud instead of letting them disappear.',
        body: [
          'Picture a concrete case: a video recording of a packing run is partially corrupted by a disk write error, and when the system tries to extract frames via FFmpeg, the call fails. There are two ways a system can handle this. The first: catch the error, return an empty default result — say, "no QR code found" or "no violation detected" — and keep running. The second: let the failure surface as an explicit exception, with information about why it failed.',
          'We deliberately chose the second, and we call it the "errors must be loud" principle. The entire SOAI system runs on a custom exception hierarchy called `SOAIException`, categorized by specific failure type (database errors, corrupted files, media-processing errors, device connection errors, and so on). Every fault passes through this hierarchy, surfaces as a transparent error with an RFC-compliant HTTP response, and is logged in detail.',
          'Why this matters specifically for a monitoring system: the value of such a system rests on being able to answer a business question accurately — is stock sufficient, was there a safety violation. A silent fallback that returns a default on error turns a technical fault into a wrong business answer, and whoever reads the report has no way to tell "genuinely no violation" apart from "the system failed and nobody knew".',
          'Put simply, a loud, logged error is an incident that can be fixed. A silently swallowed one is an incident that comes back to find us later — as a customer who has lost trust in what the system reports.',
        ],
      },
    ],
  },
};

function pick(locale: string): Copy {
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

  const sorted = [...t.articles].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

  const jsonLd = sorted.map((a) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    datePublished: a.datePublished,
    author: { '@type': 'Organization', name: 'Nỏ Thần Agentic' },
    description: a.excerpt,
  }));

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

        {/* 2. Articles, most recent first */}
        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto space-y-16">
            {sorted.map((a, idx) => (
              <article key={a.slug} id={a.slug} className={idx > 0 ? 'pt-16 border-t border-line space-y-6' : 'space-y-6'}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-caption font-mono uppercase tracking-wider text-navy-400">
                    <Calendar className="w-4 h-4 text-orange-600" aria-hidden="true" />
                    <time dateTime={a.datePublished}>{a.datePublished}</time>
                  </div>
                  <h2 className="font-display text-h2 font-bold text-ink flex items-start gap-3">
                    <Newspaper className="w-6 h-6 text-orange-600 shrink-0 mt-1" aria-hidden="true" />
                    <span>{a.title}</span>
                  </h2>
                  <p className="text-body text-navy-400 leading-relaxed font-semibold">{a.excerpt}</p>
                </div>
                <div
                  className="bg-white border border-line p-8 space-y-4"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
                >
                  {a.body.map((p, i) => (
                    <p key={i} className="text-body text-navy-400 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <a
                  href={`#${a.slug}`}
                  className="inline-flex items-center gap-1.5 text-caption font-mono uppercase tracking-wider text-orange-600 hover:text-orange transition-colors"
                >
                  {t.readMore}
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <CommandPalette />
      <FloatingContact />
      {jsonLd.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
