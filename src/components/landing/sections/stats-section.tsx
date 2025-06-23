'use client';

import { useTranslations } from 'next-intl';

export const StatsSection = () => {
  const t = useTranslations('landing.stats');
  const stats = [
    {
      name: t('syndicates.label'),
      value: t('syndicates.value'),
      description: t('syndicates.description'),
    },
    {
      name: t('units.label'),
      value: t('units.value'),
      description: t('units.description'),
    },
    {
      name: t('transactions.label'),
      value: t('transactions.value'),
      description: t('transactions.description'),
    },
    {
      name: t('satisfaction.label'),
      value: t('satisfaction.value'),
      description: t('satisfaction.description'),
    },
  ];

  return (
    <div className='bg-white py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            {t('title')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-gray-600'>
            {t('subtitle')}
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 text-center sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4'>
          {stats.map(stat => (
            <div key={stat.name} className='flex flex-col-reverse'>
              <dt className='text-base leading-7 text-gray-600'>{stat.name}</dt>
              <dd className='text-2xl leading-9 font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {stat.value}
              </dd>
              <div className='text-sm text-gray-500'>{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

