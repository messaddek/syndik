'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useTranslations } from 'next-intl';
import { IncomeForm } from './income-form';
import type { Income } from '../../../incomes/types';

interface EditIncomeDialogProps {
  income: Income;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const EditIncomeDialog = ({
  income,
  open,
  onOpenChange,
  onSuccess,
}: EditIncomeDialogProps) => {
  const t = useTranslations('finance');

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
      title={`${t('buttons.edit')} ${t('tabs.incomes')}`}
      description='Update the income details below.'
      className='sm:max-w-4xl'
    >
      <IncomeForm
        income={income}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </ResponsiveDialog>
  );
}
