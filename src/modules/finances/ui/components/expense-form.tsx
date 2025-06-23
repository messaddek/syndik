'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
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
import { DatePicker } from '@/components/ui/date-picker';
import {
  createExpenseSchema,
  updateExpenseSchema,
} from '@/modules/expenses/schema';
import type {
  CreateExpense,
  UpdateExpense,
  Expense,
} from '@/modules/expenses/types';
import { formatDateToString, getTodayString } from '@/lib/date-utils';

interface ExpenseFormProps {
  expense?: Expense;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ExpenseForm = ({
  expense,
  onSuccess,
  onCancel,
}: ExpenseFormProps) => {
  const t = useTranslations('finance.createExpenseDialog');
  const tCommon = useTranslations('common');
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!expense;

  const { data: buildingsData = { data: [] } } = useQuery(
    trpc.buildings.getAll.queryOptions({})
  );
  const buildings = buildingsData.data || [];
  const form = useForm<CreateExpense | UpdateExpense>({
    resolver: zodResolver(
      isEditing ? updateExpenseSchema : createExpenseSchema
    ),
    defaultValues: isEditing
      ? {
          id: expense.id,
          buildingId: expense.buildingId || '',
          amount: expense.amount,
          description: expense.description,
          category: expense.category as
            | 'maintenance'
            | 'utilities'
            | 'cleaning'
            | 'security'
            | 'supplies'
            | 'professional_services'
            | 'other',
          vendor: expense.vendor || '',
          month: expense.month,
          year: expense.year,
          paidDate: formatDateToString(new Date(expense.paidDate)),
          receiptUrl: expense.receiptUrl || '',
          notes: expense.notes || '',
        }
      : {
          buildingId: '',
          amount: 0,
          description: '',
          category: 'maintenance',
          vendor: '',
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          paidDate: getTodayString(),
          receiptUrl: '',
          notes: '',
        },
  });
  const createExpense = useMutation(
    trpc.expenses.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.expenses.getAll.queryOptions({}));
        form.reset();
        onSuccess?.();
      },
      onError: (error: unknown) => {
        const message =
          error instanceof Error ? error.message : 'Failed to create expense';
        console.error('Create expense error:', message);
      },
    })
  );

  const updateExpense = useMutation(
    trpc.expenses.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.expenses.getAll.queryOptions({}));
        onSuccess?.();
      },
      onError: (error: unknown) => {
        const message =
          error instanceof Error ? error.message : 'Failed to update expense';
        console.error('Update expense error:', message);
      },
    })
  );
  const onSubmit = async (data: CreateExpense | UpdateExpense) => {
    setIsSubmitting(true);
    try {
      const submitData = {
        ...data,
        amount: Number(data.amount),
        buildingId: data.buildingId || undefined,
        receiptUrl: data.receiptUrl || undefined,
        vendor: data.vendor || undefined,
      };

      if (isEditing) {
        await updateExpense.mutateAsync({
          id: expense.id,
          data: submitData as UpdateExpense,
        });
      } else {
        await createExpense.mutateAsync(submitData as CreateExpense);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Building & Vendor Selection Row */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {/* Building Selection */}
          <FormField
            control={form.control}
            name='buildingId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.building')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t('fields.buildingPlaceholder')}
                      />
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

          {/* Vendor */}
          <FormField
            control={form.control}
            name='vendor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.vendor')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('fields.vendorPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.description')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('fields.descriptionPlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.amount')}</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='0.01'
                  min='0'
                  {...field}
                  onChange={e =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.category')}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='maintenance'>
                    {t('categories.maintenance')}
                  </SelectItem>
                  <SelectItem value='utilities'>
                    {t('categories.utilities')}
                  </SelectItem>
                  <SelectItem value='cleaning'>
                    {t('categories.cleaning')}
                  </SelectItem>
                  <SelectItem value='security'>
                    {t('categories.security')}
                  </SelectItem>
                  <SelectItem value='supplies'>
                    {t('categories.supplies')}
                  </SelectItem>
                  <SelectItem value='professional_services'>
                    {t('categories.professionalServices')}
                  </SelectItem>
                  <SelectItem value='other'>{t('categories.other')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Month */}
        <FormField
          control={form.control}
          name='month'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.month')}</FormLabel>
              <Select
                onValueChange={value => field.onChange(parseInt(value))}
                value={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <SelectItem key={month} value={month.toString()}>
                      {new Date(0, month - 1).toLocaleString('default', {
                        month: 'long',
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Year */}
        <FormField
          control={form.control}
          name='year'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.year')}</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min='2020'
                  max='2050'
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Paid Date */}
        <FormField
          control={form.control}
          name='paidDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.paidDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={value => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Receipt URL */}
        <FormField
          control={form.control}
          name='receiptUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.receiptUrl')}</FormLabel>
              <FormControl>
                <Input
                  type='url'
                  placeholder={t('fields.receiptUrlPlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.notes')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('fields.notesPlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className='flex justify-end gap-2'>
          <Button type='button' variant='outline' onClick={onCancel}>
            {tCommon('cancel')}
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting
              ? tCommon('loading')
              : isEditing
                ? tCommon('update')
                : tCommon('create')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
