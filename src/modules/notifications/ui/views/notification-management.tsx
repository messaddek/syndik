'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Plus, Users, Eye, Bell } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/page-header';
import { CreateNotificationDialog } from '../components';

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

const NotificationManagement = () => {
  const t = useTranslations('notifications');
  const tForm = useTranslations('notifications.form');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const trpc = useTRPC();
  const getPriorityLabel = (priority: string) => {
    const key = `priorities.${priority}`;
    return tForm(key) || priority;
  };

  const getCategoryLabel = (category: string) => {
    const key = `categories.${category}`;
    return tForm(key) || category;
  };

  // Get all notifications for the organization
  const { data: notificationsData, isLoading } = useQuery(
    trpc.notifications.getAllForOrg.queryOptions({
      page: 1,
      pageSize: 50,
    })
  );

  const notifications = notificationsData?.data || [];
  return (
    <div className='space-y-6'>
      <PageHeader
        title={t('title')}
        description={t('description')}
        ctaButtonContent={
          <div className='flex items-center gap-x-2'>
            <Plus className='h-4 w-4' />
            {t('addNotification')}
          </div>
        }
        ctaButtonCallback={() => setIsCreateDialogOpen(true)}
      />
      <CreateNotificationDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={() => {
          // Refresh the notifications list when a new one is created
          // The form component handles the query invalidation
        }}
      />
      {/* Statistics Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        {' '}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('stats.totalSent')}
            </CardTitle>
            <Bell className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{notifications.length}</div>
            <p className='text-muted-foreground text-xs'>
              {t('stats.allNotifications')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('stats.thisWeek')}
            </CardTitle>
            <Users className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {
                notifications.filter(
                  n =>
                    new Date(n.createdAt) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length
              }
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('stats.lastSevenDays')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('stats.urgent')}
            </CardTitle>
            <Eye className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {notifications.filter(n => n.priority === 'urgent').length}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('stats.highPriorityNotifications')}
            </p>
          </CardContent>
        </Card>
      </div>{' '}
      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('list.recentNotifications')}</CardTitle>
          <CardDescription>{t('list.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='py-8 text-center'>
              <div className='text-muted-foreground'>{t('list.loading')}</div>
            </div>
          ) : notifications.length === 0 ? (
            <div className='py-8 text-center'>
              <Bell className='text-muted-foreground mx-auto mb-2 h-8 w-8' />
              <p className='text-muted-foreground'>{t('list.emptyTitle')}</p>
              <p className='text-muted-foreground mt-1 text-sm'>
                {t('list.emptyDescription')}
              </p>
            </div>
          ) : (
            <ScrollArea className='h-96'>
              <div className='space-y-4'>
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className='bg-card flex items-start gap-3 rounded-lg border p-3'
                  >
                    <div className='text-lg'>
                      {
                        categoryIcons[
                          notification.category as keyof typeof categoryIcons
                        ]
                      }
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-start justify-between gap-2'>
                        <div className='min-w-0 flex-1'>
                          <h4 className='truncate font-medium'>
                            {notification.title}
                          </h4>
                          <p className='text-muted-foreground mt-1 text-sm'>
                            {notification.message}
                          </p>
                          <div className='mt-2 flex items-center gap-2'>
                            <span className='text-muted-foreground text-xs'>
                              {formatDistanceToNow(
                                new Date(notification.createdAt),
                                { addSuffix: true }
                              )}
                            </span>{' '}
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
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { NotificationManagement };
