import { db } from '@/lib/db';
import { articleComments, articleCommentLikes } from './schema';
import { eq, sql, desc, asc, and } from 'drizzle-orm';
import { STATIC_ARTICLES, type ArticleSlug } from './static-articles';

export class ArticleCommentsService {
  /**
   * Add a comment to a static article
   */ static async addComment(data: {
    articleSlug: string;
    userId: string;
    userName: string;
    userImage?: string;
    orgId?: string;
    content: string;
    parentId?: string;
  }) {
    // Verify article exists in static definitions
    if (!STATIC_ARTICLES[data.articleSlug as ArticleSlug]) {
      throw new Error(`Article not found: ${data.articleSlug}`);
    }
    const [comment] = await db
      .insert(articleComments)
      .values({
        articleSlug: data.articleSlug,
        userId: data.userId,
        userName: data.userName,
        userImage: data.userImage ?? null,
        orgId: data.orgId ?? null,
        content: data.content,
        parentId: data.parentId ?? null,
      })
      .returning();

    // If this is a reply, increment parent's reply count
    if (data.parentId) {
      await db
        .update(articleComments)
        .set({
          repliesCount: sql`${articleComments.repliesCount} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(articleComments.id, data.parentId));
    }

    return comment;
  }
  /**
   * Get comments for a static article with nested replies
   */
  static async getComments(options: {
    articleSlug: string;
    limit?: number;
    offset?: number;
    sortBy?: 'newest' | 'oldest' | 'popular';
    currentUserId?: string | null;
  }) {
    const {
      articleSlug,
      limit = 20,
      offset = 0,
      sortBy = 'newest',
      currentUserId,
    } = options;

    // Verify article exists
    if (!STATIC_ARTICLES[articleSlug as ArticleSlug]) {
      throw new Error(`Article not found: ${articleSlug}`);
    }

    // Determine sort order
    let orderBy;
    switch (sortBy) {
      case 'oldest':
        orderBy = asc(articleComments.createdAt);
        break;
      case 'popular':
        orderBy = desc(articleComments.likesCount);
        break;
      default: // newest
        orderBy = desc(articleComments.createdAt);
    }

    // Get top-level comments first (parentId is null)
    const topLevelComments = await db
      .select({
        id: articleComments.id,
        articleSlug: articleComments.articleSlug,
        userId: articleComments.userId,
        userName: articleComments.userName,
        userImage: articleComments.userImage,
        content: articleComments.content,
        parentId: articleComments.parentId,
        isEdited: articleComments.isEdited,
        isDeleted: articleComments.isDeleted,
        likesCount: articleComments.likesCount,
        repliesCount: articleComments.repliesCount,
        createdAt: articleComments.createdAt,
        updatedAt: articleComments.updatedAt,
      })
      .from(articleComments)
      .where(
        and(
          eq(articleComments.articleSlug, articleSlug),
          eq(articleComments.isDeleted, false),
          sql`${articleComments.parentId} IS NULL` // Top-level comments have null parentId
        )
      )
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    // Get replies for each top-level comment and check if current user liked each comment
    const commentsWithReplies = await Promise.all(
      topLevelComments.map(async comment => {
        const replies = await this.getReplies(comment.id);

        // Check if current user liked this comment
        let isLikedByUser = false;
        if (currentUserId) {
          const userLike = await db
            .select()
            .from(articleCommentLikes)
            .where(
              and(
                eq(articleCommentLikes.commentId, comment.id),
                eq(articleCommentLikes.userId, currentUserId)
              )
            )
            .limit(1);
          isLikedByUser = userLike.length > 0;
        }

        // Also check likes for replies
        const repliesWithLikes = await Promise.all(
          replies.map(async reply => {
            let isReplyLikedByUser = false;
            if (currentUserId) {
              const userLike = await db
                .select()
                .from(articleCommentLikes)
                .where(
                  and(
                    eq(articleCommentLikes.commentId, reply.id),
                    eq(articleCommentLikes.userId, currentUserId)
                  )
                )
                .limit(1);
              isReplyLikedByUser = userLike.length > 0;
            }
            return {
              ...reply,
              isLikedByUser: isReplyLikedByUser,
            };
          })
        );

        return {
          ...comment,
          isLikedByUser,
          replies: repliesWithLikes,
        };
      })
    );

    return commentsWithReplies;
  }

  /**
   * Get replies for a specific comment
   */
  static async getReplies(parentCommentId: string) {
    return await db
      .select()
      .from(articleComments)
      .where(
        and(
          eq(articleComments.parentId, parentCommentId),
          eq(articleComments.isDeleted, false)
        )
      )
      .orderBy(asc(articleComments.createdAt)); // Replies sorted oldest first
  }

  /**
   * Update a comment
   */
  static async updateComment(
    commentId: string,
    userId: string,
    content: string
  ) {
    const [comment] = await db
      .update(articleComments)
      .set({
        content,
        isEdited: true,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(articleComments.id, commentId),
          eq(articleComments.userId, userId), // User can only edit their own comments
          eq(articleComments.isDeleted, false)
        )
      )
      .returning();

    if (!comment) {
      throw new Error('Comment not found or you are not authorized to edit it');
    }

    return comment;
  }

  /**
   * Soft delete a comment
   */
  static async deleteComment(commentId: string, userId: string) {
    const [comment] = await db
      .update(articleComments)
      .set({
        isDeleted: true,
        content: '[Comment deleted]',
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(articleComments.id, commentId),
          eq(articleComments.userId, userId), // User can only delete their own comments
          eq(articleComments.isDeleted, false)
        )
      )
      .returning();

    if (!comment) {
      throw new Error(
        'Comment not found or you are not authorized to delete it'
      );
    }

    // If this comment has a parent, decrement the parent's reply count
    if (comment.parentId) {
      await db
        .update(articleComments)
        .set({
          repliesCount: sql`${articleComments.repliesCount} - 1`,
          updatedAt: new Date(),
        })
        .where(eq(articleComments.id, comment.parentId));
    }

    return comment;
  }

  /**
   * Like/unlike a comment
   */
  static async toggleCommentLike(commentId: string, userId: string) {
    // Check if user already liked this comment
    const existingLike = await db
      .select()
      .from(articleCommentLikes)
      .where(
        and(
          eq(articleCommentLikes.commentId, commentId),
          eq(articleCommentLikes.userId, userId)
        )
      )
      .limit(1);

    if (existingLike.length > 0) {
      // Unlike: remove the like
      await db
        .delete(articleCommentLikes)
        .where(eq(articleCommentLikes.id, existingLike[0].id));

      // Decrement likes count
      await db
        .update(articleComments)
        .set({
          likesCount: sql`${articleComments.likesCount} - 1`,
          updatedAt: new Date(),
        })
        .where(eq(articleComments.id, commentId));

      return { liked: false };
    } else {
      // Like: add the like
      await db.insert(articleCommentLikes).values({
        commentId,
        userId,
      });

      // Increment likes count
      await db
        .update(articleComments)
        .set({
          likesCount: sql`${articleComments.likesCount} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(articleComments.id, commentId));

      return { liked: true };
    }
  }

  /**
   * Get comment statistics for an article
   */
  static async getCommentStats(articleSlug: string) {
    if (!STATIC_ARTICLES[articleSlug as ArticleSlug]) {
      throw new Error(`Article not found: ${articleSlug}`);
    }

    const [stats] = await db
      .select({
        totalComments: sql<number>`count(*)`.as('totalComments'),
        totalLikes: sql<number>`sum(${articleComments.likesCount})`.as(
          'totalLikes'
        ),
      })
      .from(articleComments)
      .where(
        and(
          eq(articleComments.articleSlug, articleSlug),
          eq(articleComments.isDeleted, false)
        )
      );

    return {
      totalComments: stats.totalComments || 0,
      totalLikes: stats.totalLikes || 0,
    };
  }
}
