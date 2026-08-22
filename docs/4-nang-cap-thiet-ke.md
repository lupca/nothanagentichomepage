# Bản Nâng Cấp Thiết Kế & Nội Dung — nothanagentic.vn

> **Trạng thái:** đề xuất; các dữ kiện chặn đã được cung cấp; thông tin pháp lý và hợp đồng đã được xác nhận, ngày 2026-08-22
> **Ngày:** 2026-08-22
> **Người viết:** Claude (theo yêu cầu của Tùng)
> **Phạm vi:** toàn site, ưu tiên nội dung > cấu trúc > hình ảnh > hiệu ứng
> **Tài liệu nền:** `docs/1.md` (biên bản họp), `docs/2.md` (định hướng Axis), `docs/3.md` (nghiệm thu POC SOAI)

---

## 0. Tóm tắt cho người đọc nhanh

Site hiện tại **đúng về định hướng, sai về giọng nói**. Cấu trúc thông tin hợp lý, hệ màu và typography nghiêm túc, trạng thái năng lực được gắn nhãn trung thực. Nhưng câu chữ được viết theo giọng "luận đề marketing" trong khi người đọc mục tiêu — thẩm định viên tại Axis — được huấn luyện để đọc giọng "mô tả chức năng". Càng cố thuyết phục, càng mất điểm.

Ba việc phải làm, theo đúng thứ tự:

1. **Sửa form.** Cả hai form trên site là hàng giả, lead đi vào hư không. Đây là lỗi kinh doanh, không phải lỗi thiết kế. Làm trước mọi thứ khác.
2. **Viết lại toàn bộ câu chữ** theo bộ luật ở Mục 3. Đây là phần chiếm 70% giá trị của bản nâng cấp này.
3. **Thêm hình ảnh thật và phá vỡ sự đơn điệu bố cục.** Một công ty thị giác máy tính hiện đang không có một bức ảnh nào trên site.

Và một cơ hội chiến lược mà nghiên cứu đối thủ chỉ ra rất rõ, ở Mục 5.7.

---

## 1. Kết quả nghiên cứu đối thủ

Đã khảo sát 20 trang chủ, chia 4 cụm.

### 1.1 Cụm đối thủ trực tiếp — vision an toàn lao động công nghiệp

| Công ty | H1 | Chủ đề mạnh nhất |
|---|---|---|
| Voxel AI | "Physical AI For Industrial Operations, Safety, and Risk" | Số theo từng khách hàng có tên |
| Protex AI | "Site Intelligence for Smarter, Safer Operations" | Mật độ số cao nhất + báo cáo Verdantix |
| Intenseye | "The New Standard in Workplace Safety" | Có dòng phần cứng riêng (Sentinel) |
| Ambient.ai | "Agentic Physical Security for a World that can't wait." | Pedigree startup (YC, Forbes) |
| Chooch | "Your Supply Rooms, Always Accurate. Without the Work." | Ngách rất hẹp, câu chữ đơn giản nhất |

**Công thức viết chung của cả cụm:** câu khẳng định ngắn + số cụ thể có chủ thể. Ví dụ thật:

- Protex: "80% reduction in near-miss events within 54 days of deployment"
- Voxel: "Deploy to any site in 48 hours using your existing camera infrastructure."
- Intenseye: "Intenseye processes over 22 billion frames daily."
- Voxel/Autokiniton: "48% injury reduction, 47% cost reduction, expanded to 4 facilities"

Không ai trong 5 công ty này viết văn luận đề. Họ nói cái họ làm được, kèm số, kèm tên khách.

**3/5 dùng nền tối.** Nền tối là register mặc định hiện nay của định vị "industrial AI/safety" — hệ màu `ink` của mình đang đúng gu.

### 1.2 Cụm hệ sinh thái camera — quan trọng nhất với mình

| Công ty | Tín hiệu hệ sinh thái | Ghi chú |
|---|---|---|
| Network Optix | Logo-wall đối tác thật: NVIDIA, Hanwha, Axis, Hailo, Qualcomm, ARM, Dell, Seagate. SOC 2 + Inc. 5000. "4M+ devices across 190 countries" | Mạnh nhất cụm. Nav có mục **Developers** và **Partners** riêng ở cấp 1 |
| Irisity | Logo-wall: Genetec, Mobotix, Axis, Milestone, Intel, Hanwha. Bảng so sánh "IRIS+ vs Camera Analytics" | Trích dẫn có tên thật, nhưng không có số quy mô |
| Scylla | Mục "Scylla works with" — tương thích phần cứng ngay trang chủ. Có CTA tuyển đối tác | Con số 97.3% / 99.95% không kèm phương pháp đo → đọc ra mùi thổi phồng |
| Vaidio | NVIDIA + G2 4.8★. Khách: Medtronic, VW, USPS, JFK Airport | Định vị "Zero camera upgrades required" — **coi phần cứng là hàng thay thế được** |
| BriefCam | Đã bị Milestone thâu tóm, `briefcam.com` redirect vào trang con của Milestone | Mất luôn thương hiệu độc lập |
| Gorilla Technology | Không có logo đối tác, không có khách hàng có tên, không có tương thích phần cứng | Nav có mục "Investors" — trang chủ tối ưu cho sàn chứng khoán, không cho đối tác |

### 1.3 Axis công bố gì về tiêu chí xét đối tác — phát hiện giá trị nhất

Trang `axis.com/partner/application-development-partner-program` trong `docs/2.md` **đã 404**. Chương trình ADP có vẻ đã được gộp vào **Technology Integration Partner Program**. Cần xác nhận lại với người của Axis trước khi làm hồ sơ.

Axis nêu **bốn tiêu chí**, nguyên văn:

1. **Commercial solution** — "You provide a commercial solution that complements the Axis portfolio and solves a significant customer challenge."
2. **Established Go-To-Market** — "You have an active sales team and a proven GTM to drive your own sales."
3. **Marketing-readiness** — "You are committed to actively promote your solution alongside Axis."
4. **Customer success** — "You have a well-defined support structure to ensure high-quality service and reliability for customers."

Bản tiếng Đức bổ sung: "You have an active sales team and sell your solution to **more than one customer**."

**Đây là tiêu chí kinh doanh, không phải tiêu chí kỹ thuật.** Không có dòng nào yêu cầu chứng chỉ, bài test tương thích, hay artifact kỹ thuật trên trang công khai. Chương trình một tầng, không phân cấp.

Hệ quả trực tiếp cho site mình: **mình đang dồn gần như toàn bộ trang chủ vào chứng minh năng lực kỹ thuật, trong khi Axis công khai sàng lọc năng lực bán và vận hành support.** Đây là lệch trọng tâm nghiêm trọng nhất của site hiện tại. Xem Mục 5.7.

Ghi chú thêm: `axis.com/developer-community` cũng 404. Trang thật là "Axis for Developers", đưa ACAP và VAPIX lên card cấp 1. ACAP: "develop custom software applications that can run partially or entirely on the edge" — khớp trực tiếp với giai đoạn 2 trong lộ trình SOAI ở `docs/1.md`.

### 1.4 Giọng Axis — đo được, không phải cảm tính

Câu thật từ axis.com:

- "Get more than security. Expand into safety, efficiency, and business intelligence."
- "Keep an eye on what you need to – while safeguarding personal privacy."
- "In temporary or remote sites where you don't have access to a fixed network, deployable surveillance ensures you don't compromise on security."
- "Boost your operations, improve the visitor experience, and make every square foot count using real-time data."
- "Partnership is at our core. Through collaboration, we define and shape new opportunities in the market."

Đặc điểm đo được:

