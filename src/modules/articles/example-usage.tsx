// Example: How to use the tracking hook in an article page
// File: src/app/user-guide/getting-started/creating-your-first-property/page.tsx

'use client';

import { useArticleTracking } from '@/modules/articles/use-article-tracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreatingYourFirstPropertyPage() {
  // Track this article automatically
  useArticleTracking({
    articleSlug: 'creating-your-first-property',
    title: 'Creating Your First Property',
    enabled: true,
  });

  return (
    <div className='mx-auto max-w-4xl px-4 py-8'>
      <Card>
        <CardHeader>
          <CardTitle>Creating Your First Property</CardTitle>
        </CardHeader>
        <CardContent className='prose max-w-none'>
          <p>
            Welcome to Syndik! This guide will walk you through creating your
            first property and setting up the foundation for your property
            management system.
          </p>

          <h2>Step 1: Access the Properties Section</h2>
          <p>Navigate to the Properties section in your dashboard sidebar...</p>

          <h2>Step 2: Add Property Details</h2>
          <p>Fill in the essential information about your property...</p>

          {/* More content */}
        </CardContent>
      </Card>
    </div>
  );
}
