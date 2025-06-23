import { Suspense } from 'react';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { UnitsView } from '@/modules/units/ui/views/units-view';
import { UnitsViewSkeleton } from '@/modules/units/ui/components/units-view-skeleton';

const UnitsPage = () => {
  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<UnitsViewSkeleton />}>
          <UnitsView />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
};
export default UnitsPage;
