import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import About from './pages/About'
import Pricing from './pages/Pricing'
import FAQ from './pages/FAQ'
import BlogHome from './pages/BlogHome'
import BlogPost from './pages/BlogPost'
import PortfolioOverview from './pages/PortfolioOverview'
import PortfolioItem from './pages/PortfolioItem'
import Contact from './pages/Contact'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container px-5">
        <Link className="navbar-brand text-dark fw-bold d-flex align-items-center" to="/">
          <img src="/logo.svg" alt="奎星" className="me-2" style={{height: '32px', width: 'auto'}} />
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
                  <li><Link className="nav-link text-dark" to="/portfolio-item">产品详情</Link></li>
                </ul>
              </li>
          </ul>
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
            <img src="/logo.svg" alt="奎星电子科技" className="me-2" style={{height: '24px', width: 'auto'}} />
            <div className="small m-0 text-dark">Copyright &copy; 上海奎星电子科技有限公司 {new Date().getFullYear()}</div>
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
                  <a className="btn btn-success btn-lg px-4 me-sm-3" href="#features">了解服务</a>
                  <a className="btn btn-outline-light btn-lg px-4" href="/about">关于我们</a>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <div className="d-flex flex-column align-items-center">
                <img src="/logo.svg" alt="奎星电子科技" className="mb-4" style={{height: '120px', width: 'auto', filter: 'brightness(0) invert(1)'}} />
                <img className="img-fluid rounded-3 my-3" src="https://dummyimage.com/600x400/343a40/6c757d" alt="" />
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

      <section className="py-5 light-teal-bg">
        <div className="container px-5 my-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <div className="text-center">
                <h2 className="fw-bolder gradient-text">最新资讯</h2>
                <p className="lead fw-normal text-muted mb-5">了解我们的最新技术发展、行业动态和成功案例</p>
              </div>
            </div>
          </div>
          <div className="row gx-5">
            {[
              { 
                badge: '技术', 
                title: 'PEEK材料在医疗器械中的应用', 
                description: '探讨PEEK材料在骨科器械、内窥镜等医疗器械中的优势和应用案例',
                author: '技术团队',
                date: '2024年1月15日 · 5分钟阅读'
              },
              { 
                badge: '行业', 
                title: '汽车轻量化材料发展趋势', 
                description: '分析高性能工程塑料在汽车零部件中的应用前景和技术创新',
                author: '研发部门',
                date: '2024年1月10日 · 4分钟阅读'
              },
              { 
                badge: '案例', 
                title: '成功案例：精密模具制造', 
                description: '分享我们在精密模具制造领域的成功经验和客户合作案例',
                author: '项目组',
                date: '2024年1月5日 · 6分钟阅读'
              }
            ].map((post, i) => (
              <div key={i} className="col-lg-4 mb-5">
                <div className="card h-100 shadow border-0 elegant-shadow">
                  <img className="card-img-top" src="https://dummyimage.com/600x350/ced4da/6c757d" alt="" />
                  <div className="card-body p-4">
                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">{post.badge}</div>
                    <a className="text-decoration-none link-dark stretched-link" href="#"><h5 className="card-title mb-3">{post.title}</h5></a>
                    <p className="card-text mb-0">{post.description}</p>
                  </div>
                  <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                    <div className="d-flex align-items-end justify-content-between">
                      <div className="d-flex align-items-center">
                        <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="" />
                        <div className="small">
                          <div className="fw-bold">{post.author}</div>
                          <div className="text-muted">{post.date}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="bg-primary bg-gradient rounded-3 p-4 p-sm-5 mt-5">
            <div className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
              <div className="mb-4 mb-xl-0">
                <div className="fs-3 fw-bold text-white">最新产品信息，及时送达</div>
                <div className="text-white-50">订阅我们的通讯，获取最新技术动态和产品信息</div>
              </div>
              <div className="ms-xl-4">
                <div className="input-group mb-2">
                  <input className="form-control" type="text" placeholder="邮箱地址..." aria-label="邮箱地址..." aria-describedby="button-newsletter" />
                  <button className="btn btn-outline-light elegant-border" id="button-newsletter" type="button">订阅</button>
                </div>
                <div className="small text-white-50">我们重视隐私保护，绝不会泄露您的个人信息。</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100 min-vh-100">
        <main className="flex-shrink-0">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog-home" element={<BlogHome />} />
            <Route path="/blog-post" element={<BlogPost />} />
            <Route path="/portfolio-overview" element={<PortfolioOverview />} />
            <Route path="/portfolio-item" element={<PortfolioItem />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
