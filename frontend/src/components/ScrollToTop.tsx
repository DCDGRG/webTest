import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router does not reset scroll on navigation. Without this, clicking a nav
// link keeps the previous scroll position, so the new page opens mid-content and
// the visitor never sees its header. Reset to the top on every route change.
// In-page anchors (location.hash) scroll to their target instead — offset by the
// CSS scroll-padding-top so the heading clears the fixed navbar.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    // Direct assignment is instant (bypasses html { scroll-behavior: smooth }).
    document.documentElement.scrollTop = 0
  }, [pathname, hash])

  return null
}
