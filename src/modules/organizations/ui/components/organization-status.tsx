'use client';

import { useOrganization } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';
import { Building2, Users } from 'lucide-react';

export const OrganizationStatus = () => {
  const { organization, membership } = useOrganization();

  if (!organization) {
    return null;
  }

  const roleColors = {
    'org:admin': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'org:member':
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'org:admin':
        return 'Admin';
      case 'org:member':
        return 'Member';
      default:
        return 'Member';
    }
  };

  return (
    <div className='bg-muted/50 hidden items-center gap-2 rounded-md px-3 py-1.5 lg:flex'>
      <div className='flex items-center gap-1.5'>
        <Building2 className='text-muted-foreground h-3 w-3' />
        <span className='text-muted-foreground max-w-[100px] truncate text-xs font-medium'>
          {organization.name}
        </span>
      </div>
      <div className='bg-border h-3 w-px' />
      <Badge
        variant='secondary'
        className={`px-1.5 py-0.5 text-xs ${
          membership?.role
            ? roleColors[membership.role as keyof typeof roleColors] ||
              roleColors['org:member']
            : roleColors['org:member']
        }`}
      >
        {membership?.role ? getRoleLabel(membership.role) : 'Member'}
      </Badge>
      {organization.membersCount && (
        <>
          <div className='bg-border h-3 w-px' />
          <div className='flex items-center gap-1'>
            <Users className='text-muted-foreground h-3 w-3' />
            <span className='text-muted-foreground text-xs'>
              {organization.membersCount}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
