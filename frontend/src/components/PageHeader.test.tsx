import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import PageHeader from './PageHeader'

function renderHeader(props: Parameters<typeof PageHeader>[0]) {
  return render(
    <MemoryRouter>
      <PageHeader {...props} />
    </MemoryRouter>
  )
}

describe('PageHeader', () => {
  it('renders the title and subtitle', () => {
    renderHeader({ title: 'Our Services', subtitle: 'What we do' })
    expect(screen.getByRole('heading', { level: 1, name: 'Our Services' })).toBeInTheDocument()
    expect(screen.getByText('What we do')).toBeInTheDocument()
  })

  it('renders the kicker when provided', () => {
    renderHeader({ title: 'T', subtitle: 'S', kicker: 'Company' })
    expect(screen.getByText('Company')).toBeInTheDocument()
  })

  it('renders an internal CTA as a router Link (no full reload)', () => {
    renderHeader({ title: 'T', subtitle: 'S', ctaLabel: 'Get Started', ctaHref: '/contact' })
    const cta = screen.getByRole('link', { name: 'Get Started' })
    // react-router Links render as <a> but without a full href in MemoryRouter
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/contact')
  })

  it('renders an external CTA as a plain anchor', () => {
    renderHeader({ title: 'T', subtitle: 'S', ctaLabel: 'Download PDF', ctaHref: '#section' })
    const cta = screen.getByRole('link', { name: 'Download PDF' })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '#section')
  })

  it('renders no CTA when ctaLabel or ctaHref is missing', () => {
    renderHeader({ title: 'T', subtitle: 'S', ctaLabel: 'Orphan' })
    expect(screen.queryByRole('link', { name: 'Orphan' })).not.toBeInTheDocument()
  })

  it('renders meta items in the aside', () => {
    renderHeader({
      title: 'T',
      subtitle: 'S',
      metaItems: [
        { label: 'Location', value: 'Shanghai' },
        { label: 'Coverage', value: 'Global' },
      ],
    })
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Shanghai')).toBeInTheDocument()
    expect(screen.getByText('Global')).toBeInTheDocument()
  })

  it('renders external links in the link bar', () => {
    renderHeader({
      title: 'T',
      subtitle: 'S',
      links: [{ label: 'Docs', href: 'https://docs.example.com', external: true }],
    })
    const link = screen.getByRole('link', { name: 'Docs' })
    expect(link).toHaveAttribute('href', 'https://docs.example.com')
  })

  it('applies the compact class modifier when compact=true', () => {
    const { container } = renderHeader({ title: 'T', subtitle: 'S', compact: true })
    expect(container.querySelector('.page-shell-hero-compact')).toBeInTheDocument()
  })

  it('applies the variant class', () => {
    const { container } = renderHeader({ title: 'T', subtitle: 'S', variant: 'contact' })
    expect(container.querySelector('.page-shell-contact')).toBeInTheDocument()
  })
})
