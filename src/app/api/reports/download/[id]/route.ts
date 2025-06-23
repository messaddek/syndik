import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { reports } from '@/modules/reports/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { orgId } = await auth();

    if (!orgId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id: reportId } = await params;

    const [report] = await db
      .select()
      .from(reports)
      .where(and(eq(reports.id, reportId), eq(reports.orgId, orgId)))
      .limit(1);

    if (!report) {
      return new NextResponse('Report not found', { status: 404 });
    }

    if (report.status !== 'completed') {
      return new NextResponse('Report not ready for download', { status: 400 });
    }

    const reportData = report.reportData || {};
    const metadata = (reportData as Record<string, unknown>)?._metadata as
      | Record<string, unknown>
      | undefined;

    const hasRealDataFromMetadata = metadata?.hasRealData !== false;
    const hasRealDataFromRoot =
      (reportData as Record<string, unknown>)?.hasRealData === true;
    const hasRealData = hasRealDataFromMetadata || hasRealDataFromRoot;

    console.log('Report Data:', {
      reportId,
      reportData,
      hasRealData,
      metadata,
    });

    const pdfContent = generatePDFWithData(
      report.name,
      report.type,
      reportData as FinancialSummaryData | PaymentStatusData,
      hasRealData
    );

    await db
      .update(reports)
      .set({
        downloadCount: sql`COALESCE(${reports.downloadCount}, 0) + 1`,
      })
      .where(eq(reports.id, reportId));

    return new NextResponse(pdfContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${report.fileName || 'report.pdf'}"`,
        'Cache-Control': 'private, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error downloading report:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Updated generatePDFWithData()
function generatePDFWithData(
  reportName: string,
  reportType: string,
  reportData: FinancialSummaryData | PaymentStatusData,
  hasRealData: boolean = true
): Buffer {
  let contentText = `BT
  /F1 16 Tf
  100 750 Td
  (${reportName}) Tj
  /F1 12 Tf
  100 720 Td
  (Generated on: ${new Date().toLocaleDateString()}) Tj
  `;

  const safeLine = (y: number, text: string) => `100 ${y} Td (${text}) Tj\n`;
  let y = 700;

  if (!hasRealData) {
    contentText += [
      safeLine(y, '*** NO DATA AVAILABLE ***'),
      safeLine(
        (y -= 20),
        'This report contains only headers as no financial data was found.'
      ),
      safeLine(
        (y -= 20),
        'Please check date range, filters, and data availability.'
      ),
    ].join('');
  } else if (reportType === 'monthly-summary') {
    const data = reportData as FinancialSummaryData;
    contentText += [
      safeLine(y, `Total Income: $${data.totalIncome?.toFixed(2) || '0.00'}`),
      safeLine(
        (y -= 20),
        `Total Expenses: $${data.totalExpenses?.toFixed(2) || '0.00'}`
      ),
      safeLine(
        (y -= 20),
        `Net Income: $${data.netIncome?.toFixed(2) || '0.00'}`
      ),
      safeLine((y -= 30), 'Income Categories:'),
    ].join('');
    if (Array.isArray(data.incomeByCategory)) {
      for (const category of data.incomeByCategory) {
        if (y < 100) break;
        contentText += `120 ${(y -= 20)} Td (${category.category}: $${category.amount?.toFixed(2) || '0.00'}) Tj\n`;
      }
    }
    contentText += safeLine((y -= 30), 'Expense Categories:');
    if (Array.isArray(data.expensesByCategory)) {
      for (const category of data.expensesByCategory) {
        if (y < 100) break;
        contentText += `120 ${(y -= 20)} Td (${category.category}: $${category.amount?.toFixed(2) || '0.00'}) Tj\n`;
      }
    }
  } else if (reportType === 'payment-status') {
    const data = reportData as PaymentStatusData;
    contentText += [
      safeLine(y, `Total Units: ${data.totalUnits}`),
      safeLine((y -= 20), `Paid Units: ${data.paidUnits}`),
      safeLine((y -= 20), `Unpaid Units: ${data.unpaidUnits}`),
      safeLine(
        (y -= 20),
        `Collection Rate: ${data.collectionRate.toFixed(2)}%`
      ),
      safeLine((y -= 30), 'Missing Payments:'),
    ].join('');
    for (const mp of data.missingPayments) {
      if (y < 100) break;
      contentText += `120 ${(y -= 20)} Td (${mp.unitNumber} - ${mp.buildingName} - ${mp.residentName}: $${mp.monthlyFee.toFixed(2)}, ${mp.daysOverdue} days overdue) Tj\n`;
    }
  } else {
    const fallbackKeys = Object.keys(reportData).filter(
      k => k !== 'hasRealData'
    );
    contentText += [
      safeLine(y, 'No specific renderer for this report type.'),
      safeLine((y -= 20), `Type: ${reportType}`),
      safeLine((y -= 20), `Data Keys: ${fallbackKeys.join(', ')}`),
    ].join('');
  }

  contentText += 'ET';

  const contentLength = Buffer.byteLength(contentText, 'utf8');
  const pdfContent = `%PDF-1.4
  1 0 obj
  << /Type /Catalog /Pages 2 0 R >>
  endobj
  2 0 obj
  << /Type /Pages /Kids [3 0 R] /Count 1 >>
  endobj
  3 0 obj
  << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
  endobj
  4 0 obj
  << /Length ${contentLength} >>
  stream
  ${contentText}
  endstream
  endobj
  xref
  0 5
  0000000000 65535 f 
  0000000009 00000 n 
  0000000058 00000 n 
  0000000115 00000 n 
  0000000208 00000 n 
  trailer
  << /Size 5 /Root 1 0 R >>
  startxref
  ${300 + contentLength}
  %%EOF`;

  return Buffer.from(pdfContent);
}

// Add this interface at the top or next to your report types if needed
type FinancialSummaryData = {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  incomeByCategory: { category: string; amount: number }[];
  expensesByCategory: { category: string; amount: number }[];
  hasRealData: boolean;
};

type PaymentStatusData = {
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
  hasRealData: boolean;
};
