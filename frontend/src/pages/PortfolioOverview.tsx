import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import { isZhLocale } from '../utils/locale'
import { usePageMeta } from '../hooks/usePageMeta'

interface Product {
  // Image file expected under /public/products/<image>; falls back to a
  // placeholder until the real photo is added.
  image: string
  category: { zh: string; en: string }
  name: { zh: string; en: string }
  price: string
}

const products: Product[] = [
  {
    image: 'ppsu-medical-tray.jpg',
    category: { zh: '医疗', en: 'Medical' },
    name: { zh: 'PPSU 医疗级注塑托盘', en: 'PPSU Medical-Grade Tray' },
    price: '¥9'
  },
  {
    image: 'automotive-painted-housing.jpg',
    category: { zh: '汽车配件', en: 'Automotive' },
    name: { zh: '汽车注塑外壳（喷漆烤漆）', en: 'Painted Automotive Enclosure' },
    price: '¥2.8'
  },
  {
    image: 'instrument-housing.jpg',
    category: { zh: '电子', en: 'Electronics' },
    name: { zh: '电子仪器外壳', en: 'Electronic Instrument Housing' },
    price: '¥1.8'
  },
  {
    image: 'automotive-duct.jpg',
    category: { zh: '汽车配件', en: 'Automotive' },
    name: { zh: '汽车配件注塑（模具开发）', en: 'Automotive Part — Mold Development' },
    price: '¥5.6'
  },
  {
    image: 'automotive-mold.jpg',
    category: { zh: '模具', en: 'Tooling' },
    name: { zh: '汽车注塑模具加工', en: 'Automotive Injection Mold' },
    price: '¥8000'
  },
  {
    image: 'pos-terminal.jpg',
    category: { zh: '电子', en: 'Electronics' },
    name: { zh: 'POS 终端塑料面壳（喷漆/印刷/组装）', en: 'POS Terminal Housing — Paint, Print, Assembly' },
    price: '¥1.8'
  },
  {
    image: 'electronics-mold.jpg',
    category: { zh: '模具', en: 'Tooling' },
    name: { zh: '电子电器注塑模具', en: 'Electronics Injection Mold' },
    price: '¥8600'
  },
  {
    image: 'two-color-parts.jpg',
    category: { zh: '双色工艺', en: 'Two-Shot' },
    name: { zh: '双色模具注塑配件', en: 'Two-Color Molded Parts' },
    price: '¥6'
  },
  {
    image: 'medical-precision-parts.jpg',
    category: { zh: '医疗', en: 'Medical' },
    name: { zh: '医疗精密注塑件', en: 'Medical Precision Components' },
    price: '¥9'
  },
  {
    image: 'wheel-cover.jpg',
    category: { zh: '表面处理', en: 'Finishing' },
    name: { zh: '塑料轮罩喷漆烤漆', en: 'Painted Wheel Cover' },
    price: '¥2.8'
  },
  {
    image: 'display-housing.jpg',
    category: { zh: '汽车配件', en: 'Automotive' },
    name: { zh: '汽车显示器外壳', en: 'Automotive Display Housing' },
    price: '¥18'
  },
  {
    image: 'interior-trim.jpg',
    category: { zh: '汽车配件', en: 'Automotive' },
    name: { zh: '汽车内饰注塑件（注塑/喷涂）', en: 'Automotive Interior Trim' },
    price: '¥2.9'
  },
  {
    image: 'medical-micro-part.jpg',
    category: { zh: '医疗', en: 'Medical' },
    name: { zh: '医疗微精密注塑件', en: 'Medical Micro-Precision Part' },
    price: '¥0.9'
  },
  {
    image: 'cleanroom.jpg',
    category: { zh: '车间', en: 'Facility' },
    name: { zh: '十万级无尘车间精密注塑', en: 'Class 100K Cleanroom Molding' },
    price: '¥1.8'
  },
  {
    image: 'precision-mold.jpg',
    category: { zh: '模具', en: 'Tooling' },
    name: { zh: '精密模具设计与开发', en: 'Precision Mold Design & Build' },
    price: '¥10000'
  }
]

const PLACEHOLDER_IMAGE = 'https://dummyimage.com/600x450/e9ecef/6c757d'

