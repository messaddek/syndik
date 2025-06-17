'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface CreateNotificationFormData {
  title: string;
  message: string;
  category: string;
  priority: string;
  actionUrl: string;
}

interface NotificationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function NotificationForm({
  onSuccess,
  onCancel,
}: NotificationFormProps) {
  const t = useTranslations('notifications.form');
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CreateNotificationFormData>({
    title: '',
    message: '',
    category: 'general',
    priority: 'normal',
    actionUrl: '',
  });

  // Create notification mutation
  const createNotificationMutation = useMutation(
    trpc.notifications.createSystemNotification.mutationOptions({
      onSuccess: () => {
        toast.success(t('successMessage'));
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
        onSuccess?.();
      },
      onError: error => {
        toast.error(t('errorMessage'));
        console.error('Failed to create notification:', error);
      },
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='title'>{t('title')}</Label>
        <Input
          id='title'
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder={t('titlePlaceholder')}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='message'>{t('message')}</Label>
        <Textarea
          id='message'
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          placeholder={t('messagePlaceholder')}
          rows={3}
          required
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='category'>{t('category')}</Label>
          <Select
            value={formData.category}
            onValueChange={value =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t('categoryPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='general'>{t('categories.general')}</SelectItem>
              <SelectItem value='financial'>
                {t('categories.financial')}
              </SelectItem>
              <SelectItem value='maintenance'>
                {t('categories.maintenance')}
              </SelectItem>
              <SelectItem value='community'>
                {t('categories.community')}
              </SelectItem>
              <SelectItem value='system'>{t('categories.system')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='priority'>{t('priority')}</Label>
          <Select
            value={formData.priority}
            onValueChange={value =>
              setFormData({ ...formData, priority: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t('priorityPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='low'>{t('priorities.low')}</SelectItem>
              <SelectItem value='normal'>{t('priorities.normal')}</SelectItem>
              <SelectItem value='high'>{t('priorities.high')}</SelectItem>
              <SelectItem value='urgent'>{t('priorities.urgent')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='actionUrl'>{t('actionUrl')}</Label>
        <Input
          id='actionUrl'
          value={formData.actionUrl}
          onChange={e =>
            setFormData({ ...formData, actionUrl: e.target.value })
          }
          placeholder={t('actionUrlPlaceholder')}
          type='url'
        />
      </div>

      <div className='flex justify-end space-x-2 pt-4'>
        <Button type='button' variant='outline' onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button type='submit' disabled={createNotificationMutation.isPending}>
          {createNotificationMutation.isPending ? (
            <>
              <Send className='mr-2 h-4 w-4 animate-spin' />
              {t('sending')}
            </>
          ) : (
            <>
              <Send className='mr-2 h-4 w-4' />
              {t('send')}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
