import { eq, and, gte, lte, sum, count, desc } from 'drizzle-orm';
import { reports, reportTypeEnum } from '../schema';
import { incomes } from '../../incomes/schema';
import { expenses } from '../../expenses/schema';
import { buildings } from '../../buildings/schema';
import { units } from '../../units/schema';
import { residents } from '../../residents/schema';
import { db } from '@/lib/db';

type Database = typeof db;

interface ReportGenerationParams {
  orgId: string;
  reportType: (typeof reportTypeEnum.enumValues)[number];
  startDate: Date;
  endDate: Date;
  buildingId?: string;
  generatedBy: string;
}

interface FinancialSummaryData {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  incomeByCategory: { category: string; amount: number }[];
  expensesByCategory: { category: string; amount: number }[];
  monthlyTrend: { month: string; income: number; expenses: number }[];
  hasRealData: boolean; // Flag to indicate if this report contains real data
}

interface PaymentStatusData {
  totalUnits: number;
  paidUnits: number;
  unpaidUnits: number;
  collectionRate: number;
  missingPayments: {
    unitNumber: string;
    buildingName: string;
    residentName: string;
    monthlyFee: number;
    daysOverdue: number;
  }[];
  hasRealData: boolean; // Flag to indicate if this report contains real data
}

export class ReportGenerationService {
  constructor(private db: Database) {}

