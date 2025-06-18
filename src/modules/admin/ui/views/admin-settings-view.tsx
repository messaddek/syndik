'use client';

import { useTranslations } from 'next-intl';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Save, AlertTriangle } from 'lucide-react';

export function AdminSettingsView() {
  const t = useTranslations('admin');

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t('settings')}</h1>
        <p className='text-muted-foreground'>{t('settings_description')}</p>
      </div>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('system_settings')}</CardTitle>
          <CardDescription>{t('system_settings_description')}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='app_name'>{t('application_name')}</Label>
              <Input id='app_name' defaultValue='Syndik.ma' />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='support_email'>{t('support_email')}</Label>
              <Input
                id='support_email'
                type='email'
                defaultValue='support@syndik.ma'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='maintenance_message'>
                {t('maintenance_message')}
              </Label>
              <Textarea
                id='maintenance_message'
                placeholder={t('maintenance_message_placeholder')}
                rows={3}
              />
            </div>
          </div>

          <Separator />

          <div className='space-y-4'>
            <h4 className='text-sm font-medium'>{t('system_toggles')}</h4>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>{t('maintenance_mode')}</Label>
                <div className='text-muted-foreground text-sm'>
                  {t('maintenance_mode_description')}
                </div>
              </div>
              <Switch />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>{t('new_registrations')}</Label>
                <div className='text-muted-foreground text-sm'>
                  {t('new_registrations_description')}
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>{t('email_notifications')}</Label>
                <div className='text-muted-foreground text-sm'>
                  {t('email_notifications_description')}
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className='flex justify-end'>
            <Button>
              <Save className='mr-2 h-4 w-4' />
              {t('save_changes')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('security_settings')}</CardTitle>
          <CardDescription>
            {t('security_settings_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='session_timeout'>{t('session_timeout')}</Label>
              <Input id='session_timeout' defaultValue='24' type='number' />
              <div className='text-muted-foreground text-sm'>
                {t('session_timeout_help')}
              </div>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='max_login_attempts'>
                {t('max_login_attempts')}
              </Label>
              <Input id='max_login_attempts' defaultValue='5' type='number' />
              <div className='text-muted-foreground text-sm'>
                {t('max_login_attempts_help')}
              </div>
            </div>
          </div>

          <Separator />

          <div className='space-y-4'>
            <h4 className='text-sm font-medium'>{t('security_toggles')}</h4>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>{t('require_2fa')}</Label>
                <div className='text-muted-foreground text-sm'>
                  {t('require_2fa_description')}
                </div>
              </div>
              <Switch />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>{t('password_expiry')}</Label>
                <div className='text-muted-foreground text-sm'>
                  {t('password_expiry_description')}
                </div>
              </div>
              <Switch />
            </div>
          </div>

          <div className='flex justify-end'>
            <Button>
              <Save className='mr-2 h-4 w-4' />
              {t('save_changes')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className='border-red-200'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-red-600'>
            <AlertTriangle className='h-4 w-4' />
            {t('danger_zone')}
          </CardTitle>
          <CardDescription>{t('danger_zone_description')}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <h4 className='text-sm font-medium'>{t('system_reset')}</h4>
            <p className='text-muted-foreground text-sm'>
              {t('system_reset_description')}
            </p>
            <Button variant='destructive' size='sm'>
              {t('reset_system')}
            </Button>
          </div>

          <Separator />

          <div className='space-y-2'>
            <h4 className='text-sm font-medium'>{t('clear_cache')}</h4>
            <p className='text-muted-foreground text-sm'>
              {t('clear_cache_description')}
            </p>
            <Button variant='outline' size='sm'>
              {t('clear_cache')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
