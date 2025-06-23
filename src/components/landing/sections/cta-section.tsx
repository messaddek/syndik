'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '../../ui/button';
import {
  ArrowRight,
  Clock,
  Shield,
  Bell,
  CheckCircle,
  Star,
  Award,
  ChevronRight,
} from 'lucide-react';

export const CTASection = () => {
  const t = useTranslations('landing.cta');
  return (
    <section
      className='from-primary via-primary/90 to-primary/80 relative isolate overflow-hidden bg-gradient-to-br'
      aria-labelledby='cta-heading'
    >
      {/* Background gradient */}
      <div
        className='pointer-events-none absolute inset-x-0 -top-40 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        aria-hidden='true'
      >
        <div
          className='from-primary/30 to-primary/20 relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Animated background elements - reduced for performance */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-white/8 blur-3xl'></div>
        <div
          className='absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-white/5 blur-3xl'
          style={{ animationDelay: '1.5s' }}
        ></div>
      </div>

      <div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32'>
        <div className='mx-auto max-w-5xl text-center'>
          {/* Badge */}
          <div className='border-primary-foreground/30 bg-primary-foreground/15 text-primary-foreground mb-6 inline-flex items-center space-x-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-green-400'></span>
            <span className='font-medium'>{t('badge')}</span>
          </div>
          {/* Main heading */}
          <h2
            id='cta-heading'
            className='text-primary-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl'
          >
            {t('title')}
            <span className='from-accent to-secondary mt-2 block bg-gradient-to-r bg-clip-text text-transparent'>
              {t('titleHighlight')}
            </span>
          </h2>
          {/* Description */}
          <p className='text-primary-foreground/80 mx-auto mt-6 max-w-3xl text-lg leading-8 sm:text-xl'>
            {t('description')}
          </p>
          {/* CTA Buttons */}
          <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6'>
            <Button
              size='lg'
              className='bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:shadow-3xl focus:ring-primary-foreground/30 w-full min-w-[220px] border-0 px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105 focus:ring-4 sm:w-auto'
              asChild
            >
              <Link
                href='/sign-up'
                className='group flex items-center justify-center gap-x-2'
              >
                {t('buttons.startTrial')}
                <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:border-primary-foreground/60 hover:bg-primary-foreground/20 focus:ring-primary-foreground/30 w-full min-w-[220px] border-2 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 focus:ring-4 sm:w-auto'
              asChild
            >
              <Link
                href='/demo'
                className='group flex items-center justify-center gap-x-2'
              >
                {t('buttons.watchDemo')}
                <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
              </Link>
            </Button>
          </div>
          {/* Trust indicators */}
          <div className='mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8'>
            <div className='group border-primary-foreground/20 bg-primary-foreground/10 hover:border-primary-foreground/30 hover:bg-primary-foreground/15 space-y-3 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300'>
              <div className='flex items-center justify-center'>
                <div className='bg-accent/20 rounded-full p-3'>
                  <Clock className='text-accent-foreground h-6 w-6' />
                </div>
              </div>
              <div className='text-center'>
                <div className='text-primary-foreground text-xl font-bold sm:text-2xl'>
                  {t('trustIndicators.freeTrial.title')}
                </div>
                <div className='text-primary-foreground/70 mt-2 text-sm'>
                  {t('trustIndicators.freeTrial.subtitle')}
                </div>
              </div>
            </div>

            <div className='group border-primary-foreground/20 bg-primary-foreground/10 hover:border-primary-foreground/30 hover:bg-primary-foreground/15 space-y-3 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300'>
              <div className='flex items-center justify-center'>
                <div className='bg-secondary/20 rounded-full p-3'>
                  <Shield className='text-secondary-foreground h-6 w-6' />
                </div>
              </div>
              <div className='text-center'>
                <div className='text-primary-foreground text-xl font-bold sm:text-2xl'>
                  {t('trustIndicators.noSetupFee.title')}
                </div>
                <div className='text-primary-foreground/70 mt-2 text-sm'>
                  {t('trustIndicators.noSetupFee.subtitle')}
                </div>
              </div>
            </div>

            <div className='group border-primary-foreground/20 bg-primary-foreground/10 hover:border-primary-foreground/30 hover:bg-primary-foreground/15 space-y-3 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 sm:col-span-3 lg:col-span-1'>
              <div className='flex items-center justify-center'>
                <div className='bg-muted/30 rounded-full p-3'>
                  <Bell className='text-muted-foreground h-6 w-6' />
                </div>
              </div>
              <div className='text-center'>
                <div className='text-primary-foreground text-xl font-bold sm:text-2xl'>
                  {t('trustIndicators.support.title')}
                </div>
                <div className='text-primary-foreground/70 mt-2 text-sm'>
                  {t('trustIndicators.support.subtitle')}
                </div>
              </div>
            </div>
          </div>
          {/* Risk-free guarantee */}
          <div className='border-primary-foreground/25 bg-primary-foreground/10 mx-auto mt-12 max-w-3xl rounded-2xl border p-6 backdrop-blur-sm lg:p-8'>
            <div className='mb-4 flex items-center justify-center space-x-3'>
              <div className='bg-secondary/20 rounded-full p-2'>
                <CheckCircle className='text-secondary-foreground h-6 w-6' />
              </div>
              <span className='text-primary-foreground text-lg font-semibold lg:text-xl'>
                {t('guarantee.title')}
              </span>
            </div>
            <p className='text-primary-foreground/70 text-center text-sm leading-relaxed lg:text-base'>
              {t('guarantee.description')}
              <Link
                href='/pricing'
                className='text-accent-foreground decoration-accent-foreground/50 hover:text-accent-foreground/80 hover:decoration-accent-foreground/80 font-medium underline transition-colors'
              >
                {t('guarantee.link')}
              </Link>
            </p>
          </div>
          {/* Social proof */}
          <div className='text-primary-foreground/80 mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8'>
            <div className='flex items-center space-x-2'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='fill-accent-foreground text-accent-foreground h-4 w-4'
                  />
                ))}
              </div>
              <span className='text-sm font-medium'>
                {t('socialProof.rating')}
              </span>
            </div>

            <div className='bg-primary-foreground/30 hidden h-4 w-px sm:block'></div>

            <div className='flex items-center space-x-2'>
              <Award className='text-accent-foreground h-4 w-4' />
              <span className='text-sm font-medium'>
                {t('socialProof.award')}
              </span>
            </div>

            <div className='bg-primary-foreground/30 hidden h-4 w-px lg:block'></div>

            <div className='flex items-center space-x-2'>
              <Shield className='text-secondary-foreground h-4 w-4' />
              <span className='text-sm font-medium'>
                {t('socialProof.certified')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient bottom */}
      <div
        className='pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] -z-50 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
        aria-hidden='true'
      >
        <div
          className='from-primary/30 to-primary/20 relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
};
