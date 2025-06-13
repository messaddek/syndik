import { pgTable, uuid, text, numeric, integer, timestamp, foreignKey, boolean, date, unique, jsonb, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const incomes = pgTable("incomes", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orgId: text("org_id").notNull(),
	buildingId: uuid("building_id"),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	description: text().notNull(),
	category: text().notNull(),
	month: integer().notNull(),
	year: integer().notNull(),
	receivedDate: timestamp("received_date", { mode: 'string' }).notNull(),
	notes: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	unitId: uuid("unit_id"),
});

export const expenses = pgTable("expenses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orgId: text("org_id").notNull(),
	buildingId: uuid("building_id"),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	description: text().notNull(),
	category: text().notNull(),
	vendor: text(),
	month: integer().notNull(),
	year: integer().notNull(),
	paidDate: timestamp("paid_date", { mode: 'string' }).notNull(),
	receiptUrl: text("receipt_url"),
	notes: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const userPreferences = pgTable("user_preferences", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	orgId: text("org_id").notNull(),
	notifications: text(),
	privacy: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const buildings = pgTable("buildings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orgId: text("org_id").notNull(),
	name: text().notNull(),
	address: text().notNull(),
	city: text().notNull(),
	postalCode: text("postal_code").notNull(),
	country: text().default('Morocco').notNull(),
	totalUnits: integer("total_units").default(0).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const units = pgTable("units", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	buildingId: uuid("building_id").notNull(),
	orgId: text("org_id").notNull(),
	unitNumber: text("unit_number").notNull(),
	floor: integer().notNull(),
	area: numeric({ precision: 10, scale:  2 }),
	bedrooms: integer().default(1).notNull(),
	bathrooms: integer().default(1).notNull(),
	monthlyFee: numeric("monthly_fee", { precision: 10, scale:  2 }).notNull(),
	isOccupied: boolean("is_occupied").default(false).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.buildingId],
			foreignColumns: [buildings.id],
			name: "units_building_id_buildings_id_fk"
		}).onDelete("cascade"),
]);

export const residents = pgTable("residents", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	unitId: uuid("unit_id"),
	orgId: text("org_id").notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	email: text().notNull(),
	phone: text(),
	isOwner: boolean("is_owner").default(false).notNull(),
	moveInDate: date("move_in_date").notNull(),
	moveOutDate: date("move_out_date"),
	isActive: boolean("is_active").default(true).notNull(),
	emergencyContact: text("emergency_contact"),
	emergencyPhone: text("emergency_phone"),
	notes: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.unitId],
			foreignColumns: [units.id],
			name: "residents_unit_id_units_id_fk"
		}).onDelete("cascade"),
]);

export const meetings = pgTable("meetings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orgId: text("org_id").notNull(),
	buildingId: uuid("building_id"),
	title: text().notNull(),
	description: text(),
	scheduledDate: timestamp("scheduled_date", { mode: 'string' }).notNull(),
	location: text(),
	agenda: text(),
	minutes: text(),
	isCompleted: boolean("is_completed").default(false).notNull(),
	maxParticipants: text("max_participants"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const meetingParticipants = pgTable("meeting_participants", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	meetingId: uuid("meeting_id").notNull(),
	residentId: uuid("resident_id"),
	name: text().notNull(),
	attended: boolean().default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.meetingId],
			foreignColumns: [meetings.id],
			name: "meeting_participants_meeting_id_meetings_id_fk"
		}).onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	orgId: text("org_id").notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phone: text(),
	isActive: boolean("is_active").default(true).notNull(),
	residentId: uuid("resident_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_user_id_unique").on(table.userId),
]);

export const accounts = pgTable("accounts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	orgId: text("org_id").notNull(),
	name: text().notNull(),
	email: text().notNull(),
	role: text().default('manager').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	organizationName: text("organization_name"),
	organizationSlug: text("organization_slug"),
});

