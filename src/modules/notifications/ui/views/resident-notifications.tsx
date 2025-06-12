'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Bell, Check, Archive, Settings, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Notification } from '../../schema';

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  normal: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const categoryIcons = {
  financial: '💰',
  maintenance: '🔧',
  community: '👥',
  system: '⚙️',
  general: '📋',
};

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onArchive: (id: string) => void;
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onArchive,
}: NotificationItemProps) {
  return (
    <Card
      className={cn(
        'transition-all hover:shadow-md',
        !notification.isRead && 'border-blue-200 bg-blue-50/50'
      )}
    >
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex min-w-0 flex-1 items-start gap-3'>
            <div className='mt-0.5 text-lg'>
              {
                categoryIcons[
                  notification.category as keyof typeof categoryIcons
                ]
              }
            </div>
            <div className='min-w-0 flex-1'>
              <div className='mb-1 flex items-center gap-2'>
                <CardTitle
                  className={cn(
                    'truncate text-lg',
                    !notification.isRead && 'font-bold'
                  )}
                >
                  {notification.title}
                </CardTitle>
                {!notification.isRead && (
                  <div className='h-2 w-2 shrink-0 rounded-full bg-blue-500' />
                )}
              </div>
              <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                <span>
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <Badge
                  variant='secondary'
                  className={cn(
                    'text-xs',
                    priorityColors[
                      notification.priority as keyof typeof priorityColors
                    ]
                  )}
                >
                  {notification.priority}
                </Badge>
                <Badge variant='outline' className='text-xs'>
                  {notification.category}
                </Badge>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            {!notification.isRead && (
              <Button
                size='sm'
                variant='ghost'
                onClick={() => onMarkAsRead(notification.id)}
                className='h-8 w-8 p-0'
              >
                <Check className='h-4 w-4' />
              </Button>
            )}
            <Button
              size='sm'
              variant='ghost'
              onClick={() => onArchive(notification.id)}
              className='h-8 w-8 p-0'
            >
              <Archive className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        <CardDescription className='text-sm leading-relaxed'>
          {notification.message}
        </CardDescription>
        {notification.actionUrl && (
          <div className='mt-3'>
            <Button size='sm' variant='outline' asChild>
              <a
                href={notification.actionUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                View Details
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ResidentNotifications() {
  const [activeTab, setActiveTab] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Get unread count
  const { data: unreadCount } = useQuery(
    trpc.notifications.getUnreadCount.queryOptions()
  );

  // Get notifications with filters
  const { data: notificationsData, isLoading } = useQuery(
    trpc.notifications.getMyNotifications.queryOptions({
      page: 1,
      pageSize: 50,
      isRead: activeTab === 'unread' ? false : undefined,
      category:
        categoryFilter !== 'all'
          ? (categoryFilter as
              | 'financial'
              | 'maintenance'
              | 'community'
              | 'system'
              | 'general')
          : undefined,
      priority:
        priorityFilter !== 'all'
          ? (priorityFilter as 'low' | 'normal' | 'high' | 'urgent')
          : undefined,
    })
  );

  // Mark as read mutation
  const markAsReadMutation = useMutation(
    trpc.notifications.markAsRead.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.notifications.getMyNotifications.queryOptions({})
        );
        queryClient.invalidateQueries(
          trpc.notifications.getUnreadCount.queryOptions()
        );
        toast.success('Notification marked as read');
      },
    })
  );

  // Archive mutation
  const archiveMutation = useMutation(
    trpc.notifications.archive.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.notifications.getMyNotifications.queryOptions({})
        );
        queryClient.invalidateQueries(
          trpc.notifications.getUnreadCount.queryOptions()
        );
        toast.success('Notification archived');
      },
    })
  );

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation(
    trpc.notifications.markAllAsRead.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.notifications.getMyNotifications.queryOptions({})
        );
        queryClient.invalidateQueries(
          trpc.notifications.getUnreadCount.queryOptions()
        );
        toast.success('All notifications marked as read');
      },
    })
  );

  const notifications = notificationsData?.data || [];

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Notifications</h1>
          <p className='text-muted-foreground mt-2'>
            Stay updated with important announcements and building information.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          {unreadCount && unreadCount.total > 0 && (
            <Button
              variant='outline'
              onClick={() => markAllAsReadMutation.mutate({})}
              disabled={markAllAsReadMutation.isPending}
            >
              <Check className='mr-2 h-4 w-4' />
              Mark all read ({unreadCount.total})
            </Button>
          )}
          <Button variant='outline' size='icon'>
            <Settings className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total</CardTitle>
            <Bell className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{notifications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Unread</CardTitle>
            <div className='h-2 w-2 rounded-full bg-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>
              {unreadCount?.total || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Urgent</CardTitle>
            <div className='h-2 w-2 rounded-full bg-red-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>
              {notifications.filter(n => n.priority === 'urgent').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Financial</CardTitle>
            <div className='text-lg'>💰</div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {notifications.filter(n => n.category === 'financial').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Filter className='h-5 w-5' />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='All categories' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Categories</SelectItem>
                  <SelectItem value='general'>General</SelectItem>
                  <SelectItem value='financial'>Financial</SelectItem>
                  <SelectItem value='maintenance'>Maintenance</SelectItem>
                  <SelectItem value='community'>Community</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='All priorities' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Priorities</SelectItem>
                  <SelectItem value='urgent'>Urgent</SelectItem>
                  <SelectItem value='high'>High</SelectItem>
                  <SelectItem value='normal'>Normal</SelectItem>
                  <SelectItem value='low'>Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-4'
      >
        <TabsList>
          <TabsTrigger value='all'>All Notifications</TabsTrigger>
          <TabsTrigger value='unread' className='relative'>
            Unread
            {unreadCount && unreadCount.total > 0 && (
              <Badge variant='secondary' className='ml-2 h-4 text-xs'>
                {unreadCount.total}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value='all' className='space-y-4'>
          {isLoading ? (
            <div className='py-8 text-center'>
              <div className='text-muted-foreground'>
                Loading notifications...
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <Card>
              <CardContent className='py-8 text-center'>
                <Bell className='text-muted-foreground mx-auto mb-2 h-8 w-8' />
                <p className='text-muted-foreground'>No notifications found</p>
                <p className='text-muted-foreground mt-1 text-sm'>
                  Check back later for updates from your building management.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-4'>
              {notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={id =>
                    markAsReadMutation.mutate({ notificationId: id })
                  }
                  onArchive={id =>
                    archiveMutation.mutate({ notificationId: id })
                  }
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value='unread' className='space-y-4'>
          {isLoading ? (
            <div className='py-8 text-center'>
              <div className='text-muted-foreground'>
                Loading notifications...
              </div>
            </div>
          ) : notifications.filter(n => !n.isRead).length === 0 ? (
            <Card>
              <CardContent className='py-8 text-center'>
                <Check className='mx-auto mb-2 h-8 w-8 text-green-500' />
                <p className='text-muted-foreground'>All caught up!</p>
                <p className='text-muted-foreground mt-1 text-sm'>
                  You have no unread notifications.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-4'>
              {notifications
                .filter(n => !n.isRead)
                .map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={id =>
                      markAsReadMutation.mutate({ notificationId: id })
                    }
                    onArchive={id =>
                      archiveMutation.mutate({ notificationId: id })
                    }
                  />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
