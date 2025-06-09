import { Suspense } from 'react';
import { ResidentsDataTable } from '@/modules/residents/ui/components/residents-data-table';
import { TRPCErrorBoundary } from '../../../components/trpc-error-boundary';
import { DashboardSkeleton } from '../../../components/loading-skeletons';
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
          <ResidentsDataTable initialFilters={filters} />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
}
