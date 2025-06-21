'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import {
  CreditCard,
  MessageSquare,
  Settings,
  User,
  Calendar,
  FileText,
  Bell,
  LayoutDashboard,
  Home,
  Shield,
  ArrowLeft,
} from 'lucide-react';
import { GrAnnounce } from 'react-icons/gr';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { OrgSwitcher } from '@/components/org-switcher';
import { useHelpdeskPermissions } from '@/modules/helpdesk/hooks/use-helpdesk-permissions';
import {
  getLandingUrl,
  buildSubdomainUrl,
  SUBDOMAINS,
} from '@/lib/subdomain-utils';

export function PortalSidebar() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { canAccessAdminPortal } = useHelpdeskPermissions();

  const navigationItems = [
    {
      title: t('portal.overview'),
      items: [
        { title: t('navigation.dashboard'), url: '/portal', icon: Home },
        { title: t('portal.myUnit'), url: '/portal/unit', icon: Home },
      ],
    },
    {
      title: t('portal.financial'),
      items: [
        {
          title: t('portal.payments'),
          url: '/portal/payments',
          icon: CreditCard,
        },
        {
          title: t('portal.statements'),
          url: '/portal/statements',
          icon: FileText,
        },
      ],
    },
    {
      title: t('portal.community'),
      items: [
        {
          title: t('portal.announcements'),
          url: '/portal/announcements',
          icon: GrAnnounce,
        },
        {
          title: t('portal.notifications'),
          url: '/portal/notifications',
          icon: Bell,
        },
        {
          title: t('portal.messages'),
          url: '/portal/messages',
          icon: MessageSquare,
        },
        {
          title: t('portal.meetings'),
          url: '/portal/meetings',
          icon: Calendar,
        },
      ],
    },
    {
      title: t('portal.account'),
      items: [
        { title: t('portal.profile'), url: '/portal/profile', icon: User },
        {
          title: t('common.settings'),
          url: '/portal/settings',
          icon: Settings,
        },
      ],
    },
  ];

  const handleDashboardAccess = () => {
    router.push('/org-redirect');
  };
  const handleBackToLanding = () => {
    const landingUrl = getLandingUrl(locale);
    window.location.href = landingUrl;
  };

  return (
    <Sidebar>
      <SidebarHeader className='border-b p-4'>
        <div className='mb-3 flex items-center gap-2'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg'>
            <Image src='/logo.svg' alt='Syndik Logo' width={30} height={30} />
          </div>
          <div>
            <h2 className='text-lg font-semibold'>syndik.ma</h2>
            <p className='text-muted-foreground text-xs'>{t('portal.title')}</p>
          </div>
        </div>
        {/* Organization Switcher */}
        <div className='mb-3'>
          <OrgSwitcher appearance='sidebar' />
        </div>
        {/* Dashboard Access Button */}
        <Button
          variant='outline'
          size='sm'
          onClick={handleDashboardAccess}
          className='flex w-full items-center gap-2'
        >
          <LayoutDashboard className='h-4 w-4' />
          <span>{t('portal.accessDashboard')}</span>
        </Button>

        {/* Back to Landing Button */}
        <Button
          variant='outline'
          size='sm'
          onClick={handleBackToLanding}
          className='flex w-full items-center gap-2 text-gray-600 hover:text-gray-900'
        >
          <ArrowLeft className='h-4 w-4 rtl:rotate-180' />
          <span>{t('navigation.backToLanding')}</span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {navigationItems.map(group => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon className='h-4 w-4' />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className='border-t p-4'>
        {' '}
        {canAccessAdminPortal && (
          <div className='mb-3'>
            <Button
              onClick={() => {
                const isDevelopment = process.env.NODE_ENV === 'development';

                if (isDevelopment) {
                  router.push('/admin-dev');
                } else {
                  const adminUrl = buildSubdomainUrl(SUBDOMAINS.ADMIN);
                  window.location.href = adminUrl;
                }
              }}
              className='flex w-full items-center gap-2 bg-orange-600 text-white hover:bg-orange-700'
              size='sm'
            >
              <Shield className='h-4 w-4' />
              <span>{t('admin.admin_portal')}</span>
            </Button>
          </div>
        )}
        <div className='flex items-center gap-3'>
          <UserButton />
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-medium'>
              {t('portal.residentAccount')}
            </p>
            <p className='text-muted-foreground text-xs'>
              {t('portal.portalAccess')}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
