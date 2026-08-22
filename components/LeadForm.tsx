'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Building, Phone, CheckCircle2, Loader2 } from 'lucide-react';

const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

const leadSchema = z.object({
  email: z.string()
    .min(1, 'Vui lòng nhập email công việc')
    .email('Định dạng email công việc không hợp lệ'),
  company: z.string()
    .min(2, 'Tên công ty phải có ít nhất 2 ký tự')
    .trim(),
  phone: z.string()
    .min(1, 'Vui lòng nhập số điện thoại')
    .regex(phoneRegex, 'Số điện thoại Việt Nam không hợp lệ (ví dụ: 0987654321)'),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export interface LeadFormProps {}

export const LeadForm: React.FC<LeadFormProps> = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      email: '',
      company: '',
      phone: '',
    }
  });

  const onSubmit = async (data: LeadFormData) => {
    // Simulate API post submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Lead captured successfully:', data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <section 
      className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      id="lead-capture"
      aria-label="Liên hệ hợp tác"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,84,30,0.1),transparent_50%)]" />

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Heading Copy */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-white leading-tight">
            Trao đổi kỹ thuật hoặc nhận hồ sơ năng lực
          </h2>
          <p className="text-body text-paper/80 leading-relaxed">
            Để lại thông tin công việc, đội kỹ thuật sẽ liên hệ trực tiếp — cho cả đối tác thiết bị và doanh nghiệp có bài toán cụ thể.
          </p>
        </div>

        {/* Right Column: Dynamic Form / Success State */}
        <div className="lg:col-span-6 bg-white text-ink p-8 rounded-3xl shadow-2xl border border-white/10 w-full text-left">
          {isSubmitted ? (
            <div 
              className="text-center py-8 space-y-4"
              role="alert"
            >
              <div className="inline-flex p-3 bg-state-ok/10 text-state-ok rounded-full">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-h3 font-bold text-ink">Đăng Ký Thành Công!</h3>
              <p className="text-body text-navy-400">
                Cảm ơn bạn đã quan tâm. Chúng tôi đã nhận được thông tin liên hệ và sẽ phản hồi qua email công việc trong thời gian sớm nhất.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-caption font-bold text-navy-400 hover:text-ink hover:underline pt-2 block mx-auto min-h-[44px]"
              >
                Gửi lại yêu cầu khác
              </button>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              noValidate 
              className="space-y-5"
            >
              {/* Work Email input */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="email" 
                  className="block text-caption font-bold text-ink uppercase flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-navy-400" />
                  Email công việc *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-lg border bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-orange/50 text-body transition-shadow ${
                    errors.email ? 'border-state-stop focus:ring-state-stop/50' : 'border-navy-400/20'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-caption font-bold text-state-stop mt-1" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Company Name input */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="company" 
                  className="block text-caption font-bold text-ink uppercase flex items-center gap-2"
                >
                  <Building className="w-4 h-4 text-navy-400" />
                  Tên doanh nghiệp / công ty *
                </label>
                <input
                  type="text"
                  id="company"
                  placeholder="Công ty TNHH Giải pháp..."
                  {...register('company')}
                  className={`w-full px-4 py-3 rounded-lg border bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-orange/50 text-body transition-shadow ${
                    errors.company ? 'border-state-stop focus:ring-state-stop/50' : 'border-navy-400/20'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.company && (
                  <p className="text-caption font-bold text-state-stop mt-1" role="alert">
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* Phone input */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="phone" 
                  className="block text-caption font-bold text-ink uppercase flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-navy-400" />
                  Số điện thoại liên hệ *
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="0987654321"
                  {...register('phone')}
                  className={`w-full px-4 py-3 rounded-lg border bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-orange/50 text-body transition-shadow ${
                    errors.phone ? 'border-state-stop focus:ring-state-stop/50' : 'border-navy-400/20'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-caption font-bold text-state-stop mt-1" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Submit button - Safety Orange bg, Dark text for contrast compliance */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange hover:bg-orange/90 disabled:bg-orange/50 text-ink font-extrabold py-4 px-6 rounded-lg shadow-lg hover:shadow-orange/10 transition-all min-h-[48px] flex items-center justify-center text-body"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Đang gửi thông tin...
                  </>
                ) : (
                  'Gửi yêu cầu trao đổi'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
