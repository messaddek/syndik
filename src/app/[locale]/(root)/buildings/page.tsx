import { Suspense } from 'react';

import { BuildingsView, loadBuildingsSearchParams } from '@/modules/buildings';
import { getQueryClient, trpc } from '@/trpc/server';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { DashboardSkeleton } from '@/components/loading-skeletons';

type BuildingsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BuildingsPage({
  searchParams,
}: BuildingsPageProps) {
  const filters = await loadBuildingsSearchParams(await searchParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.buildings.getAll.queryOptions({
      ...filters,
      sortBy:
        (filters.sortBy as 'name' | 'city' | 'totalUnits' | 'createdAt') ||
        'name',
      sortOrder: (filters.sortOrder as 'asc' | 'desc') || 'asc',
    })
  );

  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<DashboardSkeleton />}>
          <BuildingsView initialFilters={filters} />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
}
