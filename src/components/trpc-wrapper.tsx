'use client';

import { Suspense, ReactNode } from 'react';
import { TRPCErrorBoundary } from './trpc-error-boundary';

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
export const TRPCWrapper = ({
  children,
  fallback,
  errorFallback,
}: TRPCWrapperProps) => {
  return (
    <TRPCErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </TRPCErrorBoundary>
  );
}
