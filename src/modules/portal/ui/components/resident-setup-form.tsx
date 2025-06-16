'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
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

export function ResidentSetupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();

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
        toast.success('Account setup completed successfully!');
        router.push('/portal');
      },
      onError: error => {
        toast.error(`Setup failed: ${error.message}`);
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
            Welcome to Syndik
          </CardTitle>
          <CardDescription>
            Complete your resident profile to access the portal
          </CardDescription>
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
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='John Doe' {...field} />
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
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='john.doe@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className='text-muted-foreground text-xs'>
                      This must match the email in your resident record
                    </p>
                  </FormItem>
                )}
              />{' '}
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <Phone className='h-4 w-4' />
                      Phone Number (Optional)
                    </FormLabel>
                    <FormControl>
                      <PhoneInput placeholder='+1 (555) 123-4567' {...field} />
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
                      Your Unit
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select your unit' />
                        </SelectTrigger>
                      </FormControl>{' '}
                      <SelectContent>
                        {unitsLoading ? (
                          <SelectItem value='loading' disabled>
                            Loading units...
                          </SelectItem>
                        ) : availableUnits.length === 0 ? (
                          <SelectItem value='no-units' disabled>
                            No units available
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
                      Select the unit you are registered to
                    </p>
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full'
                disabled={isSubmitting || setupMutation.isPending}
              >
                {isSubmitting ? 'Setting up...' : 'Complete Setup'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
