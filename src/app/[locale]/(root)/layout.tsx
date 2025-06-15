'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardNavbar } from '@/modules/dashboard/ui/components/dashboard-navbar';
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar';
import { OrganizationGuard } from '@/modules/organizations';
import { RoleGuard } from '@/modules/organizations/ui/components/role-guard';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className='bg-muted/50 flex h-screen w-screen flex-col'>
        <DashboardNavbar />
        <div className='flex-1 overflow-auto'>
          <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
            <div className='px-4 py-6 sm:px-0'>
              <OrganizationGuard>
                <RoleGuard allowedRoles={['manager', 'admin']}>
                  {children}
                </RoleGuard>
              </OrganizationGuard>
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
