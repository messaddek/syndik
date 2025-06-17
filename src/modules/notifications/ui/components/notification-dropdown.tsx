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
  const t = useTranslations('notifications.form');

  const getPriorityLabel = (priority: string) => {
    const key = `priorities.${priority}`;
    return t(key) || priority;
  };
  return (
    <div
      className={cn(
        'group hover:bg-muted/50 relative flex gap-3 p-3 transition-colors',
        !notification.isRead && 'bg-blue-50/50'
      )}
    >
      {/* Priority indicator */}
      <div
        className={cn(
          'mt-1 h-2 w-2 shrink-0 rounded-full',
          notification.priority === 'urgent' && 'bg-red-500',
          notification.priority === 'high' && 'bg-orange-500',
          notification.priority === 'normal' && 'bg-blue-500',
          notification.priority === 'low' && 'bg-gray-500'
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
                  'truncate text-sm font-medium',
                  !notification.isRead && 'font-semibold'
                )}
              >
                {notification.title}
              </h4>
            </div>
            <p className='text-muted-foreground mt-1 line-clamp-2 text-sm'>
              {notification.message}
            </p>
            <div className='mt-2 flex items-center gap-2'>
              <span className='text-muted-foreground text-xs'>
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
                className='h-7 w-7 p-0'
                onClick={() => onMarkAsRead(notification.id)}
              >
                <Check className='h-3 w-3' />
              </Button>
            )}
            <Button
              size='sm'
              variant='ghost'
              className='h-7 w-7 p-0'
              onClick={() => onArchive(notification.id)}
            >
              <Archive className='h-3 w-3' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NotificationDropdownProps {
  children?: React.ReactNode;
}

export function NotificationDropdown({ children }: NotificationDropdownProps) {
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
      <PopoverContent className='w-96 p-0' align='end'>
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold'>{t('title')}</h3>
            <div className='flex items-center gap-2'>
              {unreadCount && unreadCount.total > 0 && (
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => markAllAsReadMutation.mutate({})}
                  disabled={markAllAsReadMutation.isPending}
                >
                  <Check className='mr-1 h-3 w-3' />
                  {t('markAllRead')}
                </Button>
              )}
              <Button
                size='sm'
                variant='ghost'
                onClick={() => router.push('/portal/notifications/settings')}
              >
                <Settings className='h-3 w-3' />
              </Button>
            </div>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <div className='px-4'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='all'>{t('all')}</TabsTrigger>
              <TabsTrigger value='unread' className='relative'>
                {t('unread')}
                {unreadCount && unreadCount.total > 0 && (
                  <Badge variant='secondary' className='ml-1 h-4 text-xs'>
                    {unreadCount.total}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='all' className='m-0'>
            <ScrollArea className='h-96'>
              {isLoading ? (
                <div className='text-muted-foreground p-4 text-center text-sm'>
                  {t('loading')}
                </div>
              ) : notifications.length === 0 ? (
                <div className='p-8 text-center'>
                  <Bell className='text-muted-foreground mx-auto mb-2 h-8 w-8' />
                  <p className='text-muted-foreground text-sm'>
                    {t('emptyTitle')}
                  </p>
                </div>
              ) : (
                <div className='divide-y'>
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
            <ScrollArea className='h-96'>
              {isLoading ? (
                <div className='text-muted-foreground p-4 text-center text-sm'>
                  {t('loading')}
                </div>
              ) : notifications.filter(n => !n.isRead).length === 0 ? (
                <div className='p-8 text-center'>
                  <Check className='mx-auto mb-2 h-8 w-8 text-green-500' />
                  <p className='text-muted-foreground text-sm'>
                    {t('allCaughtUp')}
                  </p>
                  <p className='text-muted-foreground mt-1 text-xs'>
                    {t('noUnreadNotifications')}
                  </p>
                </div>
              ) : (
                <div className='divide-y'>
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
          <div className='border-t p-3'>
            <Button variant='ghost' className='w-full' size='sm'>
              {t('viewAllNotifications')}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
