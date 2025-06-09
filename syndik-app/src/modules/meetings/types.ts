import { z } from 'zod';
import {
  meetings,
  meetingParticipants,
  createMeetingSchema,
  createParticipantSchema,
} from './schema';

// Use Drizzle's table inference for database types
export type Meeting = typeof meetings.$inferSelect;
export type InsertMeeting = typeof meetings.$inferInsert;

export type MeetingParticipant = typeof meetingParticipants.$inferSelect;
export type InsertMeetingParticipant = typeof meetingParticipants.$inferInsert;

// Use Zod inference for form/validation types
export type CreateMeeting = z.infer<typeof createMeetingSchema>;
export type CreateParticipant = z.infer<typeof createParticipantSchema>;
