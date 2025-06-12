import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { announcements, createAnnouncementSchema } from '../schema';

export const announcementsRouter = createTRPCRouter({
  create: orgProtectedProcedure
    .input(createAnnouncementSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, orgId, userId } = ctx;

      const [newAnnouncement] = await db
        .insert(announcements)
        .values({
          orgId,
          authorId: userId,
          ...input,
        })
        .returning();

      return newAnnouncement;
    }),

  getAll: orgProtectedProcedure
    .input(
      z.object({
        buildingId: z.string().uuid().optional(),
        includeExpired: z.boolean().default(false),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const conditions = [
        eq(announcements.orgId, orgId),
        eq(announcements.isPublished, true),
      ];

      if (input.buildingId) {
        conditions.push(eq(announcements.buildingId, input.buildingId));
      }
      if (!input.includeExpired) {
        // For now, only include published announcements
        // TODO: Add proper expiry filtering
      }

      const result = await db
        .select()
        .from(announcements)
        .where(and(...conditions))
        .orderBy(desc(announcements.publishedAt))
        .limit(input.limit);

      return result;
    }),

  getRecent: orgProtectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(10).default(5),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const result = await db
        .select()
        .from(announcements)
        .where(
          and(
            eq(announcements.orgId, orgId),
            eq(announcements.isPublished, true)
          )
        )
        .orderBy(desc(announcements.publishedAt))
        .limit(input.limit);

      return result;
    }),
});
