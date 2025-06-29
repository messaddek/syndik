'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useTranslations } from 'next-intl';
import { User, Calendar, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { formatDateToString } from '@/lib/date-utils';

export const ProfileTab = () => {
  const t = useTranslations();
  const { user } = useUser();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Note: Profile photo management is handled by Clerk's user management system
  // - Photo uploads: Through Clerk's built-in photo upload flow
  // - Email changes: Require Clerk's email verification flow
  // - Phone updates: Require Clerk's phone verification flow
  // - Name changes: Synced between Clerk and our internal account system

  // Fetch real data from tRPC
  const { data: account, isLoading: accountLoading } = useQuery(
    trpc.accounts.getCurrentAccount.queryOptions()
  );
  // Profile form state (only editable fields)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'manager',
  });

  // Read-only display data from Clerk
  const displayData = {
    email: user?.primaryEmailAddress?.emailAddress || account?.email || '',
    phone: user?.primaryPhoneNumber?.phoneNumber || '',
  };

  // Update account mutation
  const updateAccountMutation = useMutation(
    trpc.accounts.updateAccount.mutationOptions({
      onSuccess: () => {
        toast.success('Profile updated successfully');
        queryClient.invalidateQueries(
          trpc.accounts.getCurrentAccount.queryOptions()
        );
      },
      onError: error => {
        toast.error('Failed to update profile: ' + error.message);
      },
    })
  );
  // Initialize form data when account loads
  useState(() => {
    if (user || account) {
      setFormData({
        firstName: user?.firstName || account?.name?.split(' ')[0] || '',
        lastName:
          user?.lastName || account?.name?.split(' ').slice(1).join(' ') || '',
        role: account?.role || 'manager',
      });
    }
  });
  const handlePhotoChange = async () => {
    try {
      // Clerk handles photo uploads through their user profile management
      // For now, we'll show a message directing users to Clerk's user profile
      toast.info(
        "Photo uploads are managed through your user profile. Please use Clerk's user management interface."
      );
    } catch (_error) {
      toast.error('Photo upload not available - requires Clerk integration');
    }
  };

  const handlePhotoRemove = async () => {
    try {
      // Photo removal through Clerk requires different approach
      // For now, show informational message
      toast.info(
        "Photo removal is managed through your user profile. Please use Clerk's user management interface."
      );
    } catch (_error) {
      toast.error('Photo removal failed - requires Clerk integration');
    }
  };
  const handleSave = async () => {
    try {
      // Update Clerk user data first (if user is available)
      if (user) {
        await user.update({
          firstName: formData.firstName,
          lastName: formData.lastName,
          // Note: Email and phone updates are handled separately through Clerk's verification flows
        });
      } // Update our internal account data (only editable fields)
      await updateAccountMutation.mutateAsync({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        // Note: Email and phone are managed by Clerk, not stored in our internal system
        // Note: Role updates might require additional backend support and authorization
      });
    } catch (_error) {
      // Error is handled by the mutation
    }
  };

  // Loading state
  if (accountLoading) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }
  // Get user info with fallbacks
  const currentUser = {
    id: user?.id || account?.id || '1',
    firstName:
      formData.firstName ||
      user?.firstName ||
      account?.name?.split(' ')[0] ||
      'User',
    lastName:
      formData.lastName ||
      user?.lastName ||
      account?.name?.split(' ').slice(1).join(' ') ||
      '',
    email: displayData.email || 'user@example.com',
    phone: displayData.phone || '',
    role:
      formData.role ||
      (account?.role === 'admin' ? 'Administrator' : 'Syndicate Manager'),
    avatar: user?.imageUrl || '',
    joinDate: account?.createdAt
      ? formatDateToString(account.createdAt)
      : '2024-01-01',
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5' />
          {t('settings.personalInformation')}
        </CardTitle>
        <CardDescription>
          {t('settings.personalInformationDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
          <div className='flex items-start gap-3'>
            <div className='text-primary'>
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div>
              <h5 className='font-medium text-blue-800'>
                {t('settings.accountSecurity')}
              </h5>
              <p className='mt-1 text-sm text-blue-700'>
                {t('settings.clerkSecurityNote')}
              </p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-6'>
          <Avatar className='h-20 w-20'>
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className='text-lg'>
              {currentUser.firstName[0]}
              {currentUser.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className='space-x-2'>
            <Button variant='outline' size='sm' onClick={handlePhotoChange}>
              {t('settings.changePhoto')}
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='text-red-600'
              onClick={handlePhotoRemove}
            >
              {t('settings.removePhoto')}
            </Button>
            <p className='text-muted-foreground text-xs'>
              {t('settings.clerkPhotoNote')}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>{t('residents.firstName')}</Label>
            <Input
              id='firstName'
              value={formData.firstName}
              onChange={e =>
                setFormData(prev => ({ ...prev, firstName: e.target.value }))
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='lastName'>{t('residents.lastName')}</Label>
            <Input
              id='lastName'
              value={formData.lastName}
              onChange={e =>
                setFormData(prev => ({ ...prev, lastName: e.target.value }))
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>{t('common.email')}</Label>
            <Input
              id='email'
              type='email'
              value={displayData.email}
              disabled
              className='bg-muted cursor-not-allowed'
            />
            <p className='text-muted-foreground text-xs'>
              {t('settings.clerkEmailNote')}
            </p>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phone'>{t('common.phone')}</Label>
            <Input
              id='phone'
              value={displayData.phone}
              disabled
              className='bg-muted cursor-not-allowed'
              placeholder={displayData.phone || t('settings.noPhoneSet')}
            />
            <p className='text-muted-foreground text-xs'>
              {t('settings.clerkPhoneNote')}
            </p>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='role'>{t('settings.role')}</Label>
            <Select
              value={formData.role}
              onValueChange={value =>
                setFormData(prev => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='manager'>
                  {t('settings.syndicateManager')}
                </SelectItem>
                <SelectItem value='admin'>
                  {t('settings.administrator')}
                </SelectItem>
                <SelectItem value='assistant'>
                  {t('settings.assistantManager')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label>{t('settings.memberSince')}</Label>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <Calendar className='h-4 w-4' />
              {new Date(currentUser.joinDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={updateAccountMutation.isPending}
          className='flex items-center gap-2'
        >
          {updateAccountMutation.isPending ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <Save className='h-4 w-4' />
          )}
          {updateAccountMutation.isPending
            ? t('common.saving')
            : t('common.saveChanges')}
        </Button>
      </CardContent>
    </Card>
  );
};
