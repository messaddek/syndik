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
} from 'lucide-react';

export function DashboardSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Overview Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {[
          { icon: Building2, label: 'Buildings' },
          { icon: Home, label: 'Units' },
          { icon: Users, label: 'Residents' },
          { icon: TrendingUp, label: 'Net Income' },
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
      {/* Financial Summary and Recent Activity */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {' '}
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
        {/* Recent Activity Card */}
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
                      <Users className='h-4 w-4 text-blue-600' />
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
      </div>{' '}
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
              { icon: Building2, label: 'Add Building' },
              { icon: Users, label: 'Add Resident' },
              { icon: TrendingUp, label: 'Record Income' },
              { icon: Calendar, label: 'Schedule Meeting' },
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
