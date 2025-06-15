'use client';

import { useDirection } from '@/hooks/use-direction';
import { useEffect, useState } from 'react';

export function RTLDebug() {
  const { direction, isRtl, locale } = useDirection();
  const [htmlDir, setHtmlDir] = useState('');
  const [bodyClasses, setBodyClasses] = useState('');

  useEffect(() => {
    const updateDebugInfo = () => {
      setHtmlDir(document.documentElement.dir);
      setBodyClasses(document.body.className);
    };

    updateDebugInfo();

    // Listen for direction changes
    window.addEventListener('direction-change', updateDebugInfo);

    return () => {
      window.removeEventListener('direction-change', updateDebugInfo);
    };
  }, [direction]);

  return (
    <div className='fixed top-4 right-4 z-50 rounded border bg-white p-4 text-sm shadow-lg dark:bg-gray-800 dark:text-white'>
      <h3 className='mb-2 font-bold'>RTL Debug Info:</h3>
      <div>Locale: {locale}</div>
      <div>Direction: {direction}</div>
      <div>Is RTL: {isRtl ? 'Yes' : 'No'}</div>
      <div>HTML dir: {htmlDir}</div>
      <div>Body classes: {bodyClasses}</div>
      <div>Expected: {isRtl ? 'Sidebar on right' : 'Sidebar on left'}</div>
      <div className='mt-2 text-xs text-gray-500'>
        Updates dynamically without page refresh
      </div>
    </div>
  );
}
