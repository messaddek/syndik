'use client';

import { useEffect } from 'react';

/**
 * Simple test component to verify rendering and logging
 */
export const SimpleTest = () => {
  console.log('🎯 SimpleTest component rendered!');

  useEffect(() => {
    console.log('🎯 SimpleTest useEffect triggered!');
    console.log('🎯 Current hostname:', window.location.hostname);
    console.log('🎯 Current cookies:', document.cookie);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className='fixed top-4 left-4 z-50 rounded-md bg-green-900 p-2 text-xs text-green-100'>
      🎯 SimpleTest Rendered!
    </div>
  );
}
