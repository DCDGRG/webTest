import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import { usePageMeta } from '../hooks/usePageMeta'

export default function PortfolioItem() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language === 'zh-CN' || i18n.language === 'zh'

  usePageMeta(
    isZh ? '产品详情 | 上海奎星电子科技' : 'Product Detail | Shanghai Kuixing Electronics',
    isZh
      ? '精密注塑结构件、功能件与外观件的项目案例详情。'
      : 'Project detail for precision structural, functional and cosmetic molded parts.'
  )

  return (
    <>
      <PageHeader
        kicker={t('nav.portfolio')}
        title={t('portfolio.projectTitle')}
        subtitle={t('portfolio.projectDescription')}
        variant="catalog"
        compact
        links={[
          { label: isZh ? '返回展示页' : 'Back to Overview', href: '/portfolio-overview' },
          { label: isZh ? '制造能力' : 'Capabilities', href: '/pricing' },
          { label: isZh ? '提交项目需求' : 'Submit Project Brief', href: '/contact' }
        ]}
        metaItems={[
          {
            label: isZh ? '应用方向' : 'Application',
            value: isZh ? '结构件、功能件与外观件项目' : 'Structural, functional, and cosmetic part programs'
          },
          {
            label: isZh ? '制造关联' : 'Manufacturing link',
            value: isZh ? '模具、注塑、表面工艺与装配配合' : 'Tooling, molding, finishing, and assembly support'
          }
        ]}
      />

      <section className="py-5">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-12">
              <div className="gradient-card p-3 mb-5">
                <img className="img-fluid rounded-3" src="https://dummyimage.com/1300x700/343a40/6c757d" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="gradient-card p-3 mb-5">
                <img className="img-fluid rounded-3" src="https://dummyimage.com/600x400/343a40/6c757d" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="gradient-card p-3 mb-5">
                <img className="img-fluid rounded-3" src="https://dummyimage.com/600x400/343a40/6c757d" alt="" />
              </div>
            </div>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center mb-5">
                <p className="lead fw-normal text-muted">{t('portfolio.projectDescription')}</p>
                <a className="btn btn-gradient-primary" href="#">
                  {t('portfolio.viewProject')}
                  <i className="bi-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
