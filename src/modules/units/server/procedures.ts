import { eq, and, ilike } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { units, createUnitSchema, updateUnitSchema } from '../schema';

export const unitsRouter = createTRPCRouter({
  create: orgProtectedProcedure
    .input(createUnitSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const [newUnit] = await db
        .insert(units)
        .values({
          orgId,
          buildingId: input.buildingId,
          unitNumber: input.unitNumber,
          floor: input.floor,
          area: input.area || null,
          bedrooms: input.bedrooms,
          bathrooms: input.bathrooms,
          monthlyFee: input.monthlyFee,
          description: input.description,
        })
        .returning();

      return newUnit;
    }),
  getByBuilding: orgProtectedProcedure
    .input(z.object({ buildingId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      return await db
        .select()
        .from(units)
        .where(
          and(eq(units.buildingId, input.buildingId), eq(units.orgId, orgId))
        )
        .orderBy(units.floor, units.unitNumber);
    }),
  getAll: orgProtectedProcedure
    .input(
      z.object({
        unitNumber: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const conditions = [eq(units.orgId, orgId)];

      if (input.unitNumber) {
        conditions.push(ilike(units.unitNumber, `%${input.unitNumber}%`));
      }

      return await db
        .select()
        .from(units)
        .where(and(...conditions))
        .orderBy(units.floor, units.unitNumber);
    }),

  getById: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [unit] = await db
        .select()
        .from(units)
        .where(and(eq(units.id, input.id), eq(units.orgId, orgId)))
        .limit(1);

      return unit || null;
    }),
  update: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateUnitSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [updatedUnit] = await db
        .update(units)
        .set({
          ...input.data,
          updatedAt: new Date(),
        })
        .where(and(eq(units.id, input.id), eq(units.orgId, orgId)))
        .returning();

      return updatedUnit;
    }),

  delete: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [deletedUnit] = await db
        .delete(units)
        .where(and(eq(units.id, input.id), eq(units.orgId, orgId)))
        .returning();

      return deletedUnit;
    }),

  toggleOccupancy: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        isOccupied: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [updatedUnit] = await db
        .update(units)
        .set({
          isOccupied: input.isOccupied,
          updatedAt: new Date(),
        })
        .where(and(eq(units.id, input.id), eq(units.orgId, orgId)))
        .returning();

      return updatedUnit;
    }),
});