export default function PortfolioOverview() {
  const { t, i18n } = useTranslation()
  const isZh = isZhLocale(i18n.language)

  usePageMeta(
    isZh ? '产品展示 | 上海奎星电子科技' : 'Products | Shanghai Kuixing Electronics',
    isZh
      ? '医疗、汽车、电子等行业的注塑件、模具与表面处理工艺案例展示。'
      : 'Injection-molded parts, tooling and finishing examples across medical, automotive and electronics.'
  )

  return (
    <>
      <PageHeader
        kicker={t('nav.portfolio')}
        title={t('portfolio.ourWork')}
        subtitle={t('portfolio.companyPortfolio')}
        variant="catalog"
        iconClass="bi-grid-3x3-gap"
        compact
        links={[
          { label: isZh ? '产品案例' : 'Products', href: '#portfolio-grid' },
          { label: isZh ? '项目案例' : 'Project Example', href: '#portfolio-detail' },
          { label: isZh ? '提交需求' : 'Submit Inquiry', href: '/contact' }
        ]}
        metaItems={[
          {
            label: isZh ? '展示重点' : 'Catalog focus',
            value: isZh ? '结构件、外观件与工艺结果展示' : 'Structural parts, cosmetic parts, and manufacturing outcomes'
          },
          {
            label: isZh ? '适用方向' : 'Use cases',
            value: isZh ? '汽车、电子、工业设备与消费产品' : 'Automotive, electronics, industrial equipment, and consumer products'
          }
        ]}
      />

      <section className="py-5" id="portfolio-grid">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">{isZh ? '产品与工艺案例' : 'Products & Process Examples'}</h2>
            <p className="lead fw-normal text-muted">
              {isZh
                ? '覆盖医疗、汽车、电子等行业的注塑件、模具与表面处理工艺。'
                : 'Injection-molded parts, tooling, and finishing across medical, automotive, and electronics programs.'}
            </p>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {products.map((product) => (
              <div key={product.name.en} className="col">
                <article className="gradient-card h-100 p-3">
                  <div className="position-relative mb-3">
                    <img
                      className="img-fluid rounded-3 w-100"
                      style={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
                      src={`/products/${product.image}`}
                      alt={isZh ? product.name.zh : product.name.en}
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget
                        if (img.src !== PLACEHOLDER_IMAGE) {
                          img.src = PLACEHOLDER_IMAGE
                        }
                      }}
                    />
                    <span className="badge bg-primary bg-gradient rounded-pill position-absolute top-0 start-0 m-2">
                      {isZh ? product.category.zh : product.category.en}
                    </span>
                  </div>
                  <h3 className="h6 fw-bold mb-2">{isZh ? product.name.zh : product.name.en}</h3>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">{isZh ? '参考价' : 'Ref. price'}</span>
                    <span className="fw-bolder text-primary">{product.price}</span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project example (merged from the former product-detail page) */}
      <section className="py-5" id="portfolio-detail">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">{isZh ? '项目案例' : 'Project Example'}</h2>
            <p className="lead fw-normal text-muted">
              {isZh
                ? '从结构件到外观件的精密注塑项目示例，覆盖模具、成型、表面处理与装配。'
                : 'A precision molding project example — tooling, molding, finishing and assembly, from structural to cosmetic parts.'}
            </p>
          </div>
          <div className="row gx-5">
            <div className="col-12">
              <div className="gradient-card p-3 mb-4">
                <img className="img-fluid rounded-3 w-100" src="https://dummyimage.com/1300x700/e9ecef/6c757d" alt={isZh ? '项目案例主图' : 'Project example'} loading="lazy" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="gradient-card p-3 mb-4">
                <img className="img-fluid rounded-3 w-100" src="https://dummyimage.com/600x400/e9ecef/6c757d" alt="" loading="lazy" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="gradient-card p-3 mb-4">
                <img className="img-fluid rounded-3 w-100" src="https://dummyimage.com/600x400/e9ecef/6c757d" alt="" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="lead fw-normal text-muted mb-4">
              {isZh
                ? '结合模具开发、注塑成型、表面处理与装配，提供从打样到量产的一体化交付。'
                : 'Tooling, molding, finishing and assembly combined for integrated delivery from sampling to production.'}
            </p>
            <a className="btn btn-gradient-primary" href="/contact">
              {isZh ? '提交项目需求' : 'Submit a project brief'}
              <i className="bi-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Transition */}
      <div className="section-transition-down"></div>

      <section className="py-5 section-gradient-teal" id="portfolio-cta">
        <div className="container px-5 my-5">
          <h2 className="display-4 fw-bolder mb-4 gradient-text">{t('portfolio.buildTogether')}</h2>
          <a className="btn btn-gradient-primary btn-lg" href="/contact">{t('common.contactUs')}</a>
        </div>
      </section>
    </>
  )
}
