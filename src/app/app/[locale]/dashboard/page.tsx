import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { DashboardView } from '@/modules/dashboard/ui/views/dashboard-view';

export default function AppDashboardPage() {
  return (
    <TRPCErrorBoundary>
      <DashboardView />
    </TRPCErrorBoundary>
  );
}
