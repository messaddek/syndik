'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
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
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='flex w-full items-center justify-between py-3 sm:py-2'>
          {' '}
          {/* Logo */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center space-x-2'>
              <Image
                src='/logo.svg'
                alt='Syndik Logo'
                width={40}
                height={40}
                className='size-8 sm:size-10' // 32px on mobile, 40px on sm+
              />
              <span
                className={`text-sm font-bold text-gray-900 sm:text-base ${gabarito.className}`}
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
          </div>{' '}
          {/* Mobile menu button */}
          <div className='flex items-center gap-2 md:hidden'>
            <Button
              variant='ghost'
              size='sm'
              className='p-2'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </Button>
          </div>
        </div>{' '}
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className='animate-in slide-in-from-top-2 duration-300 md:hidden'>
            <div className='border-t bg-white/95 shadow-lg backdrop-blur-sm'>
              {/* Navigation Links */}
              <div className='space-y-1 px-4 py-3'>
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200',
                      'hover:text-primary hover:bg-gray-50 active:bg-gray-100',
                      pathname === item.href
                        ? 'text-primary bg-primary/5 border-primary/20 border'
                        : 'text-gray-700'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className='mx-4 border-t border-gray-200'></div>

              {/* Actions Section */}
              <div className='space-y-3 px-4 py-4'>
                {/* Language and Support Row */}
                <div className='flex items-center justify-center gap-4 pb-2'>
                  <LanguageDropdown />
                  <SupportDialog />
                </div>

                {/* Auth Buttons */}
                {isSignedIn ? (
                  <div className='space-y-3'>
                    <Button
                      variant='outline'
                      size='lg'
                      className='w-full'
                      asChild
                    >
                      <Link href='/dashboard'>{t('dashboard')}</Link>
                    </Button>
                    <div className='flex items-center justify-center pt-2'>
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: 'h-10 w-10',
                          },
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='space-y-3'>
                    <Button
                      variant='outline'
                      size='lg'
                      className='w-full'
                      asChild
                    >
                      <Link href='/sign-in'>{tCommon('signIn')}</Link>
                    </Button>
                    <Button size='lg' className='w-full' asChild>
                      <Link href='/sign-up'>{tCommon('getStarted')}</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
