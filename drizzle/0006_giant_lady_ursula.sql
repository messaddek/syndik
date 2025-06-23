CREATE TYPE "public"."report_format" AS ENUM('pdf', 'excel', 'csv');--> statement-breakpoint
CREATE TYPE "public"."report_status" AS ENUM('generating', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."report_type" AS ENUM('monthly-summary', 'payment-status', 'expense-breakdown', 'property-performance', 'yearly-comparison', 'tax-report');--> statement-breakpoint
CREATE TABLE "report_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "report_type" NOT NULL,
	"description" text,
	"config" jsonb,
	"is_default" integer DEFAULT 0,
	"is_active" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" text NOT NULL,
	"building_id" uuid,
	"type" "report_type" NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"status" "report_status" DEFAULT 'generating' NOT NULL,
	"format" "report_format" DEFAULT 'pdf' NOT NULL,
	"parameters" jsonb,
	"file_name" varchar(255),
	"file_size" integer,
	"download_url" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"expires_at" timestamp,
	"generated_by" text,
	"download_count" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE set null ON UPDATE no action;