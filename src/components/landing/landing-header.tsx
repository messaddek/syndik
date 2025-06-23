'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/routing';
import {
  Menu,
  X,
  Globe2,
  HelpCircle,
  LayoutDashboard,
  User,
} from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import Image from 'next/image';
import { LanguageDropdown } from '../language-dropdown';
import { SupportDialog } from '../support-dialog';
import { Gabarito } from 'next/font/google';

const gabarito = Gabarito({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const LandingHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('pricing'), href: '/pricing' },
    { name: t('faq'), href: '/faq' },
    { name: t('help'), href: '/help' },
    { name: t('terms'), href: '/terms' },
  ];

  return (
    <header className='fixed top-0 right-0 left-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur-sm'>
      <nav className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='flex min-h-[56px] w-full items-center justify-between py-2'>
          {/* Logo */}
          <div className='flex min-w-0 items-center'>
            <Link href='/' className='flex min-w-0 items-center space-x-2'>
              <Image
                src='/logo.svg'
                alt='Syndik Logo'
                width={40}
                height={40}
                className='size-10'
              />
              <span
                className={`truncate text-base font-bold text-gray-900 ${gabarito.className}`}
                style={{ maxWidth: 110 }}
              >
                syndik.ma
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className='hidden items-center space-x-8 md:flex'>
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'hover:text-primary text-sm font-medium transition-colors',
                  pathname === item.href ? 'text-primary' : 'text-gray-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* CTA Buttons */}
          <div className='hidden items-center space-x-4 md:flex'>
            <LanguageDropdown />
            <SupportDialog />
            {isSignedIn ? (
              <>
                <Button variant='ghost' size='sm' asChild>
                  <Link href='/dashboard'>{t('dashboard')}</Link>
                </Button>
                <UserButton
                  afterSignOutUrl='/'
                  appearance={{
                    elements: {
                      avatarBox: 'h-8 w-8',
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Button variant='ghost' size='sm' asChild>
                  <Link href='/sign-in'>{tCommon('signIn')}</Link>
                </Button>
                <Button size='sm' asChild>
                  <Link href='/sign-up'>{tCommon('getStarted')}</Link>
                </Button>
              </>
            )}
          </div>
          {/* Mobile menu button */}
          <div className='md:hidden'>
            <Button
              variant='ghost'
              size='sm'
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </Button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className='animate-in slide-in-from-top-5 duration-200 md:hidden'>
            <div className='space-y-1 pt-2 pb-3'>
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'hover:text-primary block px-3 py-2 text-base font-medium transition-colors',
                    pathname === item.href ? 'text-primary' : 'text-gray-600'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className='space-y-2 px-3 py-2'>
                {/* Language Dropdown for Mobile, with label */}
                <div className='flex items-center gap-2 py-2'>
                  <Globe2 className='h-5 w-5' />
                  <span>{t('language')}</span>
                  <div className='flex-1'>
                    <LanguageDropdown />
                  </div>
                </div>
                {/* Support Dialog for Mobile, with label */}
                <div className='flex items-center gap-2 py-2'>
                  <HelpCircle className='h-5 w-5' />
                  <span>{t('support') || 'Support'}</span>
                  <div className='flex-1'>
                    <SupportDialog />
                  </div>
                </div>
                {isSignedIn ? (
                  <>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='flex w-full items-center justify-start gap-2'
                      asChild
                    >
                      <Link href='/dashboard'>
                        <LayoutDashboard className='h-5 w-5' />
                        <span>{t('dashboard')}</span>
                      </Link>
                    </Button>
                    <div className='flex items-center justify-start gap-2 pt-2'>
                      <User className='h-5 w-5' />
                      <span>{t('account') || 'Account'}</span>
                      <UserButton
                        afterSignOutUrl='/'
                        appearance={{
                          elements: {
                            avatarBox: 'h-8 w-8',
                          },
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='flex w-full items-center justify-start gap-2'
                      asChild
                    >
                      <Link href='/sign-in'>
                        <User className='h-5 w-5' />
                        <span>{tCommon('signIn')}</span>
                      </Link>
                    </Button>
                    <Button
                      size='sm'
                      className='flex w-full items-center justify-start gap-2'
                      asChild
                    >
                      <Link href='/sign-up'>
                        <User className='h-5 w-5' />
                        <span>{tCommon('getStarted')}</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <style jsx global>{`
        /* Responsive tweaks for landscape mobile */
        @media (max-width: 900px) and (orientation: landscape) {
          header[role='banner'] .md\\:flex {
            display: none !important;
          }
          header[role='banner'] nav > div:first-child {
            min-width: 0 !important;
          }
          header[role='banner'] .min-w-0 {
            min-width: 0 !important;
          }
        }
      `}</style>
    </header>
  );
};
