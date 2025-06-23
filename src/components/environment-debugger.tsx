'use client';

import { debugEnvironment, getCurrentSubdomain } from '@/lib/subdomain-utils';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface EnvironmentInfo {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
  NEXT_PUBLIC_ENVIRONMENT?: string;
  NEXT_PUBLIC_MAIN_URL?: string;
  NEXT_PUBLIC_APP_URL?: string;
  NEXT_PUBLIC_ADMIN_URL?: string;
  hostname: string;
  detected: string;
  subdomain?: string | null;
}

export const EnvironmentDebugger = () => {
  const [envInfo, setEnvInfo] = useState<EnvironmentInfo | null>(null);
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const info = debugEnvironment();
      const currentSubdomain = getCurrentSubdomain(window.location.hostname);

      setEnvInfo(info);
      setSubdomain(currentSubdomain);
    }
  }, []);

  if (!envInfo) {
    return <div>Loading environment info...</div>;
  }

  return (
    <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
      <h2 className='mb-4 text-2xl font-bold'>🔍 Environment Debug Info</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='rounded bg-white p-4 dark:bg-gray-900'>
          <h3 className='mb-2 font-semibold'>Environment Detection</h3>
          <ul className='space-y-1 text-sm'>
            <li>
              <span className='font-medium'>Detected:</span> {envInfo.detected}
            </li>
            <li>
              <span className='font-medium'>NODE_ENV:</span>
              {envInfo.NODE_ENV || 'undefined'}
            </li>
            <li>
              <span className='font-medium'>VERCEL_ENV:</span>
              {envInfo.VERCEL_ENV || 'undefined'}
            </li>
            <li>
              <span className='font-medium'>NEXT_PUBLIC_ENVIRONMENT:</span>
              {envInfo.NEXT_PUBLIC_ENVIRONMENT || 'undefined'}
            </li>
          </ul>
        </div>

        <div className='rounded bg-white p-4 dark:bg-gray-900'>
          <h3 className='mb-2 font-semibold'>URL Configuration</h3>
          <ul className='space-y-1 text-sm'>
            <li>
              <span className='font-medium'>Hostname:</span> {envInfo.hostname}
            </li>
            <li>
              <span className='font-medium'>Subdomain:</span>
              {subdomain || 'none'}
            </li>
            <li>
              <span className='font-medium'>Main URL:</span>
              {envInfo.NEXT_PUBLIC_MAIN_URL || 'undefined'}
            </li>
            <li>
              <span className='font-medium'>App URL:</span>
              {envInfo.NEXT_PUBLIC_APP_URL || 'undefined'}
            </li>
            <li>
              <span className='font-medium'>Admin URL:</span>
              {envInfo.NEXT_PUBLIC_ADMIN_URL || 'undefined'}
            </li>
          </ul>
        </div>
      </div>
      <div className='mt-4 rounded bg-white p-4 dark:bg-gray-900'>
        <h3 className='mb-2 font-semibold'>Raw Environment Data</h3>
        <pre className='overflow-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-800'>
          {JSON.stringify(envInfo, null, 2)}
        </pre>
      </div>
      <div className='mt-4 rounded bg-white p-4 dark:bg-gray-900'>
        <h3 className='mb-2 font-semibold'>Route Testing</h3>
        <div className='grid grid-cols-1 gap-2 text-sm md:grid-cols-3'>
          <Link
            href='/admin-dev'
            className='block rounded bg-blue-100 p-2 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800'
          >
            Test Admin Route (/admin-dev)
          </Link>
          <Link
            href='/dashboard'
            className='block rounded bg-green-100 p-2 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800'
          >
            Test Dashboard Route
          </Link>
          <Link
            href='/portal'
            className='block rounded bg-purple-100 p-2 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800'
          >
            Test Portal Route
          </Link>
        </div>
      </div>
    </div>
  );
};
