'use client';

import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/page-header';
import {
  ReportsView,
  ReportFiltersAndGeneration,
} from '@/modules/reports/ui/components';
import { Skeleton } from '@/components/ui/skeleton';

const FiltersLoadingSkeleton = () => (
  <div className='space-y-6'>
    <div className='rounded-lg border p-6'>
      <Skeleton className='mb-4 h-6 w-32' />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>
    </div>
    <div className='rounded-lg border p-6'>
      <Skeleton className='mb-2 h-6 w-40' />
      <Skeleton className='mb-6 h-4 w-64' />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='rounded-lg border p-4'>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Skeleton className='h-5 w-5' />
                <Skeleton className='h-4 w-32' />
              </div>
              <Skeleton className='h-5 w-16' />
            </div>
            <Skeleton className='mb-4 h-3 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FinanceReportsPage = () => {
  const t = useTranslations('financeReports');

  return (
    <div className='space-y-6'>
      <PageHeader title={t('title')} description={t('description')} />

      {/* Report Filters and Generation */}
      <Suspense fallback={<FiltersLoadingSkeleton />}>
        <ReportFiltersAndGeneration />
      </Suspense>

      {/* Reports Overview with Stats and Recent Reports */}
      <ReportsView />
    </div>
  );
};

export default FinanceReportsPage;
