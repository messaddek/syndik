'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { ResidentForm } from './resident-form';

interface CreateResidentDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateResidentDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateResidentDialogProps) {
  const handleSuccess = () => {
    onOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <ResponsiveDialog
      title='Add New Resident'
      description='Add a new resident to your building management system.'
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <ResidentForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </ResponsiveDialog>
  );
}
