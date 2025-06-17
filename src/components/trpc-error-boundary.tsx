'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface TRPCErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
}

export const DefaultErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <Card className='mx-auto mt-8 max-w-md'>
      <CardHeader>
        <div className='flex items-center space-x-2'>
          <AlertTriangle className='text-destructive h-5 w-5' />
          <CardTitle className='text-destructive'>
            Something went wrong
          </CardTitle>
        </div>
        <CardDescription>
          An error occurred while loading data. Please try again.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <details className='text-muted-foreground text-sm'>
          <summary className='hover:text-foreground cursor-pointer'>
            Error details
          </summary>
          <pre className='bg-muted mt-2 overflow-auto rounded p-2 text-xs'>
            {error.message}
          </pre>
        </details>
        <Button
          onClick={resetErrorBoundary}
          className='w-full'
          variant='outline'
        >
          <RefreshCw className='mr-2 h-4 w-4' />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
};

export const TRPCErrorBoundary = ({
  children,
  fallback,
}: TRPCErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={fallback || DefaultErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to monitoring service

        console.error('tRPC Error Boundary caught an error:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
