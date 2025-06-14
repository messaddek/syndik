'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import Image from 'next/image';
import { LanguageDropdown } from '../language-dropdown';
import { Gabarito } from 'next/font/google';

const gabarito = Gabarito({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export function LandingHeader() {
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
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='flex w-full items-center justify-between py-2'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center space-x-2'>
              <Image
                src='/logo.svg'
                alt='Syndik Logo'
                width={40}
                height={40}
                className='size-10' // 40px = 10 * 4
              />
              <span
                className={`text-base font-bold text-gray-900 ${gabarito.className}`}
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
                  'text-sm font-medium transition-colors hover:text-blue-600',
                  pathname === item.href ? 'text-blue-600' : 'text-gray-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className='hidden items-center space-x-4 md:flex'>
            <LanguageDropdown />
            <Button variant='ghost' size='sm' asChild>
              <Link href='/user-guide'>
                <BookOpen className='h-4 w-4' />
                <span className='sr-only'>{t('userGuide')}</span>
              </Link>
            </Button>
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
                    'block px-3 py-2 text-base font-medium transition-colors hover:text-blue-600',
                    pathname === item.href ? 'text-blue-600' : 'text-gray-600'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className='space-y-2 px-3 py-2'>
                {/* Language Dropdown for Mobile */}
                <div className='flex justify-center py-2'>
                  <LanguageDropdown />
                </div>

                {/* User Guide Button */}
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start'
                  asChild
                >
                  <Link
                    href='/user-guide'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookOpen className='mr-2 h-4 w-4' />
                    {t('userGuide')}
                  </Link>
                </Button>
                {isSignedIn ? (
                  <>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='w-full'
                      asChild
                    >
                      <Link href='/dashboard'>{t('dashboard')}</Link>
                    </Button>
                    <div className='flex items-center justify-center pt-2'>
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
                      className='w-full'
                      asChild
                    >
                      <Link href='/sign-in'>{tCommon('signIn')}</Link>
                    </Button>
                    <Button size='sm' className='w-full' asChild>
                      <Link href='/sign-up'>{tCommon('getStarted')}</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
