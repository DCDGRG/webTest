import { describe, it, expect } from 'vitest'
import { selectNews, splitParagraphs, categoryLabel, categoryListHref, isExternalNews } from './news'
import type { NewsItem } from '../types/News'

const make = (id: string, category: string): NewsItem => ({
  id,
  title: id,
  summary: '',
  url: '',
  published_at: '2026-01-01T00:00:00Z',
  source_name: 's',
  category,
  created_at: '2026-01-01T00:00:00Z',
})

const news: NewsItem[] = [make('a', 'technical'), make('b', 'industry'), make('c', 'technical')]

describe('selectNews', () => {
  it('returns all items when no options are given', () => {
    expect(selectNews(news)).toHaveLength(3)
  })

  it('filters by category', () => {
    expect(selectNews(news, { category: 'technical' }).map((n) => n.id)).toEqual(['a', 'c'])
  })

  it('caps the list to the limit', () => {
    expect(selectNews(news, { limit: 2 })).toHaveLength(2)
  })

  it('applies category and limit together', () => {
    expect(selectNews(news, { category: 'technical', limit: 1 }).map((n) => n.id)).toEqual(['a'])
  })

  it('treats a zero or missing limit as "all"', () => {
    expect(selectNews(news, { limit: 0 })).toHaveLength(3)
  })
})

describe('splitParagraphs', () => {
  it('splits on blank lines and trims each paragraph', () => {
    expect(splitParagraphs('one\n\n  two  \n\nthree')).toEqual(['one', 'two', 'three'])
  })

  it('drops empty segments from repeated blank lines', () => {
    expect(splitParagraphs('a\n\n\n\nb')).toEqual(['a', 'b'])
  })

  it('returns an empty array for null, undefined, or empty input', () => {
    expect(splitParagraphs(null)).toEqual([])
    expect(splitParagraphs(undefined)).toEqual([])
    expect(splitParagraphs('')).toEqual([])
  })
})

describe('categoryLabel', () => {
  it('labels technical articles', () => {
    expect(categoryLabel('technical', false)).toBe('Technical')
    expect(categoryLabel('technical', true)).toBe('技术文章')
  })

  it('labels everything else as industry', () => {
    expect(categoryLabel('industry', false)).toBe('Industry')
    expect(categoryLabel('industry', true)).toBe('行业资讯')
  })
})

describe('categoryListHref', () => {
  it('maps technical to /blog-home and others to /blog-post', () => {
    expect(categoryListHref('technical')).toBe('/blog-home')
    expect(categoryListHref('industry')).toBe('/blog-post')
  })
})

describe('isExternalNews', () => {
  it('is true for aggregated items without owned content', () => {
    expect(isExternalNews({ content: null })).toBe(true)
    expect(isExternalNews({ content: '' })).toBe(true)
    expect(isExternalNews({ content: undefined })).toBe(true)
  })

  it('is false for owned articles with content', () => {
    expect(isExternalNews({ content: 'A full body.' })).toBe(false)
  })
})
