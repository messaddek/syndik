import { LandingLayout } from '@/components/landing/landing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function PricingPage() {
  const t = useTranslations('pricing');

  // Get features arrays from translations
  const starterFeatures = t.raw('plans.starter.features') as string[];
  const professionalFeatures = t.raw('plans.professional.features') as string[];
  const enterpriseFeatures = t.raw('plans.enterprise.features') as string[];
  const allPlansFeatures = t.raw('allPlansInclude.features') as string[];
  const faqItems = t.raw('faq.items') as Array<{
    question: string;
    answer: string;
  }>;

  const plans = [
    {
      name: t('plans.starter.name'),
      description: t('plans.starter.description'),
      price: t('plans.starter.price'),
      period: t('plans.starter.period'),
      features: starterFeatures,
      cta: t('plans.starter.cta'),
      popular: false,
    },
    {
      name: t('plans.professional.name'),
      description: t('plans.professional.description'),
      price: t('plans.professional.price'),
      period: t('plans.professional.period'),
      features: professionalFeatures,
      cta: t('plans.professional.cta'),
      popular: true,
    },
    {
      name: t('plans.enterprise.name'),
      description: t('plans.enterprise.description'),
      price: t('plans.enterprise.price'),
      period: t('plans.enterprise.period'),
      features: enterpriseFeatures,
      cta: t('plans.enterprise.cta'),
      popular: false,
    },
  ];

  return (
    <LandingLayout>
      {' '}
      {/* Hero Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              {t('hero.title')}
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {t('hero.description')}
            </p>
          </div>
        </div>
      </div>
      {/* Pricing Cards */}
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {plans.map(plan => (
              <Card
                key={plan.name}
                className={`relative ${plan.popular ? 'scale-105 shadow-lg ring-2 ring-blue-600' : ''}`}
              >
                {' '}
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
                    <Badge className='bg-primary text-white'>
                      {t('plans.popular')}
                    </Badge>
                  </div>
                )}
                <CardHeader className='pb-8 text-center'>
                  <h3 className='text-2xl font-bold text-gray-900'>
                    {plan.name}
                  </h3>
                  <p className='text-gray-600'>{plan.description}</p>
                  <div className='mt-4'>
                    <span className='text-4xl font-bold text-gray-900'>
                      {plan.price}
                    </span>
                    <span className='text-gray-600'>{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <ul className='space-y-3'>
                    {plan.features.map(feature => (
                      <li key={feature} className='flex items-center gap-3'>
                        <Check className='h-4 w-4 text-green-600' />
                        <span className='text-gray-600'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.name === 'Enterprise' ? '/contact' : '/sign-up'}
                    className='block'
                  >
                    <Button
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-blue-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>{' '}
      {/* Features Comparison */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {t('allPlansInclude.title')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {t('allPlansInclude.description')}
            </p>
          </div>
          <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {allPlansFeatures.map((feature: string) => (
              <div key={feature} className='text-center'>
                <Check className='mx-auto mb-4 h-8 w-8 text-green-600' />
                <p className='font-medium text-gray-900'>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>{' '}
      {/* FAQ Section */}
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='mb-16 text-center text-3xl font-bold tracking-tight text-gray-900'>
              {t('faq.title')}
            </h2>
            <div className='space-y-8'>
              {faqItems.map(
                (faq: { question: string; answer: string }, index: number) => (
                  <div key={index} className='border-b border-gray-200 pb-8'>
                    <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                      {faq.question}
                    </h3>
                    <p className='text-gray-600'>{faq.answer}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>{' '}
      {/* CTA Section */}
      <div className='bg-primary py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              {t('cta.title')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-blue-100'>
              {t('cta.description')}
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link href='/sign-up'>
                <Button size='lg' variant='secondary'>
                  {t('cta.primaryButton')}
                </Button>
              </Link>
              <Link
                href='/contact'
                className='text-sm leading-6 font-semibold text-white hover:text-blue-100'
              >
                {t('cta.secondaryButton')} <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
