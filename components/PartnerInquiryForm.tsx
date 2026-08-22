'use client';

import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2, Mail, MapPin, Layers, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react';

const inquirySchema = z.object({
  company: z.string().min(2, 'errCompany').trim(),
  email: z.string().min(1, 'errEmailRequired').email('errEmailInvalid'),
  region: z.string().min(1, 'errRegion').trim(),
  interestType: z.string().min(1, 'errInterest'),
  note: z.string().optional(),
});

export type PartnerInquiryData = z.infer<typeof inquirySchema>;

export interface PartnerInquiryLabels {
  heading: string;
  body: string;
  companyLabel: string;
  companyPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  regionLabel: string;
  regionPlaceholder: string;
  interestLabel: string;
  interestPlaceholder: string;
  interestOptions: readonly { value: string; label: string }[];
  noteLabel: string;
  notePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successBody: string;
  resetLabel: string;
  submitErrorLabel: string;
  errors: {
    errCompany: string;
    errEmailRequired: string;
    errEmailInvalid: string;
    errRegion: string;
    errInterest: string;
  };
}

export interface PartnerInquiryFormProps {
  labels: PartnerInquiryLabels;
}

export const PartnerInquiryForm: React.FC<PartnerInquiryFormProps> = ({ labels }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PartnerInquiryData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      company: '',
      email: '',
      region: '',
      interestType: '',
      note: '',
    },
  });

  const onSubmit = async (data: PartnerInquiryData) => {
    setSubmitError(null);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'partner', ...data, _hp: honeypotRef.current?.value ?? '' }),
      });
      const result: { ok: boolean } = await response.json();
      if (!response.ok || !result.ok) {
        setSubmitError(labels.submitErrorLabel);
        return;
      }
      setIsSubmitted(true);
      reset();
    } catch {
      setSubmitError(labels.submitErrorLabel);
    }
  };

  const errKey = (key?: string) => (key ? labels.errors[key as keyof typeof labels.errors] : undefined);

  return (
    <div className="lg:col-span-6 bg-white text-ink p-8 rounded-3xl shadow-2xl border border-white/10 w-full text-left">
      {isSubmitted ? (
        <div className="text-center py-8 space-y-4" role="alert">
          <div className="inline-flex p-3 bg-state-ok/10 text-state-ok rounded-full">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h3 className="text-h3 font-bold text-ink">{labels.successTitle}</h3>
          <p className="text-body text-navy-400">{labels.successBody}</p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-caption font-bold text-navy-400 hover:text-ink hover:underline pt-2 block mx-auto min-h-[44px]"
          >
            {labels.resetLabel}
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
          {/* Company / organization name */}
          <div className="space-y-1.5">
            <label htmlFor="company" className="block text-caption font-bold text-ink uppercase flex items-center gap-2">
              <Building2 className="w-4 h-4 text-navy-400" />
              {labels.companyLabel} *
            </label>
            <input
              type="text"
              id="company"
              placeholder={labels.companyPlaceholder}
              {...register('company')}
              className={`w-full px-4 py-3 rounded-lg border bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-orange/50 text-body transition-shadow min-h-[44px] ${
                errors.company ? 'border-state-stop focus:ring-state-stop/50' : 'border-navy-400/20'
              }`}
              disabled={isSubmitting}
            />
            {errors.company && (
              <p className="text-caption font-bold text-state-stop mt-1" role="alert">
                {errKey(errors.company.message)}
              </p>
            )}
          </div>

          {/* Work email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-caption font-bold text-ink uppercase flex items-center gap-2">
              <Mail className="w-4 h-4 text-navy-400" />
              {labels.emailLabel} *
            </label>
            <input
              type="email"
              id="email"
              placeholder={labels.emailPlaceholder}
              {...register('email')}
              className={`w-full px-4 py-3 rounded-lg border bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-orange/50 text-body transition-shadow min-h-[44px] ${
                errors.email ? 'border-state-stop focus:ring-state-stop/50' : 'border-navy-400/20'
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-caption font-bold text-state-stop mt-1" role="alert">
                {errKey(errors.email.message)}
              </p>
            )}
          </div>

          {/* Region */}
          <div className="space-y-1.5">
            <label htmlFor="region" className="block text-caption font-bold text-ink uppercase flex items-center gap-2">
              <MapPin className="w-4 h-4 text-navy-400" />
              {labels.regionLabel} *
            </label>
            <input
              type="text"
              id="region"
              placeholder={labels.regionPlaceholder}
              {...register('region')}
              className={`w-full px-4 py-3 rounded-lg border bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-orange/50 text-body transition-shadow min-h-[44px] ${
                errors.region ? 'border-state-stop focus:ring-state-stop/50' : 'border-navy-400/20'
              }`}
              disabled={isSubmitting}
            />
            {errors.region && (
              <p className="text-caption font-bold text-state-stop mt-1" role="alert">
                {errKey(errors.region.message)}
              </p>
            )}
          </div>

          {/* Interest type */}
          <div className="space-y-1.5">
            <label htmlFor="interestType" className="block text-caption font-bold text-ink uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-navy-400" />
              {labels.interestLabel} *
            </label>
            <select
              id="interestType"
              {...register('interestType')}
              defaultValue=""
              className={`w-full px-4 py-3 rounded-lg border bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-orange/50 text-body transition-shadow min-h-[44px] ${
                errors.interestType ? 'border-state-stop focus:ring-state-stop/50' : 'border-navy-400/20'
              }`}
              disabled={isSubmitting}
            >
              <option value="" disabled>
                {labels.interestPlaceholder}
              </option>
              {labels.interestOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.interestType && (
              <p className="text-caption font-bold text-state-stop mt-1" role="alert">
                {errKey(errors.interestType.message)}
              </p>
            )}
          </div>

          {/* Note */}
          <div className="space-y-1.5">
            <label htmlFor="note" className="block text-caption font-bold text-ink uppercase flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-navy-400" />
              {labels.noteLabel}
            </label>
            <textarea
              id="note"
              rows={3}
              placeholder={labels.notePlaceholder}
              {...register('note')}
              className="w-full px-4 py-3 rounded-lg border border-navy-400/20 bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-orange/50 text-body transition-shadow resize-none"
              disabled={isSubmitting}
            />
          </div>

          {submitError && (
            <p className="text-caption font-bold text-state-stop" role="alert">
              {submitError}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange hover:bg-orange/90 disabled:bg-orange/50 text-ink font-extrabold py-4 px-6 rounded-lg shadow-lg hover:shadow-orange/10 transition-all min-h-[48px] flex items-center justify-center text-body"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                {labels.submittingLabel}
              </>
            ) : (
              labels.submitLabel
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default PartnerInquiryForm;
