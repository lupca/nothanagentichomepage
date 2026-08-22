import React from 'react';
import { ArrowUpRight, ScanEye, ShoppingBag } from 'lucide-react';

export interface PlatformsProps {}

export const Platforms: React.FC<PlatformsProps> = () => {
  return (
    <section className="bg-paper py-20 px-6 md:px-12 lg:px-24" aria-label="Hai nền tảng sản phẩm">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="max-w-2xl space-y-4">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">Hai nền tảng, một đội kỹ thuật</h2>
          <p className="text-body text-navy-400 leading-relaxed">
            Nỏ Thần Agentic là đơn vị kỹ thuật xây và vận hành hai nền tảng sản phẩm. Mỗi nền tảng có vai trò riêng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-line p-8 space-y-4">
            <div className="p-3 bg-ink rounded-lg w-fit">
              <ScanEye className="w-6 h-6 text-orange" />
            </div>
            <h3 className="text-h3 font-bold text-ink">SOAI.VN — AI Vision</h3>
            <p className="text-body text-navy-400 leading-relaxed">
              Giám sát sản xuất, an toàn lao động và kiểm soát hàng hoá bằng thị giác máy tính. Nền tảng mũi nhọn — 6 module đã nghiệm thu, xem mục bằng chứng bên dưới.
            </p>
            <a href="#bang-chung" className="inline-flex items-center gap-1.5 text-body font-semibold text-orange-600 hover:underline">
              Xem bằng chứng kỹ thuật
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white border border-line p-8 space-y-4">
            <div className="p-3 bg-ink rounded-lg w-fit">
              <ShoppingBag className="w-6 h-6 text-orange" />
            </div>
            <h3 className="text-h3 font-bold text-ink">VOMA.VN — Thương mại đa kênh</h3>
            <p className="text-body text-navy-400 leading-relaxed">
              Nền tảng bán hàng đa kênh và quản trị toàn diện — hoá đơn điện tử, bán hàng online/offline, kế toán, kho bãi. Đã đăng ký bảo hộ nhãn hiệu độc quyền tại Việt Nam.
            </p>
            <a href="https://voma.vn" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-body font-semibold text-orange-600 hover:underline">
              Xem tại voma.vn
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platforms;
