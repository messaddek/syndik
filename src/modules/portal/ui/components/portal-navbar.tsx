'use client';

import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function PortalNavbar() {
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />

      <div className='flex flex-1 items-center justify-between'>
        {/* Search */}
        <div className='max-w-md flex-1'>
          <div className='relative'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <Input
              placeholder='Search announcements, payments...'
              className='pl-9'
            />
          </div>
        </div>

        {/* Notifications */}
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' className='relative'>
            <Bell className='h-4 w-4' />
            <Badge
              variant='destructive'
              className='absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs'
            >
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
}
