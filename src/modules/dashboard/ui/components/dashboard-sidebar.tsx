'use client';

import { useTranslations, useLocale } from 'next-intl';
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
  Shield,
  ArrowLeft,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useState } from 'react';

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
import { OrganizationQuota } from '@/components/organization-quota';
import { useHelpdeskPermissions } from '@/modules/helpdesk/hooks/use-helpdesk-permissions';
import {
  getLandingUrl,
  buildSubdomainUrl,
  SUBDOMAINS,
} from '@/lib/subdomain-utils';

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const { canAccessAdminPortal } = useHelpdeskPermissions();
  const { isMobile, setOpenMobile } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Function to handle navigation and close sidebar on mobile
  const handleNavigation = (href: string) => {
    if (isMobile) {
      setOpenMobile(false);
    }
    router.push(href);
  };

  // Function to toggle expanded items
  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  const navigation = [
    { name: t('dashboard'), href: '/dashboard', icon: BarChart3 },
    { name: t('buildings'), href: '/buildings', icon: Building2 },
    { name: t('units'), href: '/units', icon: Home },
    { name: t('residents'), href: '/residents', icon: Users },
    {
      name: t('finances'),
      href: '/finances',
      icon: TrendingUp,
      subItems: [
        {
          name: t('overview'),
          href: '/finances',
          icon: BarChart3,
        },
        {
          name: t('missingPayments'),
          href: '/finances/missing-payments',
          icon: AlertTriangle,
        },
        {
          name: t('reports'),
          href: '/finances/reports',
          icon: TrendingUp,
        },
      ],
    },
    { name: t('meetings'), href: '/meetings', icon: Calendar },
    { name: t('helpdesk'), href: '/helpdesk', icon: HelpCircle },
    { name: t('notifications'), href: '/notifications', icon: Bell },
  ];
  const footerNavigation = [
    { name: t('settings'), href: '/settings', icon: Settings },
    { name: t('help'), href: '/help', icon: HelpCircle },
  ];
  const handlePortalAccess = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
    router.push('/org-redirect?target=portal');
  };
  const handleAdminAccess = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      router.push('/admin-dev');
    } else {
      const adminUrl = buildSubdomainUrl(SUBDOMAINS.ADMIN);
      window.location.href = adminUrl;
    }
  };
  const handleBackToLanding = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
    const landingUrl = getLandingUrl(locale);
    window.location.href = landingUrl;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div
          className='flex cursor-pointer items-center space-x-2 px-4 py-2'
          onClick={() => handleNavigation('/')}
        >
          <Image
            src='/logo.svg'
            alt={tCommon('logoAlt')}
            width={64}
            height={64}
            className='size-16'
          />
          <span className='text-lg font-semibold text-gray-900 dark:text-gray-200'>
            syndik.ma
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map(item => {
                const Icon = item.icon;
                const hasSubItems = item.subItems && item.subItems.length > 0;

                // Check if any sub-item is active
                const isSubItemActive =
                  hasSubItems &&
                  item.subItems.some(
                    subItem =>
                      pathname === subItem.href ||
                      pathname.startsWith(subItem.href + '/')
                  );

                // Main item is active if:
                // 1. For items without sub-items: exact match or starts with href
                // 2. For items with sub-items: only if a sub-item is active
                const isMainItemActive = hasSubItems
                  ? isSubItemActive
                  : pathname === item.href ||
                    pathname.startsWith(item.href + '/');

                const isExpanded =
                  expandedItems.includes(item.name) || isSubItemActive;

                return (
                  <div key={item.name}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={isMainItemActive}
                        className={cn(
                          'cursor-pointer transition-colors',
                          isMainItemActive
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        )}
                        onClick={() => {
                          if (hasSubItems) {
                            toggleExpanded(item.name);
                          } else {
                            handleNavigation(item.href);
                          }
                        }}
                      >
                        <Icon className='h-4 w-4' />
                        <span>{item.name}</span>
                        {hasSubItems && (
                          <div className='ml-auto'>
                            {isExpanded ? (
                              <ChevronDown className='h-4 w-4' />
                            ) : (
                              <ChevronRight className='h-4 w-4 rtl:rotate-180' />
                            )}
                          </div>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Sub-items */}
                    {hasSubItems && isExpanded && (
                      <div className='ml-6 space-y-1'>
                        {item.subItems.map(subItem => {
                          const SubIcon = subItem.icon;
                          const isSubActive =
                            pathname === subItem.href ||
                            (subItem.href !== item.href &&
                              pathname.startsWith(subItem.href + '/'));

                          return (
                            <SidebarMenuItem key={subItem.name}>
                              <SidebarMenuButton
                                isActive={isSubActive}
                                className={cn(
                                  'cursor-pointer transition-colors',
                                  isSubActive
                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                )}
                                onClick={() => handleNavigation(subItem.href)}
                              >
                                <SubIcon className='h-4 w-4' />
                                <span>{subItem.name}</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </div>
                    )}
                  </div>
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
        <div className='space-y-2 px-4 pb-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handleBackToLanding}
            className={cn(
              'flex w-full items-center gap-2 text-gray-600 hover:text-gray-900'
            )}
          >
            <ArrowLeft className='h-4 w-4 rtl:rotate-180' />
            <span>{t('backToLanding')}</span>
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={handlePortalAccess}
            className={cn('flex w-full items-center', 'gap-2')}
          >
            <Home className='h-4 w-4' />
            <span>{tCommon('residentPortal')}</span>
          </Button>

          {canAccessAdminPortal && (
            <Button
              variant='outline'
              size='sm'
              onClick={handleAdminAccess}
              className={cn(
                'flex w-full items-center gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800'
              )}
            >
              <Shield className='h-4 w-4' />
              <span>Admin Portal</span>
            </Button>
          )}
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
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
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
};
