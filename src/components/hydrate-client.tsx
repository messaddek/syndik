'use client';

import { ReactNode } from 'react';

interface HydrateClientProps {
  children: ReactNode;
}

export const HydrateClient = ({ children }: HydrateClientProps) => {
  // This component handles the hydration of server-side data
  // into the client-side query client
  return <>{children}</>;
}
