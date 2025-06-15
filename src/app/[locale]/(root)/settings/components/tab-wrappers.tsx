'use client';

import { Suspense } from 'react';
import { ProfileTab } from './profile-tab';
import { SyndicateTab } from './syndicate-tab';
import { SecurityTab } from './security-tab';
import { BillingTab } from './billing-tab';
import { PreferencesTab } from './preferences-tab';
import { NotificationSettings } from '@/modules/notifications/ui/views/notification-settings';
import { Loader2 } from 'lucide-react';

// Individual tab skeleton
function TabSkeleton() {
  return (
    <div className='flex min-h-[400px] items-center justify-center'>
      <Loader2 className='h-8 w-8 animate-spin' />
    </div>
  );
}

// Profile tab with Suspense
export function ProfileTabSuspense() {
  return (
    <Suspense fallback={<TabSkeleton />}>
      <ProfileTab />
    </Suspense>
  );
}

// Syndicate tab with Suspense
export function SyndicateTabSuspense() {
  return (
    <Suspense fallback={<TabSkeleton />}>
      <SyndicateTab />
    </Suspense>
  );
}

// Notifications tab with Suspense
export function NotificationsTabSuspense() {
  return (
    <Suspense fallback={<TabSkeleton />}>
      <NotificationSettings />
    </Suspense>
  );
}

// Security tab with Suspense
export function SecurityTabSuspense() {
  return (
    <Suspense fallback={<TabSkeleton />}>
      <SecurityTab />
    </Suspense>
  );
}

// Billing tab with Suspense (no loading needed as it's all static/mock data)
export function BillingTabSuspense() {
  return (
    <Suspense fallback={<TabSkeleton />}>
      <BillingTab />
    </Suspense>
  );
}

// Preferences tab with Suspense (no loading needed as it's mostly static)
export function PreferencesTabSuspense() {
  return (
    <Suspense fallback={<TabSkeleton />}>
      <PreferencesTab />
    </Suspense>
  );
}
