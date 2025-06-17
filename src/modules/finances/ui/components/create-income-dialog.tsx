'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
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
import { createIncomeSchema } from '../../../incomes/schema';
import { z } from 'zod';
import { useTranslations } from 'next-intl';

type CreateIncomeForm = z.infer<typeof createIncomeSchema>;

interface CreateIncomeDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateIncomeDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateIncomeDialogProps) {
  const trpc = useTRPC();
  const t = useTranslations('finance');
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data } = useQuery(trpc.buildings.getAll.queryOptions({}));

  const form = useForm<CreateIncomeForm>({
    resolver: zodResolver(createIncomeSchema),
    defaultValues: {
      amount: 0,
      description: '',
      category: 'monthly_fees',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      receivedDate: new Date().toISOString().split('T')[0],
      notes: '',
    },
  });

  const createIncome = useMutation(
    trpc.incomes.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.incomes.getAll.queryOptions({}));
        form.reset();
        onOpenChange?.(false);
        onSuccess?.();
      },
      onError: _error => {
        // Handle error - could show toast notification
      },
    })
  );

  const onSubmit = async (data: CreateIncomeForm) => {
    setIsSubmitting(true);
    try {
      await createIncome.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveDialog
      title={t('createIncomeDialog.title')}
      description={t('createIncomeDialog.description')}
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
                <FormLabel>{t('createIncomeDialog.fields.building')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          'createIncomeDialog.fields.buildingPlaceholder'
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.data?.map(building => (
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
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('createIncomeDialog.fields.description')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      'createIncomeDialog.fields.descriptionPlaceholder'
                    )}
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
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('createIncomeDialog.fields.amount')}</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min='0'
                      step='0.01'
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('createIncomeDialog.fields.category')}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='monthly_fees'>
                        {t('createIncomeDialog.categories.monthlyFees')}
                      </SelectItem>
                      <SelectItem value='parking'>
                        {t('createIncomeDialog.categories.parking')}
                      </SelectItem>
                      <SelectItem value='utilities'>
                        {t('createIncomeDialog.categories.utilities')}
                      </SelectItem>
                      <SelectItem value='maintenance'>
                        {t('createIncomeDialog.categories.maintenance')}
                      </SelectItem>
                      <SelectItem value='other'>
                        {t('createIncomeDialog.categories.other')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <FormField
              control={form.control}
              name='month'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('createIncomeDialog.fields.month')}</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min='1'
                      max='12'
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='year'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('createIncomeDialog.fields.year')}</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min='2020'
                      max='2050'
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='receivedDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('createIncomeDialog.fields.receivedDate')}
                  </FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='notes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('createIncomeDialog.fields.notes')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t(
                      'createIncomeDialog.fields.notesPlaceholder'
                    )}
                    className='resize-none'
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
              {t('buttons.cancel')}
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? t('buttons.creating') : t('buttons.createIncome')}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
}
