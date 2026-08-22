import { defineRouting } from 'next-intl/routing';

export const locales = ['vi', 'en', 'sv'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'vi',
  localePrefix: 'always',
});
