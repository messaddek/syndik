'use client';

import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Button } from '../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Building } from '../../types';
import { Plus, Building2, MapPin, Users } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { BuildingForm } from './building-form';
import { createBuildingSchema } from '../../schema';
import { z } from 'zod';
import { ResponsiveDialog } from '@/components/responsive-dialog';

type BuildingFormData = z.infer<typeof createBuildingSchema>;

export function BuildingsList() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: buildings } = useSuspenseQuery(
    trpc.buildings.getAll.queryOptions({})
  );

  const createMutation = useMutation(
    trpc.buildings.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.buildings.getAll.queryOptions({}));
        setIsCreateOpen(false);
      },
    })
  );

  const handleCreateBuilding = (data: BuildingFormData) => {
    createMutation.mutate(data);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>Buildings</h2>
          <p className='text-gray-600'>Manage your residential properties</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Add Building
        </Button>
        <ResponsiveDialog
          title='Add New Building'
          description='Create a new residential building in your syndicate'
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
        >
          <BuildingForm
            onSubmit={handleCreateBuilding}
            isLoading={createMutation.isPending}
            onCancel={() => setIsCreateOpen(false)}
          />
        </ResponsiveDialog>
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
