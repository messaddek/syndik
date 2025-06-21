'use client';

import { useTranslations } from 'next-intl';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { ResidentForm } from './resident-form';
import type { Resident } from '../../types';

interface EditResidentDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  resident?: Resident;
}

export const EditResidentDialog = ({
  open,
  onOpenChange,
  onSuccess,
  resident,
}: EditResidentDialogProps) => {
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
      title={t('editTitle')}
      description={t('editDescription')}
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
