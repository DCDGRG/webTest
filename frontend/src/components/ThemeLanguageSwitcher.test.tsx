import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  changeLanguage: vi.fn(),
  toggleTheme: vi.fn(),
  state: { lang: 'en-US', theme: 'light' as 'light' | 'dark' },
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      get language() {
        return mocks.state.lang
      },
      changeLanguage: mocks.changeLanguage,
    },
  }),
}))

vi.mock('../contexts/ThemeContext', () => ({
  useTheme: () => ({ theme: mocks.state.theme, toggleTheme: mocks.toggleTheme }),
}))

import ThemeLanguageSwitcher from './ThemeLanguageSwitcher'

describe('ThemeLanguageSwitcher', () => {
  beforeEach(() => {
    mocks.changeLanguage.mockClear()
    mocks.toggleTheme.mockClear()
    mocks.state.lang = 'en-US'
    mocks.state.theme = 'light'
  })

  it('shows the 中 label in English and switches to Chinese on click', () => {
    render(<ThemeLanguageSwitcher />)
    const langButton = screen.getByTitle('切换到中文')
    expect(langButton).toHaveTextContent('中')
    fireEvent.click(langButton)
    expect(mocks.changeLanguage).toHaveBeenCalledWith('zh-CN')
  })

  it('shows the EN label in Chinese and switches to English on click', () => {
    mocks.state.lang = 'zh-CN'
    render(<ThemeLanguageSwitcher />)
    const langButton = screen.getByTitle('Switch to English')
    expect(langButton).toHaveTextContent('EN')
    fireEvent.click(langButton)
    expect(mocks.changeLanguage).toHaveBeenCalledWith('en-US')
  })

  it('calls toggleTheme when the theme button is clicked', () => {
    render(<ThemeLanguageSwitcher />)
    fireEvent.click(screen.getByTitle('Dark mode'))
    expect(mocks.toggleTheme).toHaveBeenCalledTimes(1)
  })
})
