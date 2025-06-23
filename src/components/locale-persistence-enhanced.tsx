'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { useEffect, useRef } from 'react';

/**
 * Enhanced component that ensures locale persistence across navigation
 * and provides diagnostics for locale issues
 */
export const LocalePersistenceEnhanced = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const previousLocale = useRef(locale);
  const isInitialized = useRef(false);

  // Add immediate logging to verify component is rendered
  console.log('🚀 LocalePersistenceEnhanced rendered:', { locale, pathname });

  useEffect(() => {
    console.log('🔄 LocalePersistenceEnhanced useEffect triggered:', {
      locale,
      isInitialized: isInitialized.current,
    });

    // Skip initial render to avoid SSR/hydration issues
    if (!isInitialized.current) {
      isInitialized.current = true;
      previousLocale.current = locale;
      console.log(
        '🏁 LocalePersistenceEnhanced initialized, skipping first render'
      );
      return;
    }

    // Set locale cookie with proper cross-subdomain options
    const hostname = window.location.hostname;
    const isStaging = hostname.includes('staging.syndik.ma');
    const isProduction = hostname.includes('syndik.ma') && !isStaging;

    // Determine the correct domain for cross-subdomain cookies
    let cookieDomain = '';
    if (isStaging) {
      cookieDomain = '; domain=.staging.syndik.ma';
    } else if (isProduction) {
      cookieDomain = '; domain=.syndik.ma';
    } else {
      // Development - use current domain
      cookieDomain = '';
    }

    const cookieValue = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax; Secure=${
      window.location.protocol === 'https:'
    }${cookieDomain}`;

    document.cookie = cookieValue;

    console.log(`🍪 Setting cross-subdomain locale cookie: ${cookieValue}`);

    // Set in localStorage with error handling
    try {
      localStorage.setItem('preferred-locale', locale);
      localStorage.setItem('locale-last-set', Date.now().toString());
    } catch (error) {
      console.warn('Could not set locale in localStorage:', error);
    }

    // Set in sessionStorage for current session
    try {
      sessionStorage.setItem('current-locale', locale);
    } catch (error) {
      console.warn('Could not set locale in sessionStorage:', error);
    }

    // Check if locale changed unexpectedly
    if (previousLocale.current !== locale) {
      console.log(
        `🌐 Locale changed: ${previousLocale.current} → ${locale} at ${pathname}`
      );

      // Force a router refresh if locale is reset to 'en' unexpectedly
      // This might help recover from locale loss issues
      if (locale === 'en' && previousLocale.current !== 'en') {
        console.warn('🚨 Locale unexpectedly reset to "en", investigating...');
        // Check if URL still has the correct locale
        const urlLocale = pathname.split('/')[1];
        if (
          urlLocale &&
          routing.locales.includes(urlLocale as 'en' | 'fr' | 'ar') &&
          urlLocale !== locale
        ) {
          console.warn(
            `🚨 URL has locale "${urlLocale}" but next-intl shows "${locale}". This indicates a locale persistence issue.`
          );

          // Attempt to force correct locale by refreshing
          setTimeout(() => {
            console.log('🔄 Attempting to recover locale by refreshing...');
            router.refresh();
          }, 100);
        }
      }
    }

    previousLocale.current = locale;
  }, [locale, pathname, router]);
  // Monitor for locale mismatches between URL and next-intl
  useEffect(() => {
    const urlLocale = pathname.split('/')[1];
    if (
      urlLocale &&
      routing.locales.includes(urlLocale as 'en' | 'fr' | 'ar') &&
      urlLocale !== locale
    ) {
      console.error(
        `🚨 Locale mismatch detected! URL: "${urlLocale}", next-intl: "${locale}"`
      );

      // Log additional debugging info
      console.log('🔍 Debugging info:', {
        pathname,
        urlLocale,
        nextIntlLocale: locale,
        cookie: document.cookie.includes('NEXT_LOCALE')
          ? document.cookie.match(/NEXT_LOCALE=([^;]+)/)?.[1]
          : 'not found',
        localStorage: (() => {
          try {
            return localStorage.getItem('preferred-locale');
          } catch {
            return 'not accessible';
          }
        })(),
      });
    }
  }, [pathname, locale]);

  // Add a global error boundary for locale issues
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.message?.includes('useTranslations') ||
        event.message?.includes('locale')
      ) {
        console.error('🚨 Translation/locale error detected:', event.message);
        console.log('Current locale state:', {
          locale,
          pathname,
          timestamp: new Date().toISOString(),
        });
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [locale, pathname]);

  return null;
}
