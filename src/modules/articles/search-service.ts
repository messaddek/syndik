import { STATIC_ARTICLES } from './static-articles';

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  popular: boolean;
  featured: boolean;
  relevanceScore: number;
  highlightedTitle?: string;
  highlightedDescription?: string;
}

export interface SearchInput {
  query: string;
  category?: string;
  locale?: string;
  limit?: number;
  offset?: number;
}

export class ArticleSearchService {
  /**
   * Search articles with internationalization support
   */
  static searchArticles(
    input: SearchInput,
    translations: {
      articleTitles: Record<string, string>;
      articleDescriptions: Record<string, string>;
    }
  ): SearchResult[] {
    const { query, category, limit = 20, offset = 0 } = input;

    const searchQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search through all static articles
    for (const [slug, article] of Object.entries(STATIC_ARTICLES)) {
      // Filter by category if specified
      if (category && article.category !== category) continue;

      // Get localized content
      const localizedTitle = translations.articleTitles[slug] || article.title;
      const localizedDescription =
        translations.articleDescriptions[slug] || article.description;

      // Calculate relevance score
      const relevanceScore = this.calculateRelevanceScore({
        query: searchQuery,
        title: localizedTitle.toLowerCase(),
        description: localizedDescription.toLowerCase(),
        tags: article.tags,
        category: article.category,
      });

      // Only include if relevance score > 0
      if (relevanceScore > 0) {
        results.push({
          slug,
          title: localizedTitle,
          description: localizedDescription,
          category: article.category,
          readTime: article.readTime,
          popular: article.popular,
          featured: article.featured,
          relevanceScore,
          highlightedTitle: this.highlightText(localizedTitle, searchQuery),
          highlightedDescription: this.highlightText(
            localizedDescription,
            searchQuery
          ),
        });
      }
    }

    // Sort by relevance score (descending) and apply pagination
    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(offset, offset + limit);
  }

  /**
   * Calculate relevance score for search results
   */ private static calculateRelevanceScore({
    query,
    title,
    description,
    tags,
    category,
  }: {
    query: string;
    title: string;
    description: string;
    tags: readonly string[];
    category: string;
  }): number {
    let score = 0;

    // Exact title match (highest priority)
    if (title.includes(query)) {
      score += title === query ? 100 : 50;
    }

    // Title word matches
    const titleWords = title.split(' ');
    const queryWords = query.split(' ');
    for (const word of queryWords) {
      if (titleWords.some(titleWord => titleWord.includes(word))) {
        score += 20;
      }
    }

    // Description matches
    if (description.includes(query)) {
      score += 15;
    }

    // Tag matches
    for (const tag of tags) {
      if (tag.toLowerCase().includes(query)) {
        score += 10;
      }
    }

    // Category match
    if (category.toLowerCase().includes(query)) {
      score += 8;
    }

    // Partial word matches in description
    for (const word of queryWords) {
      if (description.includes(word)) {
        score += 5;
      }
    }

    return score;
  }

  /**
   * Highlight search terms in text
   */
  private static highlightText(text: string, query: string): string {
    if (!query) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi'
    );
    return text.replace(
      regex,
      '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
    );
  }

  /**
   * Get search suggestions/autocomplete
   */
  static getSearchSuggestions(
    query: string,
    translations: { articleTitles: Record<string, string> },
    limit = 5
  ): string[] {
    const searchQuery = query.toLowerCase();
    const suggestions = new Set<string>();

    // Get suggestions from article titles
    Object.values(translations.articleTitles).forEach(title => {
      const titleLower = title.toLowerCase();
      if (titleLower.includes(searchQuery)) {
        suggestions.add(title);
      }
    });

    // Get suggestions from tags
    Object.values(STATIC_ARTICLES).forEach(article => {
      article.tags.forEach(tag => {
        if (tag.toLowerCase().includes(searchQuery)) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }
}
