import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const isPublicRoute = createRouteMatcher([
  // Root redirects
  '/',
  // Localized public routes
  '/:locale',
  '/:locale/about',
  '/:locale/pricing',
  '/:locale/faq',
  '/:locale/help',
  '/:locale/terms',
  '/:locale/privacy',
  '/:locale/sign-in(.*)',
  '/:locale/sign-up(.*)',
  // Non-localized special routes
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/org-switcher',
  '/org-redirect',
  // API routes
  '/api/webhooks/clerk',
]);

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Skip intl middleware for non-localized special routes
  if (
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/org-switcher') ||
    pathname.startsWith('/org-redirect') ||
    pathname.startsWith('/api/')
  ) {
    // Only protect routes that are not public
    if (!isPublicRoute(req)) {
      await auth.protect();
    }

    return;
  }

  // Apply internationalization for all other requests
  const response = intlMiddleware(req);

  // Only protect routes that are not public
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
