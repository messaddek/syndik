'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Skeleton } from '@/components/ui/skeleton';

export default function AnnouncementsPage() {
  const trpc = useTRPC();

  const { data: announcements, isLoading } = useQuery(
    trpc.announcements.getAll.queryOptions({
      limit: 20,
      includeExpired: false,
    })
  );

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Announcements & News</h1>
        <p className='text-muted-foreground mt-2'>
          Stay updated with building news and important notifications.
        </p>
      </div>

      {isLoading ? (
        <div className='space-y-4'>
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
              </CardHeader>
              <CardContent>
                <Skeleton className='mb-2 h-4 w-full' />
                <Skeleton className='h-4 w-2/3' />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : announcements && announcements.length > 0 ? (
        <div className='space-y-4'>
          {announcements.map(announcement => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <Bell className='h-5 w-5' />
                    {announcement.title}
                  </CardTitle>
                  <Badge
                    variant={
                      announcement.priority === 'urgent'
                        ? 'destructive'
                        : announcement.priority === 'high'
                          ? 'default'
                          : 'secondary'
                    }
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <div className='text-muted-foreground flex items-center gap-4 text-sm'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    {new Date(announcement.publishedAt).toLocaleDateString()}
                  </div>
                  {announcement.expiresAt && (
                    <div className='text-orange-600'>
                      Expires:{' '}
                      {new Date(announcement.expiresAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className='whitespace-pre-wrap'>{announcement.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Bell className='h-5 w-5' />
              No Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              There are no active announcements at this time. Check back later
              for updates!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
