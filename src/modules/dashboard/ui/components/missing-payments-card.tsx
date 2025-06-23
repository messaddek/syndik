'use client';

import { useState } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Building2,
  User,
  DollarSign,
  Send,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/routing';

interface MissingPaymentUnit {
  unitId: string;
  unitNumber: string;
  buildingId: string;
  buildingName: string;
  monthlyFee: string;
  residentName: string;
  residentId: string;
}

interface MissingPaymentsData {
  missingPayments: MissingPaymentUnit[];
  totalMissing: number;
  totalExpectedAmount: number;
}

export const MissingPaymentsCard = () => {
  const trpc = useTRPC();
  const t = useTranslations('dashboard');
  const router = useRouter();
  const [isLoadingSendReminders, setIsLoadingSendReminders] = useState(false);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const { data: missingPaymentsData, isLoading } = useQuery(
    trpc.dashboard.getMissingPayments.queryOptions({
      month: currentMonth,
      year: currentYear,
    })
  );

  const typedData = missingPaymentsData as MissingPaymentsData | undefined;
  // Handler for sending payment reminders
  const sendRemindersMutation = useMutation(
    trpc.notifications.createPaymentReminder.mutationOptions({
      onSuccess: (_, variables) => {
        toast.success(
          t('missingPayments.reminderSent', {
            unitNumber: variables.unitNumber,
            buildingName: variables.buildingName,
          })
        );
      },
      onError: (error, variables) => {
        console.error(
          `Failed to send reminder for unit ${variables.unitNumber}:`,
          error
        );
        toast.error(
          t('missingPayments.reminderError', {
            unitNumber: variables.unitNumber,
          })
        );
      },
    })
  );

  const handleSendReminders = async () => {
    if (!typedData?.missingPayments?.length) return;

    setIsLoadingSendReminders(true);

    try {
      let successCount = 0;
      let failureCount = 0;

      // Send reminders sequentially to avoid overwhelming the system
      for (const unit of typedData.missingPayments) {
        try {
          await sendRemindersMutation.mutateAsync({
            residentId: unit.residentId,
            unitId: unit.unitId,
            amount: parseFloat(unit.monthlyFee),
            dueDate: new Date(currentYear, currentMonth - 1, 1), // First day of current month
            unitNumber: unit.unitNumber,
            buildingName: unit.buildingName,
          });
          successCount++;
        } catch (error) {
          console.error(
            `Failed to send reminder for unit ${unit.unitNumber}:`,
            error
          );
          failureCount++;
        }
      }

      // Show summary message
      if (successCount > 0 && failureCount === 0) {
        toast.success(
          t('missingPayments.allRemindersSent', { count: successCount })
        );
      } else if (successCount > 0 && failureCount > 0) {
        toast.warning(
          t('missingPayments.partialRemindersSent', {
            success: successCount,
            failed: failureCount,
          })
        );
      } else if (failureCount > 0) {
        toast.error(t('missingPayments.remindersError'));
      }
    } catch (error) {
      console.error('Failed to send reminders:', error);
      toast.error(t('missingPayments.remindersError'));
    } finally {
      setIsLoadingSendReminders(false);
    }
  };
  // Handler for viewing payment details
  const handleViewDetails = () => {
    // Navigate to dedicated missing payments page
    const searchParams = new URLSearchParams({
      month: currentMonth.toString(),
      year: currentYear.toString(),
    });

    router.push(`/finances/missing-payments?${searchParams.toString()}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <AlertTriangle className='h-5 w-5 text-amber-500' />
            {t('missingPayments.title')}
          </CardTitle>
          <CardDescription>{t('missingPayments.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='animate-pulse space-y-3'>
            <div className='h-4 w-3/4 rounded bg-gray-200'></div>
            <div className='h-4 w-1/2 rounded bg-gray-200'></div>
            <div className='h-4 w-2/3 rounded bg-gray-200'></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const missingPayments = typedData?.missingPayments || [];
  const totalMissing = typedData?.totalMissing || 0;
  const totalExpectedAmount = typedData?.totalExpectedAmount || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <AlertTriangle className='h-5 w-5 text-amber-500' />
          {t('missingPayments.title')}
          {totalMissing > 0 && (
            <Badge variant='destructive' className='ml-auto'>
              {totalMissing}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>{t('missingPayments.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {totalMissing === 0 ? (
          <div className='py-6 text-center'>
            <div className='mb-2 text-2xl text-green-600'>✓</div>
            <p className='text-sm text-gray-600'>
              {t('missingPayments.allPaid')}
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {/* Summary */}
            <div className='rounded-lg border border-amber-200 bg-amber-50 p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-amber-800'>
                    {totalMissing} {t('missingPayments.unitsOverdue')}
                  </p>
                  <p className='text-xs text-amber-600'>
                    {t('missingPayments.expectedAmount')}: $
                    {totalExpectedAmount.toFixed(2)}
                  </p>
                </div>
                <DollarSign className='h-8 w-8 text-amber-500' />
              </div>
            </div>
            {/* Missing Payments List */}
            <div className='max-h-64 space-y-3 overflow-y-auto'>
              {missingPayments.map(unit => (
                <div
                  key={unit.unitId}
                  className='flex items-center justify-between rounded-lg border bg-gray-50 p-3'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='flex-shrink-0'>
                      <Building2 className='h-4 w-4 text-gray-400' />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='text-sm font-medium text-gray-900'>
                        {unit.buildingName} - Unit {unit.unitNumber}
                      </p>
                      <div className='flex items-center gap-2 text-xs text-gray-500'>
                        <User className='h-3 w-3' />
                        <span>{unit.residentName}</span>
                      </div>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-bold text-red-600'>
                      ${parseFloat(unit.monthlyFee).toFixed(2)}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {t('missingPayments.overdue')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Actions */}
            <div className='flex gap-2 pt-2'>
              <Button
                variant='outline'
                size='sm'
                className='flex-1'
                onClick={handleSendReminders}
                disabled={
                  isLoadingSendReminders ||
                  sendRemindersMutation.isPending ||
                  totalMissing === 0
                }
              >
                {isLoadingSendReminders || sendRemindersMutation.isPending ? (
                  <div className='flex items-center gap-x-2'>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    {t('missingPayments.sendingReminders')}
                  </div>
                ) : (
                  <div className='flex items-center gap-x-2'>
                    <Send className='h-4 w-4 rtl:-rotate-90' />
                    {t('missingPayments.sendReminders')}
                  </div>
                )}
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='flex-1'
                onClick={handleViewDetails}
              >
                {t('missingPayments.viewDetails')}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
