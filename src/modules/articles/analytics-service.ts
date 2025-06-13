import { db } from '@/lib/db';
import { articleViews, articleRatings } from './schema';
import { eq, sql, desc, and, gte } from 'drizzle-orm';
import type {
  InsertArticleView,
  InsertArticleRating,
  ArticleAnalytics,
  PopularArticle,
} from './schema';
import { STATIC_ARTICLES, type ArticleSlug } from './static-articles';

export class ArticleAnalyticsService {
  /**
   * Track a view for a static article
   */
  static async trackView(data: InsertArticleView) {
    try {
      // Only track if article exists in static definitions
      if (!STATIC_ARTICLES[data.articleSlug as ArticleSlug]) {
        throw new Error(`Article not found: ${data.articleSlug}`);
      }

      await db.insert(articleViews).values(data);
    } catch (error) {
      console.error('Failed to track article view:', error);
      // Don't throw - analytics shouldn't break the user experience
    }
  }

  /**
   * Rate a static article
   */
  static async rateArticle(data: InsertArticleRating) {
    if (!STATIC_ARTICLES[data.articleSlug as ArticleSlug]) {
      throw new Error(`Article not found: ${data.articleSlug}`);
    }

    // Upsert rating (update if exists, insert if not)
    await db
      .insert(articleRatings)
      .values(data)
      .onConflictDoUpdate({
        target: [articleRatings.userId, articleRatings.articleSlug],
        set: {
          rating: data.rating,
          comment: data.comment,
          isHelpful: data.isHelpful,
          updatedAt: new Date(),
        },
      });
  }

  /**
   * Get analytics for a specific article
   */
  static async getArticleAnalytics(
    articleSlug: string,
    timeframe = 'month'
  ): Promise<ArticleAnalytics | null> {
    const article = STATIC_ARTICLES[articleSlug as ArticleSlug];
    if (!article) return null;

    const timeFilter = this.getTimeFilter(timeframe);

    // Get view analytics
    const viewStats = await db
      .select({
        totalViews: sql<number>`count(*)`.as('totalViews'),
        uniqueViews:
          sql<number>`count(distinct coalesce(${articleViews.userId}, ${articleViews.sessionId}))`.as(
            'uniqueViews'
          ),
        averageReadTime: sql<number>`avg(${articleViews.duration})`.as(
          'averageReadTime'
        ),
        averageReadPercentage:
          sql<number>`avg(${articleViews.readPercentage})`.as(
            'averageReadPercentage'
          ),
      })
      .from(articleViews)
      .where(
        and(
          eq(articleViews.articleSlug, articleSlug),
          timeFilter ? gte(articleViews.createdAt, timeFilter) : undefined
        )
      );

    // Get rating analytics
    const ratingStats = await db
      .select({
        averageRating: sql<number>`avg(${articleRatings.rating})`.as(
          'averageRating'
        ),
        ratingCount: sql<number>`count(*)`.as('ratingCount'),
      })
      .from(articleRatings)
      .where(
        and(
          eq(articleRatings.articleSlug, articleSlug),
          timeFilter ? gte(articleRatings.createdAt, timeFilter) : undefined
        )
      );

    const views = viewStats[0];
    const ratings = ratingStats[0];

    if (!views || views.totalViews === 0) return null;

    // Calculate popularity score (you can adjust this algorithm)
    const popularityScore = this.calculatePopularityScore({
      totalViews: views.totalViews,
      uniqueViews: views.uniqueViews,
      averageRating: ratings.averageRating || 0,
      ratingCount: ratings.ratingCount || 0,
      averageReadPercentage: views.averageReadPercentage || 0,
    });

    return {
      slug: articleSlug,
      totalViews: views.totalViews,
      uniqueViews: views.uniqueViews,
      averageRating: ratings.averageRating || 0,
      ratingCount: ratings.ratingCount || 0,
      averageReadTime: views.averageReadTime || 0,
      averageReadPercentage: views.averageReadPercentage || 0,
      popularityScore,
    };
  }

  /**
   * Get popular articles with real analytics
   */
  static async getPopularArticles(
    limit = 10,
    category?: string,
    timeframe = 'month'
  ): Promise<PopularArticle[]> {
    const timeFilter = this.getTimeFilter(timeframe);

    // Get view counts for all articles
    const popularityQuery = db
      .select({
        articleSlug: articleViews.articleSlug,
        totalViews: sql<number>`count(*)`.as('totalViews'),
        uniqueViews:
          sql<number>`count(distinct coalesce(${articleViews.userId}, ${articleViews.sessionId}))`.as(
            'uniqueViews'
          ),
        averageRating:
          sql<number>`coalesce(avg(${articleRatings.rating}), 0)`.as(
            'averageRating'
          ),
        ratingCount: sql<number>`count(${articleRatings.rating})`.as(
          'ratingCount'
        ),
      })
      .from(articleViews)
      .leftJoin(
        articleRatings,
        eq(articleViews.articleSlug, articleRatings.articleSlug)
      )
      .where(timeFilter ? gte(articleViews.createdAt, timeFilter) : undefined)
      .groupBy(articleViews.articleSlug)
      .orderBy(desc(sql`count(*)`)) // Order by total views
      .limit(limit);

    const results = await popularityQuery; // Map to PopularArticle format with static metadata
    const popularArticles: PopularArticle[] = [];

    for (const result of results) {
      const staticData = STATIC_ARTICLES[result.articleSlug as ArticleSlug];
      if (!staticData) continue;

      // Filter by category if specified
      if (category && staticData.category !== category) continue;

      popularArticles.push({
        slug: result.articleSlug,
        title: staticData.title,
        views: this.formatViewCount(result.totalViews),
        rating: Number((result.averageRating || 0).toFixed(1)),
        category: staticData.category,
        readTime: staticData.readTime,
      });
    }

    return popularArticles;
  }

  /**
   * Get time filter for analytics queries
   */
  private static getTimeFilter(timeframe: string): Date | null {
    const now = new Date();
    switch (timeframe) {
      case 'day':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case 'week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'month':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case 'year':
        return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      default:
        return null; // 'all' time
    }
  }

  /**
   * Calculate popularity score algorithm
   */
  private static calculatePopularityScore(data: {
    totalViews: number;
    uniqueViews: number;
    averageRating: number;
    ratingCount: number;
    averageReadPercentage: number;
  }): number {
    const {
      totalViews,
      uniqueViews,
      averageRating,
      ratingCount,
      averageReadPercentage,
    } = data;

    // Weighted scoring algorithm (adjust weights as needed)
    const viewScore = Math.log(totalViews + 1) * 0.3;
    const uniqueViewScore = Math.log(uniqueViews + 1) * 0.2;
    const ratingScore = averageRating * Math.log(ratingCount + 1) * 0.3;
    const engagementScore = (averageReadPercentage / 100) * 0.2;

    return viewScore + uniqueViewScore + ratingScore + engagementScore;
  }

  /**
   * Format view count for display (e.g., 1500 -> "1.5k")
   */
  private static formatViewCount(count: number): string {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 1000000).toFixed(1)}M`;
  }
}
