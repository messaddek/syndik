'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useTranslations } from 'next-intl';

import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Checkbox } from '@/components/ui/checkbox';
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
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Resident } from '../../types';
import { toast } from 'sonner';

interface ResidentFormProps {
  resident?: Resident;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ResidentForm = ({
  resident,
  onSuccess,
  onCancel,
}: ResidentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('residents.form');

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  // Create dynamic schema with translated messages
  const createFormSchema = () =>
    z.object({
      unitId: z.string().uuid(t('validation.unitRequired')),
      firstName: z.string().min(1, t('validation.firstNameRequired')),
      lastName: z.string().min(1, t('validation.lastNameRequired')),
      email: z.string().email(t('validation.emailRequired')),
      phone: z.string().optional(),
      isOwner: z.boolean(),
      isActive: z.boolean(),
      moveInDate: z
        .string()
        .refine(
          date => !isNaN(Date.parse(date)),
          t('validation.invalidMoveInDate')
        ),
      moveOutDate: z.string().optional().nullable(),
      emergencyContact: z.string().optional(),
      emergencyPhone: z.string().optional(),
      notes: z.string().optional(),
    });

  const formSchema = createFormSchema();
  type FormData = z.infer<typeof formSchema>;

  const { data: units, isLoading: unitsLoading } = useQuery(
    trpc.units.getAll.queryOptions({})
  );

  const createMutation = useMutation(
    trpc.residents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        onSuccess?.();
      },
      onError: error => {
        toast.error(`Failed to create resident: ${error.message}`);
      },
    })
  );

  const updateMutation = useMutation(
    trpc.residents.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        onSuccess?.();
      },
      onError: error => {
        toast.error(`Failed to update resident: ${error.message}`);
      },
    })
  );
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unitId: resident?.unitId || '',
      firstName: resident?.firstName || '',
      lastName: resident?.lastName || '',
      email: resident?.email || '',
      phone: resident?.phone || '',
      isOwner: resident?.isOwner ?? false,
      isActive: resident?.isActive ?? true,
      moveInDate: resident?.moveInDate || '',
      moveOutDate: resident?.moveOutDate || '',
      emergencyContact: resident?.emergencyContact || '',
      emergencyPhone: resident?.emergencyPhone || '',
      notes: resident?.notes || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    if (resident) {
      await updateMutation.mutateAsync({
        id: resident.id,
        data: {
          ...data,
          moveOutDate: data.moveOutDate || undefined,
        },
      });
    } else {
      await createMutation.mutateAsync({
        ...data,
        moveOutDate: data.moveOutDate || undefined,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('firstName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('firstNamePlaceholder')} {...field} />
                </FormControl>
                <div className='min-h-[20px]'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('lastName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('lastNamePlaceholder')} {...field} />
                </FormControl>
                <div className='min-h-[20px]'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder={t('emailPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <div className='min-h-[20px]'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phone')}</FormLabel>
                <FormControl>
                  <PhoneInput placeholder={t('phonePlaceholder')} {...field} />
                </FormControl>
                <div className='min-h-[20px]'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='unitId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('unit')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('unitPlaceholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {unitsLoading ? (
                    <SelectItem value='loading' disabled>
                      {t('loadingUnits')}
                    </SelectItem>
                  ) : units?.data.length === 0 ? (
                    <SelectItem value='no-units' disabled>
                      {t('noUnitsAvailable')}
                    </SelectItem>
                  ) : (
                    units?.data.map(unit => (
                      <SelectItem key={unit.id} value={unit.id}>
                        Unit {unit.unitNumber} - Floor {unit.floor}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='isOwner'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-y-0 space-x-3'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>{t('owner')}</FormLabel>
                <FormDescription>{t('ownerDescription')}</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='isActive'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-y-0 space-x-3'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>{t('active')}</FormLabel>
                <FormDescription>{t('activeDescription')}</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='moveInDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>{t('moveInDate')}</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t('moveInDatePlaceholder')}
                    maxDate={new Date()}
                    minDate={new Date('1900-01-01')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='moveOutDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>{t('moveOutDate')}</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t('moveOutDatePlaceholder')}
                    minDate={new Date('1900-01-01')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='emergencyContact'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('emergencyContact')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('emergencyContactPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <div className='min-h-[20px]'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='emergencyPhone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('emergencyPhone')}</FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder={t('emergencyPhonePlaceholder')}
                    {...field}
                  />
                </FormControl>
                <div className='min-h-[20px]'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('notes')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('notesPlaceholder')}
                  className='resize-none'
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end space-x-2'>
          <Button type='button' variant='outline' onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? t('submitting') : t('submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
