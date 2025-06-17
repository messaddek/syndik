'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('residents');

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
      toast.error(t('invite.emailRequired'));
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
          <span className='sr-only'>{t('actions.invite')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        {' '}
        <DialogHeader>
          <DialogTitle>{t('invite.dialogTitle')}</DialogTitle>
          <DialogDescription>
            {t('invite.dialogDescription', {
              firstName: resident.firstName,
              lastName: resident.lastName,
            })}
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='space-y-2'>
            {' '}
            <Label htmlFor='email'>{t('invite.emailLabel')}</Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('invite.emailPlaceholder')}
              disabled={inviteMutation.isPending}
            />
          </div>

          <div className='flex justify-end space-x-2'>
            {' '}
            <Button
              variant='outline'
              onClick={() => setIsOpen(false)}
              disabled={inviteMutation.isPending}
            >
              {t('invite.cancel')}
            </Button>
            <Button
              onClick={handleInvite}
              disabled={inviteMutation.isPending || !email.trim()}
            >
              {inviteMutation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  {t('actions.sendInvitation')}...
                </>
              ) : (
                <>
                  <Send className='mr-2 h-4 w-4' />
                  {t('invite.send')}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
