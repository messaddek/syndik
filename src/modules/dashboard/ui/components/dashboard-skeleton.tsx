'use client';

import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Building2,
  Users,
  Home,
  TrendingUp,
  Calendar,
  BarChart3,
  PieChart,
  AlertTriangle,
} from 'lucide-react';

export const DashboardSkeleton = () => {
  const t = useTranslations('dashboard');
  return (
    <div className='space-y-6'>
      {/* Overview Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {[
          { icon: Building2, label: t('buildings') },
          { icon: Home, label: t('units') },
          { icon: Users, label: t('residents') },
          { icon: TrendingUp, label: t('netIncome') },
        ].map((item, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-20' />
              <item.icon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-2 h-8 w-16' />
              <Skeleton className='h-3 w-32' />
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Chart Zones */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Financial Trend Chart */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-5 w-20' />
              </div>
              <div className='flex items-center space-x-2'>
                <TrendingUp className='h-4 w-4 text-gray-400' />
                <Skeleton className='h-4 w-24' />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {/* Chart skeleton */}
              <div className='flex h-[300px] w-full items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800'>
                <BarChart3 className='h-8 w-8 text-gray-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Trend Chart */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-5 w-20' />
              </div>
              <div className='flex items-center space-x-2'>
                <TrendingUp className='h-4 w-4 text-gray-400' />
                <Skeleton className='h-4 w-24' />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {/* Stats skeleton */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-center'>
                  <Skeleton className='mx-auto mb-1 h-8 w-16' />
                  <Skeleton className='mx-auto h-3 w-20' />
                </div>
                <div className='text-center'>
                  <Skeleton className='mx-auto mb-1 h-8 w-16' />
                  <Skeleton className='mx-auto h-3 w-20' />
                </div>
              </div>
              {/* Chart skeleton */}
              <div className='flex h-[300px] w-full items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800'>
                <PieChart className='h-8 w-8 text-gray-400' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Financial Summary */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Financial Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className='h-6 w-48' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {['Income', 'Expenses', 'Net Income'].map((_, i) => (
                <div key={i} className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-20' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Payments Card Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <AlertTriangle className='h-5 w-5 text-amber-500' />
              <Skeleton className='h-6 w-32' />
            </CardTitle>
            <CardDescription>
              <Skeleton className='h-4 w-48' />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {/* Summary skeleton */}
              <div className='rounded-lg border border-amber-200 bg-amber-50 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-3 w-32' />
                  </div>
                  <Skeleton className='h-8 w-8 rounded' />
                </div>
              </div>
              {/* Missing payments list skeleton */}
              <div className='space-y-3'>
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between rounded-lg border bg-gray-50 p-3'
                  >
                    <div className='flex items-center space-x-3'>
                      <Building2 className='h-4 w-4 text-gray-400' />
                      <div className='space-y-1'>
                        <Skeleton className='h-4 w-32' />
                        <Skeleton className='h-3 w-24' />
                      </div>
                    </div>
                    <div className='space-y-1 text-right'>
                      <Skeleton className='h-4 w-16' />
                      <Skeleton className='h-3 w-12' />
                    </div>
                  </div>
                ))}
              </div>
              {/* Action buttons skeleton */}
              <div className='flex gap-2 pt-2'>
                <Skeleton className='h-8 flex-1' />
                <Skeleton className='h-8 flex-1' />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portal Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className='h-6 w-32' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-12' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Recent Activity */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className='h-6 w-32' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='flex items-center space-x-3'>
                  <div className='flex-shrink-0'>
                    {i % 2 === 0 ? (
                      <Users className='text-primary h-4 w-4' />
                    ) : (
                      <Calendar className='h-4 w-4 text-purple-600' />
                    )}
                  </div>
                  <div className='min-w-0 flex-1 space-y-1'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-3 w-24' />
                  </div>
                  <Skeleton className='h-3 w-16' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className='h-6 w-32' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-16' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-6 w-32' />
          </CardTitle>
          <CardDescription>
            <Skeleton className='h-4 w-64' />
          </CardDescription>
        </CardHeader>
        <CardContent>
          
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {[
              { icon: Building2, label: t('addBuilding') },
              { icon: Users, label: t('addResident') },
              { icon: TrendingUp, label: t('quickActionsItems.recordIncome') },
              { icon: Calendar, label: t('scheduleMeeting') },
            ].map((action, i) => (
              <div
                key={i}
                className='flex h-20 w-full flex-col items-center justify-center rounded-md border border-dashed border-gray-300'
              >
                <action.icon className='mb-2 h-6 w-6 text-gray-400' />
                <Skeleton className='h-4 w-16' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

