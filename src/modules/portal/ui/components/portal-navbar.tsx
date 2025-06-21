'use client';

import { Search, LayoutDashboard } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { NotificationDropdown } from '@/modules/notifications/ui/components/notification-dropdown';
import { useRealtimeNotifications } from '@/modules/notifications/hooks/use-realtime-notifications';
import { OrgSwitcher } from '@/components/org-switcher';
import { useRouter } from '@/i18n/navigation';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

export const PortalNavbar = () => {
  // Initialize real-time notifications
  useRealtimeNotifications();
  const router = useRouter();
  const t = useTranslations('portal.navbar');

  const handleDashboardAccess = () => {
    // Navigate to org-redirect which will handle role-based routing
    router.push('/org-redirect');
  };
  return (
    <header className='bg-background sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b px-2 sm:px-4'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />

      {/* Mobile Layout */}
      <div className='flex w-full items-center justify-between lg:hidden'>
        
        {/* Mobile Search - Icon Only */}
        <div className='max-w-[200px] flex-1'>
          <div className='relative'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <Input placeholder={t('searchMobile')} className='pl-9 text-sm' />
          </div>
        </div>
        {/* Mobile Center - Organization Switcher */}
        <div className='mx-2 max-w-[150px]'>
          <OrgSwitcher appearance='compact' />
        </div>
        {/* Mobile Right - Controls */}
        <div className='flex items-center gap-1'>
          <LanguageSwitcher />
          <ModeToggle />
          <NotificationDropdown />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden flex-1 items-center justify-between lg:flex'>
        
        {/* Desktop Search */}
        <div className='max-w-md flex-1'>
          <div className='relative'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <Input placeholder={t('searchDesktop')} className='pl-9' />
          </div>
        </div>
        {/* Desktop Center - Organization Controls */}
        <div className='flex items-center gap-4'>
          <OrgSwitcher appearance='compact' /> {/* Dashboard Access Button */}
          <Button
            variant='outline'
            size='sm'
            onClick={handleDashboardAccess}
            className='flex items-center gap-2'
          >
            <LayoutDashboard className='h-4 w-4' />
            <span>{t('dashboard')}</span>
          </Button>
        </div>
        {/* Desktop Right - User Controls */}
        <div className='flex items-center gap-3'>
          <LanguageSwitcher />
          <ModeToggle />
          <NotificationDropdown />
        </div>
      </div>
    </header>
  );
}

