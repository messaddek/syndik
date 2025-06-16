'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OrgSwitcherRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the default locale org-switcher
    // You can modify this to use browser locale detection if needed
    router.replace('/en/org-switcher');
  }, [router]);

  // Show a minimal loading state during redirect
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
        <p className='mt-2 text-sm text-gray-600'>Redirecting...</p>
      </div>
    </div>
  );
}
