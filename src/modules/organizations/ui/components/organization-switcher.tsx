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
              {' '}
              <CreateOrganization
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-none border-0 bg-background',
                    headerTitle: 'text-lg font-semibold text-foreground',
                    headerSubtitle: 'text-sm text-muted-foreground',
                    socialButtonsBlockButton:
                      'border-input hover:bg-accent text-foreground',
                    formFieldInput:
                      'border-input focus:ring-2 focus:ring-ring bg-background text-foreground',
                    footerActionButton:
                      'bg-primary hover:bg-primary/90 text-primary-foreground',
                    formFieldLabel: 'text-foreground',
                    formFieldInputShowPasswordButton:
                      'text-muted-foreground hover:text-foreground',
                  },
                  // variables: {
                  //   colorBackground: 'hsl(var(--background))',
                  //   colorText: 'hsl(var(--foreground))',
                  //   colorTextSecondary: 'hsl(var(--muted-foreground))',
                  //   colorInputBackground: 'hsl(var(--background))',
                  //   colorInputText: 'hsl(var(--foreground))',
                  //   colorPrimary: 'hsl(var(--primary))',
                  // },
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
              'flex items-center gap-2 w-full justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent hover:text-accent-foreground transition-colors text-foreground',
            organizationSwitcherTriggerIcon:
              'h-4 w-4 shrink-0 text-muted-foreground',
            organizationPreview: 'flex items-center gap-2 min-w-0 flex-1',
            organizationPreviewAvatarBox: 'h-6 w-6 shrink-0',
            organizationPreviewTextContainer: 'flex flex-col min-w-0 flex-1',
            organizationPreviewMainIdentifier:
              'text-sm font-medium truncate text-foreground',
            organizationPreviewSecondaryIdentifier:
              'text-xs text-muted-foreground truncate',
            organizationSwitcherPopoverCard:
              'w-64 bg-background border border-border',
            organizationSwitcherPopoverActions: 'border-t border-border pt-2',
            organizationSwitcherPopoverActionButton:
              'text-foreground hover:bg-accent hover:text-accent-foreground',
          },
          variables: {
            // colorPrimary: 'hsl(var(--primary))',
            // colorTextOnPrimaryBackground: 'hsl(var(--primary-foreground))',
            // colorBackground: 'hsl(var(--background))',
            // colorText: 'hsl(var(--foreground))',
            // colorTextSecondary: 'hsl(var(--muted-foreground))',
            // colorInputBackground: 'hsl(var(--background))',
            // colorInputText: 'hsl(var(--foreground))',
            // borderRadius: '0.375rem',
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
            {' '}
            <CreateOrganization
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border-0 bg-background',
                  headerTitle: 'text-lg font-semibold text-foreground',
                  headerSubtitle: 'text-sm text-muted-foreground',
                  socialButtonsBlockButton:
                    'border-input hover:bg-accent text-foreground',
                  formFieldInput:
                    'border-input focus:ring-2 focus:ring-ring bg-background text-foreground',
                  footerActionButton:
                    'bg-primary hover:bg-primary/90 text-primary-foreground',
                  formFieldLabel: 'text-foreground',
                },
                variables: {
                  colorBackground: 'hsl(var(--background))',
                  colorText: 'hsl(var(--foreground))',
                  colorTextSecondary: 'hsl(var(--muted-foreground))',
                  colorInputBackground: 'hsl(var(--background))',
                  colorInputText: 'hsl(var(--foreground))',
                  colorPrimary: 'hsl(var(--primary))',
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
