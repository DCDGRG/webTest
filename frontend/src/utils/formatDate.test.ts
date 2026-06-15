import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

// Use a midday UTC timestamp so local timezone never shifts the calendar date
const TEST_DATE = '2024-06-15T12:00:00Z'

describe('formatDate', () => {
  it('formats a date in English locale and includes the year', () => {
    const result = formatDate(TEST_DATE, 'en-US')
    expect(result).toContain('2024')
  })

  it('formats a date in Chinese locale and includes the year', () => {
    const result = formatDate(TEST_DATE, 'zh-CN')
    expect(result).toContain('2024')
  })

  it('uses en-US for any non-zh-CN locale', () => {
    const enResult = formatDate(TEST_DATE, 'fr-FR')
    const enUsResult = formatDate(TEST_DATE, 'en-US')
    expect(enResult).toBe(enUsResult)
  })

  it('produces different output for zh-CN vs en-US', () => {
    const zhResult = formatDate(TEST_DATE, 'zh-CN')
    const enResult = formatDate(TEST_DATE, 'en-US')
    expect(zhResult).not.toBe(enResult)
  })
})
