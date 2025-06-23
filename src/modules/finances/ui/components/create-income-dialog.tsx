'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useTranslations } from 'next-intl';
import { IncomeForm } from './income-form';

interface CreateIncomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateIncomeDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateIncomeDialogProps) => {
  const t = useTranslations('finance.createIncomeDialog');

  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('title')}
      description={t('description')}
      className='sm:max-w-4xl'
    >
      <IncomeForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </ResponsiveDialog>
  );
};
