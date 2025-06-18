'use client';

import { useHelpdeskPermissions } from '@/modules/helpdesk/hooks/use-helpdesk-permissions';
import { redirect } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

interface AdminPortalGuardProps {
  children: React.ReactNode;
}

export function AdminPortalGuard({ children }: AdminPortalGuardProps) {
  const { isLoaded } = useAuth();
  const { canAccessAdminPortal } = useHelpdeskPermissions();

  // Wait for auth to load
  if (!isLoaded) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900'></div>
      </div>
    );
  }

  // Redirect if not authorized
  if (!canAccessAdminPortal) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
