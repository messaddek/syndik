-- Migration to add B2B support to helpdesk system
-- Add B2B fields to helpdesk_tickets table

-- Add B2B flag and related fields
ALTER TABLE helpdesk_tickets ADD COLUMN is_b2b BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE helpdesk_tickets ADD COLUMN ticket_type TEXT NOT NULL DEFAULT 'internal';
ALTER TABLE helpdesk_tickets ADD COLUMN syndicate_info JSONB;
ALTER TABLE helpdesk_tickets ADD COLUMN urgency_level TEXT;
ALTER TABLE helpdesk_tickets ADD COLUMN business_impact TEXT;
ALTER TABLE helpdesk_tickets ADD COLUMN affected_users INTEGER;

-- Add indexes for B2B functionality
CREATE INDEX helpdesk_tickets_is_b2b_idx ON helpdesk_tickets USING btree
(is_b2b);
CREATE INDEX helpdesk_tickets_ticket_type_idx ON helpdesk_tickets USING btree
(ticket_type);
CREATE INDEX helpdesk_tickets_urgency_level_idx ON helpdesk_tickets USING btree
(urgency_level);

-- Add constraints
ALTER TABLE helpdesk_tickets ADD CONSTRAINT check_ticket_type 
  CHECK (ticket_type IN ('internal', 'b2b'));

ALTER TABLE helpdesk_tickets ADD CONSTRAINT check_urgency_level 
  CHECK (urgency_level IS NULL OR urgency_level IN ('low', 'medium', 'high', 'critical'));

-- Add constraint to ensure B2B tickets have required fields
ALTER TABLE helpdesk_tickets ADD CONSTRAINT check_b2b_requirements 
  CHECK (
    (is_b2b = false) OR 
    (is_b2b = true AND urgency_level IS NOT NULL AND business_impact IS NOT NULL AND affected_users IS NOT NULL AND syndicate_info IS NOT NULL)
  );
