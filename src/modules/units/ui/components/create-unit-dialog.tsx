'use client';

import { useTranslations } from 'next-intl';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { UnitForm } from './unit-form';

interface CreateUnitDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateUnitDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateUnitDialogProps) => {
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
      title={t('dialogs.addTitle')}
      description={t('dialogs.addDescription')}
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <UnitForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </ResponsiveDialog>
  );
}
