'use client';

import { LandingHeader } from './landing-header';
import { LandingFooter } from './landing-footer';
import { BackToTop } from './back-to-top';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className='min-h-screen bg-white'>
      <LandingHeader />
      <main className='pt-[57px]'>{children}</main>
      <BackToTop />
      <LandingFooter />
    </div>
  );
}
