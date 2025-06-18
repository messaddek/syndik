import { z } from 'zod';
import {
  createTRPCRouter,
  orgProtectedProcedure,
  protectedProcedure,
} from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import { db, withRetry } from '@/lib/db';
import {
  helpdeskTickets,
  helpdeskComments,
  helpdeskCategories,
  accounts,
  buildings,
} from '@/lib/schema';
import { createB2BTicketSchema, ticketFilterSchema } from '../schema';
import {
  and,
  eq,
  desc,
  asc,
  sql,
  count,
  avg,
  gte,
  lte,
  inArray,
  type SQL,
} from 'drizzle-orm';
import type { TicketAttachment } from '../types';

// Input schemas
const createTicketSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  category: z.enum([
    'maintenance',
    'complaint',
    'inquiry',
    'billing',
    'security',
    'parking',
    'noise',
    'cleaning',
    'other',
  ]),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  buildingId: z.string().uuid().optional(),
  unitId: z.string().uuid().optional(),
  residentId: z.string().uuid().optional(),
  tags: z.array(z.string()).default([]),
  attachments: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .default([]),
});

const updateTicketSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).optional(),
  category: z
    .enum([
      'maintenance',
      'complaint',
      'inquiry',
      'billing',
      'security',
      'parking',
      'noise',
      'cleaning',
      'other',
    ])
    .optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
  assignedTo: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  attachments: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .optional(),
  estimatedResolution: z.string().optional().nullable(),
  internalNotes: z.string().optional().nullable(),
  customerSatisfaction: z.number().min(1).max(5).optional().nullable(),
});

const addCommentSchema = z.object({
  ticketId: z.string().uuid(),
  content: z.string().min(1),
  isInternal: z.boolean().default(false),
  attachments: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .default([]),
});

const ticketFiltersSchema = z.object({
  status: z
    .array(z.enum(['open', 'in_progress', 'resolved', 'closed']))
    .optional(),
  priority: z.array(z.enum(['low', 'medium', 'high', 'urgent'])).optional(),
  category: z
    .array(
      z.enum([
        'maintenance',
        'complaint',
        'inquiry',
        'billing',
        'security',
        'parking',
        'noise',
        'cleaning',
        'other',
      ])
    )
    .optional(),
  assignedTo: z.array(z.string()).optional(),
  buildingId: z.string().uuid().optional(),
  unitId: z.string().uuid().optional(),
  dateRange: z
    .object({
      from: z.string(),
      to: z.string(),
    })
    .optional(),
});

