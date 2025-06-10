'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardNavbar } from '@/modules/dashboard/ui/components/dashboard-navbar';
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className='bg-muted flex h-screen w-screen flex-col'>
        <DashboardNavbar />
        <div className='flex-1 overflow-auto'>
          <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
            <div className='px-4 py-6 sm:px-0'>{children}</div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