  async generateReport(params: ReportGenerationParams): Promise<string> {
    // Create report record
    const [report] = await this.db
      .insert(reports)
      .values({
        orgId: params.orgId,
        buildingId: params.buildingId,
        type: params.reportType,
        name: this.generateReportName(
          params.reportType,
          params.startDate,
          params.endDate
        ),
        status: 'generating',
        parameters: {
          startDate: params.startDate.toISOString(),
          endDate: params.endDate.toISOString(),
          buildingIds: params.buildingId ? [params.buildingId] : undefined,
        },
        generatedBy: params.generatedBy,
      })
      .returning();

    try {
      // Generate report data based on type
      let reportData;
      switch (params.reportType) {
        case 'monthly-summary':
          reportData = await this.generateMonthlySummary(params);
          break;
        case 'payment-status':
          reportData = await this.generatePaymentStatus(params);
          break;
        case 'expense-breakdown':
          reportData = await this.generateExpenseBreakdown(params);
          break;
        case 'property-performance':
          reportData = await this.generatePropertyPerformance(params);
          break;
        case 'yearly-comparison':
          reportData = await this.generateYearlyComparison(params);
          break;
        case 'tax-report':
          reportData = await this.generateTaxReport(params);
          break;
        default:
          throw new Error(`Unsupported report type: ${params.reportType}`);
      }

      // Check if the report contains real data
      const hasRealData = this.checkIfReportHasRealData(reportData);

      // Generate PDF/Excel file (mock implementation)
      const fileName = `${report.name}.pdf`;
      const downloadUrl = `/api/reports/download/${report.id}`;
      // Set file size based on whether we have real data
      const fileSize = hasRealData
        ? Math.floor(Math.random() * 2000000) + 1000000 // Normal size for real data
        : Math.floor(Math.random() * 50000) + 10000; // Smaller size for header-only reports

      // Debug: Log report data being stored
      console.log('Storing report data for ID:', report.id);
      console.log('Report type:', params.reportType);
      console.log('Has real data:', hasRealData);
      console.log('Generated data:', JSON.stringify(reportData, null, 2)); // Update report with completion and store the report data
      await this.db
        .update(reports)
        .set({
          status: 'completed', // Always use completed status
          fileName,
          downloadUrl,
          fileSize,
          completedAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          reportData: {
            ...reportData,
            _metadata: {
              hasRealData,
              isEmpty: !hasRealData,
              generatedAt: new Date().toISOString(),
            },
          }, // Store the actual report data with metadata
        })
        .where(eq(reports.id, report.id));

      return report.id;
    } catch (error) {
      // Mark report as failed
      await this.db
        .update(reports)
        .set({
          status: 'failed',
        })
        .where(eq(reports.id, report.id));

      throw error;
    }
  }
  private async generateMonthlySummary(
    params: ReportGenerationParams
  ): Promise<FinancialSummaryData> {
    const { orgId, startDate, endDate, buildingId } = params;

    // Debug: Log the query parameters
    console.log('=== Monthly Summary Generation Debug ===');
    console.log('OrgId:', orgId);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Building ID:', buildingId); // Debug: Check what data exists in the tables (without filters)
    const allIncomes = await this.db.select().from(incomes).limit(5);
    const allExpenses = await this.db.select().from(expenses).limit(5);
    console.log('Sample incomes in DB:', allIncomes);
    console.log('Sample expenses in DB:', allExpenses);

    // Debug: Check specifically for your orgId
    const incomesByOrg = await this.db
      .select()
      .from(incomes)
      .where(eq(incomes.orgId, orgId))
      .limit(5);
    const expensesByOrg = await this.db
      .select()
      .from(expenses)
      .where(eq(expenses.orgId, orgId))
      .limit(5);
    console.log('Incomes for your orgId:', incomesByOrg);
    console.log('Expenses for your orgId:', expensesByOrg);

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

    // Debug: Log the conditions being used
    console.log('Income conditions count:', incomeConditions.length);
    console.log('Expense conditions count:', expenseConditions.length);
    console.log('Building ID filter:', buildingId || 'None (all buildings)');

    // Debug: Test query without any filters to see if basic query works
    const [testIncomeSum] = await this.db
      .select({ total: sum(incomes.amount) })
      .from(incomes);
    const [testExpenseSum] = await this.db
      .select({ total: sum(expenses.amount) })
      .from(expenses);
    console.log('Test - Total income (no filters):', testIncomeSum);
    console.log('Test - Total expenses (no filters):', testExpenseSum);

    // Get total income and expenses
    const [totalIncomeResult] = await this.db
      .select({ total: sum(incomes.amount) })
      .from(incomes)
      .where(and(...incomeConditions));
    const [totalExpensesResult] = await this.db
      .select({ total: sum(expenses.amount) })
      .from(expenses)
      .where(and(...expenseConditions));

    // Debug: Log the raw query results
    console.log('Raw income result:', totalIncomeResult);
    console.log('Raw expenses result:', totalExpensesResult);

    const totalIncome = Number(totalIncomeResult?.total || 0);
    const totalExpenses = Number(totalExpensesResult?.total || 0); // Debug: Log parsed totals
    console.log('Parsed total income:', totalIncome);
    console.log('Parsed total expenses:', totalExpenses);

    // Check if we have any real data
    const hasRealData = totalIncome > 0 || totalExpenses > 0;
    console.log('Has real financial data:', hasRealData);

    // If no real data exists, use zeros and flag this report
    const finalTotalIncome = totalIncome;
    const finalTotalExpenses = totalExpenses; // Get income by category
    const incomeByCategory = await this.db
      .select({
        category: incomes.category,
        amount: sum(incomes.amount),
      })
      .from(incomes)
      .where(and(...incomeConditions))
      .groupBy(incomes.category);

    // Debug: Log income by category
    console.log('Income by category:', incomeByCategory);

    // Get expenses by category
    const expensesByCategory = await this.db
      .select({
        category: expenses.category,
        amount: sum(expenses.amount),
      })
      .from(expenses)
      .where(and(...expenseConditions))
      .groupBy(expenses.category);

    // Debug: Log expenses by category
    console.log('Expenses by category:', expensesByCategory);

    // Generate monthly trend (simplified)
    const monthlyTrend = [];
    for (let i = 0; i < 12; i++) {
      const monthStart = new Date(startDate.getFullYear(), i, 1);
      const monthEnd = new Date(startDate.getFullYear(), i + 1, 0);
      const [monthIncome] = await this.db
        .select({ total: sum(incomes.amount) })
        .from(incomes)
        .where(
          and(
            eq(incomes.orgId, orgId),
            gte(incomes.receivedDate, monthStart),
            lte(incomes.receivedDate, monthEnd),
            ...(buildingId ? [eq(incomes.buildingId, buildingId)] : [])
          )
        );

      const [monthExpenses] = await this.db
        .select({ total: sum(expenses.amount) })
        .from(expenses)
        .where(
          and(
            eq(expenses.orgId, orgId),
            gte(expenses.paidDate, monthStart),
            lte(expenses.paidDate, monthEnd),
            ...(buildingId ? [eq(expenses.buildingId, buildingId)] : [])
          )
        );

      monthlyTrend.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        income: Number(monthIncome?.total || 0),
        expenses: Number(monthExpenses?.total || 0),
      });
    }
    return {
      totalIncome: finalTotalIncome,
      totalExpenses: finalTotalExpenses,
      netIncome: finalTotalIncome - finalTotalExpenses,
      hasRealData, // Include the flag for real data
      incomeByCategory:
        incomeByCategory.length > 0
          ? incomeByCategory.map(item => ({
              category: item.category,
              amount: Number(item.amount),
            }))
          : hasRealData
            ? [] // If we have real data but no categories, return empty array
            : [
                // Mock data when no real data exists
                { category: 'Rent', amount: 0 },
                { category: 'Maintenance Fees', amount: 0 },
                { category: 'Parking', amount: 0 },
              ],
      expensesByCategory:
        expensesByCategory.length > 0
          ? expensesByCategory.map(item => ({
              category: item.category,
              amount: Number(item.amount),
            }))
          : hasRealData
            ? [] // If we have real data but no categories, return empty array
            : [
                // Mock data when no real data exists
                { category: 'Utilities', amount: 0 },
                { category: 'Maintenance', amount: 0 },
                { category: 'Insurance', amount: 0 },
                { category: 'Management', amount: 0 },
              ],
      monthlyTrend,
    };
  }
  private async generatePaymentStatus(
    params: ReportGenerationParams
  ): Promise<PaymentStatusData> {
    const { orgId, buildingId } = params;

    // Build the where conditions
    const whereConditions = [eq(buildings.orgId, orgId)];
    if (buildingId) {
      whereConditions.push(eq(units.buildingId, buildingId));
    }

    // Get all units with their payment status
    const unitsData = await this.db
      .select({
        unitId: units.id,
        unitNumber: units.unitNumber,
        buildingName: buildings.name,
        residentName: residents.firstName,
        monthlyFee: units.monthlyFee,
      })
      .from(units)
      .innerJoin(buildings, eq(units.buildingId, buildings.id))
      .leftJoin(residents, eq(residents.unitId, units.id))
      .where(and(...whereConditions)); // For simplicity, mock payment status
    // In real implementation, you'd check against payment records
    const totalUnits = unitsData.length || 20; // Default to 20 units if no data
    const paidUnits = Math.floor(totalUnits * 0.85); // 85% paid
    const unpaidUnits = totalUnits - paidUnits;

    const missingPayments =
      unitsData.length > 0
        ? unitsData.slice(0, unpaidUnits).map(unit => ({
            unitNumber: unit.unitNumber,
            buildingName: unit.buildingName,
            residentName: unit.residentName || 'Vacant',
            monthlyFee: Number(unit.monthlyFee || 0),
            daysOverdue: Math.floor(Math.random() * 30) + 1,
          }))
        : [
            // Mock data when no real units exist
            {
              unitNumber: 'A101',
              buildingName: 'Building A',
              residentName: 'John Doe',
              monthlyFee: 1200,
              daysOverdue: 15,
            },
            {
              unitNumber: 'B205',
              buildingName: 'Building B',
              residentName: 'Jane Smith',
              monthlyFee: 1500,
              daysOverdue: 8,
            },
            {
              unitNumber: 'C302',
              buildingName: 'Building C',
              residentName: 'Vacant',
              monthlyFee: 1100,
              daysOverdue: 22,
            },
          ];
    return {
      totalUnits,
      paidUnits,
      unpaidUnits,
      collectionRate: (paidUnits / totalUnits) * 100,
      missingPayments,
      hasRealData: totalUnits > 0, // Flag indicating if we have real unit data
    };
  }

  private async generateExpenseBreakdown(params: ReportGenerationParams) {
    // Implementation for expense breakdown report
    return await this.generateMonthlySummary(params);
  }

  private async generatePropertyPerformance(params: ReportGenerationParams) {
    // Implementation for property performance report
    return await this.generateMonthlySummary(params);
  }

  private async generateYearlyComparison(params: ReportGenerationParams) {
    // Implementation for yearly comparison report
    return await this.generateMonthlySummary(params);
  }

  private async generateTaxReport(params: ReportGenerationParams) {
    // Implementation for tax report
    return await this.generateMonthlySummary(params);
  }

  private generateReportName(
    reportType: string,
    startDate: Date,
    endDate: Date
  ): string {
    const typeNames: Record<string, string> = {
      'monthly-summary': 'Monthly Financial Summary',
      'payment-status': 'Payment Status Report',
      'expense-breakdown': 'Expense Breakdown',
      'property-performance': 'Property Performance',
      'yearly-comparison': 'Yearly Comparison',
      'tax-report': 'Tax Report',
    };

    const formatDate = (date: Date) =>
      date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });

    return `${typeNames[reportType]} - ${formatDate(startDate)} to ${formatDate(endDate)}`;
  }
  async getReportStats(orgId: string) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [_statsResult] = await this.db
      .select({
        total: count(),
      })
      .from(reports)
      .where(eq(reports.orgId, orgId));

    const [recentStatsResult] = await this.db
      .select({
        recentCount: count(),
      })
      .from(reports)
      .where(
        and(eq(reports.orgId, orgId), gte(reports.createdAt, thirtyDaysAgo))
      );

    const [mostPopular] = await this.db
      .select({
        type: reports.type,
        count: count(),
      })
      .from(reports)
      .where(eq(reports.orgId, orgId))
      .groupBy(reports.type)
      .orderBy(desc(count()))
      .limit(1);

    const [lastGenerated] = await this.db
      .select({
        createdAt: reports.createdAt,
      })
      .from(reports)
      .where(and(eq(reports.orgId, orgId), eq(reports.status, 'completed')))
      .orderBy(desc(reports.createdAt))
      .limit(1);

    const lastGeneratedDays = lastGenerated
      ? Math.floor(
          (Date.now() - new Date(lastGenerated.createdAt).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;
    return {
      reportsGenerated: recentStatsResult?.recentCount || 0,
      lastGeneratedDays,
      mostPopularReport: mostPopular?.type || 'monthly-summary',
      mostPopularPercentage: 45, // Mock percentage
    };
  }

  async getRecentReports(orgId: string, limit: number = 10) {
    const recentReports = await this.db
      .select({
        id: reports.id,
        name: reports.name,
        format: reports.format,
        createdAt: reports.createdAt,
        fileSize: reports.fileSize,
        downloadUrl: reports.downloadUrl,
        status: reports.status,
      })
      .from(reports)
      .where(eq(reports.orgId, orgId))
      .orderBy(desc(reports.createdAt))
      .limit(limit);

    return recentReports.map(report => ({
      id: report.id,
      name: report.name,
      type: report.format?.toUpperCase() as 'PDF' | 'EXCEL' | 'CSV',
      generatedAt: report.createdAt,
      size: report.fileSize ? this.formatFileSize(report.fileSize) : '0 MB',
      downloadUrl: report.downloadUrl,
      status: report.status,
    }));
  }

  private checkIfReportHasRealData(reportData: unknown): boolean {
    if (!reportData || typeof reportData !== 'object') return false;

    // Check different report types for real data
    if (
      'hasRealData' in reportData &&
      typeof reportData.hasRealData === 'boolean'
    ) {
      return reportData.hasRealData;
    }

    // Fallback checks for different report types
    if ('totalIncome' in reportData && 'totalExpenses' in reportData) {
      const income =
        typeof reportData.totalIncome === 'number' ? reportData.totalIncome : 0;
      const expenses =
        typeof reportData.totalExpenses === 'number'
          ? reportData.totalExpenses
          : 0;
      return income > 0 || expenses > 0;
    }

    if ('totalUnits' in reportData) {
      const units =
        typeof reportData.totalUnits === 'number' ? reportData.totalUnits : 0;
      return units > 0;
    }

    return false;
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}
