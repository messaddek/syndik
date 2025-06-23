'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  AlertTriangle,
  Building2,
  User,
  DollarSign,
  Send,
  Loader2,
  Calendar,
  CheckCircle,
  Plus,
  Filter,
} from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { toast } from 'sonner';

interface MissingPaymentUnit {
  unitId: string;
  unitNumber: string;
  buildingId: string;
  buildingName: string;
  monthlyFee: string;
  residentName: string;
  residentId: string;
  lastPaymentDate?: string;
  daysOverdue: number;
}

interface MissingPaymentsData {
  missingPayments: MissingPaymentUnit[];
  totalMissing: number;
  totalExpectedAmount: number;
}

const MissingPaymentsPage = () => {
  const trpc = useTRPC();
  const t = useTranslations('missingPayments');
  const searchParams = useSearchParams();

  // Get month/year from URL or default to current
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    parseInt(
      searchParams.get('month') || (currentDate.getMonth() + 1).toString()
    )
  );
  const [selectedYear, setSelectedYear] = useState(
    parseInt(searchParams.get('year') || currentDate.getFullYear().toString())
  );

  const [isLoadingSendReminders, setIsLoadingSendReminders] = useState(false);

  const { data: missingPaymentsData, isLoading } = useQuery(
    trpc.dashboard.getMissingPayments.queryOptions({
      month: selectedMonth,
      year: selectedYear,
    })
  );

  const typedData = missingPaymentsData as MissingPaymentsData | undefined;

  // Send reminder mutation
  const sendRemindersMutation = useMutation(
    trpc.notifications.createPaymentReminder.mutationOptions({
      onSuccess: (_, variables) => {
        toast.success(
          t('reminderSent', {
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
          t('reminderError', {
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

      for (const unit of typedData.missingPayments) {
        try {
          await sendRemindersMutation.mutateAsync({
            residentId: unit.residentId,
            unitId: unit.unitId,
            amount: parseFloat(unit.monthlyFee),
            dueDate: new Date(selectedYear, selectedMonth - 1, 1),
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

      if (successCount > 0 && failureCount === 0) {
        toast.success(t('allRemindersSent', { count: successCount }));
      } else if (successCount > 0 && failureCount > 0) {
        toast.warning(
          t('partialRemindersSent', {
            success: successCount,
            failed: failureCount,
          })
        );
      } else if (failureCount > 0) {
        toast.error(t('remindersError'));
      }
    } catch (error) {
      console.error('Failed to send reminders:', error);
      toast.error(t('remindersError'));
    } finally {
      setIsLoadingSendReminders(false);
    }
  };

  const handleSendIndividualReminder = async (unit: MissingPaymentUnit) => {
    try {
      await sendRemindersMutation.mutateAsync({
        residentId: unit.residentId,
        unitId: unit.unitId,
        amount: parseFloat(unit.monthlyFee),
        dueDate: new Date(selectedYear, selectedMonth - 1, 1),
        unitNumber: unit.unitNumber,
        buildingName: unit.buildingName,
      });
    } catch (error) {
      console.error(
        `Failed to send reminder for unit ${unit.unitNumber}:`,
        error
      );
    }
  };

  const missingPayments = typedData?.missingPayments || [];
  const totalMissing = typedData?.totalMissing || 0;
  const totalExpectedAmount = typedData?.totalExpectedAmount || 0;

  // Generate month/year options
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(2024, i).toLocaleString('default', { month: 'long' }),
  }));

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: currentYear - 2 + i,
    label: (currentYear - 2 + i).toString(),
  }));

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <PageHeader title={t('title')} description={t('description')} />
        <Card>
          <CardContent className='p-6'>
            <div className='animate-pulse space-y-4'>
              <div className='h-4 w-3/4 rounded bg-gray-200'></div>
              <div className='h-4 w-1/2 rounded bg-gray-200'></div>
              <div className='h-4 w-2/3 rounded bg-gray-200'></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <PageHeader
        title={t('title')}
        description={t('description')}
        ctaButtonContent={
          <div className='flex items-center gap-x-2'>
            <Plus className='h-4 w-4' />
            {t('addProjectContribution')}
          </div>
        }
        ctaButtonCallback={() => {
          // TODO: Open project contribution dialog
          console.log('Add project contribution');
        }}
      />
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Filter className='h-5 w-5' />
            {t('filters')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='space-y-2'>
              <Label htmlFor='month'>{t('month')}</Label>
              <Select
                value={selectedMonth.toString()}
                onValueChange={value => setSelectedMonth(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map(month => (
                    <SelectItem
                      key={month.value}
                      value={month.value.toString()}
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='year'>{t('year')}</Label>
              <Select
                value={selectedYear.toString()}
                onValueChange={value => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map(year => (
                    <SelectItem key={year.value} value={year.value.toString()}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Summary Stats */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  {t('totalOverdue')}
                </p>
                <p className='text-2xl font-bold text-red-600'>
                  {totalMissing}
                </p>
              </div>
              <AlertTriangle className='h-8 w-8 text-red-500' />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  {t('expectedAmount')}
                </p>
                <p className='text-2xl font-bold text-amber-600'>
                  ${totalExpectedAmount.toFixed(2)}
                </p>
              </div>
              <DollarSign className='h-8 w-8 text-amber-500' />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  {t('period')}
                </p>
                <p className='text-2xl font-bold text-blue-600'>
                  {monthOptions.find(m => m.value === selectedMonth)?.label}
                  {selectedYear}
                </p>
              </div>
              <Calendar className='h-8 w-8 text-blue-500' />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Missing Payments */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='flex items-center gap-2'>
                {totalMissing === 0 ? (
                  <CheckCircle className='h-5 w-5 text-green-500' />
                ) : (
                  <AlertTriangle className='h-5 w-5 text-amber-500' />
                )}
                {t('missingPaymentsList')}
                {totalMissing > 0 && (
                  <Badge variant='destructive'>{totalMissing}</Badge>
                )}
              </CardTitle>
              <CardDescription>
                {totalMissing === 0
                  ? t('allPaymentsReceived')
                  : t('unitsWithMissingPayments', { count: totalMissing })}
              </CardDescription>
            </div>
            {totalMissing > 0 && (
              <Button
                onClick={handleSendReminders}
                disabled={
                  isLoadingSendReminders || sendRemindersMutation.isPending
                }
                className='flex items-center gap-x-2'
              >
                {isLoadingSendReminders || sendRemindersMutation.isPending ? (
                  <>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    {t('sendingReminders')}
                  </>
                ) : (
                  <>
                    <Send className='h-4 w-4' />
                    {t('sendAllReminders')}
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {totalMissing === 0 ? (
            <div className='py-12 text-center'>
              <CheckCircle className='mx-auto mb-4 h-12 w-12 text-green-500' />
              <h3 className='mb-2 text-lg font-medium text-gray-900'>
                {t('allPaymentsReceived')}
              </h3>
              <p className='text-gray-600'>
                {t('allPaymentsReceivedDescription', {
                  month:
                    monthOptions.find(m => m.value === selectedMonth)?.label ||
                    '',
                  year: selectedYear,
                })}
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {missingPayments.map(unit => (
                <div
                  key={unit.unitId}
                  className='flex items-center justify-between rounded-lg border bg-gray-50 p-4'
                >
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <Building2 className='h-5 w-5 text-gray-400' />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='text-sm font-medium text-gray-900'>
                        {unit.buildingName} - Unit {unit.unitNumber}
                      </p>
                      <div className='flex items-center gap-4 text-xs text-gray-500'>
                        <div className='flex items-center gap-1'>
                          <User className='h-3 w-3' />
                          <span>{unit.residentName}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-3 w-3' />
                          <span>
                            {unit.daysOverdue} {t('daysOverdue')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='text-right'>
                      <p className='text-sm font-bold text-red-600'>
                        ${parseFloat(unit.monthlyFee).toFixed(2)}
                      </p>
                      <p className='text-xs text-gray-500'>{t('overdue')}</p>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleSendIndividualReminder(unit)}
                      disabled={sendRemindersMutation.isPending}
                      className='flex items-center gap-x-2'
                    >
                      <Send className='h-3 w-3' />
                      {t('sendReminder')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MissingPaymentsPage;
