'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { useEffect, useState, useMemo } from 'react';

interface TranslationResult {
  success: boolean;
  value?: string;
  error?: string;
}

interface Investigation {
  timestamp: string;
  locale: string;
  pathname: string;
  params: Record<string, string | string[]>;
  url: string;
  storage: {
    cookie: string;
    allCookies: string;
    localStorage: string;
    sessionStorage: string;
  };
  subdomainAnalysis: {
    hostname: string;
    isAppSubdomain: boolean;
    isMainDomain: boolean;
    isProduction: boolean;
    isStaging: boolean;
    isDevelopment: boolean;
    expectedCookieDomain: string;
  };
  urlAnalysis: {
    segments: string[];
    firstSegment: string;
    isValidLocale: boolean;
    expectedLocale: string;
    actualLocale: string;
    mismatch: boolean;
    routingConfig: {
      supportedLocales: readonly string[];
      defaultLocale: string;
      localePrefix: string | object;
      localeDetection: boolean;
    };
  };
  translations: {
    navigation: TranslationResult;
    common: TranslationResult;
    residents: TranslationResult;
  };
  browser: {
    userAgent: string;
    language: string;
    languages: readonly string[];
    cookieEnabled: boolean;
  };
  timing: {
    navigationStart: number | undefined;
    domContentLoaded: number | undefined;
    loadComplete: number | undefined;
  };
}

/**
 * Advanced locale debugging and investigation tool
 * This component helps identify exactly when and why locale is lost
 */
