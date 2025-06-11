import { TRPCErrorBoundary } from '../../../components/trpc-error-boundary';
import { DashboardView } from '../../../modules/dashboard/ui/views/dashboard-view';

export default function DashboardPage() {
  return (
    <TRPCErrorBoundary>
      <DashboardView />
    </TRPCErrorBoundary>
  );
}
