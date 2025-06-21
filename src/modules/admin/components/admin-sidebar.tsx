'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Building2,
  Users,
  Settings,
  BarChart3,
  Shield,
  Database,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';

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
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('admin');
  const tCommon = useTranslations('common');
  const { isMobile, setOpenMobile } = useSidebar();

  // Function to handle navigation and close sidebar on mobile
  const handleNavigation = (href: string) => {
    if (isMobile) {
      setOpenMobile(false);
    }
    router.push(href);
  };

  const navigation = [
    { name: t('dashboard'), href: '/admin', icon: BarChart3 },
    { name: t('organizations'), href: '/admin/organizations', icon: Building2 },
    { name: t('users'), href: '/admin/users', icon: Users },
    { name: t('b2b_tickets'), href: '/admin/b2b-tickets', icon: AlertTriangle },
    { name: t('security'), href: '/admin/security', icon: Shield },
    { name: t('database'), href: '/admin/database', icon: Database },
    { name: t('permissions'), href: '/admin/permissions', icon: UserCheck },
  ];

  const footerNavigation = [
    { name: t('settings'), href: '/admin/settings', icon: Settings },
  ];

  return (
    <Sidebar>
      
      <SidebarHeader>
        <div
          className='flex cursor-pointer items-center space-x-2 px-4 py-2'
          onClick={() => handleNavigation('/admin')}
        >
          <Image
            src='/logo.svg'
            alt={tCommon('logoAlt')}
            width={64}
            height={64}
            className='size-16'
          />
          <div>
            <span className='text-lg font-semibold text-gray-900 dark:text-gray-200'>
              syndik.ma
            </span>
            <div className='text-xs font-medium text-orange-600'>
              {t('admin_portal')}
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            
            <SidebarMenu>
              {navigation.map(item => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/');

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        'cursor-pointer transition-colors',
                        isActive
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      )}
                      onClick={() => handleNavigation(item.href)}
                    >
                      <Icon className='h-4 w-4' />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        
        <div className='px-4 pb-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              if (isMobile) {
                setOpenMobile(false);
              }
              // Navigate back to main app subdomain
              const isDevelopment = process.env.NODE_ENV === 'development';
              const appUrl = isDevelopment
                ? 'http://app.localhost:3000/dashboard'
                : 'https://app.syndik.ma/dashboard';
              window.location.href = appUrl;
            }}
            className='flex w-full items-center gap-2'
          >
            <Building2 className='h-4 w-4' />
            <span>{t('back_to_dashboard')}</span>
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
                  isActive={isActive}
                  className={cn(
                    'cursor-pointer transition-colors',
                    isActive
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className='h-4 w-4' />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

