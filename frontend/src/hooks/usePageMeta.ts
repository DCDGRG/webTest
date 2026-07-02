import { useEffect } from 'react'

// Per-route document title + meta description (also mirrored to Open Graph).
// This is the client-side equivalent of react-helmet — appropriate for this
// CSR app and avoids an extra dependency. Every page should call it so each
// route gets a unique, descriptive title instead of the static index.html one.

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    upsertMeta('property', 'og:title', title)
    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
    }
  }, [title, description])
}
