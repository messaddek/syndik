'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Shield, Lock, Eye, EyeOff, Save, Loader2 } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export function SecurityTab() {
  const { user } = useUser();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Fetch user preferences
  const { data: userPreferences, isLoading: preferencesLoading } = useQuery(
    trpc.accounts.getUserPreferences.queryOptions()
  );

  // Update preferences mutation
  const updatePreferencesMutation = useMutation(
    trpc.accounts.updateUserPreferences.mutationOptions({
      onSuccess: () => {
        toast.success('Security settings updated successfully');
        queryClient.invalidateQueries(
          trpc.accounts.getUserPreferences.queryOptions()
        );
      },
      onError: error => {
        toast.error('Failed to update security settings: ' + error.message);
      },
    })
  );

  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    dataSharing: false,
    analytics: true,
    marketing: false,
  });

  // Update privacy state when real data loads
  useEffect(() => {
    if (userPreferences?.privacy) {
      setPrivacy(userPreferences.privacy);
    }
  }, [userPreferences]);

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwords.new.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    // TODO: Implement password change functionality
    // This would typically go through Clerk's user management
    toast.error(
      'Password change not yet implemented - requires Clerk integration'
    );
  };

  const handlePrivacyUpdate = async () => {
    try {
      await updatePreferencesMutation.mutateAsync({
        privacy,
        notifications: userPreferences?.notifications || {},
      });
    } catch (_error) {
      // Error is handled by the mutation
    }
  };

  // Loading state
  if (preferencesLoading) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  const lastLogin = user?.lastSignInAt || new Date();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Shield className='h-5 w-5' />
          Security Settings
        </CardTitle>
        <CardDescription>
          Manage your password and security preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <h4 className='text-lg font-semibold'>Change Password</h4>
          <div className='space-y-2'>
            <Label htmlFor='currentPassword'>Current Password</Label>
            <div className='relative'>
              <Input
                id='currentPassword'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter current password'
                value={passwords.current}
                onChange={e =>
                  setPasswords(prev => ({ ...prev, current: e.target.value }))
                }
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='newPassword'>New Password</Label>
            <Input
              id='newPassword'
              type='password'
              placeholder='Enter new password'
              value={passwords.new}
              onChange={e =>
                setPasswords(prev => ({ ...prev, new: e.target.value }))
              }
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm New Password</Label>
            <Input
              id='confirmPassword'
              type='password'
              placeholder='Confirm new password'
              value={passwords.confirm}
              onChange={e =>
                setPasswords(prev => ({ ...prev, confirm: e.target.value }))
              }
            />
          </div>

          <Button
            onClick={handlePasswordChange}
            variant='outline'
            className='flex items-center gap-2'
          >
            <Lock className='h-4 w-4' />
            Change Password
          </Button>
          <p className='text-muted-foreground text-xs'>
            Note: Password change requires Clerk integration (not yet
            implemented)
          </p>
        </div>

        <Separator />

        <div className='space-y-4'>
          <h4 className='text-lg font-semibold'>Privacy Settings</h4>

          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label className='text-base'>Profile Visibility</Label>
              <div className='text-sm text-gray-500'>
                Make your profile visible to other residents
              </div>
            </div>
            <Switch
              checked={privacy.profileVisible}
              onCheckedChange={checked =>
                setPrivacy(prev => ({
                  ...prev,
                  profileVisible: checked,
                }))
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label className='text-base'>Data Sharing</Label>
              <div className='text-sm text-gray-500'>
                Share anonymized data for platform improvements
              </div>
            </div>
            <Switch
              checked={privacy.dataSharing}
              onCheckedChange={checked =>
                setPrivacy(prev => ({
                  ...prev,
                  dataSharing: checked,
                }))
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label className='text-base'>Analytics</Label>
              <div className='text-sm text-gray-500'>
                Help us improve by sharing usage analytics
              </div>
            </div>
            <Switch
              checked={privacy.analytics}
              onCheckedChange={checked =>
                setPrivacy(prev => ({ ...prev, analytics: checked }))
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label className='text-base'>Marketing Communications</Label>
              <div className='text-sm text-gray-500'>
                Receive promotional emails and newsletters
              </div>
            </div>
            <Switch
              checked={privacy.marketing}
              onCheckedChange={checked =>
                setPrivacy(prev => ({ ...prev, marketing: checked }))
              }
            />
          </div>

          <Button
            onClick={handlePrivacyUpdate}
            disabled={updatePreferencesMutation.isPending}
            className='flex items-center gap-2'
          >
            {updatePreferencesMutation.isPending ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Save className='h-4 w-4' />
            )}
            {updatePreferencesMutation.isPending
              ? 'Saving...'
              : 'Save Privacy Settings'}
          </Button>
        </div>

        <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
          <div className='flex items-start gap-3'>
            <Shield className='mt-0.5 h-5 w-5 text-yellow-600' />
            <div>
              <h5 className='font-medium text-yellow-800'>Security Status</h5>
              <p className='mt-1 text-sm text-yellow-700'>
                Your account is secure. Last login:{' '}
                {new Date(lastLogin).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
