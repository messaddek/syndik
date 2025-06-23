'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Bell, Check, Archive, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Notification } from '@/lib/schema';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
const priorityColors = {
  low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  normal: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  urgent: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
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

const NotificationItem = ({
  notification,
  onMarkAsRead,
  onArchive,
}: NotificationItemProps) => {
  const t = useTranslations('notifications.form');

  const getPriorityLabel = (priority: string) => {
    const key = `priorities.${priority}`;
    return t(key) || priority;
  };
  return (
    <div
      className={cn(
        'group hover:bg-muted/50 relative flex gap-3 p-3 transition-colors dark:hover:bg-gray-800/50',
        !notification.isRead && 'bg-blue-50/50 dark:bg-blue-950/30'
      )}
    >
      {/* Priority indicator */}
      <div
        className={cn(
          'mt-1 h-2 w-2 shrink-0 rounded-full',
          notification.priority === 'urgent' && 'bg-red-500 dark:bg-red-400',
          notification.priority === 'high' &&
            'bg-orange-500 dark:bg-orange-400',
          notification.priority === 'normal' && 'bg-blue-500 dark:bg-blue-400',
          notification.priority === 'low' && 'bg-gray-500 dark:bg-gray-400'
        )}
      />

      <div className='min-w-0 flex-1'>
        <div className='flex items-start justify-between gap-2'>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-2'>
              <span className='text-sm'>
                {
                  categoryIcons[
                    notification.category as keyof typeof categoryIcons
                  ]
                }
              </span>
              <h4
                className={cn(
                  'truncate text-sm font-medium dark:text-white',
                  !notification.isRead && 'font-semibold'
                )}
              >
                {notification.title}
              </h4>
            </div>
            <p className='text-muted-foreground mt-1 line-clamp-2 text-sm dark:text-gray-400'>
              {notification.message}
            </p>
            <div className='mt-2 flex items-center gap-2'>
              <span className='text-muted-foreground text-xs dark:text-gray-400'>
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
                {getPriorityLabel(notification.priority)}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
            {!notification.isRead && (
              <Button
                size='sm'
                variant='ghost'
                className='h-7 w-7 p-0 dark:hover:bg-gray-700'
                onClick={() => onMarkAsRead(notification.id)}
              >
                <Check className='h-3 w-3' />
              </Button>
            )}
            <Button
              size='sm'
              variant='ghost'
              className='h-7 w-7 p-0 dark:hover:bg-gray-700'
              onClick={() => onArchive(notification.id)}
            >
              <Archive className='h-3 w-3' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NotificationDropdownProps {
  children?: React.ReactNode;
}

export const NotificationDropdown = ({
  children,
}: NotificationDropdownProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const t = useTranslations('notifications.dropdown');
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  // Get unread count
  const { data: unreadCount } = useQuery(
    trpc.notifications.getUnreadCount.queryOptions()
  );

  // Get notifications
  const { data: notificationsData, isLoading } = useQuery(
    trpc.notifications.getMyNotifications.queryOptions({
      page: 1,
      pageSize: 20,
      isRead: activeTab === 'unread' ? false : undefined,
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
      },
    })
  );

  const notifications = notificationsData?.data || [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children || (
          <Button variant='ghost' size='icon' className='relative'>
            <Bell className='h-4 w-4' />
            {unreadCount && unreadCount.total > 0 && (
              <Badge
                variant='destructive'
                className='absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs'
              >
                {unreadCount.total > 99 ? '99+' : unreadCount.total}
              </Badge>
            )}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className='bg-background border-border w-96 p-0 dark:border-gray-700'
        align='end'
      >
        <div className='border-border border-b-0 p-4 dark:border-gray-700'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold dark:text-white'>{t('title')}</h3>
            <div className='flex items-center gap-2'>
              {unreadCount && unreadCount.total > 0 && (
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => markAllAsReadMutation.mutate({})}
                  disabled={markAllAsReadMutation.isPending}
                  className='dark:hover:bg-gray-700'
                >
                  <Check className='mr-1 h-3 w-3' />
                  {t('markAllRead')}
                </Button>
              )}
              <Button
                size='sm'
                variant='ghost'
                onClick={() => router.push('/portal/notifications/settings')}
                className='dark:hover:bg-gray-700'
              >
                <Settings className='h-3 w-3' />
              </Button>
            </div>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <div className='px-4 pb-2'>
            <TabsList className='bg-muted grid w-full grid-cols-2 dark:bg-gray-800'>
              <TabsTrigger
                value='all'
                className='data-[state=active]:bg-background dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white'
              >
                {t('all')}
              </TabsTrigger>
              <TabsTrigger
                value='unread'
                className='data-[state=active]:bg-background relative dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white'
              >
                {t('unread')}
                {unreadCount && unreadCount.total > 0 && (
                  <Badge
                    variant='secondary'
                    className='ml-1 h-4 text-xs dark:bg-gray-600 dark:text-gray-200'
                  >
                    {unreadCount.total}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='all' className='m-0'>
            <ScrollArea className='bg-background h-96 dark:bg-gray-900'>
              {isLoading ? (
                <div className='text-muted-foreground p-4 text-center text-sm dark:text-gray-400'>
                  {t('loading')}
                </div>
              ) : notifications.length === 0 ? (
                <div className='p-8 text-center'>
                  <Bell className='text-muted-foreground mx-auto mb-2 h-8 w-8 dark:text-gray-400' />
                  <p className='text-muted-foreground text-sm dark:text-gray-400'>
                    {t('emptyTitle')}
                  </p>
                </div>
              ) : (
                <div className='divide-border divide-y dark:divide-gray-700'>
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
            </ScrollArea>
          </TabsContent>
          <TabsContent value='unread' className='m-0'>
            <ScrollArea className='bg-background h-96 dark:bg-gray-900'>
              {isLoading ? (
                <div className='text-muted-foreground p-4 text-center text-sm dark:text-gray-400'>
                  {t('loading')}
                </div>
              ) : notifications.filter(n => !n.isRead).length === 0 ? (
                <div className='p-8 text-center'>
                  <Check className='mx-auto mb-2 h-8 w-8 text-green-500 dark:text-green-400' />
                  <p className='text-muted-foreground text-sm dark:text-gray-400'>
                    {t('allCaughtUp')}
                  </p>
                  <p className='text-muted-foreground mt-1 text-xs dark:text-gray-400'>
                    {t('noUnreadNotifications')}
                  </p>
                </div>
              ) : (
                <div className='divide-border divide-y dark:divide-gray-700'>
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
            </ScrollArea>
          </TabsContent>
        </Tabs>
        {notifications.length > 0 && (
          <div className='border-border border-t p-3 dark:border-gray-700'>
            <Button
              variant='ghost'
              className='w-full dark:hover:bg-gray-800'
              size='sm'
              onClick={() => router.push('/portal/notifications')}
            >
              {t('viewAllNotifications')}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
