import { LandingLayout } from '@/components/landing/landing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small residential syndicates',
      price: '$29',
      period: '/month',
      features: [
        'Up to 50 units',
        'Basic financial tracking',
        'Resident portal',
        'Email support',
        'Meeting management',
        'Document storage (1GB)',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Ideal for growing syndicate communities',
      price: '$79',
      period: '/month',
      features: [
        'Up to 200 units',
        'Advanced financial reports',
        'Resident portal & mobile app',
        'Priority support',
        'Meeting management & voting',
        'Document storage (10GB)',
        'Custom branding',
        'API access',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large syndicate organizations',
      price: 'Custom',
      period: '',
      features: [
        'Unlimited units',
        'Enterprise financial suite',
        'White-label solution',
        'Dedicated support manager',
        'Advanced meeting tools',
        'Unlimited storage',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'Is there a free trial?',
      answer:
        'Yes! We offer a 14-day free trial for all our plans. No credit card required to get started.',
    },
    {
      question: 'Can I change plans later?',
      answer:
        'Absolutely. You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, bank transfers, and can set up custom payment arrangements for enterprise customers.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes, we use enterprise-grade security measures including encryption, regular backups, and comply with all data protection regulations.',
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer:
        'Yes, we offer a 20% discount when you choose annual billing for any of our plans.',
    },
  ];

  return (
    <LandingLayout>
      {/* Hero Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Simple, Transparent Pricing
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Choose the perfect plan for your syndicate. All plans include our
              core features with 24/7 support.
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
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
                    <Badge className='bg-blue-600 text-white'>
                      Most Popular
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
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
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
      </div>

      {/* Features Comparison */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              All Plans Include
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Every Syndik plan comes with these essential features to help you
              manage your syndicate effectively.
            </p>
          </div>
          <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {[
              'Resident Management',
              'Financial Tracking',
              'Meeting Scheduler',
              'Document Management',
              'Communication Tools',
              'Mobile Access',
              'Data Security',
              '24/7 Support',
            ].map(feature => (
              <div key={feature} className='text-center'>
                <Check className='mx-auto mb-4 h-8 w-8 text-green-600' />
                <p className='font-medium text-gray-900'>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='mb-16 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Frequently Asked Questions
            </h2>
            <div className='space-y-8'>
              {faqs.map((faq, index) => (
                <div key={index} className='border-b border-gray-200 pb-8'>
                  <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                    {faq.question}
                  </h3>
                  <p className='text-gray-600'>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-blue-600 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Ready to Get Started?
            </h2>
            <p className='mt-6 text-lg leading-8 text-blue-100'>
              Start your free trial today and see how Syndik can transform your
              syndicate management.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link href='/sign-up'>
                <Button size='lg' variant='secondary'>
                  Start Free Trial
                </Button>
              </Link>
              <Link
                href='/contact'
                className='text-sm leading-6 font-semibold text-white hover:text-blue-100'
              >
                Contact Sales <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