| Thuộc tính | Giá trị |
|---|---|
| Độ dài câu | 12–22 từ |
| Thể | mệnh lệnh hoặc hiện tại đơn |
| Mỗi câu gắn với | một tình huống dùng cụ thể (cổng vào, xe cộ, công trường tạm không có mạng cố định, mét vuông sàn) |
| Tính từ | chỉ loại chức năng: real-time, touchless, enterprise-grade, deployable |
| Không có | revolutionary, cutting-edge, seamless, game-changing, dấu chấm than, so sánh nhất (trừ "leader") |
| Ảnh | ảnh lắp đặt thật có dấu vết vận hành — sở cảnh sát, kho hàng, sàn luyện thép. Gần như không có render |
| Tài liệu kỹ thuật | **cố tình không đặt trên trang chủ** — nằm dưới Support, cách một click, nhãn rõ ràng |

**Đặc trưng cốt lõi: tiết chế như một dấu hiệu đẳng cấp.** Axis giả định người đọc đã tôn trọng họ và chỉ cần *được thông tin*, không cần *bị thuyết phục*. Trang chịu để trống. Số liệu đưa phẳng ("Axis in numbers"), không hô hào.

Con mắt sẽ đọc site mình được hiệu chuẩn theo đúng register này. Mọi thứ đọc ra "giải thích quá nhiều" hoặc "nhiều tính từ quá" sẽ bị nhận diện là lệch tông.

### 1.5 Ranh giới "hãng kỹ thuật" vs "xưởng gia công"

So sánh ba công ty Việt:

| | Cách tự gọi | Cơ chế tạo uy tín |
|---|---|---|
| **FPT.AI** | "A Region-Leading AI Platform" | Khách có tên (MB Bank, BIDV, Home Credit, FWD) + số ("3000+ Clients", "16M+ End-users") + xác nhận hãng phân tích (IDC MarketScape Major Player, G2 High Performer) + **trích dẫn có người thật ký tên** (đại diện MB Bank: "increase labor productivity by 60% and reduce 10% of common errors") + 3 văn phòng thật gồm **Tokyo** |
| **VinAI** | "Intelligence for Tomorrow, Today!" | Logo đối tác (Qualcomm), giải thưởng có tên (CES 2024 Innovation Award Honoree), 1 số kỹ thuật ("85% sensitivity"). Thiếu: bài báo khoa học, khách hàng toàn cầu có tên, headcount |
| **Rikkeisoft** | **"Trusted IT Outsourcing Provider"** | Logo khách (Panasonic, SoftBank, NTT Docomo) nhưng không kèm trích dẫn hay số. Ngôn ngữ xoay quanh chi phí/tốc độ/SLA |

**Chính từ "outsourcing" trong cách Rikkeisoft tự gọi mình là cái chốt phân loại trong đầu người đọc nước ngoài.** "Outsourcing provider" = năng lực cho thuê theo giờ. "AI platform" = sở hữu IP và có thẩm quyền kỹ thuật.

Dấu hiệu đọc ra **hãng kỹ thuật**: tự gọi là platform/AI company; xác nhận của hãng phân tích độc lập; trích dẫn khách hàng có tên người kèm số cụ thể; hiện diện quốc tế nói phẳng ("Tokyo", không phải "phủ APAC"); giải thưởng gắn với năng lực sản phẩm.

Dấu hiệu đọc ra **xưởng gia công**: có chữ "outsourcing"; luận điểm xoay quanh chi phí/tốc độ/SLA; logo-wall không kèm trích dẫn hay số; không có artifact nghiên cứu hay benchmark nào; **liệt kê dàn trải năng lực** (web/cloud/mobile/blockchain/AI/IoT) — dấu hiệu của nhà thầu tổng hợp, không phải chuyên gia.

`docs/1.md` đã nêu đúng mục tiêu này: "sản phẩm tạo ra phải mang lại giá trị sử dụng lâu dài thay vì bàn giao trọn gói kiểu gia công". Bản design này phải giữ ranh giới đó **bằng câu chữ**, không chỉ bằng ý định.

### 1.6 Chuẩn nội dung phục vụ thẩm định

Số liệu hành vi người mua B2B: 87% người mua doanh nghiệp đánh giá tư thế bảo mật của nhà cung cấp trước khi ký; hơn một nửa nêu vấn đề bảo mật ngay cuộc nói chuyện đầu tiên. Nhà cung cấp có trang trust + chứng chỉ + chính sách rõ ràng đi qua khâu security review nhanh hơn 20–30%.

**Cấu trúc Trust Center chuẩn (9 mục):**

1. Chứng chỉ / tuân thủ (SOC 2 Type II là credential mặc định được kỳ vọng)
2. Kiến trúc bảo mật mô tả bằng ngôn ngữ thường, **đủ cụ thể để kiểm chứng được** — ví dụ: "dữ liệu host trên AWS, mã hoá at-rest AES-256, in-transit TLS 1.3"
3. Danh sách subprocessor — còn ai chạm vào dữ liệu khách
4. Cam kết SLA — uptime, thời gian phản hồi sự cố, khôi phục thảm hoạ
5. Chính sách quyền riêng tư + tuyên bố xử lý/lưu trữ dữ liệu
6. Tuyên bố chu kỳ penetration testing
7. Đầu mối bảo mật có tên + kênh responsible disclosure
8. **Dấu thời gian "cập nhật lần cuối" trên mọi trang liên quan bảo mật** — trang cũ không cập nhật tự nó là cờ đỏ
9. Đường dẫn để kiểm chứng độc lập mọi tuyên bố tuân thủ

**Cách công ty chưa có chứng chỉ nên trình bày lộ trình:** ưu tiên độ chính xác hơn độ ấn tượng. Không được viết "SOC 2 compliant" khi chưa có báo cáo — phải viết dạng có ngày và bác bỏ được: "SOC 2 Type II audit in progress, expected completion [ngày]". Nguồn nghiên cứu nói thẳng: **một tuyên bố tuân thủ yếu hoặc bị thổi phồng còn tệ hơn không tuyên bố gì**, vì độ lệch giữa chính sách nói và thực tế làm sẽ lộ ra ở khâu kiểm chứng bằng chứng, và khi đó nó bị đọc là *không trung thực* thay vì *chưa trưởng thành*.

Điều này xác nhận nguyên tắc mình đã áp dụng từ đầu là đúng. Giữ nguyên hệ thống nhãn trạng thái.

**Cờ đỏ giết đánh giá nhà cung cấp:** né tránh khi trả lời bộ câu hỏi bảo mật; không có người chịu trách nhiệm bảo mật có tên; tuyên bố chứng chỉ không kiểm chứng được độc lập; trang trust cũ không có ngày cập nhật.

---

## 2. Chẩn đoán site hiện tại

### 2.1 Điểm đang làm đúng — giữ nguyên

- **Hệ thống nhãn trạng thái** (`đang chạy` / `poc` / `lộ trình`). Nghiên cứu Mục 1.6 xác nhận đây là lựa chọn đúng và là tài sản khác biệt. Scylla đưa "97.3%" không kèm phương pháp đo và trả giá bằng độ tin cậy; mình không mắc lỗi đó.
- **Hệ màu và typography.** `ink`/`navy`/`orange`/`paper` với Archivo + Plus Jakarta Sans + IBM Plex Mono là nghiêm túc, công nghiệp, khớp register cụm đối thủ.
- **Không bịa chứng chỉ, đối tác, khách hàng.** Tuyệt đối giữ.
- **Kiến trúc route** và phạm vi đa ngữ theo trang là hợp lý.

### 2.2 Vấn đề nội dung — ưu tiên cao nhất

