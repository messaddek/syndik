import { z } from 'zod';
import {
  articleViews,
  articleRatings,
  trackViewSchema,
  rateArticleSchema,
  getPopularArticlesSchema,
  getArticleAnalyticsSchema,
  staticArticleSchema,
} from './schema';

// Use Drizzle's table inference for database types (analytics only)
export type ArticleView = typeof articleViews.$inferSelect;
export type InsertArticleView = typeof articleViews.$inferInsert;
export type ArticleRating = typeof articleRatings.$inferSelect;
export type InsertArticleRating = typeof articleRatings.$inferInsert;

// Use Zod inference for form/validation types
export type StaticArticle = z.infer<typeof staticArticleSchema>;
export type TrackView = z.infer<typeof trackViewSchema>;
export type RateArticle = z.infer<typeof rateArticleSchema>;
export type GetPopularArticles = z.infer<typeof getPopularArticlesSchema>;
export type GetArticleAnalytics = z.infer<typeof getArticleAnalyticsSchema>;

// Analytics aggregation types
export type ArticleAnalytics = {
  slug: string;
  totalViews: number;
  uniqueViews: number;
  averageRating: number;
  ratingCount: number;
  averageReadTime: number;
  averageReadPercentage: number;
  popularityScore: number; // Calculated score for ranking
};

export type PopularArticle = {
  slug: string;
  title: string;
  views: string; // Formatted view count (e.g., "2.1k")
  rating: number;
  category: string;
  readTime: number;
};

// View analytics interface
export interface ViewAnalytics {
  articleSlug: string;
  totalViews: number;
  uniqueViews: number;
  avgTimeSpent: number;
  topReferrers: Array<{
    referrer: string;
    count: number;
  }>;
  viewsByDay: Array<{
    date: string;
    views: number;
    uniqueViews: number;
  }>;
  userTypes: {
    registered: number;
    anonymous: number;
  };
}

// Category definitions (you can move this to a separate constants file)
export const ARTICLE_CATEGORIES = {
  'getting-started': 'Getting Started',
  'property-management': 'Property Management',
  'resident-management': 'Resident Management',
  'financial-management': 'Financial Management',
  maintenance: 'Maintenance & Requests',
  communication: 'Communication',
  reporting: 'Reports & Analytics',
  integrations: 'Integrations',
  troubleshooting: 'Troubleshooting',
} as const;

export type ArticleCategory = keyof typeof ARTICLE_CATEGORIES;
