-- Add indexes for helpdesk tables to improve query performance

-- Index for org_id queries (most common filter)
CREATE INDEX
IF NOT EXISTS "helpdesk_tickets_org_id_idx" ON "helpdesk_tickets"
("org_id");

-- Index for status queries
CREATE INDEX
IF NOT EXISTS "helpdesk_tickets_status_idx" ON "helpdesk_tickets"
("status");

-- Index for priority queries
CREATE INDEX
IF NOT EXISTS "helpdesk_tickets_priority_idx" ON "helpdesk_tickets"
("priority");

-- Index for category queries
CREATE INDEX
IF NOT EXISTS "helpdesk_tickets_category_idx" ON "helpdesk_tickets"
("category");

-- Index for building_id queries
CREATE INDEX
IF NOT EXISTS "helpdesk_tickets_building_id_idx" ON "helpdesk_tickets"
("building_id");

-- Composite index for common query patterns (org_id + created_at for sorting)
CREATE INDEX
IF NOT EXISTS "helpdesk_tickets_org_created_idx" ON "helpdesk_tickets"
("org_id", "created_at" DESC);

-- Composite index for org_id + status (for status filtering)
CREATE INDEX
IF NOT EXISTS "helpdesk_tickets_org_status_idx" ON "helpdesk_tickets"
("org_id", "status");

-- Index for comments table
CREATE INDEX
IF NOT EXISTS "helpdesk_comments_ticket_id_idx" ON "helpdesk_comments"
("ticket_id");
CREATE INDEX
IF NOT EXISTS "helpdesk_comments_org_id_idx" ON "helpdesk_comments"
("org_id");

-- Index for categories table
CREATE INDEX
IF NOT EXISTS "helpdesk_categories_org_id_idx" ON "helpdesk_categories"
("org_id");
CREATE INDEX
IF NOT EXISTS "helpdesk_categories_active_idx" ON "helpdesk_categories"
("is_active");
