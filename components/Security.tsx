import React from 'react';
import { KeyRound, ShieldAlert, Server } from 'lucide-react';

export interface SecurityProps {}

export const Security: React.FC<SecurityProps> = () => {
  return (
    <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24" id="bao-mat" aria-label="Bảo mật và nguyên tắc engineering">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-3">
          <span className="text-caption font-mono uppercase tracking-wider text-orange">Nguyên tắc engineering</span>
          <h2 className="font-display text-2xl md:text-h2 font-bold text-white">Lỗi phải kêu.</h2>
        </div>

        <p className="text-body text-paper/80 leading-relaxed max-w-2xl">
          Hệ thống của chúng tôi không có đường fallback âm thầm và không nuốt exception. Video hỏng, mã QR mờ, mất kết nối camera, FFmpeg lỗi — mọi sự cố đều bật lên thành mã lỗi rõ ràng kèm log, thay vì trả về một kết quả trông có vẻ hợp lý. Trong giám sát sản xuất, một con số sai mà không ai biết là sai thì tệ hơn hẳn một lỗi hiện ra.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-2.5">
            <KeyRound className="w-5 h-5 text-orange" />
            <p className="text-body font-bold text-white">Mã hoá khi lưu</p>
            <p className="text-caption text-white/60 leading-relaxed">Thông tin đăng nhập thiết bị mã hoá bằng Fernet.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-2.5">
            <ShieldAlert className="w-5 h-5 text-orange" />
            <p className="text-body font-bold text-white">Chặn path traversal</p>
            <p className="text-caption text-white/60 leading-relaxed">Mọi API đọc/tải tệp đều kiểm tra đường dẫn trước khi trả file.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-2.5">
            <Server className="w-5 h-5 text-orange" />
            <p className="text-body font-bold text-white">Chủ quyền dữ liệu</p>
            <p className="text-caption text-white/60 leading-relaxed">Triển khai được hoàn toàn trong mạng nội bộ khách hàng, on-prem.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
