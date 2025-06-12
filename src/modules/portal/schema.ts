import { z } from 'zod';

export const residentSetupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  unitId: z.string().uuid('Please select a valid unit'),
});

export const residentProfileUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  phone: z.string().optional(),
});
