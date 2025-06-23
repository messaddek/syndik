'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { BuildingForm } from './building-form';
import { useTranslations } from 'next-intl';

interface CreateBuildingDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateBuildingDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateBuildingDialogProps) => {
  const t = useTranslations('buildings');

  const handleSuccess = () => {
    onOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <ResponsiveDialog
      title={t('addBuilding')}
      description={t('addBuildingDescription')}
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <BuildingForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </ResponsiveDialog>
  );
}
