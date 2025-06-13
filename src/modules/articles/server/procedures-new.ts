import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from '@/trpc/init';
import {
  trackViewSchema,
  rateArticleSchema,
  getPopularArticlesSchema,
  getArticleAnalyticsSchema,
} from '../schema';
import { ArticleAnalyticsService } from '../analytics-service';
import { STATIC_ARTICLES } from '../static-articles';

export const articlesRouter = createTRPCRouter({
  /**
   * Track a view for a static article (public - no auth required)
   */
  trackView: baseProcedure
    .input(trackViewSchema)
    .mutation(async ({ input, ctx }) => {
      await ArticleAnalyticsService.trackView({
        articleSlug: input.articleSlug,
        userId: ctx.userId || null,
        orgId: ctx.orgId || null,
        sessionId: input.sessionId || null,
        referrer: input.referrer || null,
        duration: input.duration || null,
        readPercentage: input.readPercentage || null,
        ipAddress: null, // You can extract this from the request if needed
        userAgent: null, // You can extract this from the request if needed
      });

      return { success: true };
    }),

  /**
   * Rate an article (requires authentication)
   */
  rateArticle: protectedProcedure
    .input(rateArticleSchema)
    .mutation(async ({ input, ctx }) => {
      await ArticleAnalyticsService.rateArticle({
        articleSlug: input.articleSlug,
        userId: ctx.userId,
        orgId: ctx.orgId || null,
        rating: input.rating,
        comment: input.comment || null,
        isHelpful: input.isHelpful || null,
      });

      return { success: true };
    }),

  /**
   * Get popular articles based on analytics
   */
  getPopularArticles: baseProcedure
    .input(getPopularArticlesSchema)
    .query(async ({ input }) => {
      return await ArticleAnalyticsService.getPopularArticles(
        input.limit,
        input.category,
        input.timeframe
      );
    }),

  /**
   * Get analytics for a specific article
   */
  getArticleAnalytics: baseProcedure
    .input(getArticleAnalyticsSchema)
    .query(async ({ input }) => {
      return await ArticleAnalyticsService.getArticleAnalytics(
        input.articleSlug,
        input.timeframe
      );
    }),

  /**
   * Get all articles with their analytics (for admin dashboard)
   */
  getAllArticleAnalytics: protectedProcedure.query(async () => {
    // Get analytics for all static articles
    const allArticles = Object.keys(STATIC_ARTICLES);
    const analyticsPromises = allArticles.map(slug =>
      ArticleAnalyticsService.getArticleAnalytics(slug)
    );

    const analyticsResults = await Promise.all(analyticsPromises);

    return analyticsResults.filter(Boolean);
  }),
});
