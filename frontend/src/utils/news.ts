import type { NewsItem } from '../types/News'

// Filter a news list by category (optional) and cap it to `limit` (optional).
export function selectNews(
  news: NewsItem[],
  options: { category?: string; limit?: number } = {}
): NewsItem[] {
  const { category, limit } = options
  const filtered = category ? news.filter((item) => item.category === category) : news
  return typeof limit === 'number' && limit > 0 ? filtered.slice(0, limit) : filtered
}

// Split an article body into trimmed, non-empty paragraphs (blank line = break).
export function splitParagraphs(text: string | null | undefined): string[] {
  return (text ?? '')
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)
}

export function categoryLabel(category: string, isZh: boolean): string {
  if (category === 'technical') return isZh ? '技术文章' : 'Technical'
  return isZh ? '行业资讯' : 'Industry'
}

export function categoryListHref(category: string): string {
  return category === 'technical' ? '/blog-home' : '/blog-post'
}

// Aggregated feed items have no owned body (`content`), so they link out to the
// original source; owned articles (with content) open the on-site page.
export function isExternalNews(item: Pick<NewsItem, 'content'>): boolean {
  return !item.content
}
