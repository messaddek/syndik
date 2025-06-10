'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import type { Resident } from '../../types';
import { ResidentForm } from './resident-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Plus,
  Edit,
  Trash2,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/use-confirm';

// Type for resident data coming from API (dates are serialized as strings)
type SerializedResident = Omit<Resident, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export function ResidentsList() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingResident, setEditingResident] =
    useState<SerializedResident | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete Resident',
    'Are you sure you want to delete this resident? This action cannot be undone.'
  );

  // Queries using proper tRPC patterns
  const { data: residentsData, isLoading: residentsLoading } = useQuery(
    trpc.residents.getAll.queryOptions({})
  );

  const { data: units, isLoading: unitsLoading } = useQuery(
    trpc.units.getAll.queryOptions({})
  );

  // Delete mutation only (create/update handled by ResidentForm)
  const deleteResident = useMutation(
    trpc.residents.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
      },
      onError: error => {
        toast.error(
          `Failed to delete resident: ${error.message || 'Unknown error'}`
        );
      },
    })
  );

  const handleEdit = (resident: SerializedResident) => {
    setEditingResident(resident);
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      await deleteResident.mutateAsync({ id });
    }
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setEditingResident(null);
  };

  const handleFormSuccess = () => {
    setIsCreateDialogOpen(false);
    setEditingResident(null);
  };

  const getUnitInfo = (unitId: string) => {
    return units?.find(u => u.id === unitId);
  }; // Extract residents data from paginated response
  const residents = (residentsData?.data ||
    []) as unknown as SerializedResident[];

  // Filter residents by selected unit
  const filteredResidents = selectedUnitId
    ? residents.filter(r => r.unitId === selectedUnitId)
    : residents;

  // Loading state
  if (residentsLoading || unitsLoading) {
    return (
      <div className='space-y-4'>
        <div className='h-8 animate-pulse rounded bg-gray-200' />
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className='h-64 animate-pulse rounded bg-gray-200' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Residents</h1>
          <p className='text-muted-foreground'>
            Manage residents and their unit assignments
          </p>
        </div>{' '}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingResident(null)}>
              <Plus className='mr-2 h-4 w-4' />
              Add Resident
            </Button>
          </DialogTrigger>
          <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
            <DialogHeader>
              <DialogTitle>
                {editingResident ? 'Edit Resident' : 'Add New Resident'}
              </DialogTitle>
              <DialogDescription>
                {editingResident
                  ? 'Update resident information and unit assignment.'
                  : 'Add a new resident to your building management system.'}
              </DialogDescription>
            </DialogHeader>
            <ResidentForm
              resident={
                editingResident
                  ? {
                      ...editingResident,
                      createdAt: new Date(editingResident.createdAt),
                      updatedAt: new Date(editingResident.updatedAt),
                    }
                  : undefined
              }
              onSuccess={handleFormSuccess}
              onCancel={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Unit Filter */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center space-x-2'>
          <Label htmlFor='unitFilter'>Filter by Unit:</Label>
          <Select value={selectedUnitId} onValueChange={setSelectedUnitId}>
            <SelectTrigger className='w-48'>
              <SelectValue placeholder='All units' />
            </SelectTrigger>{' '}
            <SelectContent>
              <SelectItem value=''>All units</SelectItem>
              {units?.map(unit => (
                <SelectItem key={unit.id} value={unit.id}>
                  Unit {unit.unitNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedUnitId && (
          <Button
            variant='outline'
            size='sm'
            onClick={() => setSelectedUnitId('')}
          >
            Clear Filter
          </Button>
        )}
      </div>

      {/* Residents Grid */}
      {filteredResidents?.length === 0 ? (
        <Alert>
          <AlertTriangle className='h-4 w-4' />
          <AlertDescription>
            {selectedUnitId
              ? 'No residents found for the selected unit.'
              : 'No residents found. Add your first resident to get started.'}
          </AlertDescription>
        </Alert>
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredResidents?.map(resident => {
            const unit = getUnitInfo(resident.unitId);
            return (
              <Card
                key={resident.id}
                className='transition-shadow hover:shadow-md'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <User className='h-5 w-5 text-blue-500' />
                      <div>
                        <CardTitle className='text-lg'>
                          {resident.firstName} {resident.lastName}
                        </CardTitle>{' '}
                        <CardDescription className='flex items-center space-x-1'>
                          <MapPin className='h-3 w-3' />
                          <span>Unit {unit?.unitNumber}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className='flex space-x-1'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEdit(resident)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDelete(resident.id)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <Badge variant={resident.isOwner ? 'default' : 'secondary'}>
                      {resident.isOwner ? (
                        <>
                          <UserCheck className='mr-1 h-3 w-3' />
                          Owner
                        </>
                      ) : (
                        <>
                          <User className='mr-1 h-3 w-3' />
                          Tenant
                        </>
                      )}
                    </Badge>
                    <Badge
                      variant={resident.isActive ? 'default' : 'destructive'}
                    >
                      {resident.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  <Separator />

                  <div className='space-y-2 text-sm'>
                    <div className='flex items-center space-x-2'>
                      <Mail className='h-4 w-4 text-gray-500' />
                      <span className='truncate'>{resident.email}</span>
                    </div>
                    {resident.phone && (
                      <div className='flex items-center space-x-2'>
                        <Phone className='h-4 w-4 text-gray-500' />
                        <span>{resident.phone}</span>
                      </div>
                    )}{' '}
                    <div className='flex items-center space-x-2'>
                      <Calendar className='h-4 w-4 text-gray-500' />
                      <span>
                        Moved in:{' '}
                        {new Date(resident.moveInDate).toLocaleDateString()}
                      </span>
                    </div>
                    {resident.moveOutDate && (
                      <div className='flex items-center space-x-2'>
                        <Calendar className='h-4 w-4 text-red-500' />
                        <span>
                          Moving out:{' '}
                          {new Date(resident.moveOutDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {resident.emergencyContact && (
                    <>
                      <Separator />
                      <div className='text-sm'>
                        <p className='font-medium'>Emergency Contact:</p>
                        <p className='text-gray-600'>
                          {resident.emergencyContact}
                        </p>
                        {resident.emergencyPhone && (
                          <p className='text-gray-600'>
                            {resident.emergencyPhone}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {resident.notes && (
                    <>
                      <Separator />
                      <div className='text-sm'>
                        <p className='font-medium'>Notes:</p>
                        <p className='line-clamp-2 text-gray-600'>
                          {resident.notes}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <ConfirmDialog />
    </div>
  );
}
