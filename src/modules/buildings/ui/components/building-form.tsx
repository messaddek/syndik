'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

type BuildingFormData = z.infer<typeof createBuildingSchema>;

interface BuildingFormProps {
  onSubmit: (data: BuildingFormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function BuildingForm({
  onSubmit,
  isLoading,
  onCancel,
}: BuildingFormProps) {
  const form = useForm<BuildingFormData>({
    resolver: zodResolver(createBuildingSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Morocco',
      totalUnits: 1,
      description: '',
    },
  });

  const handleSubmit = (values: BuildingFormData) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Name</FormLabel>
              <FormControl>
                <Input placeholder='e.g., Sunset Towers' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder='Street address' {...field} />
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
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder='City' {...field} />
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
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder='12345' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='totalUnits'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Units</FormLabel>
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Additional details about the building'
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optional description for the building
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end space-x-2 pt-4'>
          {onCancel && (
            <Button type='button' variant='outline' onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Building'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
