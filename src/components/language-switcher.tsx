'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className='w-32'>
        <SelectValue>
          <div className='flex items-center gap-2'>
            <span>{localeFlags[locale]}</span>
            <span className='hidden sm:inline'>{localeNames[locale]}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {locales.map(loc => (
          <SelectItem key={loc} value={loc}>
            <div className='flex items-center gap-2'>
              <span>{localeFlags[loc]}</span>
              <span>{localeNames[loc]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
