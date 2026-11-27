import { useTranslation } from 'react-i18next'
import { productPhotos, workshopPhotos } from '../data/companyPhotos'
import PageHeader from '../components/PageHeader'
import { isZhLocale } from '../utils/locale'
import { usePageMeta } from '../hooks/usePageMeta'

interface Product {
  category: { zh: string; en: string }
  name: { zh: string; en: string }
  price: string
}

const products: Product[] = [
  {
    category: { zh: '医疗', en: 'Medical' },
    name: { zh: 'PPSU 医疗级注塑托盘', en: 'PPSU Medical-Grade Tray' },
    price: '¥9'
  },
  {
    category: { zh: '汽车配件', en: 'Automotive' },
    name: { zh: '汽车注塑外壳（喷漆烤漆）', en: 'Painted Automotive Enclosure' },
    price: '¥2.8'
  },
  {
    category: { zh: '电子', en: 'Electronics' },
    name: { zh: '电子仪器外壳', en: 'Electronic Instrument Housing' },
    price: '¥1.8'
  },
  {
    category: { zh: '汽车配件', en: 'Automotive' },
    name: { zh: '汽车配件注塑（模具开发）', en: 'Automotive Part — Mold Development' },
    price: '¥5.6'
  },
  {
    category: { zh: '模具', en: 'Tooling' },
    name: { zh: '汽车注塑模具加工', en: 'Automotive Injection Mold' },
    price: '¥8000'
  },
  {
    category: { zh: '电子', en: 'Electronics' },
    name: { zh: 'POS 终端塑料面壳（喷漆/印刷/组装）', en: 'POS Terminal Housing — Paint, Print, Assembly' },
    price: '¥1.8'
  },
  {
    category: { zh: '模具', en: 'Tooling' },
    name: { zh: '电子电器注塑模具', en: 'Electronics Injection Mold' },
    price: '¥8600'
  },
  {
    category: { zh: '双色工艺', en: 'Two-Shot' },
    name: { zh: '双色模具注塑配件', en: 'Two-Color Molded Parts' },
    price: '¥6'
  },
  {
    category: { zh: '医疗', en: 'Medical' },
    name: { zh: '医疗精密注塑件', en: 'Medical Precision Components' },
    price: '¥9'
  },
  {
    category: { zh: '表面处理', en: 'Finishing' },
    name: { zh: '塑料轮罩喷漆烤漆', en: 'Painted Wheel Cover' },
    price: '¥2.8'
  },
  {
    category: { zh: '汽车配件', en: 'Automotive' },
    name: { zh: '汽车显示器外壳', en: 'Automotive Display Housing' },
    price: '¥18'
  },
  {
    category: { zh: '汽车配件', en: 'Automotive' },
    name: { zh: '汽车内饰注塑件（注塑/喷涂）', en: 'Automotive Interior Trim' },
    price: '¥2.9'
  },
  {
    category: { zh: '医疗', en: 'Medical' },
    name: { zh: '医疗微精密注塑件', en: 'Medical Micro-Precision Part' },
    price: '¥0.9'
  },
  {
    category: { zh: '车间', en: 'Facility' },
    name: { zh: '十万级无尘车间精密注塑', en: 'Class 100K Cleanroom Molding' },
    price: '¥1.8'
  },
  {
    category: { zh: '模具', en: 'Tooling' },
    name: { zh: '精密模具设计与开发', en: 'Precision Mold Design & Build' },
    price: '¥10000'
  }
]

export default function PortfolioOverview() {
  const { t, i18n } = useTranslation()
  const isZh = isZhLocale(i18n.language)
  const lang = isZh ? 'zh' : 'en'

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
          { label: isZh ? '产品实物' : 'Product samples', href: '#portfolio-grid' },
          { label: isZh ? '车间实拍' : 'Workshop photos', href: '#portfolio-detail' },
          { label: isZh ? '提交需求' : 'Submit Inquiry', href: '/contact' }
        ]}
        metaItems={[
          {
            label: isZh ? '展示重点' : 'Catalog focus',
            value: isZh ? '注塑零件与模具实物' : 'Molded parts and tooling'
          },
          {
            label: isZh ? '适用方向' : 'Use cases',
            value: isZh ? '汽车部件、医疗器械与特种塑料件' : 'Automotive parts, medical devices and specialty plastics'
          }
        ]}
      />

      <section className="py-5" id="portfolio-grid">
        <div className="container px-5 my-5">
          <h2 className="fw-bolder gradient-text mb-4">{isZh ? '产品实物' : 'Product samples'}</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {productPhotos.map((photo) => (
              <div className="col" key={photo.src}>
                <figure className="gradient-card h-100 mb-0 overflow-hidden">
                  <img className="portfolio-sample" src={photo.src} alt={photo.title[lang]} loading="lazy" />
                  <figcaption className="p-3">
                    <span className="small text-muted">{photo.category[lang]}</span>
                    <h3 className="h5 fw-bold mt-1">{photo.title[lang]}</h3>
                    <p className="mb-0">{photo.caption[lang]}</p>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          <details className="mt-4">
            <summary className="fw-bold py-2">{isZh ? '产品与加工服务参考价' : 'Product and service reference prices'}</summary>
            <table className="table mt-2">
              <thead>
                <tr>
                  <th scope="col">{isZh ? '类别' : 'Category'}</th>
                  <th scope="col">{isZh ? '产品或服务' : 'Product or service'}</th>
                  <th scope="col" className="text-end">{isZh ? '参考价' : 'Reference price'}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.name.en}>
                    <td>{product.category[lang]}</td>
                    <td>{product.name[lang]}</td>
                    <td className="text-end">{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      </section>

      <section className="py-5 section-gradient-teal" id="portfolio-detail">
        <div className="container px-5">
          <h2 className="fw-bolder gradient-text mb-4">{isZh ? '车间实拍' : 'Inside our workshops'}</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {Object.values(workshopPhotos).map((photo) => (
              <div className="col" key={photo.src}>
                <figure className="mb-0">
                  <img className="w-100 h-auto rounded-3" width="1200" height="900" src={photo.src} alt={photo.title[lang]} loading="lazy" />
                  <figcaption className="mt-3">
                    <h3 className="h5 fw-bold">{photo.title[lang]}</h3>
                    <p>{photo.caption[lang]}</p>
                  </figcaption>
                </figure>
              </div>
            ))}
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
