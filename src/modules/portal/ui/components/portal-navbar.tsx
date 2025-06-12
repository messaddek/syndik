'use client';

import { Search, Building2, LayoutDashboard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { NotificationDropdown } from '@/modules/notifications/ui/components/notification-dropdown';
import { useRealtimeNotifications } from '@/modules/notifications/hooks/use-realtime-notifications';
import { OrgSwitcher } from '@/components/org-switcher';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export function PortalNavbar() {
  // Initialize real-time notifications
  useRealtimeNotifications();
  const router = useRouter();

  const handleDashboardAccess = () => {
    // Navigate to org-redirect which will handle role-based routing
    router.push('/org-redirect');
  };

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
        </div>{' '}
        {/* Organization Switcher & Navigation */}
        <div className='flex items-center gap-3'>
          {/* Organization Switcher - Desktop */}
          <div className='hidden md:block'>
            <OrgSwitcher appearance='compact' />
          </div>

          {/* Dashboard Access Button */}
          <Button
            variant='outline'
            size='sm'
            onClick={handleDashboardAccess}
            className='hidden items-center gap-2 sm:flex'
          >
            <LayoutDashboard className='h-4 w-4' />
            <span>Dashboard</span>
          </Button>

          {/* Mobile Organization Switcher */}
          <div className='block md:hidden'>
            <Button variant='outline' size='sm' asChild className='w-auto px-2'>
              <Link href='/org-switcher'>
                <Building2 className='h-4 w-4' />
              </Link>
            </Button>
          </div>

          <ModeToggle />
          {/* Notifications */}
          <NotificationDropdown />
        </div>
      </div>
    </header>
  );
}