export const announcements = pgTable("announcements", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orgId: text("org_id").notNull(),
	buildingId: uuid("building_id"),
	title: text().notNull(),
	content: text().notNull(),
	priority: text().default('normal').notNull(),
	isPublished: boolean("is_published").default(true).notNull(),
	publishedAt: timestamp("published_at", { mode: 'string' }).defaultNow().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }),
	authorId: text("author_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const notificationPreferences = pgTable("notification_preferences", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	orgId: text("org_id").notNull(),
	emailNotifications: boolean("email_notifications").default(true).notNull(),
	pushNotifications: boolean("push_notifications").default(true).notNull(),
	smsNotifications: boolean("sms_notifications").default(false).notNull(),
	categoryPreferences: jsonb("category_preferences"),
	quietHours: jsonb("quiet_hours"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orgId: text("org_id").notNull(),
	userId: text("user_id"),
	residentId: uuid("resident_id"),
	type: text().notNull(),
	title: text().notNull(),
	message: text().notNull(),
	priority: text().default('normal').notNull(),
	category: text().default('general').notNull(),
	isRead: boolean("is_read").default(false).notNull(),
	isArchived: boolean("is_archived").default(false).notNull(),
	metadata: jsonb(),
	actionUrl: text("action_url"),
	expiresAt: timestamp("expires_at", { mode: 'string' }),
	readAt: timestamp("read_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const articleRatings = pgTable("article_ratings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	articleSlug: text("article_slug").notNull(),
	userId: text("user_id"),
	orgId: text("org_id"),
	rating: integer().notNull(),
	comment: text(),
	isHelpful: boolean("is_helpful"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("article_ratings_rating_idx").using("btree", table.rating.asc().nullsLast().op("int4_ops")),
	index("article_ratings_slug_idx").using("btree", table.articleSlug.asc().nullsLast().op("text_ops")),
	index("article_ratings_unique_user_article").using("btree", table.userId.asc().nullsLast().op("text_ops"), table.articleSlug.asc().nullsLast().op("text_ops")),
	index("article_ratings_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
]);

export const articleViews = pgTable("article_views", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	articleSlug: text("article_slug").notNull(),
	userId: text("user_id"),
	orgId: text("org_id"),
	sessionId: text("session_id"),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	referrer: text(),
	duration: integer(),
	readPercentage: integer("read_percentage"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("article_views_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
	index("article_views_session_idx").using("btree", table.sessionId.asc().nullsLast().op("text_ops")),
	index("article_views_slug_idx").using("btree", table.articleSlug.asc().nullsLast().op("text_ops")),
	index("article_views_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
]);

export const articleComments = pgTable("article_comments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	articleSlug: text("article_slug").notNull(),
	userId: text("user_id").notNull(),
	userName: text("user_name").notNull(),
	userImage: text("user_image"),
	orgId: text("org_id"),
	content: text().notNull(),
	parentId: uuid("parent_id"),
	isEdited: boolean("is_edited").default(false).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	likesCount: integer("likes_count").default(0).notNull(),
	repliesCount: integer("replies_count").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("article_comments_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
	index("article_comments_parent_id_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	index("article_comments_parent_ref").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	index("article_comments_slug_idx").using("btree", table.articleSlug.asc().nullsLast().op("text_ops")),
	index("article_comments_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
]);

export const articleCommentLikes = pgTable("article_comment_likes", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	commentId: uuid("comment_id").notNull(),
	userId: text("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("article_comment_likes_comment_id_idx").using("btree", table.commentId.asc().nullsLast().op("uuid_ops")),
	index("article_comment_likes_unique_user_comment").using("btree", table.userId.asc().nullsLast().op("text_ops"), table.commentId.asc().nullsLast().op("uuid_ops")),
	index("article_comment_likes_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.commentId],
			foreignColumns: [articleComments.id],
			name: "article_comment_likes_comment_id_article_comments_id_fk"
		}).onDelete("cascade"),
]);
