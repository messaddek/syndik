'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Resident } from '../../types';

interface ResidentInviteButtonProps {
  resident: Resident;
  disabled?: boolean;
}

export function ResidentInviteButton({
  resident,
  disabled = false,
}: ResidentInviteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(resident.email);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const inviteMutation = useMutation(
    trpc.residents.inviteToPortal.mutationOptions({
      onSuccess: data => {
        toast.success(
          `Portal invitation sent to ${data.emailAddress} for ${data.residentName}`
        );
        setIsOpen(false);
        // Invalidate relevant queries
        queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
      },
      onError: error => {
        toast.error(`Failed to send invitation: ${error.message}`);
      },
    })
  );

  const handleInvite = () => {
    if (!email.trim()) {
      toast.error('Email address is required');
      return;
    }

    inviteMutation.mutate({
      residentId: resident.id,
      email: email.trim(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          disabled={disabled}
          className='h-8 w-8 p-0'
        >
          <Mail className='h-4 w-4' />
          <span className='sr-only'>Invite to Portal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Invite to Resident Portal</DialogTitle>
          <DialogDescription>
            Send an invitation to {resident.firstName} {resident.lastName} to
            access the resident portal.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter email address'
              disabled={inviteMutation.isPending}
            />
          </div>

          <div className='flex justify-end space-x-2'>
            <Button
              variant='outline'
              onClick={() => setIsOpen(false)}
              disabled={inviteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleInvite}
              disabled={inviteMutation.isPending || !email.trim()}
            >
              {inviteMutation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Sending...
                </>
              ) : (
                <>
                  <Send className='mr-2 h-4 w-4' />
                  Send Invitation
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