**Tic văn phong "không phải X, mà là Y" xuất hiện ít nhất 12 lần trên toàn site:**

| File | Key | Câu |
|---|---|---|
| `components/Pillars.tsx` | `pillars[0].body` | "Not a chatbot. An agent that watches the line..." |
| `components/Pillars.tsx` | `pillars[1].body` | "...means writing a plugin, not touching the core... not just hand over software." (hai lần trong một đoạn) |
| `components/Hero.tsx` | `sub` | "...security as a default, not an option." |
| `components/DeviceMatrix.tsx` | `sub` | "...means writing a plugin, not touching the core." |
| `components/PartnerSection.tsx` | `points[1].body` | "...not one-off project delivery." |
| `components/Security.tsx` | `body` | "...far worse than a visible error." |
| `app/[locale]/doi-tac/page.tsx` | `values[0].body` | "Giá trị phần cứng không còn nằm ở thông số kỹ thuật, mà ở bài toán nó giải được..." |
| `app/[locale]/doi-tac/page.tsx` | `values[2].title` | "Đội kỹ thuật là người của chúng tôi, không phải bên thứ ba." |
| `app/[locale]/doi-tac/page.tsx` | `intro` | "Đây không phải một thoả thuận đã ký — đây là hướng đi..." |
| `app/[locale]/bao-mat/page.tsx` | `intro` | "...bảo mật không phải một ô cần tick trong hồ sơ năng lực — đó là lý do..." |
| `app/[locale]/giai-phap/soai/page.tsx` | `intro` | "Chúng tôi không bán một sản phẩm đóng gói cứng nhắc — mỗi bài toán..." |
| `app/[locale]/tuyen-dung/page.tsx` | `intro[1]` | "Đây không phải là điều cần che giấu..." |

Đọc một lần thấy sắc. Đọc mười hai lần thấy máy viết. **Đây là dấu hiệu nhận diện AI rõ nhất trên site.**

**Ẩn dụ và cách ngôn bị dùng như nội dung:**

- `BrandStory.tsx` → `quote`: "The hardware is the crossbow. Agentic AI is the arrow. We build both." — ba câu ngắn nhịp điệu, ẩn dụ mở rộng. Không truyền tải một dữ kiện kiểm chứng được nào.
- `BrandStory.tsx` → `p2`: "...we could not find a truer name." — so sánh nhất để biện minh cho một quyết định thương hiệu.
- `Security.tsx` → `heading`: "Failures must be loud." / "Lỗi phải kêu." — **khẩu hiệu này bị lặp nguyên văn trên 3 trang** (`bao-mat`, `cong-nghe`, `tin-tuc`). Việc bị tái sử dụng như vậy tự nó tố cáo nó là tagline marketing, không phải văn viết tự nhiên.
- `Commitments.tsx` → `sub`: "Only commitments a customer can actually catch us breaking."
- `doi-tac` → `values[1].title`: "Chúng tôi sống bằng doanh thu định kỳ, nên chúng tôi có lý do để ở lại." — câu nhân-quả dựng để nghe cho khéo, khẳng định động cơ như thể tự hiển nhiên.

**Danh sách ba thành phần (triadic list) dùng làm nhịp điệu:** `AIDecisionWidget.tsx` → `sub`: "The system detects, scores its own confidence, and proposes an action." Mô-típ này lặp khắp site.

**Bằng chứng thật thì dùng lặp chứ không xếp lớp.** Con số "126/126 test" xuất hiện nguyên văn ở 3 nơi: `StatsStrip` trang chủ, `cong-nghe` → `testingStats`, `giai-phap/soai` → `modulesNote`. Mình có bằng chứng thật rất tốt trong `docs/3.md` nhưng đang dùng đúng một mẩu ba lần thay vì trải ra thành nhiều lớp.

**Một lỗi dữ kiện thật cần sửa ngay, độc lập với chuyện giọng văn:** `tin-tuc` bài 3 — bản VI viết "một phần ba" số test là adversarial, bản EN viết "roughly a fifth". Thực tế 27/126 ≈ một phần năm. Hai bản ngữ đang nói ngược nhau. Sửa VI thành "khoảng một phần năm".

### 2.3 Vấn đề kỹ thuật nghiêm trọng

**Cả hai form là hàng giả — đây là lỗi P0.**

`components/LeadForm.tsx` (dòng 92–97) và `components/PartnerInquiryForm.tsx` (dòng 70–75) đều làm đúng một việc: `await new Promise(setTimeout(..., 1000))`, `console.log(...)`, rồi hiện màn hình thành công. Không có API route, không có lưu trữ, không có gửi mail.

Mọi lead nộp qua site từ trước tới nay đã mất. Nếu có người của Axis điền form xin hợp tác thì mình đã mất họ mà không biết. **Sửa trước mọi việc khác trong tài liệu này.**

**Trùng lặp code:**

- `StatusTag` + `STATUS_CLASS` + `STATUS_LABEL`: **6 bản copy-paste độc lập** trong `DeviceMatrix.tsx`, `cong-nghe`, `doi-tac`, `giai-phap/soai`, `giai-phap/voma`, `bao-mat`. Cùng ~15 dòng code.
- **Dữ liệu DeviceMatrix bị nhân bản 3 lần** (trang chủ, `cong-nghe`, `doi-tac`) với vài chỗ khác câu chữ. Rủi ro cả về bảo trì và về tính nhất quán — ba bảng này sẽ trôi khỏi nhau.
- `LeadForm.tsx` (221 dòng) và `PartnerInquiryForm.tsx` (236 dòng) là hai form gần y hệt, dựng độc lập, trùng cả style lỗi validation lẫn markup màn hình thành công.
- `app/globals.css` `@layer base` hardcode font-size cho `h1/h2/h3` (30/24/18px mobile, 56/40/24 desktop) **trùng và che** các utility `text-h1/h2/h3` trong Tailwind config. Hai hệ thống kích thước tiêu đề song song sẽ trôi khỏi nhau.

**Người dùng tiếng Thuỵ Điển bị rơi vào trang tiếng Anh không cảnh báo.** 4 route chỉ có vi/en (`cong-nghe`, `giai-phap/soai`, `giai-phap/voma`, `tin-tuc`, `tuyen-dung`) nhưng Header/Footer vẫn render link tiếng Thuỵ Điển tới chúng. `sitemap.ts` loại sv đúng, nhưng UI không chặn.

**Accessibility:**

