'use client';

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
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Buildings', href: '/buildings', icon: Building2 },
  { name: 'Units', href: '/units', icon: Home },
  { name: 'Residents', href: '/residents', icon: Users },
  { name: 'Finances', href: '/finances', icon: TrendingUp },
  { name: 'Meetings', href: '/meetings', icon: Calendar },
  { name: 'Notifications', href: '/notifications', icon: Bell },
];

const footerNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handlePortalAccess = () => {
    router.push('/org-redirect?target=portal');
  };

  return (
    <Sidebar>
      {' '}
      <SidebarHeader>
        <Link href='/' className='flex items-center space-x-2 px-4 py-2'>
          <Building2 className='h-8 w-8 text-blue-600' />
          <span className='text-foreground text-xl font-bold'>Syndik</span>
        </Link>
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
        </SidebarGroup>{' '}
      </SidebarContent>{' '}
      <SidebarFooter>
        <div className='border-t px-4 py-3'>
          <OrganizationQuota />
        </div>
        <div className='px-4 pb-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handlePortalAccess}
            className='flex w-full items-center gap-2'
          >
            <Home className='h-4 w-4' />
            <span>Resident Portal</span>
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
