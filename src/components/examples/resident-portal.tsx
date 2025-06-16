'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Home,
  Bell,
  Wrench,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

// Form schema for maintenance requests
const maintenanceRequestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Please provide more details'),
  priority: z.enum(['low', 'normal', 'high', 'urgent']),
  category: z.string().min(1, 'Category is required'),
  location: z.string().optional(),
});

type MaintenanceRequestForm = z.infer<typeof maintenanceRequestSchema>;

/**
 * Resident Portal Component
 *
 * This component demonstrates:
 * - Resident-specific data fetching
 * - Form handling with validation
 * - Notification management
 * - Real-time updates
 */
export function ResidentPortal() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);

  // Get resident dashboard data
  const {
    data: dashboard,
    isLoading: dashboardLoading,
    error: dashboardError,
  } = useQuery(trpc.portal.getResidentDashboard.queryOptions());

  // Get resident notifications
  const { data: notifications, isLoading: notificationsLoading } = useQuery(
    trpc.portal.getResidentNotifications.queryOptions({
      page: 1,
      pageSize: 10,
      isRead: false,
    })
  );
  // Maintenance request form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<MaintenanceRequestForm>({
    resolver: zodResolver(maintenanceRequestSchema),
    defaultValues: {
      priority: 'normal',
    },
  });
  // Submit maintenance request mutation
  const submitMaintenanceRequest = useMutation(
    trpc.portal.submitMaintenanceRequest.mutationOptions({
      onSuccess: () => {
        console.log('Success: Your maintenance request has been submitted');
        reset();
        setShowMaintenanceForm(false);
        // Refresh notifications to show the new request
        queryClient.invalidateQueries(
          trpc.portal.getResidentNotifications.queryOptions({
            page: 1,
            pageSize: 10,
            isRead: false,
          })
        );
      },
      onError: error => {
        console.error('Error:', error.message);
      },
    })
  );

  // Mark notification as read
  const markNotificationRead = useMutation(
    trpc.notifications.markAsRead.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.portal.getResidentNotifications.queryOptions({
            page: 1,
            pageSize: 10,
            isRead: false,
          })
        );
      },
    })
  );
  const onSubmitMaintenanceRequest = (data: MaintenanceRequestForm) => {
    submitMaintenanceRequest.mutate(data);
  };

  // Loading state
  if (dashboardLoading) {
    return (
      <div className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className='p-6'>
                <div className='animate-pulse'>
                  <div className='mb-2 h-4 w-3/4 rounded bg-gray-200'></div>
                  <div className='h-8 w-1/2 rounded bg-gray-200'></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (dashboardError) {
    return (
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center space-x-2 text-red-600'>
            <AlertCircle className='h-5 w-5' />
            <span>Error loading your portal: {dashboardError.message}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Welcome, {dashboard?.resident?.firstName}
          </h1>
          <p className='text-gray-600'>
            {dashboard?.unit &&
              dashboard?.building &&
              `Unit ${dashboard.unit.unitNumber}, ${dashboard.building.name}`}
          </p>
        </div>
        <Button
          onClick={() => setShowMaintenanceForm(true)}
          className='flex items-center space-x-2'
        >
          <Wrench className='h-4 w-4' />
          <span>Request Maintenance</span>
        </Button>
      </div>
      {/* Quick Info Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {/* Unit Info */}
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center space-x-4'>
              <Home className='text-primary h-8 w-8' />
              <div>
                <p className='text-sm font-medium text-gray-600'>Your Unit</p>
                <p className='text-xl font-bold'>
                  Unit {dashboard?.unit?.unitNumber}
                </p>
                <p className='text-sm text-gray-500'>
                  {dashboard?.unit?.bedrooms} bed, {dashboard?.unit?.bathrooms}{' '}
                  bath
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Fee */}
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center space-x-4'>
              <User className='h-8 w-8 text-green-600' />
              <div>
                <p className='text-sm font-medium text-gray-600'>Monthly Fee</p>
                <p className='text-xl font-bold'>
                  ${dashboard?.unit?.monthlyFee}
                </p>
                <p className='text-sm text-gray-500'>
                  {dashboard?.resident?.isOwner ? 'Owner' : 'Tenant'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Count */}
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center space-x-4'>
              <Bell className='h-8 w-8 text-orange-600' />
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Notifications
                </p>
                <p className='text-xl font-bold'>
                  {notifications?.notifications.length || 0}
                </p>
                <p className='text-sm text-gray-500'>Unread messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Bell className='h-5 w-5' />
              <span>Recent Announcements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {dashboard?.announcements?.length ? (
              dashboard.announcements.map(announcement => (
                <div
                  key={announcement.id}
                  className='border-l-4 border-blue-500 pl-4'
                >
                  <div className='flex items-center justify-between'>
                    <h4 className='font-medium'>{announcement.title}</h4>
                    <Badge
                      variant={
                        announcement.priority === 'high'
                          ? 'destructive'
                          : 'default'
                      }
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className='mt-1 text-sm text-gray-600'>
                    {announcement.content}
                  </p>
                  <p className='mt-2 text-xs text-gray-500'>
                    {new Date(announcement.publishedAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className='text-gray-500'>No recent announcements</p>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Calendar className='h-5 w-5' />
              <span>Upcoming Meetings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {dashboard?.upcomingMeetings?.length ? (
              dashboard.upcomingMeetings.map(meeting => (
                <div
                  key={meeting.id}
                  className='flex items-center space-x-3 rounded-lg bg-gray-50 p-3'
                >
                  <Calendar className='text-primary h-5 w-5' />
                  <div className='flex-1'>
                    <h4 className='font-medium'>{meeting.title}</h4>
                    <p className='text-sm text-gray-600'>
                      {new Date(meeting.scheduledDate).toLocaleString()}
                    </p>
                    {meeting.location && (
                      <p className='text-xs text-gray-500'>
                        Location: {meeting.location}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500'>No upcoming meetings</p>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {notificationsLoading ? (
            <div className='space-y-3'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='animate-pulse'>
                  <div className='mb-2 h-4 w-3/4 rounded bg-gray-200'></div>
                  <div className='h-3 w-1/2 rounded bg-gray-200'></div>
                </div>
              ))}
            </div>
          ) : notifications?.notifications.length ? (
            <div className='space-y-4'>
              {notifications.notifications.map(notification => (
                <div
                  key={notification.id}
                  className='flex items-start space-x-3 rounded-lg bg-gray-50 p-3'
                >
                  <div className='mt-1 flex-shrink-0'>
                    {notification.priority === 'urgent' ? (
                      <AlertCircle className='h-5 w-5 text-red-600' />
                    ) : notification.priority === 'high' ? (
                      <Clock className='h-5 w-5 text-orange-600' />
                    ) : (
                      <CheckCircle className='h-5 w-5 text-green-600' />
                    )}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h4 className='font-medium'>{notification.title}</h4>
                    <p className='text-sm text-gray-600'>
                      {notification.message}
                    </p>
                    <p className='mt-1 text-xs text-gray-500'>
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      markNotificationRead.mutate({
                        notificationId: notification.id,
                      })
                    }
                    disabled={markNotificationRead.isPending}
                  >
                    Mark Read
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-500'>No notifications</p>
          )}
        </CardContent>
      </Card>
      {/* Maintenance Request Modal/Form */}
      {showMaintenanceForm && (
        <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4'>
          <Card className='w-full max-w-md'>
            <CardHeader>
              <CardTitle>Submit Maintenance Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmitMaintenanceRequest)}
                className='space-y-4'
              >
                <div>
                  <label className='text-sm font-medium'>Title *</label>
                  <Input
                    {...register('title')}
                    placeholder='Brief description'
                  />
                  {errors.title && (
                    <p className='text-sm text-red-600'>
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className='text-sm font-medium'>Category *</label>
                  <Select onValueChange={value => setValue('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='plumbing'>Plumbing</SelectItem>
                      <SelectItem value='electrical'>Electrical</SelectItem>
                      <SelectItem value='hvac'>HVAC</SelectItem>
                      <SelectItem value='appliance'>Appliance</SelectItem>
                      <SelectItem value='other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className='text-sm text-red-600'>
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className='text-sm font-medium'>Priority</label>
                  <Select
                    defaultValue='normal'
                    onValueChange={(
                      value: 'low' | 'normal' | 'high' | 'urgent'
                    ) => setValue('priority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='low'>Low</SelectItem>
                      <SelectItem value='normal'>Normal</SelectItem>
                      <SelectItem value='high'>High</SelectItem>
                      <SelectItem value='urgent'>Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className='text-sm font-medium'>Location</label>
                  <Input
                    {...register('location')}
                    placeholder='e.g., Kitchen, Bathroom'
                  />
                </div>

                <div>
                  <label className='text-sm font-medium'>Description *</label>
                  <Textarea
                    {...register('description')}
                    placeholder='Please provide detailed information about the issue'
                    rows={4}
                  />
                  {errors.description && (
                    <p className='text-sm text-red-600'>
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className='flex justify-end space-x-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setShowMaintenanceForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    disabled={submitMaintenanceRequest.isPending}
                  >
                    {submitMaintenanceRequest.isPending
                      ? 'Submitting...'
                      : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}{' '}
    </div>
  );
}
