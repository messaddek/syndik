import { relations } from "drizzle-orm/relations";
import { buildings, units, residents, meetings, meetingParticipants, articleComments, articleCommentLikes } from "./schema";

export const unitsRelations = relations(units, ({one, many}) => ({
	building: one(buildings, {
		fields: [units.buildingId],
		references: [buildings.id]
	}),
	residents: many(residents),
}));

export const buildingsRelations = relations(buildings, ({many}) => ({
	units: many(units),
}));

export const residentsRelations = relations(residents, ({one}) => ({
	unit: one(units, {
		fields: [residents.unitId],
		references: [units.id]
	}),
}));

export const meetingParticipantsRelations = relations(meetingParticipants, ({one}) => ({
	meeting: one(meetings, {
		fields: [meetingParticipants.meetingId],
		references: [meetings.id]
	}),
}));

export const meetingsRelations = relations(meetings, ({many}) => ({
	meetingParticipants: many(meetingParticipants),
}));

export const articleCommentLikesRelations = relations(articleCommentLikes, ({one}) => ({
	articleComment: one(articleComments, {
		fields: [articleCommentLikes.commentId],
		references: [articleComments.id]
	}),
}));

export const articleCommentsRelations = relations(articleComments, ({many}) => ({
	articleCommentLikes: many(articleCommentLikes),
}));