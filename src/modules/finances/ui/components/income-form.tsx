'use client';

import { useState, useEffect } from 'react';
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
  createIncomeSchema,
  updateIncomeSchema,
} from '@/modules/incomes/schema';
import type {
  CreateIncome,
  UpdateIncome,
  Income,
} from '@/modules/incomes/types';

interface IncomeFormProps {
  income?: Income;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const IncomeForm = ({
  income,
  onSuccess,
  onCancel,
}: IncomeFormProps) => {
  const t = useTranslations('finance.createIncomeDialog');
  const tCommon = useTranslations('common');
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!income;

  const { data: buildingsData = { data: [] } } = useQuery(
    trpc.buildings.getAll.queryOptions({})
  );
  const buildings = buildingsData.data || [];

  const form = useForm<CreateIncome | UpdateIncome>({
    resolver: zodResolver(isEditing ? updateIncomeSchema : createIncomeSchema),
    defaultValues: isEditing
      ? {
          id: income.id,
          buildingId: income.buildingId || '',
          unitId: income.unitId || '',
          amount: income.amount,
          description: income.description,
          category: income.category as
            | 'monthly_fees'
            | 'parking'
            | 'utilities'
            | 'maintenance'
            | 'other',
          month: income.month,
          year: income.year,
          receivedDate: income.receivedDate.toISOString().split('T')[0],
          notes: income.notes || '',
        }
      : {
          buildingId: '',
          unitId: '',
          amount: 0,
          description: '',
          category: 'monthly_fees',
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          receivedDate: new Date().toISOString().split('T')[0],
          notes: '',
        },
  });

  const selectedBuildingId = form.watch('buildingId'); // Get units data only for the selected building (server-side filtering)
  const { data: availableUnits = [] } = useQuery({
    ...trpc.units.getByBuilding.queryOptions({
      buildingId: selectedBuildingId || '',
    }),
    enabled: !!selectedBuildingId,
  });

  // Reset unitId when building changes
  useEffect(() => {
    if (!isEditing) {
      form.setValue('unitId', '');
    }
  }, [selectedBuildingId, form, isEditing]);

  const createIncome = useMutation(
    trpc.incomes.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.incomes.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.dashboard.getMissingPayments.queryOptions({})
        );
        form.reset();
        onSuccess?.();
      },
      onError: _error => {
        // Handle error
      },
    })
  );

  const updateIncome = useMutation(
    trpc.incomes.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.incomes.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.dashboard.getMissingPayments.queryOptions({})
        );
        onSuccess?.();
      },
      onError: _error => {
        // Handle error
      },
    })
  );

  const onSubmit = async (data: CreateIncome | UpdateIncome) => {
    setIsSubmitting(true);
    try {
      const submitData = {
        ...data,
        amount: Number(data.amount),
        buildingId: data.buildingId || undefined,
        unitId: data.unitId || undefined,
      };
      if (isEditing) {
        await updateIncome.mutateAsync({
          id: income.id,
          data: submitData as UpdateIncome,
        });
      } else {
        await createIncome.mutateAsync(submitData as CreateIncome);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const showUnitField =
    selectedBuildingId && form.watch('category') === 'monthly_fees';
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Building & Unit Selection Row */}
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
          {/* Unit Selection */}
          <FormField
            control={form.control}
            name='unitId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2'>
                  {t('fields.unit')}
                  {form.watch('category') === 'monthly_fees' &&
                    selectedBuildingId && (
                      <span className='text-muted-foreground text-xs'>
                        ({availableUnits.length} {t('fields.unitsAvailable')})
                      </span>
                    )}
                  {form.watch('category') === 'monthly_fees' &&
                    !selectedBuildingId && (
                      <span className='text-muted-foreground text-xs'>
                        ({t('fields.unitHelp')})
                      </span>
                    )}
                </FormLabel>
                <FormControl>
                  {showUnitField ? (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            availableUnits.length === 0
                              ? t('fields.noUnitsAvailable')
                              : t('fields.unitPlaceholder')
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {availableUnits.length === 0 ? (
                          <div className='text-muted-foreground px-2 py-1.5 text-sm'>
                            {t('fields.noUnitsInBuilding')}
                          </div>
                        ) : (
                          availableUnits.map(unit => (
                            <SelectItem key={unit.id} value={unit.id}>
                              Unit {unit.unitNumber} - Floor {unit.floor}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className='border-input bg-muted text-muted-foreground flex h-10 w-full items-center rounded-md border px-3 py-2 text-sm'>
                      {!selectedBuildingId
                        ? t('fields.unitDisabledBuilding')
                        : form.watch('category') !== 'monthly_fees'
                          ? t('fields.unitDisabledCategory')
                          : t('fields.unitPlaceholder')}
                    </div>
                  )}
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
                  <SelectItem value='monthly_fees'>
                    {t('categories.monthlyFees')}
                  </SelectItem>
                  <SelectItem value='parking'>
                    {t('categories.parking')}
                  </SelectItem>
                  <SelectItem value='utilities'>
                    {t('categories.utilities')}
                  </SelectItem>
                  <SelectItem value='maintenance'>
                    {t('categories.maintenance')}
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

        {/* Received Date */}
        <FormField
          control={form.control}
          name='receivedDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.receivedDate')}</FormLabel>
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
