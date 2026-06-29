export type Theme = 'light' | 'dark'

export const THEME_KEY = 'theme'

// Resolve the starting theme: a valid stored choice wins, otherwise fall back
// to the OS preference, otherwise light.
export function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function nextTheme(theme: Theme): Theme {
  return theme === 'light' ? 'dark' : 'light'
}
