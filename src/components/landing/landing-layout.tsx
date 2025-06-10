'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Menu, X } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Help', href: '/help' },
  { name: 'Terms', href: '/terms' },
];

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='border-b bg-white shadow-sm'>
        <nav
          className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
          aria-label='Top'
        >
          <div className='flex w-full items-center justify-between py-4'>
            {/* Logo */}
            <div className='flex items-center'>
              <Link href='/' className='flex items-center space-x-2'>
                <Building2 className='h-8 w-8 text-blue-600' />
                <span className='text-2xl font-bold text-gray-900'>Syndik</span>
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
              {isSignedIn ? (
                <>
                  <Button variant='ghost' size='sm' asChild>
                    <Link href='/dashboard'>Dashboard</Link>
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
                    <Link href='/sign-in'>Sign In</Link>
                  </Button>
                  <Button size='sm' asChild>
                    <Link href='/sign-up'>Get Started</Link>
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
            <div className='md:hidden'>
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
                  {isSignedIn ? (
                    <>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='w-full'
                        asChild
                      >
                        <Link href='/dashboard'>Dashboard</Link>
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
                        <Link href='/sign-in'>Sign In</Link>
                      </Button>
                      <Button size='sm' className='w-full' asChild>
                        <Link href='/sign-up'>Get Started</Link>
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
      <main>{children}</main>

      {/* Footer */}
      <footer className='border-t bg-gray-50'>
        <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
            {/* Logo and description */}
            <div className='md:col-span-1'>
              <div className='mb-4 flex items-center space-x-2'>
                <Building2 className='h-6 w-6 text-blue-600' />
                <span className='text-lg font-bold text-gray-900'>Syndik</span>
              </div>
              <p className='text-sm text-gray-600'>
                Modern SaaS platform for managing residential syndicates with
                ease and efficiency.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className='mb-4 text-sm font-semibold text-gray-900'>
                Product
              </h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/about'
                    className='text-sm text-gray-600 hover:text-blue-600'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href='/pricing'
                    className='text-sm text-gray-600 hover:text-blue-600'
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href='/faq'
                    className='text-sm text-gray-600 hover:text-blue-600'
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className='mb-4 text-sm font-semibold text-gray-900'>
                Support
              </h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/help'
                    className='text-sm text-gray-600 hover:text-blue-600'
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href='/terms'
                    className='text-sm text-gray-600 hover:text-blue-600'
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a
                    href='mailto:support@syndik.com'
                    className='text-sm text-gray-600 hover:text-blue-600'
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className='mb-4 text-sm font-semibold text-gray-900'>
                Legal
              </h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/privacy'
                    className='text-sm text-gray-600 hover:text-blue-600'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/terms'
                    className='text-sm text-gray-600 hover:text-blue-600'
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-8 border-t border-gray-200 pt-8'>
            <p className='text-center text-sm text-gray-600'>
              © 2025 Syndik. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
