import { Skeleton } from '@/components/ui/skeleton';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { Building2, Home, Users } from 'lucide-react';

export function SearchResultsSkeleton() {
  return (
    <>
      {/* Buildings skeleton */}
      <CommandGroup heading='Buildings'>
        {[1].map(i => (
          <CommandItem
            key={`building-${i}`}
            className='flex items-start gap-3 p-3'
          >
            <Building2 className='text-primary mt-0.5 h-4 w-4' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-32' />
              <div className='flex items-center gap-1'>
                <Skeleton className='h-3 w-3 rounded-full' />
                <Skeleton className='h-3 w-24' />
              </div>
              <Skeleton className='h-3 w-16' />
            </div>
          </CommandItem>
        ))}
      </CommandGroup>

      {/* Units skeleton */}
      <CommandGroup heading='Units'>
        {[1].map(i => (
          <CommandItem key={`unit-${i}`} className='flex items-start gap-3 p-3'>
            <Home className='mt-0.5 h-4 w-4 text-green-600' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-3 w-16' />
              <div className='flex items-center gap-2'>
                <Skeleton className='h-3 w-12' />
                <Skeleton className='h-4 w-16 rounded-full' />
                <Skeleton className='h-3 w-20' />
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>

      {/* Residents skeleton */}
      <CommandGroup heading='Residents'>
        {[1].map(i => (
          <CommandItem
            key={`resident-${i}`}
            className='flex items-start gap-3 p-3'
          >
            <Users className='mt-0.5 h-4 w-4 text-purple-600' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-28' />
              <div className='flex items-center gap-1'>
                <Skeleton className='h-3 w-3 rounded-full' />
                <Skeleton className='h-3 w-32' />
              </div>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1'>
                  <Skeleton className='h-3 w-3 rounded-full' />
                  <Skeleton className='h-3 w-20' />
                </div>
                <Skeleton className='h-4 w-12 rounded-full' />
                <div className='flex items-center gap-1'>
                  <Skeleton className='h-3 w-3 rounded-full' />
                  <Skeleton className='h-3 w-24' />
                </div>
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
}

export function SearchLoadingSkeleton() {
  return (
    <div className='flex items-center justify-center p-6'>
      <div className='flex items-center gap-2'>
        <Skeleton className='h-4 w-4 animate-pulse rounded-full' />
        <Skeleton className='h-4 w-20' />
      </div>
    </div>
  );
}
