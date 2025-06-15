'use client';

import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Palette,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ProfileTabSuspense,
  SyndicateTabSuspense,
  NotificationsTabSuspense,
  SecurityTabSuspense,
  BillingTabSuspense,
  PreferencesTabSuspense,
} from './components/tab-wrappers';

export function SettingsContent() {
  const t = useTranslations();
  // URL state management for tabs
  const [currentTab, setCurrentTab] = useQueryState('tab', {
    defaultValue: 'profile',
    shallow: false,
  });

  return (
    <div className='space-y-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>
          {t('settings.title')}
        </h1>
        <p className='mt-2 text-gray-600'>{t('settings.description')}</p>
      </div>

      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        className='space-y-6'
      >
        <div className='flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8'>
          <aside className='w-full lg:w-1/5'>
            <TabsList className='bg-muted grid h-auto w-full grid-cols-3 gap-2 p-1 lg:h-auto lg:grid-cols-1 lg:flex-col'>
              {' '}
              <TabsTrigger
                value='profile'
                className='flex w-full items-center justify-start gap-2'
              >
                <User className='h-4 w-4' />
                <span className='hidden sm:inline lg:inline'>
                  {t('settings.profile')}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value='syndicate'
                className='flex w-full items-center justify-start gap-2'
              >
                <Building2 className='h-4 w-4' />
                <span className='hidden sm:inline lg:inline'>
                  {t('settings.syndicate')}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value='notifications'
                className='flex w-full items-center justify-start gap-2'
              >
                <Bell className='h-4 w-4' />
                <span className='hidden sm:inline lg:inline'>
                  {t('settings.notifications')}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value='security'
                className='flex w-full items-center justify-start gap-2'
              >
                <Shield className='h-4 w-4' />
                <span className='hidden sm:inline lg:inline'>
                  {t('settings.security')}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value='billing'
                className='flex w-full items-center justify-start gap-2'
              >
                <CreditCard className='h-4 w-4' />
                <span className='hidden sm:inline lg:inline'>
                  {t('settings.billing')}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value='preferences'
                className='flex w-full items-center justify-start gap-2'
              >
                <Palette className='h-4 w-4' />
                <span className='hidden sm:inline lg:inline'>
                  {t('settings.preferences')}
                </span>
              </TabsTrigger>
            </TabsList>
          </aside>

          <div className='flex-1 lg:max-w-4xl'>
            {/* Profile Tab */}
            <TabsContent value='profile' className='space-y-6'>
              <ProfileTabSuspense />
            </TabsContent>
            {/* Syndicate Tab */}
            <TabsContent value='syndicate' className='space-y-6'>
              <SyndicateTabSuspense />
            </TabsContent>
            {/* Notifications Tab - Integrated with new notification system */}
            <TabsContent value='notifications' className='space-y-6'>
              <NotificationsTabSuspense />
            </TabsContent>
            {/* Security Tab */}
            <TabsContent value='security' className='space-y-6'>
              <SecurityTabSuspense />
            </TabsContent>
            {/* Billing Tab */}
            <TabsContent value='billing' className='space-y-6'>
              <BillingTabSuspense />
            </TabsContent>
            {/* Preferences Tab */}{' '}
            <TabsContent value='preferences' className='space-y-6'>
              <PreferencesTabSuspense />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
