import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Star, Clock, TrendingUp } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { STATIC_ARTICLES } from '../static-articles';
import type { PopularArticle } from '../schema';

interface PopularArticlesProps {
  limit?: number;
  category?: string;
  timeframe?: 'day' | 'week' | 'month' | 'year' | 'all';
  className?: string;
}

export const PopularArticles: React.FC<PopularArticlesProps> = ({
  limit = 5,
  category,
  timeframe = 'month',
  className,
}) => {
  const trpc = useTRPC();

  const {
    data: popularArticles = [],
    isLoading,
    error,
  } = useQuery(
    trpc.articles.getPopularArticles.queryOptions({
      limit,
      category,
      timeframe,
    })
  );

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <TrendingUp className='h-5 w-5 text-blue-500' />
            <span>Popular Articles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className='animate-pulse'>
                <div className='flex items-center justify-between rounded-lg border p-4'>
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 w-3/4 rounded bg-gray-200' />
                    <div className='h-3 w-1/2 rounded bg-gray-200' />
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='h-4 w-8 rounded bg-gray-200' />
                    <div className='h-4 w-8 rounded bg-gray-200' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <TrendingUp className='h-5 w-5 text-blue-500' />
            <span>Popular Articles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            Unable to load popular articles. Showing featured articles instead.
          </p>
          <div className='mt-4 space-y-3'>
            {Object.values(STATIC_ARTICLES)
              .filter(article => article.featured || article.popular)
              .slice(0, limit)
              .map(article => (
                <Link
                  key={article.slug}
                  href={article.path}
                  className='block rounded-lg border p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/50'
                >
                  <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                      <h4 className='text-sm font-medium'>{article.title}</h4>
                      <div className='text-muted-foreground flex items-center space-x-2 text-xs'>
                        <Badge variant='outline' className='text-xs'>
                          {article.category}
                        </Badge>
                        <span className='flex items-center space-x-1'>
                          <Clock className='h-3 w-3' />
                          <span>{article.readTime} min</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (popularArticles.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <TrendingUp className='h-5 w-5 text-blue-500' />
            <span>Popular Articles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground py-4 text-center'>
            No popular articles found for the selected timeframe.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <TrendingUp className='h-5 w-5 text-blue-500' />
          <span>Popular Articles</span>
          {timeframe !== 'all' && (
            <Badge variant='outline' className='ml-2 text-xs'>
              This {timeframe}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {' '}
        <div className='space-y-3'>
          {popularArticles.map((article: PopularArticle, index: number) => {
            const staticData =
              STATIC_ARTICLES[article.slug as keyof typeof STATIC_ARTICLES];
            if (!staticData) return null;

            return (
              <Link
                key={article.slug}
                href={staticData.path}
                className='block rounded-lg border p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/50'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center space-x-2'>
                      <span className='min-w-[20px] text-sm font-bold text-blue-600'>
                        #{index + 1}
                      </span>
                      <h4 className='text-sm font-medium'>
                        {staticData.title}
                      </h4>
                    </div>
                    <div className='text-muted-foreground ml-7 flex items-center space-x-2 text-xs'>
                      <Badge variant='outline' className='text-xs'>
                        {staticData.category}
                      </Badge>
                      <span className='flex items-center space-x-1'>
                        <Clock className='h-3 w-3' />
                        <span>{staticData.readTime} min</span>
                      </span>
                    </div>
                  </div>
                  <div className='text-muted-foreground flex items-center space-x-3 text-xs'>
                    <div className='flex items-center space-x-1'>
                      <Eye className='h-3 w-3' />
                      <span>{article.views}</span>
                    </div>
                    {article.rating > 0 && (
                      <div className='flex items-center space-x-1'>
                        <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                        <span>{article.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularArticles;
