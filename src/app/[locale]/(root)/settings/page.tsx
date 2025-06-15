import { Suspense } from 'react';
import { SettingsContent } from './settings-content';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { DashboardSkeleton } from '@/modules/dashboard/ui/components/dashboard-skeleton';

// Force dynamic rendering to avoid prerendering issues with auth context
export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  return (
    <TRPCErrorBoundary>
      <Suspense fallback={<DashboardSkeleton />}>
        <SettingsContent />
      </Suspense>
    </TRPCErrorBoundary>
  );
}
