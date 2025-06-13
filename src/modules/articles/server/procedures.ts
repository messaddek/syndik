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
  addCommentSchema,
  updateCommentSchema,
  deleteCommentSchema,
  likeCommentSchema,
  getCommentsSchema,
} from '../schema';
import { ArticleAnalyticsService } from '../analytics-service';
import { ArticleCommentsService } from '../comments-service';
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

  // ============= COMMENT PROCEDURES =============
  /**
   * Add a comment to an article (requires authentication)
   */
  addComment: protectedProcedure
    .input(addCommentSchema)
    .mutation(async ({ input, ctx }) => {
      // Note: User info (name, image) should be provided from the client
      // since we don't have access to the full user object in the server context
      const comment = await ArticleCommentsService.addComment({
        articleSlug: input.articleSlug,
        userId: ctx.userId,
        userName: input.userName || 'Anonymous', // Expect userName from client
        userImage: input.userImage || undefined, // Expect userImage from client
        orgId: ctx.orgId || undefined,
        content: input.content,
        parentId: input.parentId || undefined,
      });

      return comment;
    }),

  /**
   * Update a comment (requires authentication and ownership)
   */
  updateComment: protectedProcedure
    .input(updateCommentSchema)
    .mutation(async ({ input, ctx }) => {
      const comment = await ArticleCommentsService.updateComment(
        input.commentId,
        ctx.userId,
        input.content
      );

      return comment;
    }),

  /**
   * Delete a comment (requires authentication and ownership)
   */
  deleteComment: protectedProcedure
    .input(deleteCommentSchema)
    .mutation(async ({ input, ctx }) => {
      await ArticleCommentsService.deleteComment(input.commentId, ctx.userId);
      return { success: true };
    }),

  /**
   * Like/unlike a comment (requires authentication)
   */
  likeComment: protectedProcedure
    .input(likeCommentSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await ArticleCommentsService.toggleCommentLike(
        input.commentId,
        ctx.userId
      );

      return result;
    }),

  /**
   * Get comments for an article (public)
   */
  getComments: baseProcedure
    .input(getCommentsSchema)
    .query(async ({ input, ctx }) => {
      return await ArticleCommentsService.getComments({
        articleSlug: input.articleSlug,
        limit: input.limit,
        offset: input.offset,
        sortBy: input.sortBy,
        currentUserId: ctx.userId || null,
      });
    }),
});
