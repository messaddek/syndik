import { Suspense } from 'react';
import { ResidentsView } from '@/modules/residents';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { DashboardSkeleton } from '@/modules/dashboard/ui/components/dashboard-skeleton';
import { transformResidentsParams } from '@/modules/residents';

type ResidentsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResidentsPage({
  searchParams,
}: ResidentsPageProps) {
  const filters = await transformResidentsParams(await searchParams);

  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<DashboardSkeleton />}>
          <ResidentsView initialFilters={filters} />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
}
