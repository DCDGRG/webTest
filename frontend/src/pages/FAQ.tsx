import { useTranslation } from 'react-i18next'

export default function FAQ() {
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
                  <i className="bi bi-question-circle fs-1"></i>
                </div>
                <h1 className="fw-bolder mb-3 text-white">{t('faq.pageTitle')}</h1>
                <p className="lead fw-normal text-white mb-4">{t('faq.pageSubtitle')}</p>
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
            <div className="col-xl-8">
              <h2 className="fw-bolder mb-3 gradient-text">{t('faq.accountBilling')}</h2>
              <div className="accordion mb-5" id="accordionExample">
                <div className="accordion-item">
                  <h3 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">{t('faq.accordionItem1')}</button>
                  </h3>
                  <div className="accordion-collapse collapse show" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <strong>{t('faq.accordionItem1Answer')}</strong>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">{t('faq.accordionItem2')}</button>
                  </h3>
                  <div className="accordion-collapse collapse" id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <strong>{t('faq.accordionItem2Answer')}</strong>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">{t('faq.accordionItem3')}</button>
                  </h3>
                  <div className="accordion-collapse collapse" id="collapseThree" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <strong>{t('faq.accordionItem3Answer')}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="fw-bolder mb-3 gradient-text">{t('faq.websiteIssues')}</h2>
              <div className="accordion mb-5 mb-xl-0" id="accordionExample2">
                <div className="accordion-item">
                  <h3 className="accordion-header" id="headingOne2">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne2">{t('faq.accordionItem1')}</button>
                  </h3>
                  <div className="accordion-collapse collapse show" id="collapseOne2" aria-labelledby="headingOne2" data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      <strong>{t('faq.accordionItem1Answer')}</strong>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header" id="headingTwo2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2">{t('faq.accordionItem2')}</button>
                  </h3>
                  <div className="accordion-collapse collapse" id="collapseTwo2" aria-labelledby="headingTwo2" data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      <strong>{t('faq.accordionItem2Answer')}</strong>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header" id="headingThree2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree2" aria-expanded="false" aria-controls="collapseThree2">{t('faq.accordionItem3')}</button>
                  </h3>
                  <div className="accordion-collapse collapse" id="collapseThree2" aria-labelledby="headingThree2" data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      <strong>{t('faq.accordionItem3Answer')}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="gradient-card mt-xl-5 p-4">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <div className="h6 fw-bolder">{t('faq.moreQuestions')}</div>
                    <p className="text-muted mb-4">
                      {t('faq.contactAt')}
                      <br />
                      <a href="#" className="text-success">support@domain.com</a>
                    </p>
                    <div className="h6 fw-bolder">{t('faq.followUs')}</div>
                    <a className="fs-5 px-2 link-dark" href="#"><i className="bi bi-twitter"></i></a>
                    <a className="fs-5 px-2 link-dark" href="#"><i className="bi bi-facebook"></i></a>
                    <a className="fs-5 px-2 link-dark" href="#"><i className="bi bi-linkedin"></i></a>
                    <a className="fs-5 px-2 link-dark" href="#"><i className="bi bi-youtube"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
