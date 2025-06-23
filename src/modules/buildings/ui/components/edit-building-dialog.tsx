'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { BuildingForm } from './building-form';
import { useTranslations } from 'next-intl';
import { Building } from '../../types';

interface EditBuildingDialogProps {
  building: Building;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export const EditBuildingDialog = ({
  building,
  open,
  onOpenChange,
  onSuccess,
}: EditBuildingDialogProps) => {
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
      title={t('editBuilding')}
      description={t('editBuildingDescription')}
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <BuildingForm
        building={building}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </ResponsiveDialog>
  );
}
