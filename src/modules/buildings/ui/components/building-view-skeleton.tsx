import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Building2, Home, Users, MapPin } from 'lucide-react';

export function BuildingViewSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2'>
            <ArrowLeft className='h-4 w-4' />
            <Skeleton className='h-4 w-24' />
          </div>
          <div>
            <div className='flex items-center space-x-2'>
              <Building2 className='h-6 w-6 text-blue-600' />
              <Skeleton className='h-8 w-48' />
            </div>
            <div className='mt-1 flex items-center space-x-1'>
              <MapPin className='h-4 w-4' />
              <Skeleton className='h-4 w-64' />
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-9 w-20' />
          <Skeleton className='h-9 w-20' />
        </div>
      </div>

      {/* Overview Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {[
          { icon: Home, label: 'Total Units' },
          { icon: Users, label: 'Occupied Units' },
          { icon: Users, label: 'Total Residents' },
          { icon: MapPin, label: 'Postal Code' },
        ].map((item, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-20' />
              <item.icon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-2 h-8 w-16' />
              <Skeleton className='h-3 w-24' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Building Details */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-4 w-64' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              {[1, 2, 3, 4].map(i => (
                <div key={i}>
                  <Skeleton className='mb-1 h-4 w-16' />
                  <Skeleton className='h-4 w-24' />
                </div>
              ))}
            </div>
            <div>
              <Skeleton className='mb-1 h-4 w-20' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
            <div>
              <Skeleton className='mb-1 h-4 w-16' />
              <Skeleton className='h-4 w-32' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-48' />
          </CardHeader>
          <CardContent className='space-y-3'>
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className='h-10 w-full' />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Units Overview */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-4 w-48' />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className='transition-shadow hover:shadow-md'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <Skeleton className='h-6 w-20' />
                    <Skeleton className='h-5 w-16 rounded-full' />
                  </div>
                  <Skeleton className='h-4 w-16' />
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <Skeleton className='h-4 w-16' />
                      <Skeleton className='h-4 w-8' />
                    </div>
                    <div className='flex justify-between'>
                      <Skeleton className='h-4 w-20' />
                      <Skeleton className='h-4 w-12' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className='mt-4 text-center'>
            <Skeleton className='mx-auto h-10 w-32' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
