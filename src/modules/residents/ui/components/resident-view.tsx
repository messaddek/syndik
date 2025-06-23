'use client';

import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useTRPC } from '@/trpc/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  User,
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Mail,
  Calendar,
  UserCheck,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { ResidentForm } from './resident-form';
import { useConfirm } from '@/hooks/use-confirm';
import { getTodayString } from '@/lib/date-utils';

interface ResidentViewProps {
  id: string;
  _searchParams?: Record<string, string | string[] | undefined>;
}

export const ResidentView = ({ id, _searchParams }: ResidentViewProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations('residents');

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    t('confirmDelete.title'),
    t('confirmDelete.description'),
    true
  );

  // Fetch resident data
  const { data: resident } = useSuspenseQuery(
    trpc.residents.getById.queryOptions({ id })
  ); // Fetch unit data if resident has a unit
  const { data: unit } = useQuery({
    ...trpc.units.getById.queryOptions({ id: resident?.unitId || '' }),
    enabled: !!resident?.unitId,
  });

  // Fetch building data if unit exists
  const { data: building } = useQuery({
    ...trpc.buildings.getById.queryOptions({ id: unit?.buildingId || '' }),
    enabled: !!unit?.buildingId,
  });
  // Delete mutation
  const deleteMutation = useMutation(
    trpc.residents.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        router.push('/residents');
      },
    })
  );

  // Move out mutation
  const moveOutMutation = useMutation(
    trpc.residents.moveOut.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.residents.getById.queryOptions({ id })
        );
        queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
      },
    })
  );
  const handleUpdateResident = () => {
    setIsEditDialogOpen(false);
    queryClient.invalidateQueries(trpc.residents.getById.queryOptions({ id }));
    queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
    queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
  };

  const handleDeleteResident = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      deleteMutation.mutate({ id });
    }
  };
  const handleMoveOut = () => {
    const moveOutDate = getTodayString();
    moveOutMutation.mutate({ id, moveOutDate });
  };

  if (!resident) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-muted-foreground'>Resident not found</p>
      </div>
    );
  }

  return (
    <>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/residents'>
                <div className='flex items-center gap-x-2'>
                  <ArrowLeft className='h-4 w-4' />
                  Back to Residents
                </div>
              </Link>
            </Button>
            <div>
              <div className='flex items-center space-x-2'>
                <User className='h-6 w-6 text-purple-600' />
                <h1 className='text-3xl font-bold'>
                  {resident.firstName} {resident.lastName}
                </h1>
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
                <Badge variant={resident.isActive ? 'default' : 'destructive'}>
                  {resident.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              {unit && building && (
                <div className='text-muted-foreground mt-1 flex items-center space-x-1'>
                  <MapPin className='h-4 w-4' />
                  <span>
                    Unit {unit.unitNumber} - {building.name}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='outline' onClick={() => setIsEditDialogOpen(true)}>
              <div className='flex items-center gap-x-2'>
                <Edit className='h-4 w-4' />
                Edit
              </div>
            </Button>
            {resident.isActive && (
              <Button variant='outline' onClick={handleMoveOut}>
                Move Out
              </Button>
            )}
            <Button variant='destructive' onClick={handleDeleteResident}>
              <div className='flex items-center gap-x-2'>
                <Trash2 className='h-4 w-4' />
                Delete
              </div>
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Move-in Date
              </CardTitle>
              <Calendar className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {new Date(resident.moveInDate).toLocaleDateString()}
              </div>
              <p className='text-muted-foreground text-xs'>
                {Math.floor(
                  (new Date().getTime() -
                    new Date(resident.moveInDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}
                days ago
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Contact</CardTitle>
              <Mail className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-medium'>{resident.email}</div>
              <p className='text-muted-foreground text-xs'>
                {resident.phone || 'No phone number'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Status</CardTitle>
              <User className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {resident.isOwner ? 'Owner' : 'Tenant'}
              </div>
              <p className='text-muted-foreground text-xs'>
                {resident.isActive ? 'Currently active' : 'Moved out'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Unit</CardTitle>
              <MapPin className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {unit ? `Unit ${unit.unitNumber}` : 'No Unit'}
              </div>
              <p className='text-muted-foreground text-xs'>
                {building ? building.name : 'No building assigned'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Resident Details */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Contact details and personal information
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    First Name
                  </p>
                  <p className='text-sm'>{resident.firstName}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Last Name
                  </p>
                  <p className='text-sm'>{resident.lastName}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Email
                  </p>
                  <p className='text-sm'>{resident.email}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Phone
                  </p>
                  <p className='text-sm'>{resident.phone || 'Not provided'}</p>
                </div>
              </div>

              {(resident.emergencyContact || resident.emergencyPhone) && (
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Emergency Contact
                  </p>
                  <p className='text-sm'>
                    {resident.emergencyContact}
                    {resident.emergencyPhone && ` - ${resident.emergencyPhone}`}
                  </p>
                </div>
              )}

              {resident.notes && (
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Notes
                  </p>
                  <p className='text-sm'>{resident.notes}</p>
                </div>
              )}

              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Created
                </p>
                <p className='text-sm'>
                  {new Date(resident.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tenancy Information</CardTitle>
              <CardDescription>Residence details and history</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Move-in Date
                  </p>
                  <p className='text-sm'>
                    {new Date(resident.moveInDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Move-out Date
                  </p>
                  <p className='text-sm'>
                    {resident.moveOutDate
                      ? new Date(resident.moveOutDate).toLocaleDateString()
                      : 'Current resident'}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Resident Type
                  </p>
                  <p className='text-sm'>
                    {resident.isOwner ? 'Owner' : 'Tenant'}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Status
                  </p>
                  <p className='text-sm'>
                    {resident.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>

              {unit && building && (
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Current Unit
                  </p>
                  <div className='flex items-center space-x-2'>
                    <Link
                      href={`/units/${unit.id}`}
                      className='text-primary text-sm hover:underline'
                    >
                      Unit {unit.unitNumber}
                    </Link>
                    <span className='text-muted-foreground text-sm'>in</span>
                    <Link
                      href={`/buildings/${building.id}`}
                      className='text-primary text-sm hover:underline'
                    >
                      {building.name}
                    </Link>
                  </div>
                  <p className='text-muted-foreground mt-1 text-xs'>
                    Floor {unit.floor} • {unit.bedrooms} bed • {unit.bathrooms}
                    bath
                  </p>
                </div>
              )}

              <div className='flex space-x-2 pt-4'>
                {unit && (
                  <Button variant='outline' size='sm' asChild>
                    <Link href={`/units/${unit.id}`}>View Unit Details</Link>
                  </Button>
                )}
                {building && (
                  <Button variant='outline' size='sm' asChild>
                    <Link href={`/buildings/${building.id}`}>
                      View Building
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Dialog */}
      <ResponsiveDialog
        title='Edit Resident'
        description='Update the resident information'
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <ResidentForm
          resident={resident}
          onSuccess={handleUpdateResident}
          onCancel={() => setIsEditDialogOpen(false)}
        />
      </ResponsiveDialog>

      <ConfirmDialog />
    </>
  );
};
