'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Bell, Mail, Smartphone, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  categoryPreferences: Record<string, boolean>;
  quietHours?: {
    start: string;
    end: string;
    enabled: boolean;
  };
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    categoryPreferences: {
      financial: true,
      maintenance: true,
      community: true,
      system: true,
      general: true,
    },
    quietHours: {
      start: '22:00',
      end: '08:00',
      enabled: false,
    },
  });
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Get current preferences
  const { data: currentPreferences, isLoading } = useQuery(
    trpc.notifications.getPreferences.queryOptions()
  );

  // Update preferences mutation
  const updatePreferencesMutation = useMutation(
    trpc.notifications.updatePreferences.mutationOptions({
      onSuccess: () => {
        toast.success('Notification preferences updated');
        queryClient.invalidateQueries(
          trpc.notifications.getPreferences.queryOptions()
        );
      },
      onError: error => {
        toast.error(`Failed to update preferences: ${error.message}`);
      },
    })
  );

  // Load current preferences when data is available
  useEffect(() => {
    if (currentPreferences) {
      setPreferences({
        emailNotifications: currentPreferences.emailNotifications,
        pushNotifications: currentPreferences.pushNotifications,
        smsNotifications: currentPreferences.smsNotifications,
        categoryPreferences:
          currentPreferences.categoryPreferences &&
          typeof currentPreferences.categoryPreferences === 'object' &&
          Object.keys(currentPreferences.categoryPreferences).length > 0
            ? (currentPreferences.categoryPreferences as Record<
                string,
                boolean
              >)
            : {
                financial: true,
                maintenance: true,
                community: true,
                system: true,
                general: true,
              },
        quietHours:
          currentPreferences.quietHours &&
          typeof currentPreferences.quietHours === 'object' &&
          'start' in currentPreferences.quietHours &&
          'end' in currentPreferences.quietHours &&
          'enabled' in currentPreferences.quietHours
            ? (currentPreferences.quietHours as {
                start: string;
                end: string;
                enabled: boolean;
              })
            : {
                start: '22:00',
                end: '08:00',
                enabled: false,
              },
      });
    }
  }, [currentPreferences]);

  const handleSave = () => {
    updatePreferencesMutation.mutate(preferences);
  };

  const handleCategoryChange = (category: string, enabled: boolean) => {
    setPreferences(prev => ({
      ...prev,
      categoryPreferences: {
        ...prev.categoryPreferences,
        [category]: enabled,
      },
    }));
  };
  const handleQuietHoursChange = (field: string, value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      quietHours: prev.quietHours
        ? {
            ...prev.quietHours,
            [field]: value,
          }
        : {
            start: field === 'start' ? (value as string) : '22:00',
            end: field === 'end' ? (value as string) : '08:00',
            enabled: field === 'enabled' ? (value as boolean) : false,
          },
    }));
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold'>Notification Settings</h1>
          <p className='text-muted-foreground mt-2'>Loading preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Notification Settings</h1>
        <p className='text-muted-foreground mt-2'>
          Manage how and when you receive notifications.
        </p>
      </div>

      {/* Delivery Methods */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Bell className='h-5 w-5' />
            Delivery Methods
          </CardTitle>
          <CardDescription>
            Choose how you want to receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Mail className='text-muted-foreground h-5 w-5' />
              <div>
                <Label className='text-base'>Email Notifications</Label>
                <div className='text-muted-foreground text-sm'>
                  Receive notifications via email
                </div>
              </div>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={checked =>
                setPreferences(prev => ({
                  ...prev,
                  emailNotifications: checked,
                }))
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Smartphone className='text-muted-foreground h-5 w-5' />
              <div>
                <Label className='text-base'>Push Notifications</Label>
                <div className='text-muted-foreground text-sm'>
                  Browser and mobile app notifications
                </div>
              </div>
            </div>
            <Switch
              checked={preferences.pushNotifications}
              onCheckedChange={checked =>
                setPreferences(prev => ({
                  ...prev,
                  pushNotifications: checked,
                }))
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <MessageSquare className='text-muted-foreground h-5 w-5' />
              <div>
                <Label className='text-base'>SMS Notifications</Label>
                <div className='text-muted-foreground text-sm'>
                  Get urgent alerts via text message
                </div>
              </div>
            </div>
            <Switch
              checked={preferences.smsNotifications}
              onCheckedChange={checked =>
                setPreferences(prev => ({ ...prev, smsNotifications: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Categories</CardTitle>
          <CardDescription>
            Choose which types of notifications you want to receive.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='text-lg'>💰</span>
              <div>
                <Label className='text-base'>Financial</Label>
                <div className='text-muted-foreground text-sm'>
                  Payment reminders, fee updates, statements
                </div>
              </div>
            </div>
            <Switch
              checked={preferences.categoryPreferences.financial}
              onCheckedChange={checked =>
                handleCategoryChange('financial', checked)
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='text-lg'>🔧</span>
              <div>
                <Label className='text-base'>Maintenance</Label>
                <div className='text-muted-foreground text-sm'>
                  Maintenance schedules, repairs, building updates
                </div>
              </div>
            </div>
            <Switch
              checked={preferences.categoryPreferences.maintenance}
              onCheckedChange={checked =>
                handleCategoryChange('maintenance', checked)
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='text-lg'>👥</span>
              <div>
                <Label className='text-base'>Community</Label>
                <div className='text-muted-foreground text-sm'>
                  Meetings, events, announcements
                </div>
              </div>
            </div>
            <Switch
              checked={preferences.categoryPreferences.community}
              onCheckedChange={checked =>
                handleCategoryChange('community', checked)
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='text-lg'>⚙️</span>
              <div>
                <Label className='text-base'>System</Label>
                <div className='text-muted-foreground text-sm'>
                  Portal updates, technical notifications
                </div>
              </div>
            </div>
            <Switch
              checked={preferences.categoryPreferences.system}
              onCheckedChange={checked =>
                handleCategoryChange('system', checked)
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='text-lg'>📋</span>
              <div>
                <Label className='text-base'>General</Label>
                <div className='text-muted-foreground text-sm'>
                  General updates and information
                </div>
              </div>
            </div>
            <Switch
              checked={preferences.categoryPreferences.general}
              onCheckedChange={checked =>
                handleCategoryChange('general', checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Quiet Hours</CardTitle>
          <CardDescription>
            Set times when you don&apos;t want to receive push notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <Label className='text-base'>Enable Quiet Hours</Label>
            <Switch
              checked={preferences.quietHours?.enabled || false}
              onCheckedChange={checked =>
                handleQuietHoursChange('enabled', checked)
              }
            />
          </div>

          {preferences.quietHours?.enabled && (
            <div className='grid grid-cols-2 gap-4 pt-4'>
              <div className='space-y-2'>
                <Label htmlFor='quiet-start'>Start Time</Label>
                <Input
                  id='quiet-start'
                  type='time'
                  value={preferences.quietHours.start}
                  onChange={e =>
                    handleQuietHoursChange('start', e.target.value)
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='quiet-end'>End Time</Label>
                <Input
                  id='quiet-end'
                  type='time'
                  value={preferences.quietHours.end}
                  onChange={e => handleQuietHoursChange('end', e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className='flex justify-end'>
        <Button
          onClick={handleSave}
          disabled={updatePreferencesMutation.isPending}
          className='min-w-[120px]'
        >
          {updatePreferencesMutation.isPending ? (
            <>
              <Settings className='mr-2 h-4 w-4 animate-spin' />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
}
