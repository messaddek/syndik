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

export function CTASection() {
  const t = useTranslations('landing.cta');
  return (
    <div className='relative isolate overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700'>
      {/* Background gradient */}
      <div
        className='pointer-events-none absolute inset-x-0 -top-40 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-white/10 blur-3xl'></div>
        <div
          className='absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-white/5 blur-3xl'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute top-3/4 left-3/4 h-48 w-48 animate-pulse rounded-full bg-white/10 blur-3xl'
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className='relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <div className='mb-8 inline-flex items-center space-x-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-green-400'></span>
            <span>{t('badge')}</span>
          </div>
          <h2 className='text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl'>
            {t('title')}
            <span className='mt-2 block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'>
              {t('titleHighlight')}
            </span>
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-xl leading-8 text-blue-100'>
            {t('description')}
          </p>
          <div className='mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Button
              size='lg'
              className='hover:shadow-3xl text-primary min-w-[200px] border-0 bg-white px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-50'
              asChild
            >
              <Link href='/sign-up' className='group flex items-center'>
                {t('buttons.startTrial')}
                <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='min-w-[200px] border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20'
              asChild
            >
              <Link href='/demo' className='group flex items-center'>
                {t('buttons.watchDemo')}
                <ChevronRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </div>
          {/* Trust indicators */}
          <div className='mt-16 grid grid-cols-1 gap-8 text-center sm:grid-cols-3'>
            <div className='space-y-2 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm'>
              <div className='mb-2 flex items-center justify-center space-x-2'>
                <Clock className='h-6 w-6 text-yellow-300' />
                <div className='text-2xl font-bold text-white'>
                  {t('trustIndicators.freeTrial.title')}
                </div>
              </div>
              <div className='text-sm text-blue-100'>
                {t('trustIndicators.freeTrial.subtitle')}
              </div>
            </div>
            <div className='space-y-2 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm'>
              <div className='mb-2 flex items-center justify-center space-x-2'>
                <Shield className='h-6 w-6 text-green-300' />
                <div className='text-2xl font-bold text-white'>
                  {t('trustIndicators.noSetupFee.title')}
                </div>
              </div>
              <div className='text-sm text-blue-100'>
                {t('trustIndicators.noSetupFee.subtitle')}
              </div>
            </div>
            <div className='space-y-2 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm'>
              <div className='mb-2 flex items-center justify-center space-x-2'>
                <Bell className='h-6 w-6 text-blue-300' />
                <div className='text-2xl font-bold text-white'>
                  {t('trustIndicators.support.title')}
                </div>
              </div>
              <div className='text-sm text-blue-100'>
                {t('trustIndicators.support.subtitle')}
              </div>
            </div>
          </div>
          {/* Risk-free guarantee */}
          <div className='mx-auto mt-12 max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm'>
            <div className='mb-3 flex items-center justify-center space-x-2'>
              <CheckCircle className='h-6 w-6 text-green-300' />
              <span className='text-lg font-semibold text-white'>
                {t('guarantee.title')}
              </span>
            </div>
            <p className='text-sm leading-relaxed text-blue-100'>
              {t('guarantee.description')}
              <Link
                href='/pricing'
                className='font-medium underline transition-colors hover:text-yellow-300'
              >
                {t('guarantee.link')}
              </Link>
            </p>
          </div>
          {/* Social proof */}
          <div className='mt-8 flex flex-col items-center justify-center space-y-4 text-blue-100 sm:flex-row sm:space-y-0 sm:space-x-8'>
            <div className='flex items-center space-x-2'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='h-4 w-4 fill-yellow-300 text-yellow-300'
                  />
                ))}
              </div>
              <span className='text-sm'>{t('socialProof.rating')}</span>
            </div>
            <div className='hidden h-4 w-px bg-white/30 sm:block'></div>
            <div className='flex items-center space-x-2'>
              <Award className='h-4 w-4 text-yellow-300' />
              <span className='text-sm'>{t('socialProof.award')}</span>
            </div>
            <div className='hidden h-4 w-px bg-white/30 sm:block'></div>
            <div className='flex items-center space-x-2'>
              <Shield className='h-4 w-4 text-green-300' />
              <span className='text-sm'>{t('socialProof.certified')}</span>
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
          className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}
