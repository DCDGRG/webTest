export function isZhLocale(lang: string): boolean {
  return lang === 'zh-CN' || lang === 'zh'
}

// The language to switch to from the current one (binary zh-CN <-> en-US toggle).
export function nextLanguage(lang: string): 'en-US' | 'zh-CN' {
  return lang === 'zh-CN' ? 'en-US' : 'zh-CN'
}
