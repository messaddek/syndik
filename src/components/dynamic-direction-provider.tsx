'use client';

import { DirectionProvider } from '@radix-ui/react-direction';
import { useDirection } from '@/hooks/use-direction';
import { useEffect, useState } from 'react';

interface DynamicDirectionProviderProps {
  children: React.ReactNode;
}

export const DynamicDirectionProvider = ({
  children,
}: DynamicDirectionProviderProps) => {
  const { direction } = useDirection();
  const [key, setKey] = useState(0);

  // Force re-mount of DirectionProvider when direction changes
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [direction]);

  return (
    <DirectionProvider key={key} dir={direction}>
      {children}
    </DirectionProvider>
  );
};