export function LocaleInvestigator() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Get translations safely
  const tNavigation = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const tResidents = useTranslations('residents');

  // Memoize translations to avoid useEffect dependency issues
  const translations = useMemo(() => {
    const getTranslation = (
      translationFn: (key: string) => string,
      key: string
    ): TranslationResult => {
      try {
        return { success: true, value: translationFn(key) };
      } catch (error) {
        return { success: false, error: String(error) };
      }
    };

    return {
      navigation: getTranslation(tNavigation, 'back_to_landing'),
      common: getTranslation(tCommon, 'loading'),
      residents: getTranslation(tResidents, 'title'),
    };
  }, [tNavigation, tCommon, tResidents]);

  // Comprehensive investigation on each render
  useEffect(() => {
    const investigation: Investigation = {
      timestamp: new Date().toISOString(),
      locale,
      pathname,
      params: params as Record<string, string | string[]>,
      url: window.location.href, // Check various storage mechanisms
      storage: {
        cookie: (() => {
          const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
          return match ? match[1] : 'not found';
        })(),
        allCookies: document.cookie, // Show all cookies for debugging
        localStorage: (() => {
          try {
            return localStorage.getItem('preferred-locale') || 'not set';
          } catch {
            return 'not accessible';
          }
        })(),
        sessionStorage: (() => {
          try {
            return sessionStorage.getItem('current-locale') || 'not set';
          } catch {
            return 'not accessible';
          }
        })(),
      },

      // Cross-subdomain analysis
      subdomainAnalysis: {
        hostname: window.location.hostname,
        isAppSubdomain: window.location.hostname.includes('app.'),
        isMainDomain:
          !window.location.hostname.includes('app.') &&
          !window.location.hostname.includes('admin.'),
        isStaging: window.location.hostname.includes('staging.syndik.ma'),
        isProduction:
          window.location.hostname.includes('syndik.ma') &&
          !window.location.hostname.includes('staging.syndik.ma'),
        isDevelopment:
          window.location.hostname.includes('localhost') ||
          window.location.hostname.includes('127.0.0.1'),
        expectedCookieDomain: (() => {
          const hostname = window.location.hostname;
          if (hostname.includes('staging.syndik.ma'))
            return '.staging.syndik.ma';
          if (hostname.includes('syndik.ma')) return '.syndik.ma';
          return 'localhost/dev';
        })(),
      }, // Check URL parsing
      urlAnalysis: {
        segments: pathname.split('/'),
        firstSegment: pathname.split('/')[1] || '',
        isValidLocale: routing.locales.includes(
          pathname.split('/')[1] as 'en' | 'fr' | 'ar'
        ),
        expectedLocale: pathname.split('/')[1] || '',
        actualLocale: locale,
        mismatch: pathname.split('/')[1] !== locale,
        routingConfig: {
          supportedLocales: routing.locales,
          defaultLocale: routing.defaultLocale,
          localePrefix: routing.localePrefix || 'always',
          localeDetection: routing.localeDetection || false,
        },
      },

      // Translation status
      translations,

      // Browser info
      browser: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages,
        cookieEnabled: navigator.cookieEnabled,
      },

      // Performance timing (to detect SSR/CSR issues)
      timing: {
        navigationStart: performance.timing?.navigationStart,
        domContentLoaded: performance.timing?.domContentLoadedEventEnd
          ? performance.timing.domContentLoadedEventEnd -
            (performance.timing?.navigationStart || 0)
          : undefined,
        loadComplete: performance.timing?.loadEventEnd
          ? performance.timing.loadEventEnd -
            (performance.timing?.navigationStart || 0)
          : undefined,
      },
    };

    setInvestigations(prev => [...prev.slice(-9), investigation]); // Keep last 10
  }, [locale, pathname, params, translations]);

  const runComprehensiveTest = () => {
    console.group('🔍 Comprehensive Locale Investigation');

    const currentInvestigation = investigations[investigations.length - 1];
    if (currentInvestigation) {
      console.log('Current State:', currentInvestigation); // Test cookie manipulation with cross-subdomain support      console.log('🍪 Testing cross-subdomain cookie manipulation...');
      const hostname = window.location.hostname;
      const isStaging = hostname.includes('staging.syndik.ma');
      const isProduction = hostname.includes('syndik.ma') && !isStaging;

      let cookieDomain = '';
      if (isStaging) {
        cookieDomain = '; domain=.staging.syndik.ma';
      } else if (isProduction) {
        cookieDomain = '; domain=.syndik.ma';
      }

      const testCookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax; Secure=${
        window.location.protocol === 'https:'
      }${cookieDomain}`;

      document.cookie = testCookie;
      console.log('Set cookie:', testCookie);
      console.log('Current cookies:', document.cookie);

      // Test localStorage
      console.log('💾 Testing localStorage...');
      try {
        localStorage.setItem('preferred-locale', locale);
        localStorage.setItem('locale-debug-test', Date.now().toString());
      } catch (error) {
        console.error('localStorage failed:', error);
      }

      // Test URL consistency
      if (currentInvestigation.urlAnalysis.mismatch) {
        console.error('🚨 LOCALE MISMATCH DETECTED!');
        console.log(
          'Expected (from URL):',
          currentInvestigation.urlAnalysis.expectedLocale
        );
        console.log(
          'Actual (from next-intl):',
          currentInvestigation.urlAnalysis.actualLocale
        );
        console.log('This indicates a serious locale persistence issue.');
      }

      // Test translation failures
      const failedTranslations = Object.entries(
        currentInvestigation.translations
      ).filter(([, result]) => !result.success);

      if (failedTranslations.length > 0) {
        console.error('🚨 TRANSLATION FAILURES:');
        failedTranslations.forEach(([namespace, result]) => {
          console.error(`${namespace}:`, result.error);
        });
      }
    }

    console.groupEnd();
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const currentInvestigation = investigations[investigations.length - 1];
  const hasCriticalIssues =
    currentInvestigation?.urlAnalysis.mismatch ||
    Object.values(currentInvestigation?.translations || {}).some(
      t => !t.success
    );

  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-md p-3 text-xs shadow-lg transition-all ${
        hasCriticalIssues
          ? 'border-2 border-red-500 bg-red-900 text-red-100'
          : 'bg-gray-900 text-gray-100'
      } ${isExpanded ? 'max-w-2xl' : 'max-w-sm'}`}
    >
      <div className='mb-2 flex items-center justify-between'>
        <div className='flex items-center gap-2 font-bold'>
          🔬 Locale Investigator
          {hasCriticalIssues && <span className='text-red-400'>⚠️</span>}
        </div>
        <div className='flex gap-1'>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700'
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
          <button
            onClick={runComprehensiveTest}
            className='rounded bg-green-600 px-2 py-1 text-xs hover:bg-green-700'
          >
            Test
          </button>
        </div>
      </div>

      {currentInvestigation && (
        <div className='space-y-2'>
          <div className='grid grid-cols-2 gap-2 text-xs'>
            <div>
              Current:{' '}
              <span className='text-blue-400'>
                {currentInvestigation.locale}
              </span>
            </div>
            <div>
              URL:{' '}
              <span className='text-green-400'>
                {currentInvestigation.urlAnalysis.expectedLocale}
              </span>
            </div>
            <div>
              Cookie:{' '}
              <span className='text-yellow-400'>
                {currentInvestigation.storage.cookie}
              </span>
            </div>
            <div>
              localStorage:{' '}
              <span className='text-purple-400'>
                {currentInvestigation.storage.localStorage}
              </span>
            </div>
          </div>

          {currentInvestigation.urlAnalysis.mismatch && (
            <div className='rounded bg-red-800 p-2 text-red-100'>
              🚨 MISMATCH: URL shows &ldquo;
              {currentInvestigation.urlAnalysis.expectedLocale}&rdquo; but
              next-intl shows &ldquo;{currentInvestigation.locale}&rdquo;
            </div>
          )}

          {isExpanded && (
            <div className='mt-3 max-h-96 space-y-2 overflow-y-auto'>
              <div>
                <div className='font-semibold text-yellow-400'>
                  Translations Status:
                </div>
                {Object.entries(currentInvestigation.translations).map(
                  ([namespace, result]) => (
                    <div
                      key={namespace}
                      className={`ml-2 ${result.success ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {namespace}: {result.success ? '✅' : '❌'}{' '}
                      {result.success ? result.value : result.error}
                    </div>
                  )
                )}
              </div>{' '}
              <div>
                <div className='font-semibold text-blue-400'>URL Analysis:</div>
                <div className='ml-2 space-y-1'>
                  <div>Path: {currentInvestigation.pathname}</div>
                  <div>
                    Segments:{' '}
                    {JSON.stringify(currentInvestigation.urlAnalysis.segments)}
                  </div>
                  <div>
                    First segment is valid locale:{' '}
                    {currentInvestigation.urlAnalysis.isValidLocale
                      ? '✅'
                      : '❌'}
                  </div>
                </div>
              </div>
              <div>
                <div className='font-semibold text-purple-400'>
                  Routing Config:
                </div>
                <div className='ml-2 space-y-1'>
                  <div>
                    Supported:{' '}
                    {JSON.stringify(
                      currentInvestigation.urlAnalysis.routingConfig
                        .supportedLocales
                    )}
                  </div>
                  <div>
                    Default:{' '}
                    {
                      currentInvestigation.urlAnalysis.routingConfig
                        .defaultLocale
                    }
                  </div>
                  <div>
                    Locale Detection:{' '}
                    {currentInvestigation.urlAnalysis.routingConfig
                      .localeDetection
                      ? '✅'
                      : '❌'}
                  </div>{' '}
                  <div>
                    Prefix Mode:{' '}
                    {typeof currentInvestigation.urlAnalysis.routingConfig
                      .localePrefix === 'string'
                      ? currentInvestigation.urlAnalysis.routingConfig
                          .localePrefix
                      : 'complex'}
                  </div>
                </div>
              </div>
              <div>
                <div className='font-semibold text-orange-400'>
                  Subdomain Analysis:
                </div>
                <div className='ml-2 space-y-1'>
                  <div>
                    Hostname: {currentInvestigation.subdomainAnalysis.hostname}
                  </div>
                  <div>
                    App Subdomain:{' '}
                    {currentInvestigation.subdomainAnalysis.isAppSubdomain
                      ? '✅'
                      : '❌'}
                  </div>
                  <div>
                    Main Domain:{' '}
                    {currentInvestigation.subdomainAnalysis.isMainDomain
                      ? '✅'
                      : '❌'}
                  </div>
                  <div>
                    Environment:{' '}
                    {currentInvestigation.subdomainAnalysis.isDevelopment
                      ? 'Dev'
                      : currentInvestigation.subdomainAnalysis.isStaging
                        ? 'Staging'
                        : 'Production'}
                  </div>
                  <div>
                    Cookie Domain:{' '}
                    {
                      currentInvestigation.subdomainAnalysis
                        .expectedCookieDomain
                    }
                  </div>
                  <div className='mt-1 text-xs text-gray-400'>
                    All Cookies:{' '}
                    {currentInvestigation.storage.allCookies || 'none'}
                  </div>
                </div>
              </div>
              <div>
                <div className='font-semibold text-green-400'>
                  History ({investigations.length}):
                </div>
                <div className='ml-2 max-h-32 space-y-1 overflow-y-auto'>
                  {investigations.slice(-5).map((inv, index) => (
                    <div key={index} className='text-xs'>
                      {new Date(inv.timestamp).toLocaleTimeString()}:{' '}
                      {inv.locale} @ {inv.pathname}
                      {inv.urlAnalysis.mismatch && (
                        <span className='text-red-400'> ⚠️</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
