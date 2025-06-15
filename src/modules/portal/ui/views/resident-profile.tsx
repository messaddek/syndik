'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export function ResidentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    notes: '',
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: residentProfile, isLoading } = useQuery(
    trpc.portal.getResidentProfile.queryOptions()
  );

  const updateMutation = useMutation(
    trpc.portal.updateResidentProfile.mutationOptions({
      onSuccess: () => {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        queryClient.invalidateQueries(
          trpc.portal.getResidentProfile.queryOptions()
        );
      },
      onError: error => {
        toast.error(`Failed to update profile: ${error.message}`);
      },
    })
  );

  // Initialize form data when profile loads
  React.useEffect(() => {
    if (residentProfile?.resident) {
      const { resident } = residentProfile;
      setFormData({
        phone: resident.phone || '',
        emergencyContact: resident.emergencyContact || '',
        emergencyPhone: resident.emergencyPhone || '',
        notes: resident.notes || '',
      });
    }
  }, [residentProfile]);

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    if (residentProfile?.resident) {
      const { resident } = residentProfile;
      setFormData({
        phone: resident.phone || '',
        emergencyContact: resident.emergencyContact || '',
        emergencyPhone: resident.emergencyPhone || '',
        notes: resident.notes || '',
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return <ResidentProfileSkeleton />;
  }

  if (!residentProfile) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-muted-foreground'>Unable to load profile</p>
      </div>
    );
  }

  const { resident, unit, building } = residentProfile;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/portal'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className='text-2xl font-bold'>My Profile</h1>
            <p className='text-muted-foreground'>
              Manage your personal information and contact details
            </p>
          </div>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <User className='mr-2 h-4 w-4' />
            Edit Profile
          </Button>
        ) : (
          <div className='flex space-x-2'>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                <>
                  <Save className='mr-2 h-4 w-4' />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Basic Information (Read-only) */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Basic Information
            </CardTitle>
            <CardDescription>
              Your basic details (managed by property management)
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label className='text-muted-foreground'>First Name</Label>
                <p className='font-medium'>{resident.firstName}</p>
              </div>
              <div>
                <Label className='text-muted-foreground'>Last Name</Label>
                <p className='font-medium'>{resident.lastName}</p>
              </div>
            </div>

            <div>
              <Label className='text-muted-foreground'>Email Address</Label>
              <div className='mt-1 flex items-center gap-2'>
                <Mail className='text-muted-foreground h-4 w-4' />
                <p className='font-medium'>{resident.email}</p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label className='text-muted-foreground'>Resident Type</Label>
                <div className='mt-1'>
                  <Badge variant={resident.isOwner ? 'default' : 'secondary'}>
                    {resident.isOwner ? 'Owner' : 'Tenant'}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className='text-muted-foreground'>Move-in Date</Label>
                <div className='mt-1 flex items-center gap-2'>
                  <Calendar className='text-muted-foreground h-4 w-4' />
                  <p className='font-medium'>
                    {new Date(resident.moveInDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unit Information (Read-only) */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MapPin className='h-5 w-5' />
              Unit Information
            </CardTitle>
            <CardDescription>Your current residence details</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {unit ? (
              <>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <Label className='text-muted-foreground'>Unit Number</Label>
                    <p className='font-medium'>{unit.unitNumber}</p>
                  </div>
                  <div>
                    <Label className='text-muted-foreground'>Floor</Label>
                    <p className='font-medium'>{unit.floor}</p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <Label className='text-muted-foreground'>Bedrooms</Label>
                    <p className='font-medium'>{unit.bedrooms}</p>
                  </div>
                  <div>
                    <Label className='text-muted-foreground'>Bathrooms</Label>
                    <p className='font-medium'>{unit.bathrooms}</p>
                  </div>
                </div>

                {building && (
                  <div>
                    <Label className='text-muted-foreground'>Building</Label>
                    <p className='font-medium'>{building.name}</p>
                    <p className='text-muted-foreground text-sm'>
                      {building.address}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className='text-muted-foreground'>No unit assigned</p>
            )}
          </CardContent>
        </Card>

        {/* Contact Information (Editable) */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Phone className='h-5 w-5' />
              Contact Information
            </CardTitle>
            <CardDescription>
              Your contact details and emergency contacts
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Label htmlFor='phone'>Phone Number</Label>
              {isEditing ? (
                <Input
                  id='phone'
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder='Enter phone number'
                />
              ) : (
                <p className='mt-1 font-medium'>
                  {resident.phone || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='emergencyContact'>Emergency Contact</Label>
              {isEditing ? (
                <Input
                  id='emergencyContact'
                  value={formData.emergencyContact}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      emergencyContact: e.target.value,
                    })
                  }
                  placeholder='Enter emergency contact name'
                />
              ) : (
                <p className='mt-1 font-medium'>
                  {resident.emergencyContact || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='emergencyPhone'>Emergency Phone</Label>
              {isEditing ? (
                <Input
                  id='emergencyPhone'
                  value={formData.emergencyPhone}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      emergencyPhone: e.target.value,
                    })
                  }
                  placeholder='Enter emergency contact phone'
                />
              ) : (
                <p className='mt-1 font-medium'>
                  {resident.emergencyPhone || 'Not provided'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes (Editable) */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>
              Any additional information or special requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor='notes'>Notes</Label>
              {isEditing ? (
                <Textarea
                  id='notes'
                  value={formData.notes}
                  onChange={e =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder='Enter any additional notes...'
                  rows={4}
                />
              ) : (
                <p className='mt-1 min-h-[100px] font-medium'>
                  {resident.notes || 'No additional notes'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ResidentProfileSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-8 w-24' />
          <div>
            <Skeleton className='h-8 w-32' />
            <Skeleton className='mt-2 h-4 w-64' />
          </div>
        </div>
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Cards Skeleton */}
      <div className='grid gap-6 md:grid-cols-2'>
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
              <Skeleton className='h-4 w-60' />
            </CardHeader>
            <CardContent className='space-y-4'>
              {[1, 2, 3].map(j => (
                <Skeleton key={j} className='h-4 w-full' />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
