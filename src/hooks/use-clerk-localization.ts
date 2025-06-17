'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Locale } from '@/i18n/config';
import { arSA, enUS, frFR } from '@clerk/localizations';
import type { LocalizationResource } from '@clerk/types';

export const useClerkLocalization = (): LocalizationResource => {
  const locale = useLocale() as Locale;
  const t = useTranslations('orgSwitcher.clerk');

  // Get the base localization for the current locale
  const baseLocalization =
    locale === 'ar' ? arSA : locale === 'fr' ? frFR : enUS;

  // Create a deep copy of the base localization
  const customLocalization = JSON.parse(
    JSON.stringify(baseLocalization)
  ) as LocalizationResource;

  // Override specific organization-related terms with residence terms using translation keys
  if (customLocalization.organizationSwitcher) {
    customLocalization.organizationSwitcher.action__createOrganization = t(
      'organizationSwitcher.action__createOrganization'
    );

    customLocalization.organizationSwitcher.action__manageOrganization = t(
      'organizationSwitcher.action__manageOrganization'
    );

    customLocalization.organizationSwitcher.notSelected = t(
      'organizationSwitcher.notSelected'
    );
  }

  if (customLocalization.organizationList) {
    customLocalization.organizationList.action__createOrganization = t(
      'organizationList.action__createOrganization'
    );

    customLocalization.organizationList.createOrganization = t(
      'organizationList.createOrganization'
    );

    customLocalization.organizationList.titleWithoutPersonal = t(
      'organizationList.titleWithoutPersonal'
    );
  }

  if (customLocalization.createOrganization) {
    customLocalization.createOrganization.formButtonSubmit = t(
      'createOrganization.formButtonSubmit'
    );

    customLocalization.createOrganization.title = t('createOrganization.title');
  }

  // Override form field labels for organization terminology
  if (customLocalization.formFieldLabel__organizationName) {
    customLocalization.formFieldLabel__organizationName = t(
      'formFieldLabel__organizationName'
    );
  }

  if (customLocalization.formFieldInputPlaceholder__organizationName) {
    customLocalization.formFieldInputPlaceholder__organizationName = t(
      'formFieldInputPlaceholder__organizationName'
    );
  }

  return customLocalization;
};
