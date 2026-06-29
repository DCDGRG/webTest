import { describe, it, expect } from 'vitest'
import { isHeroRoute, isInternalHref, HERO_ROUTES } from './nav'

describe('isHeroRoute', () => {
  it('is true for known hero routes', () => {
    expect(isHeroRoute('/')).toBe(true)
    expect(isHeroRoute('/about')).toBe(true)
    expect(isHeroRoute('/blog-home')).toBe(true)
  })

  it('is false for non-hero routes', () => {
    expect(isHeroRoute('/news/abc')).toBe(false)
    expect(isHeroRoute('/admin')).toBe(false)
    expect(isHeroRoute('/nope')).toBe(false)
  })

  it('matches every route listed in HERO_ROUTES', () => {
    expect(HERO_ROUTES.every(isHeroRoute)).toBe(true)
  })
})

describe('isInternalHref', () => {
  it('treats "/" paths as internal', () => {
    expect(isInternalHref('/about')).toBe(true)
    expect(isInternalHref('/news/123')).toBe(true)
  })

  it('treats absolute urls and anchors as external', () => {
    expect(isInternalHref('https://example.com')).toBe(false)
    expect(isInternalHref('#section')).toBe(false)
    expect(isInternalHref('mailto:a@b.com')).toBe(false)
  })
})
