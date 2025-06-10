'use client';

import { useState, useEffect } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Search,
  Building2,
  Home,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { SearchResultsSkeleton } from './search-skeleton';

export function DashboardNavbar() {
  const { user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const trpc = useTRPC();

  // Search query with debouncing
  const searchResults = useQuery(
    trpc.search.global.queryOptions(
      {
        query: searchQuery,
        limit: 5,
      },
      {
        enabled: searchQuery.length > 0,
      }
    )
  );

  // Keyboard shortcut for command search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (type: string, id: string) => {
    setOpen(false);
    setSearchQuery('');
    // Navigate to the selected item
    switch (type) {
      case 'building':
        router.push(`/buildings/${id}`);
        break;
      case 'unit':
        router.push(`/units/${id}`);
        break;
      case 'resident':
        router.push(`/residents/${id}`);
        break;
    }
  };

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />

      <div className='flex flex-1 items-center justify-between'>
        {/* Search Command */}
        <div className='max-w-md flex-1'>
          <Button
            variant='outline'
            className='text-muted-foreground w-full justify-start'
            onClick={() => setOpen(true)}
          >
            <Search className='mr-2 h-4 w-4' />
            Search buildings, units, residents...
            <kbd className='bg-muted pointer-events-none absolute top-2.5 right-2 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex'>
              <span className='text-xs'>⌘</span>K
            </kbd>
          </Button>
        </div>

        {/* User Menu */}
        <div className='flex items-center gap-4'>
          {isLoaded && user ? (
            <div className='flex items-center space-x-4'>
              <span className='hidden text-sm text-gray-600 sm:block'>
                Welcome, {user.firstName}!
              </span>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-8 w-8',
                  },
                }}
              />
            </div>
          ) : (
            <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200' />
          )}
        </div>
      </div>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Search buildings, units, residents...'
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {searchQuery.length === 0 && (
            <CommandEmpty>Start typing to search...</CommandEmpty>
          )}{' '}
          {searchQuery.length > 0 && searchResults.isLoading && (
            <SearchResultsSkeleton />
          )}
          {searchQuery.length > 0 &&
            !searchResults.isLoading &&
            !searchResults.data && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          {searchResults.data && (
            <>
              {searchResults.data.buildings.length > 0 && (
                <CommandGroup heading='Buildings'>
                  {searchResults.data.buildings.map(building => (
                    <CommandItem
                      key={building.id}
                      onSelect={() => handleSelect('building', building.id)}
                      className='flex items-start gap-3 p-3'
                    >
                      <Building2 className='mt-0.5 h-4 w-4 text-blue-600' />
                      <div className='flex-1'>
                        <div className='font-medium'>{building.name}</div>
                        <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                          <MapPin className='h-3 w-3' />
                          {building.address}
                        </div>
                        <div className='text-muted-foreground text-xs'>
                          {building.totalUnits} units
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {searchResults.data.units.length > 0 && (
                <CommandGroup heading='Units'>
                  {searchResults.data.units.map(unit => (
                    <CommandItem
                      key={unit.id}
                      onSelect={() => handleSelect('unit', unit.id)}
                      className='flex items-start gap-3 p-3'
                    >
                      <Home className='mt-0.5 h-4 w-4 text-green-600' />
                      <div className='flex-1'>
                        <div className='font-medium'>
                          Unit {unit.unitNumber}
                        </div>
                        <div className='text-muted-foreground text-sm'>
                          Floor {unit.floor}
                        </div>
                        <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                          <span>
                            {unit.bedrooms} bed, {unit.bathrooms} bath
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-xs ${
                              unit.isOccupied
                                ? 'bg-green-100 text-green-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {unit.isOccupied ? 'Occupied' : 'Vacant'}
                          </span>
                          <span>${unit.monthlyFee}/month</span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {searchResults.data.residents.length > 0 && (
                <CommandGroup heading='Residents'>
                  {searchResults.data.residents.map(resident => (
                    <CommandItem
                      key={resident.id}
                      onSelect={() => handleSelect('resident', resident.id)}
                      className='flex items-start gap-3 p-3'
                    >
                      <Users className='mt-0.5 h-4 w-4 text-purple-600' />
                      <div className='flex-1'>
                        <div className='font-medium'>
                          {resident.firstName} {resident.lastName}
                        </div>
                        <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                          <Mail className='h-3 w-3' />
                          {resident.email}
                        </div>
                        <div className='text-muted-foreground flex items-center gap-3 text-xs'>
                          <span className='flex items-center gap-1'>
                            <Phone className='h-3 w-3' />
                            {resident.phone}
                          </span>
                          {resident.isOwner && (
                            <span className='rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700'>
                              Owner
                            </span>
                          )}
                          <span className='flex items-center gap-1'>
                            <Calendar className='h-3 w-3' />
                            Since{' '}
                            {new Date(resident.moveInDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
}
