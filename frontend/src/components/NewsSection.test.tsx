import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import NewsSection from './NewsSection'
import type { NewsItem } from '../types/News'

// Stub i18n so NewsSection + NewsCard render without a provider.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'en-US' } }),
}))

const make = (id: string, title: string, category: string): NewsItem => ({
  id,
  title,
  summary: 's',
  url: '',
  published_at: '2026-06-01T12:00:00Z',
  source_name: 'Src',
  category,
  created_at: '2026-06-01T12:00:00Z',
})

const items: NewsItem[] = [
  make('t1', 'Tech One', 'technical'),
  make('i1', 'Industry One', 'industry'),
  make('t2', 'Tech Two', 'technical'),
]

const stubFetch = (data: NewsItem[]) =>
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(data) })
  )

const renderSection = (props: Record<string, unknown> = {}) =>
  render(
    <MemoryRouter>
      <NewsSection {...props} />
    </MemoryRouter>
  )

beforeEach(() => stubFetch(items))
afterEach(() => vi.unstubAllGlobals())

describe('NewsSection', () => {
  it('renders all news cards after loading', async () => {
    renderSection()
    expect(await screen.findByText('Tech One')).toBeInTheDocument()
    expect(screen.getByText('Industry One')).toBeInTheDocument()
    expect(screen.getByText('Tech Two')).toBeInTheDocument()
  })

  it('shows only the matching category when filtered', async () => {
    renderSection({ category: 'technical' })
    expect(await screen.findByText('Tech One')).toBeInTheDocument()
    expect(screen.getByText('Tech Two')).toBeInTheDocument()
    expect(screen.queryByText('Industry One')).not.toBeInTheDocument()
  })

  it('respects the limit prop', async () => {
    renderSection({ limit: 1 })
    expect(await screen.findByText('Tech One')).toBeInTheDocument()
    expect(screen.queryByText('Industry One')).not.toBeInTheDocument()
    expect(screen.queryByText('Tech Two')).not.toBeInTheDocument()
  })

  it('shows the empty state when there are no items', async () => {
    stubFetch([])
    renderSection()
    expect(await screen.findByText('blog.noNews')).toBeInTheDocument()
  })
})
