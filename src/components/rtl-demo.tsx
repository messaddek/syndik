'use client';

import { useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { rtlClassMap } from '@/lib/rtl-utils';
import { type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

export const RTLDemo = () => {
  const locale = useLocale() as Locale;

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className={rtlClassMap.textLeft(locale)}>RTL Demo</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Text alignment demo */}
        <div className='space-y-2'>
          <p className={rtlClassMap.textLeft(locale)}>
            This text should align to the start of the reading direction.
          </p>
          <p className={rtlClassMap.textRight(locale)}>
            This text should align to the end of the reading direction.
          </p>
        </div>
        {/* Margin/padding demo */}
        <div
          className={cn(
            'rounded bg-gray-100 p-4',
            rtlClassMap.ml(locale, '4'),
            'border-l-4 border-blue-500'
          )}
        >
          <p>This box has margin and border on the start side.</p>
        </div>
        {/* Button with icon demo */}
        <div className='flex gap-2'>
          
          <Button
            variant='outline'
            className={cn('flex items-center', 'gap-2')}
          >
            <ChevronLeft className='h-4 w-4' />
            <span>Previous</span>
          </Button>
          <Button
            variant='outline'
            className={cn('flex items-center', 'gap-2')}
          >
            <span>Next</span>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
        {/* Flexbox demo */}
        <div className='flex items-center justify-between rounded bg-gray-50 p-2'>
          <span>Start item</span>
          <span>End item</span>
        </div>
      </CardContent>
    </Card>
  );
}

