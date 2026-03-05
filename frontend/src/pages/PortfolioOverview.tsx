import { useTranslation } from 'react-i18next'

export default function PortfolioOverview() {
  const { t } = useTranslation()

  return (
    <>
      {/* Page Hero with Gradient */}
      <header className="py-5 page-hero">
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xxl-6">
              <div className="text-center my-5">
                <div className="gradient-feature mb-4 mx-auto" style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-grid-3x3-gap fs-1"></i>
                </div>
                <h1 className="fw-bolder mb-3 text-white">{t('portfolio.ourWork')}</h1>
                <p className="lead fw-normal text-white mb-4">{t('portfolio.companyPortfolio')}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Transition */}
      <div className="page-hero-transition"></div>

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
