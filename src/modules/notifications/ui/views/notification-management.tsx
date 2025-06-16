'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Plus, Send, Users, Eye, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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

interface CreateNotificationFormData {
  title: string;
  message: string;
  category: string;
  priority: string;
  actionUrl: string;
}

export function NotificationManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CreateNotificationFormData>({
    title: '',
    message: '',
    category: 'general',
    priority: 'normal',
    actionUrl: '',
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Get all notifications for the organization
  const { data: notificationsData, isLoading } = useQuery(
    trpc.notifications.getAllForOrg.queryOptions({
      page: 1,
      pageSize: 50,
    })
  );

  // Create notification mutation
  const createNotificationMutation = useMutation(
    trpc.notifications.createSystemNotification.mutationOptions({
      onSuccess: () => {
        toast.success('Notification sent successfully!');
        setIsCreateDialogOpen(false);
        setFormData({
          title: '',
          message: '',
          category: 'general',
          priority: 'normal',
          actionUrl: '',
        });
        queryClient.invalidateQueries(
          trpc.notifications.getAllForOrg.queryOptions({})
        );
      },
      onError: error => {
        toast.error(`Failed to send notification: ${error.message}`);
      },
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      toast.error('Title and message are required');
      return;
    }

    createNotificationMutation.mutate({
      title: formData.title,
      message: formData.message,
      category: formData.category as
        | 'financial'
        | 'maintenance'
        | 'community'
        | 'system'
        | 'general',
      priority: formData.priority as 'low' | 'normal' | 'high' | 'urgent',
      actionUrl: formData.actionUrl || undefined,
    });
  };

  const notifications = notificationsData?.data || [];

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Notification Management</h1>
          <p className='text-muted-foreground mt-2'>
            Send notifications to residents and manage communication.
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className='flex items-center space-x-2'>
              <Plus className='h-4 w-4' />
              Send Notification
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Send New Notification</DialogTitle>
              <DialogDescription>
                Send a notification to all residents in your organization.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  value={formData.title}
                  onChange={e =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder='Notification title'
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='message'>Message</Label>
                <Textarea
                  id='message'
                  value={formData.message}
                  onChange={e =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder='Notification message'
                  rows={3}
                  required
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='category'>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={value =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='general'>General</SelectItem>
                      <SelectItem value='financial'>Financial</SelectItem>
                      <SelectItem value='maintenance'>Maintenance</SelectItem>
                      <SelectItem value='community'>Community</SelectItem>
                      <SelectItem value='system'>System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='priority'>Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={value =>
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select priority' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='low'>Low</SelectItem>
                      <SelectItem value='normal'>Normal</SelectItem>
                      <SelectItem value='high'>High</SelectItem>
                      <SelectItem value='urgent'>Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='actionUrl'>Action URL (Optional)</Label>
                <Input
                  id='actionUrl'
                  value={formData.actionUrl}
                  onChange={e =>
                    setFormData({ ...formData, actionUrl: e.target.value })
                  }
                  placeholder='https://example.com'
                  type='url'
                />
              </div>

              <div className='flex justify-end space-x-2 pt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={createNotificationMutation.isPending}
                >
                  {createNotificationMutation.isPending ? (
                    <>
                      <Send className='mr-2 h-4 w-4 animate-spin' />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className='mr-2 h-4 w-4' />
                      Send Notification
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Sent</CardTitle>
            <Bell className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{notifications.length}</div>
            <p className='text-muted-foreground text-xs'>All notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>This Week</CardTitle>
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
            <p className='text-muted-foreground text-xs'>Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Urgent</CardTitle>
            <Eye className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {notifications.filter(n => n.priority === 'urgent').length}
            </div>
            <p className='text-muted-foreground text-xs'>
              High priority notifications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            All notifications sent to residents in your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='py-8 text-center'>
              <div className='text-muted-foreground'>
                Loading notifications...
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className='py-8 text-center'>
              <Bell className='text-muted-foreground mx-auto mb-2 h-8 w-8' />
              <p className='text-muted-foreground'>No notifications sent yet</p>
              <p className='text-muted-foreground mt-1 text-sm'>
                Create your first notification to get started.
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
}
