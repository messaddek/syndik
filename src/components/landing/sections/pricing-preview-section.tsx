'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { Badge } from '../../ui/badge';
import {
  Building2,
  TrendingUp,
  Shield,
  CheckCircle,
  ChevronRight,
  Globe,
  Award,
  Users,
} from 'lucide-react';

export function PricingPreviewSection() {
  const t = useTranslations('landing.pricing');
  const [isYearly, setIsYearly] = useState(false);

  // Get features arrays from translations
  const starterFeatures = t.raw('plans.starter.features') as string[];
  const professionalFeatures = t.raw('plans.professional.features') as string[];
  const enterpriseFeatures = t.raw('plans.enterprise.features') as string[];

  // Pricing calculation with yearly discount
  const getPrice = (monthlyPrice: number) => {
    if (isYearly) {
      const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount
      return Math.round(yearlyPrice);
    }
    return monthlyPrice;
  };
  const getPeriod = () => {
    return isYearly ? t('billing.period.year') : t('billing.period.month');
  };
  const plans = [
    {
      name: t('plans.starter.name'),
      price: `$${getPrice(49)}`,
      period: getPeriod(),
      description: t('plans.starter.description'),
      features: starterFeatures,
      popular: false,
      gradient: 'from-gray-50 to-gray-100',
      buttonGradient: 'from-gray-600 to-gray-700',
      hoverGradient: 'hover:from-gray-700 hover:to-gray-800',
      icon: Building2,
    },
    {
      name: t('plans.professional.name'),
      price: `$${getPrice(99)}`,
      period: getPeriod(),
      description: t('plans.professional.description'),
      features: professionalFeatures,
      popular: true,
      gradient: 'from-blue-50 to-indigo-50',
      buttonGradient: 'from-blue-600 to-indigo-600',
      hoverGradient: 'hover:from-blue-700 hover:to-indigo-700',
      icon: TrendingUp,
    },
    {
      name: t('plans.enterprise.name'),
      price: t('plans.enterprise.price'),
      period: '',
      description: t('plans.enterprise.description'),
      features: enterpriseFeatures,
      popular: false,
      gradient: 'from-purple-50 to-pink-50',
      buttonGradient: 'from-purple-600 to-pink-600',
      hoverGradient: 'hover:from-purple-700 hover:to-pink-700',
      icon: Shield,
    },
  ];

  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 sm:py-32'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-200/30 to-pink-200/30 blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/10 to-blue-100/20 blur-3xl'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <div className='mb-6 inline-flex items-center gap-x-2 rounded-full border border-blue-200/50 bg-blue-100/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur-sm'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-blue-500'></span>
            {t('badge')}
          </div>
          <h2 className='mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
            {t('title')}
          </h2>
          <p className='mx-auto mb-6 max-w-2xl text-xl leading-8 text-gray-600'>
            {t('description')}
          </p>{' '}
          <div className='inline-flex items-center space-x-2 text-sm text-gray-500'>
            <CheckCircle className='h-4 w-4 text-green-500' />
            <span>{t('guarantees.support')}</span>
            <span className='mx-2'>•</span>
            <CheckCircle className='h-4 w-4 text-green-500' />
            <span>{t('guarantees.uptime')}</span>
            <span className='mx-2'>•</span>
            <CheckCircle className='h-4 w-4 text-green-500' />
            <span>{t('guarantees.gdpr')}</span>
          </div>
          {/* Billing Toggle */}
          <div className='mt-8 flex flex-col items-center space-y-4'>
            <div className='flex items-center space-x-4 rounded-full border border-gray-200 bg-white/80 p-1 shadow-sm backdrop-blur-sm'>
              {' '}
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  'rounded-full px-6 py-2 text-sm font-medium transition-all duration-200',
                  !isYearly
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {t('billing.monthly')}
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  'rounded-full px-6 py-2 text-sm font-medium transition-all duration-200',
                  isYearly
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {t('billing.yearly')}
              </button>
            </div>{' '}
            {/* Discount Notification for Monthly */}
            {!isYearly && (
              <div className='animate-pulse rounded-lg border border-green-200 bg-green-50/80 px-4 py-2 text-center shadow-sm backdrop-blur-sm'>
                <p className='text-sm text-green-700'>
                  <span className='font-semibold'>
                    💰 {t('billing.discount.save')}
                  </span>{' '}
                  {t('billing.discount.message')}
                </p>
              </div>
            )}{' '}
            {/* Yearly Savings Indicator */}
            {isYearly && (
              <div className='rounded-lg border border-green-200 bg-green-50/80 px-4 py-2 text-center shadow-sm backdrop-blur-sm'>
                <p className='text-sm text-green-700'>
                  <span className='font-semibold'>
                    🎉 {t('billing.discount.saving')}
                  </span>{' '}
                  {t('billing.discount.yearlyMessage')}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='mx-auto mt-20 grid max-w-lg grid-cols-1 gap-8 lg:max-w-6xl lg:grid-cols-3'>
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={cn(
                'group relative overflow-hidden border-0 bg-gradient-to-br backdrop-blur-sm',
                'transition-all duration-300 ease-out',
                'hover:scale-[1.02] hover:shadow-2xl',
                plan.gradient,
                plan.popular
                  ? 'scale-[1.02] shadow-2xl ring-2 ring-blue-500/20'
                  : 'shadow-lg hover:shadow-xl'
              )}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0, // Start with opacity 0 for animation
              }}
            >
              {plan.popular && (
                <>
                  <div className='absolute -top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500'></div>
                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5'></div>
                </>
              )}

              <CardHeader className='relative pb-8 text-center'>
                {plan.popular && (
                  <div className='absolute -top-3 left-1/2 z-10 -translate-x-1/2'>
                    <Badge className='border-0 bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1 text-white shadow-lg'>
                      {t('plans.professional.popular')}
                    </Badge>
                  </div>
                )}

                <div className='mt-6'>
                  <div className='mb-4 flex items-center justify-center'>
                    <div
                      className={`rounded-full bg-gradient-to-br p-3 ${plan.popular ? 'from-blue-100 to-indigo-100' : 'from-gray-100 to-gray-200'} shadow-sm`}
                    >
                      <plan.icon
                        className={`h-6 w-6 ${plan.popular ? 'text-blue-600' : 'text-gray-600'}`}
                      />
                    </div>
                  </div>
                  <CardTitle className='text-2xl font-bold text-gray-900'>
                    {plan.name}
                  </CardTitle>
                  <div className='mt-6 flex items-end justify-center'>
                    <span className='text-5xl font-bold tracking-tight text-gray-900'>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className='ml-1 text-lg font-medium text-gray-500'>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <CardDescription className='mt-3 text-base text-gray-600'>
                    {plan.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className='space-y-6'>
                <ul className='space-y-4'>
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className='group/item flex items-start space-x-3'
                      style={{
                        animationDelay: `${index * 150 + featureIndex * 50}ms`,
                        animation: 'fadeInLeft 0.4s ease-out forwards',
                        opacity: 0, // Start with opacity 0 for animation
                      }}
                    >
                      <div className='mt-0.5 flex-shrink-0'>
                        <CheckCircle className='h-5 w-5 text-green-500 transition-transform group-hover/item:scale-110' />
                      </div>
                      <span className='text-sm leading-relaxed font-medium text-gray-700'>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full transform bg-gradient-to-r ${plan.buttonGradient} ${plan.hoverGradient} text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-offset-2 ${
                    plan.popular ? 'focus:ring-blue-500' : 'focus:ring-gray-500'
                  } border-0 py-3`}
                  asChild
                >
                  <Link
                    href='/sign-up'
                    className='group flex items-center justify-center font-semibold'
                  >
                    {plan.name === 'Enterprise'
                      ? t('buttons.contactSales')
                      : t('buttons.startTrial')}
                    <ChevronRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180' />
                  </Link>
                </Button>
                {plan.name !== 'Enterprise' && (
                  <p className='text-center text-xs text-gray-500'>
                    {t('noCreditCard')}
                  </p>
                )}
              </CardContent>

              {/* Hover effect overlay */}
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
            </Card>
          ))}
        </div>
        {/* Additional features highlight */}
        <div className='mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='rounded-lg border border-white/20 bg-white/60 p-4 text-center shadow-sm backdrop-blur-sm'>
            <Shield className='mx-auto mb-2 h-8 w-8 text-blue-600' />
            <h4 className='mb-1 font-semibold text-gray-900'>
              {t('additionalFeatures.enterpriseSecurity.title')}
            </h4>
            <p className='text-sm text-gray-600'>
              {t('additionalFeatures.enterpriseSecurity.description')}
            </p>
          </div>
          <div className='rounded-lg border border-white/20 bg-white/60 p-4 text-center shadow-sm backdrop-blur-sm'>
            <Globe className='mx-auto mb-2 h-8 w-8 text-green-600' />
            <h4 className='mb-1 font-semibold text-gray-900'>
              {t('additionalFeatures.globalAvailability.title')}
            </h4>
            <p className='text-sm text-gray-600'>
              {t('additionalFeatures.globalAvailability.description')}
            </p>
          </div>
          <div className='rounded-lg border border-white/20 bg-white/60 p-4 text-center shadow-sm backdrop-blur-sm'>
            <Award className='mx-auto mb-2 h-8 w-8 text-purple-600' />
            <h4 className='mb-1 font-semibold text-gray-900'>
              {t('additionalFeatures.awardWinning.title')}
            </h4>
            <p className='text-sm text-gray-600'>
              {t('additionalFeatures.awardWinning.description')}
            </p>
          </div>
        </div>
        <div className='mt-20 text-center'>
          <div className='mx-auto max-w-2xl rounded-2xl border border-white/20 bg-white/60 p-8 shadow-lg backdrop-blur-sm'>
            <div className='mb-4 flex items-center justify-center'>
              <div className='rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-3'>
                <Users className='h-6 w-6 text-blue-600' />
              </div>
            </div>
            <h3 className='mb-2 text-lg font-semibold text-gray-900'>
              {t('customSolution.title')}
            </h3>
            <p className='mb-6 text-gray-600'>
              {t('customSolution.description')}
            </p>
            <Link
              href='/contact'
              className='group inline-flex items-center font-semibold text-blue-600 transition-colors hover:text-blue-500'
            >
              {t('customSolution.link')}
              <ChevronRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
