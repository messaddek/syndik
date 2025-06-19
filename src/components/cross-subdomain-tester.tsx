'use client';

import { useLocale } from 'next-intl';
import { useState } from 'react';

/**
 * Cross-subdomain locale testing tool
 * Specifically designed to test locale persistence between app.domain.com and domain.com
 */
export function CrossSubdomainTester() {
  const locale = useLocale();
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [
      ...prev.slice(-10),
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const testCrossSubdomainCookies = () => {
    addResult('🧪 Starting cross-subdomain cookie test...');
    const hostname = window.location.hostname;
    const isStaging = hostname.includes('staging.syndik.ma');
    const isProduction = hostname.includes('syndik.ma') && !isStaging;
    const isDevelopment =
      hostname.includes('localhost') || hostname.includes('127.0.0.1');

    addResult(`Current hostname: ${hostname}`);
    addResult(
      `Environment: ${isDevelopment ? 'Development' : isStaging ? 'Staging' : isProduction ? 'Production' : 'Unknown'}`
    );
    addResult(`Current locale: ${locale}`);

    // Test different cookie configurations
    const cookieTests = [
      {
        name: 'Current domain only',
        cookie: `NEXT_LOCALE_TEST=${locale}; path=/; max-age=3600; SameSite=Lax`,
      },
      {
        name: 'Cross-subdomain (staging)',
        cookie: `NEXT_LOCALE_TEST_STAGING=${locale}; path=/; max-age=3600; SameSite=Lax; domain=.staging.syndik.ma`,
      },
      {
        name: 'Cross-subdomain (production)',
        cookie: `NEXT_LOCALE_TEST_PROD=${locale}; path=/; max-age=3600; SameSite=Lax; domain=.syndik.ma`,
      },
    ];

    cookieTests.forEach(test => {
      try {
        document.cookie = test.cookie;
        addResult(`✅ Set ${test.name}: ${test.cookie.substring(0, 50)}...`);
      } catch (error) {
        addResult(`❌ Failed ${test.name}: ${error}`);
      }
    });

    // Read back all cookies
    addResult('📖 Current cookies:');
    const allCookies = document.cookie.split(';');
    allCookies.forEach(cookie => {
      if (cookie.includes('NEXT_LOCALE')) {
        addResult(`  ${cookie.trim()}`);
      }
    });
  };

  const testLocalStorage = () => {
    addResult('💾 Testing localStorage...');
    try {
      localStorage.setItem(
        'cross-subdomain-test',
        JSON.stringify({
          locale,
          timestamp: Date.now(),
          hostname: window.location.hostname,
        })
      );

      const stored = localStorage.getItem('cross-subdomain-test');
      addResult(`✅ localStorage test: ${stored}`);
    } catch (error) {
      addResult(`❌ localStorage failed: ${error}`);
    }
  };

  const simulateSubdomainNavigation = () => {
    addResult('🔄 Simulating subdomain navigation...');
    const hostname = window.location.hostname;

    if (hostname.includes('app.')) {
      addResult('Currently on app subdomain');
      addResult(
        '💡 To test: Navigate to main domain and check if locale persists'
      );
      addResult('💡 Expected: Cookie should be shared via domain=.syndik.ma');
    } else {
      addResult('Currently on main domain');
      addResult(
        '💡 To test: Navigate to app subdomain and check if locale persists'
      );
      addResult(
        '💡 Expected: Cookie should be available from domain=.syndik.ma'
      );
    }

    // Check if cross-subdomain cookies exist
    const hasMainCookie = document.cookie.includes('NEXT_LOCALE=');
    const hasTestCookie = document.cookie.includes('NEXT_LOCALE_TEST');

    addResult(`Main cookie present: ${hasMainCookie ? '✅' : '❌'}`);
    addResult(`Test cookies present: ${hasTestCookie ? '✅' : '❌'}`);
  };

  const clearTestCookies = () => {
    addResult('🧹 Clearing test cookies...');

    // Clear test cookies
    document.cookie = 'NEXT_LOCALE_TEST=; path=/; max-age=0';
    document.cookie =
      'NEXT_LOCALE_TEST_STAGING=; path=/; max-age=0; domain=.staging.syndik.ma';
    document.cookie =
      'NEXT_LOCALE_TEST_PROD=; path=/; max-age=0; domain=.syndik.ma';

    try {
      localStorage.removeItem('cross-subdomain-test');
      addResult('✅ Test data cleared');
    } catch (error) {
      addResult(`⚠️ Clear failed: ${error}`);
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className='fixed bottom-4 left-4 z-50 max-w-md rounded-md bg-indigo-900 p-3 text-xs text-indigo-100 shadow-lg'>
      <div className='mb-2 font-bold text-indigo-200'>
        🌐 Cross-Subdomain Tester
      </div>

      <div className='mb-3 space-y-2'>
        <button
          onClick={testCrossSubdomainCookies}
          className='mr-1 rounded bg-indigo-600 px-2 py-1 text-xs hover:bg-indigo-700'
        >
          Test Cookies
        </button>
        <button
          onClick={testLocalStorage}
          className='mr-1 rounded bg-purple-600 px-2 py-1 text-xs hover:bg-purple-700'
        >
          Test Storage
        </button>
        <button
          onClick={simulateSubdomainNavigation}
          className='mr-1 rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700'
        >
          Check Nav
        </button>
        <button
          onClick={clearTestCookies}
          className='mr-1 rounded bg-red-600 px-2 py-1 text-xs hover:bg-red-700'
        >
          Clear
        </button>
        <button
          onClick={() => setTestResults([])}
          className='rounded bg-gray-600 px-2 py-1 text-xs hover:bg-gray-700'
        >
          Clear Log
        </button>
      </div>

      <div className='max-h-64 space-y-1 overflow-y-auto'>
        {testResults.length === 0 ? (
          <div className='text-indigo-300 italic'>
            Click a test button to start...
          </div>
        ) : (
          testResults.map((result, index) => (
            <div key={index} className='text-xs leading-tight'>
              {result}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
