'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';
import { ChevronDownIcon } from 'lucide-react';

export const LanguageSwitcher = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='w-32'>
          <div className='flex items-center gap-2'>
            <span>{localeFlags[locale]}</span>
            <span className='hidden sm:inline'>{localeNames[locale]}</span>
            <ChevronDownIcon className='ml-auto h-4 w-4 rtl:mr-auto rtl:ml-0' />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map(loc => (
          <DropdownMenuItem key={loc} onClick={() => handleLanguageChange(loc)}>
            <div className='flex items-center gap-2'>
              <span>{localeFlags[loc]}</span>
              <span>{localeNames[loc]}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
