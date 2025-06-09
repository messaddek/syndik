import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { buildings, createBuildingSchema } from '../schema';

export const buildingsRouter = createTRPCRouter({
  create: orgProtectedProcedure
    .input(createBuildingSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [newBuilding] = await db
        .insert(buildings)
        .values({
          orgId,
          ...input,
        })
        .returning();

      return newBuilding;
    }),

  getAll: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, orgId } = ctx;

    return await db
      .select()
      .from(buildings)
      .where(eq(buildings.orgId, orgId))
      .orderBy(buildings.createdAt);
  }),

  getById: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [building] = await db
        .select()
        .from(buildings)
        .where(and(eq(buildings.id, input.id), eq(buildings.orgId, orgId)))
        .limit(1);

      return building || null;
    }),

  update: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: createBuildingSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [updatedBuilding] = await db
        .update(buildings)
        .set({
          ...input.data,
          updatedAt: new Date(),
        })
        .where(and(eq(buildings.id, input.id), eq(buildings.orgId, orgId)))
        .returning();

      return updatedBuilding;
    }),

  delete: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [deletedBuilding] = await db
        .delete(buildings)
        .where(and(eq(buildings.id, input.id), eq(buildings.orgId, orgId)))
        .returning();

      return deletedBuilding;
    }),
});
