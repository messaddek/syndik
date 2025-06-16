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
  '/:locale/org-switcher',
  '/:locale/org-redirect',
  '/:locale/org-switcher(.*)',
  '/:locale/org-redirect(.*)',
  // Localized content routes
  '/:locale/user-guide(.*)',
  '/:locale/help(.*)',
  '/:locale/support(.*)',
  '/:locale/documentation(.*)',
  '/:locale/articles(.*)',
  // Non-localized redirect handlers only
  '/org-switcher',
  '/org-redirect',
  // All API routes are non-localized
  '/api(.*)',
]);

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Skip intl middleware for API routes and specific redirect handlers only
  // Allow sign-in/sign-up to go through intl middleware for proper locale redirection
  if (
    pathname.startsWith('/api') ||
    pathname === '/org-switcher' ||
    pathname === '/org-redirect'
  ) {
    // Only protect routes that are not public
    if (!isPublicRoute(req)) {
      await auth.protect();
    }

    return;
  }

  // Apply internationalization for all other requests (excluding API routes)
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
