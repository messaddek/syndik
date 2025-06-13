// Static article definitions with enhanced metadata
export const STATIC_ARTICLES = {
  // Getting Started
  'creating-your-first-property': {
    slug: 'creating-your-first-property',
    title: 'Creating Your First Property',
    description: 'Essential setup and first steps for property creation',
    category: 'getting-started',
    readTime: 5,
    tags: ['setup', 'property', 'basics'],
    popular: true,
    featured: true,
    path: '/user-guide/getting-started/creating-your-first-property',
  },
  'setting-up-user-accounts': {
    slug: 'setting-up-user-accounts',
    title: 'Setting Up User Accounts',
    description: 'Create and manage user accounts for your team',
    category: 'getting-started',
    readTime: 3,
    tags: ['users', 'setup', 'accounts'],
    popular: true,
    featured: false,
    path: '/user-guide/getting-started/setting-up-user-accounts',
  },
  'understanding-roles-permissions': {
    slug: 'understanding-roles-permissions',
    title: 'Understanding Roles & Permissions',
    description: 'Learn about user roles and permission management',
    category: 'getting-started',
    readTime: 7,
    tags: ['roles', 'permissions', 'security'],
    popular: false,
    featured: false,
    path: '/user-guide/getting-started/understanding-roles-permissions',
  },
  'initial-configuration-guide': {
    slug: 'initial-configuration-guide',
    title: 'Initial Configuration Guide',
    description: 'Complete system setup and configuration',
    category: 'getting-started',
    readTime: 10,
    tags: ['configuration', 'setup', 'initialization'],
    popular: false,
    featured: false,
    path: '/user-guide/getting-started/initial-configuration-guide',
  },

  // Property Management
  'adding-new-properties': {
    slug: 'adding-new-properties',
    title: 'Adding New Properties',
    description: 'How to add and configure new properties in the system',
    category: 'property-management',
    readTime: 4,
    tags: ['properties', 'setup'],
    popular: true,
    featured: false,
    path: '/user-guide/property-management/adding-new-properties',
  },
  'unit-management-organization': {
    slug: 'unit-management-organization',
    title: 'Unit Management & Organization',
    description: 'Organize and manage units within your properties',
    category: 'property-management',
    readTime: 6,
    tags: ['units', 'organization'],
    popular: false,
    featured: false,
    path: '/user-guide/property-management/unit-management-organization',
  },
  'property-information-updates': {
    slug: 'property-information-updates',
    title: 'Property Information Updates',
    description: 'Keep property information current and accurate',
    category: 'property-management',
    readTime: 3,
    tags: ['updates', 'maintenance'],
    popular: false,
    featured: false,
    path: '/user-guide/property-management/property-information-updates',
  },
  'document-management-system': {
    slug: 'document-management-system',
    title: 'Document Management System',
    description: 'Store and organize property-related documents',
    category: 'property-management',
    readTime: 8,
    tags: ['documents', 'storage', 'organization'],
    popular: false,
    featured: false,
    path: '/user-guide/property-management/document-management-system',
  },

  // Resident Management
  'adding-new-residents': {
    slug: 'adding-new-residents',
    title: 'Adding New Residents',
    description: 'How to onboard new residents to your property',
    category: 'resident-management',
    readTime: 5,
    tags: ['residents', 'onboarding'],
    popular: true,
    featured: false,
    path: '/user-guide/resident-management/adding-new-residents',
  },
  'lease-agreement-management': {
    slug: 'lease-agreement-management',
    title: 'Lease Agreement Management',
    description: 'Create, manage, and track lease agreements',
    category: 'resident-management',
    readTime: 8,
    tags: ['leases', 'agreements', 'contracts'],
    popular: false,
    featured: false,
    path: '/user-guide/resident-management/lease-agreement-management',
  },
  'resident-communication-tools': {
    slug: 'resident-communication-tools',
    title: 'Resident Communication Tools',
    description: 'Use communication tools to stay connected with residents',
    category: 'resident-management',
    readTime: 6,
    tags: ['communication', 'tools'],
    popular: false,
    featured: false,
    path: '/user-guide/resident-management/resident-communication-tools',
  },
  'move-in-move-out-process': {
    slug: 'move-in-move-out-process',
    title: 'Move-in/Move-out Process',
    description: 'Streamline the move-in and move-out procedures',
    category: 'resident-management',
    readTime: 10,
    tags: ['move-in', 'move-out', 'process'],
    popular: false,
    featured: false,
    path: '/user-guide/resident-management/move-in-move-out-process',
  },

  // Financial Management
  'setting-up-rent-collection': {
    slug: 'setting-up-rent-collection',
    title: 'Setting Up Rent Collection',
    description: 'Configure automated rent collection and payment processing',
    category: 'financial-management',
    readTime: 7,
    tags: ['payments', 'rent', 'automation'],
    popular: true,
    featured: false,
    path: '/user-guide/financial-management/setting-up-rent-collection',
  },
  'processing-payments': {
    slug: 'processing-payments',
    title: 'Processing Payments',
    description: 'Handle and process various payment types',
    category: 'financial-management',
    readTime: 4,
    tags: ['payments', 'processing'],
    popular: false,
    featured: false,
    path: '/user-guide/financial-management/processing-payments',
  },
  'generating-financial-reports': {
    slug: 'generating-financial-reports',
    title: 'Generating Financial Reports',
    description: 'Create and analyze financial reports',
    category: 'financial-management',
    readTime: 6,
    tags: ['reports', 'analytics', 'finance'],
    popular: false,
    featured: false,
    path: '/user-guide/financial-management/generating-financial-reports',
  },
  'late-payment-management': {
    slug: 'late-payment-management',
    title: 'Late Payment Management',
    description: 'Handle late payments and collection procedures',
    category: 'financial-management',
    readTime: 5,
    tags: ['late-payments', 'collections'],
    popular: false,
    featured: false,
    path: '/user-guide/financial-management/late-payment-management',
  },

  // Maintenance
  'creating-work-orders': {
    slug: 'creating-work-orders',
    title: 'Creating Work Orders',
    description: 'Create and manage maintenance work orders',
    category: 'maintenance',
    readTime: 4,
    tags: ['work-orders', 'maintenance'],
    popular: false,
    featured: false,
    path: '/user-guide/maintenance/creating-work-orders',
  },
  'tracking-maintenance-requests': {
    slug: 'tracking-maintenance-requests',
    title: 'Tracking Maintenance Requests',
    description: 'Monitor and manage maintenance requests from residents',
    category: 'maintenance',
    readTime: 5,
    tags: ['maintenance', 'tracking', 'requests'],
    popular: true,
    featured: false,
    path: '/user-guide/maintenance/tracking-maintenance-requests',
  },
  'vendor-management': {
    slug: 'vendor-management',
    title: 'Vendor Management',
    description: 'Manage relationships with maintenance vendors',
    category: 'maintenance',
    readTime: 7,
    tags: ['vendors', 'contractors'],
    popular: false,
    featured: false,
    path: '/user-guide/maintenance/vendor-management',
  },
  'preventive-maintenance-setup': {
    slug: 'preventive-maintenance-setup',
    title: 'Preventive Maintenance Setup',
    description: 'Set up scheduled preventive maintenance programs',
    category: 'maintenance',
    readTime: 9,
    tags: ['preventive', 'scheduling'],
    popular: false,
    featured: false,
    path: '/user-guide/maintenance/preventive-maintenance-setup',
  },

  // Communication
  'sending-announcements': {
    slug: 'sending-announcements',
    title: 'Sending Announcements',
    description: 'Communicate effectively with all residents',
    category: 'communication',
    readTime: 3,
    tags: ['communication', 'announcements'],
    popular: true,
    featured: false,
    path: '/user-guide/communication/sending-announcements',
  },
  'individual-messaging': {
    slug: 'individual-messaging',
    title: 'Individual Messaging',
    description: 'Send direct messages to specific residents',
    category: 'communication',
    readTime: 2,
    tags: ['messaging', 'direct-communication'],
    popular: false,
    featured: false,
    path: '/user-guide/communication/individual-messaging',
  },
  'notification-settings': {
    slug: 'notification-settings',
    title: 'Notification Settings',
    description: 'Configure notification preferences and settings',
    category: 'communication',
    readTime: 4,
    tags: ['notifications', 'settings'],
    popular: false,
    featured: false,
    path: '/user-guide/communication/notification-settings',
  },
  'email-templates': {
    slug: 'email-templates',
    title: 'Email Templates',
    description: 'Create and manage email templates for common communications',
    category: 'communication',
    readTime: 6,
    tags: ['email', 'templates'],
    popular: false,
    featured: false,
    path: '/user-guide/communication/email-templates',
  },
} as const;

export type ArticleSlug = keyof typeof STATIC_ARTICLES;
export type StaticArticleMetadata = (typeof STATIC_ARTICLES)[ArticleSlug];

// Helper functions
export function getArticleBySlug(slug: string): StaticArticleMetadata | null {
  return STATIC_ARTICLES[slug as ArticleSlug] || null;
}

export function getArticlesByCategory(
  category: string
): StaticArticleMetadata[] {
  return Object.values(STATIC_ARTICLES).filter(
    article => article.category === category
  );
}

export function getPopularArticles(): StaticArticleMetadata[] {
  return Object.values(STATIC_ARTICLES).filter(article => article.popular);
}

export function getFeaturedArticles(): StaticArticleMetadata[] {
  return Object.values(STATIC_ARTICLES).filter(article => article.featured);
}
