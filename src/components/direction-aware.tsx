'use client';

import { useEffect } from 'react';
import { useDirection } from '@/hooks/use-direction';

interface DirectionAwareProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A wrapper component that automatically applies direction-aware classes
 * and triggers re-renders when direction changes
 */
export const DirectionAware = ({
  children,
  className = '',
}: DirectionAwareProps) => {
  const { direction, isRtl } = useDirection();

  useEffect(() => {
    // Force a layout recalculation on direction change
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);

    return () => clearTimeout(timeout);
  }, [direction]);

  const directionClasses = `
    ${isRtl ? 'rtl' : 'ltr'}
    ${className}
  `.trim();

  return (
    <div className={directionClasses} dir={direction}>
      {children}
    </div>
  );
};
