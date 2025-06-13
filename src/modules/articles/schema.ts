import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  index,
} from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

/**
 * Article Analytics Schema
 *
 * This schema tracks views and engagement for static user guide articles.
 * The actual article content remains static in the React components.
 */

// Article views tracking table - tracks every view of static articles
export const articleViews = pgTable(
  'article_views',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    articleSlug: text('article_slug').notNull(), // References static article by slug
    userId: text('user_id'), // Clerk user ID (null for anonymous)
    orgId: text('org_id'), // Optional organization context
    sessionId: text('session_id'), // Browser session for anonymous tracking
    ipAddress: text('ip_address'), // For duplicate detection
    userAgent: text('user_agent'), // Browser info
    referrer: text('referrer'), // Where they came from
    duration: integer('duration'), // Time spent reading (seconds)
    readPercentage: integer('read_percentage'), // How much of article was read (0-100)
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  table => ({
    articleSlugIdx: index('article_views_slug_idx').on(table.articleSlug),
    userIdIdx: index('article_views_user_id_idx').on(table.userId),
    sessionIdx: index('article_views_session_idx').on(table.sessionId),
    createdAtIdx: index('article_views_created_at_idx').on(table.createdAt),
  })
);

// Article ratings table - tracks ratings for static articles
export const articleRatings = pgTable(
  'article_ratings',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    articleSlug: text('article_slug').notNull(), // References static article by slug
    userId: text('user_id'), // Clerk user ID (required for ratings)
    orgId: text('org_id'), // Optional organization context
    rating: integer('rating').notNull(), // 1-5 stars
    comment: text('comment'), // Optional feedback
    isHelpful: boolean('is_helpful'), // Was this article helpful?
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  table => ({
    articleSlugIdx: index('article_ratings_slug_idx').on(table.articleSlug),
    userIdIdx: index('article_ratings_user_id_idx').on(table.userId),
    ratingIdx: index('article_ratings_rating_idx').on(table.rating),
    // Unique constraint: one rating per user per article
    uniqueUserArticle: index('article_ratings_unique_user_article').on(
      table.userId,
      table.articleSlug
    ),
  })
);

// Article comments table - comments for static articles
export const articleComments = pgTable(
  'article_comments',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    articleSlug: text('article_slug').notNull(), // References static article by slug
    userId: text('user_id').notNull(), // Clerk user ID (required for comments)
    userName: text('user_name').notNull(), // User display name (cached from Clerk)
    userImage: text('user_image'), // User avatar URL (cached from Clerk)
    orgId: text('org_id'), // Optional organization context
    content: text('content').notNull(), // Comment content
    parentId: uuid('parent_id'), // For nested comments/replies
    isEdited: boolean('is_edited').notNull().default(false),
    isDeleted: boolean('is_deleted').notNull().default(false),
    likesCount: integer('likes_count').notNull().default(0),
    repliesCount: integer('replies_count').notNull().default(0),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  table => ({
    articleSlugIdx: index('article_comments_slug_idx').on(table.articleSlug),
    userIdIdx: index('article_comments_user_id_idx').on(table.userId),
    parentIdIdx: index('article_comments_parent_id_idx').on(table.parentId),
    createdAtIdx: index('article_comments_created_at_idx').on(table.createdAt),
    // Self-referencing foreign key for replies
    parentReference: index('article_comments_parent_ref').on(table.parentId),
  })
);

// Article comment likes table - track who liked what comment
export const articleCommentLikes = pgTable(
  'article_comment_likes',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    commentId: uuid('comment_id')
      .notNull()
      .references(() => articleComments.id, { onDelete: 'cascade' }),
    userId: text('user_id').notNull(), // Clerk user ID
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  table => ({
    commentIdIdx: index('article_comment_likes_comment_id_idx').on(
      table.commentId
    ),
    userIdIdx: index('article_comment_likes_user_id_idx').on(table.userId),
    // Unique constraint: one like per user per comment
    uniqueUserComment: index('article_comment_likes_unique_user_comment').on(
      table.userId,
      table.commentId
    ),
  })
);

// Zod schemas for validation
export const selectArticleViewSchema = createSelectSchema(articleViews);
export const insertArticleViewSchema = createInsertSchema(articleViews).omit({
  id: true,
  createdAt: true,
});

export const selectArticleRatingSchema = createSelectSchema(articleRatings);
export const insertArticleRatingSchema = createInsertSchema(
  articleRatings
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectArticleCommentSchema = createSelectSchema(articleComments);
export const insertArticleCommentSchema = createInsertSchema(
  articleComments
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isEdited: true,
  isDeleted: true,
  likesCount: true,
  repliesCount: true,
});

export const selectArticleCommentLikeSchema =
  createSelectSchema(articleCommentLikes);
export const insertArticleCommentLikeSchema = createInsertSchema(
  articleCommentLikes
).omit({
  id: true,
  createdAt: true,
});

// Types for static article definitions
export const staticArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  category: z.string(),
  subcategory: z.string().optional(),
  readTime: z.number().default(5),
  tags: z.array(z.string()).default([]),
  popular: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export type StaticArticle = z.infer<typeof staticArticleSchema>;
export type ArticleView = typeof articleViews.$inferSelect;
export type InsertArticleView = typeof articleViews.$inferInsert;
export type ArticleRating = typeof articleRatings.$inferSelect;
export type InsertArticleRating = typeof articleRatings.$inferInsert;
export type ArticleComment = typeof articleComments.$inferSelect;
export type InsertArticleComment = typeof articleComments.$inferInsert;

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

// API schemas
export const trackViewSchema = z.object({
  articleSlug: z.string().min(1, 'Article slug is required'),
  sessionId: z.string().optional(),
  referrer: z.string().optional(),
  duration: z.number().optional(),
  readPercentage: z.number().min(0).max(100).optional(),
});

export const rateArticleSchema = z.object({
  articleSlug: z.string().min(1, 'Article slug is required'),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  isHelpful: z.boolean().optional(),
});

export const getPopularArticlesSchema = z.object({
  limit: z.number().min(1).max(50).default(10),
  category: z.string().optional(),
  timeframe: z.enum(['day', 'week', 'month', 'year', 'all']).default('month'),
});

export const getArticleAnalyticsSchema = z.object({
  articleSlug: z.string().min(1, 'Article slug is required'),
  timeframe: z.enum(['day', 'week', 'month', 'year', 'all']).default('month'),
});

export const addCommentSchema = z.object({
  articleSlug: z.string().min(1, 'Article slug is required'),
  content: z
    .string()
    .min(1, 'Comment content is required')
    .max(1000, 'Comment too long'),
  parentId: z.string().uuid().optional(), // For replies
  userName: z.string().min(1, 'User name is required'), // Provided from client
  userImage: z.string().optional(), // Provided from client
});

export const updateCommentSchema = z.object({
  commentId: z.string().uuid('Invalid comment ID'),
  content: z
    .string()
    .min(1, 'Comment content is required')
    .max(1000, 'Comment too long'),
});

export const deleteCommentSchema = z.object({
  commentId: z.string().uuid('Invalid comment ID'),
});

export const likeCommentSchema = z.object({
  commentId: z.string().uuid('Invalid comment ID'),
});

export const getCommentsSchema = z.object({
  articleSlug: z.string().min(1, 'Article slug is required'),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['newest', 'oldest', 'popular']).default('newest'),
});
