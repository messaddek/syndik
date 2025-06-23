import { Suspense } from 'react';
import { loadResidentsSearchParams, ResidentsView } from '@/modules/residents';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { getQueryClient, trpc } from '@/trpc/server';
import { SearchParams } from 'nuqs';
import { ResidentsViewSkeleton } from '@/modules/residents/ui/components/residents-view-skeleton';

type ResidentsPageProps = {
  searchParams: Promise<SearchParams>;
};

const ResidentsPage = async ({ searchParams }: ResidentsPageProps) => {
  const queryClient = getQueryClient();
  const filters = await loadResidentsSearchParams(searchParams);

  // Convert string 'isActive' to boolean for API
  const apiFilters = {
    ...filters,
    isOwner: filters.isOwner ?? undefined,
    isActive:
      filters.isActive === 'all' ? undefined : filters.isActive === 'true',
  };

  void queryClient.prefetchQuery(
    trpc.residents.getAll.queryOptions(apiFilters)
  );

  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<ResidentsViewSkeleton />}>
          <ResidentsView />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
};

export default ResidentsPage;
