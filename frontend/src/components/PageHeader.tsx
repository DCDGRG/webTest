import { Link } from 'react-router-dom'
import ShaderBackground from './ShaderBackground'
import { isInternalHref } from '../utils/nav'

type PageHeaderVariant = 'default' | 'trust' | 'capability' | 'editorial' | 'catalog' | 'contact'

interface PageHeaderLink {
  label: string
  href: string
  external?: boolean
}

interface PageHeaderMetaItem {
  label: string
  value: string
}

interface PageHeaderProps {
  title: string
  subtitle: string
  kicker?: string
  iconClass?: string
  ctaLabel?: string
  ctaHref?: string
  compact?: boolean
  showLogo?: boolean
  variant?: PageHeaderVariant
  links?: PageHeaderLink[]
  metaItems?: PageHeaderMetaItem[]
}

function HeaderLink({ link }: { link: PageHeaderLink }) {
  if (link.external) {
    return <a className="page-shell-link" href={link.href}>{link.label}</a>
  }

  if (isInternalHref(link.href)) {
    return <Link className="page-shell-link" to={link.href}>{link.label}</Link>
  }

  return <a className="page-shell-link" href={link.href}>{link.label}</a>
}

export default function PageHeader({
  title,
  subtitle,
  kicker,
  iconClass,
  ctaLabel,
  ctaHref,
  compact = false,
  showLogo = false,
  variant = 'default',
  links = [],
  metaItems = []
}: PageHeaderProps) {
  return (
    <>
      <header className={`page-shell-hero page-shell-${variant} ${compact ? 'page-shell-hero-compact' : ''}`}>
        <ShaderBackground />
        <div className="container px-4 px-lg-5">
          <div className={`page-shell-layout ${metaItems.length ? 'page-shell-layout-split' : ''}`}>
            <div className="page-shell-hero-content">
              {kicker ? <p className="page-shell-kicker">{kicker}</p> : null}

              {showLogo ? (
                <div className="page-shell-hero-mark">
                  <img src="/logo.svg" alt={title} />
                </div>
              ) : iconClass ? (
                <div className="page-shell-hero-mark">
                  <i className={`bi ${iconClass}`}></i>
                </div>
              ) : null}

              <h1 className="page-shell-title">{title}</h1>
              <p className="page-shell-subtitle mb-0">{subtitle}</p>

              {ctaLabel && ctaHref ? (
                <div className="page-shell-actions">
                  {isInternalHref(ctaHref) ? (
                    <Link className="btn-cta-primary" to={ctaHref}>{ctaLabel}</Link>
                  ) : (
                    <a className="btn-cta-primary" href={ctaHref}>{ctaLabel}</a>
                  )}
                </div>
              ) : null}

              {links.length ? (
                <div className="page-shell-links">
                  {links.map((link) => (
                    <HeaderLink key={`${link.label}-${link.href}`} link={link} />
                  ))}
                </div>
              ) : null}
            </div>

            {metaItems.length ? (
              <aside className="page-shell-meta">
                {metaItems.map((item) => (
                  <div key={`${item.label}-${item.value}`} className="page-shell-meta-item">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </aside>
            ) : null}
          </div>
        </div>
      </header>
      <div className="page-shell-transition"></div>
    </>
  )
}
