CREATE TABLE "article_comment_likes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"comment_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "article_comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_slug" text NOT NULL,
	"user_id" text NOT NULL,
	"user_name" text NOT NULL,
	"user_image" text,
	"org_id" text,
	"content" text NOT NULL,
	"parent_id" uuid,
	"is_edited" boolean DEFAULT false NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"likes_count" integer DEFAULT 0 NOT NULL,
	"replies_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "article_ratings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_slug" text NOT NULL,
	"user_id" text,
	"org_id" text,
	"rating" integer NOT NULL,
	"comment" text,
	"is_helpful" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "article_views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_slug" text NOT NULL,
	"user_id" text,
	"org_id" text,
	"session_id" text,
	"ip_address" text,
	"user_agent" text,
	"referrer" text,
	"duration" integer,
	"read_percentage" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "article_comment_likes" ADD CONSTRAINT "article_comment_likes_comment_id_article_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."article_comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "article_comment_likes_comment_id_idx" ON "article_comment_likes" USING btree ("comment_id");--> statement-breakpoint
CREATE INDEX "article_comment_likes_user_id_idx" ON "article_comment_likes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "article_comment_likes_unique_user_comment" ON "article_comment_likes" USING btree ("user_id","comment_id");--> statement-breakpoint
CREATE INDEX "article_comments_slug_idx" ON "article_comments" USING btree ("article_slug");--> statement-breakpoint
CREATE INDEX "article_comments_user_id_idx" ON "article_comments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "article_comments_parent_id_idx" ON "article_comments" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "article_comments_created_at_idx" ON "article_comments" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "article_comments_parent_ref" ON "article_comments" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "article_ratings_slug_idx" ON "article_ratings" USING btree ("article_slug");--> statement-breakpoint
CREATE INDEX "article_ratings_user_id_idx" ON "article_ratings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "article_ratings_rating_idx" ON "article_ratings" USING btree ("rating");--> statement-breakpoint
CREATE INDEX "article_ratings_unique_user_article" ON "article_ratings" USING btree ("user_id","article_slug");--> statement-breakpoint
CREATE INDEX "article_views_slug_idx" ON "article_views" USING btree ("article_slug");--> statement-breakpoint
CREATE INDEX "article_views_user_id_idx" ON "article_views" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "article_views_session_idx" ON "article_views" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "article_views_created_at_idx" ON "article_views" USING btree ("created_at");