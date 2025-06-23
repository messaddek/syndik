'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useTRPC } from '@/trpc/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { residentSetupSchema } from '@/modules/portal/schema';
import { Home, User, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof residentSetupSchema>;

export const ResidentSetupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();
  const t = useTranslations('portal.setup');

  const form = useForm<FormData>({
    resolver: zodResolver(residentSetupSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      unitId: '',
    },
  });

  // Get available units
  const { data: availableUnits = [], isLoading: unitsLoading } = useQuery(
    trpc.portal.getAvailableUnits.queryOptions()
  );
  // Setup mutation
  const setupMutation = useMutation(
    trpc.portal.setupResidentAccount.mutationOptions({
      onSuccess: () => {
        toast.success(t('successMessage'));
        router.push('/portal');
      },
      onError: error => {
        toast.error(`${t('errorMessage')}: ${error.message}`);
      },
    })
  );

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await setupMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
            <Home className='text-primary h-6 w-6' />
          </div>
          <CardTitle className='text-2xl font-bold'>
            {t('welcomeTitle')}
          </CardTitle>
          <CardDescription>{t('welcomeDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    
                    <FormLabel className='flex items-center gap-2'>
                      <User className='h-4 w-4' />
                      {t('fullName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('fullNamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    
                    <FormLabel className='flex items-center gap-2'>
                      <Mail className='h-4 w-4' />
                      {t('emailAddress')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder={t('emailPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className='text-muted-foreground text-xs'>
                      {t('emailNote')}
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    
                    <FormLabel className='flex items-center gap-2'>
                      <Phone className='h-4 w-4' />
                      {t('phoneNumber')}
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder={t('phonePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='unitId'
                render={({ field }) => (
                  <FormItem>
                    
                    <FormLabel className='flex items-center gap-2'>
                      <MapPin className='h-4 w-4' />
                      {t('yourUnit')}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectUnit')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unitsLoading ? (
                          <SelectItem value='loading' disabled>
                            {t('loadingUnits')}
                          </SelectItem>
                        ) : availableUnits.length === 0 ? (
                          <SelectItem value='no-units' disabled>
                            {t('noUnitsAvailable')}
                          </SelectItem>
                        ) : (
                          availableUnits.map(({ unit, building }) => (
                            <SelectItem key={unit.id} value={unit.id}>
                              Unit {unit.unitNumber}
                              {building && ` - ${building.name}`}
                              {unit.floor && ` (Floor ${unit.floor})`}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <p className='text-muted-foreground text-xs'>
                      {t('unitNote')}
                    </p>
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full'
                disabled={isSubmitting || setupMutation.isPending}
              >
                {isSubmitting ? t('settingUp') : t('completeSetup')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

