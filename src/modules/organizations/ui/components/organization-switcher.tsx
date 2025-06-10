'use client';

import { useState } from 'react';
import { OrganizationSwitcher, CreateOrganization } from '@clerk/nextjs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Building2 } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

interface OrganizationSwitcherCustomProps {
  className?: string;
}

export const OrganizationSwitcherCustom = ({
  className,
}: OrganizationSwitcherCustomProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const trpc = useTRPC();

  // Check if user has any organization
  const { data: hasOrganization } = useQuery(
    trpc.organizations.hasOrganization.queryOptions()
  );
  // If user has no organization, show create organization prompt
  if (hasOrganization === false) {
    return (
      <>
        <Dialog open={true} onOpenChange={() => {}} modal>
          <DialogContent className='max-w-md'>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2 text-lg'>
                <Building2 className='h-6 w-6 text-blue-600' />
                Create Your Organization
              </DialogTitle>
              <DialogDescription className='text-base'>
                You need to create or join an organization to access the
                dashboard. Organizations help you manage your residential
                syndicates efficiently.
              </DialogDescription>
            </DialogHeader>
            <div className='pt-4'>
              <CreateOrganization
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-none border-0',
                    headerTitle: 'text-lg font-semibold',
                    headerSubtitle: 'text-sm text-muted-foreground',
                    socialButtonsBlockButton: 'border-input hover:bg-accent',
                    formFieldInput: 'border-input focus:ring-2 focus:ring-ring',
                    footerActionButton: 'bg-primary hover:bg-primary/90',
                  },
                }}
                routing='hash'
                afterCreateOrganizationUrl='/dashboard'
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
  // If user has organization(s), show the switcher
  return (
    <div className={className}>
      <OrganizationSwitcher
        appearance={{
          elements: {
            rootBox: 'w-full',
            organizationSwitcherTrigger:
              'flex items-center gap-2 w-full justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent hover:text-accent-foreground transition-colors',
            organizationSwitcherTriggerIcon: 'h-4 w-4 shrink-0',
            organizationPreview: 'flex items-center gap-2 min-w-0 flex-1',
            organizationPreviewAvatarBox: 'h-6 w-6 shrink-0',
            organizationPreviewTextContainer: 'flex flex-col min-w-0 flex-1',
            organizationPreviewMainIdentifier: 'text-sm font-medium truncate',
            organizationPreviewSecondaryIdentifier:
              'text-xs text-muted-foreground truncate',
            organizationSwitcherPopoverCard: 'w-64',
            organizationSwitcherPopoverActions: 'border-t pt-2',
          },
        }}
        createOrganizationMode='modal'
        hidePersonal
      />

      {/* Create Organization Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Building2 className='h-5 w-5' />
              Create New Organization
            </DialogTitle>
            <DialogDescription>
              Create a new organization to manage additional residential
              syndicates.
            </DialogDescription>
          </DialogHeader>
          <div className='pt-4'>
            <CreateOrganization
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border-0',
                },
              }}
              routing='hash'
              afterCreateOrganizationUrl='/dashboard'
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
