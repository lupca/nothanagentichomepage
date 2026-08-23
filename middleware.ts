import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclude API routes, Next internals, and file-convention metadata routes
  // (opengraph-image, twitter-image, icon, apple-icon) that live directly
  // under app/ outside app/[locale]/. Without this, the locale middleware
  // rewrites e.g. /opengraph-image -> /vi/opengraph-image, which 404s
  // because no such route exists inside the [locale] segment. Paths with a
  // dot (icon.png, robots.txt, sitemap.xml, etc.) are already excluded by
  // the trailing `.*\..*` clause.
  matcher: [
    '/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)',
  ],
};
