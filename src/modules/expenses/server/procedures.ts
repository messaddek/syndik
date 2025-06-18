import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { expenses, createExpenseSchema, updateExpenseSchema } from '../schema';

export const expensesRouter = createTRPCRouter({
  create: orgProtectedProcedure
    .input(createExpenseSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const [newExpense] = await db
        .insert(expenses)
        .values({
          orgId,
          ...input,
          amount: input.amount,
          paidDate: new Date(input.paidDate),
        })
        .returning();

      return newExpense;
    }),

  getAll: orgProtectedProcedure
    .input(
      z.object({
        year: z.number().optional(),
        month: z.number().optional(),
        buildingId: z
          .string()
          .uuid()
          .optional()
          .or(z.literal(''))
          .transform(val => (val === '' ? undefined : val)),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const conditions = [eq(expenses.orgId, orgId)];

      if (input.year) {
        conditions.push(eq(expenses.year, input.year));
      }
      if (input.month) {
        conditions.push(eq(expenses.month, input.month));
      }
      if (input.buildingId) {
        conditions.push(eq(expenses.buildingId, input.buildingId));
      }

      return await db
        .select()
        .from(expenses)
        .where(and(...conditions))
        .orderBy(desc(expenses.paidDate));
    }),

  getById: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [expense] = await db
        .select()
        .from(expenses)
        .where(and(eq(expenses.id, input.id), eq(expenses.orgId, orgId)))
        .limit(1);

      return expense || null;
    }),
  update: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateExpenseSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      // Extract paidDate for separate handling
      const { paidDate, ...otherData } = input.data;

      // Prepare update object with type-safe fields
      const updateObj = {
        updatedAt: new Date(),
        ...otherData,
        ...(paidDate && { paidDate: new Date(paidDate) }),
      };

      const [updatedExpense] = await db
        .update(expenses)
        .set(updateObj)
        .where(and(eq(expenses.id, input.id), eq(expenses.orgId, orgId)))
        .returning();

      return updatedExpense;
    }),

  delete: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [deletedExpense] = await db
        .delete(expenses)
        .where(and(eq(expenses.id, input.id), eq(expenses.orgId, orgId)))
        .returning();

      return deletedExpense;
    }),

  getTotalByPeriod: orgProtectedProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number().optional(),
        buildingId: z
          .string()
          .uuid()
          .optional()
          .or(z.literal(''))
          .transform(val => (val === '' ? undefined : val)),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const conditions = [
        eq(expenses.orgId, orgId),
        eq(expenses.year, input.year),
      ];

      if (input.month) {
        conditions.push(eq(expenses.month, input.month));
      }
      if (input.buildingId) {
        conditions.push(eq(expenses.buildingId, input.buildingId));
      }

      const result = await db
        .select()
        .from(expenses)
        .where(and(...conditions));
      const total = result.reduce((sum, expense) => sum + expense.amount, 0);

      return { total, count: result.length };
    }),
});
