'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

/**
 * Component that ensures locale persistence by setting a cookie
 * This helps maintain locale across navigation and page reloads
 */
export const LocalePersistence = () => {
  const locale = useLocale();

  // Add immediate logging to verify component is rendered
  console.log('🚀 LocalePersistence rendered:', { locale });

  useEffect(() => {
    console.log('🔄 LocalePersistence useEffect triggered:', { locale });

    // Determine the correct domain for cross-subdomain cookies
    const hostname = window.location.hostname;
    const isStaging = hostname.includes('staging.syndik.ma');
    const isProduction = hostname.includes('syndik.ma') && !isStaging;

    console.log('🌍 Environment detection:', {
      hostname,
      isStaging,
      isProduction,
    });
    let cookieDomain = '';
    if (isStaging) {
      cookieDomain = '; domain=.staging.syndik.ma';
    } else if (isProduction) {
      cookieDomain = '; domain=.syndik.ma';
    }

    const cookieValue = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax${cookieDomain}`;
    console.log('🍪 Setting cookie:', cookieValue);

    // Set locale cookie to persist user's language preference across subdomains
    document.cookie = cookieValue;

    console.log('🍪 Cookie set, verifying:', document.cookie);

    // Also set in localStorage as backup
    try {
      localStorage.setItem('preferred-locale', locale);
      console.log('💾 localStorage set:', locale);
    } catch (error) {
      // localStorage might not be available
      console.warn('Could not set locale in localStorage:', error);
    }
  }, [locale]);

  return null;
}
