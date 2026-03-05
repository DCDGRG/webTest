import { useTranslation } from 'react-i18next'

export default function Pricing() {
  const { t } = useTranslation()

  const moldDesignFeatures = t('pricing.moldDesignFeatures', { returnObjects: true }) as string[]
  const injectionMoldingFeatures = t('pricing.injectionMoldingFeatures', { returnObjects: true }) as string[]
  const surfaceTreatmentFeatures = t('pricing.surfaceTreatmentFeatures', { returnObjects: true }) as string[]

  const materials = [
    { name: 'PEEK', color: 'primary' },
    { name: 'PEI', color: 'success' },
    { name: 'PPSU', color: 'warning' },
    { name: 'PPS', color: 'info' },
    { name: 'PFA', color: 'danger' },
    { name: 'TPE', color: 'secondary' }
  ]

  return (
    <>
      {/* Page Hero with Gradient */}
      <header className="py-5 page-hero">
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xxl-6">
              <div className="text-center my-5">
                <div className="text-center mb-4">
                  <img src="/logo.svg" alt={t('nav.brand')} className="mb-3" style={{height: '80px', width: 'auto', filter: 'brightness(0) invert(1)'}} />
                </div>
                <h1 className="fw-bolder mb-3 text-white">{t('pricing.pageTitle')}</h1>
                <p className="lead fw-normal text-white mb-4">{t('pricing.pageSubtitle')}</p>
                <a className="btn btn-gradient-success btn-lg" href="#core-services">{t('common.learnMore')}</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Transition */}
      <div className="page-hero-transition"></div>

      <section className="py-5 section-gradient-teal" id="core-services">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">{t('pricing.coreServices')}</h2>
            <p className="lead fw-normal text-muted mb-0">{t('pricing.coreServicesSubtitle')}</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6 col-xl-4 mb-4">
              <div className="gradient-card h-100">
                <div className="card-header bg-success bg-gradient text-white text-center py-4" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
                  <h4 className="text-uppercase m-0">{t('pricing.moldDesign')}</h4>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <div className="display-4 fw-bold text-success">{t('pricing.moldDesignPrice')}</div>
                    <div className="text-muted">{t('pricing.moldDesignUnit')}</div>
                  </div>
                  <ul className="list-unstyled mb-4">
                    {moldDesignFeatures.map((feature, idx) => (
                      <li key={idx} className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>{feature}</li>
                    ))}
                  </ul>
                  <div className="d-grid">
                    <a className="btn btn-outline-success" href="/contact">{t('common.inquire')}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4 mb-4">
              <div className="gradient-card h-100">
                <div className="card-header bg-success bg-gradient text-white text-center py-4" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
                  <h4 className="text-uppercase m-0">
                    <i className="bi bi-star-fill text-warning me-2"></i>{t('pricing.injectionMolding')}
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <div className="display-4 fw-bold text-success">{t('pricing.injectionMoldingPrice')}</div>
                    <div className="text-muted">{t('pricing.injectionMoldingUnit')}</div>
                  </div>
                  <ul className="list-unstyled mb-4">
                    {injectionMoldingFeatures.map((feature, idx) => (
                      <li key={idx} className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>{feature}</li>
                    ))}
                  </ul>
                  <div className="d-grid">
                    <a className="btn btn-success" href="/contact">{t('common.inquireNow')}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4 mb-4">
              <div className="gradient-card h-100">
                <div className="card-header bg-warning bg-gradient text-white text-center py-4" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
                  <h4 className="text-uppercase m-0">{t('pricing.surfaceTreatment')}</h4>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <div className="display-4 fw-bold text-warning">{t('pricing.surfaceTreatmentPrice')}</div>
                    <div className="text-muted">{t('pricing.surfaceTreatmentUnit')}</div>
                  </div>
                  <ul className="list-unstyled mb-4">
                    {surfaceTreatmentFeatures.map((feature, idx) => (
                      <li key={idx} className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>{feature}</li>
                    ))}
                  </ul>
                  <div className="d-grid">
                    <a className="btn btn-outline-warning" href="/contact">{t('common.inquire')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition */}
      <div className="section-transition-up"></div>

      <section className="py-5">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">{t('pricing.applicationAreas')}</h2>
            <p className="lead fw-normal text-muted mb-0">{t('pricing.applicationAreasSubtitle')}</p>
          </div>
          <div className="row gx-5">
            <div className="col-lg-6 mb-5">
              <div className="gradient-card h-100 p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="gradient-feature me-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="bi bi-car-front-fill fs-4"></i>
                  </div>
                  <h4 className="mb-0">{t('pricing.automotive.title')}</h4>
                </div>
                <p className="text-muted mb-3">{t('pricing.automotive.description')}</p>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  <span className="gradient-tag">PBT-GF30</span>
                  <span className="gradient-tag">PPSU</span>
                  <span className="gradient-tag">PFA</span>
                  <span className="gradient-tag">PA66</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{t('pricing.automotive.features')}</small>
                  <a href="#" className="btn btn-sm btn-gradient-primary">{t('common.learnMore')}</a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5">
              <div className="gradient-card h-100 p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="gradient-feature me-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="bi bi-heart-pulse-fill fs-4"></i>
                  </div>
                  <h4 className="mb-0">{t('pricing.medical.title')}</h4>
                </div>
                <p className="text-muted mb-3">{t('pricing.medical.description')}</p>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {(t('pricing.medical.badges', { returnObjects: true }) as string[]).map((badge, idx) => (
                    <span key={idx} className="gradient-tag">{badge}</span>
                  ))}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{t('pricing.medical.features')}</small>
                  <a href="#" className="btn btn-sm btn-gradient-primary">{t('common.learnMore')}</a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5">
              <div className="gradient-card h-100 p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="gradient-feature me-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="bi bi-lightning-charge-fill fs-4"></i>
                  </div>
                  <h4 className="mb-0">{t('pricing.electronics.title')}</h4>
                </div>
                <p className="text-muted mb-3">{t('pricing.electronics.description')}</p>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  <span className="gradient-tag">PEI</span>
                  <span className="gradient-tag">PPS</span>
                  <span className="gradient-tag">PA66</span>
                  <span className="gradient-tag">PC/ABS</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{t('pricing.electronics.features')}</small>
                  <a href="#" className="btn btn-sm btn-gradient-primary">{t('common.learnMore')}</a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5">
              <div className="gradient-card h-100 p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="gradient-feature me-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="bi bi-gear-fill fs-4"></i>
                  </div>
                  <h4 className="mb-0">{t('pricing.engineeringPlastics.title')}</h4>
                </div>
                <p className="text-muted mb-3">{t('pricing.engineeringPlastics.description')}</p>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {(t('pricing.engineeringPlastics.badges', { returnObjects: true }) as string[]).map((badge, idx) => (
                    <span key={idx} className="gradient-tag">{badge}</span>
                  ))}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{t('pricing.engineeringPlastics.features')}</small>
                  <a href="#" className="btn btn-sm btn-gradient-primary">{t('common.learnMore')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition */}
      <div className="section-transition-down"></div>

      <section className="py-5 section-gradient-teal">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">{t('pricing.specialtyMaterials')}</h2>
            <p className="lead fw-normal text-muted mb-0">{t('pricing.specialtyMaterialsSubtitle')}</p>
          </div>
          <div className="row gx-5 justify-content-center">
            {materials.map((material, idx) => {
              const matData = t(`pricing.materials.${material.name}`, { returnObjects: true }) as { description: string; features: string[] }
              return (
                <div key={idx} className="col-lg-4 col-md-6 mb-4">
                  <div className="gradient-card h-100 text-center p-4">
                    <div className={`feature bg-${material.color} bg-gradient text-white rounded-3 mb-3 mx-auto`} style={{width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <h3 className="mb-0 fw-bold">{material.name}</h3>
                    </div>
                    <h5 className="card-title mb-3">{material.name}</h5>
                    <p className="card-text text-muted mb-3">{matData.description}</p>
                    <div className="d-flex flex-wrap justify-content-center gap-1 mb-3">
                      {matData.features.map((feature, fIdx) => (
                        <span key={fIdx} className="gradient-tag">{feature}</span>
                      ))}
                    </div>
                    <a href="#" className={`btn btn-outline-${material.color}`}>{t('pricing.viewDetails')}</a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transition */}
      <div className="section-transition-up"></div>

      <section className="py-5">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">{t('pricing.pricingExplanation')}</h2>
            <p className="lead fw-normal text-muted mb-0">{t('pricing.pricingExplanationSubtitle')}</p>
          </div>
          <div className="row gx-5">
            <div className="col-lg-6">
              <h3 className="fw-bolder mb-4">{t('pricing.pricingFactors')}</h3>
              <div className="mb-3">
                <h6 className="fw-bold">{t('pricing.materialSelection')}</h6>
                <p className="text-muted">{t('pricing.materialSelectionContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('pricing.productComplexity')}</h6>
                <p className="text-muted">{t('pricing.productComplexityContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('pricing.productionQuantity')}</h6>
                <p className="text-muted">{t('pricing.productionQuantityContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('pricing.qualityRequirements')}</h6>
                <p className="text-muted">{t('pricing.qualityRequirementsContent')}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="fw-bolder mb-4">{t('pricing.ourAdvantages')}</h3>
              <div className="mb-3">
                <h6 className="fw-bold">{t('pricing.technicalAdvantage')}</h6>
                <p className="text-muted">{t('pricing.technicalAdvantageContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('pricing.costControl')}</h6>
                <p className="text-muted">{t('pricing.costControlContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('pricing.serviceGuarantee')}</h6>
                <p className="text-muted">{t('pricing.serviceGuaranteeContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('pricing.qualityCommitment')}</h6>
                <p className="text-muted">{t('pricing.qualityCommitmentContent')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition */}
      <div className="section-transition-down"></div>

      <section className="py-5 section-gradient-teal">
        <div className="container px-5 my-5">
          <div className="text-center">
            <h2 className="fw-bolder gradient-text">{t('pricing.getQuote')}</h2>
            <p className="lead fw-normal text-muted mb-4">{t('pricing.getQuoteSubtitle')}</p>
            <div className="row gx-5 justify-content-center mt-5">
              <div className="col-lg-8">
                <div className="row gx-5 text-center">
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">{t('pricing.responseTime')}</div>
                    <div className="text-muted">{t('pricing.responseTimeLabel')}</div>
                  </div>
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">{t('pricing.freeConsultation')}</div>
                    <div className="text-muted">{t('pricing.freeConsultationLabel')}</div>
                  </div>
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">{t('pricing.customizedSolution')}</div>
                    <div className="text-muted">{t('pricing.customizedSolutionLabel')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a className="btn btn-gradient-success btn-lg me-3" href="/contact">{t('common.contactUs')}</a>
              <a className="btn btn-outline-light btn-lg" href="/about">{t('common.learnMore')}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
