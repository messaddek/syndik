'use client';

import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  progress?: number;
  className?: string;
}

export function LoadingScreen({
  message = 'Loading...',
  progress,
  className = '',
}: LoadingScreenProps) {
  return (
    <div
      className={`flex min-h-[200px] items-center justify-center ${className}`}
    >
      <div className='space-y-4 text-center'>
        <div className='flex justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
        </div>
        <p className='text-gray-600'>{message}</p>
        {progress !== undefined && (
          <div className='mx-auto w-48'>
            <div className='h-2 w-full rounded-full bg-gray-200'>
              <div
                className='h-2 rounded-full bg-blue-600 transition-all duration-300 ease-out'
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className='mt-2 text-sm text-gray-500'>{progress}% complete</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Full screen loading variant
export function FullScreenLoading({
  message = 'Loading...',
  progress,
}: LoadingScreenProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white'>
      <LoadingScreen message={message} progress={progress} />
    </div>
  );
}
