'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/dialog';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Textarea } from '../../../../components/ui/textarea';
import { CreateBuilding, Building } from '../../types';
import { useForm } from 'react-hook-form';
import { Plus, Building2, MapPin, Users } from 'lucide-react';
import { useTRPC } from '@/trpc/client';

export function BuildingsList() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: buildings, isLoading } = useQuery(
    trpc.buildings.getAll.queryOptions()
  );

  const createMutation = useMutation(
    trpc.buildings.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.buildings.getAll.queryOptions());
        setIsCreateOpen(false);
        reset();
      },
    })
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBuilding>();

  const onSubmit = (data: CreateBuilding) => {
    createMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='text-lg'>Loading buildings...</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>Buildings</h2>
          <p className='text-gray-600'>Manage your residential properties</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add Building
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-md'>
            <DialogHeader>
              <DialogTitle>Add New Building</DialogTitle>
              <DialogDescription>
                Create a new residential building in your syndicate
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div>
                <Label htmlFor='name'>Building Name</Label>
                <Input
                  id='name'
                  {...register('name', {
                    required: 'Building name is required',
                  })}
                  placeholder='e.g., Sunset Towers'
                />
                {errors.name && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor='address'>Address</Label>
                <Input
                  id='address'
                  {...register('address', { required: 'Address is required' })}
                  placeholder='Street address'
                />
                {errors.address && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='city'>City</Label>
                  <Input
                    id='city'
                    {...register('city', { required: 'City is required' })}
                    placeholder='City'
                  />
                  {errors.city && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor='postalCode'>Postal Code</Label>
                  <Input
                    id='postalCode'
                    {...register('postalCode', {
                      required: 'Postal code is required',
                    })}
                    placeholder='12345'
                  />
                  {errors.postalCode && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor='totalUnits'>Total Units</Label>
                <Input
                  id='totalUnits'
                  type='number'
                  {...register('totalUnits', {
                    required: 'Total units is required',
                    valueAsNumber: true,
                    min: { value: 1, message: 'Must have at least 1 unit' },
                  })}
                  placeholder='20'
                />
                {errors.totalUnits && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.totalUnits.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor='description'>Description (Optional)</Label>
                <Textarea
                  id='description'
                  {...register('description')}
                  placeholder='Additional details about the building'
                  rows={3}
                />
              </div>

              <div className='flex justify-end space-x-2 pt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creating...' : 'Create Building'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {buildings && buildings.length === 0 ? (
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-12'>
            <Building2 className='mb-4 h-12 w-12 text-gray-400' />
            <h3 className='mb-2 text-lg font-semibold'>No buildings yet</h3>
            <p className='mb-4 text-center text-gray-600'>
              Start by adding your first residential building to manage.
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className='mr-2 h-4 w-4' />
              Add Your First Building
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {buildings?.map((building: Building) => (
            <Card
              key={building.id}
              className='transition-shadow hover:shadow-lg'
            >
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Building2 className='mr-2 h-5 w-5' />
                  {building.name}
                </CardTitle>
                <CardDescription className='flex items-center'>
                  <MapPin className='mr-1 h-4 w-4' />
                  {building.city}, {building.country}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>Total Units</span>
                    <Badge variant='secondary'>
                      <Users className='mr-1 h-3 w-3' />
                      {building.totalUnits}
                    </Badge>
                  </div>
                  <p className='line-clamp-2 text-sm text-gray-600'>
                    {building.description || 'No description provided'}
                  </p>
                  <div className='flex space-x-2 pt-2'>
                    <Button variant='outline' size='sm' className='flex-1'>
                      View Details
                    </Button>
                    <Button variant='outline' size='sm' className='flex-1'>
                      Manage Units
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
