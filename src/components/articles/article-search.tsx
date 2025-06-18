'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Clock, Star, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { ArticleSearchService } from '@/modules/articles/search-service';

interface ArticleSearchProps {
  onResults?: (count: number) => void;
  category?: string;
  className?: string;
}

export const ArticleSearch = ({
  onResults,
  category,
  className,
}: ArticleSearchProps) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 300);
  const locale = useLocale();
  const t = useTranslations('userGuide');
  const tArticles = useTranslations('userGuide.articleTitles');
  const tDescriptions = useTranslations('userGuide.articleDescriptions');

  // Get translations for search
  const translations = useMemo(() => {
    const articleTitles: Record<string, string> = {};
    const articleDescriptions: Record<string, string> = {};

    // Get all article translation keys
    const articleSlugs = [
      'creating-your-first-property',
      'setting-up-user-accounts',
      'understanding-roles-permissions',
      'initial-configuration-guide',
      'adding-new-properties',
      'property-information-management',
      'unit-management-organization',
      'maintenance-request-handling',
      'adding-new-residents',
      'lease-agreements-management',
      'resident-communication-tools',
      'handling-resident-requests',
      'rent-collection-payment-tracking',
      'generating-financial-reports',
      'expense-management-tracking',
      'budgeting-forecasting-tools',
      'system-settings-configuration',
      'user-preferences-customization',
      'data-backup-security',
      'integration-third-party-tools',
      'property-information-updates',
      'document-management-system',
      'lease-agreement-management',
      'move-in-move-out-process',
      'setting-up-rent-collection',
      'processing-payments',
      'late-payment-management',
      'creating-work-orders',
      'tracking-maintenance-requests',
      'vendor-management',
      'preventive-maintenance-setup',
      'sending-announcements',
      'individual-messaging',
      'notification-settings',
      'email-templates',
    ];

    articleSlugs.forEach(slug => {
      try {
        articleTitles[slug] = tArticles(slug);
        articleDescriptions[slug] = tDescriptions(slug);
      } catch (_error) {
        // Fallback to slug if translation missing
        console.warn(`Missing translation for ${slug}`);
      }
    });

    return { articleTitles, articleDescriptions };
  }, [tArticles, tDescriptions]);

  // Search results
  const results = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) return [];

    return ArticleSearchService.searchArticles(
      {
        query: debouncedQuery,
        category,
        locale,
        limit: 10,
      },
      translations
    );
  }, [debouncedQuery, category, locale, translations]);

  // Search suggestions
  const suggestions = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2 || results.length > 0)
      return [];

    return ArticleSearchService.getSearchSuggestions(
      debouncedQuery,
      translations,
      5
    );
  }, [debouncedQuery, results.length, translations]);

  useEffect(() => {
    onResults?.(results.length);
    setShowResults(debouncedQuery.length > 0);
  }, [results.length, onResults, debouncedQuery]);

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };
  // Helper function for read time
  const getMinuteText = (minutes: number) => {
    if (locale === 'ar') {
      return minutes === 1 ? t('common.readTime') : t('common.readTimeMinutes');
    }
    return t('common.readTime');
  };

  // Helper function to get results count text with proper Arabic pluralization
  const getResultsCountText = (count: number) => {
    if (locale === 'ar') {
      if (count === 1) {
        return `تم العثور على نتيجة واحدة`;
      } else {
        return `تم العثور على ${count} نتائج`;
      }
    } else {
      return t('search.resultsCount', { count });
    }
  };

  // Helper function to map category slugs to translation keys
  const getCategoryTitle = (categorySlug: string) => {
    const categoryMap: Record<string, string> = {
      'getting-started': 'gettingStarted',
      'property-management': 'propertyManagement',
      'resident-management': 'residentManagement',
      'financial-management': 'financialManagement',
      maintenance: 'maintenance',
      communication: 'communication',
    };

    const translationKey = categoryMap[categorySlug];
    if (translationKey) {
      return t(`categories.${translationKey}.title`);
    }
    return categorySlug; // fallback
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className='relative'>
        <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
        <Input
          placeholder={t('search.placeholder')}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className='pr-10 pl-10'
          onFocus={() => setShowResults(query.length > 0)}
        />
        {query && (
          <button
            onClick={clearSearch}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className='absolute top-full z-50 mt-1 w-full rounded-lg border bg-white shadow-lg'>
          <div className='max-h-96 overflow-y-auto p-2'>
            {/* Search Results */}
            {results.length > 0 && (
              <div className='space-y-2'>
                <div className='px-2 py-1 text-xs font-medium text-gray-500'>
                  {getResultsCountText(results.length)}
                </div>
                <div className='space-y-2'>
                  {results.map(article => (
                    <Link
                      key={article.slug}
                      href={`/user-guide/${article.category}/${article.slug}`}
                      onClick={() => setShowResults(false)}
                    >
                      <Card className='mb-2 cursor-pointer transition-colors hover:bg-gray-50'>
                        <CardContent className='p-3'>
                          <div className='flex items-start justify-between'>
                            <div className='min-w-0 flex-1'>
                              <h4
                                className='mb-1 truncate font-medium text-gray-900'
                                dangerouslySetInnerHTML={{
                                  __html:
                                    article.highlightedTitle || article.title,
                                }}
                              />
                              <p
                                className='mb-2 line-clamp-2 text-sm text-gray-600'
                                dangerouslySetInnerHTML={{
                                  __html:
                                    article.highlightedDescription ||
                                    article.description,
                                }}
                              />
                              <div className='flex items-center gap-2'>
                                <Badge variant='outline' className='text-xs'>
                                  {getCategoryTitle(article.category)}
                                </Badge>
                                {article.popular && (
                                  <Badge
                                    variant='secondary'
                                    className='text-xs'
                                  >
                                    <Star className='mr-1 h-3 w-3' />
                                    {t('common.popular')}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className='ml-4 flex shrink-0 items-center gap-1 text-sm text-gray-500'>
                              <Clock className='h-3 w-3' />
                              {article.readTime}{' '}
                              {getMinuteText(article.readTime)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {results.length === 0 && debouncedQuery.length >= 2 && (
              <div className='py-8 text-center'>
                <p className='mb-4 text-gray-500'>{t('search.noResults')}</p>

                {/* Search Suggestions */}
                {suggestions.length > 0 && (
                  <div>
                    <p className='mb-2 text-sm text-gray-400'>
                      {t('search.suggestions')}
                    </p>
                    <div className='flex flex-wrap justify-center gap-2'>
                      {suggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant='outline'
                          className='cursor-pointer hover:bg-gray-50'
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Search Instructions */}
            {debouncedQuery.length < 2 && query.length > 0 && (
              <div className='py-4 text-center text-sm text-gray-500'>
                {t('search.minChars')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
