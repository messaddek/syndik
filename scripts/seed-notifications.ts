import { db } from '../src/lib/db';
import {
  notifications,
  notificationPreferences,
} from '../src/modules/notifications/schema';
import { accounts } from '../src/modules/accounts/schema';

async function seedNotifications() {
  try {
    console.log('🌱 Seeding sample notifications...');

    // Get all accounts to create notifications for
    const allAccounts = await db.select().from(accounts).limit(5);

    if (allAccounts.length === 0) {
      console.log('❌ No accounts found. Please create some accounts first.');
      return;
    }

    console.log(`Found ${allAccounts.length} accounts`);

    // Sample notifications data
    const sampleNotifications = [
      {
        title: 'Monthly Meeting Reminder',
        content:
          "Don't forget about the monthly building meeting on January 15th at 7:00 PM in the community room.",
        type: 'announcement' as const,
        category: 'meetings' as const,
        priority: 'high' as const,
      },
      {
        title: 'Maintenance Work Scheduled',
        content:
          'Elevator maintenance is scheduled for this weekend. Please use the stairs during this time.',
        type: 'maintenance' as const,
        category: 'maintenance' as const,
        priority: 'normal' as const,
      },
      {
        title: 'Payment Reminder',
        content:
          'Your monthly syndicate fee payment is due in 3 days. Please ensure timely payment to avoid late fees.',
        type: 'payment' as const,
        category: 'financial' as const,
        priority: 'high' as const,
      },
      {
        title: 'New Resident Welcome',
        content:
          "Please welcome our new residents in apartment 4B! Let's make them feel at home.",
        type: 'announcement' as const,
        category: 'community' as const,
        priority: 'low' as const,
      },
      {
        title: 'Security Update',
        content:
          'New security cameras have been installed in the parking garage for enhanced safety.',
        type: 'announcement' as const,
        category: 'security' as const,
        priority: 'normal' as const,
      },
    ];

    // Create notifications for each account
    const notificationsToInsert = [];
    for (const account of allAccounts) {
      for (const notification of sampleNotifications) {
        notificationsToInsert.push({
          orgId: account.orgId,
          userId: account.userId,
          ...notification,
          isRead: Math.random() > 0.7, // Some notifications are already read
        });
      }
    }

    // Insert notifications
    const insertedNotifications = await db
      .insert(notifications)
      .values(notificationsToInsert)
      .returning();

    console.log(
      `✅ Created ${insertedNotifications.length} sample notifications`
    );

    // Create default notification preferences for accounts that don't have them
    const preferencesToInsert = [];
    for (const account of allAccounts) {
      preferencesToInsert.push({
        orgId: account.orgId,
        userId: account.userId,
        announcements: true,
        maintenance: true,
        payments: true,
        meetings: true,
        security: true,
        community: true,
        emailNotifications: true,
        pushNotifications: true,
      });
    }

    try {
      const insertedPreferences = await db
        .insert(notificationPreferences)
        .values(preferencesToInsert)
        .returning();

      console.log(
        `✅ Created ${insertedPreferences.length} notification preferences`
      );
    } catch (error) {
      console.log(
        'ℹ️ Some notification preferences might already exist, skipping...'
      );
    }

    console.log('🎉 Notification seeding completed successfully!');
    console.log('\nYou can now:');
    console.log('1. Check the notifications in the app at /notifications');
    console.log(
      '2. Test the real-time updates by opening multiple browser tabs'
    );
    console.log('3. Manage notification preferences in settings');
  } catch (error) {
    console.error('❌ Error seeding notifications:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seed function
seedNotifications();
