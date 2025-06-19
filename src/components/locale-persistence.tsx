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
    // Set locale cookie to persist user's language preference
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;

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
