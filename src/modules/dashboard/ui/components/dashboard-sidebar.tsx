'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Building2,
  Users,
  Home,
  TrendingUp,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
} from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OrganizationQuota } from '@/components/organization-quota';

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');

  const navigation = [
    { name: t('dashboard'), href: '/dashboard', icon: BarChart3 },
    { name: t('buildings'), href: '/buildings', icon: Building2 },
    { name: t('units'), href: '/units', icon: Home },
    { name: t('residents'), href: '/residents', icon: Users },
    { name: t('finances'), href: '/finances', icon: TrendingUp },
    { name: t('meetings'), href: '/meetings', icon: Calendar },
    { name: t('notifications'), href: '/notifications', icon: Bell },
  ];
  const footerNavigation = [
    { name: t('settings'), href: '/settings', icon: Settings },
    { name: t('help'), href: '/help', icon: HelpCircle },
  ];

  const handlePortalAccess = () => {
    router.push('/org-redirect?target=portal');
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href='/' className='flex items-center space-x-2 px-4 py-2'>
          <Image
            src='/logo.svg'
            alt={tCommon('logoAlt')}
            width={64}
            height={64}
            className='size-16'
          />
          <span className='text-lg font-semibold text-gray-900'>syndik.ma</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map(item => {
                const Icon = item.icon;

                // Remove locale prefix from pathname for comparison

                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/');

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        'transition-colors',
                        isActive
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      )}
                    >
                      <Link href={item.href}>
                        <Icon className='h-4 w-4' />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className='border-t px-4 py-3'>
          <OrganizationQuota />
        </div>
        <div className='px-4 pb-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handlePortalAccess}
            className={cn('flex w-full items-center', 'gap-2')}
          >
            <Home className='h-4 w-4' />
            <span>{tCommon('residentPortal')}</span>
          </Button>
        </div>
        <SidebarMenu>
          {footerNavigation.map(item => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    'transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Link href={item.href}>
                    <Icon className='h-4 w-4' />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
