import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, Users, Home, TrendingUp, Calendar } from 'lucide-react';

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

      {/* Financial Summary and Recent Activity */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Financial Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Summary</CardTitle>
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
            <CardTitle>Recent Activity</CardTitle>
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
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your residential syndicates
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
