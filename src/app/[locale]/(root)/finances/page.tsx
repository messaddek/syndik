'use client';

import { Suspense } from 'react';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { DashboardSkeleton } from '@/modules/dashboard/ui/components/dashboard-skeleton';
import { FinancesContent } from '@/modules/finances/ui/components/finances-content';

export default function FinancesPage() {
  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Finances</h1>
          <p className='text-muted-foreground'>
            Manage income and expenses for your properties
          </p>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <FinancesContent />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
}
