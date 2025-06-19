import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import { getCurrentSubdomain, SUBDOMAINS } from './lib/subdomain-utils';

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
  // All API routes are non-localized
  '/api(.*)',
]);

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

// Helper function to get user's preferred locale
function getPreferredLocale(req: Request): string {
  let targetLocale = 'en'; // default fallback

  // 1. Check for locale in cookies (if user has previously selected one)
  const localeCookie = req.headers.get('cookie')?.match(/NEXT_LOCALE=([^;]+)/)?.[1];

  // 2. Check Accept-Language header
  const acceptLanguage = req.headers.get('accept-language');
  const browserLocale = acceptLanguage?.split(',')[0]?.split('-')[0];

  const supportedLocales = ['en', 'fr', 'ar'];

  // Priority: cookie > browser language > default
  if (localeCookie && supportedLocales.includes(localeCookie)) {
    targetLocale = localeCookie;
  } else if (browserLocale && supportedLocales.includes(browserLocale)) {
    targetLocale = browserLocale;
  }

  return targetLocale;
}

export default clerkMiddleware(async (auth, req) => {
  const { hostname, pathname } = req.nextUrl;
  const currentSubdomain = getCurrentSubdomain(hostname);
  const isDevelopment = process.env.NODE_ENV === 'development';

  console.log('🌐 Middleware - Hostname:', hostname);
  console.log('🌐 Middleware - Pathname:', pathname);
  console.log('🌐 Middleware - Subdomain:', currentSubdomain);
  console.log('🌐 Middleware - Environment:', isDevelopment ? 'development' : 'production');

  // CRITICAL: Handle authentication for protected routes FIRST
  if (!isPublicRoute(req)) {
    console.log('🔒 Protected Route - Authenticating:', pathname);
    await auth.protect();
  }

  // CRITICAL: Handle API routes first - skip all subdomain and i18n logic
  if (pathname.startsWith('/api')) {
    console.log('🔧 API Route - Skipping subdomain logic:', pathname);
    return; // Early return for API routes
  }

  // Skip subdomain logic for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    console.log('🔧 Static/Internal - Skipping subdomain logic:', pathname);
    // Still apply intl middleware for non-static routes
    if (!pathname.includes('.')) {
      return intlMiddleware(req);
    }
    return;
  }

  // DEVELOPMENT ONLY: Handle admin-dev routes (fallback when no admin subdomain access)
  if (isDevelopment) {
    // Handle non-localized admin-dev routes
    if (pathname.startsWith('/admin-dev')) {
      console.log('🚀 Admin Dev Route Detected - Rewriting to /admin');
      const preferredLocale = getPreferredLocale(req);
      const adminPath = pathname.replace('/admin-dev', `/${preferredLocale}/admin`);
      console.log('🚀 Rewriting to:', adminPath);
      return NextResponse.rewrite(new URL(adminPath, req.url));
    }

    // Handle localized admin-dev routes (e.g., /en/admin-dev)
    if (pathname.match(/^\/[a-z]{2}\/admin-dev/)) {
      console.log('🚀 Localized Admin Dev Route Detected');
      const adminPath = pathname.replace('/admin-dev', '/admin');
      console.log('🚀 Rewriting to:', adminPath);
      return NextResponse.rewrite(new URL(adminPath, req.url));
    }

    // Development: Don't redirect to subdomains, allow normal routing with i18n
    if (pathname.startsWith('/admin') && currentSubdomain !== SUBDOMAINS.ADMIN) {
      console.log('🏠 Development: Admin route detected, applying i18n');
      return intlMiddleware(req);
    }

    // Development: Allow dashboard/portal routes on localhost with i18n
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/portal')) {
      console.log('🏠 Development: App route detected, applying i18n');
      return intlMiddleware(req);
    }
  }

  // SUBDOMAIN HANDLING: Only apply subdomain logic in production/staging
  if (!isDevelopment) {
    // Handle subdomain-specific logic for production/staging
    if (currentSubdomain === SUBDOMAINS.ADMIN) {
      // Admin subdomain - ensure all routes are prefixed with /admin
      if (
        !pathname.startsWith('/admin') &&
        !pathname.startsWith('/_next') &&
        !pathname.startsWith('/api')
      ) {
        // For root path, redirect to default locale admin with user's preferred locale
        if (pathname === '/') {
          const preferredLocale = getPreferredLocale(req);
          const adminPath = `/${preferredLocale}/admin`;
          console.log('🚀 Admin Root Rewrite:', pathname, '→', adminPath);
          return NextResponse.rewrite(new URL(adminPath, req.url));
        }

        // For other paths, check if they're locale-based
        const localeMatch = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
        if (localeMatch) {
          const [, locale, subPath] = localeMatch;
          const adminPath = `/${locale}/admin${subPath || ''}`;
          console.log('🚀 Admin Locale Rewrite:', pathname, '→', adminPath);
          return NextResponse.rewrite(new URL(adminPath, req.url));
        } else {
          // Non-locale path, add user's preferred locale
          const preferredLocale = getPreferredLocale(req);
          const adminPath = `/${preferredLocale}/admin${pathname}`;
          console.log('🚀 Admin Default Locale Rewrite:', pathname, '→', adminPath);
          return NextResponse.rewrite(new URL(adminPath, req.url));
        }
      }
    } else if (currentSubdomain === SUBDOMAINS.APP) {
      // App subdomain - handle dashboard and portal routes with proper i18n

      // Hide /dashboard from URLs - rewrite root to dashboard with user's preferred locale
      if (pathname === '/') {
        const preferredLocale = getPreferredLocale(req);
        console.log('🚀 App Root - Rewriting to dashboard with locale:', preferredLocale);
        return NextResponse.rewrite(new URL(`/${preferredLocale}/dashboard`, req.url));
      }

      // Handle locale root paths (e.g., /en, /fr) and rewrite to dashboard
      const localeOnlyMatch = pathname.match(/^\/([a-z]{2})$/);
      if (localeOnlyMatch) {
        const [, locale] = localeOnlyMatch;
        const dashboardPath = `/${locale}/dashboard`;
        console.log(`🚀 App Locale Root - Rewriting ${pathname} to ${dashboardPath}`);
        return NextResponse.rewrite(new URL(dashboardPath, req.url));
      }
      
      // For all other routes on app subdomain, apply intl middleware
      return intlMiddleware(req);
    } else if (currentSubdomain === SUBDOMAINS.MAIN || currentSubdomain === null) {
      // Main domain - redirect app routes to app subdomain
      const isDashboardRoute = pathname.startsWith('/dashboard') || pathname.match(/^\/[a-z]{2}\/dashboard/);
      const isPortalRoute = pathname.startsWith('/portal') || pathname.match(/^\/[a-z]{2}\/portal/);
      const isOrgRoute = pathname.startsWith('/org-') || pathname.match(/^\/[a-z]{2}\/org-/);

      if (isDashboardRoute || isPortalRoute || isOrgRoute) {
        const isStaging = hostname.includes('staging.syndik.ma');
        const appDomain = isStaging ? 'app.staging.syndik.ma' : 'app.syndik.ma';

        // For dashboard routes, redirect to clean URLs (remove /dashboard)
        if (isDashboardRoute) {
          let cleanUrl;
          const localeMatch = pathname.match(/^\/([a-z]{2})\/dashboard(.*)$/);
          if (localeMatch) {
            const [, locale, subPath] = localeMatch;
            // Redirect /en/dashboard to /en, /en/dashboard/settings to /en/settings
            cleanUrl = `https://${appDomain}/${locale}${subPath || ''}`;
          } else {
            // Non-locale dashboard route: /dashboard -> /, /dashboard/settings -> /settings
            const dashboardPath = pathname.replace('/dashboard', '') || '/';
            cleanUrl = `https://${appDomain}${dashboardPath}`;
          }

          console.log('🚀 Redirecting dashboard to clean URL:', pathname, '→', cleanUrl);
          return NextResponse.redirect(new URL(cleanUrl));
        } else {
          // For portal and org routes, keep the original path
          const appUrl = `https://${appDomain}${pathname}`;
          console.log('🚀 Redirecting to app subdomain:', pathname, '→', appUrl);
          return NextResponse.redirect(new URL(appUrl));
        }
      }

      // Main domain - redirect admin routes to admin subdomain
      const isAdminRoute = pathname.startsWith('/admin') || pathname.match(/^\/[a-z]{2}\/admin/);

      if (isAdminRoute) {
        // Extract locale and admin path
        const localeMatch = pathname.match(/^\/([a-z]{2})\/admin(.*)$/);
        if (localeMatch) {
          const [, locale, adminPath] = localeMatch;
          const targetPath = adminPath || '/';

          const isStaging = hostname.includes('staging.syndik.ma');
          const adminDomain = isStaging ? 'admin.staging.syndik.ma' : 'admin.syndik.ma';
          const adminUrl = `https://${adminDomain}/${locale}/admin${targetPath}`;

          console.log('🔄 Redirecting locale-based admin route:', pathname, '→', adminUrl);
          return NextResponse.redirect(new URL(adminUrl));
        } else {
          // Non-locale admin route, add user's preferred locale
          const adminPath = pathname.replace('/admin', '') || '/';
          const preferredLocale = getPreferredLocale(req);

          const isStaging = hostname.includes('staging.syndik.ma');
          const adminDomain = isStaging ? 'admin.staging.syndik.ma' : 'admin.syndik.ma';
          const adminUrl = `https://${adminDomain}/${preferredLocale}/admin${adminPath}`;

          console.log('🔄 Redirecting non-locale admin route:', pathname, '→', adminUrl);
          return NextResponse.redirect(new URL(adminUrl));
        }
      }
    }
  }

  // Handle non-localized org routes redirect to localized versions
  if (pathname === '/org-switcher' || pathname === '/org-redirect') {
    const targetLocale = getPreferredLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${targetLocale}${pathname}`;

    // Preserve query parameters if any
    console.log('🌐 Redirecting org route to localized version:', pathname, '→', url.pathname);
    return Response.redirect(url);
  }

  // Apply internationalization for all other requests
  // This ensures that all routes get proper locale handling
  console.log('🌐 Applying intl middleware for:', pathname);
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
