import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'

export default function PortfolioItem() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        kicker={t('nav.portfolio')}
        title={t('portfolio.projectTitle')}
        subtitle={t('portfolio.projectDescription')}
        compact
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
