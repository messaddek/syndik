import { eq, desc, and, gte, lte } from 'drizzle-orm';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { incomes } from '../../incomes/schema';
import { expenses } from '../../expenses/schema';
import { ReportGenerationService } from '../services/report-generation.service';
import { reports } from '../schema';

export const reportsRouter = createTRPCRouter({
  // Get report statistics
  getStats: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, orgId } = ctx;

    const reportService = new ReportGenerationService(db);
    return await reportService.getReportStats(orgId);
  }),
  // Get recent reports
  getRecent: orgProtectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const reportService = new ReportGenerationService(db);
      return await reportService.getRecentReports(orgId, input.limit);
    }),
  // Generate report
  generate: orgProtectedProcedure
    .input(
      z.object({
        reportType: z.enum([
          'monthly-summary',
          'payment-status',
          'expense-breakdown',
          'property-performance',
          'yearly-comparison',
          'tax-report',
        ]),
        period: z.string(),
        buildingId: z.string().uuid().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId, userId } = ctx;
      const { reportType, period, buildingId } = input;

      // Debug: Log the TRPC call
      console.log('=== TRPC Report Generation Called ===');
      console.log('Report Type:', reportType);
      console.log('Period:', period);
      console.log('Building ID:', buildingId);
      console.log('Org ID:', orgId);
      console.log('User ID:', userId);

      // Parse period to get start and end dates
      const { startDate, endDate } = parsePeriod(period);

      console.log('Parsed dates:', { startDate, endDate });

      const reportService = new ReportGenerationService(db);

      try {
        const reportId = await reportService.generateReport({
          orgId,
          reportType,
          startDate,
          endDate,
          buildingId,
          generatedBy: userId,
        });

        // Get the generated report details
        const [report] = await db
          .select({
            id: reports.id,
            name: reports.name,
            fileName: reports.fileName,
            fileSize: reports.fileSize,
            downloadUrl: reports.downloadUrl,
          })
          .from(reports)
          .where(eq(reports.id, reportId))
          .limit(1);

        if (!report) {
          throw new Error('Report not found after generation');
        }

        return {
          success: true,
          reportId: report.id,
          downloadUrl: report.downloadUrl || '',
          fileName: report.fileName || '',
          size: report.fileSize ? formatFileSize(report.fileSize) : '0 MB',
        };
      } catch (error) {
        console.error('Report generation failed:', error);
        throw new Error('Failed to generate report');
      }
    }),

  // Get financial data for reports (actual implementation)
  getFinancialData: orgProtectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        buildingId: z.string().uuid().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const { startDate, endDate, buildingId } = input;

      // Base conditions
      const incomeConditions = [
        eq(incomes.orgId, orgId),
        gte(incomes.receivedDate, startDate),
        lte(incomes.receivedDate, endDate),
      ];

      const expenseConditions = [
        eq(expenses.orgId, orgId),
        gte(expenses.paidDate, startDate),
        lte(expenses.paidDate, endDate),
      ];

      if (buildingId) {
        incomeConditions.push(eq(incomes.buildingId, buildingId));
        expenseConditions.push(eq(expenses.buildingId, buildingId));
      }

      // Get incomes
      const incomesData = await db
        .select()
        .from(incomes)
        .where(and(...incomeConditions))
        .orderBy(desc(incomes.receivedDate));

      // Get expenses
      const expensesData = await db
        .select()
        .from(expenses)
        .where(and(...expenseConditions))
        .orderBy(desc(expenses.paidDate));

      return {
        incomes: incomesData,
        expenses: expensesData,
        summary: {
          totalIncome: incomesData.reduce(
            (sum, income) => sum + Number(income.amount),
            0
          ),
          totalExpenses: expensesData.reduce(
            (sum, expense) => sum + Number(expense.amount),
            0
          ),
          netIncome:
            incomesData.reduce(
              (sum, income) => sum + Number(income.amount),
              0
            ) -
            expensesData.reduce(
              (sum, expense) => sum + Number(expense.amount),
              0
            ),
        },
      };
    }),

  // Delete all reports
  deleteAll: orgProtectedProcedure.mutation(async ({ ctx }) => {
    const { db, orgId } = ctx;

    // Delete all reports for the organization
    const deletedReports = await db
      .delete(reports)
      .where(eq(reports.orgId, orgId))
      .returning({ id: reports.id });

    return {
      success: true,
      deletedCount: deletedReports.length,
    };
  }),

  // Check if a report is empty (only contains headers)
  checkReportData: orgProtectedProcedure
    .input(z.object({ reportId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const { reportId } = input;

      // Get the report
      const [report] = await db
        .select()
        .from(reports)
        .where(and(eq(reports.id, reportId), eq(reports.orgId, orgId)))
        .limit(1);

      if (!report) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Report not found',
        });
      }

      const reportData = report.reportData as Record<string, unknown> | null;
      const metadata = reportData?._metadata as
        | Record<string, unknown>
        | undefined;

      return {
        reportId: report.id,
        reportName: report.name,
        hasRealData: metadata?.hasRealData ?? true,
        isEmpty: metadata?.isEmpty ?? false,
        fileSize: report.fileSize || 0,
        status: report.status,
        suggestedAction: metadata?.isEmpty
          ? 'This report appears to contain only headers. Try a different date range or verify your financial data.'
          : null,
      };
    }),

  // Debug procedure to check data availability
  debugDataAvailability: orgProtectedProcedure
    .input(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
        buildingId: z.string().uuid().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const { startDate, endDate, buildingId } = input;

      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check income data
      const incomeQuery = db
        .select()
        .from(incomes)
        .where(
          and(
            eq(incomes.orgId, orgId),
            gte(incomes.receivedDate, start),
            lte(incomes.receivedDate, end),
            buildingId ? eq(incomes.buildingId, buildingId) : undefined
          )
        );

      // Check expense data
      const expenseQuery = db
        .select()
        .from(expenses)
        .where(
          and(
            eq(expenses.orgId, orgId),
            gte(expenses.paidDate, start),
            lte(expenses.paidDate, end),
            buildingId ? eq(expenses.buildingId, buildingId) : undefined
          )
        );

      const [incomeData, expenseData] = await Promise.all([
        incomeQuery,
        expenseQuery,
      ]);

      return {
        dateRange: { start: startDate, end: endDate },
        orgId,
        buildingId,
        incomeRecords: incomeData.length,
        expenseRecords: expenseData.length,
        sampleIncome: incomeData.slice(0, 2),
        sampleExpenses: expenseData.slice(0, 2),
        hasAnyData: incomeData.length > 0 || expenseData.length > 0,
      };
    }),
});

// Helper functions
function parsePeriod(period: string): { startDate: Date; endDate: Date } {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  switch (period) {
    case 'current-month':
      return {
        startDate: new Date(currentYear, currentMonth, 1),
        endDate: new Date(currentYear, currentMonth + 1, 0),
      };
    case 'last-month':
      return {
        startDate: new Date(currentYear, currentMonth - 1, 1),
        endDate: new Date(currentYear, currentMonth, 0),
      };
    case 'current-quarter':
      const quarterStart = Math.floor(currentMonth / 3) * 3;
      return {
        startDate: new Date(currentYear, quarterStart, 1),
        endDate: new Date(currentYear, quarterStart + 3, 0),
      };
    case 'current-year':
      return {
        startDate: new Date(currentYear, 0, 1),
        endDate: new Date(currentYear, 11, 31),
      };
    case 'last-year':
      return {
        startDate: new Date(currentYear - 1, 0, 1),
        endDate: new Date(currentYear - 1, 11, 31),
      };
    default:
      // Default to current month if unknown period
      return {
        startDate: new Date(currentYear, currentMonth, 1),
        endDate: new Date(currentYear, currentMonth + 1, 0),
      };
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
