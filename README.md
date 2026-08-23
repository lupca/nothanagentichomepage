# Nỏ Thần Agentic - website công ty

Website công ty của Nỏ Thần Agentic. Xây bằng Next.js 14 (App Router), TypeScript và Tailwind CSS. Có 3 ngôn ngữ - vi, en, sv - qua next-intl. Deploy trên Vercel.

Tài liệu thiết kế và nội dung đầy đủ nằm ở [`docs/4-nang-cap-thiet-ke.md`](docs/4-nang-cap-thiet-ke.md). README này chỉ ghi các việc còn tồn đọng cần người vận hành xử lý.

## Việc cần làm ngay - đang chặn khách hàng thật

### Biến môi trường cho form liên hệ (lead capture)

Site chạy trên Vercel, nơi filesystem không bền vững (ephemeral). Vì vậy email là kênh duy nhất để nhận dữ liệu form. Xem chi tiết implementation ở `app/api/lead/route.ts` và `.env.example`.

**Hiện tại chưa cấu hình `RESEND_API_KEY`. Kết quả: mọi khách truy cập gửi form liên hệ đều nhận lỗi, không có enquiry nào lọt được vào hệ thống.**

| Biến | Bắt buộc | Mặc định | Ghi chú |
|---|---|---|---|
| `RESEND_API_KEY` | Có | (không) | Không set thì API trả lỗi cho mọi submission, không rơi vào file backup vì file đó không sống qua được giữa các lần gọi trên Vercel. |
| `LEAD_NOTIFY_TO` | Không | `support@nothanagentic.vn` | Địa chỉ nhận thông báo enquiry. |
| `LEAD_NOTIFY_FROM` | Không | `Lead Notifier <onboarding@resend.dev>` | Địa chỉ gửi. Đang dùng địa chỉ test của Resend - cần đổi sang địa chỉ thuộc domain nothanagentic.vn sau khi verify domain đó trong Resend, nếu không email thông báo dễ vào spam. |
| `LEAD_STORAGE_DURABLE` | Không | (không) | Chỉ dùng khi tự host trên máy chủ có ổ đĩa bền vững. Để trống trên Vercel. |

Các bước cần làm:

1. Tạo tài khoản Resend (resend.com).
2. Tạo API key.
3. Thêm `RESEND_API_KEY` vào Environment Variables của project trên Vercel.
4. Verify domain nothanagentic.vn trong Resend, sau đó set `LEAD_NOTIFY_FROM` thành một địa chỉ thuộc domain đó.
5. Redeploy.

## Việc cần review - chưa chặn nhưng có rủi ro

### Nội dung tiếng Thuỵ Điển (sv) chưa có người bản ngữ đọc lại

Bản dịch sv hiện do AI viết, chưa có người bản ngữ kiểm tra. Cần review trước khi dùng site này trong bất kỳ tiếp cận nào với đối tác Thuỵ Điển (ví dụ Axis).

Các trang có nội dung sv: trang chủ, `bao-mat`, `doi-tac`, `cong-ty`, `lien-he`. (Đã kiểm tra dictionary nội dung của từng trang; `giai-phap/voma` chỉ có 2 chuỗi sv cho UI lightbox - "Förstora bild" / "Stäng" - không phải nội dung trang nên không tính vào danh sách cần review nội dung.)

Các thuật ngữ đã được đánh dấu nghi ngờ, người review nên xem kỹ:

- `klasshierarki`
- `granskningskö`
- `avtalstiden`
- `matchad utrustning`
- `enhetsintegrationerna`
- `Juridisk företrädare`
- việc dùng `Organisationsnummer` làm nhãn cho mã số thuế Việt Nam

## Quyết định cần công ty đưa ra

Lấy từ Mục 8, `docs/4-nang-cap-thiet-ke.md`. Không có các thông tin này thì phần nội dung liên quan không viết trung thực được.

- **Đầu mối bảo mật (security contact).** Cần một cái tên cụ thể và email riêng cho báo cáo bảo mật, khác với người đại diện pháp luật hoặc email support chung. Người thẩm định (due diligence) tìm người chịu trách nhiệm cụ thể.
- **Công bố tên đầy đủ và cơ cấu sở hữu.** Trang `cong-ty` hiện chỉ ghi tên gọi, không có họ. Cần quyết định có công bố họ tên đầy đủ và cơ cấu sở hữu hay không. Tuyệt đối không công bố địa chỉ nhà riêng của bất kỳ ai.
- **Xác nhận lại với Axis về chương trình Application Development Partner (ADP).** URL trong `docs/2.md` hiện trả về 404, có vẻ chương trình đã gộp vào Technology Integration Partner Program. Cần hỏi trực tiếp người của Axis trước khi làm hồ sơ theo tên chương trình cũ.
- **Lộ trình chứng chỉ (ISO 27001, SOC 2).** Nếu chưa có kế hoạch thật thì site phải ghi rõ "chưa có kế hoạch", không được viết kiểu ngụ ý đang trong lộ trình. Nếu có mốc thời gian thì mốc đó phải là thật và bác bỏ được (falsifiable).
- **Dịch 5 trang chỉ có VI/EN sang SV hay không.** Các trang: `cong-nghe`, `giai-phap/soai`, `giai-phap/voma`, `tin-tuc`, `tuyen-dung`. `cong-nghe` và `giai-phap/soai` là hai trang một thẩm định viên Axis nhiều khả năng sẽ đọc, nên ưu tiên dịch hai trang này trước nếu quyết định dịch.
