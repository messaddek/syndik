'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { format, isAfter } from 'date-fns';
import { CreateMeetingDialog } from './create-meeting-dialog';
import { Meeting } from '@/modules/meetings/types';
import { useTRPC } from '@/trpc/client';
import { useConfirm } from '@/hooks/use-confirm';
import Link from 'next/link';

export function MeetingsContent() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete Meeting',
    'Are you sure you want to delete this meeting? This action cannot be undone.'
  );

  const { data: allMeetings = [] } = useQuery(
    trpc.meetings.getAll.queryOptions({})
  );

  const { data: upcomingMeetings = [] } = useQuery(
    trpc.meetings.getAll.queryOptions({ upcoming: true })
  );

  const { data: buildingsData = { data: [] } } = useQuery(
    trpc.buildings.getAll.queryOptions({})
  );
  const buildings = buildingsData.data || [];

  const completeMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getAll.queryOptions({}));
      },
    })
  );

  const deleteMeeting = useMutation(
    trpc.meetings.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getAll.queryOptions({}));
      },
    })
  );

  const handleMarkComplete = async (id: string) => {
    await completeMeeting.mutateAsync({
      id,
      data: { isCompleted: true },
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      await deleteMeeting.mutateAsync({ id });
    }
  };
  const getBuildingName = (buildingId?: string | null) => {
    if (!buildingId) return 'General Meeting';
    const building = buildings.find(b => b.id === buildingId);
    return building?.name || 'Unknown Building';
  };
  const isUpcoming = (date: Date) => isAfter(new Date(date), new Date());

  const pastMeetings = allMeetings.filter(
    meeting => !isUpcoming(meeting.scheduledDate) || meeting.isCompleted
  );

  const MeetingCard = ({
    meeting,
    isPast = false,
  }: {
    meeting: Meeting;
    isPast?: boolean;
  }) => (
    <Card key={meeting.id}>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-lg'>
              {meeting.title}
              {meeting.isCompleted && (
                <Badge
                  variant='default'
                  className='bg-green-100 text-green-800'
                >
                  <CheckCircle className='mr-1 h-3 w-3' />
                  Completed
                </Badge>
              )}
              {!meeting.isCompleted && isUpcoming(meeting.scheduledDate) && (
                <Badge variant='outline'>
                  <Clock className='mr-1 h-3 w-3' />
                  Upcoming
                </Badge>
              )}
            </CardTitle>
            <CardDescription className='flex items-center gap-4'>
              <span className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                {format(new Date(meeting.scheduledDate), "PPP 'at' p")}
              </span>
              {meeting.location && (
                <span className='flex items-center gap-1'>
                  <MapPin className='h-4 w-4' />
                  {meeting.location}
                </span>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <p className='text-muted-foreground text-sm'>
            {meeting.buildingId ? (
              <Link
                href={`/buildings/${meeting.buildingId}`}
                className='text-blue-600 hover:underline'
              >
                {getBuildingName(meeting.buildingId)}
              </Link>
            ) : (
              getBuildingName(meeting.buildingId)
            )}
          </p>

          {meeting.description && (
            <p className='text-sm'>{meeting.description}</p>
          )}

          {meeting.agenda && (
            <div>
              <h4 className='mb-1 text-sm font-medium'>Agenda:</h4>
              <p className='text-sm text-gray-600'>{meeting.agenda}</p>
            </div>
          )}

          {meeting.minutes && (
            <div>
              <h4 className='mb-1 text-sm font-medium'>Minutes:</h4>
              <p className='text-sm text-gray-600'>{meeting.minutes}</p>
            </div>
          )}

          {meeting.maxParticipants && (
            <p className='text-muted-foreground flex items-center gap-1 text-sm'>
              <Users className='h-4 w-4' />
              Max participants: {meeting.maxParticipants}
            </p>
          )}
        </div>

        <div className='mt-4 flex gap-2'>
          {!meeting.isCompleted && !isPast && (
            <Button
              variant='outline'
              size='sm'
              onClick={() => handleMarkComplete(meeting.id)}
              disabled={completeMeeting.isPending}
            >
              Mark Complete
            </Button>
          )}
          <Button
            variant='destructive'
            size='sm'
            onClick={() => handleDelete(meeting.id)}
            disabled={deleteMeeting.isPending}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='space-y-6'>
      {/* Stats Overview */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Meetings
            </CardTitle>
            <Calendar className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{allMeetings.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Upcoming</CardTitle>
            <Clock className='text-muted-foreground h-4 w-4' />
          </CardHeader>{' '}
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>
              {upcomingMeetings.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Completed</CardTitle>
            <CheckCircle className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              {allMeetings.filter(m => m.isCompleted).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>This Month</CardTitle>
            <Calendar className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {
                allMeetings.filter(m => {
                  const meetingDate = new Date(m.scheduledDate);
                  const now = new Date();
                  return (
                    meetingDate.getMonth() === now.getMonth() &&
                    meetingDate.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Meeting Button */}
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Meetings Management</h2>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Schedule Meeting
        </Button>
      </div>

      {/* Meetings Tabs */}
      <Tabs defaultValue='upcoming' className='w-full'>
        <TabsList>
          <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
          <TabsTrigger value='past'>Past</TabsTrigger>
          <TabsTrigger value='all'>All</TabsTrigger>
        </TabsList>{' '}
        <TabsContent value='upcoming' className='space-y-4'>
          {upcomingMeetings.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center p-8'>
                <h3 className='mb-2 text-lg font-medium text-gray-900'>
                  No upcoming meetings
                </h3>
                <p className='mb-4 text-sm text-gray-600'>
                  Schedule your next meeting to keep residents informed.
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className='mr-2 h-4 w-4' />
                  Schedule First Meeting
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-4'>
              {upcomingMeetings.map(meeting => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value='past' className='space-y-4'>
          {pastMeetings.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center p-8'>
                <h3 className='mb-2 text-lg font-medium text-gray-900'>
                  No past meetings
                </h3>
                <p className='text-sm text-gray-600'>
                  Past meetings will appear here once they are completed.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-4'>
              {pastMeetings.map(meeting => (
                <MeetingCard key={meeting.id} meeting={meeting} isPast />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value='all' className='space-y-4'>
          {allMeetings.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center p-8'>
                <h3 className='mb-2 text-lg font-medium text-gray-900'>
                  No meetings found
                </h3>
                <p className='mb-4 text-sm text-gray-600'>
                  Start by scheduling your first meeting.
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className='mr-2 h-4 w-4' />
                  Schedule First Meeting
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-4'>
              {allMeetings.map(meeting => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          )}{' '}
        </TabsContent>
      </Tabs>

      {/* Create Meeting Dialog */}
      <CreateMeetingDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={() => {
          queryClient.invalidateQueries(trpc.meetings.getAll.queryOptions({}));
        }}
      />
      <ConfirmDialog />
    </div>
  );
}
