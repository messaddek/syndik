'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { NotificationDropdown } from '@/modules/notifications/ui/components/notification-dropdown';
import { useRealtimeNotifications } from '@/modules/notifications/hooks/use-realtime-notifications';

export function PortalNavbar() {
  // Initialize real-time notifications
  useRealtimeNotifications();

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />

      <div className='flex flex-1 items-center justify-between'>
        {/* Search */}
        <div className='max-w-md flex-1'>
          <div className='relative'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <Input
              placeholder='Search announcements, payments...'
              className='pl-9'
            />
          </div>
        </div>

        {/* Notifications */}
        <div className='flex items-center gap-2'>
          <NotificationDropdown />
        </div>
      </div>
    </header>
  );
}
