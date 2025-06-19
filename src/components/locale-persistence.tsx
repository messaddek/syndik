'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

/**
 * Component that ensures locale persistence by setting a cookie
 * This helps maintain locale across navigation and page reloads
 */
export function LocalePersistence() {
  const locale = useLocale();
  useEffect(() => {
    // Determine the correct domain for cross-subdomain cookies
    const hostname = window.location.hostname;
    const isStaging = hostname.includes('staging.syndik.ma');
    const isProduction = hostname.includes('syndik.ma') && !isStaging;

    let cookieDomain = '';
    if (isStaging) {
      cookieDomain = '; domain=.staging.syndik.ma';
    } else if (isProduction) {
      cookieDomain = '; domain=.syndik.ma';
    }

    // Set locale cookie to persist user's language preference across subdomains
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax${cookieDomain}`;

    // Also set in localStorage as backup
    try {
      localStorage.setItem('preferred-locale', locale);
    } catch (error) {
      // localStorage might not be available
      console.warn('Could not set locale in localStorage:', error);
    }
  }, [locale]);

  return null;
}