- `CommandPalette.tsx`: không có focus trap (Tab thoát ra sau modal), và **không có nút bấm nào để mở** — chỉ có shortcut Cmd/Ctrl+K, nên người dùng chuột hoặc screen reader không có cách nào biết nó tồn tại.
- `FloatingContact.tsx`: panel chỉ mở bằng `group-hover`/`group-focus-within`, không có nút toggle bấm được bằng bàn phím, không có `aria-expanded`.
- Nguy cơ tương phản: `text-navy-400` (#4A4E6E) trên `bg-paper` (#F5F4F0) dùng tràn lan cho body copy. Cần đo lại WCAG AA.

### 2.4 Vấn đề thị giác

**Không có một bức ảnh nào trên toàn site.** `grep` `next/image` toàn bộ `app/` và `components/` ra đúng 1 kết quả: logo 40×40 trong `Logo.tsx`.

`public/` chỉ có: 2 file logo PNG, 2 file PDF hồ sơ năng lực. Không hero image, không screenshot sản phẩm, không ảnh camera, không ảnh sàn nhà máy, không ảnh đội ngũ. Kể cả trang sản phẩm chủ lực `giai-phap/soai` và trang kiến trúc `cong-nghe` — cả hai mô tả một dashboard vận hành đang chạy thật và một pipeline kiến trúc **hoàn toàn bằng chữ và hộp-đường kẻ HTML**, không một hình nào.

Đối chiếu: Axis dùng ảnh lắp đặt thật; Protex dùng GIF động của AI detection thật; Intenseye dùng ảnh render dòng thiết bị riêng; Voxel nhúng video. Mình đang là công ty thị giác máy tính duy nhất không có hình.

**Site chỉ có một module bố cục duy nhất.** Mô-típ "eyebrow + h2 + lưới card bo góc vát" lặp **15+ lần** toàn site: Pillars (3 card), Platforms (2), Security (3), `cong-nghe` (2+2+3), `cong-ty` (4), `doi-tac` (3+3+4), `soai` (3+3), `tuyen-dung` (3), `lien-he` (2), `tin-tuc` (4). Nhịp giữa các section chỉ được tạo bằng cách đổi màu nền `bg-white`/`bg-paper`/`bg-ink`.

Motif góc vát `clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'` dùng 13 lần — từ dấu hiệu nhận diện thành tiếng ồn.

Chip icon `p-3 bg-ink rounded-lg w-fit` bọc icon `text-orange` dùng 7+ lần như gần-như-cách-duy-nhất xử lý iconography.

**6 bảng gần y hệt nhau**, tất cả `min-w-[640px]` + nhiều cột `whitespace-nowrap` → chắc chắn phải cuộn ngang trên mọi điện thoại.

**Thiếu hoàn toàn thiết bị tạo uy tín:** không logo khách hàng, không case study, không trích dẫn, không ảnh đội ngũ (mục team trong `cong-ty` là 4 dòng tên + một dòng vai trò), không badge chứng chỉ, không video.

---

## 3. Bộ luật viết nội dung

Đây là phần quan trọng nhất của tài liệu. Áp cho cả VI, EN, SV.

### Luật 1 — Cấm cấu trúc "không phải X, mà là Y"

Số lần cho phép trên toàn site: **0**.

Cách sửa: bỏ nửa phủ định, giữ nửa khẳng định, và thêm một dữ kiện kiểm chứng được.

> **Trước:** "Not a chatbot. An agent that watches the line, scores its own confidence, proposes a decision, and waits for a human to approve it."
>
> **Sau:** "The agent scores each detection with a confidence value and holds it in a review queue. An operator approves or rejects before any action is taken."

> **Trước:** "Đội kỹ thuật là người của chúng tôi, không phải bên thứ ba."
>
> **Sau:** "Bốn người trong đội kỹ thuật là nhân sự của công ty. Người viết code cho SOAI cũng là người đi lắp đặt tại nhà máy."

### Luật 2 — Mỗi câu tuyên bố phải chứa một danh từ kiểm chứng được

Danh từ kiểm chứng được = con số, tên giao thức, tên module, tên thư viện, ngày tháng, tên vai trò. Nếu một câu không có cái nào và cũng không phải câu dẫn ngữ pháp, **xoá nó**.

> **Trước:** "Chúng tôi không bán một sản phẩm đóng gói cứng nhắc — mỗi bài toán khách hàng được phân tích riêng."
>
> **Sau:** "Kiến trúc plugin có hai lớp trừu tượng: `AnalysisEngine` cho phân tích và `DeviceProvider` cho nguồn hình. Thêm một dòng camera mới là viết một plugin, không sửa core."

### Luật 3 — Độ dài câu 12–22 từ, tối đa 1 dấu gạch ngang dài mỗi section

Dấu `—` hiện đang được dùng như bản lề tu từ ("X — đó là lý do Y"). Đó là tic. Cắt câu thành hai câu.

### Luật 4 — Danh sách từ cấm

Cấm ở mọi ngữ cảnh marketing: `toàn diện`, `tối tân`, `đột phá`, `cách mạng`, `vượt trội`, `hàng đầu`, `tiên phong`, `mạnh mẽ`, `linh hoạt` (khi không kèm cơ chế cụ thể), `giá trị cốt lõi`, `sứ mệnh`, `tầm nhìn`.

EN: `revolutionary`, `cutting-edge`, `game-changing`, `seamless`, `world-class`, `state-of-the-art`, `robust`, `powerful`, `comprehensive`, `leverage` (động từ), `unlock`, `empower`, `transform`.

Đối chiếu: **không một từ nào trong danh sách trên xuất hiện trên axis.com.**

### Luật 5 — Một khẩu hiệu cho cả site, không phải mỗi trang một lần

"Lỗi phải kêu" đang xuất hiện ở 3 trang. Giữ đúng **một** chỗ — trang `bao-mat`, nơi nó có bằng chứng đi kèm (`SOAIException`, không swallow exception, HTTP response RFC-compliant). Ở `cong-nghe` và `tin-tuc`, thay bằng mô tả cơ chế thật.

Xoá hẳn ẩn dụ "cái nỏ / mũi tên" trong `BrandStory.tsx`. Nó không mang dữ kiện nào và là câu đọc ra mùi AI rõ nhất trên trang chủ. Thay bằng một đoạn nói thẳng công ty làm gì, ai làm, và đang ở đâu trên lộ trình.

### Luật 6 — Mỗi bằng chứng dùng đúng một lần, ở nơi nó mạnh nhất

Trải `docs/3.md` thành nhiều lớp thay vì lặp "126/126":

| Bằng chứng | Đặt ở đâu |
|---|---|
| 126/126 test tự động, 8 test suite | Trang chủ, thanh proof — số đầu tiên người đọc gặp |
| 99 kịch bản E2E: Upload → Process → Storage → Query | `cong-nghe`, mục phương pháp kiểm thử |
| 27 bài stress test với video mờ, file hỏng, mạng đứt | `bao-mat`, để chứng minh "lỗi phải kêu" bằng số |
| SLA đếm vật thể < 3 giây (YOLOv8 + SAHI) | `giai-phap/soai`, bảng module |
| Mã hoá Fernet cho credential thiết bị, chống path traversal | `bao-mat`, mục kiến trúc bảo mật |
| Kiến trúc 2 lớp `AnalysisEngine` / `DeviceProvider` | `cong-nghe`, mục kiến trúc |
| 6 module nghiệm thu PASS, kèm stack từng module | `giai-phap/soai` |
| 7 màn hình frontend production build | `giai-phap/soai`, kèm **screenshot thật** |

### Luật 7 — Hạng mục "lộ trình" không bao giờ được viết bằng ngữ pháp của năng lực

Sai: "Tích hợp AI trực tiếp vào camera Axis." (đọc như đã làm được)
Đúng: "Nhúng AI trực tiếp vào camera qua ACAP là giai đoạn 2 của lộ trình SOAI. Hiện chưa triển khai."

Giữ nhãn trạng thái, nhưng **câu chữ phải tự đứng vững kể cả khi người đọc bỏ qua nhãn.**

### Luật 8 — Không tự đánh giá bản thân

Xoá mọi trạng từ tự khen không kiểm chứng được: "một cách nhất quán", "chuyên sâu", "thực chiến", "sẵn sàng mở rộng". Và xoá mọi so sánh với đối tượng không nêu tên ("thứ rất khó có được ở một công ty đã lớn").

### Luật 9 — Tránh đọc ra "xưởng gia công"

Theo Mục 1.5:

- Không liệt kê dàn trải năng lực. Nói thị giác máy tính công nghiệp, không nói "AI/IoT/cloud/mobile".
- Không dùng luận điểm chi phí hay tốc độ giao hàng làm điểm bán chính.
- Không dùng từ "gia công", "outsourcing", "nhận dự án" ở bất cứ đâu trong bản EN/SV.
- Nói phẳng về quy mô thật. Một công ty nhỏ nói thẳng mình nhỏ đọc ra tự tin; một công ty nhỏ viết như tập đoàn đọc ra không đáng tin — và đây chính là rủi ro thẩm định số một mà `docs/2.md` cảnh báo.

---

## 4. Hình ảnh — danh sách cần chụp

Không có ảnh là lỗ hổng thị giác lớn nhất. Chia 3 lớp theo độ khó.

### Lớp 1 — làm được ngay, không cần ra khỏi máy tính

| # | Ảnh | Dùng ở |
|---|---|---|
| 1 | Screenshot dashboard SOAI — màn hình live view + queue chờ duyệt | Trang chủ (hero phải), `giai-phap/soai` |
| 2 | Screenshot kết quả đếm SKU có vẽ bounding box | `giai-phap/soai` |
| 3 | Screenshot màn hình quản lý thiết bị (danh sách camera + test connection) | `cong-nghe` |
| 4 | Screenshot output test suite — 126/126 passed | `cong-nghe` hoặc `bao-mat`. Đây là bằng chứng mạnh nhất mình có mà đang chỉ kể bằng chữ |
| 5 | Screenshot một exception `SOAIException` thật với HTTP response và log | `bao-mat` — biến khẩu hiệu "lỗi phải kêu" thành bằng chứng xem được |

**Lưu ý bắt buộc:** che hết dữ liệu khách hàng thật trong screenshot. Nếu chưa có khách, dùng dữ liệu demo và **nói rõ đó là dữ liệu demo** trong caption. Không được để người đọc tưởng là triển khai thật.

### Lớp 2 — cần chụp tại chỗ

| # | Ảnh | Ghi chú |
|---|---|---|
| 6 | Bàn làm việc kỹ thuật thật, có camera IP đang cắm, máy tính biên | Register Axis: có dấu vết vận hành, không dàn dựng bóng bẩy |
| 7 | Ảnh đội ngũ — 4 người, chụp thật, không stock | Cho `cong-ty`. Không cần studio; ánh sáng tự nhiên, nền văn phòng thật |
| 8 | Cận cảnh phần cứng: camera + thiết bị biên + dây | Cho `cong-nghe` |
| 9 | Văn phòng tầng 1 sau khi hoàn thiện (theo `docs/1.md`, dự kiến cuối tháng 9) | Bằng chứng cơ sở vật chất — Axis quan tâm sự ổn định |

### Lớp 3 — chỉ khi có khách hàng thật đồng ý

| # | Ảnh |
|---|---|
| 10 | Ảnh lắp đặt tại nhà máy khách hàng |
| 11 | Ảnh khâu đóng hàng đang được giám sát |

**Quy tắc tuyệt đối:** không dùng ảnh stock nhà máy, không dùng render AI, không dùng ảnh "AI brain" hay mạng neuron phát sáng. Theo Mục 1.4, đó chính là loại hình ảnh mà con mắt Axis đọc ra là lệch tông. Thà không có ảnh còn hơn có ảnh giả.

---

## 5. Cấu trúc trang chủ v2

Thứ tự hiện tại có 12 section, đi từ luận đề (BrandStory) tới bằng chứng. Đảo lại: **bằng chứng trước, luận đề sau hoặc bỏ.**

### 5.1 Hero

Giữ layout 2 cột. Thay nội dung:

- H1: một câu khẳng định, 12–18 từ, chứa danh từ cụ thể. Bỏ cấu trúc lặp "real X, real Y".
- Bỏ hẳn dòng `sub` hiện tại (có "not an option").
- Thay diagram pipeline hộp-đường kẻ bằng **screenshot dashboard thật** (ảnh #1). Diagram vẽ bằng div đọc ra "chưa có sản phẩm"; screenshot đọc ra "có sản phẩm".
- Giữ 2 CTA. CTA phụ tải PDF hồ sơ năng lực — giữ.

### 5.2 Thanh bằng chứng (thay `StatsStrip`)

4 số, mỗi số **kèm nguồn kiểm chứng được**, không phải chỉ nhãn:

| Số | Nhãn | Nguồn |
|---|---|---|
| 126/126 | kịch bản test tự động đã pass | 8 test suite, kiểm định độc lập |
| 6/6 | module POC nghiệm thu PASS | báo cáo nghiệm thu SOAI |
| < 3s | SLA đếm vật thể trên ảnh | YOLOv8 + SAHI |
| 27 | bài stress test với media lỗi | video mờ, file hỏng, mạng đứt |

Đây là điểm mình học được từ Protex/Voxel: **số có chủ thể và có ngữ cảnh**. Số trần không có nguồn đọc ra như số bịa.

### 5.3 SOAI — sản phẩm chủ lực

Đưa lên cao. Hiện `Platforms` đặt SOAI và VOMA ngang hàng 2 card, nhưng VOMA là nền tảng của công ty khác trong nhóm. Cho SOAI một section riêng có screenshot, và VOMA một dòng dẫn link ngắn.

### 5.4 Chạy được với thiết bị gì

Giữ `DeviceMatrix` nhưng đây là **section duy nhất** chứa dữ liệu này (hiện đang nhân bản 3 lần). Các trang khác import từ một nguồn dữ liệu chung.

Chiếm khoảng trống mà Mục 1.2 chỉ ra: trong 6 đối thủ cùng hệ sinh thái camera, **chỉ Scylla có mục tương thích phần cứng trên trang chủ**. Với người đọc là hãng camera, đây là mục họ tìm đầu tiên.

Đổi bảng thành **danh sách card trên mobile**, bảng chỉ từ `md:` trở lên. Bỏ `min-w-[640px]`.

### 5.5 Cách nó hoạt động

Kiến trúc 2 lớp `AnalysisEngine` / `DeviceProvider`, giải thích bằng câu ngắn + screenshot #3. Nêu ACAP là con đường giai đoạn 2, gắn nhãn `lộ trình` rõ ràng.

### 5.6 Bảng bằng chứng POC

`Evidence` giữ nguyên cấu trúc, thêm screenshot #4 (output test). Đây là nơi duy nhất trên trang chủ nói chi tiết về test.

### 5.7 Mục mới — Năng lực làm đối tác

**Đây là đề xuất quan trọng nhất trong tài liệu này.**

Theo Mục 1.3, Axis công khai sàng lọc bốn thứ, và **không thứ nào là năng lực kỹ thuật thuần**. Không một đối thủ nào trong 20 trang đã khảo sát có mục trả lời trực tiếp bốn tiêu chí đó. Đây là khoảng trống mình chiếm được với chi phí gần bằng không — chỉ cần viết đúng cái mình đã có.

Cấu trúc 4 khối, ánh xạ 1-1 với tiêu chí Axis:

| Tiêu chí Axis | Mình trả lời bằng gì |
|---|---|
| **Commercial solution** | SOAI là sản phẩm thương mại có mô hình thu phí định kỳ kèm phần cứng đồng bộ (`docs/1.md`). Nêu rõ nó bổ trợ portfolio camera thế nào: phân tích tại biên trên thiết bị của hãng. |
| **Established Go-To-Market** | 2 khách hàng: TopVN Sport (hộ kinh doanh, đã ký hợp đồng SaaS VOMA ngày 05/08/2026, thời hạn 12 tháng, billing theo quý) và Soraicine (Công Ty TNHH Y Tế Soraicine, nhập khẩu và phân phối sản phẩm chăm sóc sức khoẻ Nhật Bản, chưa có hợp đồng ký với công ty). Đáp ứng đúng nghĩa "more than one customer" mà Axis yêu cầu, nhưng chỉ 1/2 khách hàng có hợp đồng đang hiệu lực. Kênh bán hiện tại là quan hệ cá nhân/quan hệ nghề nghiệp, chưa có đại lý, chưa có bộ máy bán hàng chủ động. Đây là GTM thật nhưng còn sơ khai — nói thẳng đúng như vậy, không dựng thành "kênh bán đa dạng" hay tương tự. |
| **Marketing-readiness** | Nêu cụ thể: site 3 ngôn ngữ gồm tiếng Thuỵ Điển, hồ sơ năng lực PDF hai bản ngữ, cam kết đồng thương hiệu. |
| **Customer success** | Support qua email `support@nothanagentic.vn`, điện thoại 0983650552, và trực tiếp tại văn phòng Hà Nội. Giờ hỗ trợ 9:00–17:00 các ngày làm việc (trừ lễ). Cam kết phản hồi trong 4 giờ làm việc. Cam kết uptime tối thiểu 98%/tháng, trừ bảo trì báo trước 24 giờ. Đây là số liệu theo hợp đồng đã ký, kiểm chứng được. Khi lên site phải nêu đúng các số này, không thêm bớt. |

Mục 1, 2, 3 ở Mục 8 đã có câu trả lời và được đưa vào bảng trên. Các mục còn thiếu (pháp lý, chứng chỉ, đầu mối bảo mật) xem Mục 8.

### 5.8 Bảo mật & nguyên tắc kỹ thuật

Rút ngắn trên trang chủ, dẫn sang `bao-mat`. Giữ khẩu hiệu "lỗi phải kêu" ở đây hoặc ở `bao-mat`, **chọn một**.

### 5.9 Công ty & đội ngũ

Thêm ảnh đội ngũ thật (#7). Nói phẳng quy mô. Theo Mục 1.5, nói thẳng mình nhỏ đọc ra tự tin hơn là viết như tập đoàn.

### 5.10 FAQ hướng thẩm định

Viết lại 3 câu hỏi hiện tại thành các câu mà thẩm định viên thật sẽ hỏi:

- Dữ liệu video lưu ở đâu, ai truy cập được, giữ bao lâu?
- Có chứng chỉ gì chưa, nếu chưa thì lộ trình ngày nào?
- Nếu công ty dừng hoạt động thì khách hàng lấy dữ liệu và tiếp tục vận hành ra sao?
- Ai chịu trách nhiệm bảo mật, liên hệ thế nào?

Ba câu cuối là ba mục trong danh sách 9 mục Trust Center ở Mục 1.6.

### 5.11 Form liên hệ

Form thật, có backend. Xem Mục 7.

**Bỏ khỏi trang chủ:** `BrandStory` (ẩn dụ cái nỏ) và `Commitments` (5 cam kết trừu tượng). Chuyển nội dung đã viết lại sang `cong-ty`. Trang chủ dành cho bằng chứng.

---

## 6. Hệ thống thị giác

### 6.1 Định nghĩa 5 module bố cục thay vì 1

Hiện chỉ có "eyebrow + h2 + lưới card". Bổ sung, tạo thành component dùng chung:

1. **`SectionCards`** — module hiện tại. Giới hạn dùng **tối đa 4 lần/trang**.
2. **`SectionSplit`** — 2 cột: chữ một bên, ảnh/screenshot một bên. Đảo chiều xen kẽ. Đây là module chở hình ảnh mới.
3. **`SectionProof`** — dải số ngang, nền tối, mỗi số kèm dòng nguồn nhỏ.
4. **`SectionTable`** — bảng từ `md:` trở lên, danh sách card dưới `md:`. Một implementation cho cả 6 bảng.
5. **`SectionQA`** — cặp hỏi-đáp cho FAQ và các mục thẩm định. Ưu tiên đọc, không phải lưới.

### 6.2 Tiết chế motif góc vát

`clipPath` góc vát đang dùng 13 lần. Giữ lại **chỉ cho card có nhãn trạng thái** — khi đó nó mang nghĩa ("đây là hạng mục năng lực có trạng thái"), không phải trang trí. Các card khác dùng viền phẳng.

Đây là nguyên tắc chung: **thiết bị cấu trúc phải mã hoá một điều gì đó đúng về nội dung**, không phải trang trí nó.

### 6.3 Sửa xung đột hệ thống tiêu đề

Xoá phần hardcode `h1/h2/h3` trong `app/globals.css` `@layer base`. Chỉ dùng utility `text-h1/h2/h3` từ Tailwind config. Một nguồn sự thật.

### 6.4 Tương phản

Đo lại `text-navy-400` (#4A4E6E) trên `bg-paper` (#F5F4F0) theo WCAG AA. Nếu không đạt ở 17px, tối màu `navy-400` lại hoặc chỉ dùng nó cho chữ phụ, không cho body copy.

### 6.5 Chuyển động

Chưa cần thêm thư viện. Hiện chưa có `framer-motion`, và register Axis không đòi hiệu ứng. Chỉ cần:

- Reveal nhẹ khi scroll cho các `SectionProof` — làm bằng CSS + IntersectionObserver, không cần thư viện.
- Tôn trọng `prefers-reduced-motion`.

Không làm parallax, không làm hiệu ứng cuộn phức tạp. Theo Mục 1.4, thừa hiệu ứng đọc ra lệch tông.

---

## 7. Refactor kỹ thuật

### P0 — làm ngay

| # | Việc | File |
|---|---|---|
| 1 | **Làm backend thật cho form — DONE.** `app/api/lead/route.ts` xác thực server-side bằng zod, ghi vào `data/leads.jsonl`, gửi email thông báo qua Resend HTTP API dùng fetch (không thêm thư viện). Có trường honeypot và rate limit 5 submissions/10 phút. Trả HTTP 500 khi gửi mail thất bại, khách thấy lỗi thay vì thành công giả. Kiểm chứng end-to-end với Playwright trên trình duyệt thật. | `app/api/lead/route.ts`, `LeadForm.tsx`, `PartnerInquiryForm.tsx` |
| 2 | Sửa lỗi dữ kiện "một phần ba" → "khoảng một phần năm" | `tin-tuc/page.tsx` |
| 3 | Kiểm lại: có lead nào đã bị mất mà cứu được không (log server, analytics) | — |
| 4 | Footer sai số điện thoại. Số đang hiện là 097 6007006 — theo hợp đồng, số này là của người đại diện hộ kinh doanh TopVN Sport, không phải của công ty. Số hỗ trợ đúng của công ty là 0983650552. Sửa footer | Footer |
| 5 | Footer sai địa chỉ. Địa chỉ đang hiện là "Phường Đức Thắng, Quận Bắc Từ Liêm". Địa chỉ đăng ký thật theo hồ sơ doanh nghiệp là "Số 1, ngõ 141/3, phố Lê Văn Hiến, Phường Đông Ngạc, Thành phố Hà Nội". Đã xác nhận sai — sửa footer về địa chỉ đăng ký | Footer |
| 6 | Điều 7.1.c của hợp đồng cấm công bố dữ liệu Bên B cho bên thứ ba khi chưa có sự đồng ý bằng văn bản — áp dụng cho screenshot tenant khách hàng. Bản ẩn danh dùng được ngay; bản có tên khách hàng cần có văn bản đồng ý lưu hồ sơ trước khi dùng | ảnh ở Mục 4 |
| 7 | **Đặt biến môi trường `RESEND_API_KEY` trên môi trường chạy thật.** Nếu chưa đặt, lead chỉ được ghi vào file trên đĩa và không có ai nhận được email. Cần tạo tài khoản Resend và lấy API key. | — |
| 8 | **Xác thực tên miền nothanagentic.vn trong Resend.** Giá trị mặc định của `LEAD_NOTIFY_FROM` hiện là địa chỉ thử nghiệm `onboarding@resend.dev`, chỉ dùng để test. Muốn mail gửi từ tên miền công ty thì phải xác thực tên miền, nếu không mail dễ vào spam. | — |
| 9 | **Xác định môi trường deploy.** Repo không có `vercel.json`, `Dockerfile` hay cấu hình CI nào, nên chưa rõ site chạy ở đâu. Nếu deploy trên Vercel hoặc Netlify thì filesystem là tạm thời: file `data/leads.jsonl` sẽ mất sau mỗi lần khởi động lại, và email là kênh duy nhất còn lại. Nếu deploy trên VPS có đĩa bền thì file backup mới có giá trị. Cần biết để chọn phương án lưu trữ lâu dài. | — |

Ghi chú: Tệp `.env.example` ở gốc repo ghi rõ ba biến môi trường trên và hành vi khi thiếu key.

### P1 — cùng lúc với việc viết lại nội dung

| # | Việc | File |
|---|---|---|
| 4 | Tách `StatusTag` thành component dùng chung, xoá 6 bản copy | `components/StatusTag.tsx` mới |
| 5 | Tách dữ liệu device matrix thành `data/devices.ts`, 3 trang import từ đó | 3 file |
| 6 | Gộp 2 form thành 1 component có field cấu hình được | `components/ContactForm.tsx` |
| 7 | Đổi 6 bảng sang pattern bảng-desktop/card-mobile | tất cả file có `<table>` |
| 8 | Xoá hardcode heading trong `globals.css` | `app/globals.css` |
| 9 | Xử lý sv: hoặc dịch 5 trang còn thiếu, hoặc ẩn link sv tới các trang đó, hoặc hiện banner "trang này chỉ có VI/EN" | Header, Footer, 5 page |

### P2 — sau khi nội dung đã xong

| # | Việc |
|---|---|
| 10 | Thêm nút mở CommandPalette có thể bấm được + focus trap + `aria-expanded` |
| 11 | `FloatingContact`: thêm nút toggle bấm được bằng bàn phím |
| 12 | Tạo 5 component section ở Mục 6.1, refactor các trang dùng lại |
| 13 | Trust Center đầy đủ 9 mục theo Mục 1.6, có dấu thời gian "cập nhật lần cuối" |
| 14 | Reveal khi scroll cho `SectionProof` |

---

## 8. Việc cần Tùng quyết hoặc cung cấp

Không có mấy thứ này thì phần nội dung không thể viết trung thực được.

### Đã có câu trả lời

1. **Số khách hàng thật hiện tại — ĐÃ TRẢ LỜI, cập nhật.** 2 khách hàng: TopVN Sport (hộ kinh doanh, đăng ký số 025086000002 ngày 25/08/2025, đã ký hợp đồng SaaS VOMA ngày 05/08/2026, thời hạn 12 tháng, tự động gia hạn trừ khi báo hủy trước 30 ngày; gói 5 người dùng / 50GB; module hợp đồng: Identity, PIM, OMS, WMS; billing theo quý) và Soraicine (Công Ty TNHH Y Tế Soraicine, MST 0110345663, Hà Nội — nhập khẩu và phân phối sản phẩm chăm sóc sức khoẻ Nhật Bản: Tokyo Res 1000, Kyoto HAS 50EX, Nitasora, Herasuki; chưa có hợp đồng ký với công ty, tình trạng hợp đồng hiện chưa ghi nhận). Con số này đáp ứng đúng yêu cầu "sell your solution to more than one customer" mà Axis nêu ở bản tiếng Đức (Mục 1.3), nhưng chỉ TopVN Sport có hợp đồng đang hiệu lực.
   **Ghi chú nội bộ, không dùng cho copy website:** Bên A và Bên B trong hợp đồng TopVN Sport dùng cùng địa chỉ đăng ký và cùng người đại diện. Người chuẩn bị hồ sơ Axis cần biết dữ kiện này để quyết định cách trình bày trong hồ sơ. Chi tiết đầy đủ ở Mục 11.
2. **Cấu trúc support thật — ĐÃ TRẢ LỜI, cập nhật theo hợp đồng đã ký.** Kênh hỗ trợ: email `support@nothanagentic.vn`, điện thoại 0983650552, và trực tiếp tại văn phòng Hà Nội. Giờ hỗ trợ: 9:00–17:00 từ thứ Hai đến thứ Sáu, trừ ngày lễ. Cam kết thời gian phản hồi: trong 4 giờ làm việc. Cam kết uptime: tối thiểu 98%/tháng, trừ thời gian bảo trì đã báo trước ít nhất 24 giờ. Nếu vi phạm SLA: giảm/miễn phí dịch vụ, tối đa 20% phí tháng đó. Các số này lấy từ hợp đồng đã ký (`docs/HopDongVOMA_TOPVN_signed.pdf`), mạnh hơn "same-day response" vì kiểm chứng được.
   **Ghi chú:** khi lên site phải nêu đúng các số hợp đồng trên, không thêm, không bớt, không thổi phồng.
3. **Kênh bán hiện tại — ĐÃ TRẢ LỜI.** Hiện chỉ bán qua quan hệ cá nhân/quan hệ nghề nghiệp đã có sẵn. Chưa có kênh đại lý, chưa có bộ máy bán hàng chủ động (outbound).

### Dữ kiện bắt buộc còn thiếu

4. **Thông tin pháp lý — ĐÃ TRẢ LỜI.** Tên pháp lý: Công ty TNHH Nỏ Thần Agentic. MST 0111579329, đăng ký lần đầu ngày 23/07/2026. Địa chỉ đăng ký: Số 1, ngõ 141/3, phố Lê Văn Hiến, Phường Đông Ngạc, Thành phố Hà Nội. Người đại diện pháp luật: ông Đào Duy Hưng. Chi tiết đầy đủ, gồm cả dữ kiện chưa nên công bố, ở Mục 11.
5. **Lộ trình chứng chỉ có ngày cụ thể.** Nếu chưa định làm ISO 27001/SOC 2 thì phải viết "chưa có kế hoạch" chứ không viết "trong lộ trình" — theo Mục 1.6, mốc thời gian phải bác bỏ được.
6. **Đầu mối bảo mật có tên — MỘT PHẦN ĐÃ TRẢ LỜI.** Người đại diện pháp luật là ông Đào Duy Hưng, email hỗ trợ chung là `support@nothanagentic.vn`. Còn thiếu: một cái tên cụ thể được chỉ định làm đầu mối bảo mật (security contact) riêng, khác với người đại diện pháp luật hoặc email support chung.
7. **Công bố tên đầy đủ và cơ cấu sở hữu — CẦN TÙNG QUYẾT.** Trang `cong-ty` hiện chỉ ghi tên gọi ("Tùng", "Tài", "Tuấn"), không có họ. Theo hồ sơ doanh nghiệp, công ty có 2 thành viên: Đào Duy Hưng và Đặng Thanh Tùng — Tùng là thành viên góp vốn, không chỉ là người kỹ thuật. Người thẩm định tìm người chịu trách nhiệm có tên đầy đủ. Cần quyết định: có công bố họ tên đầy đủ và cơ cấu sở hữu không. Tuyệt đối không công bố địa chỉ nhà riêng của bất kỳ ai.

### Cần xác nhận lại với Axis

8. **Chương trình ADP có còn tồn tại không.** URL trong `docs/2.md` đã 404, có vẻ đã gộp vào Technology Integration Partner Program. Nên hỏi trực tiếp người của Axis trước khi làm hồ sơ theo tên chương trình cũ.

### Ảnh

9. Duyệt danh sách chụp ở Mục 4. Lớp 1 (5 screenshot) có thể làm ngay.

### Nội dung tiếng Thuỵ Điển

10. Bản SV do AI viết và chưa có người bản ngữ đọc lại. Trước khi đưa hồ sơ ra thật với Axis cần người bản ngữ soi 4 trang SV — đọc lại chứ không phải viết lại, khoảng 15–20 phút.

### Quyết định phạm vi

11. **5 trang chỉ có VI/EN** (`cong-nghe`, `giai-phap/soai`, `giai-phap/voma`, `tin-tuc`, `tuyen-dung`) — dịch sang SV hay chặn link SV? `cong-nghe` và `giai-phap/soai` là hai trang một thẩm định viên Axis chắc chắn sẽ đọc, nên tao nghiêng về dịch hai trang này.

---

## 9. Thứ tự thực hiện đề xuất

| Giai đoạn | Nội dung | Chặn bởi |
|---|---|---|
| **1** | P0 ở Mục 7 — sửa form, sửa lỗi dữ kiện | không |
| **2** | Viết lại nội dung theo Mục 3, bắt đầu từ trang chủ | không — 4 dữ kiện chặn (khách hàng, support, kênh bán, pháp lý) đã có ở Mục 8. Mục 5–7 ở Mục 8 (chứng chỉ, đầu mối bảo mật riêng, công bố tên đầy đủ/cơ cấu sở hữu) còn thiếu nhưng không chặn việc viết lại |
| **3** | 5 screenshot Lớp 1, đưa vào trang chủ + `soai` + `bao-mat` | không |
| **4** | Cấu trúc trang chủ v2 ở Mục 5, gồm mục Năng lực làm đối tác | giai đoạn 2 |
| **5** | P1 refactor | song song được với 2–4 |
| **6** | Ảnh Lớp 2, Trust Center đầy đủ, P2 | ảnh cần chụp |

Giai đoạn 1 và 3 làm được ngay hôm nay và không phụ thuộc gì.

---

## 10. Dữ kiện pháp lý và hợp đồng đã xác nhận

Xác nhận ngày 2026-08-22. Nguồn: hợp đồng đã ký `docs/HopDongVOMA_TOPVN_signed.pdf`, hồ sơ đăng ký doanh nghiệp, và nghiên cứu công khai về khách hàng thứ hai. Ghi lại một lần ở đây để không phải đọc lại hợp đồng và hồ sơ mỗi lần cần dữ kiện.

### Pháp nhân công ty

- Tên pháp lý (tiếng Việt): CÔNG TY TNHH NỎ THẦN AGENTIC
- Tên nước ngoài: NO THAN AGENTIC COMPANY LIMITED
- Tên viết tắt: NO THAN AGENTIC CO., LTD
- Mã số doanh nghiệp (MST): 0111579329, đăng ký lần đầu ngày 23/07/2026
- Địa chỉ đăng ký (trụ sở chính): Số 1, ngõ 141/3, phố Lê Văn Hiến, Phường Đông Ngạc, Thành phố Hà Nội
- Điện thoại: 0983650552
- Email trên hồ sơ đăng ký: nothanagentic@gmail.com
- Người đại diện pháp luật (theo hợp đồng): ông Đào Duy Hưng
- Thành viên công ty: Đào Duy Hưng (Hà Nội) và Đặng Thanh Tùng (Hải Phòng)
- Vốn điều lệ: 50.000.000 VNĐ. **Không đưa số này lên website.** Vốn điều lệ không phải thông tin công ty buộc phải công bố công khai trên site. Nhiều khả năng bên thẩm định sẽ hỏi trong quá trình due diligence — nên chuẩn bị câu trả lời trước, không cần đưa vào tài liệu marketing.

**Quy tắc đặt tên khi viết nội dung (bổ sung Mục 3):** dùng "Nỏ Thần Agentic" trong văn xuôi EN/SV/VI như site đang dùng. Chỉ dùng "NO THAN AGENTIC COMPANY LIMITED" trong khối thông tin pháp lý/hợp đồng.

### Khách hàng 1 — TopVN Sport

- Hình thức pháp lý: HỘ KINH DOANH TOP VN SPORT — hộ kinh doanh, không phải công ty. Đăng ký số 025086000002, cấp ngày 25/08/2025.
- Hợp đồng SaaS VOMA ký ngày 05/08/2026, thời hạn 12 tháng, tự động gia hạn trừ khi báo hủy trước 30 ngày.
- Mô hình thương mại: thuê định kỳ, billing theo quý. Gói tối đa 5 người dùng / 50GB.
- Module hợp đồng: Identity, PIM, OMS, WMS.
- Dữ kiện nội bộ: Bên A và Bên B trong hợp đồng dùng cùng địa chỉ đăng ký và cùng người đại diện. Ghi lại để người chuẩn bị hồ sơ Axis biết và tự quyết định cách trình bày.

### Khách hàng 2 — Soraicine

- Tên đúng: Soraicine (viết liền, một từ). Pháp nhân: Công Ty TNHH Y Tế Soraicine. MST 0110345663. Hà Nội.
- Ngành: nhập khẩu và phân phối sản phẩm chăm sóc sức khoẻ Nhật Bản. Tự mô tả: "Đơn vị nhập khẩu và phân phối chính ngạch các sản phẩm chăm sóc sức khỏe chủ động đến từ Nhật Bản". 4 dòng sản phẩm: Tokyo Res 1000, Kyoto HAS 50EX, Nitasora, Herasuki.
- Xác nhận độc lập: sản phẩm của họ có bán trên nhiều trang nhà thuốc/bán lẻ bên thứ ba, xác nhận đây là nhà phân phối đang hoạt động thật.
- Chưa xác nhận, không được viết như dữ kiện đã kiểm chứng: năm thành lập, lịch sử chi nhánh, số nhân sự. Website của họ không có thông tin về kho/bán lẻ/marketplace.
- Chưa có hợp đồng ký với công ty. Tình trạng hợp đồng hiện chưa ghi nhận.

### SLA thật từ hợp đồng đã ký

- Kênh hỗ trợ: email `support@nothanagentic.vn`, điện thoại 0983650552, trực tiếp tại văn phòng Hà Nội.
- Giờ hỗ trợ: 9:00–17:00, thứ Hai đến thứ Sáu, trừ ngày lễ.
- Thời gian phản hồi cam kết: trong 4 giờ làm việc.
- Cam kết uptime: tối thiểu 98%/tháng, trừ thời gian bảo trì đã báo trước.
- Báo trước bảo trì: tối thiểu 24 giờ.
- Bồi thường khi vi phạm SLA: giảm/miễn phí dịch vụ, tối đa 20% phí tháng đó.

---

## 11. Cái không nên đổi

Ghi lại để bản nâng cấp không phá mất thứ đang đúng:

- Hệ thống nhãn trạng thái `đang chạy`/`poc`/`lộ trình`. Nghiên cứu xác nhận đây là tài sản, không phải điểm yếu.
- Nguyên tắc không bịa chứng chỉ, đối tác, khách hàng, số liệu.
- Hệ màu `ink`/`navy`/`orange`/`paper` và ba font hiện tại.
- Logo lấy nguyên từ `docs/logo.jpg`, gồm cả favicon.
- Kiến trúc route và next-intl với `localePrefix: 'always'`.
- Việc tài liệu kỹ thuật không nằm trên trang chủ — Axis cũng làm đúng thế.
