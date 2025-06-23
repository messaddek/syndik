'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, DollarSign, History } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';

const PaymentsPage = () => {
  const trpc = useTRPC();
  const t = useTranslations('payments');

  const { data: dashboardData, isLoading } = useQuery(
    trpc.portal.getDashboardData.queryOptions()
  );

  const { data: residentInfo } = useQuery(
    trpc.portal.getCurrentResident.queryOptions()
  );

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold dark:text-white'>{t('title')}</h1>
        <p className='text-muted-foreground mt-2 dark:text-gray-400'>
          {t('description')}
        </p>
      </div>
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Next Payment */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 dark:text-white'>
              <CreditCard className='h-5 w-5' />
              {t('nextPayment.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {isLoading ? (
              <div className='space-y-2'>
                <Skeleton className='h-8 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
            ) : (
              <>
                <div>
                  <div className='text-3xl font-bold dark:text-white'>
                    ${dashboardData?.nextPayment?.amount?.toFixed(2) || '0.00'}
                  </div>
                  <p className='text-muted-foreground text-sm dark:text-gray-400'>
                    {t('nextPayment.monthlyFee')}
                  </p>
                </div>
                <div className='flex items-center gap-2 text-sm dark:text-gray-300'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    {t('nextPayment.dueDate')}:
                    {dashboardData?.nextPayment?.dueDate
                      ? new Date(
                          dashboardData.nextPayment.dueDate
                        ).toLocaleDateString()
                      : t('nextPayment.notAvailable')}
                  </span>
                </div>
                <Button className='w-full' disabled>
                  {t('nextPayment.payNow')}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Unit Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 dark:text-white'>
              <DollarSign className='h-5 w-5' />
              {t('unitDetails.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {residentInfo?.unit ? (
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-muted-foreground text-sm font-medium dark:text-gray-400'>
                    {t('unitDetails.unitNumber')}
                  </p>
                  <p className='text-lg font-semibold dark:text-white'>
                    {residentInfo.unit.unitNumber}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium dark:text-gray-400'>
                    {t('unitDetails.monthlyFee')}
                  </p>
                  <p className='text-lg font-semibold dark:text-white'>
                    ${residentInfo.unit.monthlyFee?.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium dark:text-gray-400'>
                    {t('unitDetails.area')}
                  </p>
                  <p className='text-lg font-semibold dark:text-white'>
                    {residentInfo.unit.area || 'N/A'} m²
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium dark:text-gray-400'>
                    {t('unitDetails.status')}
                  </p>
                  <Badge
                    variant={
                      residentInfo.unit.isOccupied ? 'default' : 'secondary'
                    }
                  >
                    {residentInfo.unit.isOccupied
                      ? t('unitDetails.occupied')
                      : t('unitDetails.vacant')}
                  </Badge>
                </div>
              </div>
            ) : (
              <p className='text-muted-foreground dark:text-gray-400'>
                {t('unitDetails.notAvailable')}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 dark:text-white'>
            <History className='h-5 w-5' />
            {t('paymentHistory.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='py-8 text-center'>
            <History className='text-muted-foreground mx-auto mb-4 h-12 w-12 dark:text-gray-400' />
            <h3 className='mb-2 text-lg font-semibold dark:text-white'>
              {t('paymentHistory.comingSoon')}
            </h3>
            <p className='text-muted-foreground dark:text-gray-400'>
              {t('paymentHistory.description')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default PaymentsPage;
