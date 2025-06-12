'use client';

import {
  Home,
  CreditCard,
  MessageSquare,
  Settings,
  User,
  Calendar,
  FileText,
  Bell,
} from 'lucide-react';
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
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', url: '/portal', icon: Home },
      { title: 'My Unit', url: '/portal/unit', icon: Home },
    ],
  },
  {
    title: 'Financial',
    items: [
      { title: 'Payments', url: '/portal/payments', icon: CreditCard },
      { title: 'Statements', url: '/portal/statements', icon: FileText },
    ],
  },
  {
    title: 'Community',
    items: [
      { title: 'Announcements', url: '/portal/announcements', icon: Bell },
      { title: 'Notifications', url: '/portal/notifications', icon: Bell },
      { title: 'Messages', url: '/portal/messages', icon: MessageSquare },
      { title: 'Meetings', url: '/portal/meetings', icon: Calendar },
    ],
  },
  {
    title: 'Account',
    items: [
      { title: 'Profile', url: '/portal/profile', icon: User },
      { title: 'Settings', url: '/portal/settings', icon: Settings },
    ],
  },
];

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className='border-b p-4'>
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white'>
            <Home className='h-4 w-4' />
          </div>
          <div>
            <h2 className='text-lg font-semibold'>Syndik</h2>
            <p className='text-muted-foreground text-xs'>Resident Portal</p>
          </div>
        </div>
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
        <div className='flex items-center gap-3'>
          <UserButton afterSignOutUrl='/' />
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-medium'>Resident Account</p>
            <p className='text-muted-foreground text-xs'>Portal Access</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
