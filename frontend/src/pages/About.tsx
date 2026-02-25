import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  const products = [
    {
      icon: '🚗',
      titleKey: 'about.automotive.title',
      descKey: 'about.automotive.description',
      featuresKey: 'about.automotive.features'
    },
    {
      icon: '🏥',
      titleKey: 'about.medical.title',
      descKey: 'about.medical.description',
      featuresKey: 'about.medical.features'
    },
    {
      icon: '⚡',
      titleKey: 'about.electronics.title',
      descKey: 'about.electronics.description',
      featuresKey: 'about.electronics.features'
    },
    {
      icon: '🔬',
      titleKey: 'about.engineering.title',
      descKey: 'about.engineering.description',
      featuresKey: 'about.engineering.features'
    },
  ]

  return (
    <>
      <header className="py-5 bg-primary">
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xxl-6">
              <div className="text-center my-5">
                <div className="text-center mb-4">
                  <img src="/logo.svg" alt={t('nav.brand')} className="mb-3" style={{ height: '80px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
                </div>
                <h1 className="fw-bolder mb-3 text-white">{t('about.pageTitle')}</h1>
                <p className="lead fw-normal text-white mb-4">{t('about.pageSubtitle')}</p>
                <a className="btn btn-success btn-lg" href="#company-intro">{t('common.learnMore')}</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 light-teal-bg" id="company-intro">
        <div className="container px-5 my-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6"><img className="img-fluid rounded mb-5 mb-lg-0" src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt={t('about.philosophy')} /></div>
            <div className="col-lg-6">
              <h2 className="fw-bolder gradient-text">{t('about.philosophy')}</h2>
              <div className="mb-3">
                <h5 className="fw-bold">{t('about.policy')}</h5>
                <p className="text-muted">{t('about.policyContent')}</p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold">{t('about.spirit')}</h5>
                <p className="text-muted">{t('about.spiritContent')}</p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold">{t('about.purpose')}</h5>
                <p className="text-muted">{t('about.purposeContent')}</p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold">{t('about.goal')}</h5>
                <p className="text-muted">{t('about.goalContent')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container px-5 my-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6 order-first order-lg-last"><img className="img-fluid rounded mb-5 mb-lg-0" src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt={t('about.equipment')} /></div>
            <div className="col-lg-6">
              <h2 className="fw-bolder gradient-text">{t('about.equipment')}</h2>
              <p className="lead fw-normal text-muted mb-4">{t('about.equipmentSubtitle')}</p>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.moldDept')}</h6>
                <p className="text-muted">{t('about.moldDeptContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.injectionDept')}</h6>
                <p className="text-muted">{t('about.injectionDeptContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.paintDept')}</h6>
                <p className="text-muted">{t('about.paintDeptContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.assemblyShop')}</h6>
                <p className="text-muted">{t('about.assemblyShopContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.testEquipment')}</h6>
                <p className="text-muted">{t('about.testEquipmentContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.medicalShop')}</h6>
                <p className="text-muted">{t('about.medicalShopContent')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 light-teal-bg">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">{t('about.productsAndApplications')}</h2>
            <p className="lead fw-normal text-muted mb-5">{t('about.productsSubtitle')}</p>
          </div>
          <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
            {products.map((product, idx) => {
              const features = t(product.featuresKey, { returnObjects: true }) as string[]
              return (
                <div key={idx} className="col mb-5 mb-5 mb-xl-0">
                  <div className="text-center elegant-shadow p-3 rounded">
                    <div className="display-4 mb-3">{product.icon}</div>
                    <h5 className="fw-bolder">{t(product.titleKey)}</h5>
                    <p className="text-muted mb-3">{t(product.descKey)}</p>
                    <div className="small">
                      {features.map((feature, fIdx) => (
                        <span key={fIdx} className="badge bg-success me-1 mb-1">{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-6">
              <h2 className="fw-bolder gradient-text">{t('about.qualityTitle')}</h2>
              <p className="lead fw-normal text-muted mb-4">{t('about.qualitySubtitle')}</p>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.certification')}</h6>
                <p className="text-muted">{t('about.certificationContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.qualification')}</h6>
                <p className="text-muted">{t('about.qualificationContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.moldProcess')}</h6>
                <p className="text-muted">{t('about.moldProcessContent')}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bolder gradient-text">{t('about.customersTitle')}</h2>
              <p className="lead fw-normal text-muted mb-4">{t('about.customersSubtitle')}</p>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.serviceRegion')}</h6>
                <p className="text-muted">{t('about.serviceRegionContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.serviceIndustry')}</h6>
                <p className="text-muted">{t('about.serviceIndustryContent')}</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">{t('about.materialExpertise')}</h6>
                <p className="text-muted">{t('about.materialExpertiseContent')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 light-teal-bg">
        <div className="container px-5 my-5">
          <div className="text-center">
            <h2 className="fw-bolder gradient-text">{t('about.commitment')}</h2>
            <p className="lead fw-normal text-muted mb-4">{t('about.commitmentContent')}</p>
            <div className="row gx-5 justify-content-center mt-5">
              <div className="col-lg-8">
                <div className="row gx-5 text-center">
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">20+</div>
                    <div className="text-muted">{t('about.moldEquipment')}</div>
                  </div>
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">31</div>
                    <div className="text-muted">{t('about.injectionMachines')}</div>
                  </div>
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">10万级</div>
                    <div className="text-muted">{t('about.cleanRoom')}</div>
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
