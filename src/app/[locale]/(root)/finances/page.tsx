import { Suspense } from 'react';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { FinancesView } from '@/modules/finances/ui/components/finances-view';
import { FinancesViewSkeleton } from '@/modules/finances/ui/components/finances-view-skeleton';
import { PageHeader } from '@/components/page-header';
import { useTranslations } from 'next-intl';

const FinancesPage = () => {
  const t = useTranslations('finance');

  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <PageHeader title={t('title')} description={t('description')} />

        <Suspense fallback={<FinancesViewSkeleton />}>
          <FinancesView />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
};
export default FinancesPage;
