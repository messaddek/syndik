import { eq, and, gte, lte, sum, count, desc } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { incomes } from '../../incomes/schema';
import { expenses } from '../../expenses/schema';

export const financesRouter = createTRPCRouter({
  // Financial Summary for Dashboard
  getFinancialSummary: orgProtectedProcedure
    .input(
      z.object({
        buildingId: z
          .string()
          .uuid()
          .optional()
          .or(z.literal(''))
          .transform(val => (val === '' ? undefined : val)),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        _period: z.enum(['monthly', 'quarterly', 'yearly']).default('monthly'),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const { buildingId, startDate, endDate } = input;

      // Base conditions
      const incomeConditions = [eq(incomes.orgId, orgId)];
      const expenseConditions = [eq(expenses.orgId, orgId)];

      if (buildingId) {
        incomeConditions.push(eq(incomes.buildingId, buildingId));
        expenseConditions.push(eq(expenses.buildingId, buildingId));
      }

      if (startDate) {
        incomeConditions.push(gte(incomes.receivedDate, startDate));
        expenseConditions.push(gte(expenses.paidDate, startDate));
      }

      if (endDate) {
        incomeConditions.push(lte(incomes.receivedDate, endDate));
        expenseConditions.push(lte(expenses.paidDate, endDate));
      }

      // Get total income
      const [totalIncomeResult] = await db
        .select({ total: sum(incomes.amount) })
        .from(incomes)
        .where(and(...incomeConditions));

      // Get total expenses
      const [totalExpenseResult] = await db
        .select({ total: sum(expenses.amount) })
        .from(expenses)
        .where(and(...expenseConditions));

      const totalIncome = Number(totalIncomeResult?.total) || 0;
      const totalExpenses = Number(totalExpenseResult?.total) || 0;
      const netIncome = totalIncome - totalExpenses;

      // Get income by category
      const incomeByCategory = await db
        .select({
          category: incomes.category,
          total: sum(incomes.amount),
          count: count(),
        })
        .from(incomes)
        .where(and(...incomeConditions))
        .groupBy(incomes.category);

      // Get expenses by category
      const expensesByCategory = await db
        .select({
          category: expenses.category,
          total: sum(expenses.amount),
          count: count(),
        })
        .from(expenses)
        .where(and(...expenseConditions))
        .groupBy(expenses.category);

      return {
        summary: {
          totalIncome,
          totalExpenses,
          netIncome,
          profitMargin: totalIncome > 0 ? (netIncome / totalIncome) * 100 : 0,
        },
        incomeByCategory: incomeByCategory.map(item => ({
          category: item.category,
          total: Number(item.total) || 0,
          count: item.count,
        })),
        expensesByCategory: expensesByCategory.map(item => ({
          category: item.category,
          total: Number(item.total) || 0,
          count: item.count,
        })),
      };
    }),
  // Monthly Financial Trends
  getFinancialTrends: orgProtectedProcedure
    .input(
      z.object({
        buildingId: z
          .string()
          .uuid()
          .optional()
          .or(z.literal(''))
          .transform(val => (val === '' ? undefined : val)),
        months: z.number().min(1).max(24).default(12),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const { buildingId, months } = input;

      const baseConditions = [eq(incomes.orgId, orgId)];
      if (buildingId) {
        baseConditions.push(eq(incomes.buildingId, buildingId));
      }

      // Get monthly income trends
      const monthlyIncomes = await db
        .select({
          month: incomes.month,
          year: incomes.year,
          total: sum(incomes.amount),
        })
        .from(incomes)
        .where(and(...baseConditions))
        .groupBy(incomes.year, incomes.month)
        .orderBy(desc(incomes.year), desc(incomes.month))
        .limit(months);

      // Get monthly expense trends
      const expenseConditions = [eq(expenses.orgId, orgId)];
      if (buildingId) {
        expenseConditions.push(eq(expenses.buildingId, buildingId));
      }

      const monthlyExpenses = await db
        .select({
          month: expenses.month,
          year: expenses.year,
          total: sum(expenses.amount),
        })
        .from(expenses)
        .where(and(...expenseConditions))
        .groupBy(expenses.year, expenses.month)
        .orderBy(desc(expenses.year), desc(expenses.month))
        .limit(months);

      return {
        monthlyIncomes: monthlyIncomes.map(item => ({
          month: item.month,
          year: item.year,
          total: Number(item.total) || 0,
        })),
        monthlyExpenses: monthlyExpenses.map(item => ({
          month: item.month,
          year: item.year,
          total: Number(item.total) || 0,
        })),
      };
    }),
  // Financial Health Score
  getFinancialHealth: orgProtectedProcedure
    .input(
      z.object({
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
      const { buildingId } = input;

      // Get current year financial data
      const currentYear = new Date().getFullYear();

      const baseIncomeConditions = [
        eq(incomes.orgId, orgId),
        eq(incomes.year, currentYear),
      ];
      const baseExpenseConditions = [
        eq(expenses.orgId, orgId),
        eq(expenses.year, currentYear),
      ];

      if (buildingId) {
        baseIncomeConditions.push(eq(incomes.buildingId, buildingId));
        baseExpenseConditions.push(eq(expenses.buildingId, buildingId));
      }

      // Calculate metrics
      const [yearToDateIncome] = await db
        .select({ total: sum(incomes.amount) })
        .from(incomes)
        .where(and(...baseIncomeConditions));

      const [yearToDateExpenseResult] = await db
        .select({ total: sum(expenses.amount) })
        .from(expenses)
        .where(and(...baseExpenseConditions));

      const income = Number(yearToDateIncome?.total) || 0;
      const expenseTotal = Number(yearToDateExpenseResult?.total) || 0;
      const cashFlow = income - expenseTotal;
      const expenseRatio = income > 0 ? (expenseTotal / income) * 100 : 0;

      // Calculate health score (0-100)
      let healthScore = 100;

      // Penalize if expenses are too high relative to income
      if (expenseRatio > 80) healthScore -= 30;
      else if (expenseRatio > 60) healthScore -= 20;
      else if (expenseRatio > 40) healthScore -= 10;

      // Penalize negative cash flow
      if (cashFlow < 0) healthScore -= 40;

      // Ensure score is between 0-100
      healthScore = Math.max(0, Math.min(100, healthScore));

      return {
        healthScore,
        yearToDateIncome: income,
        yearToDateExpenses: expenseTotal,
        cashFlow,
        expenseRatio,
        status:
          healthScore >= 80
            ? 'excellent'
            : healthScore >= 60
              ? 'good'
              : healthScore >= 40
                ? 'fair'
                : 'poor',
      };
    }),
});
