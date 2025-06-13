'use client';

import React from 'react';
import { LandingLayout } from '@/components/landing/landing-layout';
import { useArticleTracking } from '@/modules/articles/use-article-tracking';
import ArticleComments from '@/modules/articles/components/article-comments';
import ArticleRating from '@/modules/articles/components/article-rating';

interface ArticleLayoutProps {
  articleSlug: string;
  title: string;
  children: React.ReactNode;
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  articleSlug,
  title,
  children,
}) => {
  // Track this article view automatically
  useArticleTracking({
    articleSlug,
    title,
  });

  return (
    <LandingLayout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          {/* Article Content */}
          {children}

          {/* Rating and Comments Section */}
          <div className='mt-16 border-t border-gray-200 pt-12'>
            <div className='max-w-4xl space-y-8 px-4'>
              {/* Article Rating */}
              <ArticleRating
                articleSlug={articleSlug}
                className='rounded-lg bg-white shadow-sm'
              />

              {/* Comments */}
              <ArticleComments
                articleSlug={articleSlug}
                className='rounded-lg bg-white p-6 shadow-sm'
              />
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default ArticleLayout;
