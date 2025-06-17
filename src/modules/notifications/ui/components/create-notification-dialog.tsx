'use client';

import { useTranslations } from 'next-intl';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { NotificationForm } from './notification-form';

interface CreateNotificationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateNotificationDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateNotificationDialogProps) {
  const t = useTranslations('notifications.form');

  const handleSuccess = () => {
    onOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <ResponsiveDialog
      title={t('dialogTitle')}
      description={t('dialogDescription')}
      open={open ?? false}
      onOpenChange={onOpenChange ?? (() => {})}
    >
      <NotificationForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </ResponsiveDialog>
  );
}
