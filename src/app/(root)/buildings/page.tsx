import { Suspense } from 'react';
import { BuildingsList } from '../../../modules/buildings/ui/components/buildings-list';
import { TRPCErrorBoundary } from '../../../components/trpc-error-boundary';
import { getQueryClient, trpc } from '@/trpc/server';
import { BuildingsListSkeleton } from '@/modules/buildings/ui/components/buildings-skeleton';

export default async function BuildingsPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.buildings.getAll.queryOptions({}));
  return (
    <TRPCErrorBoundary>
      <Suspense fallback={<BuildingsListSkeleton />}>
        <BuildingsList />
      </Suspense>
    </TRPCErrorBoundary>
  );
}
