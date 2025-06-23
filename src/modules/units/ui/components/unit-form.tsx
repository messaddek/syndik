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
import { createUnitSchema, updateUnitSchema } from '../../schema';
import type { CreateUnit, Unit, UpdateUnit } from '../../types';

interface UnitFormProps {
  unit?: Unit;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const UnitForm = ({ unit, onSuccess, onCancel }: UnitFormProps) => {
  const t = useTranslations('units');
  const tCommon = useTranslations('common');
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!unit;

  const { data: buildingsData = { data: [] } } = useQuery(
    trpc.buildings.getAll.queryOptions({})
  );
  const buildings = buildingsData.data || [];

  const form = useForm<CreateUnit | UpdateUnit>({
    resolver: zodResolver(isEditing ? updateUnitSchema : createUnitSchema),
    defaultValues: isEditing
      ? {
          buildingId: unit.buildingId,
          unitNumber: unit.unitNumber,
          floor: unit.floor,
          bedrooms: unit.bedrooms,
          bathrooms: unit.bathrooms,
          monthlyFee: unit.monthlyFee,
          description: unit.description || '',
          area: unit.area || undefined,
        }
      : {
          unitNumber: '',
          floor: 0,
          bedrooms: 1,
          bathrooms: 1,
          monthlyFee: 0,
          description: '',
          buildingId: '',
          area: undefined,
        },
  });

  const createUnit = useMutation(
    trpc.units.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.units.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        form.reset();
        onSuccess?.();
      },
      onError: _error => {
        // Handle error - could show toast notification
      },
    })
  );

  const updateUnit = useMutation(
    trpc.units.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.units.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        onSuccess?.();
      },
      onError: _error => {
        // Handle error - could show toast notification
      },
    })
  );
  const onSubmit = async (data: CreateUnit | UpdateUnit) => {
    setIsSubmitting(true);
    try {
      if (isEditing && unit) {
        await updateUnit.mutateAsync({ id: unit.id, data });
      } else {
        await createUnit.mutateAsync(data as CreateUnit);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        
        <FormField
          control={form.control}
          name='buildingId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.building')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.selectBuilding')} />
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
        <div className='grid grid-cols-2 gap-4'>
          
          <FormField
            control={form.control}
            name='unitNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.unitNumber')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.unitNumberPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='floor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('floor')}</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min='0'
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          
          <FormField
            control={form.control}
            name='bedrooms'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('bedrooms')}</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min='1'
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
            name='bathrooms'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('bathrooms')}</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min='1'
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          
          <FormField
            control={form.control}
            name='area'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.areaSquareMeters')}</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min='0'
                    step='0.01'
                    placeholder={t('form.optional')}
                    {...field}
                    onChange={e =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='monthlyFee'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.monthlyFeeDollar')}</FormLabel>
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
        </div>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('portal.details.description')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('form.descriptionPlaceholder')}
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end space-x-2 pt-4'>
          <Button type='button' variant='outline' onClick={onCancel}>
            {tCommon('cancel')}
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting
              ? isEditing
                ? t('form.updating')
                : t('form.creating')
              : isEditing
                ? t('form.updateUnit')
                : t('form.createUnit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

