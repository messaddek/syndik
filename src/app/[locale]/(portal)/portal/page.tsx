import { Suspense } from 'react';
import { PortalDashboard } from '@/modules/portal/ui/views/portal-dashboard';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

const PortalPage = () => {
  console.log('🏠 Portal Page - Rendering portal page');

  return (
    <TRPCErrorBoundary>
      <Suspense fallback={<PortalDashboardSkeleton />}>
        <PortalDashboard />
      </Suspense>
    </TRPCErrorBoundary>
  );
};

const PortalDashboardSkeleton = () => {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='mt-2 h-4 w-80' />
        </div>
        <Skeleton className='h-6 w-16' />
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className='rounded-lg border p-6'>
            <Skeleton className='mb-2 h-4 w-24' />
            <Skeleton className='mb-1 h-8 w-16' />
            <Skeleton className='h-3 w-20' />
          </div>
        ))}
      </div>
    </div>
  );
};
export default PortalPage;
