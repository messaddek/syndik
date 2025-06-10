import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { incomes, createIncomeSchema } from '../schema';

export const incomesRouter = createTRPCRouter({
  create: orgProtectedProcedure
    .input(createIncomeSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const [newIncome] = await db
        .insert(incomes)
        .values({
          orgId,
          ...input,
          amount: input.amount,
          receivedDate: new Date(input.receivedDate),
        })
        .returning();

      return newIncome;
    }),

  getAll: orgProtectedProcedure
    .input(
      z.object({
        year: z.number().optional(),
        month: z.number().optional(),
        buildingId: z.string().uuid().optional(),
        unitId: z.string().uuid().optional(), // Added unit filtering
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const conditions = [eq(incomes.orgId, orgId)];

      if (input.year) {
        conditions.push(eq(incomes.year, input.year));
      }
      if (input.month) {
        conditions.push(eq(incomes.month, input.month));
      }
      if (input.buildingId) {
        conditions.push(eq(incomes.buildingId, input.buildingId));
      }
      if (input.unitId) {
        conditions.push(eq(incomes.unitId, input.unitId));
      }

      return await db
        .select()
        .from(incomes)
        .where(and(...conditions))
        .orderBy(desc(incomes.receivedDate));
    }),

  getById: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [income] = await db
        .select()
        .from(incomes)
        .where(and(eq(incomes.id, input.id), eq(incomes.orgId, orgId)))
        .limit(1);

      return income || null;
    }),
  update: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: createIncomeSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const { receivedDate, ...otherData } = input.data;

      const updateData = {
        ...otherData,
        ...(receivedDate && {
          receivedDate: new Date(receivedDate),
        }),
        updatedAt: new Date(),
      };

      const [updatedIncome] = await db
        .update(incomes)
        .set(updateData)
        .where(and(eq(incomes.id, input.id), eq(incomes.orgId, orgId)))
        .returning();

      return updatedIncome;
    }),

  delete: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [deletedIncome] = await db
        .delete(incomes)
        .where(and(eq(incomes.id, input.id), eq(incomes.orgId, orgId)))
        .returning();

      return deletedIncome;
    }),

  getTotalByPeriod: orgProtectedProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number().optional(),
        buildingId: z.string().uuid().optional(),
        unitId: z.string().uuid().optional(), // Added unit filtering
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const conditions = [
        eq(incomes.orgId, orgId),
        eq(incomes.year, input.year),
      ];

      if (input.month) {
        conditions.push(eq(incomes.month, input.month));
      }
      if (input.buildingId) {
        conditions.push(eq(incomes.buildingId, input.buildingId));
      }
      if (input.unitId) {
        conditions.push(eq(incomes.unitId, input.unitId));
      }

      const result = await db
        .select()
        .from(incomes)
        .where(and(...conditions));
      const total = result.reduce((sum, income) => sum + income.amount, 0);

      return { total, count: result.length };
    }),
});
