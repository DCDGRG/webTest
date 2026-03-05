import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeLanguageSwitcher from './components/ThemeLanguageSwitcher'

// Lazy load pages for code splitting
const About = lazy(() => import('./pages/About'))
const Pricing = lazy(() => import('./pages/Pricing'))
const FAQ = lazy(() => import('./pages/FAQ'))
const BlogHome = lazy(() => import('./pages/BlogHome'))
const IndustryNews = lazy(() => import('./pages/IndustryNews'))
const PortfolioOverview = lazy(() => import('./pages/PortfolioOverview'))
const PortfolioItem = lazy(() => import('./pages/PortfolioItem'))
const Contact = lazy(() => import('./pages/Contact'))

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminNewsList = lazy(() => import('./pages/admin/NewsList'))
const AdminNewsEdit = lazy(() => import('./pages/admin/NewsEdit'))
const AdminSettings = lazy(() => import('./pages/admin/Settings'))

// Loading fallback component
function PageLoader() {
  const { t } = useTranslation()
  return (
    <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '50vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{t('common.loading')}</span>
      </div>
    </div>
  )
}

function Navbar() {
  const { isAuthenticated, admin, logout } = useAuth()
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Helper to check if a path is active
  const isActive = (path: string) => location.pathname === path
  const isDropdownActive = (paths: string[]) => paths.some(p => location.pathname === p)

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand text-dark fw-bold d-flex align-items-center" to="/">
          <img src="/logo.svg" alt={t('nav.brand')} className="me-2" style={{ height: '32px', width: 'auto' }} />
          {t('nav.brand')}
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`} to="/">{t('nav.home')}</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`} to="/about">{t('nav.about')}</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/pricing') ? 'nav-link-active' : ''}`} to="/pricing">{t('nav.products')}</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`} to="/contact">{t('nav.contact')}</Link>
            </li>
            <li className={`nav-item dropdown ${isDropdownActive(['/blog-home', '/blog-post']) ? 'dropdown-active' : ''}`}>
              <a className={`nav-link dropdown-toggle ${isDropdownActive(['/blog-home', '/blog-post']) ? 'nav-link-active' : ''}`} id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{t('nav.techNews')}</a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                <li><Link className={`dropdown-item ${isActive('/blog-home') ? 'active' : ''}`} to="/blog-home">{t('nav.techArticles')}</Link></li>
                <li><Link className={`dropdown-item ${isActive('/blog-post') ? 'active' : ''}`} to="/blog-post">{t('nav.industryNews')}</Link></li>
              </ul>
            </li>
            <li className={`nav-item dropdown ${isDropdownActive(['/portfolio-overview', '/portfolio-item']) ? 'dropdown-active' : ''}`}>
              <a className={`nav-link dropdown-toggle ${isDropdownActive(['/portfolio-overview', '/portfolio-item']) ? 'nav-link-active' : ''}`} id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{t('nav.portfolio')}</a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                <li><Link className={`dropdown-item ${isActive('/portfolio-overview') ? 'active' : ''}`} to="/portfolio-overview">{t('nav.portfolioOverview')}</Link></li>
                <li><Link className={`dropdown-item ${isActive('/portfolio-item') ? 'active' : ''}`} to="/portfolio-item">{t('nav.portfolioItem')}</Link></li>
              </ul>
            </li>
          </ul>
          <div className="navbar-controls">
            <ThemeLanguageSwitcher />
            <div className="vr d-none d-lg-block"></div>
            {isAuthenticated ? (
              <div className="btn-group btn-group-sm">
                <Link to="/admin" className="btn btn-outline-primary">
                  <i className="bi bi-speedometer2 me-1"></i>{admin?.username}
                </Link>
                <button className="btn btn-outline-primary" onClick={logout} title={t('common.logout')}>
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            ) : (
              <Link to="/admin/login" className="btn btn-login btn-sm">
                <i className="bi bi-person-fill me-1"></i>{t('common.login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="light-teal-bg py-4 mt-auto border-top">
      <div className="container px-5">
        <div className="row align-items-center justify-content-between flex-column flex-sm-row">
          <div className="col-auto d-flex align-items-center">
            <img src="/logo.svg" alt={t('nav.brand')} className="me-2" style={{ height: '24px', width: 'auto' }} />
            <div className="small m-0 text-dark">{t('footer.copyright')} {new Date().getFullYear()}</div>
          </div>
          <div className="col-auto">
            <a className="text-dark small text-decoration-none" href="#">{t('footer.privacy')}</a>
            <span className="text-dark mx-1">&middot;</span>
            <a className="text-dark small text-decoration-none" href="#">{t('footer.terms')}</a>
            <span className="text-dark mx-1">&middot;</span>
            <a className="text-dark small text-decoration-none" href="#">{t('nav.contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language === 'zh-CN' || i18n.language === 'zh'

  const services = [
    {
      icon: 'bi-gear-fill',
      title: t('features.moldMaking.title'),
      description: t('features.moldMaking.description'),
      tags: isZh ? ['CNC加工', '精密模具', '高精度'] : ['CNC', 'Precision Mold', 'High Accuracy']
    },
    {
      icon: 'bi-droplet-fill',
      title: t('features.injection.title'),
      description: t('features.injection.description'),
      tags: isZh ? ['50T-800T', '双色注塑', '医疗级'] : ['50T-800T', 'Two-color', 'Medical Grade']
    },
    {
      icon: 'bi-palette-fill',
      title: t('features.surface.title'),
      description: t('features.surface.description'),
      tags: isZh ? ['无尘喷漆', 'UV工艺', '丝印'] : ['Clean Spray', 'UV Process', 'Silk Screen']
    },
    {
      icon: 'bi-tools',
      title: t('features.assembly.title'),
      description: t('features.assembly.description'),
      tags: isZh ? ['超声波焊接', '三坐标检测', '组装'] : ['Ultrasonic', 'CMM Testing', 'Assembly']
    }
  ]

  const trustItems = isZh ? [
    { icon: 'bi-shield-check', text: 'ISO9001 / IATF16949 / ISO13485' },
    { icon: 'bi-truck', text: '全球交付能力' },
    { icon: 'bi-precision', text: '±0.01mm 精度' },
    { icon: 'bi-building', text: '10万级无尘车间' }
  ] : [
    { icon: 'bi-shield-check', text: 'ISO9001 / IATF16949 / ISO13485' },
    { icon: 'bi-truck', text: 'Global Delivery' },
    { icon: 'bi-precision', text: '±0.01mm Precision' },
    { icon: 'bi-building', text: 'Class 100K Clean Room' }
  ]

  return (
    <>
      {/* Hero Section */}
      <header className="bg-primary homepage-hero">
        <div className="container px-4 px-lg-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="py-5 text-center text-lg-start">
                <h1 className="hero-title text-white">{t('hero.title')}</h1>
                <p className="hero-subtitle text-white">{t('hero.subtitle')}</p>

                {/* Trust Indicators */}
                <div className="trust-indicators">
                  {trustItems.map((item, i) => (
                    <div key={i} className="trust-item">
                      <i className={`bi ${item.icon}`}></i>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="hero-cta">
                  <a className="btn-cta-primary" href="#features">
                    {isZh ? '了解我们的服务' : 'Explore Our Services'}
                  </a>
                  <a className="btn-cta-secondary" href="/about">
                    {t('hero.aboutUs')}
                  </a>
                  <a className="btn-cta-link" href="/contact">
                    {isZh ? '获取报价' : 'Get a Quote'} <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="hero-image-container text-center">
                <img
                  className="hero-image img-fluid"
                  src="https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                  alt={isZh ? '精密制造' : 'Precision Manufacturing'}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero to Section Transition */}
      <div className="hero-transition"></div>

      {/* Services Section */}
      <section className="services-section bg-light" id="features">
        <div className="container px-4 px-lg-5">
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="section-header">
                <h2 className="section-title">{t('features.title')}</h2>
                <p className="section-subtitle">
                  {isZh ? '一站式精密制造解决方案' : 'One-stop precision manufacturing solutions'}
                </p>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-4">
                {services.map((service, i) => (
                  <div key={i} className="col-md-6">
                    <div className="service-card">
                      <div className="service-icon">
                        <i className={`bi ${service.icon}`}></i>
                      </div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                      <div className="industry-tags">
                        {service.tags.map((tag, j) => (
                          <span key={j} className="industry-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider-gradient"></div>

      {/* Testimonial Section */}
      <section className="testimonial-section py-5">
        <div className="container px-4 px-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              <div className="text-center">
                <p className="testimonial-quote mb-4">"{t('testimonial.quote')}"</p>
                <div className="d-flex align-items-center justify-content-center">
                  <img className="rounded-circle me-3" src="https://dummyimage.com/48x48/ced4da/6c757d" alt="" style={{ width: '48px', height: '48px' }} />
                  <div className="text-start">
                    <div className="fw-bold">{t('testimonial.name')}</div>
                    <div className="text-muted small">{t('testimonial.title')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Layout wrapper that conditionally shows navbar/footer
function AppLayout() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="d-flex flex-column h-100 min-vh-100">
      <main className="flex-shrink-0">
        {!isAdminRoute && <Navbar />}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog-home" element={<BlogHome />} />
            <Route path="/blog-post" element={<IndustryNews />} />
            <Route path="/portfolio-overview" element={<PortfolioOverview />} />
            <Route path="/portfolio-item" element={<PortfolioItem />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/news" element={<ProtectedRoute><AdminNewsList /></ProtectedRoute>} />
            <Route path="/admin/news/new" element={<ProtectedRoute><AdminNewsEdit /></ProtectedRoute>} />
            <Route path="/admin/news/:id/edit" element={<ProtectedRoute><AdminNewsEdit /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
