'use client';

import { useEffect, useState } from 'react';
import { getCurrentSubdomain, SUBDOMAINS } from '@/lib/subdomain-utils';
import { Badge } from '@/components/ui/badge';

export function SubdomainIndicator() {
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [hostname, setHostname] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentSubdomain = getCurrentSubdomain(window.location.hostname);
      setSubdomain(currentSubdomain);
      setHostname(window.location.hostname);
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getSubdomainInfo = () => {
    switch (subdomain) {
      case SUBDOMAINS.MAIN:
        return { label: 'Main Landing', color: 'bg-blue-100 text-blue-800' };
      case SUBDOMAINS.APP:
        return { label: 'App Portal', color: 'bg-green-100 text-green-800' };
      case SUBDOMAINS.ADMIN:
        return {
          label: 'Admin Portal',
          color: 'bg-orange-100 text-orange-800',
        };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const info = getSubdomainInfo();

  return (
    <div className='fixed right-4 bottom-4 z-50'>
      <Badge className={`${info.color} font-mono text-xs`}>
        {info.label} • {hostname}
      </Badge>
    </div>
  );
}
