'use client';

import { useState, useEffect } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  CommandResponsiveDialog,
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
  HomeIcon,
} from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { SearchResultsSkeleton } from './search-skeleton';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import {
  OrganizationSwitcherResponsive,
  OrganizationStatus,
} from '@/modules/organizations';

export function DashboardNavbar() {
  const { user, isLoaded } = useUser();
  const t = useTranslations('common');
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const router = useRouter();
  const trpc = useTRPC();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);
  // Search query with debouncing
  const searchResults = useQuery(
    trpc.search.global.queryOptions(
      {
        query: debouncedSearchQuery,
        limit: 5,
      },
      {
        enabled: debouncedSearchQuery.length > 0,
        staleTime: 0, // Force fresh data
        gcTime: 0, // Don't cache results
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
  const handleDialogOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSearchQuery('');
      setDebouncedSearchQuery('');
    }
  };

  const handleSelect = (type: string, id: string) => {
    setOpen(false);
    setSearchQuery('');
    setDebouncedSearchQuery('');
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
    <header className='bg-background flex h-16 shrink-0 items-center gap-2 border-b px-2 sm:px-4'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />
      {/* Mobile Layout */}
      <div className='flex w-full items-center justify-between lg:hidden'>
        {/* Mobile Search - Icon Only */}
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setOpen(true)}
          className='h-8 w-8'
        >
          <Search className='h-4 w-4' />
        </Button>

        {/* Mobile Center - Organization Switcher */}
        <div className='mx-2 max-w-[200px] flex-1'>
          <OrganizationSwitcherResponsive className='w-full' />
        </div>

        {/* Mobile Right - User Controls */}
        <div className='flex items-center gap-1'>
          <OrganizationStatus />
          <LanguageSwitcher />
          <ModeToggle />{' '}
          {isLoaded && user ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'h-8 w-8',
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label={t('residentPortal')}
                  labelIcon={<HomeIcon className='size-3.5' />}
                  onClick={() => {
                    console.log(
                      '🏠 Dashboard Navbar - Resident Portal clicked, navigating to /org-redirect for role check'
                    );
                    router.push('/org-redirect?target=portal');
                  }}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700' />
          )}
        </div>
      </div>
      {/* Desktop Layout */}
      <div className='hidden flex-1 items-center justify-between lg:flex'>
        {/* Desktop Search */}
        <div className='max-w-md flex-1'>
          <Button
            variant='outline'
            className='text-muted-foreground relative w-full justify-start space-x-2'
            onClick={() => setOpen(true)}
          >
            <Search className='h-4 w-4' />
            <span className='hidden xl:inline'>{t('navbarSearch')}</span>
            <span className='xl:hidden'>Search</span>
            <kbd className='bg-muted pointer-events-none absolute top-2.5 right-2 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none xl:flex rtl:right-auto rtl:left-2'>
              <span className='text-xs'>⌘</span>K
            </kbd>
          </Button>
        </div>

        {/* Desktop Center - Organization Controls */}
        <div className='flex items-center gap-4'>
          <div className='max-w-xs min-w-[200px]'>
            <OrganizationSwitcherResponsive className='w-full' />
          </div>
          <OrganizationStatus />
        </div>

        {/* Desktop Right - User Menu */}
        <div className='flex items-center gap-4'>
          <LanguageSwitcher />
          <ModeToggle />
          {isLoaded && user ? (
            <div className='flex items-center space-x-4'>
              <span className='hidden text-sm text-gray-600 xl:block dark:text-gray-300'>
                {t('welcome')}, {user.firstName}!
              </span>{' '}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-8 w-8',
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Action
                    label={t('residentPortal')}
                    labelIcon={<HomeIcon className='size-3.5' />}
                    onClick={() => {
                      console.log(
                        '🏠 Dashboard Navbar - Resident Portal clicked, navigating to /org-redirect for role check'
                      );
                      router.push('/org-redirect?target=portal');
                    }}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          ) : (
            <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700' />
          )}{' '}
        </div>
      </div>
      {/* Command Dialog */}
      <CommandResponsiveDialog
        open={open}
        onOpenChange={handleDialogOpenChange}
        title={t('navbarSearch')}
        description='Search for buildings, units, and residents'
      >
        <CommandInput
          placeholder={t('navbarSearch')}
          value={searchQuery}
          onValueChange={setSearchQuery}
          className='text-base sm:text-sm' // Larger text on mobile
        />{' '}
        <CommandList className='max-h-[50vh] sm:max-h-[60vh]'>
          {/* Limit height on mobile */}
          {searchQuery.length === 0 && (
            <CommandEmpty>{t('searchHint')}</CommandEmpty>
          )}
          {searchQuery.length > 0 && debouncedSearchQuery.length === 0 && (
            <SearchResultsSkeleton />
          )}
          {debouncedSearchQuery.length > 0 && searchResults.isLoading && (
            <SearchResultsSkeleton />
          )}
          {debouncedSearchQuery.length > 0 &&
            searchResults.data &&
            !searchResults.isLoading && (
              <>
                {searchResults.data.buildings.length === 0 &&
                  searchResults.data.units.length === 0 &&
                  searchResults.data.residents.length === 0 && (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                {searchResults.data.buildings.length > 0 && (
                  <CommandGroup heading='Buildings'>
                    {searchResults.data.buildings.map(building => (
                      <CommandItem
                        key={building.id}
                        value={building.name}
                        onSelect={() => handleSelect('building', building.id)}
                        className='flex min-h-[60px] items-start gap-3 p-3 sm:min-h-auto' // Larger touch targets on mobile
                      >
                        <Building2 className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600' />{' '}
                        <div className='min-w-0 flex-1'>
                          {/* Prevent overflow */}
                          <div className='truncate font-medium'>
                            {building.name}
                          </div>
                          <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                            <MapPin className='h-3 w-3 flex-shrink-0' />
                            <span className='truncate'>{building.address}</span>
                          </div>
                          <div className='text-muted-foreground text-xs'>
                            {building.totalUnits} units • {building.city}
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
                        value={unit.unitNumber}
                        onSelect={() => handleSelect('unit', unit.id)}
                        className='flex min-h-[60px] items-start gap-3 p-3 sm:min-h-auto'
                      >
                        <Home className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-600' />
                        <div className='min-w-0 flex-1'>
                          <div className='font-medium'>
                            Unit {unit.unitNumber}
                          </div>
                          <div className='text-muted-foreground text-sm'>
                            Floor {unit.floor}
                          </div>
                          <div className='text-muted-foreground flex flex-wrap items-center gap-2 text-xs'>
                            <span>
                              {unit.bedrooms} bed, {unit.bathrooms} bath
                            </span>
                            <span
                              className={`flex-shrink-0 rounded px-1.5 py-0.5 text-xs ${
                                unit.isOccupied
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {unit.isOccupied ? 'Occupied' : 'Vacant'}
                            </span>
                            <span className='flex-shrink-0'>
                              ${unit.monthlyFee}/month
                            </span>
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
                        value={`${resident.firstName} ${resident.lastName}`}
                        onSelect={() => handleSelect('resident', resident.id)}
                        className='flex min-h-[60px] items-start gap-3 p-3 sm:min-h-auto'
                      >
                        <Users className='mt-0.5 h-4 w-4 flex-shrink-0 text-purple-600' />
                        <div className='min-w-0 flex-1'>
                          <div className='truncate font-medium'>
                            {resident.firstName} {resident.lastName}
                          </div>
                          <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                            <Mail className='h-3 w-3 flex-shrink-0' />
                            <span className='truncate'>{resident.email}</span>
                          </div>
                          <div className='text-muted-foreground flex flex-wrap items-center gap-2 text-xs'>
                            <span className='flex flex-shrink-0 items-center gap-1'>
                              <Phone className='h-3 w-3' />
                              {resident.phone}
                            </span>
                            <span
                              className={`flex-shrink-0 rounded px-1.5 py-0.5 text-xs ${
                                resident.isOwner
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {resident.isOwner ? 'Owner' : 'Tenant'}
                            </span>
                            <span className='hidden items-center gap-1 sm:flex'>
                              <Calendar className='h-3 w-3' /> Moved in
                              {new Date(
                                resident.moveInDate
                              ).toLocaleDateString()}
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
      </CommandResponsiveDialog>
    </header>
  );
}
