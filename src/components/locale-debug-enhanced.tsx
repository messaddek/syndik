'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { useEffect, useState } from 'react';

export const LocaleDebugEnhanced = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('navigation');
  const [cookieLocale, setCookieLocale] = useState<string>('');
  const [localStorageLocale, setLocalStorageLocale] = useState<string>('');
  const [browserUrl, setBrowserUrl] = useState<string>('');
  const [subdomain, setSubdomain] = useState<string>('');
  const [middlewareInfo, setMiddlewareInfo] = useState<string>('');
  const [navigationsCount, setNavigationsCount] = useState(0);
  const [localeHistory, setLocaleHistory] = useState<
    Array<{
      locale: string;
      pathname: string;
      subdomain: string;
      timestamp: number;
    }>
  >([]);
  useEffect(() => {
    // Detect subdomain first
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    let detectedSubdomain = 'main';

    if (parts.length > 2) {
      // Extract subdomain (e.g., 'app' from 'app.syndik.ma')
      detectedSubdomain = parts[0];
    } else if (hostname === 'localhost' || hostname.startsWith('127.0.0.1')) {
      // For local development, check if there's a subdomain pattern
      if (hostname.includes('app.')) detectedSubdomain = 'app';
      else if (hostname.includes('admin.')) detectedSubdomain = 'admin';
      else detectedSubdomain = 'localhost';
    }

    setSubdomain(detectedSubdomain); // Create middleware info
    const shouldHaveLocalePrefix = detectedSubdomain !== 'main';
    const hasLocaleInPath = pathname.match(/^\/[a-z]{2}(\/|$)/);
    const middlewareAnalysis = `${detectedSubdomain} subdomain | ${hasLocaleInPath ? 'Has' : 'Missing'} locale prefix | Should ${shouldHaveLocalePrefix ? 'have' : 'not have'} prefix`;
    setMiddlewareInfo(middlewareAnalysis);

    // Track locale changes
    setLocaleHistory(prev => [
      ...prev.slice(-10), // Keep last 10 entries
      {
        locale,
        pathname,
        subdomain: detectedSubdomain,
        timestamp: Date.now(),
      },
    ]);

    // Check cookies
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];
    setCookieLocale(cookie || 'not set');

    // Check localStorage
    try {
      const stored = localStorage.getItem('preferred-locale');
      setLocalStorageLocale(stored || 'not set');
    } catch {
      setLocalStorageLocale('not available');
    }

    // Track browser URL
    setBrowserUrl(window.location.href);
  }, [locale, pathname]);

  useEffect(() => {
    // Track navigation count
    setNavigationsCount(prev => prev + 1);
  }, [pathname]);
  const testTranslation = () => {
    try {
      const result = t('backToLanding');
      return `${result} (key: backToLanding)`;
    } catch (error) {
      return `Error: ${error}`;
    }
  };

  const diagnoseTranslations = () => {
    try {
      // Test if useTranslations is working at all
      const tFunction = useTranslations.toString();
      const navigationResult = t('backToLanding');
      const dashboardResult = t('dashboard');

      return `nav:${navigationResult} | dash:${dashboardResult} | func:${tFunction.length > 0 ? 'ok' : 'fail'}`;
    } catch (error) {
      return `Diagnosis failed: ${error}`;
    }
  };

  const testMultipleTranslations = () => {
    try {
      const tests = [
        { key: 'dashboard', expected: 'لوحة التحكم' },
        { key: 'home', expected: 'الرئيسية' },
        { key: 'backToLanding', expected: 'العودة للصفحة الرئيسية' },
      ];

      return tests
        .map(test => {
          const result = t(test.key);
          const isResolved = result !== test.key;
          return `${test.key}: ${isResolved ? '✅' : '❌'} ${result}`;
        })
        .join(' | ');
    } catch (error) {
      return `Error testing: ${error}`;
    }
  };

  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.NODE_ENV !== 'production'
  ) {
    return null;
  }

  return (
    <div className='fixed right-4 bottom-4 z-50 max-w-sm rounded-md bg-black p-3 text-xs text-white opacity-90 shadow-lg rtl:right-auto rtl:left-4'>
      <div className='mb-2 font-bold'>🌐 Locale Debug</div>
      <div className='space-y-1'>
        <div>
          Current Locale: <span className='text-green-400'>{locale}</span>
        </div>
        <div>
          Subdomain: <span className='text-cyan-400'>{subdomain}</span>
        </div>
        <div className='text-xs'>
          Middleware: <span className='text-gray-300'>{middlewareInfo}</span>
        </div>
        <div>
          Pathname: <span className='text-blue-400'>{pathname}</span>
        </div>
        <div>
          Cookie: <span className='text-yellow-400'>{cookieLocale}</span>
        </div>
        <div>
          LocalStorage:
          <span className='text-purple-400'>{localStorageLocale}</span>
        </div>
        <div>
          Browser URL: <span className='text-teal-400'>{browserUrl}</span>
        </div>
        <div>
          Navigations:
          <span className='text-orange-400'>{navigationsCount}</span>
        </div>
        <div>
          Translation:
          <span className='text-pink-400'>{testTranslation()}</span>
        </div>
        <div className='text-xs'>
          Diagnosis:
          <span className='text-gray-300'>{diagnoseTranslations()}</span>
        </div>
        <div>
          Multiple Translations Test:
          <span className='text-pink-400'>{testMultipleTranslations()}</span>
        </div>
      </div>
      <div className='mt-2 border-t border-gray-600 pt-2'>
        <div className='mb-1 font-semibold'>History (last 5):</div>
        <div className='max-h-20 space-y-1 overflow-y-auto'>
          {localeHistory.slice(-5).map((entry, index) => (
            <div key={index} className='text-xs'>
              <span className='text-gray-400'>
                {new Date(entry.timestamp).toLocaleTimeString()}
              </span>
              {entry.locale} @ {entry.subdomain}:{entry.pathname}
            </div>
          ))}
        </div>
      </div>
      <div className='mt-2 border-t border-gray-600 pt-2'>
        <div className='text-xs text-gray-400'>
          Params: {JSON.stringify(params)}
        </div>
      </div>
      <div className='mt-2 flex gap-1'>
        <button
          onClick={() => router.refresh()}
          className='rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700'
        >
          Refresh
        </button>
        <button
          onClick={() => {
            setLocaleHistory([]);
            setNavigationsCount(0);
          }}
          className='rounded bg-red-600 px-2 py-1 text-xs hover:bg-red-700'
        >
          Clear
        </button>
      </div>
    </div>
  );
}

