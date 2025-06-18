'use client';

import { useOrganization, useUser } from '@clerk/nextjs';

export function useHelpdeskPermissions() {
  //   const { userId } = useAuth();
  const { membership } = useOrganization();
  const { user } = useUser();

  // Get user role from organization membership
  const userRole = membership?.role;
  // Check for super admin - specific email for development
  const isSuperAdmin =
    user?.emailAddresses?.[0]?.emailAddress === 'm.essaddek@gmail.com' ||
    user?.publicMetadata?.isSuperAdmin === true ||
    userRole === 'org:super_admin';

  // Define role checks based on Clerk organization roles
  const isSyndicateAdmin = userRole === 'org:admin' || userRole === 'admin';
  const isSystemAdmin = userRole === 'org:admin' || userRole === 'admin';
  const isResident = userRole === 'org:member' || userRole === 'member';

  // Only syndicate admins should be able to create B2B tickets
  const canCreateB2BTickets = isSyndicateAdmin;

  // Both admins and residents can create internal tickets
  const canCreateInternalTickets =
    isSyndicateAdmin || isSystemAdmin || isResident;

  // Only admins can view B2B tickets (and super admins)
  const canViewB2BTickets = isSyndicateAdmin || isSystemAdmin || isSuperAdmin;

  // Super admin has access to admin portal
  const canAccessAdminPortal = isSuperAdmin;

  return {
    isSyndicateAdmin,
    isSystemAdmin,
    isResident,
    isSuperAdmin,
    canCreateB2BTickets,
    canCreateInternalTickets,
    canViewB2BTickets,
    canAccessAdminPortal,
  };
}
