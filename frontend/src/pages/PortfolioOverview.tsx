import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'

export default function PortfolioOverview() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        kicker={t('nav.portfolio')}
        title={t('portfolio.ourWork')}
        subtitle={t('portfolio.companyPortfolio')}
        iconClass="bi-grid-3x3-gap"
        compact
      />

      <section className="py-5">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            {[1,2,3,4].map((i) => (
              <div key={i} className="col-lg-6">
                <div className={`gradient-card position-relative ${i < 3 ? 'mb-5' : ''} p-3`}>
                  <img className="img-fluid rounded-3 mb-3" src="https://dummyimage.com/600x400/343a40/6c757d" alt="" />
                  <a className="h3 fw-bolder text-decoration-none link-dark stretched-link" href="#">{t('portfolio.projectName')}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition */}
      <div className="section-transition-down"></div>

      <section className="py-5 section-gradient-teal">
        <div className="container px-5 my-5">
          <h2 className="display-4 fw-bolder mb-4 gradient-text">{t('portfolio.buildTogether')}</h2>
          <a className="btn btn-gradient-primary btn-lg" href="/contact">{t('common.contactUs')}</a>
        </div>
      </section>
    </>
  )
}
