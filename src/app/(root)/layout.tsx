'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Users,
  Home,
  TrendingUp,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Buildings', href: '/buildings', icon: Building2 },
  { name: 'Units', href: '/units', icon: Home },
  { name: 'Residents', href: '/residents', icon: Users },
  { name: 'Finances', href: '/finances', icon: TrendingUp },
  { name: 'Meetings', href: '/meetings', icon: Calendar },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navigation Header */}
      <header className='border-b bg-white shadow-sm'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between'>
            {/* Logo */}
            <div className='flex items-center'>
              <Link href='/dashboard' className='flex items-center space-x-2'>
                <Building2 className='h-8 w-8 text-blue-600' />
                <span className='text-2xl font-bold text-gray-900'>Syndik</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className='hidden space-x-8 md:flex'>
              {navigation.map(item => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/');

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <Icon className='mr-2 h-4 w-4' />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className='flex items-center space-x-4'>
              <span className='hidden text-sm text-gray-600 sm:block'>
                Welcome, {user?.firstName || 'User'}!
              </span>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-8 w-8',
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className='md:hidden'>
          <nav className='space-y-1 px-4 py-2'>
            {navigation.map(item => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icon className='mr-3 h-4 w-4' />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>{children}</div>
      </main>
    </div>
  );
}
