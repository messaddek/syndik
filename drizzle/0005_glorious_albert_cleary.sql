ALTER TABLE "helpdesk_tickets" ADD COLUMN "is_b2b" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "helpdesk_tickets" ADD COLUMN "ticket_type" text DEFAULT 'internal' NOT NULL;--> statement-breakpoint
ALTER TABLE "helpdesk_tickets" ADD COLUMN "syndicate_info" jsonb;--> statement-breakpoint
ALTER TABLE "helpdesk_tickets" ADD COLUMN "urgency_level" text;--> statement-breakpoint
ALTER TABLE "helpdesk_tickets" ADD COLUMN "business_impact" text;--> statement-breakpoint
ALTER TABLE "helpdesk_tickets" ADD COLUMN "affected_users" integer;--> statement-breakpoint
CREATE INDEX "helpdesk_tickets_is_b2b_idx" ON "helpdesk_tickets" USING btree ("is_b2b" bool_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_tickets_ticket_type_idx" ON "helpdesk_tickets" USING btree ("ticket_type" text_ops);