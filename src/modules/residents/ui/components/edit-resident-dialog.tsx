'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { ResidentForm } from './resident-form';
import type { Resident } from '../../types';

interface EditResidentDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  resident?: Resident;
}

export function EditResidentDialog({
  open,
  onOpenChange,
  onSuccess,
  resident,
}: EditResidentDialogProps) {
  const handleSuccess = () => {
    onOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <ResponsiveDialog
      title='Edit Resident'
      description='Update resident information and unit assignment.'
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <ResidentForm
        resident={resident}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </ResponsiveDialog>
  );
}
