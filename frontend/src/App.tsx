import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
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

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container px-5">
        <Link className="navbar-brand text-dark fw-bold d-flex align-items-center" to="/">
          <img src="/logo.svg" alt={t('nav.brand')} className="me-2" style={{ height: '32px', width: 'auto' }} />
          {t('nav.brand')}
        </Link>
        <button
          className="navbar-toggler"
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
            <li className="nav-item"><Link className="nav-link text-dark" to="/">{t('nav.home')}</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/about">{t('nav.about')}</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/pricing">{t('nav.products')}</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/contact">{t('nav.contact')}</Link></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-dark" id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{t('nav.techNews')}</a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                <li><Link className="dropdown-item" to="/blog-home">{t('nav.techArticles')}</Link></li>
                <li><Link className="dropdown-item" to="/blog-post">{t('nav.industryNews')}</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-dark" id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{t('nav.portfolio')}</a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                <li><Link className="dropdown-item" to="/portfolio-overview">{t('nav.portfolioOverview')}</Link></li>
                <li><Link className="dropdown-item" to="/portfolio-item">{t('nav.portfolioItem')}</Link></li>
              </ul>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-3 gap-2">
            <ThemeLanguageSwitcher />
            {isAuthenticated ? (
              <>
                <Link to="/admin" className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-speedometer2 me-1"></i>{admin?.username}
                </Link>
                <button className="btn btn-outline-secondary btn-sm" onClick={logout}>
                  {t('common.logout')}
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="btn btn-primary btn-sm">
                <i className="bi bi-person me-1"></i>{t('common.login')}
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
            <div className="small m-0 text-dark">{t('footer.copyright')} {new Date().getFullYear()} <span className="text-danger">❤️</span></div>
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
  const { t } = useTranslation()

  const features = [
    { icon: 'bi-gear-fill', title: t('features.moldMaking.title'), description: t('features.moldMaking.description') },
    { icon: 'bi-droplet-fill', title: t('features.injection.title'), description: t('features.injection.description') },
    { icon: 'bi-palette-fill', title: t('features.surface.title'), description: t('features.surface.description') },
    { icon: 'bi-tools', title: t('features.assembly.title'), description: t('features.assembly.description') }
  ]

  return (
    <>
      <header className="bg-primary py-5 hero">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className="my-5 text-center text-xl-start">
                <h1 className="display-5 fw-bolder text-white mb-2">{t('hero.title')}</h1>
                <p className="lead fw-normal text-white mb-4">{t('hero.subtitle')}</p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  <a className="btn btn-cta btn-lg px-4 me-sm-3" href="#features">✨ {t('hero.learnServices')}</a>
                  <a className="btn btn-outline-light btn-lg px-4" href="/about">{t('hero.aboutUs')}</a>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <div className="d-flex flex-column align-items-center">
                <img src="/logo.svg" alt={t('nav.brand')} className="mb-4" style={{ height: '120px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
                <img className="img-fluid rounded-3 my-3" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt={t('hero.title')} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 bg-light" id="features">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0"><h2 className="fw-bolder mb-0 gradient-text">{t('features.title')}</h2></div>
            <div className="col-lg-8">
              <div className="row gx-5 row-cols-1 row-cols-md-2">
                {features.map((feature, i) => (
                  <div key={i} className="col mb-5 h-100">
                    <div className="feature bg-success bg-gradient text-white rounded-3 mb-3 elegant-shadow"><i className={`bi ${feature.icon}`}></i></div>
                    <h2 className="h5">{feature.title}</h2>
                    <p className="mb-0">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-5 light-teal-bg">
        <div className="container px-5 my-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-10 col-xl-7">
              <div className="text-center">
                <div className="fs-4 mb-4 fst-italic">"{t('testimonial.quote')}"</div>
                <div className="d-flex align-items-center justify-content-center">
                  <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="" />
                  <div className="fw-bold">
                    {t('testimonial.name')}
                    <span className="fw-bold text-primary mx-1">/</span>
                    {t('testimonial.title')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
