import { useTranslation } from 'react-i18next'

export default function PortfolioItem() {
  const { t } = useTranslation()

  return (
    <section className="py-5">
      <div className="container px-5 my-5">
        <div className="row gx-5 justify-content-center">
          <div className="col-lg-6">
            <div className="text-center mb-5">
              <h1 className="fw-bolder">{t('portfolio.projectTitle')}</h1>
              <p className="lead fw-normal text-muted mb-0">{t('portfolio.projectDescription')}</p>
            </div>
          </div>
        </div>
        <div className="row gx-5">
          <div className="col-12"><img className="img-fluid rounded-3 mb-5" src="https://dummyimage.com/1300x700/343a40/6c757d" alt="" /></div>
          <div className="col-lg-6"><img className="img-fluid rounded-3 mb-5" src="https://dummyimage.com/600x400/343a40/6c757d" alt="" /></div>
          <div className="col-lg-6"><img className="img-fluid rounded-3 mb-5" src="https://dummyimage.com/600x400/343a40/6c757d" alt="" /></div>
        </div>
        <div className="row gx-5 justify-content-center">
          <div className="col-lg-6">
            <div className="text-center mb-5">
              <p className="lead fw-normal text-muted">{t('portfolio.projectDescription')}</p>
              <a className="text-decoration-none" href="#">
                {t('portfolio.viewProject')}
                <i className="bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
