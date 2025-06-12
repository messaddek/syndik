import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  PortalSidebar,
  PortalNavbar,
  ResidentAccessGuard,
} from '@/modules/portal';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { OrganizationGuard, RoleGuard } from '@/modules/organizations';
import { NotificationProvider } from '@/modules/notifications/providers/notification-provider';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, orgId } = await auth();

  // Server-side logging
  // eslint-disable-next-line no-console
  console.log('🏠 Portal Layout - UserId:', userId);
  // eslint-disable-next-line no-console
  console.log('🏠 Portal Layout - OrgId:', orgId);

  if (!userId || !orgId) {
    // eslint-disable-next-line no-console
    console.log(
      '🚫 Portal Layout - Missing userId or orgId, redirecting to /sign-in'
    );
    redirect('/sign-in');
  }
  return (
    <TRPCErrorBoundary>
      <SidebarProvider>
        <NotificationProvider>
          <div className='flex min-h-screen w-full'>
            <PortalSidebar />
            <div className='flex flex-1 flex-col'>
              <PortalNavbar />
              <main className='flex-1 p-6'>
                <OrganizationGuard>
                  <RoleGuard allowedRoles={['member']} redirectTo='/dashboard'>
                    <ResidentAccessGuard>{children}</ResidentAccessGuard>
                  </RoleGuard>
                </OrganizationGuard>
              </main>
            </div>
          </div>
        </NotificationProvider>
      </SidebarProvider>
    </TRPCErrorBoundary>
  );
}
