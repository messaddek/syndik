import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Building2, Users, Home, TrendingUp } from 'lucide-react';

export function DashboardSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Overview Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-20' />
              {i === 0 && (
                <Building2 className='text-muted-foreground h-4 w-4' />
              )}
              {i === 1 && <Home className='text-muted-foreground h-4 w-4' />}
              {i === 2 && <Users className='text-muted-foreground h-4 w-4' />}
              {i === 3 && (
                <TrendingUp className='text-muted-foreground h-4 w-4' />
              )}
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-2 h-8 w-16' />
              <Skeleton className='h-3 w-24' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Financial Summary */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-20' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='flex items-center space-x-3'>
                  <Skeleton className='h-4 w-4 rounded-full' />
                  <div className='flex-1 space-y-1'>
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
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className='h-20 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div className='flex min-h-96 items-center justify-center'>
      <div className='text-lg'>Loading...</div>
    </div>
  );
}
