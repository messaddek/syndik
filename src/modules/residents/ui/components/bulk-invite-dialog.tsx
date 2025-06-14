'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Loader2, Users, UserCheck, User } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BulkInviteDialogProps {
  children: React.ReactNode;
}

export function BulkInviteDialog({ children }: BulkInviteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedResidents, setSelectedResidents] = useState<string[]>([]);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Fetch uninvited residents
  const { data: uninvitedResidents = [], isLoading } = useQuery(
    trpc.residents.getUninvitedResidents.queryOptions({ limit: 50 })
  );

  // Bulk invite mutation
  const bulkInviteMutation = useMutation(
    trpc.residents.bulkInviteToPortal.mutationOptions({
      onSuccess: data => {
        const { successCount, errorCount } = data;

        if (successCount > 0) {
          toast.success(
            `Successfully sent ${successCount} invitation${successCount > 1 ? 's' : ''}`
          );
        }

        if (errorCount > 0) {
          toast.error(
            `Failed to send ${errorCount} invitation${errorCount > 1 ? 's' : ''}`
          );
        }

        setSelectedResidents([]);
        setIsOpen(false);

        // Invalidate relevant queries
        queryClient.invalidateQueries(
          trpc.residents.getUninvitedResidents.queryOptions({})
        );
        queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
      },
      onError: error => {
        toast.error(`Failed to send invitations: ${error.message}`);
      },
    })
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedResidents(uninvitedResidents.map(r => r.id));
    } else {
      setSelectedResidents([]);
    }
  };

  const handleSelectResident = (residentId: string, checked: boolean) => {
    if (checked) {
      setSelectedResidents(prev => [...prev, residentId]);
    } else {
      setSelectedResidents(prev => prev.filter(id => id !== residentId));
    }
  };

  const handleSendInvitations = () => {
    if (selectedResidents.length === 0) {
      toast.error('Please select at least one resident to invite');
      return;
    }

    bulkInviteMutation.mutate({ residentIds: selectedResidents });
  };
  const isAllSelected =
    selectedResidents.length === uninvitedResidents.length &&
    uninvitedResidents.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2'>
            <Users className='h-5 w-5' />
            <span>Invite Residents to Portal</span>
          </DialogTitle>
          <DialogDescription>
            Select residents to invite to the resident portal. They will receive
            an email invitation to join.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Summary */}
          <div className='bg-muted flex items-center justify-between rounded-lg p-3'>
            <div className='flex items-center space-x-2'>
              <Mail className='text-muted-foreground h-4 w-4' />
              <span className='text-sm'>
                {uninvitedResidents.length} resident
                {uninvitedResidents.length !== 1 ? 's' : ''}
                {uninvitedResidents.length > 0 ? ' not yet invited' : ''}
              </span>
            </div>
            {selectedResidents.length > 0 && (
              <Badge variant='secondary'>
                {selectedResidents.length} selected
              </Badge>
            )}
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className='flex items-center justify-center py-8'>
              <Loader2 className='h-6 w-6 animate-spin' />
              <span className='ml-2'>Loading residents...</span>
            </div>
          )}

          {/* No uninvited residents */}
          {!isLoading && uninvitedResidents.length === 0 && (
            <div className='py-8 text-center'>
              <Users className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
              <p className='text-muted-foreground'>
                All active residents have already been invited to the portal.
              </p>
            </div>
          )}

          {/* Residents list */}
          {!isLoading && uninvitedResidents.length > 0 && (
            <>
              {' '}
              {/* Select all checkbox */}
              <div className='flex items-center space-x-2 rounded-lg border p-3'>
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                />
                <label className='text-sm font-medium'>
                  {isAllSelected ? 'Deselect all' : 'Select all'}
                </label>
              </div>
              {/* Residents list */}
              <ScrollArea className='h-64 w-full rounded-lg border'>
                <div className='space-y-3 p-4'>
                  {uninvitedResidents.map(resident => (
                    <div
                      key={resident.id}
                      className='hover:bg-muted/50 flex items-center space-x-3 rounded-lg p-3'
                    >
                      <Checkbox
                        checked={selectedResidents.includes(resident.id)}
                        onCheckedChange={checked =>
                          handleSelectResident(resident.id, checked as boolean)
                        }
                      />
                      <div className='min-w-0 flex-1'>
                        <div className='flex items-center space-x-2'>
                          <p className='truncate text-sm font-medium'>
                            {resident.firstName} {resident.lastName}
                          </p>
                          <Badge
                            variant={resident.isOwner ? 'default' : 'secondary'}
                            className='text-xs'
                          >
                            {resident.isOwner ? (
                              <>
                                <UserCheck className='mr-1 h-3 w-3' />
                                Owner
                              </>
                            ) : (
                              <>
                                <User className='mr-1 h-3 w-3' />
                                Tenant
                              </>
                            )}
                          </Badge>
                        </div>
                        <p className='text-muted-foreground truncate text-sm'>
                          {resident.email}
                        </p>
                        {resident.phone && (
                          <p className='text-muted-foreground text-xs'>
                            {resident.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}

          {/* Actions */}
          {uninvitedResidents.length > 0 && (
            <div className='flex items-center justify-between pt-4'>
              <Button variant='outline' onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSendInvitations}
                disabled={
                  selectedResidents.length === 0 || bulkInviteMutation.isPending
                }
              >
                {bulkInviteMutation.isPending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className='mr-2 h-4 w-4' />
                    Send {selectedResidents.length} Invitation
                    {selectedResidents.length !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