const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export const helpdeskRouter = createTRPCRouter({
  // Get tickets with filters and pagination
  getTickets: orgProtectedProcedure
    .input(
      z.object({
        filters: ticketFiltersSchema.optional(),
        pagination: paginationSchema.optional(),
        sortBy: z
          .enum(['createdAt', 'updatedAt', 'priority', 'status'])
          .default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      })
    )
    .query(async ({ ctx, input }) => {
      const startTime = Date.now();

      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[HELPDESK] getTickets - Starting query', {
          orgId: ctx.orgId,
          input,
          timestamp: new Date().toISOString(),
        });
      }

      const { orgId } = ctx;
      const {
        filters = {},
        pagination = { page: 1, limit: 20 },
        sortBy,
        sortOrder,
      } = input;

      const offset = (pagination.page - 1) * pagination.limit;

      // Build where conditions
      const whereConditions = [eq(helpdeskTickets.orgId, orgId)];

      if (filters.status?.length) {
        whereConditions.push(inArray(helpdeskTickets.status, filters.status));
      }

      if (filters.priority?.length) {
        whereConditions.push(
          inArray(helpdeskTickets.priority, filters.priority)
        );
      }

      if (filters.category?.length) {
        whereConditions.push(
          inArray(helpdeskTickets.category, filters.category)
        );
      }

      if (filters.assignedTo?.length) {
        whereConditions.push(
          inArray(helpdeskTickets.assignedTo, filters.assignedTo)
        );
      }

      if (filters.buildingId) {
        whereConditions.push(
          eq(helpdeskTickets.buildingId, filters.buildingId)
        );
      }

      if (filters.unitId) {
        whereConditions.push(eq(helpdeskTickets.unitId, filters.unitId));
      }

      if (filters.dateRange) {
        whereConditions.push(
          gte(helpdeskTickets.createdAt, filters.dateRange.from)
        );
        whereConditions.push(
          lte(helpdeskTickets.createdAt, filters.dateRange.to)
        );
      }
      const whereClause = and(...whereConditions);
      try {
        // Execute both queries in parallel with retry logic for better reliability
        const [ticketsWithDetails, [{ count: totalCount }]] = await withRetry(
          async () => {
            return await Promise.all([
              // Get tickets with user and building details
              db
                .select({
                  // Ticket fields
                  id: helpdeskTickets.id,
                  orgId: helpdeskTickets.orgId,
                  buildingId: helpdeskTickets.buildingId,
                  unitId: helpdeskTickets.unitId,
                  residentId: helpdeskTickets.residentId,
                  authorId: helpdeskTickets.authorId,
                  title: helpdeskTickets.title,
                  description: helpdeskTickets.description,
                  category: helpdeskTickets.category,
                  priority: helpdeskTickets.priority,
                  status: helpdeskTickets.status,
                  assignedTo: helpdeskTickets.assignedTo,
                  tags: helpdeskTickets.tags,
                  attachments: helpdeskTickets.attachments,
                  estimatedResolution: helpdeskTickets.estimatedResolution,
                  resolvedAt: helpdeskTickets.resolvedAt,
                  closedAt: helpdeskTickets.closedAt,
                  lastResponseAt: helpdeskTickets.lastResponseAt,
                  responseTime: helpdeskTickets.responseTime,
                  resolutionTime: helpdeskTickets.resolutionTime,
                  customerSatisfaction: helpdeskTickets.customerSatisfaction,
                  internalNotes: helpdeskTickets.internalNotes,
                  createdAt: helpdeskTickets.createdAt,
                  updatedAt: helpdeskTickets.updatedAt,
                  // User details
                  authorName: accounts.name,
                  authorEmail: accounts.email,
                  // Building details
                  buildingName: buildings.name,
                  buildingAddress: buildings.address,
                })
                .from(helpdeskTickets)
                .leftJoin(
                  accounts,
                  and(
                    eq(accounts.userId, helpdeskTickets.authorId),
                    eq(accounts.orgId, helpdeskTickets.orgId)
                  )
                )
                .leftJoin(
                  buildings,
                  eq(buildings.id, helpdeskTickets.buildingId)
                )
                .where(whereClause)
                .orderBy(
                  sortOrder === 'desc'
                    ? desc(helpdeskTickets[sortBy])
                    : asc(helpdeskTickets[sortBy])
                )
                .limit(pagination.limit)
                .offset(offset),

              // Get total count
              db
                .select({ count: count() })
                .from(helpdeskTickets)
                .where(whereClause),
            ]);
          }
        );
        const result = {
          tickets: ticketsWithDetails.map(ticket => ({
            // Original ticket fields
            id: ticket.id,
            orgId: ticket.orgId,
            buildingId: ticket.buildingId,
            unitId: ticket.unitId,
            residentId: ticket.residentId,
            authorId: ticket.authorId,
            title: ticket.title,
            description: ticket.description,
            category: ticket.category,
            priority: ticket.priority,
            status: ticket.status,
            assignedTo: ticket.assignedTo,
            tags: (ticket.tags as string[]) || [],
            attachments: (ticket.attachments as TicketAttachment[]) || [],
            estimatedResolution: ticket.estimatedResolution,
            resolvedAt: ticket.resolvedAt,
            closedAt: ticket.closedAt,
            lastResponseAt: ticket.lastResponseAt,
            responseTime: ticket.responseTime,
            resolutionTime: ticket.resolutionTime,
            customerSatisfaction: ticket.customerSatisfaction,
            internalNotes: ticket.internalNotes,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
            // Enhanced user information
            author: {
              id: ticket.authorId,
              name: ticket.authorName || 'Unknown User',
              email: ticket.authorEmail || '',
            },
            // Enhanced building information
            building: ticket.buildingId
              ? {
                  id: ticket.buildingId,
                  name: ticket.buildingName || 'Unknown Building',
                  address: ticket.buildingAddress || '',
                }
              : null,
          })),
          pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: totalCount,
            pages: Math.ceil(totalCount / pagination.limit),
          },
        };

        if (process.env.NODE_ENV === 'development') {
          console.log('[HELPDESK] getTickets - Completed', {
            totalTimeMs: Date.now() - startTime,
            resultSize: result.tickets.length,
            totalCount: result.pagination.total,
          });
        }

        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown database error';
        const errorDetails = {
          error: errorMessage,
          orgId,
          filters,
          pagination,
          timestamp: new Date().toISOString(),
          queryExecutionTime: Date.now() - startTime,
        };

        console.error('[HELPDESK] getTickets - Database error:', errorDetails);

        // Throw a TRPCError with better context for the client
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch tickets: ${errorMessage}`,
          cause: error,
        });
      }
    }),
  // Get single ticket with comments
  getTicket: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { orgId } = ctx;

      const ticketResult = await db
        .select({
          // Ticket fields
          id: helpdeskTickets.id,
          orgId: helpdeskTickets.orgId,
          buildingId: helpdeskTickets.buildingId,
          unitId: helpdeskTickets.unitId,
          residentId: helpdeskTickets.residentId,
          authorId: helpdeskTickets.authorId,
          title: helpdeskTickets.title,
          description: helpdeskTickets.description,
          category: helpdeskTickets.category,
          priority: helpdeskTickets.priority,
          status: helpdeskTickets.status,
          assignedTo: helpdeskTickets.assignedTo,
          tags: helpdeskTickets.tags,
          attachments: helpdeskTickets.attachments,
          estimatedResolution: helpdeskTickets.estimatedResolution,
          resolvedAt: helpdeskTickets.resolvedAt,
          closedAt: helpdeskTickets.closedAt,
          lastResponseAt: helpdeskTickets.lastResponseAt,
          responseTime: helpdeskTickets.responseTime,
          resolutionTime: helpdeskTickets.resolutionTime,
          customerSatisfaction: helpdeskTickets.customerSatisfaction,
          internalNotes: helpdeskTickets.internalNotes,
          createdAt: helpdeskTickets.createdAt,
          updatedAt: helpdeskTickets.updatedAt,
          // User details
          authorName: accounts.name,
          authorEmail: accounts.email,
          // Building details
          buildingName: buildings.name,
          buildingAddress: buildings.address,
        })
        .from(helpdeskTickets)
        .leftJoin(
          accounts,
          and(
            eq(accounts.userId, helpdeskTickets.authorId),
            eq(accounts.orgId, helpdeskTickets.orgId)
          )
        )
        .leftJoin(buildings, eq(buildings.id, helpdeskTickets.buildingId))
        .where(
          and(
            eq(helpdeskTickets.id, input.id),
            eq(helpdeskTickets.orgId, orgId)
          )
        )
        .limit(1);

      if (!ticketResult.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Ticket not found',
        });
      }

      const ticket = ticketResult[0];

      const comments = await db
        .select()
        .from(helpdeskComments)
        .where(eq(helpdeskComments.ticketId, input.id))
        .orderBy(asc(helpdeskComments.createdAt));

      return {
        // Original ticket fields
        id: ticket.id,
        orgId: ticket.orgId,
        buildingId: ticket.buildingId,
        unitId: ticket.unitId,
        residentId: ticket.residentId,
        authorId: ticket.authorId,
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        assignedTo: ticket.assignedTo,
        tags: (ticket.tags as string[]) || [],
        attachments: (ticket.attachments as TicketAttachment[]) || [],
        estimatedResolution: ticket.estimatedResolution,
        resolvedAt: ticket.resolvedAt,
        closedAt: ticket.closedAt,
        lastResponseAt: ticket.lastResponseAt,
        responseTime: ticket.responseTime,
        resolutionTime: ticket.resolutionTime,
        customerSatisfaction: ticket.customerSatisfaction,
        internalNotes: ticket.internalNotes,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        // Enhanced user information
        author: {
          id: ticket.authorId,
          name: ticket.authorName || 'Unknown User',
          email: ticket.authorEmail || '',
        },
        // Enhanced building information
        building: ticket.buildingId
          ? {
              id: ticket.buildingId,
              name: ticket.buildingName || 'Unknown Building',
              address: ticket.buildingAddress || '',
            }
          : null,
        // Comments
        comments: comments.map(comment => ({
          ...comment,
          attachments: (comment.attachments as TicketAttachment[]) || [],
        })),
      };
    }),

  // Create new ticket
  createTicket: orgProtectedProcedure
    .input(createTicketSchema)
    .mutation(async ({ ctx, input }) => {
      const { orgId, userId } = ctx;

      const [ticket] = await db
        .insert(helpdeskTickets)
        .values({
          orgId,
          authorId: userId,
          title: input.title,
          description: input.description,
          category: input.category,
          priority: input.priority,
          buildingId: input.buildingId || null,
          unitId: input.unitId || null,
          residentId: input.residentId || null,
          tags: input.tags,
          attachments: input.attachments,
          status: 'open',
          lastResponseAt: new Date().toISOString(),
        })
        .returning();

      return {
        ...ticket,
        tags: (ticket.tags as string[]) || [],
        attachments: (ticket.attachments as TicketAttachment[]) || [],
      };
    }),

  // Update ticket
  updateTicket: orgProtectedProcedure
    .input(updateTicketSchema)
    .mutation(async ({ ctx, input }) => {
      const { orgId } = ctx;
      const { id, ...updateData } = input;

      // Check if ticket exists and belongs to org
      const existingTicket = await db
        .select()
        .from(helpdeskTickets)
        .where(
          and(eq(helpdeskTickets.id, id), eq(helpdeskTickets.orgId, orgId))
        )
        .limit(1);

      if (!existingTicket.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Ticket not found',
        });
      }

      const updateFields: Record<string, unknown> = {
        updatedAt: new Date().toISOString(),
      };

      if (updateData.title !== undefined) updateFields.title = updateData.title;
      if (updateData.description !== undefined)
        updateFields.description = updateData.description;
      if (updateData.category !== undefined)
        updateFields.category = updateData.category;
      if (updateData.priority !== undefined)
        updateFields.priority = updateData.priority;
      if (updateData.status !== undefined) {
        updateFields.status = updateData.status;
        if (updateData.status === 'resolved') {
          updateFields.resolvedAt = new Date().toISOString();
        } else if (updateData.status === 'closed') {
          updateFields.closedAt = new Date().toISOString();
        }
      }
      if (updateData.assignedTo !== undefined)
        updateFields.assignedTo = updateData.assignedTo;
      if (updateData.tags !== undefined) updateFields.tags = updateData.tags;
      if (updateData.attachments !== undefined)
        updateFields.attachments = updateData.attachments;
      if (updateData.estimatedResolution !== undefined)
        updateFields.estimatedResolution = updateData.estimatedResolution;
      if (updateData.internalNotes !== undefined)
        updateFields.internalNotes = updateData.internalNotes;
      if (updateData.customerSatisfaction !== undefined)
        updateFields.customerSatisfaction = updateData.customerSatisfaction;

      const [ticket] = await db
        .update(helpdeskTickets)
        .set(updateFields)
        .where(eq(helpdeskTickets.id, id))
        .returning();

      return {
        ...ticket,
        tags: (ticket.tags as string[]) || [],
        attachments: (ticket.attachments as TicketAttachment[]) || [],
      };
    }),

  // Delete ticket
  deleteTicket: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { orgId } = ctx;

      const result = await db
        .delete(helpdeskTickets)
        .where(
          and(
            eq(helpdeskTickets.id, input.id),
            eq(helpdeskTickets.orgId, orgId)
          )
        )
        .returning();

      if (!result.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Ticket not found',
        });
      }

      return { success: true };
    }),

  // Add comment to ticket
  addComment: orgProtectedProcedure
    .input(addCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const { orgId, userId } = ctx;

      // Check if ticket exists and belongs to org
      const ticket = await db
        .select()
        .from(helpdeskTickets)
        .where(
          and(
            eq(helpdeskTickets.id, input.ticketId),
            eq(helpdeskTickets.orgId, orgId)
          )
        )
        .limit(1);

      if (!ticket.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Ticket not found',
        });
      }

      const [comment] = await db
        .insert(helpdeskComments)
        .values({
          ticketId: input.ticketId,
          authorId: userId,
          content: input.content,
          isInternal: input.isInternal,
          attachments: input.attachments,
        })
        .returning();

      // Update ticket's lastResponseAt
      await db
        .update(helpdeskTickets)
        .set({
          lastResponseAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .where(eq(helpdeskTickets.id, input.ticketId));

      return {
        ...comment,
        attachments: (comment.attachments as TicketAttachment[]) || [],
      };
    }),
  // Get ticket statistics
  getStats: orgProtectedProcedure
    .input(
      z.object({
        buildingId: z.string().uuid().optional(),
        dateRange: z
          .object({
            from: z.string(),
            to: z.string(),
          })
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const startTime = Date.now();
      if (process.env.NODE_ENV === 'development') {
        console.log('[HELPDESK] getStats - Starting query', {
          orgId: ctx.orgId,
          input,
          timestamp: new Date().toISOString(),
        });
      }

      const { orgId } = ctx;

      try {
        const whereConditions = [eq(helpdeskTickets.orgId, orgId)];

        if (input.buildingId) {
          whereConditions.push(
            eq(helpdeskTickets.buildingId, input.buildingId)
          );
        }

        if (input.dateRange) {
          whereConditions.push(
            gte(helpdeskTickets.createdAt, input.dateRange.from)
          );
          whereConditions.push(
            lte(helpdeskTickets.createdAt, input.dateRange.to)
          );
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('[HELPDESK] getStats - Built where conditions', {
            conditionsCount: whereConditions.length,
            buildingId: input.buildingId,
          });
        }

        const statsQueryStart = Date.now();
        const [stats] = await withRetry(async () => {
          return await db
            .select({
              total: count(),
              open: count(sql`CASE WHEN status = 'open' THEN 1 END`),
              inProgress: count(
                sql`CASE WHEN status = 'in_progress' THEN 1 END`
              ),
              resolved: count(sql`CASE WHEN status = 'resolved' THEN 1 END`),
              closed: count(sql`CASE WHEN status = 'closed' THEN 1 END`),
              avgResponseTime: avg(helpdeskTickets.responseTime),
              avgResolutionTime: avg(helpdeskTickets.resolutionTime),
              satisfactionScore: avg(helpdeskTickets.customerSatisfaction),
            })
            .from(helpdeskTickets)
            .where(and(...whereConditions));
        });

        if (process.env.NODE_ENV === 'development') {
          console.log('[HELPDESK] getStats - Stats query completed', {
            queryTimeMs: Date.now() - statsQueryStart,
            rawStats: stats,
          });
        }

        const result = {
          total: stats.total,
          open: stats.open,
          inProgress: stats.inProgress,
          resolved: stats.resolved,
          closed: stats.closed,
          avgResponseTime: Number(stats.avgResponseTime) || 0,
          avgResolutionTime: Number(stats.avgResolutionTime) || 0,
          satisfactionScore: Number(stats.satisfactionScore) || 0,
        };

        if (process.env.NODE_ENV === 'development') {
          console.log('[HELPDESK] getStats - Completed', {
            totalTimeMs: Date.now() - startTime,
            result,
          });
        }

        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown database error';
        const errorDetails = {
          error: errorMessage,
          orgId,
          input,
          timestamp: new Date().toISOString(),
          queryExecutionTime: Date.now() - startTime,
        };

        console.error('[HELPDESK] getStats - Database error:', errorDetails);

        // Throw a TRPCError with better context for the client
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch helpdesk statistics: ${errorMessage}`,
          cause: error,
        });
      }
    }),

  // Get categories
  getCategories: orgProtectedProcedure.query(async ({ ctx }) => {
    const { orgId } = ctx;

    const categories = await db
      .select()
      .from(helpdeskCategories)
      .where(
        and(
          eq(helpdeskCategories.orgId, orgId),
          eq(helpdeskCategories.isActive, true)
        )
      )
      .orderBy(asc(helpdeskCategories.sortOrder));

    return categories;
  }),

  // Create category
  createCategory: orgProtectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().optional(),
        color: z.string().optional(),
        icon: z.string().optional(),
        defaultPriority: z
          .enum(['low', 'medium', 'high', 'urgent'])
          .default('medium'),
        defaultAssignee: z.string().optional(),
        autoResponseTemplate: z.string().optional(),
        estimatedResponseTime: z.number().min(1).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { orgId } = ctx;

      // Get max sort order
      const [{ maxOrder }] = await db
        .select({
          maxOrder: sql<number>`COALESCE(MAX(${helpdeskCategories.sortOrder}), 0)`,
        })
        .from(helpdeskCategories)
        .where(eq(helpdeskCategories.orgId, orgId));

      const [category] = await db
        .insert(helpdeskCategories)
        .values({
          orgId,
          name: input.name,
          description: input.description || null,
          color: input.color || null,
          icon: input.icon || null,
          defaultPriority: input.defaultPriority,
          defaultAssignee: input.defaultAssignee || null,
          autoResponseTemplate: input.autoResponseTemplate || null,
          estimatedResponseTime: input.estimatedResponseTime || null,
          sortOrder: maxOrder + 1,
        })
        .returning();

      return category;
    }),

  // B2B PROCEDURES - External API for syndicates to create tickets

  // Create B2B ticket (from syndicate to app owner)
  createB2BTicket: protectedProcedure
    .input(createB2BTicketSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        });
      }

      try {
        const ticket = await withRetry(async () => {
          const [newTicket] = await db
            .insert(helpdeskTickets)
            .values({
              orgId: 'app-owner-org', // Special org ID for app owner tickets
              authorId: userId,
              title: input.title,
              description: input.description,
              category: input.category,
              priority: input.priority,
              isB2B: true,
              ticketType: 'b2b',
              urgencyLevel: input.urgencyLevel,
              businessImpact: input.businessImpact,
              affectedUsers: input.affectedUsers,
              syndicateInfo: input.syndicateInfo,
              tags: input.tags,
              attachments: input.attachments,
            })
            .returning();

          return newTicket;
        });

        // Log B2B ticket creation for analytics
        console.log('[B2B HELPDESK] Ticket created:', {
          ticketId: ticket.id,
          syndicate: input.syndicateInfo.organizationName,
          priority: input.priority,
          urgencyLevel: input.urgencyLevel,
          affectedUsers: input.affectedUsers,
        });

        return ticket;
      } catch (error) {
        console.error('[B2B HELPDESK] Error creating ticket:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create B2B ticket',
        });
      }
    }),

  // Get B2B tickets for the app owner (admin view)
  getB2BTickets: orgProtectedProcedure
    .input(
      z.object({
        filters: ticketFilterSchema.default({
          ticketType: 'all',
          status: undefined,
          priority: undefined,
          urgencyLevel: undefined,
        }),
        pagination: paginationSchema.optional(),
        sortBy: z
          .enum(['createdAt', 'updatedAt', 'priority', 'urgencyLevel'])
          .default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      })
    )
    .query(async ({ ctx, input }) => {
      // Only allow app owner org to access B2B tickets
      if (ctx.orgId !== 'app-owner-org') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Access denied: B2B tickets access restricted',
        });
      }

      const {
        filters,
        pagination = { page: 1, limit: 20 },
        sortBy,
        sortOrder,
      } = input;

      const offset = (pagination.page - 1) * pagination.limit;

      // Build where conditions for B2B tickets only
      const whereConditions = [
        eq(helpdeskTickets.isB2B, true),
        eq(helpdeskTickets.ticketType, 'b2b'),
      ];

      if (filters.status?.length) {
        whereConditions.push(inArray(helpdeskTickets.status, filters.status));
      }

      if (filters.priority?.length) {
        whereConditions.push(
          inArray(helpdeskTickets.priority, filters.priority)
        );
      }

      if (filters.urgencyLevel?.length) {
        whereConditions.push(
          inArray(helpdeskTickets.urgencyLevel, filters.urgencyLevel)
        );
      }

      // Get total count
      const [{ total }] = await db
        .select({ total: count() })
        .from(helpdeskTickets)
        .where(and(...whereConditions));

      // Get tickets with pagination
      const orderByField = {
        createdAt: helpdeskTickets.createdAt,
        updatedAt: helpdeskTickets.updatedAt,
        priority: helpdeskTickets.priority,
        urgencyLevel: helpdeskTickets.urgencyLevel,
      }[sortBy];

      const orderDirection = sortOrder === 'asc' ? asc : desc;

      const tickets = await db
        .select({
          id: helpdeskTickets.id,
          title: helpdeskTickets.title,
          description: helpdeskTickets.description,
          category: helpdeskTickets.category,
          priority: helpdeskTickets.priority,
          urgencyLevel: helpdeskTickets.urgencyLevel,
          status: helpdeskTickets.status,
          businessImpact: helpdeskTickets.businessImpact,
          affectedUsers: helpdeskTickets.affectedUsers,
          syndicateInfo: helpdeskTickets.syndicateInfo,
          assignedTo: helpdeskTickets.assignedTo,
          tags: helpdeskTickets.tags,
          attachments: helpdeskTickets.attachments,
          createdAt: helpdeskTickets.createdAt,
          updatedAt: helpdeskTickets.updatedAt,
          authorId: helpdeskTickets.authorId,
          buildingId: helpdeskTickets.buildingId,
        })
        .from(helpdeskTickets)
        .where(and(...whereConditions))
        .orderBy(orderDirection(orderByField))
        .limit(pagination.limit)
        .offset(offset);

      const ticketsMapped = tickets.map(t => ({
        ...t,
        author: { id: t.authorId, name: '', email: '' },
        building: t.buildingId
          ? { id: t.buildingId, name: '', address: '' }
          : null,
      }));

      return {
        tickets: ticketsMapped,
        pagination: {
          total,
          page: pagination.page,
          limit: pagination.limit,
          totalPages: Math.ceil(total / pagination.limit),
        },
      };
    }),

  // Get B2B ticket statistics for dashboard
  getB2BStats: orgProtectedProcedure.query(async ({ ctx }) => {
    // Only allow app owner org to access B2B stats
    if (ctx.orgId !== 'app-owner-org') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Access denied: B2B stats access restricted',
      });
    }

    try {
      // Get ticket counts by status
      const statusCounts = await db
        .select({
          status: helpdeskTickets.status,
          count: count(),
        })
        .from(helpdeskTickets)
        .where(
          and(
            eq(helpdeskTickets.isB2B, true),
            eq(helpdeskTickets.ticketType, 'b2b')
          )
        )
        .groupBy(helpdeskTickets.status);

      // Get priority distribution
      const priorityCounts = await db
        .select({
          priority: helpdeskTickets.priority,
          count: count(),
        })
        .from(helpdeskTickets)
        .where(
          and(
            eq(helpdeskTickets.isB2B, true),
            eq(helpdeskTickets.ticketType, 'b2b')
          )
        )
        .groupBy(helpdeskTickets.priority);

      // Get urgency level distribution
      const urgencyCounts = await db
        .select({
          urgencyLevel: helpdeskTickets.urgencyLevel,
          count: count(),
        })
        .from(helpdeskTickets)
        .where(
          and(
            eq(helpdeskTickets.isB2B, true),
            eq(helpdeskTickets.ticketType, 'b2b')
          )
        )
        .groupBy(helpdeskTickets.urgencyLevel);

      // Get average response time
      const [avgResponseTime] = await db
        .select({
          avgResponse: avg(helpdeskTickets.responseTime),
        })
        .from(helpdeskTickets)
        .where(
          and(
            eq(helpdeskTickets.isB2B, true),
            eq(helpdeskTickets.ticketType, 'b2b')
          )
        );

      // Get total affected users
      const [totalAffectedUsers] = await db
        .select({
          totalUsers: sql<number>`sum(${helpdeskTickets.affectedUsers})`,
        })
        .from(helpdeskTickets)
        .where(
          and(
            eq(helpdeskTickets.isB2B, true),
            eq(helpdeskTickets.ticketType, 'b2b')
          )
        );

      return {
        statusCounts,
        priorityCounts,
        urgencyCounts,
        averageResponseTime: Number(avgResponseTime?.avgResponse) || 0,
        totalAffectedUsers: Number(totalAffectedUsers?.totalUsers) || 0,
      };
    } catch (error) {
      console.error('[B2B HELPDESK] Error fetching stats:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch B2B statistics',
      });
    }
  }),
  // Enhanced getTickets to support both internal and B2B filtering
  getAllTickets: orgProtectedProcedure
    .input(
      z.object({
        filters: ticketFilterSchema.default({
          ticketType: 'all',
          status: undefined,
          priority: undefined,
          urgencyLevel: undefined,
        }),
        pagination: paginationSchema.optional(),
        sortBy: z
          .enum([
            'createdAt',
            'updatedAt',
            'priority',
            'status',
            'urgencyLevel',
          ])
          .default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      })
    )
    .query(async ({ ctx, input }) => {
      const { orgId } = ctx;
      const {
        filters,
        pagination = { page: 1, limit: 20 },
        sortBy,
        sortOrder,
      } = input;

      const offset = (pagination.page - 1) * pagination.limit; // Build where conditions based on ticket type filter
      let whereConditions: SQL[] = [];

      if (filters.ticketType === 'internal') {
        whereConditions = [
          eq(helpdeskTickets.orgId, orgId),
          eq(helpdeskTickets.isB2B, false),
        ];
      } else if (filters.ticketType === 'b2b') {
        whereConditions = [
          eq(helpdeskTickets.isB2B, true),
          eq(helpdeskTickets.ticketType, 'b2b'),
        ];
      } else {
        // 'all' - show both for app owner, only internal for regular orgs
        if (orgId === 'app-owner-org') {
          whereConditions = []; // No org filter for app owner to see all tickets
        } else {
          whereConditions = [
            eq(helpdeskTickets.orgId, orgId),
            eq(helpdeskTickets.isB2B, false),
          ];
        }
      }

      // Apply additional filters
      if (filters.status?.length) {
        whereConditions.push(inArray(helpdeskTickets.status, filters.status));
      }

      if (filters.priority?.length) {
        whereConditions.push(
          inArray(helpdeskTickets.priority, filters.priority)
        );
      }

      if (filters.urgencyLevel?.length) {
        whereConditions.push(
          inArray(helpdeskTickets.urgencyLevel, filters.urgencyLevel)
        );
      }

      // Get total count
      const [{ total }] = await db
        .select({ total: count() })
        .from(helpdeskTickets)
        .where(
          whereConditions.length > 0 ? and(...whereConditions) : undefined
        );

      // Get tickets with pagination
      const orderByField = {
        createdAt: helpdeskTickets.createdAt,
        updatedAt: helpdeskTickets.updatedAt,
        priority: helpdeskTickets.priority,
        status: helpdeskTickets.status,
        urgencyLevel: helpdeskTickets.urgencyLevel,
      }[sortBy];

      const orderDirection = sortOrder === 'asc' ? asc : desc;

      const rawTickets = await db
        .select({
          id: helpdeskTickets.id,
          title: helpdeskTickets.title,
          description: helpdeskTickets.description,
          category: helpdeskTickets.category,
          priority: helpdeskTickets.priority,
          urgencyLevel: helpdeskTickets.urgencyLevel,
          status: helpdeskTickets.status,
          businessImpact: helpdeskTickets.businessImpact,
          affectedUsers: helpdeskTickets.affectedUsers,
          syndicateInfo: helpdeskTickets.syndicateInfo,
          assignedTo: helpdeskTickets.assignedTo,
          tags: helpdeskTickets.tags,
          attachments: helpdeskTickets.attachments,
          createdAt: helpdeskTickets.createdAt,
          updatedAt: helpdeskTickets.updatedAt,
          authorId: helpdeskTickets.authorId,
          buildingId: helpdeskTickets.buildingId,
        })
        .from(helpdeskTickets)
        .where(and(...whereConditions))
        .orderBy(orderDirection(orderByField))
        .limit(pagination.limit)
        .offset(offset);

      const tickets = rawTickets.map(t => ({
        ...t,
        author: { id: t.authorId, name: '', email: '' },
        building: t.buildingId
          ? { id: t.buildingId, name: '', address: '' }
          : null,
      }));

      return {
        tickets,
        pagination: {
          total,
          page: pagination.page,
          limit: pagination.limit,
          totalPages: Math.ceil(total / pagination.limit),
        },
      };
    }),
});
