import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { DashboardView } from '@/modules/dashboard/ui/views/dashboard-view';

const DashboardPage = () => {
  return (
    <TRPCErrorBoundary>
      <DashboardView />
    </TRPCErrorBoundary>
  );
};
export default DashboardPage;
