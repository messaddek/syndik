'use client';

import { useTranslations } from 'next-intl';
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
} from 'lucide-react';

export function FeaturesSection() {
  const t = useTranslations('landing.features');
  const features = [
    {
      name: t('buildingManagement.title'),
      description: t('buildingManagement.description'),
      icon: Building2,
    },
    {
      name: t('residentPortal.title'),
      description: t('residentPortal.description'),
      icon: Users,
    },
    {
      name: t('financialTracking.title'),
      description: t('financialTracking.description'),
      icon: TrendingUp,
    },
    {
      name: t('secureCompliant.title'),
      description: t('secureCompliant.description'),
      icon: Shield,
    },
    {
      name: t('meetingManagement.title'),
      description: t('meetingManagement.description'),
      icon: Clock,
    },
    {
      name: t('automatedWorkflows.title'),
      description: t('automatedWorkflows.description'),
      icon: CheckCircle,
    },
  ];

  return (
    <div className='bg-gray-50 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {' '}
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-primary text-base leading-7 font-semibold'>
            {t('subtitle')}
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            {t('title')}
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            {t('description')}
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            {features.map(feature => (
              <div key={feature.name} className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900'>
                  <feature.icon
                    className='text-primary h-5 w-5 flex-none'
                    aria-hidden='true'
                  />
                  {feature.name}
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
