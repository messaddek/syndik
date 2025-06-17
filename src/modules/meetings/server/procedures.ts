import { eq, and, desc, gte } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import {
  meetings,
  meetingParticipants,
  createMeetingSchema,
  createParticipantSchema,
} from '../schema';

export const meetingsRouter = createTRPCRouter({
  create: orgProtectedProcedure
    .input(createMeetingSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [newMeeting] = await db
        .insert(meetings)
        .values({
          orgId,
          ...input,
          scheduledDate: new Date(input.scheduledDate),
        })
        .returning();

      return newMeeting;
    }),

  getAll: orgProtectedProcedure
    .input(
      z.object({
        buildingId: z
          .string()
          .uuid()
          .optional()
          .or(z.literal(''))
          .transform(val => (val === '' ? undefined : val)),
        upcoming: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const conditions = [eq(meetings.orgId, orgId)];

      if (input.buildingId) {
        conditions.push(eq(meetings.buildingId, input.buildingId));
      }
      if (input.upcoming) {
        conditions.push(gte(meetings.scheduledDate, new Date()));
      }

      return await db
        .select()
        .from(meetings)
        .where(and(...conditions))
        .orderBy(desc(meetings.scheduledDate));
    }),

  getById: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [meeting] = await db
        .select()
        .from(meetings)
        .where(and(eq(meetings.id, input.id), eq(meetings.orgId, orgId)))
        .limit(1);

      return meeting || null;
    }),
  update: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: createMeetingSchema.partial().extend({
          minutes: z.string().optional(),
          isCompleted: z.boolean().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const { scheduledDate, ...otherData } = input.data;

      const updateData = {
        ...otherData,
        ...(scheduledDate && {
          scheduledDate: new Date(scheduledDate),
        }),
        updatedAt: new Date(),
      };

      const [updatedMeeting] = await db
        .update(meetings)
        .set(updateData)
        .where(and(eq(meetings.id, input.id), eq(meetings.orgId, orgId)))
        .returning();

      return updatedMeeting;
    }),

  delete: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [deletedMeeting] = await db
        .delete(meetings)
        .where(and(eq(meetings.id, input.id), eq(meetings.orgId, orgId)))
        .returning();

      return deletedMeeting;
    }),

  // Participants management
  addParticipant: orgProtectedProcedure
    .input(createParticipantSchema)
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [newParticipant] = await db
        .insert(meetingParticipants)
        .values(input)
        .returning();

      return newParticipant;
    }),

  getParticipants: orgProtectedProcedure
    .input(z.object({ meetingId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      return await db
        .select()
        .from(meetingParticipants)
        .where(eq(meetingParticipants.meetingId, input.meetingId));
    }),

  markAttendance: orgProtectedProcedure
    .input(
      z.object({
        participantId: z.string().uuid(),
        attended: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [updatedParticipant] = await db
        .update(meetingParticipants)
        .set({ attended: input.attended })
        .where(eq(meetingParticipants.id, input.participantId))
        .returning();

      return updatedParticipant;
    }),
});
