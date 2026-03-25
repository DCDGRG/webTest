interface PageHeaderProps {
  title: string
  subtitle: string
  kicker?: string
  iconClass?: string
  ctaLabel?: string
  ctaHref?: string
  compact?: boolean
  showLogo?: boolean
}

export default function PageHeader({
  title,
  subtitle,
  kicker,
  iconClass,
  ctaLabel,
  ctaHref,
  compact = false,
  showLogo = false
}: PageHeaderProps) {
  return (
    <>
      <header className={`page-shell-hero ${compact ? 'page-shell-hero-compact' : ''}`}>
        <div className="container px-4 px-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xxl-7">
              <div className="page-shell-hero-content text-center">
                {kicker && <p className="page-shell-kicker">{kicker}</p>}
                {showLogo ? (
                  <div className="page-shell-hero-mark">
                    <img src="/logo.svg" alt={title} />
                  </div>
                ) : iconClass ? (
                  <div className="page-shell-hero-mark">
                    <i className={`bi ${iconClass}`}></i>
                  </div>
                ) : null}
                <h1 className="page-shell-title text-white">{title}</h1>
                <p className="page-shell-subtitle text-white mb-0">{subtitle}</p>
                {ctaLabel && ctaHref ? (
                  <div className="page-shell-actions">
                    <a className="btn btn-gradient-success btn-lg" href={ctaHref}>{ctaLabel}</a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="page-shell-transition"></div>
    </>
  )
}
