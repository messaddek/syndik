import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { getQueryClient, trpc } from '@/trpc/server';
import { BuildingView, BuildingViewSkeleton } from '@/modules/buildings';

type BuildingPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const BuildingPage = async ({ params, searchParams }: BuildingPageProps) => {
  const { id } = await params;
  const awaitedSearchParams = await searchParams;
  const queryClient = getQueryClient();

  // Validate the ID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
  }

  // Prefetch building data
  try {
    await queryClient.prefetchQuery(
      trpc.buildings.getById.queryOptions({ id })
    );
  } catch (_error) {
    // If the building doesn't exist, redirect to 404
    notFound();
  }

  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<BuildingViewSkeleton />}>
          <BuildingView id={id} _searchParams={awaitedSearchParams} />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
};

export default BuildingPage;
