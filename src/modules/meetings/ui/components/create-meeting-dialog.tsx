'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createMeetingSchema } from '../../schema';
import { z } from 'zod';
import { useTRPC } from '@/trpc/client';

type CreateMeetingForm = z.infer<typeof createMeetingSchema>;

interface CreateMeetingDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateMeetingDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateMeetingDialogProps) => {
  const t = useTranslations('meetings');
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: buildingsData = { data: [] } } = useQuery(
    trpc.buildings.getAll.queryOptions({})
  );
  const buildings = buildingsData.data || [];

  const form = useForm<CreateMeetingForm>({
    resolver: zodResolver(createMeetingSchema),
    defaultValues: {
      title: '',
      description: '',
      scheduledDate: '',
      location: '',
      agenda: '',
      maxParticipants: '',
    },
  });

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        onOpenChange?.(false);
        onSuccess?.();
        queryClient.invalidateQueries(trpc.meetings.getAll.queryOptions({}));
      },
      onError: _error => {
        // Handle error - could show toast notification
      },
    })
  );

  const onSubmit = async (data: CreateMeetingForm) => {
    setIsSubmitting(true);
    try {
      await createMeeting.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date as default minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().slice(0, 16);

  return (
    <ResponsiveDialog
      title={t('create_meeting')}
      description={t('create_meeting_description')}
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='buildingId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('building_label')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('building_placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {buildings.map(building => (
                      <SelectItem key={building.id} value={building.id}>
                        {building.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('title_label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('title_placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('description_label')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('description_placeholder')}
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='scheduledDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('date_time_label')}</FormLabel>
                  <FormControl>
                    <Input
                      type='datetime-local'
                      min={tomorrowString}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('location_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('location_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='maxParticipants'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('max_participants_label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('max_participants_placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='agenda'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('agenda_label')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('agenda_placeholder')}
                    className='resize-none'
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end space-x-2 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange?.(false)}
            >
              {t('cancel')}
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? t('scheduling') : t('schedule_meeting')}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
}
