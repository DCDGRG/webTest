import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeLanguageSwitcher from './components/ThemeLanguageSwitcher'
import ScrollToTop from './components/ScrollToTop'
import { isZhLocale } from './utils/locale'
import { isHeroRoute } from './utils/nav'
import { automotiveHousing, medicalPanelHousing } from './data/companyPhotos'
import { usePageMeta } from './hooks/usePageMeta'

// Lazy load pages for code splitting
const About = lazy(() => import('./pages/About'))
const Pricing = lazy(() => import('./pages/Pricing'))
const FAQ = lazy(() => import('./pages/FAQ'))
const BlogHome = lazy(() => import('./pages/BlogHome'))
const NewsArticle = lazy(() => import('./pages/NewsArticle'))
const PortfolioOverview = lazy(() => import('./pages/PortfolioOverview'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHero = isHeroRoute(location.pathname)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu after navigating to a new route.
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Helper to check if a path is active
  const isActive = (path: string) => location.pathname === path
  const isDropdownActive = (paths: string[]) => paths.some(p => location.pathname === p)

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white fixed-top ${scrolled ? 'navbar-scrolled' : ''} ${isHero ? 'navbar-hero-shell' : ''} ${isHero && !scrolled ? 'navbar-floating' : ''}`}>
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand text-dark fw-bold d-flex align-items-center" to="/">
          <img src="/logo.svg" alt={t('nav.brand')} className="me-2" style={{ height: '32px', width: 'auto' }} />
          {t('nav.brand')}
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
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
            <li className="nav-item">
              <Link className={`nav-link ${isDropdownActive(['/blog-home', '/blog-post']) ? 'nav-link-active' : ''}`} to="/blog-home">
                {t('nav.techNews')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isDropdownActive(['/portfolio-overview', '/portfolio-item']) ? 'nav-link-active' : ''}`} to="/portfolio-overview">
                {t('nav.portfolio')}
              </Link>
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
  const isZh = isZhLocale(i18n.language)
  const footerColumns = [
    {
      title: isZh ? '制造能力' : 'Capabilities',
      links: [
        { to: '/pricing', label: isZh ? '制造能力总览' : 'Manufacturing Capabilities' },
        { to: '/pricing', label: isZh ? '设备与材料范围' : 'Equipment & Materials' },
        { to: '/pricing', label: isZh ? '质量与交付' : 'Quality & Delivery' }
      ]
    },
    {
      title: isZh ? '项目支持' : 'Project Support',
      links: [
        { to: '/contact', label: isZh ? '提交项目需求' : 'Project Inquiry' },
        { to: '/portfolio-overview', label: isZh ? '项目案例' : 'Program Examples' },
        { to: '/faq', label: isZh ? '常见问题' : 'FAQ' }
      ]
    },
    {
      title: isZh ? '公司信息' : 'Company',
      links: [
        { to: '/about', label: t('nav.about') },
        { to: '/blog-home', label: isZh ? '技术资讯' : 'Technical News' },
        { to: '/contact', label: t('nav.contact') }
      ]
    }
  ]

  const qualityMarks = isZh
    ? ['ISO 9001 / ISO 13485', '10万级洁净制造', 'PEEK / PEI / PPSU']
    : ['ISO 9001 / ISO 13485', 'Class 100K clean manufacturing', 'PEEK / PEI / PPSU']

  const footerFacts = isZh
    ? [
        { label: '地址', value: '上海市宝山区金勺路 1688 号 19 幢' },
        { label: '支持', value: '模具、注塑、表面工艺、装配' },
        { label: '理念', value: '专业、诚信、开拓、创新' }
      ]
    : [
        { label: 'Location', value: 'Building 19, No. 1688 Jinshao Road, Baoshan District, Shanghai' },
        { label: 'Coverage', value: 'Tooling, molding, finishing, assembly' },
        { label: 'Values', value: 'Professionalism, integrity, initiative, innovation' }
      ]

  return (
    <footer className="site-footer mt-auto">
      <div className="container px-4 px-lg-5">
        <div className="row g-5 site-footer-main">
          <div className="col-lg-6">
            <div className="site-footer-brand">
              <img src="/logo.svg" alt={t('nav.brand')} />
              <div>
                <p className="site-footer-kicker mb-2">{isZh ? '上海奎星电子科技有限公司' : 'Shanghai Kuixing Electronics Technology Co., Ltd.'}</p>
                <h2 className="site-footer-title mb-3">SHKX MOLDING</h2>
              </div>
            </div>
            <p className="site-footer-copy mb-4">
              {isZh
                ? '始于 2005 年，专注精密模具、注塑成型与特种塑料加工，提供喷漆、印刷、烫金及组装配套服务。'
                : 'Established in 2005, we provide precision tooling, injection molding and specialty plastic processing, with painting, printing, hot stamping and assembly.'}
            </p>
            <div className="site-footer-tags">
              {qualityMarks.map((mark) => (
                <span key={mark}>{mark}</span>
              ))}
            </div>
            <div className="site-footer-facts">
              {footerFacts.map((fact) => (
                <div key={fact.label} className="site-footer-fact">
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
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
  const isZh = isZhLocale(i18n.language)

  usePageMeta(
    isZh ? '上海奎星电子科技 | 精密模具与注塑成型' : 'Shanghai Kuixing Electronics | Precision Molding',
    isZh
      ? '上海奎星电子科技专注精密模具设计制造、注塑成型与特种塑料加工，服务医疗器械、汽车零部件与电子电器行业。'
      : 'Precision tooling, injection molding and specialty plastics for medical, automotive and electronics programs.'
  )

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
      tags: isZh ? ['50–800T', '特种塑料', '洁净注塑'] : ['50–800T', 'Specialty plastics', 'Cleanroom molding']
    },
    {
      icon: 'bi-palette-fill',
      title: t('features.surface.title'),
      description: t('features.surface.description'),
      tags: isZh ? ['喷漆流水线', 'UV工艺', '丝印'] : ['Painting lines', 'UV finishing', 'Screen printing']
    },
    {
      icon: 'bi-tools',
      title: t('features.assembly.title'),
      description: t('features.assembly.description'),
      tags: isZh ? ['配套组装', '外观检查', '过程品管'] : ['Assembly', 'Appearance checks', 'Process quality']
    }
  ]

  const trustItems = isZh ? [
    { icon: 'bi-shield-check', text: 'ISO9001 / IATF16949 / ISO13485' },
    { icon: 'bi-people', text: '100 多名员工 · 40 多名技术骨干' },
    { icon: 'bi-gear', text: '50–800T 注塑设备' },
    { icon: 'bi-building', text: '10万级无尘车间' }
  ] : [
    { icon: 'bi-shield-check', text: 'ISO9001 / IATF16949 / ISO13485' },
    { icon: 'bi-people', text: '100+ employees · 40+ core technical staff' },
    { icon: 'bi-gear', text: '50–800T molding capacity' },
    { icon: 'bi-building', text: 'Class 100K Clean Room' }
  ]

  const processSteps = isZh ? [
    {
      index: '01',
      title: '前期评审',
      description: '结合零件图纸、材料与使用要求，沟通模具结构和成型方案。'
    },
    {
      index: '02',
      title: '成型与表面工艺',
      description: '衔接注塑、喷漆、UV、丝印、移印、烫金与组装，减少多环节协调。'
    },
    {
      index: '03',
      title: '检测与交付',
      description: '围绕尺寸、外观与装配要求落实过程品管，按确认的要求组织交付。'
    }
  ] : [
    {
      index: '01',
      title: 'Engineering review',
      description: 'We review part drawings, materials and end-use requirements to discuss tooling and molding plans.'
    },
    {
      index: '02',
      title: 'Molding and finishing',
      description: 'Molding, painting, UV finishing, screen printing, pad printing, hot stamping and assembly are coordinated together.'
    },
    {
      index: '03',
      title: 'Inspection and release',
      description: 'Process quality checks focus on dimensions, appearance and fit, with delivery organized around agreed requirements.'
    }
  ]

  const heroNotes = isZh ? [
    'PEEK / PEI / PPSU 等高性能材料',
    '模具 + 注塑 + 表面处理一体化',
    '服务分析仪器、医疗器械、汽车与传感器领域'
  ] : [
    'High-performance plastics including PEEK, PEI, and PPSU',
    'Integrated tooling, molding, and finishing',
    'Serving analytical instruments, medical devices, automotive parts and sensors'
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

  const heroHeadline = isZh ? '精密模具与特种塑料加工' : 'Precision Tooling & Custom Plastic Parts'
  const heroIntro = isZh
    ? '专注 PEEK、PEI、PPSU 等材料加工，提供模具设计、注塑成型、表面处理与组装服务，服务分析仪器、医疗器械及汽车零部件等领域。'
    : 'Custom processing in PEEK, PEI, PPSU and other engineering plastics, with integrated tooling, molding, finishing and assembly for analytical instruments, medical devices and automotive parts.'

  const heroStatus = isZh ? '始于 2005 年 · 专注精密模塑' : 'Precision molding since 2005'

  const heroSpecs = isZh ? [
    { label: '质量体系', value: 'ISO 9001 / IATF 16949 / ISO 13485' },
    { label: '环境', value: '10万级洁净车间' }
  ] : [
    { label: 'Quality systems', value: 'ISO 9001 / IATF 16949 / ISO 13485' },
    { label: 'Environment', value: 'Class 100K cleanroom' }
  ]

  const applications = [
    {
      photo: automotiveHousing,
      title: isZh ? '汽车零部件' : 'Automotive components',
      description: isZh ? '为壳体、面框等零件提供模具开发、注塑成型、喷漆和印刷。' : 'Toolmaking, injection molding, painting and printing for housings and trim bezels.',
      metric: isZh ? '50–800 吨' : '50–800 t',
      metricLabel: isZh ? '注塑机锁模力' : 'Press clamping force'
    },
    {
      photo: medicalPanelHousing,
      title: isZh ? '医疗器械配件' : 'Medical device components',
      description: isZh ? '加工设备外壳、器械手柄等塑料件，可按洁净要求安排注塑生产。' : 'Molded equipment housings and instrument handles, with cleanroom production available.',
      metric: isZh ? '10 万级' : 'Class 100K',
      metricLabel: isZh ? '注塑车间洁净等级' : 'Molding cleanroom rating'
    }
  ]

  const proofBand = isZh ? [
    {
      title: '2005 年 8 月成立',
      description: '深耕精密模具与塑料加工，衔接模具、成型、表面处理和组装。'
    },
    {
      title: '100 多名员工',
      description: '其中技术骨干 40 多名，支撑模具开发、生产与技术沟通。'
    },
    {
      title: 'ISO 质量体系',
      description: '通过 ISO 9001:2015、IATF 16949:2016 与 ISO 13485:2016 认证。'
    },
    {
      title: '10 万级洁净制造',
      description: '配备医疗配件无尘注塑车间，支持有洁净生产要求的零件加工。'
    }
  ] : [
    {
      title: 'Established in August 2005',
      description: 'Experience in precision tooling and plastic processing connects molding, finishing and assembly.'
    },
    {
      title: 'Over 100 employees',
      description: 'More than 40 core technical staff support tooling, production and technical coordination.'
    },
    {
      title: 'ISO quality systems',
      description: 'Certified to ISO 9001:2015, IATF 16949:2016 and ISO 13485:2016.'
    },
    {
      title: 'Class 100K clean manufacturing',
      description: 'A dedicated medical component molding cleanroom supports parts requiring a controlled production environment.'
    }
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
                  {isZh ? '咨询定制加工' : 'Discuss Your Part'}
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
                  {isZh ? '模具设计、注塑成型、表面处理与组装协同配套，让塑料零件从开发走向成品。' : 'Tool design, injection molding, finishing and assembly connect plastic part development with finished products.'}
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <p className="section-support-text mb-0">
                {isZh ? '配备 CNC 加工中心、50–800T 注塑设备、两条喷漆流水线及一条 UV 喷漆线，支持不同材料与工艺需求。' : 'CNC machining centers, 50–800T molding machines, two painting lines and one UV painting line support a range of material and process requirements.'}
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
                {isZh ? '从需求确认到成品交付，做好每一道工序。' : 'Care at every stage, from requirements to delivery.'}
              </h2>
              <p className="section-subtitle">
                {isZh ? '坚持“人人品管、过程受控、质量稳定、客户满意”，将质量意识贯穿模具、成型与后处理各环节。' : 'Quality is everyone’s responsibility, with process control connecting toolmaking, molding and finishing.'}
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

      <section id="applications" className="industrial-proof-section py-5">
        <div className="container px-4 px-lg-5">
          <header className="applications-heading">
            <div>
              <p className="section-kicker">{isZh ? '应用领域' : 'Applications'}</p>
              <h2 className="section-title mb-0">{isZh ? '汽车与医疗塑料零件' : 'Automotive and medical plastic parts'}</h2>
            </div>
            <Link className="applications-link" to="/portfolio-overview#portfolio-grid">
              {isZh ? '查看产品实物' : 'View product samples'}
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </Link>
          </header>

          <div className="showcase-grid">
            {applications.map((item) => (
              <article key={item.photo.src} className="showcase-card">
                <figure className="showcase-media">
                  <img src={item.photo.src} alt={item.photo.title[isZh ? 'zh' : 'en']} loading="lazy" />
                </figure>
                <div className="showcase-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <dl className="showcase-metric">
                    <dt>{item.metricLabel}</dt>
                    <dd>{item.metric}</dd>
                  </dl>
                </div>
              </article>
            ))}
          </div>

          <div className="proof-band">
            {proofBand.map((item) => (
              <article key={item.title} className="proof-band-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="container px-4 px-lg-5">
          <div className="final-cta-inner manufacturing-inquiry">
            <div className="manufacturing-inquiry-copy">
              <p className="section-kicker">{isZh ? '项目评估' : 'Project Evaluation'}</p>
              <h2 className="final-cta-title">
                {isZh ? '告诉我们零件用途与加工需求，一起讨论制造方案。' : 'Tell us about your part and processing needs to discuss a manufacturing plan.'}
              </h2>
              <p className="manufacturing-inquiry-text">
                {isZh
                  ? '适合前期选材、模具评审、打样安排和量产可行性判断。'
                  : 'Useful for material selection, tooling review, sampling plans, and production feasibility.'}
              </p>
            </div>
            <div className="manufacturing-inquiry-side">
              <div className="manufacturing-inquiry-list">
                <div>{isZh ? '说明关键尺寸；如有图纸，可在后续沟通中提供' : 'Describe key dimensions; drawings can be shared during follow-up'}</div>
                <div>{isZh ? '说明材料方向、外观要求和用途' : 'Include material targets, cosmetic requirements, and application use'}</div>
                <div>{isZh ? '补充预计批量、交期和验证节点' : 'Add expected volume, lead time, and validation timing'}</div>
              </div>
              <div className="final-cta-actions">
              <Link className="btn-cta-primary" to="/contact">
                {isZh ? '提交项目需求' : 'Submit Project Brief'}
              </Link>
              <Link className="final-cta-link" to="/pricing">
                {isZh ? '查看制造能力' : 'Review Capabilities'} <i className="bi bi-arrow-right"></i>
              </Link>
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
      <ScrollToTop />
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
            {/* Merged into the combined Tech News page */}
            <Route path="/blog-post" element={<Navigate to="/blog-home" replace />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/portfolio-overview" element={<PortfolioOverview />} />
            {/* Merged into the combined Products page */}
            <Route path="/portfolio-item" element={<Navigate to="/portfolio-overview" replace />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/news" element={<ProtectedRoute><AdminNewsList /></ProtectedRoute>} />
            <Route path="/admin/news/new" element={<ProtectedRoute><AdminNewsEdit /></ProtectedRoute>} />
            <Route path="/admin/news/:id/edit" element={<ProtectedRoute><AdminNewsEdit /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

            {/* 404 — must stay last */}
            <Route path="*" element={<NotFound />} />
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
