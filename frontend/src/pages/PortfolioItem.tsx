import { useTranslation } from 'react-i18next'

export default function PortfolioItem() {
  const { t } = useTranslation()

  return (
    <>
      {/* Page Hero with Gradient */}
      <header className="py-5 page-hero">
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xxl-6">
              <div className="text-center my-5">
                <h1 className="fw-bolder mb-3 text-white">{t('portfolio.projectTitle')}</h1>
                <p className="lead fw-normal text-white mb-4">{t('portfolio.projectDescription')}</p>
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
