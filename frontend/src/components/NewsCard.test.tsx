import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import NewsCard from './NewsCard'
import type { NewsItem } from '../types/News'

// i18next in tests: stub the hook so we don't need a full provider
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en-US' },
  }),
}))

const baseItem: NewsItem = {
  id: '1',
  title: 'Precision Molding Trends',
  summary: 'New techniques in micro-precision molding.',
  url: 'https://example.com/article',
  published_at: '2025-06-15T12:00:00Z',
  source_name: 'Mold Tech Weekly',
  category: 'technical',
  created_at: '2025-06-15T12:00:00Z',
}

describe('NewsCard', () => {
  it('renders the article title as a link to the source URL', () => {
    render(<NewsCard item={baseItem} />)
    const link = screen.getByRole('link', { name: /Precision Molding Trends/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com/article')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders the source name as a badge', () => {
    render(<NewsCard item={baseItem} />)
    expect(screen.getByText('Mold Tech Weekly')).toBeInTheDocument()
  })

  it('renders the formatted publication date', () => {
    render(<NewsCard item={baseItem} />)
    // The date should contain the year at minimum
    expect(screen.getByText(/2025/)).toBeInTheDocument()
  })

  it('renders the summary when provided', () => {
    render(<NewsCard item={baseItem} />)
    expect(screen.getByText('New techniques in micro-precision molding.')).toBeInTheDocument()
  })

  it('does not render a summary element when summary is absent', () => {
    const noSummary: NewsItem = { ...baseItem, summary: undefined as unknown as string }
    render(<NewsCard item={noSummary} />)
    expect(screen.queryByText(/techniques/i)).not.toBeInTheDocument()
  })

  it('renders an image when image_url is provided', () => {
    const withImage: NewsItem = { ...baseItem, image_url: 'https://example.com/img.jpg' }
    render(<NewsCard item={withImage} />)
    const img = screen.getByRole('img', { name: /Precision Molding Trends/i })
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg')
  })

  it('does not render an image when image_url is absent', () => {
    render(<NewsCard item={baseItem} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
