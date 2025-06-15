import { JSX, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useTranslations } from 'next-intl';

export const useConfirm = (
  title: string,
  description: string,
  isDestructive: boolean = false
): [() => JSX.Element, () => Promise<unknown>] => {
  const t = useTranslations('common');
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise(resolve => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    if (promise) {
      promise.resolve(true);
      setPromise(null);
    }
  };

  const handleCancel = () => {
    if (promise) {
      promise.resolve(false);
      handleClose();
    }
  };

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      open={promise !== null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div className='flex w-full flex-col-reverse items-center justify-end gap-x-2 gap-y-2 pt-4 lg:flex-row'>
        <Button
          variant='outline'
          className='w-full lg:w-auto'
          onClick={handleCancel}
        >
          {t('cancel')}
        </Button>
        <Button
          className='w-full lg:w-auto'
          onClick={handleConfirm}
          variant={isDestructive ? 'destructive' : undefined}
        >
          {t('confirm')}
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmationDialog, confirm];
};
