'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';

export function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  if (!showBackToTop) return null;

  return (
    <Button
      onClick={scrollToTop}
      className='fixed right-6 bottom-6 z-40 rounded-lg bg-blue-600 p-3 text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
      aria-label='Back to top'
    >
      <ChevronUp className='h-5 w-5' />
    </Button>
  );
}
