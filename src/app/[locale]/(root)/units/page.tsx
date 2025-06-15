'use client';

import { Suspense } from 'react';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { DashboardSkeleton } from '@/modules/dashboard/ui/components/dashboard-skeleton';
import { UnitsContent } from '@/modules/units/ui/components/units-content';

export default function UnitsPage() {
  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<DashboardSkeleton />}>
          <UnitsContent />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
}
