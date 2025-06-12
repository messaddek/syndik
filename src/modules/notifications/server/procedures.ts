import { eq, and, desc, count, gte, isNull, or } from 'drizzle-orm';
import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  orgProtectedProcedure,
} from '@/trpc/init';
import {
  notifications,
  notificationPreferences,
  createNotificationSchema,
  markNotificationReadSchema,
  markAllReadSchema,
  notificationPreferencesSchema,
} from '../schema';
import { TRPCError } from '@trpc/server';
import { PAGINATION } from '@/constants';

export const notificationsRouter = createTRPCRouter({
  // Create a new notification (admin only)
  create: orgProtectedProcedure
    .input(createNotificationSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [newNotification] = await db
        .insert(notifications)
        .values({
          orgId,
          ...input,
          expiresAt: input.expiresAt || null,
        })
        .returning();

      return newNotification;
    }),

  // Get user's notifications with filtering and pagination
  getMyNotifications: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(50).default(20),
        category: z
          .enum(['financial', 'maintenance', 'community', 'system', 'general'])
          .optional(),
        isRead: z.boolean().optional(),
        priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
        type: z
          .enum([
            'announcement',
            'payment_due',
            'maintenance',
            'meeting',
            'system',
            'welcome',
          ])
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;
      const { page, pageSize, category, isRead, priority, type } = input;

      if (!orgId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Organization access required',
        });
      }

      const offset = (page - 1) * pageSize;

      // Build where conditions
      const whereConditions = [
        eq(notifications.orgId, orgId),
        or(
          eq(notifications.userId, userId),
          isNull(notifications.userId) // Include org-wide notifications
        ),
      ];

      if (category) {
        whereConditions.push(eq(notifications.category, category));
      }

      if (isRead !== undefined) {
        whereConditions.push(eq(notifications.isRead, isRead));
      }

      if (priority) {
        whereConditions.push(eq(notifications.priority, priority));
      }

      if (type) {
        whereConditions.push(eq(notifications.type, type));
      }

      // Filter out archived notifications
      whereConditions.push(eq(notifications.isArchived, false));

      // Filter out expired notifications
      whereConditions.push(
        or(
          isNull(notifications.expiresAt),
          gte(notifications.expiresAt, new Date())
        )!
      );

      // Get total count
      const [{ total }] = await db
        .select({ total: count() })
        .from(notifications)
        .where(and(...whereConditions));

      // Get paginated notifications
      const notificationList = await db
        .select()
        .from(notifications)
        .where(and(...whereConditions))
        .orderBy(desc(notifications.createdAt))
        .limit(pageSize)
        .offset(offset);

      return {
        data: notificationList,
        pagination: {
          page,
          pageSize,
          total: Number(total),
          totalPages: Math.ceil(Number(total) / pageSize),
        },
      };
    }),

  // Get unread notification count
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    if (!orgId) {
      return { total: 0, byCategory: {} };
    }

    // Get total unread count
    const [{ total }] = await db
      .select({ total: count() })
      .from(notifications)
      .where(
        and(
          eq(notifications.orgId, orgId),
          or(eq(notifications.userId, userId), isNull(notifications.userId)),
          eq(notifications.isRead, false),
          eq(notifications.isArchived, false),
          or(
            isNull(notifications.expiresAt),
            gte(notifications.expiresAt, new Date())
          )!
        )
      );

    // Get count by category
    const categoryCount = await db
      .select({
        category: notifications.category,
        count: count(),
      })
      .from(notifications)
      .where(
        and(
          eq(notifications.orgId, orgId),
          or(eq(notifications.userId, userId), isNull(notifications.userId)),
          eq(notifications.isRead, false),
          eq(notifications.isArchived, false),
          or(
            isNull(notifications.expiresAt),
            gte(notifications.expiresAt, new Date())
          )!
        )
      )
      .groupBy(notifications.category);

    const byCategory = categoryCount.reduce(
      (acc, item) => {
        acc[item.category] = Number(item.count);
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      total: Number(total),
      byCategory,
    };
  }),

  // Mark notification as read
  markAsRead: protectedProcedure
    .input(markNotificationReadSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      if (!orgId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Organization access required',
        });
      }

      const [updatedNotification] = await db
        .update(notifications)
        .set({
          isRead: true,
          readAt: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(notifications.id, input.notificationId),
            eq(notifications.orgId, orgId),
            or(eq(notifications.userId, userId), isNull(notifications.userId))
          )
        )
        .returning();

      if (!updatedNotification) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Notification not found',
        });
      }

      return updatedNotification;
    }),

  // Mark all notifications as read
  markAllAsRead: protectedProcedure
    .input(markAllReadSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      if (!orgId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Organization access required',
        });
      }

      const whereConditions = [
        eq(notifications.orgId, orgId),
        or(eq(notifications.userId, userId), isNull(notifications.userId)),
        eq(notifications.isRead, false),
      ];

      if (input.category) {
        whereConditions.push(eq(notifications.category, input.category));
      }

      const updatedNotifications = await db
        .update(notifications)
        .set({
          isRead: true,
          readAt: new Date(),
          updatedAt: new Date(),
        })
        .where(and(...whereConditions))
        .returning();

      return {
        updated: updatedNotifications.length,
        notifications: updatedNotifications,
      };
    }),

  // Archive notification
  archive: protectedProcedure
    .input(z.object({ notificationId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      if (!orgId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Organization access required',
        });
      }

      const [archivedNotification] = await db
        .update(notifications)
        .set({
          isArchived: true,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(notifications.id, input.notificationId),
            eq(notifications.orgId, orgId),
            or(eq(notifications.userId, userId), isNull(notifications.userId))
          )
        )
        .returning();

      if (!archivedNotification) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Notification not found',
        });
      }

      return archivedNotification;
    }),

  // Get notification preferences
  getPreferences: protectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    if (!orgId) {
      return {
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        categoryPreferences: {},
        quietHours: null,
      };
    }

    const [preferences] = await db
      .select()
      .from(notificationPreferences)
      .where(
        and(
          eq(notificationPreferences.userId, userId),
          eq(notificationPreferences.orgId, orgId)
        )
      )
      .limit(1);

    if (!preferences) {
      return {
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        categoryPreferences: {},
        quietHours: null,
      };
    }

    return {
      emailNotifications: preferences.emailNotifications,
      pushNotifications: preferences.pushNotifications,
      smsNotifications: preferences.smsNotifications,
      categoryPreferences: preferences.categoryPreferences || {},
      quietHours: preferences.quietHours || null,
    };
  }),

  // Update notification preferences
  updatePreferences: protectedProcedure
    .input(notificationPreferencesSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      if (!orgId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Organization access required',
        });
      }

      // Check if preferences exist
      const [existingPreferences] = await db
        .select()
        .from(notificationPreferences)
        .where(
          and(
            eq(notificationPreferences.userId, userId),
            eq(notificationPreferences.orgId, orgId)
          )
        )
        .limit(1);

      if (existingPreferences) {
        // Update existing preferences
        const [updated] = await db
          .update(notificationPreferences)
          .set({
            ...input,
            updatedAt: new Date(),
          })
          .where(eq(notificationPreferences.id, existingPreferences.id))
          .returning();

        return updated;
      } else {
        // Create new preferences
        const [created] = await db
          .insert(notificationPreferences)
          .values({
            userId,
            orgId,
            ...input,
          })
          .returning();

        return created;
      }
    }),

  // Admin: Create system notification for all users
  createSystemNotification: orgProtectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        message: z.string().min(1),
        category: z
          .enum(['financial', 'maintenance', 'community', 'system', 'general'])
          .default('system'),
        priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
        actionUrl: z.string().url().optional(),
        expiresAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [notification] = await db
        .insert(notifications)
        .values({
          orgId,
          type: 'system',
          userId: null, // Null means it's for all users in the org
          ...input,
        })
        .returning();

      return notification;
    }),

  // Admin: Get all notifications for the organization
  getAllForOrg: orgProtectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(50).default(20),
        type: z
          .enum([
            'announcement',
            'payment_due',
            'maintenance',
            'meeting',
            'system',
            'welcome',
          ])
          .optional(),
        category: z
          .enum(['financial', 'maintenance', 'community', 'system', 'general'])
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const { page, pageSize, type, category } = input;

      const offset = (page - 1) * pageSize;

      const whereConditions = [eq(notifications.orgId, orgId)];

      if (type) {
        whereConditions.push(eq(notifications.type, type));
      }

      if (category) {
        whereConditions.push(eq(notifications.category, category));
      }

      // Get total count
      const [{ total }] = await db
        .select({ total: count() })
        .from(notifications)
        .where(and(...whereConditions));

      // Get paginated notifications
      const notificationList = await db
        .select()
        .from(notifications)
        .where(and(...whereConditions))
        .orderBy(desc(notifications.createdAt))
        .limit(pageSize)
        .offset(offset);

      return {
        data: notificationList,
        pagination: {
          page,
          pageSize,
          total: Number(total),
          totalPages: Math.ceil(Number(total) / pageSize),
        },
      };
    }),
});
