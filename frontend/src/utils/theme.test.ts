import { describe, it, expect, afterEach, vi } from 'vitest'
import { getInitialTheme, nextTheme } from './theme'

// jsdom's Storage is only partially implemented here, so stub it fully.
function stubStorage(initial: Record<string, string> = {}) {
  const store: Record<string, string> = { ...initial }
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => (k in store ? store[k] : null),
    setItem: (k: string, v: string) => {
      store[k] = v
    },
    removeItem: (k: string) => {
      delete store[k]
    },
    clear: () => {
      for (const k of Object.keys(store)) delete store[k]
    },
  })
}

const stubPrefersDark = (matches: boolean) =>
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches })))

describe('getInitialTheme', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('returns a valid stored theme', () => {
    stubStorage({ theme: 'dark' })
    stubPrefersDark(false)
    expect(getInitialTheme()).toBe('dark')
  })

  it('falls back to the OS preference when nothing is stored', () => {
    stubStorage()
    stubPrefersDark(true)
    expect(getInitialTheme()).toBe('dark')
  })

  it('defaults to light when nothing is stored and the OS prefers light', () => {
    stubStorage()
    stubPrefersDark(false)
    expect(getInitialTheme()).toBe('light')
  })

  it('ignores an invalid stored value and uses the OS preference', () => {
    stubStorage({ theme: 'banana' })
    stubPrefersDark(true)
    expect(getInitialTheme()).toBe('dark')
  })
})

describe('nextTheme', () => {
  it('toggles between light and dark', () => {
    expect(nextTheme('light')).toBe('dark')
    expect(nextTheme('dark')).toBe('light')
  })
})
