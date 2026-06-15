export function formatDate(dateString: string, locale: string): string {
  const lang = locale === 'zh-CN' ? 'zh-CN' : 'en-US'
  return new Date(dateString).toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
