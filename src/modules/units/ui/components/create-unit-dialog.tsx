'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { UnitForm } from './unit-form';

interface CreateUnitDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateUnitDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateUnitDialogProps) {
  const handleSuccess = () => {
    onOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <ResponsiveDialog
      title='Add New Unit'
      description='Create a new unit in your building. Fill in the details below.'
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <UnitForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </ResponsiveDialog>
  );
}
