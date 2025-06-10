import { Suspense } from 'react';
import { TRPCErrorBoundary } from '../../../components/trpc-error-boundary';
import { DashboardSkeleton } from '../../../modules/dashboard/ui/components/dashboard-skeleton';
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
