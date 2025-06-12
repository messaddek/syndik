export type ResidentPortalUser = {
  id: string;
  userId: string; // Clerk user ID
  orgId: string; // Clerk org ID
  name: string;
  email: string;
  phone: string | null;
  isActive: boolean;
  residentId: string | null; // Reference to residents table
  createdAt: Date;
  updatedAt: Date;
};
