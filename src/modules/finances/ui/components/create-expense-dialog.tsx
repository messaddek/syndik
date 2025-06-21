'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useTranslations } from 'next-intl';
import { ExpenseForm } from './expense-form';

interface CreateExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateExpenseDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateExpenseDialogProps) {
  const t = useTranslations('finance.createExpenseDialog');

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
      <ExpenseForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </ResponsiveDialog>
  );
}
