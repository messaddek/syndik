'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';
import { Newsletter } from './newsletter';
import { Gabarito } from 'next/font/google';

const gabarito = Gabarito({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const LandingFooter = () => {
  const tFooter = useTranslations('footer');

  return (
    <footer className='relative overflow-hidden bg-gray-800 text-white'>
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
      <div className='relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        {/* Newsletter Section */}
        <Newsletter />

        <div className='grid grid-cols-1 gap-8 md:grid-cols-5'>
          {/* Logo and description */}
          <div className='md:col-span-2'>
            <div className='mb-6 flex items-center space-x-2'>
              <Image
                src='/logo-white.svg'
                alt='Syndik Logo'
                width={48}
                height={48}
                className='h-12 w-12'
              />
              <span
                className={`text-2xl font-bold text-white ${gabarito.className}`}
              >
                syndik.ma
              </span>
            </div>
            <p className='mb-6 text-blue-100'>{tFooter('description')}</p>
            {/* Social Media Links */}
            <div className='flex space-x-4'>
              <a
                href='#'
                className='rounded-full bg-white/10 p-2 text-blue-200 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white'
              >
                <Twitter className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='rounded-full bg-white/10 p-2 text-blue-200 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white'
              >
                <Facebook className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='rounded-full bg-white/10 p-2 text-blue-200 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white'
              >
                <Linkedin className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='rounded-full bg-white/10 p-2 text-blue-200 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white'
              >
                <Instagram className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='mb-6 text-lg font-semibold text-white'>
              {tFooter('sections.product')}
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/about'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.aboutUs')}
                </Link>
              </li>
              <li>
                <Link
                  href='/pricing'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.pricing')}
                </Link>
              </li>
              <li>
                <Link
                  href='/faq'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.faq')}
                </Link>
              </li>
              <li>
                <Link
                  href='/demo'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.requestDemo')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className='mb-6 text-lg font-semibold text-white'>
              {tFooter('sections.support')}
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/help'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.helpCenter')}
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.termsOfService')}
                </Link>
              </li>
              <li>
                <a
                  href='mailto:support@syndik.com'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.contactUs')}
                </a>
              </li>
              <li>
                <a
                  href='tel:+1-800-SYNDIK'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.phoneSupport')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Resources */}
          <div>
            <h3 className='mb-6 text-lg font-semibold text-white'>
              {tFooter('sections.legalResources')}
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/privacy'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.termsConditions')}
                </Link>
              </li>
              <li>
                <a
                  href='#'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.security')}
                </a>
              </li>
              <li>
                <Link
                  href='/user-guide'
                  className='text-blue-100 transition-colors hover:text-white'
                >
                  {tFooter('links.userGuide')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className='mt-12 border-t border-white/20 pt-8'>
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <p className='text-blue-200'>{tFooter('copyright')}</p>
            <div className='mt-4 flex items-center space-x-6 md:mt-0'>
              <p className='text-sm text-blue-200'>{tFooter('madeWith')}</p>
              <div className='flex items-center space-x-4 text-sm text-blue-200'>
                <span>{tFooter('certifications.soc2')}</span>
                <span>{tFooter('certifications.gdpr')}</span>
              </div>
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
    </footer>
  );
};
