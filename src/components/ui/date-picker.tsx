'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useLocale } from 'next-intl';
import { ar, enUS, fr } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type Locale } from '@/i18n/config';

// Locale mapping for date-fns
const localeMap = {
  en: enUS,
  fr: fr,
  ar: ar,
} as const;

interface DatePickerProps {
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  align?: 'start' | 'center' | 'end';
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Pick a date',
  disabled = false,
  className,
  align = 'start',
  minDate = new Date('1900-01-01'),
  maxDate = new Date(),
}: DatePickerProps) => {
  const locale = useLocale() as Locale;
  const dateLocale = localeMap[locale];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal rtl:text-right',
            !value && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          {value ? (
            format(new Date(value), 'PPP', { locale: dateLocale })
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50 rtl:mr-auto rtl:ml-0' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align={align}>
        <Calendar
          mode='single'
          selected={value ? new Date(value) : undefined}
          onSelect={date => {
            onChange?.(date ? date.toISOString().split('T')[0] : '');
          }}
          disabled={date => date > maxDate || date < minDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
