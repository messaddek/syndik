'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { isRtlLocale, type Locale } from '@/i18n/config';

export const RTLHandler = () => {
  const locale = useLocale() as Locale;
  const isRtl = isRtlLocale(locale);

  useEffect(() => {
    // Ensure the HTML direction is set
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;

    // Add RTL class to body for additional styling
    if (isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [locale, isRtl]);

  return null;
}
