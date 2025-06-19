'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface TranslationResult {
  success: boolean;
  value?: string;
  error?: string;
}

interface UrlInfo {
  fullUrl: string;
  hostname: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
}

interface TranslationTests {
  navigation: {
    backToLanding: TranslationResult;
    dashboard: TranslationResult;
  };
  common: {
    loading: TranslationResult;
  };
  dashboard: {
    title: TranslationResult;
  };
}

interface LocalStorageInfo {
  preferredLocale: string | null;
  allKeys: string[];
}

interface Diagnostics {
  timestamp: string;
  locale: string;
  urlInfo: UrlInfo;
  translationTests: TranslationTests;
  cookies: string;
  localStorage: LocalStorageInfo | string;
}

/**
 * URL and Translation Diagnostic Component
 * Specifically to debug the Arabic translation issue
 */
export function UrlTranslationDiagnostic() {
  const locale = useLocale();
  const [diagnostics, setDiagnostics] = useState<Diagnostics | null>(null);

  // Try different translation namespaces
  const tNavigation = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const tDashboard = useTranslations('dashboard');

  useEffect(() => {
    const urlInfo = {
      fullUrl: window.location.href,
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      origin: window.location.origin,
    };

    const translationTests = {
      navigation: {
        backToLanding: (() => {
          try {
            return { success: true, value: tNavigation('backToLanding') };
          } catch (error) {
            return { success: false, error: String(error) };
          }
        })(),
        dashboard: (() => {
          try {
            return { success: true, value: tNavigation('dashboard') };
          } catch (error) {
            return { success: false, error: String(error) };
          }
        })(),
      },
      common: {
        loading: (() => {
          try {
            return { success: true, value: tCommon('loading') };
          } catch (error) {
            return { success: false, error: String(error) };
          }
        })(),
      },
      dashboard: {
        title: (() => {
          try {
            return { success: true, value: tDashboard('title') };
          } catch (error) {
            return { success: false, error: String(error) };
          }
        })(),
      },
    };

    const diagnosis = {
      timestamp: new Date().toISOString(),
      locale,
      urlInfo,
      translationTests,
      cookies: document.cookie,
      localStorage: (() => {
        try {
          return {
            preferredLocale: localStorage.getItem('preferred-locale'),
            allKeys: Object.keys(localStorage),
          };
        } catch {
          return 'not accessible';
        }
      })(),
    };

    setDiagnostics(diagnosis);
    console.log('🩺 URL & Translation Diagnostics:', diagnosis);

    // Special check for Arabic
    if (locale === 'ar') {
      console.log('🇸🇦 Arabic Locale Detected - Testing Arabic translations:');
      console.log(
        'Navigation Dashboard (should be "لوحة التحكم"):',
        translationTests.navigation.dashboard
      );
      console.log(
        'Expected Arabic, got:',
        typeof translationTests.navigation.dashboard.value
      );
    }
  }, [locale, tNavigation, tCommon, tDashboard]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!diagnostics) {
    return (
      <div className='fixed top-1/2 left-4 z-50 rounded-md bg-yellow-900 p-2 text-xs text-yellow-100'>
        🩺 Loading diagnostics...
      </div>
    );
  }

  return (
    <div className='fixed top-1/2 left-4 z-50 max-w-lg rounded-md bg-yellow-900 p-3 text-xs text-yellow-100 shadow-lg'>
      <div className='mb-2 font-bold text-yellow-200'>
        🩺 URL & Translation Diagnostic
      </div>

      <div className='space-y-2'>
        <div>
          <div className='font-semibold text-yellow-300'>Current State:</div>
          <div>
            Locale: <span className='text-white'>{diagnostics.locale}</span>
          </div>
          <div>
            Full URL:{' '}
            <span className='text-white'>{diagnostics.urlInfo.fullUrl}</span>
          </div>
          <div>
            Pathname:{' '}
            <span className='text-white'>{diagnostics.urlInfo.pathname}</span>
          </div>
        </div>

        <div>
          <div className='font-semibold text-yellow-300'>
            Translation Tests:
          </div>
          <div>
            Navigation Dashboard:
            <span
              className={
                diagnostics.translationTests.navigation.dashboard.success
                  ? 'text-green-300'
                  : 'text-red-300'
              }
            >
              {diagnostics.translationTests.navigation.dashboard.success
                ? diagnostics.translationTests.navigation.dashboard.value
                : 'FAILED'}
            </span>
          </div>
          <div>
            Common Loading:
            <span
              className={
                diagnostics.translationTests.common.loading.success
                  ? 'text-green-300'
                  : 'text-red-300'
              }
            >
              {diagnostics.translationTests.common.loading.success
                ? diagnostics.translationTests.common.loading.value
                : 'FAILED'}
            </span>
          </div>
        </div>

        <div>
          <div className='font-semibold text-yellow-300'>Diagnosis:</div>
          {diagnostics.locale === 'ar' &&
            diagnostics.urlInfo.pathname === '/' && (
              <div className='text-red-300'>
                ⚠️ Arabic locale but root path - should be /ar
              </div>
            )}
          {diagnostics.translationTests.navigation.dashboard.success &&
            diagnostics.translationTests.navigation.dashboard.value ===
              'Dashboard' && (
              <div className='text-red-300'>
                ⚠️ Getting English translations despite Arabic locale
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
