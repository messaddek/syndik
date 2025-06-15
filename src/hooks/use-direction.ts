'use client';

import { useEffect, useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { isRtlLocale, type Locale } from '@/i18n/config';

// Get direction synchronously from DOM or locale
function getCurrentDirection(locale?: Locale): 'ltr' | 'rtl' {
  console.log(`🔍 getCurrentDirection called with locale:`, locale);

  // Always prioritize locale-based calculation for accurate direction
  if (locale) {
    const isRtl = isRtlLocale(locale);
    console.log(`🌍 isRtlLocale(${locale}):`, isRtl);
    const direction = isRtl ? 'rtl' : 'ltr';
    console.log(`🎯 Calculated direction for ${locale}:`, direction);
    return direction;
  }

  // Fallback: try to get direction from DOM if locale is not available
  if (typeof window !== 'undefined' && document.documentElement.dir) {
    const docDir = document.documentElement.dir;
    console.log(`📄 Document dir attribute (fallback):`, docDir);
    if (docDir === 'rtl' || docDir === 'ltr') {
      console.log(`✅ Using document direction as fallback:`, docDir);
      return docDir;
    }
  }

  console.log(`⚠️ Fallback to ltr`);
  return 'ltr';
}

export function useDirection() {
  const locale = useLocale() as Locale;
  // Calculate direction synchronously - no state changes needed for the actual direction
  const direction = useMemo(() => {
    const newDirection = getCurrentDirection(locale);
    console.log(`🔄 Direction calculated for locale ${locale}:`, newDirection);
    return newDirection;
  }, [locale]);

  // Track if we're mounted for components that need it
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    console.log(
      `🌐 Direction useEffect triggered for locale ${locale}, direction: ${direction}`
    );
    setMounted(true);

    // Mark document as hydrated to enable smooth transitions
    document.documentElement.setAttribute('data-hydrated', 'true');

    // Ensure DOM is in sync with calculated direction
    if (document.documentElement.dir !== direction) {
      console.log(
        `📝 Updating document direction from ${document.documentElement.dir} to ${direction}`
      );
      document.documentElement.dir = direction;
    }

    // Update the body class for any CSS that depends on direction
    document.body.classList.remove('ltr', 'rtl');
    document.body.classList.add(direction);

    // Force a re-render of Radix components by triggering a custom event
    window.dispatchEvent(
      new CustomEvent('direction-change', {
        detail: { direction },
      })
    );
  }, [direction, locale]);

  return {
    direction,
    isRtl: direction === 'rtl',
    locale,
    mounted,
  };
}
