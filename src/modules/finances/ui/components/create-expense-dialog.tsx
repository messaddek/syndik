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
import { createExpenseSchema } from '../../../expenses/schema';
import { z } from 'zod';
import { useTranslations } from 'next-intl';

type CreateExpenseForm = z.infer<typeof createExpenseSchema>;

interface CreateExpenseDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateExpenseDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateExpenseDialogProps) {
  const trpc = useTRPC();
  const t = useTranslations('finance');
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data } = useQuery(trpc.buildings.getAll.queryOptions({}));

  const form = useForm<CreateExpenseForm>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: 0,
      description: '',
      category: 'maintenance',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      paidDate: new Date().toISOString().split('T')[0],
      vendor: '',
      notes: '',
    },
  });

  const createExpense = useMutation(
    trpc.expenses.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.expenses.getAll.queryOptions({}));
        form.reset();
        onOpenChange?.(false);
        onSuccess?.();
      },
      onError: _error => {
        // Handle error - could show toast notification
      },
    })
  );

  const onSubmit = async (data: CreateExpenseForm) => {
    setIsSubmitting(true);
    try {
      await createExpense.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveDialog
      title={t('createExpenseDialog.title')}
      description={t('createExpenseDialog.description')}
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
                <FormLabel>
                  {t('createExpenseDialog.fields.building')}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          'createExpenseDialog.fields.buildingPlaceholder'
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
                  {t('createExpenseDialog.fields.description')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      'createExpenseDialog.fields.descriptionPlaceholder'
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
                  <FormLabel>
                    {t('createExpenseDialog.fields.amount')}
                  </FormLabel>
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
                    {t('createExpenseDialog.fields.category')}
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
                      <SelectItem value='maintenance'>
                        {t('createExpenseDialog.categories.maintenance')}
                      </SelectItem>
                      <SelectItem value='utilities'>
                        {t('createExpenseDialog.categories.utilities')}
                      </SelectItem>
                      <SelectItem value='cleaning'>
                        {t('createExpenseDialog.categories.cleaning')}
                      </SelectItem>
                      <SelectItem value='security'>
                        {t('createExpenseDialog.categories.security')}
                      </SelectItem>
                      <SelectItem value='supplies'>
                        {t('createExpenseDialog.categories.supplies')}
                      </SelectItem>
                      <SelectItem value='professional_services'>
                        {t(
                          'createExpenseDialog.categories.professionalServices'
                        )}
                      </SelectItem>
                      <SelectItem value='other'>
                        {t('createExpenseDialog.categories.other')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='vendor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('createExpenseDialog.fields.vendor')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      'createExpenseDialog.fields.vendorPlaceholder'
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-3 gap-4'>
            <FormField
              control={form.control}
              name='month'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('createExpenseDialog.fields.month')}</FormLabel>
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
                  <FormLabel>{t('createExpenseDialog.fields.year')}</FormLabel>
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
              name='paidDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('createExpenseDialog.fields.paidDate')}
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
            name='receiptUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('createExpenseDialog.fields.receiptUrl')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      'createExpenseDialog.fields.receiptUrlPlaceholder'
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='notes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('createExpenseDialog.fields.notes')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t(
                      'createExpenseDialog.fields.notesPlaceholder'
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
              {isSubmitting
                ? t('buttons.creating')
                : t('buttons.createExpense')}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
}
