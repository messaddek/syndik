import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { getQueryClient, trpc } from '@/trpc/server';
import { UnitView, UnitViewSkeleton } from '@/modules/units';

type UnitPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const UnitPage = async ({ params, searchParams }: UnitPageProps) => {
  const { id } = await params;
  const awaitedSearchParams = await searchParams;
  const queryClient = getQueryClient();

  // Validate the ID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
  }

  // Prefetch unit data
  try {
    await queryClient.prefetchQuery(trpc.units.getById.queryOptions({ id }));
  } catch (_error) {
    // If the unit doesn't exist, redirect to 404
    notFound();
  }

  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<UnitViewSkeleton />}>
          <UnitView id={id} _searchParams={awaitedSearchParams} />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
};

export default UnitPage;
