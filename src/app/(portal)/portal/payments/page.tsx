'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, DollarSign, History } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Skeleton } from '@/components/ui/skeleton';

export default function PaymentsPage() {
  const trpc = useTRPC();

  const { data: dashboardData, isLoading } = useQuery(
    trpc.portal.getDashboardData.queryOptions()
  );

  const { data: residentInfo } = useQuery(
    trpc.portal.getCurrentResident.queryOptions()
  );

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Payments & Billing</h1>
        <p className='text-muted-foreground mt-2'>
          View your payment history and manage upcoming charges.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Next Payment */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CreditCard className='h-5 w-5' />
              Next Payment Due
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
                  <div className='text-3xl font-bold'>
                    ${dashboardData?.nextPayment?.amount?.toFixed(2) || '0.00'}
                  </div>
                  <p className='text-muted-foreground text-sm'>
                    Monthly syndicate fee
                  </p>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    Due:{' '}
                    {dashboardData?.nextPayment?.dueDate
                      ? new Date(
                          dashboardData.nextPayment.dueDate
                        ).toLocaleDateString()
                      : 'Not available'}
                  </span>
                </div>
                <Button className='w-full' disabled>
                  Pay Now (Coming Soon)
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Unit Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <DollarSign className='h-5 w-5' />
              Unit Details
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {residentInfo?.unit ? (
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Unit Number
                  </p>
                  <p className='text-lg font-semibold'>
                    {residentInfo.unit.unitNumber}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Monthly Fee
                  </p>
                  <p className='text-lg font-semibold'>
                    ${residentInfo.unit.monthlyFee?.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Area
                  </p>
                  <p className='text-lg font-semibold'>
                    {residentInfo.unit.area || 'N/A'} m²
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Status
                  </p>
                  <Badge
                    variant={
                      residentInfo.unit.isOccupied ? 'default' : 'secondary'
                    }
                  >
                    {residentInfo.unit.isOccupied ? 'Occupied' : 'Vacant'}
                  </Badge>
                </div>
              </div>
            ) : (
              <p className='text-muted-foreground'>
                Unit information not available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <History className='h-5 w-5' />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='py-8 text-center'>
            <History className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
            <h3 className='mb-2 text-lg font-semibold'>
              Payment History Coming Soon
            </h3>
            <p className='text-muted-foreground'>
              You&apos;ll be able to view your payment history, download
              receipts, and track your billing status here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
