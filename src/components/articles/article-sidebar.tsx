'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import {
  Clock,
  Mail,
  MessageCircle,
  ExternalLink,
  BookOpen,
  Star,
  HelpCircle,
  Phone,
} from 'lucide-react';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface RelatedArticle {
  title: string;
  href: string;
  time: string;
  category?: string;
  popular?: boolean;
}

interface ArticleSidebarProps {
  tableOfContents?: TableOfContentsItem[];
  relatedArticles?: RelatedArticle[];
  currentCategory?: string;
  showQuickActions?: boolean;
}

export const ArticleSidebar = ({
  tableOfContents = [],
  relatedArticles = [],
  currentCategory,
  showQuickActions = true,
}: ArticleSidebarProps) => {
  const tCommon = useTranslations('articles.common');
  const tSidebar = useTranslations('articles.sidebar');

  return (
    <div className='space-y-6'>
      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <BookOpen className='h-5 w-5 text-blue-500' />
              {tCommon('tableOfContents')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <nav className='space-y-2'>
              {tableOfContents.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`hover:text-primary block text-sm transition-colors ${
                    item.level === 1
                      ? 'font-medium text-gray-900'
                      : 'ml-4 text-gray-600'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {showQuickActions && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <Star className='h-5 w-5 text-orange-500' />
              {tSidebar('quickActions')}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Button
              asChild
              variant='outline'
              size='sm'
              className='w-full justify-start'
            >
              <Link href='/user-guide'>
                <BookOpen className='mr-2 h-4 w-4' />
                {tSidebar('backToGuide')}
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='sm'
              className='w-full justify-start'
            >
              <Link href='/faq'>
                <HelpCircle className='mr-2 h-4 w-4' />
                {tSidebar('viewFaq')}
              </Link>
            </Button>
            {currentCategory && (
              <Button
                asChild
                variant='outline'
                size='sm'
                className='w-full justify-start'
              >
                <Link href={`/user-guide#${currentCategory}`}>
                  <ExternalLink className='mr-2 h-4 w-4' />
                  {tSidebar('moreInCategory')}
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <ExternalLink className='h-5 w-5 text-green-500' />
              {tCommon('relatedArticles')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {relatedArticles.map((article, index) => (
                <Link
                  key={index}
                  href={article.href}
                  className='block rounded-lg border p-3 transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                >
                  <div className='flex items-start justify-between'>
                    <div className='min-w-0 flex-1'>
                      <h4 className='mb-1 text-sm font-medium text-gray-900'>
                        {article.title}
                      </h4>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center text-xs text-gray-500'>
                          <Clock className='mr-1 h-3 w-3' />
                          {article.time}
                        </div>
                        {article.popular && (
                          <Badge variant='secondary' className='text-xs'>
                            <Star className='mr-1 h-2 w-2' />
                            {tCommon('popular')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ExternalLink className='ml-2 h-4 w-4 shrink-0 text-gray-400' />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Need Help */}
      <Card className='border-blue-100 bg-blue-50/50'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-lg text-blue-900'>
            <HelpCircle className='text-primary h-5 w-5' />
            {tSidebar('needHelp')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <Button
              asChild
              variant='outline'
              size='sm'
              className='w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-100'
            >
              <Link href='/help'>
                <Mail className='mr-2 h-4 w-4' />
                {tSidebar('contactSupport')}
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='sm'
              className='w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-100'
            >
              <Link href='/help/chat'>
                <MessageCircle className='mr-2 h-4 w-4' />
                {tSidebar('liveChat')}
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='sm'
              className='w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-100'
            >
              <Link href='/help/phone'>
                <Phone className='mr-2 h-4 w-4' />
                {tSidebar('phoneSupport')}
              </Link>
            </Button>
            <div className='mt-4 rounded-lg bg-blue-100/50 p-3'>
              <p className='text-xs text-blue-800'>
                {tSidebar('supportMessage')}
              </p>
              <p className='mt-1 text-xs font-medium text-blue-900'>
                {tSidebar('supportHours')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
