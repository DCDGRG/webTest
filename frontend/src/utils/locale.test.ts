import { describe, it, expect } from 'vitest'
import { isZhLocale, nextLanguage } from './locale'

describe('isZhLocale', () => {
  it('returns true for zh-CN', () => {
    expect(isZhLocale('zh-CN')).toBe(true)
  })

  it('returns true for zh (bare code)', () => {
    expect(isZhLocale('zh')).toBe(true)
  })

  it('returns false for en-US', () => {
    expect(isZhLocale('en-US')).toBe(false)
  })

  it('returns false for an empty string', () => {
    expect(isZhLocale('')).toBe(false)
  })

  it('returns false for zh-TW (Traditional Chinese uses a different detection path)', () => {
    expect(isZhLocale('zh-TW')).toBe(false)
  })
})

describe('nextLanguage', () => {
  it('switches from zh-CN to en-US', () => {
    expect(nextLanguage('zh-CN')).toBe('en-US')
  })

  it('switches any non-zh-CN value to zh-CN', () => {
    expect(nextLanguage('en-US')).toBe('zh-CN')
    expect(nextLanguage('fr-FR')).toBe('zh-CN')
  })
})
