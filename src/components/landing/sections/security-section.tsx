'use client';

import { useTranslations } from 'next-intl';
import { Lock, UserCheck, Shield, Database, Award, Globe } from 'lucide-react';

export function SecuritySection() {
  const t = useTranslations('landing.security');
  const securityFeatures = [
    {
      title: t('features.encryption.title'),
      description: t('features.encryption.description'),
      icon: Lock,
    },
    {
      title: t('features.roleBasedAccess.title'),
      description: t('features.roleBasedAccess.description'),
      icon: UserCheck,
    },
    {
      title: t('features.gdprCompliant.title'),
      description: t('features.gdprCompliant.description'),
      icon: Shield,
    },
    {
      title: t('features.regularBackups.title'),
      description: t('features.regularBackups.description'),
      icon: Database,
    },
    {
      title: t('features.soc2Certified.title'),
      description: t('features.soc2Certified.description'),
      icon: Award,
    },
    {
      title: t('features.monitoring.title'),
      description: t('features.monitoring.description'),
      icon: Globe,
    },
  ];

  return (
    <div className='bg-gray-900 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {' '}
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-base leading-7 font-semibold text-blue-400'>
            {t('subtitle')}
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            {t('title')}
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-300'>
            {t('description')}
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {securityFeatures.map(feature => (
            <div key={feature.title} className='flex flex-col'>
              <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600'>
                <feature.icon className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white'>
                {feature.title}
              </h3>
              <p className='mt-2 text-base text-gray-300'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>{' '}
        <div className='mt-16 text-center'>
          <div className='inline-flex items-center space-x-6 rounded-lg bg-gray-800 px-6 py-4'>
            <Shield className='h-8 w-8 text-blue-400' />{' '}
            <div className='text-left'>
              <div className='text-sm font-medium text-white'>
                {t('certificationLabel')}
              </div>
              <div className='text-sm text-gray-400'>
                {t('certificationText')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
