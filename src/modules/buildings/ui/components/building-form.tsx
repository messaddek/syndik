'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createBuildingSchema } from '../../schema';
import { Building } from '../../types';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useTRPC } from '@/trpc/client';
import { toast } from 'sonner';

type BuildingFormData = z.infer<typeof createBuildingSchema>;

interface BuildingFormProps {
  building?: Building | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BuildingForm({
  building,
  onSuccess,
  onCancel,
}: BuildingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('buildings');
  const tCommon = useTranslations('common');
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditing = !!building;
  const form = useForm<BuildingFormData>({
    resolver: zodResolver(createBuildingSchema),
    defaultValues: {
      name: building?.name || '',
      address: building?.address || '',
      city: building?.city || '',
      postalCode: building?.postalCode || '',
      country: building?.country || 'Morocco',
      totalUnits: building?.totalUnits || 1,
      description: building?.description || '',
    },
  });

  const createBuilding = useMutation(
    trpc.buildings.create.mutationOptions({
      onSuccess: () => {
        toast.success(t('buildingCreated'));
        queryClient.invalidateQueries(trpc.buildings.getAll.queryOptions({}));
        queryClient.invalidateQueries({
          queryKey: trpc.dashboard.getOverview.queryKey(),
        });
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        form.reset();
        onSuccess?.();
      },
      onError: error => {
        toast.error(error.message || t('errorCreatingBuilding'));
      },
    })
  );

  const updateBuilding = useMutation(
    trpc.buildings.update.mutationOptions({
      onSuccess: () => {
        toast.success(t('buildingUpdated'));
        queryClient.invalidateQueries(trpc.buildings.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.buildings.getById.queryOptions({ id: building!.id })
        );
        queryClient.invalidateQueries({
          queryKey: trpc.dashboard.getOverview.queryKey(),
        });
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        onSuccess?.();
      },
      onError: error => {
        toast.error(error.message || t('errorUpdatingBuilding'));
      },
    })
  );

  // Reset form when building changes
  useEffect(() => {
    if (building) {
      form.reset({
        name: building.name,
        address: building.address,
        city: building.city,
        postalCode: building.postalCode,
        country: building.country,
        totalUnits: building.totalUnits,
        description: building.description || '',
      });
    } else {
      form.reset({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Morocco',
        totalUnits: 1,
        description: '',
      });
    }
  }, [building, form]);
  const handleSubmit = async (values: BuildingFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditing && building) {
        await updateBuilding.mutateAsync({
          id: building.id,
          data: values,
        });
      } else {
        await createBuilding.mutateAsync(values);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        {' '}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('buildingName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('namePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('buildingAddress')}</FormLabel>
              <FormControl>
                <Input placeholder={t('addressPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('city')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('cityPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='postalCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('postalCode')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('postalCodePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>{' '}
        <FormField
          control={form.control}
          name='totalUnits'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('totalUnits')}</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='20'
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                />
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
              <FormLabel>{t('description')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('descriptionPlaceholder')}
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>{t('description')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end space-x-2 pt-4'>
          {onCancel && (
            <Button type='button' variant='outline' onClick={onCancel}>
              {tCommon('cancel')}
            </Button>
          )}{' '}
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting
              ? building
                ? tCommon('saving')
                : tCommon('saving')
              : building
                ? t('editBuilding')
                : t('addBuilding')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
