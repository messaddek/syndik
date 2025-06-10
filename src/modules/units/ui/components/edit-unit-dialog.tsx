'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { UnitForm } from './unit-form';
import type { Unit } from '../../types';

interface EditUnitDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  unit?: Unit;
}

export function EditUnitDialog({
  open,
  onOpenChange,
  onSuccess,
  unit,
}: EditUnitDialogProps) {
  const handleSuccess = () => {
    onOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <ResponsiveDialog
      title='Edit Unit'
      description='Update the unit details below.'
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <UnitForm unit={unit} onSuccess={handleSuccess} onCancel={handleCancel} />
    </ResponsiveDialog>
  );
}
