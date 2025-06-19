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

  // FALLBACK: Handle admin routes via URL path when subdomain is not available
  if (pathname.startsWith('/admin-dev')) {
    console.log('🚀 Admin Dev Route Detected - Rewriting to /admin');
    // For non-localized admin-dev, redirect to default locale admin
    const defaultLocale = 'en';
    const adminPath = pathname.replace('/admin-dev', `/${defaultLocale}/admin`);
    console.log('🚀 Rewriting to:', adminPath);
    return NextResponse.rewrite(new URL(adminPath, req.url));
  }

  // Handle localized admin-dev routes
  if (pathname.match(/^\/[a-z]{2}\/admin-dev/)) {
    console.log('🚀 Localized Admin Dev Route Detected');
    const adminPath = pathname.replace('/admin-dev', '/admin');
    console.log('🚀 Rewriting to:', adminPath);
    return NextResponse.rewrite(new URL(adminPath, req.url));
  }

  // Handle subdomain-specific logic
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
    if (pathname === '/') {
      // Redirect to role-based routing
      return NextResponse.rewrite(new URL('/org-redirect', req.url));
    }
    // Allow all other routes to proceed normally
  } else if (
    currentSubdomain === SUBDOMAINS.MAIN ||
    currentSubdomain === null
  ) {
    // Main domain - handle app routes
    if (
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/portal') ||
      pathname.startsWith('/org-')
    ) {
      if (isDevelopment) {
        // Development: Don't redirect to subdomains, let routes handle normally
        // Routes like /dashboard, /portal work directly on localhost:3000
        console.log(
          '🏠 Development: Allowing route to proceed normally:',
          pathname
        );
        // Allow the route to continue to Next.js routing
      } else {
        // Production/Staging: Redirect to appropriate app subdomain
        const isStaging = hostname.includes('staging.syndik.ma');
        const appDomain = isStaging ? 'app.staging.syndik.ma' : 'app.syndik.ma';
        const appUrl = `https://${appDomain}${pathname}`;

        console.log('🚀 Redirecting to app subdomain:', pathname, '→', appUrl);
        return NextResponse.redirect(new URL(appUrl));
      }
    }
  }

  // Handle backward compatibility - redirect old admin routes to admin subdomain
  if (pathname.startsWith('/admin') && currentSubdomain !== SUBDOMAINS.ADMIN) {
    if (isDevelopment) {
      // Development: Don't redirect to admin subdomain due to no admin rights
      console.log(
        '🏠 Development: Admin route detected, but not redirecting due to no admin rights'
      );
      // Allow the route to continue - /admin routes should work or use /admin-dev fallback
    } else {
      // Production/Staging: Redirect to appropriate admin subdomain
      // Extract locale and admin path
      const localeMatch = pathname.match(/^\/([a-z]{2})\/admin(.*)$/);
      if (localeMatch) {
        const [, locale, adminPath] = localeMatch;
        const targetPath = adminPath || '/';

        // Check if we're on staging or production
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

        // Check if we're on staging or production
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

  // Handle special routes that need locale detection
  if (pathname === '/org-switcher' || pathname === '/org-redirect') {
    // Get locale from cookie or header
    const localeCookie = req.cookies.get('NEXT_LOCALE')?.value;
    let locale = localeCookie;

    if (!locale) {
      const acceptLanguage = req.headers.get('accept-language');
      if (acceptLanguage) {
        // Parse accept-language header to get preferred locale
        const preferredLocale = acceptLanguage
          .split(',')[0]
          ?.split('-')[0]
          ?.toLowerCase();
        locale = ['en', 'fr', 'ar'].includes(preferredLocale || '')
          ? preferredLocale
          : 'en';
      } else {
        locale = 'en'; // fallback
      }
    }

    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    console.log(
      '🌍 Adding locale to special route:',
      pathname,
      '→',
      url.pathname
    );
    return NextResponse.rewrite(url);
  }

  // Run authentication checks
  if (!isPublicRoute(req)) await auth();

  // Apply internationalization
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
