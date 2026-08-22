'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Building, Phone, CheckCircle2, Loader2 } from 'lucide-react';

const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

const content = {
  vi: {
    heading: 'Trao đổi kỹ thuật hoặc nhận hồ sơ năng lực',
    sub: 'Để lại thông tin công việc, đội kỹ thuật sẽ liên hệ trực tiếp — cho cả đối tác thiết bị và doanh nghiệp có bài toán cụ thể.',
    emailLabel: 'Email công việc *',
    emailPlaceholder: 'name@company.com',
    companyLabel: 'Tên doanh nghiệp / công ty *',
    companyPlaceholder: 'Công ty TNHH Giải pháp...',
    phoneLabel: 'Số điện thoại liên hệ *',
    phonePlaceholder: '0987654321',
    submit: 'Gửi yêu cầu trao đổi',
    submitting: 'Đang gửi thông tin...',
    successTitle: 'Đăng Ký Thành Công!',
    successBody: 'Cảm ơn bạn đã quan tâm. Chúng tôi đã nhận được thông tin liên hệ và sẽ phản hồi qua email công việc trong thời gian sớm nhất.',
    resend: 'Gửi lại yêu cầu khác',
    errors: {
      emailRequired: 'Vui lòng nhập email công việc',
      emailInvalid: 'Định dạng email công việc không hợp lệ',
      companyMin: 'Tên công ty phải có ít nhất 2 ký tự',
      phoneRequired: 'Vui lòng nhập số điện thoại',
      phoneInvalid: 'Số điện thoại Việt Nam không hợp lệ (ví dụ: 0987654321)',
    },
    submitError: 'Đã có lỗi khi gửi thông tin. Vui lòng thử lại.',
  },
  en: {
    heading: 'Talk to our engineers or get the capability profile',
    sub: 'Leave your work details and our engineering team will reach out directly — for hardware partners and businesses with a concrete problem alike.',
    emailLabel: 'Work email *',
    emailPlaceholder: 'name@company.com',
    companyLabel: 'Company name *',
    companyPlaceholder: 'Your company Ltd...',
    phoneLabel: 'Contact phone number *',
    phonePlaceholder: '0987654321',
    submit: 'Send request',
    submitting: 'Sending...',
    successTitle: 'Request sent!',
    successBody: 'Thanks for reaching out. We’ve received your details and will reply to your work email as soon as possible.',
    resend: 'Send another request',
    errors: {
      emailRequired: 'Please enter your work email',
      emailInvalid: 'Not a valid email address',
      companyMin: 'Company name must be at least 2 characters',
      phoneRequired: 'Please enter a phone number',
      phoneInvalid: 'Not a valid Vietnamese phone number (e.g. 0987654321)',
    },
    submitError: 'Something went wrong sending your request. Please try again.',
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en'] ?? content.en;
}

export interface LeadFormProps {}

export const LeadForm: React.FC<LeadFormProps> = () => {
  const locale = useLocale();
  const t = pick(locale);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const leadSchema = useMemo(
    () =>
      z.object({
        email: z.string().min(1, t.errors.emailRequired).email(t.errors.emailInvalid),
        company: z.string().min(2, t.errors.companyMin).trim(),
        phone: z.string().min(1, t.errors.phoneRequired).regex(phoneRegex, t.errors.phoneInvalid),
      }),
    [t]
  );

  type LeadFormData = z.infer<typeof leadSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { email: '', company: '', phone: '' },
  });

  const onSubmit = async (data: LeadFormData) => {
    setSubmitError(null);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'lead', ...data, _hp: honeypotRef.current?.value ?? '' }),
      });
      const result: { ok: boolean } = await response.json();
      if (!response.ok || !result.ok) {
        setSubmitError(t.submitError);
        return;
      }
      setIsSubmitted(true);
      reset();
    } catch {
      setSubmitError(t.submitError);
    }
  };

  return (
    <section
      className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      id="lead-capture"
      aria-label="Contact"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,84,30,0.1),transparent_50%)]" />

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-6 space-y-6 text-left">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-white leading-tight">
            {t.heading}
          </h2>
          <p className="text-body text-paper/80 leading-relaxed">{t.sub}</p>
        </div>

        <div className="lg:col-span-6 bg-white text-ink p-8 rounded-3xl shadow-2xl border border-white/10 w-full text-left">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4" role="alert">
              <div className="inline-flex p-3 bg-state-ok/10 text-state-ok rounded-full">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-h3 font-bold text-ink">{t.successTitle}</h3>
              <p className="text-body text-navy-400">{t.successBody}</p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-caption font-bold text-navy-400 hover:text-ink hover:underline pt-2 block mx-auto min-h-[44px]"
              >
                {t.resend}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <input
                ref={honeypotRef}
                type="text"
                name="_hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px' }}
              />
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-caption font-bold text-ink uppercase flex items-center gap-2">
                  <Mail className="w-4 h-4 text-navy-400" />
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder={t.emailPlaceholder}
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

              <div className="space-y-1.5">
                <label htmlFor="company" className="block text-caption font-bold text-ink uppercase flex items-center gap-2">
                  <Building className="w-4 h-4 text-navy-400" />
                  {t.companyLabel}
                </label>
                <input
                  type="text"
                  id="company"
                  placeholder={t.companyPlaceholder}
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

              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-caption font-bold text-ink uppercase flex items-center gap-2">
                  <Phone className="w-4 h-4 text-navy-400" />
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder={t.phonePlaceholder}
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

              {submitError && (
                <p className="text-caption font-bold text-state-stop" role="alert">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange hover:bg-orange/90 disabled:bg-orange/50 text-ink font-extrabold py-4 px-6 rounded-lg shadow-lg hover:shadow-orange/10 transition-all min-h-[48px] flex items-center justify-center text-body"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    {t.submitting}
                  </>
                ) : (
                  t.submit
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
