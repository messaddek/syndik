CREATE TABLE "helpdesk_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"color" text,
	"icon" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"default_priority" text DEFAULT 'medium' NOT NULL,
	"default_assignee" text,
	"auto_response_template" text,
	"estimated_response_time" integer,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "helpdesk_comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ticket_id" uuid NOT NULL,
	"author_id" text NOT NULL,
	"content" text NOT NULL,
	"is_internal" boolean DEFAULT false NOT NULL,
	"attachments" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "helpdesk_knowledge_base" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"category_id" uuid,
	"tags" jsonb,
	"is_published" boolean DEFAULT false NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"votes" integer DEFAULT 0 NOT NULL,
	"author_id" text NOT NULL,
	"last_edited_by" text,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "helpdesk_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" text NOT NULL,
	"name" text NOT NULL,
	"subject" text NOT NULL,
	"content" text NOT NULL,
	"type" text NOT NULL,
	"category_id" uuid,
	"is_active" boolean DEFAULT true NOT NULL,
	"variables" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "helpdesk_tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" text NOT NULL,
	"building_id" uuid,
	"unit_id" uuid,
	"resident_id" uuid,
	"author_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"priority" text DEFAULT 'medium' NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"assigned_to" text,
	"tags" jsonb,
	"attachments" jsonb,
	"estimated_resolution" timestamp,
	"resolved_at" timestamp,
	"closed_at" timestamp,
	"last_response_at" timestamp,
	"response_time" integer,
	"resolution_time" integer,
	"customer_satisfaction" integer,
	"internal_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "helpdesk_comments" ADD CONSTRAINT "helpdesk_comments_ticket_id_helpdesk_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."helpdesk_tickets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "helpdesk_knowledge_base" ADD CONSTRAINT "helpdesk_kb_category_id_helpdesk_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."helpdesk_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "helpdesk_templates" ADD CONSTRAINT "helpdesk_templates_category_id_helpdesk_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."helpdesk_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "helpdesk_tickets" ADD CONSTRAINT "helpdesk_tickets_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "helpdesk_tickets" ADD CONSTRAINT "helpdesk_tickets_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "helpdesk_tickets" ADD CONSTRAINT "helpdesk_tickets_resident_id_residents_id_fk" FOREIGN KEY ("resident_id") REFERENCES "public"."residents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "helpdesk_categories_org_id_idx" ON "helpdesk_categories" USING btree ("org_id" text_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_categories_sort_order_idx" ON "helpdesk_categories" USING btree ("sort_order" int4_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_comments_ticket_id_idx" ON "helpdesk_comments" USING btree ("ticket_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_comments_created_at_idx" ON "helpdesk_comments" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_kb_published_idx" ON "helpdesk_knowledge_base" USING btree ("is_published" bool_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_kb_category_idx" ON "helpdesk_knowledge_base" USING btree ("category_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_kb_org_id_idx" ON "helpdesk_knowledge_base" USING btree ("org_id" text_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_templates_type_idx" ON "helpdesk_templates" USING btree ("type" text_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_templates_category_idx" ON "helpdesk_templates" USING btree ("category_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_tickets_status_idx" ON "helpdesk_tickets" USING btree ("status" text_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_tickets_priority_idx" ON "helpdesk_tickets" USING btree ("priority" text_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_tickets_category_idx" ON "helpdesk_tickets" USING btree ("category" text_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_tickets_assigned_to_idx" ON "helpdesk_tickets" USING btree ("assigned_to" text_ops);--> statement-breakpoint
CREATE INDEX "helpdesk_tickets_created_at_idx" ON "helpdesk_tickets" USING btree ("created_at" timestamp_ops);