import type { MetadataRoute } from 'next';

const SITE_URL = 'https://nothanagentic.vn';

const ALL_LOCALES = ['vi', 'en', 'sv'] as const;
const VI_EN = ['vi', 'en'] as const;

const ROUTES: { path: string; locales: readonly string[]; priority: number }[] = [
  { path: '', locales: ALL_LOCALES, priority: 1 },
  { path: '/giai-phap/soai', locales: VI_EN, priority: 0.9 },
  { path: '/giai-phap/voma', locales: VI_EN, priority: 0.6 },
  { path: '/cong-nghe', locales: VI_EN, priority: 0.8 },
  { path: '/bao-mat', locales: ALL_LOCALES, priority: 0.9 },
  { path: '/doi-tac', locales: ALL_LOCALES, priority: 0.9 },
  { path: '/cong-ty', locales: ALL_LOCALES, priority: 0.7 },
  { path: '/tuyen-dung', locales: VI_EN, priority: 0.5 },
  { path: '/tin-tuc', locales: VI_EN, priority: 0.5 },
  { path: '/lien-he', locales: ALL_LOCALES, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of route.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: locale === 'vi' ? route.priority : route.priority * 0.9,
      });
    }
  }

  return entries;
}
