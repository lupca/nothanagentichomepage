import React from 'react';
import { ArrowRight, FileDown, Camera, Cpu, MonitorCheck } from 'lucide-react';

export interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      className="relative bg-ink text-white overflow-hidden py-20 px-6 md:px-12 lg:px-24"
      aria-label="Giới thiệu"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,84,30,0.12),transparent_40%)]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-block">
            <span className="font-mono bg-orange/15 text-orange font-semibold text-caption tracking-wider uppercase px-3 py-1.5 rounded-full">
              Giải pháp phần cứng + phần mềm · Lõi Agentic AI
            </span>
          </div>

          <h1 className="font-display text-[1.875rem] md:text-h1 font-bold leading-tight text-white">
            AI chạy trên thiết bị thật, trong nhà máy thật.
          </h1>

          <p className="text-body text-paper/80 max-w-xl leading-relaxed">
            Nỏ Thần Agentic thiết kế và triển khai trọn gói phần cứng và phần mềm cho giám sát sản xuất, an toàn lao động và kiểm soát hàng hoá — với Agentic AI làm lõi và bảo mật là mặc định, không phải tuỳ chọn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#doi-tac"
              className="bg-orange hover:bg-orange/90 text-ink font-extrabold px-8 py-4 rounded-lg shadow-lg hover:shadow-orange/20 transition-all text-center min-h-[48px] min-w-[200px] flex items-center justify-center gap-2 group"
            >
              Hợp tác cùng chúng tôi
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#lead-capture"
              className="border border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-all text-center min-h-[48px] min-w-[200px] flex items-center justify-center gap-2"
            >
              Tải hồ sơ năng lực
              <FileDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right column: device -> edge -> dashboard pipeline diagram */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[480px] bg-paper/5 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm">
            <p className="text-caption font-mono uppercase tracking-wider text-white/40 mb-6">
              Đường đi của một cảnh báo
            </p>

            <div className="flex flex-col gap-0" aria-hidden="true">
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5">
                <Camera className="w-5 h-5 text-orange shrink-0" />
                <div>
                  <p className="text-body font-semibold text-white">Camera IP tại dây chuyền</p>
                  <p className="text-caption text-white/50 font-mono">ONVIF · RTSP</p>
                </div>
              </div>
              <div className="flex justify-start pl-[1.85rem]">
                <div className="w-px h-6 bg-white/20" />
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5">
                <Cpu className="w-5 h-5 text-orange shrink-0" />
                <div>
                  <p className="text-body font-semibold text-white">Suy luận AI tại biên</p>
                  <p className="text-caption text-white/50 font-mono">YOLOv8 · SAHI · VLM</p>
                </div>
              </div>
              <div className="flex justify-start pl-[1.85rem]">
                <div className="w-px h-6 bg-white/20" />
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-orange/40 bg-orange/10 px-4 py-3.5">
                <MonitorCheck className="w-5 h-5 text-orange shrink-0" />
                <div>
                  <p className="text-body font-semibold text-white">Người vận hành duyệt cảnh báo</p>
                  <p className="text-caption text-white/60 font-mono">Độ tin cậy 92% · chờ duyệt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
