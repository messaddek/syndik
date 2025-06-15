'use client';

import { useTranslations } from 'next-intl';
import {
  UserCheck,
  Users,
  BarChart3,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

export function HowItWorksSection() {
  const t = useTranslations('landing.howItWorks');
  const steps = [
    {
      step: '01',
      title: t('steps.signUp.title'),
      description: t('steps.signUp.description'),
      icon: UserCheck,
    },
    {
      step: '02',
      title: t('steps.invite.title'),
      description: t('steps.invite.description'),
      icon: Users,
    },
    {
      step: '03',
      title: t('steps.manage.title'),
      description: t('steps.manage.description'),
      icon: BarChart3,
    },
    {
      step: '04',
      title: t('steps.grow.title'),
      description: t('steps.grow.description'),
      icon: TrendingUp,
    },
  ];

  return (
    <div className='bg-gray-50 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {' '}
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-base leading-7 font-semibold text-blue-600'>
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
          <div className='grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-4'>
            {steps.map((step, index) => (
              <div
                key={step.step}
                className='flex flex-col items-center text-center'
              >
                <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
                  <step.icon className='h-8 w-8 text-blue-600' />
                </div>
                <div className='mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white'>
                  {step.step}
                </div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {step.title}
                </h3>
                <p className='mt-2 text-sm text-gray-600'>{step.description}</p>
                {index < steps.length - 1 && (
                  <div className='mt-8 hidden lg:block'>
                    <ArrowRight className='h-5 w-5 text-gray-400' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
