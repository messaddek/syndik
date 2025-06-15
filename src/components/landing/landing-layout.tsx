'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Mail,
  Send,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  BookOpen,
  ChevronUp,
} from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import Image from 'next/image';
import { LanguageDropdown } from '../language-dropdown';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
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

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribing(false);
    setEmail('');
    // You can add actual newsletter API integration here
    alert('Thank you for subscribing to our newsletter!');
  };
  return (
    <div className='min-h-screen bg-white'>
      {/* Header - Fixed */}{' '}
      <header className='fixed top-0 right-0 left-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur-sm'>
        <nav
          className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
          aria-label='Top'
        >
          {' '}
          <div className='flex w-full items-center justify-between py-4'>
            {/* Logo */}
            <div className='flex items-center'>
              <Link href='/' className='flex items-center space-x-2'>
                <Image
                  src='/logo.svg'
                  alt='Syndik Logo'
                  width={64}
                  height={64}
                  className='size-16'
                />
                {/* <span className='text-2xl font-bold text-gray-900'>Syndik</span> */}
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
            </div>{' '}
            {/* CTA Buttons */}
            <div className='hidden items-center space-x-4 md:flex'>
              <LanguageDropdown />
              <Button variant='ghost' size='sm' asChild>
                <Link href='/user-guide'>
                  <BookOpen className='h-4 w-4' />
                  <span className='sr-only'>User Guide</span>
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
          </div>{' '}
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
                ))}{' '}
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
                      User Guide
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
      {/* Main Content */}
      <main className='pt-[73px]'>{children}</main>
      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className='fixed right-6 bottom-6 z-40 rounded-lg bg-blue-600 p-3 text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          aria-label='Back to top'
        >
          <ChevronUp className='h-5 w-5' />
        </Button>
      )}
      {/* Footer */}
      <footer className='relative overflow-hidden border-t bg-gray-800 text-white'>
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
          <div className='mb-12 text-center'>
            <div className='mx-auto max-w-2xl'>
              <Mail className='mx-auto mb-4 h-12 w-12 text-blue-400' />
              <h2 className='mb-4 text-3xl font-bold text-white'>
                Stay Updated with Syndik
              </h2>{' '}
              <p className='mb-8 text-lg text-blue-100'>
                Get the latest updates on new features, syndicate management
                tips, and industry insights delivered to your inbox.
              </p>{' '}
              <form
                onSubmit={handleNewsletterSubmit}
                className='mx-auto flex max-w-md gap-3'
              >
                <Input
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className='flex-1 border-blue-300/30 bg-white/10 text-white backdrop-blur-sm placeholder:text-blue-100 focus:border-blue-300'
                />{' '}
                <Button
                  type='submit'
                  disabled={isSubscribing || !email.trim()}
                  className='border border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 disabled:opacity-50'
                >
                  {isSubscribing ? (
                    <>
                      <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Send className='mr-2 h-4 w-4' />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>{' '}
              <p className='mt-3 text-xs text-blue-200'>
                No spam, unsubscribe at any time. Read our{' '}
                <Link href='/privacy' className='underline hover:text-white'>
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-5'>
            {/* Logo and description */}
            <div className='md:col-span-2'>
              {' '}
              <div className='mb-6 flex items-center space-x-2'>
                <Image
                  src='/logo.svg'
                  alt='Syndik Logo'
                  width={32}
                  height={32}
                  className='h-8 w-8'
                />
                <span className='text-2xl font-bold text-white'>Syndik</span>
              </div>{' '}
              <p className='mb-6 text-blue-100'>
                Modern SaaS platform for managing residential syndicates with
                ease and efficiency. Streamline your property management,
                enhance resident communication, and boost operational
                efficiency.
              </p>
              {/* Social Media Links */}
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className='rounded-full bg-white/10 p-2 text-blue-200 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white'
                >
                  <Twitter className='h-5 w-5' />
                </a>{' '}
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
              <h3 className='mb-6 text-lg font-semibold text-white'>Product</h3>
              <ul className='space-y-3'>
                <li>
                  {' '}
                  <Link
                    href='/about'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/pricing'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href='/faq'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href='/demo'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    Request Demo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className='mb-6 text-lg font-semibold text-white'>Support</h3>
              <ul className='space-y-3'>
                {' '}
                <li>
                  <Link
                    href='/help'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href='/terms'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a
                    href='mailto:support@syndik.com'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href='tel:+1-800-SYNDIK'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    Phone Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal & Resources */}
            <div>
              <h3 className='mb-6 text-lg font-semibold text-white'>
                Legal & Resources
              </h3>
              <ul className='space-y-3'>
                {' '}
                <li>
                  <Link
                    href='/privacy'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/terms'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    Security
                  </a>
                </li>{' '}
                <li>
                  <Link
                    href='/user-guide'
                    className='text-blue-100 transition-colors hover:text-white'
                  >
                    User Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>{' '}
          {/* Bottom section */}
          <div className='mt-12 border-t border-white/20 pt-8'>
            <div className='flex flex-col items-center justify-between md:flex-row'>
              <p className='text-blue-200'>
                © 2025 Syndik. All rights reserved.
              </p>
              <div className='mt-4 flex items-center space-x-6 md:mt-0'>
                <p className='text-sm text-blue-200'>
                  Made with ❤️ for property managers worldwide
                </p>
                <div className='flex items-center space-x-4 text-sm text-blue-200'>
                  <span>🔒 SOC 2 Certified</span>
                  <span>🛡️ GDPR Compliant</span>
                </div>
              </div>
            </div>{' '}
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
          />{' '}
        </div>
      </footer>
    </div>
  );
}
