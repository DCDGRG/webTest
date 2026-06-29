import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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

// NewsCard uses a router <Link>, so it needs a Router in tests.
const renderCard = (item: NewsItem) =>
  render(
    <MemoryRouter>
      <NewsCard item={item} />
    </MemoryRouter>
  )

describe('NewsCard', () => {
  it('links an aggregated item (no content) out to the original source', () => {
    renderCard(baseItem)
    const link = screen.getByRole('link', { name: /Precision Molding Trends/i })
    expect(link).toHaveAttribute('href', 'https://example.com/article')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('links an owned article (with content) to the internal article page', () => {
    renderCard({ ...baseItem, content: 'Full body text here.' })
    const link = screen.getByRole('link', { name: /Precision Molding Trends/i })
    expect(link).toHaveAttribute('href', '/news/1')
    expect(link).not.toHaveAttribute('target', '_blank')
  })

  it('renders a "read more" footer that is itself a link to the source', () => {
    renderCard(baseItem)
    const readMore = screen.getByRole('link', { name: /common\.readMore/i })
    expect(readMore).toHaveAttribute('href', 'https://example.com/article')
    expect(readMore).toHaveAttribute('target', '_blank')
  })

  it('"read more" links to the internal page for an owned article', () => {
    renderCard({ ...baseItem, content: 'Full body text here.' })
    const readMore = screen.getByRole('link', { name: /common\.readMore/i })
    expect(readMore).toHaveAttribute('href', '/news/1')
  })

  it('renders the source name as a badge', () => {
    renderCard(baseItem)
    expect(screen.getByText('Mold Tech Weekly')).toBeInTheDocument()
  })

  it('renders the formatted publication date', () => {
    renderCard(baseItem)
    // The date should contain the year at minimum
    expect(screen.getByText(/2025/)).toBeInTheDocument()
  })

  it('renders the summary when provided', () => {
    renderCard(baseItem)
    expect(screen.getByText('New techniques in micro-precision molding.')).toBeInTheDocument()
  })

  it('does not render a summary element when summary is absent', () => {
    renderCard({ ...baseItem, summary: undefined as unknown as string })
    expect(screen.queryByText(/techniques/i)).not.toBeInTheDocument()
  })

  it('renders an image when image_url is provided', () => {
    renderCard({ ...baseItem, image_url: 'https://example.com/img.jpg' })
    const img = screen.getByRole('img', { name: /Precision Molding Trends/i })
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg')
  })

  it('does not render an image when image_url is absent', () => {
    renderCard(baseItem)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
