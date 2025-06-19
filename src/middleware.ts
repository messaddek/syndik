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

export default clerkMiddleware(async (auth, req) => {
  const { hostname, pathname } = req.nextUrl;
  const currentSubdomain = getCurrentSubdomain(hostname);
  const isDevelopment = process.env.NODE_ENV === 'development';

  console.log('🌐 Middleware - Hostname:', hostname);
  console.log('🌐 Middleware - Pathname:', pathname);
  console.log('🌐 Middleware - Subdomain:', currentSubdomain);
  console.log(
    '🌐 Middleware - Environment:',
    isDevelopment ? 'development' : 'production'
  );
  // CRITICAL: Handle API routes first - skip all subdomain logic
  if (pathname.startsWith('/api')) {
    console.log('🔧 API Route - Skipping subdomain logic:', pathname);
    // Only protect routes that are not public
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
    return; // Early return for API routes
  }

  // Skip subdomain logic for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    console.log('🔧 Static/Internal - Skipping subdomain logic:', pathname);
    return; // Early return for static files
  }

  // DEVELOPMENT ONLY: Handle admin-dev routes (fallback when no admin subdomain access)
  if (isDevelopment) {
    // Handle non-localized admin-dev routes
    if (pathname.startsWith('/admin-dev')) {
      console.log('🚀 Admin Dev Route Detected - Rewriting to /admin');
      const defaultLocale = 'en';
      const adminPath = pathname.replace(
        '/admin-dev',
        `/${defaultLocale}/admin`
      );
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

    // Development: Don't redirect to subdomains, allow normal routing
    if (
      pathname.startsWith('/admin') &&
      currentSubdomain !== SUBDOMAINS.ADMIN
    ) {
      console.log(
        '🏠 Development: Admin route detected, allowing normal routing (no subdomain redirect)'
      );
      // Let the route continue normally to Next.js routing
    }

    // Development: Allow dashboard/portal routes on localhost
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/portal')) {
      console.log(
        '🏠 Development: App route detected, allowing normal routing'
      );
      // Let the route continue normally to Next.js routing
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
        // For root path, redirect to default locale admin
        if (pathname === '/') {
          const defaultLocale = 'en';
          const adminPath = `/${defaultLocale}/admin`;
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
          // Non-locale path, add default locale
          const defaultLocale = 'en';
          const adminPath = `/${defaultLocale}/admin${pathname}`;
          console.log(
            '🚀 Admin Default Locale Rewrite:',
            pathname,
            '→',
            adminPath
          );
          return NextResponse.rewrite(new URL(adminPath, req.url));
        }
      }
    } else if (currentSubdomain === SUBDOMAINS.APP) {
      // App subdomain - handle dashboard and portal routes

      // Hide /dashboard from URLs - rewrite root and locale roots to dashboard
      if (pathname === '/') {
        console.log('🚀 App Root - Rewriting to /en/dashboard');
        return NextResponse.rewrite(new URL('/en/dashboard', req.url));
      }

      // Handle locale root paths (e.g., /en, /fr) and rewrite to dashboard
      const localeOnlyMatch = pathname.match(/^\/([a-z]{2})$/);
      if (localeOnlyMatch) {
        const [, locale] = localeOnlyMatch;
        const dashboardPath = `/${locale}/dashboard`;
        console.log(
          `🚀 App Locale Root - Rewriting ${pathname} to ${dashboardPath}`
        );
        return NextResponse.rewrite(new URL(dashboardPath, req.url));
      } // Allow all other routes to proceed normally
    } else if (
      currentSubdomain === SUBDOMAINS.MAIN ||
      currentSubdomain === null
    ) {
      // Main domain - redirect app routes to app subdomain
      const isDashboardRoute =
        pathname.startsWith('/dashboard') ||
        pathname.match(/^\/[a-z]{2}\/dashboard/);
      const isPortalRoute =
        pathname.startsWith('/portal') || pathname.match(/^\/[a-z]{2}\/portal/);
      const isOrgRoute =
        pathname.startsWith('/org-') || pathname.match(/^\/[a-z]{2}\/org-/);

      // Debug route detection only for main domain redirects
      if (isDashboardRoute || isPortalRoute || isOrgRoute) {
        console.log('🔍 Main Domain Route Detection:', {
          isDashboardRoute,
          isPortalRoute,
          isOrgRoute,
          currentSubdomain,
          willRedirect: true,
        });
      }

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

          console.log(
            '🚀 Redirecting dashboard to clean URL:',
            pathname,
            '→',
            cleanUrl
          );
          return NextResponse.redirect(new URL(cleanUrl));
        } else {
          // For portal and org routes, keep the original path
          const appUrl = `https://${appDomain}${pathname}`;
          console.log(
            '🚀 Redirecting to app subdomain:',
            pathname,
            '→',
            appUrl
          );
          return NextResponse.redirect(new URL(appUrl));
        }
      }

      // Main domain - redirect admin routes to admin subdomain
      const isAdminRoute =
        pathname.startsWith('/admin') || pathname.match(/^\/[a-z]{2}\/admin/);

      if (isAdminRoute) {
        // Extract locale and admin path
        const localeMatch = pathname.match(/^\/([a-z]{2})\/admin(.*)$/);
        if (localeMatch) {
          const [, locale, adminPath] = localeMatch;
          const targetPath = adminPath || '/';

          const isStaging = hostname.includes('staging.syndik.ma');
          const adminDomain = isStaging
            ? 'admin.staging.syndik.ma'
            : 'admin.syndik.ma';
          const adminUrl = `https://${adminDomain}/${locale}/admin${targetPath}`;

          console.log(
            '🔄 Redirecting locale-based admin route:',
            pathname,
            '→',
            adminUrl
          );
          return NextResponse.redirect(new URL(adminUrl));
        } else {
          // Non-locale admin route, add default locale
          const adminPath = pathname.replace('/admin', '') || '/';
          const defaultLocale = 'en';

          const isStaging = hostname.includes('staging.syndik.ma');
          const adminDomain = isStaging
            ? 'admin.staging.syndik.ma'
            : 'admin.syndik.ma';
          const adminUrl = `https://${adminDomain}/${defaultLocale}/admin${adminPath}`;

          console.log(
            '🔄 Redirecting non-locale admin route:',
            pathname,
            '→',
            adminUrl
          );
          return NextResponse.redirect(new URL(adminUrl));
        }
      }
    }
  }

  // Handle non-localized org routes redirect to localized versions
  if (pathname === '/org-switcher' || pathname === '/org-redirect') {
    // Try to detect user's preferred locale from multiple sources
    let targetLocale = 'en'; // default fallback

    // 1. Check for locale in cookies (if user has previously selected one)
    const localeCookie = req.cookies.get('NEXT_LOCALE')?.value;

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

    const url = req.nextUrl.clone();
    url.pathname = `/${targetLocale}${pathname}`;

    // Preserve query parameters if any
    console.log(
      '🌐 Redirecting org route to localized version:',
      pathname,
      '→',
      url.pathname
    );
    return Response.redirect(url);
  }
  // Skip intl middleware for API routes only
  // Allow sign-in/sign-up to go through intl middleware for proper locale redirection
  // NOTE: API routes are handled at the beginning of the middleware with early return

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
