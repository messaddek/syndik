import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description: string;
  ctaButtonContent?: ReactNode;
  ctaButtonCallback?: () => void;
}

export const PageHeader = ({
  title,
  description,
  ctaButtonContent,
  ctaButtonCallback,
}: PageHeaderProps) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </div>
      {ctaButtonContent && ctaButtonCallback && (
        <Button onClick={ctaButtonCallback}>{ctaButtonContent}</Button>
      )}
    </div>
  );
};
