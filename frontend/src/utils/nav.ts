// Routes that render the floating/transparent hero-style navbar.
export const HERO_ROUTES = [
  '/',
  '/about',
  '/pricing',
  '/contact',
  '/faq',
  '/blog-home',
  '/blog-post',
  '/portfolio-overview',
  '/portfolio-item',
]

export function isHeroRoute(pathname: string): boolean {
  return HERO_ROUTES.includes(pathname)
}

// An in-app (router) link starts with "/"; everything else is external/anchor.
export function isInternalHref(href: string): boolean {
  return href.startsWith('/')
}
