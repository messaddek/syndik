# Article Analytics and Comments System

This system provides view tracking, ratings, and comments for static user guide articles while keeping the article content itself static in React components.

## Architecture Overview

The system consists of several key components:

1. **Static Article Content**: Articles remain as static React components for better performance and SEO
2. **Database Analytics**: Tracks views, ratings, and user engagement
3. **Comments System**: Allows users to comment and discuss articles
4. **Popular Articles**: Shows trending articles based on analytics

## Database Schema

### Tables Created

The system adds four new tables to track article engagement:

- `article_views` - Tracks every view of static articles
- `article_ratings` - User ratings and feedback for articles
- `article_comments` - Comments and replies on articles
- `article_comment_likes` - Like/unlike functionality for comments

### Key Features

- **View Tracking**: Automatic tracking of article views with session/user correlation
- **Reading Analytics**: Tracks time spent and read percentage
- **User Ratings**: 1-5 star ratings with optional feedback
- **Nested Comments**: Comments with replies and like functionality
- **Soft Deletes**: Comments are soft-deleted to maintain thread integrity

## Usage

### 1. Track Article Views

Add view tracking to any article page:

```tsx
'use client';
import { useArticleTracking } from '@/modules/articles/use-article-tracking';

export default function ArticlePage() {
  // Track this article view automatically
  useArticleTracking({
    articleSlug: 'creating-your-first-property',
    title: 'Creating Your First Property',
  });

  return <div>{/* Your article content */}</div>;
}
```

### 2. Add Article Rating

```tsx
import ArticleRating from '@/modules/articles/components/article-rating';

<ArticleRating articleSlug='creating-your-first-property' className='my-8' />;
```

### 3. Add Comments Section

```tsx
import ArticleComments from '@/modules/articles/components/article-comments';

<ArticleComments articleSlug='creating-your-first-property' className='mt-8' />;
```

### 4. Show Popular Articles

```tsx
import PopularArticles from '@/modules/articles/components/popular-articles';

<PopularArticles limit={5} timeframe='month' category='getting-started' />;
```

## TRPC API Endpoints

### Analytics Endpoints

- `articles.trackView` - Track an article view (public)
- `articles.rateArticle` - Rate an article (authenticated)
- `articles.getPopularArticles` - Get popular articles based on analytics
- `articles.getArticleAnalytics` - Get analytics for a specific article

### Comments Endpoints

- `articles.addComment` - Add a comment (authenticated)
- `articles.updateComment` - Edit a comment (authenticated, owner only)
- `articles.deleteComment` - Soft delete a comment (authenticated, owner only)
- `articles.likeComment` - Like/unlike a comment (authenticated)
- `articles.getComments` - Get comments for an article (public)

## Static Article Configuration

Articles are defined in `src/modules/articles/static-articles.ts`:

```typescript
export const STATIC_ARTICLES = {
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
  // ... more articles
};
```

## Component Features

### ArticleComments Component

- **Nested Comments**: Support for replies to comments
- **Real-time Updates**: Comments update automatically after actions
- **User Management**: Edit/delete own comments only
- **Like System**: Like/unlike comments with count display
- **Responsive Design**: Works on mobile and desktop
- **Authentication**: Requires login to comment, public viewing

### ArticleRating Component

- **Star Rating**: 1-5 star visual rating system
- **Helpful Votes**: Thumbs up/down for article helpfulness
- **Optional Feedback**: Text feedback along with rating
- **One Rating Per User**: Users can only rate each article once
- **Visual Feedback**: Shows submitted rating state

### PopularArticles Component

- **Analytics-Driven**: Shows articles based on actual view/rating data
- **Fallback Content**: Shows featured articles if analytics unavailable
- **Timeframe Filtering**: Day, week, month, year, or all-time
- **Category Filtering**: Filter by article category
- **Rich Metadata**: Shows view counts, ratings, read time

## File Structure

```
src/modules/articles/
├── components/
│   ├── article-comments.tsx     # Comments UI component
│   ├── article-rating.tsx       # Rating UI component
│   └── popular-articles.tsx     # Popular articles widget
├── server/
│   └── procedures.ts            # TRPC API endpoints
├── analytics-service.ts         # Analytics business logic
├── comments-service.ts          # Comments business logic
├── schema.ts                    # Database schema & validation
├── static-articles.ts           # Static article definitions
├── types.ts                     # TypeScript types
└── use-article-tracking.ts      # React hook for view tracking
```

## Database Migration

The system automatically creates the necessary database tables. Migration file: `drizzle/0003_cynical_gambit.sql`

To apply migrations:

```bash
npx drizzle-kit migrate
```

Or use push for development:

```bash
npx drizzle-kit push
```

## Best Practices

1. **Article Slugs**: Use consistent, URL-friendly slugs that match your routing
2. **Static Content**: Keep article content in React components for best performance
3. **Analytics Privacy**: View tracking respects user authentication state
4. **Moderation**: Comments support soft deletion for content moderation
5. **Performance**: Popular articles component handles loading and error states

## Analytics Data

The system tracks:

- **View Analytics**: Total views, unique views, reading time, completion rate
- **Engagement**: Ratings, comments, likes
- **Popularity Scoring**: Weighted algorithm for ranking articles
- **User Correlation**: Links views/ratings to user accounts when available
- **Anonymous Tracking**: Supports anonymous view tracking via session IDs

This system provides comprehensive analytics and user engagement features while maintaining the performance benefits of static article content.
