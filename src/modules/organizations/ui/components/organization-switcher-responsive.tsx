'use client';

import { useState } from 'react';
import { useOrganization } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Building2, ChevronDown, Loader2 } from 'lucide-react';
import { OrganizationSwitcherCustom } from './organization-switcher';

interface OrganizationSwitcherResponsiveProps {
  className?: string;
}

export const OrganizationSwitcherResponsive = ({
  className,
}: OrganizationSwitcherResponsiveProps) => {
  const { organization, isLoaded } = useOrganization();
  const [open, setOpen] = useState(false);

  // Loading state
  if (!isLoaded) {
    return (
      <div className='flex items-center gap-2'>
        <div className='hidden w-full md:block'>
          <div className='border-input bg-background flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2'>
            <div className='flex min-w-0 flex-1 items-center gap-2'>
              <div className='h-6 w-6 animate-pulse rounded bg-gray-200' />
              <div className='flex min-w-0 flex-1 flex-col'>
                <div className='mb-1 h-3 w-24 animate-pulse rounded bg-gray-200' />
                <div className='h-2 w-16 animate-pulse rounded bg-gray-200' />
              </div>
            </div>
            <ChevronDown className='h-4 w-4 text-gray-400' />
          </div>
        </div>
        <div className='block md:hidden'>
          <Button variant='outline' size='sm' className='w-auto px-2' disabled>
            <div className='h-5 w-5 animate-pulse rounded bg-gray-200' />
          </Button>
        </div>
      </div>
    );
  }

  if (!organization) {
    return null;
  }
  // Mobile version - show as a popover
  const MobileVersion = () => (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='hover:bg-accent w-auto px-2 transition-colors'
          aria-label='Switch organization'
        >
          <div className='flex items-center gap-1'>
            <div className='flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm'>
              <span className='text-xs font-medium text-white'>
                {organization.name?.charAt(0)?.toUpperCase() || 'O'}
              </span>
            </div>
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-64 p-0' align='end' sideOffset={5}>
        <OrganizationSwitcherCustom />
      </PopoverContent>
    </Popover>
  );

  // Desktop version - show with tooltip
  const DesktopVersion = () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={className}>
            <OrganizationSwitcherCustom />
          </div>
        </TooltipTrigger>{' '}
        <TooltipContent side='bottom' sideOffset={5}>
          <p>Switch organizations</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <>
      {/* Mobile Version */}
      <div className='block md:hidden'>
        <MobileVersion />
      </div>

      {/* Desktop Version */}
      <div className='hidden md:block'>
        <DesktopVersion />
      </div>
    </>
  );
};
