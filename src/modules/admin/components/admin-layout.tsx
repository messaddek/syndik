'use client';

import { AdminPortalGuard } from './admin-portal-guard';
import { AdminSidebar } from './admin-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <AdminPortalGuard>
      <SidebarProvider>
        <div className='flex h-screen'>
          <AdminSidebar />
          <main className='flex-1 overflow-y-auto'>
            <div className='p-6'>{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </AdminPortalGuard>
  );
}
