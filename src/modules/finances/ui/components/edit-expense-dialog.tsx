'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useTranslations } from 'next-intl';
import { ExpenseForm } from './expense-form';
import type { Expense } from '../../../expenses/types';

interface EditExpenseDialogProps {
  expense: Expense;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditExpenseDialog({
  expense,
  open,
  onOpenChange,
  onSuccess,
}: EditExpenseDialogProps) {
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
      title={`${t('buttons.edit')} ${t('tabs.expenses')}`}
      description='Update the expense details below.'
      className='sm:max-w-4xl'
    >
      <ExpenseForm
        expense={expense}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </ResponsiveDialog>
  );
}
