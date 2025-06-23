'use client';

import { useTranslations } from 'next-intl';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { ResidentForm } from './resident-form';

interface CreateResidentDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateResidentDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateResidentDialogProps) => {
  const t = useTranslations('residents.form');

  const handleSuccess = () => {
    onOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <ResponsiveDialog
      title={t('addTitle')}
      description={t('description')}
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <ResidentForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </ResponsiveDialog>
  );
}
