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
  const heroRoutes = ['/', '/about', '/pricing', '/contact', '/faq', '/blog-home', '/blog-post', '/portfolio-overview', '/portfolio-item']
  const isHeroRoute = heroRoutes.includes(location.pathname)

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
    <nav className={`navbar navbar-expand-lg navbar-light bg-white fixed-top ${scrolled ? 'navbar-scrolled' : ''} ${isHeroRoute ? 'navbar-hero-shell' : ''} ${isHeroRoute && !scrolled ? 'navbar-floating' : ''}`}>
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
  const { t, i18n } = useTranslation()
  const isZh = i18n.language === 'zh-CN' || i18n.language === 'zh'
  const footerColumns = [
    {
      title: isZh ? '制造能力' : 'Capabilities',
      links: [
        { to: '/pricing', label: isZh ? '模具与注塑能力' : 'Tooling & Molding' },
        { to: '/pricing', label: isZh ? '洁净车间与表面工艺' : 'Cleanroom & Finishing' },
        { to: '/portfolio-overview', label: isZh ? '项目案例' : 'Project Gallery' }
      ]
    },
    {
      title: isZh ? '公司信息' : 'Company',
      links: [
        { to: '/about', label: t('nav.about') },
        { to: '/blog-home', label: isZh ? '技术资讯' : 'Industry Updates' },
        { to: '/contact', label: t('nav.contact') }
      ]
    },
    {
      title: isZh ? '快速入口' : 'Quick Links',
      links: [
        { to: '/faq', label: t('faq.pageTitle') },
        { to: '/portfolio-item', label: t('nav.portfolioItem') },
        { to: '/pricing', label: isZh ? '获取报价' : 'Request Quote' }
      ]
    }
  ]

  const qualityMarks = isZh
    ? ['ISO 9001 / ISO 13485', '10万级洁净制造', 'PEEK / PEI / PPSU']
    : ['ISO 9001 / ISO 13485', 'Class 100K clean manufacturing', 'PEEK / PEI / PPSU']

  return (
    <footer className="site-footer mt-auto">
      <div className="container px-4 px-lg-5">
        <div className="row g-5 site-footer-main">
          <div className="col-lg-5">
            <div className="site-footer-brand">
              <img src="/logo.svg" alt={t('nav.brand')} />
              <div>
                <p className="site-footer-kicker mb-2">{isZh ? '上海奎星电子科技有限公司' : 'Shanghai Kuixing Electronics Technology Co., Ltd.'}</p>
                <h2 className="site-footer-title mb-3">SHKX MOLDING</h2>
              </div>
            </div>
            <p className="site-footer-copy mb-4">
              {isZh
                ? '围绕模具设计、注塑成型、洁净制造与后处理工艺，服务医疗、汽车、电子与高性能塑料项目。'
                : 'Integrated tooling, precision molding, clean manufacturing, and finishing support for medical, automotive, electronics, and high-performance plastics programs.'}
            </p>
            <div className="site-footer-tags">
              {qualityMarks.map((mark) => (
                <span key={mark}>{mark}</span>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="col-6 col-lg-2">
              <p className="site-footer-heading">{column.title}</p>
              <div className="site-footer-links">
                {column.links.map((link) => (
                  <Link key={link.label} to={link.to}>{link.label}</Link>
                ))}
              </div>
            </div>
          ))}

          <div className="col-lg-1 d-none d-lg-block"></div>
        </div>

        <div className="site-footer-bottom">
          <div className="small">{t('footer.copyright')} {new Date().getFullYear()}</div>
          <div className="site-footer-bottom-links">
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
            <Link to="/contact">{t('nav.contact')}</Link>
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

  const processSteps = isZh ? [
    {
      index: '01',
      title: '前期评审',
      description: '围绕 3D 数据、模流分析与结构优化建议，提前控制量产风险。'
    },
    {
      index: '02',
      title: '成型与表面工艺',
      description: '覆盖注塑、双色、喷涂、丝印、UV 与装配环节，减少项目切换成本。'
    },
    {
      index: '03',
      title: '检测与交付',
      description: '通过精密检测设备与洁净制造环境，保障稳定量产与交期。'
    }
  ] : [
    {
      index: '01',
      title: 'Engineering review',
      description: 'We align 3D data, mold-flow analysis, and structural recommendations before production starts.'
    },
    {
      index: '02',
      title: 'Molding and finishing',
      description: 'Injection, two-shot molding, coating, printing, UV finishing, and assembly stay within one delivery path.'
    },
    {
      index: '03',
      title: 'Inspection and release',
      description: 'Precision inspection tools and clean production controls support stable quality and reliable lead times.'
    }
  ]

  const heroNotes = isZh ? [
    'PEEK / PEI / PPSU 等高性能材料',
    '模具 + 注塑 + 表面处理一体化',
    '服务医疗、汽车与电子行业'
  ] : [
    'High-performance plastics including PEEK, PEI, and PPSU',
    'Integrated tooling, molding, and finishing',
    'Built for medical, automotive, and electronics programs'
  ]

  const sectors = isZh ? [
    '医疗器械',
    '汽车零部件',
    '电子电器',
    '智能家居'
  ] : [
    'Medical devices',
    'Automotive parts',
    'Electronics',
    'Smart home'
  ]

  const heroHeadline = isZh ? '精密模塑 与 特种塑料制造' : 'Precision-Engineered Molding Solutions'
  const heroIntro = isZh
    ? '围绕高性能塑料、模具开发、洁净制造与量产检测，支持医疗、汽车和电子类项目稳定落地。'
    : 'Integrated tooling, specialty plastics, clean manufacturing, and inspection support for medical, automotive, and electronics programs.'

  const heroStatus = isZh ? '制造系统在线' : 'Precision systems online'

  const heroSpecs = isZh ? [
    { label: '体系', value: 'ISO 9001 / ISO 13485' },
    { label: '环境', value: '10万级洁净车间' }
  ] : [
    { label: 'System', value: 'ISO 9001 / ISO 13485' },
    { label: 'Environment', value: 'Class 100K cleanroom' }
  ]

  const caseStudies = isZh ? [
    {
      label: '汽车系统',
      title: '高要求功能件的稳定量产路径',
      description: '通过高性能塑料替代与模流前置评审，降低试模往返和量产切换成本。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDjqfonMEDlmx0nnapSh5wrhlvKCVQ22hzWld4okaMIE8SIu2S21kxaNHBg1epesidjFy7vRU8n3IpQpykrlKQTH1yQGYgkgPSdMJljv_YJx0PJ069Co98uujpXaeoGOkx-OALPPZS2mwUGMOc4xIlYuWvqnRSB3Wvo1kHXrtLFmbaLy_5435mw32JM1WKQh4q_eEY2WydlabxrQQmff0ARop3n2wkFJu2kFnwI1UUrz5YQi_VE4yovcDgnBR1IBssGC8Ni9BseSnG',
      metric: '40%',
      metricLabel: '结构减重策略'
    },
    {
      label: '医疗项目',
      title: '面向洁净制造的微精度塑件',
      description: '结合洁净车间、精密检测与量产工艺控制，支持更严格的公差和洁净要求。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxeC9KccqxAkoKxr1aKOPIMyAp_Hj-GFVqe5aTAi122w67FFfft570x1-cfjJRGiKkIOkMrgchqs4BRukGYAq3Jiywhu6gVdy4yndrG8dzx09Hsd4v-PnHmhbKy5V79oJw3mGJkoDRt-Kxe0SalFOzQek4O-OoTgzmp1jpyKN3_0q39xMA7_bdnRPECgOOtLhDK6hPTYsHbFNpDkR5DbPMFCWHcLPSA8LdCjidvrlKgdR00JfWyST0xMLA5-5PHtXx7eEVYgUnlbn8',
      metric: '±0.01mm',
      metricLabel: '稳定精度控制'
    }
  ] : [
    {
      label: 'Automotive systems',
      title: 'Stable production paths for demanding functional parts',
      description: 'Material replacement and early mold-flow review reduce iteration loops and production switching costs.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDjqfonMEDlmx0nnapSh5wrhlvKCVQ22hzWld4okaMIE8SIu2S21kxaNHBg1epesidjFy7vRU8n3IpQpykrlKQTH1yQGYgkgPSdMJljv_YJx0PJ069Co98uujpXaeoGOkx-OALPPZS2mwUGMOc4xIlYuWvqnRSB3Wvo1kHXrtLFmbaLy_5435mw32JM1WKQh4q_eEY2WydlabxrQQmff0ARop3n2wkFJu2kFnwI1UUrz5YQi_VE4yovcDgnBR1IBssGC8Ni9BseSnG',
      metric: '40%',
      metricLabel: 'weight reduction strategy'
    },
    {
      label: 'Medical programs',
      title: 'Micro-precision parts built for clean manufacturing',
      description: 'Cleanroom production, inspection discipline, and process controls support tighter tolerances and cleaner delivery.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxeC9KccqxAkoKxr1aKOPIMyAp_Hj-GFVqe5aTAi122w67FFfft570x1-cfjJRGiKkIOkMrgchqs4BRukGYAq3Jiywhu6gVdy4yndrG8dzx09Hsd4v-PnHmhbKy5V79oJw3mGJkoDRt-Kxe0SalFOzQek4O-OoTgzmp1jpyKN3_0q39xMA7_bdnRPECgOOtLhDK6hPTYsHbFNpDkR5DbPMFCWHcLPSA8LdCjidvrlKgdR00JfWyST0xMLA5-5PHtXx7eEVYgUnlbn8',
      metric: '±0.01mm',
      metricLabel: 'repeatable tolerance control'
    }
  ]

  const performanceStats = isZh ? [
    { value: '24h', label: '初步响应' },
    { value: '31台', label: '注塑设备' },
    { value: '20+', label: '模具与加工设备' }
  ] : [
    { value: '24h', label: 'first response' },
    { value: '31', label: 'injection machines' },
    { value: '20+', label: 'tooling machines' }
  ]

  return (
    <>
      <header className="homepage-hero">
        <div className="container px-4 px-lg-5">
          <div className="hero-layout">
            <div className="hero-copy">
              <div className="hero-status">
                <span className="hero-status-dot"></span>
                <span>{heroStatus}</span>
              </div>
              <p className="hero-kicker">{isZh ? '上海奎星电子科技有限公司' : 'Shanghai Kuixing Electronics Technology Co., Ltd.'}</p>
              <h1 className="hero-title text-white">{heroHeadline}</h1>
              <p className="hero-subtitle text-white">{heroIntro}</p>

              <div className="hero-cta">
                <a className="btn-cta-primary" href="#features">
                  {isZh ? '查看制造能力' : 'Explore Capabilities'}
                </a>
                <Link className="btn-cta-secondary" to="/contact">
                  {isZh ? '联系团队' : 'Contact Team'}
                </Link>
              </div>
            </div>

            <div className="hero-side">
              <div className="hero-spec-panel">
                {heroSpecs.map((spec) => (
                  <div key={spec.label} className="hero-spec-item">
                    <span>{spec.label}</span>
                    <strong>{spec.value}</strong>
                  </div>
                ))}
              </div>

              <div className="hero-note-list">
                {heroNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>

              <div className="trust-indicators">
                {trustItems.map((item) => (
                  <div key={item.text} className="trust-item">
                    <i className={`bi ${item.icon}`}></i>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="hero-transition"></div>

      <section className="services-section bg-light" id="features">
        <div className="container px-4 px-lg-5">
          <div className="row align-items-end">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="section-header section-header-compact">
                <p className="section-kicker">{isZh ? '核心能力' : 'Core Capabilities'}</p>
                <h2 className="section-title">{t('features.title')}</h2>
                <p className="section-subtitle mb-0">
                  {isZh ? '清晰展示四个关键模块，不用复杂排版也能快速理解我们的交付范围。' : 'Four clear capabilities, presented with enough detail to scan quickly without extra UI clutter.'}
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <p className="section-support-text mb-0">
                {isZh ? '从模具设计到量产检测形成一条完整链路，适合对精度、洁净度和交期有要求的项目。' : 'From mold design to production inspection, the workflow stays integrated for projects that need precision, cleanliness, and predictable timing.'}
              </p>
            </div>
          </div>

          <div className="service-rows">
            {services.map((service, i) => (
              <article key={service.title} className="service-row">
                <div className="service-row-index">0{i + 1}</div>
                <div className="service-icon">
                  <i className={`bi ${service.icon}`}></i>
                </div>
                <div className="service-row-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
                <div className="industry-tags service-row-tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="industry-tag">{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="container px-4 px-lg-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="detail-image-wrap">
                <img
                  className="detail-image"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe_pVGlGuGi9Dx6Eoy5hEq8NuGhBy8IBtjIaDL6zlqWQe7cW5BuTIT-0P_mP8cENnx70EuEJMuMNjLB_-Ic0uRKbi5_KtgsKXpuYlQd5O2QtZOVg0qKkVbvpkNSbcnOA7XSb_QSgAz7sO5X1FIw-wm623O6MbGXG-kSA9Mw7NFMgpjSffyBothT4Ng-j-2IBOgk2pmTrDJYt3K-27YQrKgyz4HtFAYytxNsGWkVY32saoxy7AT2GJN2lSLfCEGukswOjsXn4UBCESa"
                  alt={isZh ? '精密制造流程' : 'Precision manufacturing process'}
                />
                <div className="detail-image-badge">
                  <i className="bi bi-activity"></i>
                  <div>
                    <span>{isZh ? '过程可追踪' : 'Process visibility'}</span>
                    <strong>{isZh ? '更适合量产导入' : 'Built for repeatable launch'}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <p className="section-kicker">{isZh ? '交付流程' : 'Delivery Flow'}</p>
              <h2 className="section-title">
                {isZh ? '把复杂项目收束成更稳定的制造节奏。' : 'Turning complex programs into a steadier manufacturing rhythm.'}
              </h2>
              <p className="section-subtitle">
                {isZh ? '页面不需要太复杂，重点是把客户真正关心的事情讲清楚。' : 'The page stays simple by focusing on what clients actually need to understand first.'}
              </p>

              <div className="process-list">
                {processSteps.map((step) => (
                  <div key={step.index} className="process-item">
                    <div className="process-index">{step.index}</div>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sector-list">
                {sectors.map((sector) => (
                  <span key={sector}>{sector}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider-gradient"></div>

      <section className="industrial-proof-section py-5">
        <div className="container px-4 px-lg-5">
          <div className="section-header text-center mx-auto">
            <p className="section-kicker">{isZh ? '项目视角' : 'Program Proof'}</p>
            <h2 className="section-title">{isZh ? '把制造能力讲得更具体一些。' : 'A clearer look at how the manufacturing system works.'}</h2>
            <p className="section-subtitle mb-0">
              {isZh
                ? '借鉴 Stitch 的工业型页面结构，我们把能力展示从模板卡片收成了更直接的案例与指标表达。'
                : 'Inspired by the Stitch direction, the proof area now reads like an industrial editorial page instead of a generic card grid.'}
            </p>
          </div>

          <div className="row g-4 showcase-grid">
            {caseStudies.map((item) => (
              <div key={item.title} className="col-lg-6">
                <article className="showcase-card">
                  <div className="showcase-media">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="showcase-body">
                    <p className="showcase-label">{item.label}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="showcase-metric">
                      <strong>{item.metric}</strong>
                      <span>{item.metricLabel}</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="proof-stats">
            {performanceStats.map((stat) => (
              <div key={stat.label} className="proof-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="container px-4 px-lg-5">
          <div className="final-cta-inner">
            <div>
              <p className="section-kicker">{isZh ? '开始沟通' : 'Start a Project'}</p>
              <h2 className="final-cta-title">
                {isZh ? '如果您正在评估材料、模具或量产方案，我们可以尽快跟进。' : 'If you are evaluating materials, tooling, or production planning, we can help quickly.'}
              </h2>
            </div>
            <div className="final-cta-actions">
              <Link className="btn-cta-primary" to="/contact">
                {isZh ? '获取报价' : 'Request a Quote'}
              </Link>
              <Link className="final-cta-link" to="/about">
                {t('hero.aboutUs')} <i className="bi bi-arrow-right"></i>
              </Link>
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
