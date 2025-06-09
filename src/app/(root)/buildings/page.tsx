'use client';

import { Suspense } from 'react';
import { BuildingsList } from '../../../modules/buildings/ui/components/buildings-list';
import { TRPCErrorBoundary } from '../../../components/trpc-error-boundary';
import { DashboardSkeleton } from '../../../components/loading-skeletons';

export default function BuildingsPage() {
  return (
    <TRPCErrorBoundary>
      <Suspense fallback={<DashboardSkeleton />}>
        <BuildingsList />
      </Suspense>
    </TRPCErrorBoundary>
  );
}
