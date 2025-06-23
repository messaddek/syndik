# Resident Auto-Linking Fix Summary

## Problem Resolved

The duplicate key error `duplicate key value violates unique constraint "users_user_id_unique"` was occurring during the resident auto-linking process when multiple requests tried to create the same user record simultaneously.

## Root Cause

- Race condition: Multiple requests for the same user could try to insert a user record at the same time
- The original code didn't handle duplicate key errors during database insertion
- User lookup was filtering by both `userId` and `orgId`, which could miss existing records during auto-linking

## Solution Implemented

### 1. Enhanced Error Handling

```typescript
try {
  await db.insert(users).values({
    userId: userId,
    orgId: orgId,
    // ... other fields
  });
} catch (insertError) {
  // Handle duplicate key error (race condition)
  const errorMessage = insertError instanceof Error ? insertError.message : String(insertError);
  const isDuplicateKey = errorMessage.includes('duplicate key') ||
                        errorMessage.includes('unique constraint') ||
                        errorMessage.includes('users_user_id_unique');

  if (isDuplicateKey) {
    // Fall back to updating existing record
    await db.update(users).set({...}).where(eq(users.userId, userId));
  } else {
    throw insertError; // Re-throw non-duplicate errors
  }
}
```

### 2. Improved User Lookup Logic

- Changed from filtering by both `userId` AND `orgId` to only `userId`
- Added orgId validation after retrieval to ensure correct organization
- This prevents missing existing records during the auto-linking flow

### 3. Added Comprehensive Logging

- All database operations now have detailed logs
- Clear success/failure messages for debugging
- Specific logging for duplicate key error handling

### 4. Debug Procedure

Added `debugAutoLinking` procedure to help troubleshoot auto-linking issues:

- Shows all user records for a given userId
- Lists matching residents by email
- Provides Clerk user information
- Available via debug button in the UI

## Expected Behavior Now

1. **First Request**: Creates user record successfully
2. **Concurrent Requests**: Gracefully handle duplicate key errors by updating existing record
3. **No Data Loss**: User always gets linked to the correct resident
4. **Clear Feedback**: Proper error messages and success notifications
5. **Robust Operation**: System handles race conditions without crashing

## Testing Recommendations

1. Test multiple rapid page refreshes to trigger race conditions
2. Verify auto-linking works correctly for new users
3. Check that existing users maintain their links
4. Confirm error messages are user-friendly
5. Use debug button to inspect auto-linking state

## Files Modified

- `src/modules/portal/server/procedures.ts` - Main fix with error handling
- `src/modules/portal/ui/components/resident-access-guard.tsx` - UI feedback (existing)

The system should now be robust against duplicate key errors and provide a smooth user experience during resident auto-linking.
