import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

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
  return (
    <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '50vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

function Navbar() {
  const { isAuthenticated, admin, logout } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container px-5">
        <Link className="navbar-brand text-dark fw-bold d-flex align-items-center" to="/">
          <img src="/logo.svg" alt="奎星" className="me-2" style={{ height: '32px', width: 'auto' }} />
          上海奎星
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
            <li className="nav-item"><Link className="nav-link text-dark" to="/">首页</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/about">关于我们</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/pricing">产品服务</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/contact">联系我们</Link></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-dark" id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">技术资讯</a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                <li><Link className="dropdown-item" to="/blog-home">技术文章</Link></li>
                <li><Link className="dropdown-item" to="/blog-post">行业动态</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-dark" id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">产品展示</a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                <li><Link className="dropdown-item" to="/portfolio-overview">产品总览</Link></li>
                <li><Link className="dropdown-item" to="/portfolio-item">产品详情</Link></li>
              </ul>
            </li>
          </ul>
          {isAuthenticated ? (
            <div className="d-flex align-items-center ms-3">
              <Link to="/admin" className="btn btn-outline-primary btn-sm me-2">
                <i className="bi bi-speedometer2 me-1"></i>{admin?.username}
              </Link>
              <button className="btn btn-outline-secondary btn-sm" onClick={logout}>
                退出
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="btn btn-primary btn-sm ms-3">
              <i className="bi bi-person me-1"></i>登录
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="light-teal-bg py-4 mt-auto border-top">
      <div className="container px-5">
        <div className="row align-items-center justify-content-between flex-column flex-sm-row">
          <div className="col-auto d-flex align-items-center">
            <img src="/logo.svg" alt="奎星电子科技" className="me-2" style={{ height: '24px', width: 'auto' }} />
            <div className="small m-0 text-dark">Copyright &copy; 上海奎星电子科技有限公司 {new Date().getFullYear()} <span className="text-danger">❤️</span></div>
          </div>
          <div className="col-auto">
            <a className="text-dark small text-decoration-none" href="#">隐私政策</a>
            <span className="text-dark mx-1">&middot;</span>
            <a className="text-dark small text-decoration-none" href="#">服务条款</a>
            <span className="text-dark mx-1">&middot;</span>
            <a className="text-dark small text-decoration-none" href="#">联系我们</a>
          </div>
        </div>
      </div>
    </footer>
  )
}



function HomePage() {
  return (
    <>
      <header className="bg-primary py-5 hero">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className="my-5 text-center text-xl-start">
                <h1 className="display-5 fw-bolder text-white mb-2">专业精密模具制造与特种塑料加工</h1>
                <p className="lead fw-normal text-white mb-4">上海奎星电子科技有限公司专注于PEEK、PEI、PPSU等高性能特种塑料制品的定制加工，为医疗器械、汽车零部件、电子电器等行业提供一站式解决方案。</p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  <a className="btn btn-cta btn-lg px-4 me-sm-3" href="#features">✨ 了解服务</a>
                  <a className="btn btn-outline-light btn-lg px-4" href="/about">关于我们</a>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <div className="d-flex flex-column align-items-center">
                <img src="/logo.svg" alt="奎星电子科技" className="mb-4" style={{ height: '120px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
                {/* 使用更专业的工业/科技类占位图 */}
                <img className="img-fluid rounded-3 my-3" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="精密制造工厂" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 bg-light" id="features">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0"><h2 className="fw-bolder mb-0 gradient-text">专业的精密制造服务</h2></div>
            <div className="col-lg-8">
              <div className="row gx-5 row-cols-1 row-cols-md-2">
                {[
                  { icon: 'bi-gear-fill', title: '精密模具制造', description: '专业CNC加工中心，精密模具设计与制造，确保产品精度与品质' },
                  { icon: 'bi-droplet-fill', title: '注塑成型', description: '31台注塑机，50T-800T规格齐全，支持双色、立式、薄壁高速注塑' },
                  { icon: 'bi-palette-fill', title: '表面处理', description: '10万级无尘喷漆车间，自动喷漆与UV流水线，丝印、移印、烫金工艺' },
                  { icon: 'bi-tools', title: '组装检测', description: '超声波焊接、组装设备，三坐标测量仪、色差仪等精密检测设备' }
                ].map((feature, i) => (
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
                <div className="fs-4 mb-4 fst-italic">"上海奎星电子科技为我们提供了高质量的医疗器械塑料零部件，产品质量稳定，交货及时，是我们值得信赖的合作伙伴！"</div>
                <div className="d-flex align-items-center justify-content-center">
                  <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="" />
                  <div className="fw-bold">
                    张工程师
                    <span className="fw-bold text-primary mx-1">/</span>
                    技术总监, 医疗器械公司
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
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  )
}
