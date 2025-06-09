'use client';

import { Suspense, ReactNode } from 'react';
import { TRPCErrorBoundary } from './trpc-error-boundary';
import { LoadingFallback } from './loading-skeletons';

interface TRPCWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
}

/**
 * Universal wrapper component for tRPC queries with error boundaries and suspense
 * Provides consistent error handling and loading states across the app
 */
export function TRPCWrapper({
  children,
  fallback = <LoadingFallback />,
  errorFallback,
}: TRPCWrapperProps) {
  return (
    <TRPCErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </TRPCErrorBoundary>
  );
}
