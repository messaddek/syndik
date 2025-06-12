'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
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
  Home,
  CreditCard,
  Bell,
  Calendar,
  User,
  MapPin,
  Mail,
  Phone,
  Building,
} from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export function PortalDashboard() {
  const trpc = useTRPC();

  // Use the new resident profile procedure that works with user linking
  const { data: residentProfile, isLoading: residentLoading } = useQuery(
    trpc.portal.getResidentProfile.queryOptions()
  );

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery(
    trpc.portal.getDashboardData.queryOptions()
  );

  const isLoading = residentLoading || dashboardLoading;

  if (isLoading) {
    return <PortalDashboardSkeleton />;
  }

  if (!residentProfile) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-muted-foreground'>
          Unable to load resident information
        </p>
      </div>
    );
  }
  const { resident, unit, building } = residentProfile;

  return (
    <div className='space-y-6'>
      {/* Welcome Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>
            Welcome back, {resident.firstName}!
          </h1>
          <p className='text-muted-foreground'>
            Here&apos;s what&apos;s happening in your building today.
          </p>
        </div>
        <Badge variant='secondary' className='text-sm'>
          {resident?.isOwner ? 'Owner' : 'Tenant'}
        </Badge>
      </div>
      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Next Payment</CardTitle>
            <CreditCard className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${dashboardData?.nextPayment?.amount?.toFixed(2) || '0.00'}
            </div>
            <p className='text-muted-foreground text-xs'>
              Due{' '}
              {dashboardData?.nextPayment?.dueDate
                ? new Date(
                    dashboardData.nextPayment.dueDate
                  ).toLocaleDateString()
                : 'Not available'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Announcements</CardTitle>
            <Bell className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {dashboardData?.announcementsCount || 0}
            </div>
            <p className='text-muted-foreground text-xs'>New this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Next Meeting</CardTitle>
            <Calendar className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {dashboardData?.upcomingMeeting
                ? new Date(
                    dashboardData.upcomingMeeting.scheduledDate
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                : 'None'}
            </div>
            <p className='text-muted-foreground text-xs'>
              {dashboardData?.upcomingMeeting?.title || 'No meetings scheduled'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Unit Status</CardTitle>
            <Home className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>Active</div>
            <p className='text-muted-foreground text-xs'>
              {dashboardData?.residentStatus?.isActive
                ? 'Current resident'
                : 'Moved out'}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Unit Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Home className='h-5 w-5' />
              Unit Information
            </CardTitle>
            <CardDescription>Your current residence details</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {unit && (
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Unit Number
                  </p>
                  <p className='text-lg font-semibold'>{unit.unitNumber}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Floor
                  </p>
                  <p className='text-lg font-semibold'>{unit.floor}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Bedrooms
                  </p>
                  <p className='text-lg font-semibold'>{unit.bedrooms}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Bathrooms
                  </p>
                  <p className='text-lg font-semibold'>{unit.bathrooms}</p>
                </div>
              </div>
            )}

            {building && (
              <div className='border-t pt-4'>
                <div className='mb-2 flex items-center gap-2'>
                  <Building className='text-muted-foreground h-4 w-4' />
                  <p className='text-muted-foreground text-sm font-medium'>
                    Building
                  </p>
                </div>
                <p className='font-semibold'>{building.name}</p>
                <p className='text-muted-foreground text-sm'>
                  {building.address}
                </p>
              </div>
            )}

            <Button asChild className='w-full'>
              <Link href='/portal/unit'>View Full Details</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Profile Information
            </CardTitle>
            <CardDescription>
              Your contact details and account info
            </CardDescription>
          </CardHeader>{' '}
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <Mail className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>{resident.email}</p>
                  <p className='text-muted-foreground text-xs'>Email Address</p>
                </div>
              </div>

              {resident.phone && (
                <div className='flex items-center gap-3'>
                  <Phone className='text-muted-foreground h-4 w-4' />
                  <div>
                    <p className='text-sm font-medium'>{resident.phone}</p>
                    <p className='text-muted-foreground text-xs'>
                      Phone Number
                    </p>
                  </div>
                </div>
              )}

              <div className='flex items-center gap-3'>
                <MapPin className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>
                    Moved in{' '}
                    {new Date(resident?.moveInDate || '').toLocaleDateString()}
                  </p>
                  <p className='text-muted-foreground text-xs'>Move-in Date</p>
                </div>
              </div>
            </div>

            <Button asChild variant='outline' className='w-full'>
              <Link href='/portal/profile'>Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and important information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-4'>
            <Button asChild variant='outline' className='h-auto p-4'>
              <Link
                href='/portal/payments'
                className='flex flex-col items-center gap-2'
              >
                <CreditCard className='h-6 w-6' />
                <span>Make Payment</span>
              </Link>
            </Button>

            <Button asChild variant='outline' className='h-auto p-4'>
              <Link
                href='/portal/announcements'
                className='flex flex-col items-center gap-2'
              >
                <Bell className='h-6 w-6' />
                <span>View Announcements</span>
              </Link>
            </Button>

            <Button asChild variant='outline' className='h-auto p-4'>
              <Link
                href='/portal/meetings'
                className='flex flex-col items-center gap-2'
              >
                <Calendar className='h-6 w-6' />
                <span>Meeting Info</span>
              </Link>
            </Button>

            <Button asChild variant='outline' className='h-auto p-4'>
              <Link
                href='/portal/messages'
                className='flex flex-col items-center gap-2'
              >
                <Mail className='h-6 w-6' />
                <span>Contact Management</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PortalDashboardSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='mt-2 h-4 w-80' />
        </div>
        <Skeleton className='h-6 w-16' />
      </div>

      {/* Stats Cards Skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-16' />
              <Skeleton className='mt-1 h-3 w-20' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className='grid gap-6 md:grid-cols-2'>
        {[1, 2].map(i => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
              <Skeleton className='h-4 w-60' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[1, 2, 3].map(j => (
                  <Skeleton key={j} className='h-4 w-full' />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
