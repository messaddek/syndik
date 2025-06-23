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
  const t = useTranslations('notifications.resident');
  const tForm = useTranslations('notifications.form');

  const getPriorityLabel = (priority: string) => {
    const key = `priorities.${priority}`;
    return tForm(key) || priority;
  };

  const getCategoryLabel = (category: string) => {
    const key = `categories.${category}`;
    return tForm(key) || category;
  };
  return (
    <Card
      className={cn(
        'transition-all hover:shadow-md dark:hover:shadow-lg',
        !notification.isRead &&
          'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30'
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
                    'truncate text-lg dark:text-white',
                    !notification.isRead && 'font-bold'
                  )}
                >
                  {notification.title}
                </CardTitle>
                {!notification.isRead && (
                  <div className='h-2 w-2 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400' />
                )}
              </div>
              <div className='text-muted-foreground flex items-center gap-2 text-sm dark:text-gray-400'>
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
                  {getPriorityLabel(notification.priority)}
                </Badge>
                <Badge variant='outline' className='text-xs'>
                  {getCategoryLabel(notification.category)}
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
                className='h-8 w-8 p-0 dark:hover:bg-gray-700'
              >
                <Check className='h-4 w-4' />
              </Button>
            )}
            <Button
              size='sm'
              variant='ghost'
              onClick={() => onArchive(notification.id)}
              className='h-8 w-8 p-0 dark:hover:bg-gray-700'
            >
              <Archive className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        <CardDescription className='text-sm leading-relaxed dark:text-gray-400'>
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
                {t('actions.viewDetails')}
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const ResidentNotifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const t = useTranslations('notifications.resident');
  const tForm = useTranslations('notifications.form');

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
        toast.success(t('success.markAllAsRead'));
      },
    })
  );

  const notifications = notificationsData?.data || [];

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold dark:text-white'>{t('title')}</h1>
          <p className='text-muted-foreground mt-2 dark:text-gray-400'>
            {t('description')}
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
              {t('markAllRead')} ({unreadCount.total})
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
            <CardTitle className='text-sm font-medium dark:text-white'>
              Total
            </CardTitle>
            <Bell className='text-muted-foreground h-4 w-4 dark:text-gray-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold dark:text-white'>
              {notifications.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium dark:text-white'>
              Unread
            </CardTitle>
            <div className='h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400' />
          </CardHeader>
          <CardContent>
            <div className='text-primary text-2xl font-bold'>
              {unreadCount?.total || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium dark:text-white'>
              Urgent
            </CardTitle>
            <div className='h-2 w-2 rounded-full bg-red-500 dark:bg-red-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600 dark:text-red-400'>
              {notifications.filter(n => n.priority === 'urgent').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium dark:text-white'>
              Financial
            </CardTitle>
            <div className='text-lg'>💰</div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold dark:text-white'>
              {notifications.filter(n => n.category === 'financial').length}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 dark:text-white'>
            <Filter className='h-5 w-5' />
            {t('filters.category')} & {t('filters.priority')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium dark:text-white'>
                {t('filters.category')}
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue
                    placeholder={t('filters.allCategoriesPlaceholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>
                    {t('filters.allCategories')}
                  </SelectItem>
                  <SelectItem value='general'>
                    {tForm('categories.general')}
                  </SelectItem>
                  <SelectItem value='financial'>
                    {tForm('categories.financial')}
                  </SelectItem>
                  <SelectItem value='maintenance'>
                    {tForm('categories.maintenance')}
                  </SelectItem>
                  <SelectItem value='community'>
                    {tForm('categories.community')}
                  </SelectItem>
                  <SelectItem value='system'>
                    {tForm('categories.system')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium dark:text-white'>
                {t('filters.priority')}
              </label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue
                    placeholder={t('filters.allPrioritiesPlaceholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>
                    {t('filters.allPriorities')}
                  </SelectItem>
                  <SelectItem value='urgent'>
                    {tForm('priorities.urgent')}
                  </SelectItem>
                  <SelectItem value='high'>
                    {tForm('priorities.high')}
                  </SelectItem>
                  <SelectItem value='normal'>
                    {tForm('priorities.normal')}
                  </SelectItem>
                  <SelectItem value='low'>{tForm('priorities.low')}</SelectItem>
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
          <TabsTrigger value='all'>{t('allNotifications')}</TabsTrigger>
          <TabsTrigger value='unread' className='relative'>
            {t('unreadNotifications')}
            {unreadCount && unreadCount.total > 0 && (
              <Badge
                variant='secondary'
                className='ml-2 h-4 text-xs dark:bg-gray-600 dark:text-gray-200'
              >
                {unreadCount.total}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value='all' className='space-y-4'>
          {isLoading ? (
            <div className='py-8 text-center'>
              <div className='text-muted-foreground dark:text-gray-400'>
                {t('loading')}
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <Card>
              <CardContent className='py-8 text-center'>
                <Bell className='text-muted-foreground mx-auto mb-2 h-8 w-8 dark:text-gray-400' />
                <p className='text-muted-foreground dark:text-gray-400'>
                  {t('emptyState.title')}
                </p>
                <p className='text-muted-foreground mt-1 text-sm dark:text-gray-400'>
                  {t('emptyState.description')}
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
              <div className='text-muted-foreground dark:text-gray-400'>
                {t('loading')}
              </div>
            </div>
          ) : notifications.filter(n => !n.isRead).length === 0 ? (
            <Card>
              <CardContent className='py-8 text-center'>
                <Check className='mx-auto mb-2 h-8 w-8 text-green-500 dark:text-green-400' />
                <p className='text-muted-foreground dark:text-gray-400'>
                  {t('emptyState.unreadTitle')}
                </p>
                <p className='text-muted-foreground mt-1 text-sm dark:text-gray-400'>
                  {t('emptyState.unreadDescription')}
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
};
