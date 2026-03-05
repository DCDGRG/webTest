import { useTranslation } from 'react-i18next'
import NewsSection from '../components/NewsSection'

export default function IndustryNews() {
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
                  <i className="bi bi-newspaper fs-1"></i>
                </div>
                <h1 className="fw-bolder mb-3 text-white">{t('blog.industryNews')}</h1>
                <p className="lead fw-normal text-white mb-4">{t('blog.industrySubtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Transition */}
      <div className="page-hero-transition"></div>

      <div className="py-5">
        <NewsSection
          title=""
          cols="row-cols-lg-2"
          category="industry"
        />
      </div>
    </>
  )
}
