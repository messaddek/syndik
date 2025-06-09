'use client';

import { Suspense } from 'react';
import { TRPCErrorBoundary } from '../../../components/trpc-error-boundary';
import { DashboardSkeleton } from '../../../components/loading-skeletons';
import { DashboardView } from '../../../modules/dashboard/ui/views/dashboard-view';

export default function DashboardPage() {
  return (
    <TRPCErrorBoundary>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardView />
      </Suspense>
    </TRPCErrorBoundary>
  );
}
