import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, User, Calendar, Mail, MapPin } from 'lucide-react';

export const ResidentViewSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2'>
            <ArrowLeft className='h-4 w-4' />
            <Skeleton className='h-4 w-28' />
          </div>
          <div>
            <div className='flex items-center space-x-2'>
              <User className='h-6 w-6 text-purple-600' />
              <Skeleton className='h-8 w-48' />
              <Skeleton className='h-5 w-16 rounded-full' />
              <Skeleton className='h-5 w-16 rounded-full' />
            </div>
            <div className='mt-1 flex items-center space-x-1'>
              <MapPin className='h-4 w-4' />
              <Skeleton className='h-4 w-40' />
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-9 w-16' />
          <Skeleton className='h-9 w-20' />
          <Skeleton className='h-9 w-20' />
        </div>
      </div>

      {/* Overview Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {[
          { icon: Calendar, label: 'Move-in Date' },
          { icon: Mail, label: 'Contact' },
          { icon: User, label: 'Status' },
          { icon: MapPin, label: 'Unit' },
        ].map((item, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-20' />
              <item.icon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-2 h-8 w-24' />
              <Skeleton className='h-3 w-20' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resident Details */}
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
                  <Skeleton className='mb-1 h-4 w-20' />
                  <Skeleton className='h-4 w-24' />
                </div>
              ))}
            </div>
            <div>
              <Skeleton className='mb-1 h-4 w-32' />
              <Skeleton className='h-4 w-full' />
            </div>
            <div>
              <Skeleton className='mb-1 h-4 w-16' />
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
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-4 w-48' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              {[1, 2, 3, 4].map(i => (
                <div key={i}>
                  <Skeleton className='mb-1 h-4 w-20' />
                  <Skeleton className='h-4 w-24' />
                </div>
              ))}
            </div>
            <div>
              <Skeleton className='mb-1 h-4 w-24' />
              <div className='flex items-center space-x-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-8' />
                <Skeleton className='h-4 w-24' />
              </div>
              <Skeleton className='mt-1 h-3 w-48' />
            </div>
            <div className='flex space-x-2 pt-4'>
              <Skeleton className='h-8 w-28' />
              <Skeleton className='h-8 w-24' />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
