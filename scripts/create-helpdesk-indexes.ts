import { db } from '../src/lib/db';
import { sql } from 'drizzle-orm';

async function createIndexes() {
  console.log('Creating performance indexes for helpdesk tables...');

  try {
    // Index for org_id queries (most common filter)
    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_tickets_org_id_idx" ON "helpdesk_tickets" ("org_id")`
    );
    console.log('✓ Created org_id index');

    // Index for status queries
    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_tickets_status_idx" ON "helpdesk_tickets" ("status")`
    );
    console.log('✓ Created status index');

    // Index for priority queries
    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_tickets_priority_idx" ON "helpdesk_tickets" ("priority")`
    );
    console.log('✓ Created priority index');

    // Index for category queries
    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_tickets_category_idx" ON "helpdesk_tickets" ("category")`
    );
    console.log('✓ Created category index');

    // Index for building_id queries
    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_tickets_building_id_idx" ON "helpdesk_tickets" ("building_id")`
    );
    console.log('✓ Created building_id index');

    // Composite index for common query patterns (org_id + created_at for sorting)
    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_tickets_org_created_idx" ON "helpdesk_tickets" ("org_id", "created_at" DESC)`
    );
    console.log('✓ Created org_id + created_at composite index');

    // Composite index for org_id + status (for status filtering)
    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_tickets_org_status_idx" ON "helpdesk_tickets" ("org_id", "status")`
    );
    console.log('✓ Created org_id + status composite index');

    // Index for comments table
    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_comments_ticket_id_idx" ON "helpdesk_comments" ("ticket_id")`
    );
    console.log('✓ Created comments ticket_id index');

    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_comments_org_id_idx" ON "helpdesk_comments" ("org_id")`
    );
    console.log('✓ Created comments org_id index');

    // Index for categories table
    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_categories_org_id_idx" ON "helpdesk_categories" ("org_id")`
    );
    console.log('✓ Created categories org_id index');

    await db.execute(
      sql`CREATE INDEX IF NOT EXISTS "helpdesk_categories_active_idx" ON "helpdesk_categories" ("is_active")`
    );
    console.log('✓ Created categories is_active index');

    console.log('🎉 All indexes created successfully!');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
  }
}

createIndexes();
