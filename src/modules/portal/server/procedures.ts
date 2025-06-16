import { eq, and, gte, or, isNull, count } from 'drizzle-orm';
import {
  createTRPCRouter,
  protectedProcedure,
  orgProtectedProcedure,
} from '@/trpc/init';
import { accounts, users } from '@/modules/accounts/schema';
import { residents } from '@/modules/residents/schema';
import { units } from '@/modules/units/schema';
import { buildings } from '@/modules/buildings/schema';
import { meetings } from '@/modules/meetings/schema';
import { announcements } from '@/modules/announcements/schema';
import { notifications } from '@/modules/notifications/schema';
import { residentSetupSchema, residentProfileUpdateSchema } from '../schema';
import { TRPCError } from '@trpc/server';
import { clerkClient } from '@clerk/nextjs/server';
import { z } from 'zod';

export const portalRouter = createTRPCRouter({
  // Setup resident account (member role)
  setupResidentAccount: protectedProcedure
    .input(residentSetupSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      if (!orgId) {
        throw new Error('Organization is required');
      }

      // Check if account already exists
      const existingAccount = await db
        .select()
        .from(accounts)
        .where(and(eq(accounts.userId, userId), eq(accounts.orgId, orgId)))
        .limit(1);

      let account;
      if (existingAccount.length === 0) {
        // Create new account with member role
        [account] = await db
          .insert(accounts)
          .values({
            userId,
            orgId,
            name: input.name,
            email: input.email,
            role: 'member',
          })
          .returning();
      } else {
        account = existingAccount[0];
      }

      // Check if resident record exists for this unit
      const existingResident = await db
        .select()
        .from(residents)
        .where(
          and(
            eq(residents.unitId, input.unitId),
            eq(residents.email, input.email),
            eq(residents.orgId, orgId)
          )
        )
        .limit(1);

      if (existingResident.length === 0) {
        throw new Error(
          'No resident record found for this unit and email. Please contact building management.'
        );
      }

      const resident = existingResident[0];

      // Create or update user record
      const existingUser = await db
        .select()
        .from(users)
        .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
        .limit(1);

      let user;
      if (existingUser.length === 0) {
        [user] = await db
          .insert(users)
          .values({
            userId,
            orgId,
            name: input.name,
            email: input.email,
            phone: input.phone || null,
            residentId: resident.id,
          })
          .returning();
      } else {
        [user] = await db
          .update(users)
          .set({
            name: input.name,
            phone: input.phone || null,
            residentId: resident.id,
            updatedAt: new Date(),
          })
          .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
          .returning();
      }

      return { account, user, resident };
    }), // Get current resident's info
  getCurrentResident: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    console.log('🏠 getCurrentResident - UserId:', userId, 'OrgId:', orgId);

    // Get user record
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
      .limit(1);

    console.log('🏠 getCurrentResident - User record:', user);

    if (!user || !user.residentId) {
      throw new Error('Resident not found');
    }

    // Get resident info with unit and building details
    const residentInfo = await db
      .select({
        resident: residents,
        unit: units,
        building: buildings,
      })
      .from(residents)
      .leftJoin(units, eq(residents.unitId, units.id))
      .leftJoin(buildings, eq(units.buildingId, buildings.id))
      .where(and(eq(residents.id, user.residentId), eq(residents.orgId, orgId)))
      .limit(1);

    console.log('🏠 getCurrentResident - Resident info:', residentInfo);

    if (residentInfo.length === 0) {
      throw new Error('Resident information not found');
    }

    const result = {
      user,
      ...residentInfo[0],
    };

    console.log('🏠 getCurrentResident - Final result:', result);

    return result;
  }),
  // Update profile
  updateProfile: orgProtectedProcedure
    .input(residentProfileUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      const [updatedUser] = await db
        .update(users)
        .set({
          name: input.name,
          phone: input.phone,
          updatedAt: new Date(),
        })
        .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
        .returning();

      return updatedUser;
    }),
  // Get available units for setup
  getAvailableUnits: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, orgId } = ctx;

    const availableUnits = await db
      .select({
        unit: units,
        building: buildings,
      })
      .from(units)
      .leftJoin(buildings, eq(units.buildingId, buildings.id))
      .where(eq(units.orgId, orgId));

    return availableUnits;
  }), // Get dashboard data for resident
  getDashboardData: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    // Get user and resident info
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
      .limit(1);

    if (!user || !user.residentId) {
      throw new Error('Resident not found');
    }

    // Get unit monthly fee for next payment calculation
    const residentInfo = await db
      .select({
        resident: residents,
        unit: units,
      })
      .from(residents)
      .leftJoin(units, eq(residents.unitId, units.id))
      .where(eq(residents.id, user.residentId))
      .limit(1);

    const currentDate = new Date();
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    // Get upcoming meetings
    const upcomingMeetings = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.orgId, orgId),
          eq(meetings.isCompleted, false),
          gte(meetings.scheduledDate, currentDate)
        )
      )
      .orderBy(meetings.scheduledDate)
      .limit(1);

    // Get recent announcements count
    const recentAnnouncements = await db
      .select()
      .from(announcements)
      .where(
        and(
          eq(announcements.orgId, orgId),
          eq(announcements.isPublished, true),
          or(
            isNull(announcements.expiresAt),
            gte(announcements.expiresAt, currentDate)
          ),
          gte(
            announcements.publishedAt,
            new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
          ) // Last 7 days
        )
      );

    // Calculate next payment info
    const monthlyFee = residentInfo[0]?.unit?.monthlyFee || 0;

    return {
      nextPayment: {
        amount: monthlyFee,
        dueDate: nextMonth,
      },
      upcomingMeeting: upcomingMeetings[0] || null,
      announcementsCount: recentAnnouncements.length,
      residentStatus: {
        isActive: residentInfo[0]?.resident?.isActive || false,
        isOwner: residentInfo[0]?.resident?.isOwner || false,
      },
    };
  }),

  // Get resident profile for the current user (enhanced version for linking)
  getResidentProfile: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    // Get user with resident link
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
      .limit(1);

    if (!user?.residentId) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'User is not linked to a resident record',
      });
    }

    // Get full resident profile with unit/building info
    const [residentProfile] = await db
      .select({
        resident: residents,
        unit: units,
        building: buildings,
      })
      .from(residents)
      .leftJoin(units, eq(residents.unitId, units.id))
      .leftJoin(buildings, eq(units.buildingId, buildings.id))
      .where(eq(residents.id, user.residentId))
      .limit(1);

    if (!residentProfile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Resident profile not found',
      });
    }

    return residentProfile;
  }),
  // Check if current user has resident access (with auto-linking)
  hasResidentAccess: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    console.log(
      `🔐 Checking resident access for user ${userId} in org ${orgId}`
    );

    // First, check if user is already linked
    const [existingUser] = await db
      .select()
      .from(users)
      .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
      .limit(1);

    if (existingUser?.residentId) {
      console.log(
        `✅ User already linked to resident ${existingUser.residentId}`
      );
      return {
        hasAccess: true,
        residentId: existingUser.residentId,
        autoLinked: false,
        message: 'Already linked',
      };
    }

    // If not linked, attempt auto-linking by email
    console.log(`🔗 Attempting auto-link for user ${userId}`);

    try {
      // Get user's email from Clerk
      const clerk = await clerkClient();
      const clerkUser = await clerk.users.getUser(userId);
      const userEmail = clerkUser.emailAddresses?.[0]?.emailAddress;

      if (!userEmail) {
        console.log(`❌ No email found for user ${userId}`);
        return {
          hasAccess: false,
          residentId: null,
          autoLinked: false,
          message: 'No email address found',
          error: 'NO_EMAIL',
        };
      }

      console.log(`📧 User email: ${userEmail}`);

      // Find matching resident by email
      const [matchingResident] = await db
        .select()
        .from(residents)
        .where(
          and(
            eq(residents.email, userEmail),
            eq(residents.orgId, orgId),
            eq(residents.isActive, true)
          )
        )
        .limit(1);

      if (!matchingResident) {
        console.log(`❌ No matching resident found for email ${userEmail}`);
        return {
          hasAccess: false,
          residentId: null,
          autoLinked: false,
          message: `No resident record found for email: ${userEmail}`,
          userEmail,
          error: 'NO_RESIDENT_MATCH',
        };
      }

      console.log(
        `👤 Found matching resident: ${matchingResident.firstName} ${matchingResident.lastName} (${matchingResident.id})`
      ); // Create or update user record with resident link
      if (existingUser) {
        // Update existing user record
        await db
          .update(users)
          .set({
            residentId: matchingResident.id,
            name: `${matchingResident.firstName} ${matchingResident.lastName}`,
            email: matchingResident.email,
            phone: matchingResident.phone,
            updatedAt: new Date(),
          })
          .where(eq(users.userId, userId));
      } else {
        // Create new user record
        await db.insert(users).values({
          userId: userId,
          orgId: orgId,
          name: `${matchingResident.firstName} ${matchingResident.lastName}`,
          email: matchingResident.email,
          phone: matchingResident.phone,
          residentId: matchingResident.id,
        });
      }

      console.log(
        `✅ Successfully auto-linked user to resident ${matchingResident.id}`
      );

      return {
        hasAccess: true,
        residentId: matchingResident.id,
        autoLinked: true,
        message: `Successfully linked to ${matchingResident.firstName} ${matchingResident.lastName}`,
        residentName: `${matchingResident.firstName} ${matchingResident.lastName}`,
      };
    } catch (error) {
      console.error(`❌ Auto-linking failed for user ${userId}:`, error);
      return {
        hasAccess: false,
        residentId: null,
        autoLinked: false,
        message: 'Auto-linking failed',
        error: 'AUTO_LINK_FAILED',
      };
    }
  }),

  // Update resident profile (limited fields)
  updateResidentProfile: orgProtectedProcedure
    .input(
      z.object({
        phone: z.string().optional().nullable(),
        emergencyContact: z.string().optional().nullable(),
        emergencyPhone: z.string().optional().nullable(),
        notes: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      // Get user with resident link
      const [user] = await db
        .select()
        .from(users)
        .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
        .limit(1);

      if (!user?.residentId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'User is not linked to a resident record',
        });
      }

      // Update resident record
      const [updatedResident] = await db
        .update(residents)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(residents.id, user.residentId))
        .returning();

      return updatedResident;
    }),

  // Get resident dashboard data
  getResidentDashboard: protectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    if (!orgId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Organization access required',
      });
    }

    // Get resident info linked to user
    const user = await db
      .select({
        resident: residents,
        unit: units,
        building: buildings,
      })
      .from(users)
      .leftJoin(residents, eq(users.residentId, residents.id))
      .leftJoin(units, eq(residents.unitId, units.id))
      .leftJoin(buildings, eq(units.buildingId, buildings.id))
      .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
      .limit(1);

    if (!user.length || !user[0].resident) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Resident profile not found',
      });
    }

    const residentData = user[0];

    // Get recent announcements
    const recentAnnouncements = await db
      .select()
      .from(announcements)
      .where(
        and(
          eq(announcements.orgId, orgId),
          eq(announcements.isPublished, true),
          or(
            isNull(announcements.buildingId),
            residentData.unit?.buildingId
              ? eq(announcements.buildingId, residentData.unit.buildingId)
              : isNull(announcements.buildingId)
          )
        )
      )
      .orderBy(announcements.publishedAt)
      .limit(5);

    // Get upcoming meetings
    const upcomingMeetings = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.orgId, orgId),
          gte(meetings.scheduledDate, new Date()),
          or(
            isNull(meetings.buildingId),
            residentData.unit?.buildingId
              ? eq(meetings.buildingId, residentData.unit.buildingId)
              : isNull(meetings.buildingId)
          )
        )
      )
      .orderBy(meetings.scheduledDate)
      .limit(3);

    return {
      resident: residentData.resident,
      unit: residentData.unit,
      building: residentData.building,
      announcements: recentAnnouncements,
      upcomingMeetings: upcomingMeetings,
    };
  }),

  // Submit maintenance request
  submitMaintenanceRequest: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
        category: z.string().min(1),
        location: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      if (!orgId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Organization access required',
        });
      }

      // Get resident info
      const user = await db
        .select({
          resident: residents,
          unit: units,
          building: buildings,
        })
        .from(users)
        .leftJoin(residents, eq(users.residentId, residents.id))
        .leftJoin(units, eq(residents.unitId, units.id))
        .leftJoin(buildings, eq(units.buildingId, buildings.id))
        .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
        .limit(1);

      if (!user.length || !user[0].resident) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Resident profile not found',
        });
      }

      // Create notification for maintenance request
      const [notification] = await db
        .insert(notifications)
        .values({
          orgId,
          residentId: user[0].resident.id,
          type: 'maintenance_request',
          title: `New Maintenance Request: ${input.title}`,
          message: `${input.description} - Priority: ${input.priority}`,
          priority: input.priority,
          category: 'maintenance',
          metadata: {
            requestType: 'maintenance',
            unitId: user[0].unit?.id,
            buildingId: user[0].building?.id,
            location: input.location,
            category: input.category,
          },
        })
        .returning();

      return {
        success: true,
        notificationId: notification.id,
        message: 'Maintenance request submitted successfully',
      };
    }),

  // Get resident notifications
  getResidentNotifications: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(50).default(20),
        isRead: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;
      const { page, pageSize, isRead } = input;

      if (!orgId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Organization access required',
        });
      }

      // Get resident ID
      const user = await db
        .select({ residentId: users.residentId })
        .from(users)
        .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
        .limit(1);

      if (!user.length || !user[0].residentId) {
        return { notifications: [], total: 0 };
      }

      const conditions = [
        eq(notifications.orgId, orgId),
        or(
          eq(notifications.userId, userId),
          eq(notifications.residentId, user[0].residentId)
        ),
      ];

      if (isRead !== undefined) {
        conditions.push(eq(notifications.isRead, isRead));
      }

      const offset = (page - 1) * pageSize;

      const [notificationsList, [{ total }]] = await Promise.all([
        db
          .select()
          .from(notifications)
          .where(and(...conditions))
          .orderBy(notifications.createdAt)
          .limit(pageSize)
          .offset(offset),
        db
          .select({ total: count() })
          .from(notifications)
          .where(and(...conditions)),
      ]);

      return {
        notifications: notificationsList,
        total: total || 0,
      };
    }),
});
