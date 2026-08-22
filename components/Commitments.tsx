import React from 'react';
import { Check } from 'lucide-react';

const commitments = [
  'Lộ trình công khai. Ba giai đoạn của mỗi nền tảng được công bố và cập nhật, kèm ngày.',
  'Dữ liệu là của khách hàng. Xuất toàn bộ dữ liệu ra định dạng mở bất kỳ lúc nào, không phí, không điều kiện.',
  'Bảo trì cam kết theo hợp đồng. Ghi rõ thời hạn và mức phản hồi trong hợp đồng, không để "theo thoả thuận".',
  'Minh bạch khi thẩm định. Cung cấp báo cáo tài chính, danh sách nhân sự và tài liệu kiến trúc cho đối tác trong quá trình đánh giá.',
  'Không khoá bằng phần cứng. Chúng tôi cung cấp thiết bị nhưng không khoá phần mềm vào thiết bị của mình — chuẩn mở là mặc định.',
];

export interface CommitmentsProps {}

export const Commitments: React.FC<CommitmentsProps> = () => {
  return (
    <section className="bg-paper py-20 px-6 md:px-12 lg:px-24" id="cong-ty" aria-label="Cam kết và đội ngũ">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="max-w-2xl space-y-4">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">Năm cam kết</h2>
          <p className="text-body text-navy-400 leading-relaxed">
            Chỉ những cam kết khách hàng có thể bắt lỗi được.
          </p>
        </div>

        <ul className="space-y-4">
          {commitments.map((c, idx) => (
            <li key={idx} className="flex gap-3">
              <div className="p-1 bg-state-ok/10 text-state-ok rounded-full shrink-0 mt-0.5">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <span className="text-body text-ink leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Commitments;
