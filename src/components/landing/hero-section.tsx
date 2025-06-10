'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export function HeroSection() {
  return (
    <div className='relative isolate px-6 pt-14 lg:px-8'>
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
      <div className='relative z-10 mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Manage Your Residential Syndicate{' '}
            <span className='text-blue-600'>Effortlessly</span>
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Streamline property management, track finances, organize meetings,
            and enhance resident communication with our comprehensive SaaS
            platform designed specifically for residential syndicates.
          </p>{' '}
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Button size='lg' className='px-8' asChild>
              <Link href='/sign-up'>
                Get Started Free
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' className='px-8' asChild>
              <Link href='/demo'>Watch Demo</Link>
            </Button>
          </div>
        </div>
      </div>{' '}
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

export function FeaturesSection() {
  const features = [
    {
      name: 'Building Management',
      description:
        'Efficiently manage multiple buildings, units, and common areas with detailed tracking and maintenance schedules.',
      icon: Building2,
    },
    {
      name: 'Resident Portal',
      description:
        'Provide residents with a dedicated portal to view announcements, submit requests, and communicate effectively.',
      icon: Users,
    },
    {
      name: 'Financial Tracking',
      description:
        'Monitor income, expenses, budgets, and generate comprehensive financial reports with ease.',
      icon: TrendingUp,
    },
    {
      name: 'Secure & Compliant',
      description:
        'Enterprise-grade security with role-based access control and compliance with data protection regulations.',
      icon: Shield,
    },
    {
      name: 'Meeting Management',
      description:
        'Schedule meetings, track attendance, manage agendas, and maintain detailed minutes and voting records.',
      icon: Clock,
    },
    {
      name: 'Automated Workflows',
      description:
        'Streamline routine tasks with automated notifications, reminders, and approval processes.',
      icon: CheckCircle,
    },
  ];

  return (
    <div className='bg-gray-50 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-base leading-7 font-semibold text-blue-600'>
            Everything you need
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Comprehensive Syndicate Management
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            All the tools you need to manage your residential syndicate
            efficiently, from financial tracking to resident communication.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            {features.map(feature => (
              <div key={feature.name} className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900'>
                  <feature.icon
                    className='h-5 w-5 flex-none text-blue-600'
                    aria-hidden='true'
                  />
                  {feature.name}
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export function CTASection() {
  return (
    <div className='bg-blue-600'>
      <div className='px-6 py-24 sm:px-6 sm:py-32 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            Ready to streamline your syndicate management?
          </h2>
          <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100'>
            Join hundreds of residential syndicates who trust Syndik to manage
            their properties efficiently.
          </p>{' '}
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Button size='lg' variant='secondary' className='px-8' asChild>
              <Link href='/sign-up'>Start Free Trial</Link>
            </Button>
            <Link
              href='/pricing'
              className='text-sm leading-6 font-semibold text-white hover:text-blue-100'
            >
              View Pricing <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
