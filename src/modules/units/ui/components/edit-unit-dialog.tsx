'use client';

import { useTranslations } from 'next-intl';
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
  const t = useTranslations('units');

  const handleSuccess = () => {
    onOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <ResponsiveDialog
      title={t('dialogs.editTitle')}
      description={t('dialogs.editDescription')}
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <UnitForm unit={unit} onSuccess={handleSuccess} onCancel={handleCancel} />
    </ResponsiveDialog>
  );
}
