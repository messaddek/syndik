'use client';

import { useTranslations } from 'next-intl';
import { Clock, DollarSign, Bell, FileText } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { Badge } from '../../ui/badge';

export const BenefitsSection = () => {
  const t = useTranslations('landing.benefits');
  const benefits = [
    {
      title: t('saveTime.title'),
      description: t('saveTime.description'),
      icon: Clock,
      metric: t('saveTime.metric'),
    },
    {
      title: t('reduceCosts.title'),
      description: t('reduceCosts.description'),
      icon: DollarSign,
      metric: t('reduceCosts.metric'),
    },
    {
      title: t('improveCommunication.title'),
      description: t('improveCommunication.description'),
      icon: Bell,
      metric: t('improveCommunication.metric'),
    },
    {
      title: t('betterOrganization.title'),
      description: t('betterOrganization.description'),
      icon: FileText,
      metric: t('betterOrganization.metric'),
    },
  ];

  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        
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
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8'>
          {benefits.map(benefit => (
            <Card key={benefit.title} className='border-none shadow-lg'>
              <CardHeader>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100'>
                    <benefit.icon className='text-primary h-6 w-6' />
                  </div>
                  <div>
                    <CardTitle className='text-lg'>{benefit.title}</CardTitle>
                    <Badge variant='secondary' className='mt-1'>
                      {benefit.metric}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-base'>
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

