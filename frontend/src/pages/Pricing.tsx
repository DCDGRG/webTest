import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'

export default function Pricing() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language === 'zh-CN' || i18n.language === 'zh'

  const moldDesignFeatures = t('pricing.moldDesignFeatures', { returnObjects: true }) as string[]
  const injectionMoldingFeatures = t('pricing.injectionMoldingFeatures', { returnObjects: true }) as string[]
  const surfaceTreatmentFeatures = t('pricing.surfaceTreatmentFeatures', { returnObjects: true }) as string[]

  const capabilityBands = [
    {
      index: '01',
      title: t('pricing.moldDesign'),
      price: t('pricing.moldDesignPrice'),
      unit: t('pricing.moldDesignUnit'),
      description: isZh
        ? '以前期评审、模流分析和结构建议，把后续试模与量产切换做得更稳。'
        : 'Engineering review, mold-flow simulation, and structural recommendations reduce risk before tooling enters production.',
      features: moldDesignFeatures.slice(0, 4),
      tags: isZh ? ['3D数据确认', '模流分析', 'CNC加工', '模具试模'] : ['3D review', 'Mold flow', 'CNC machining', 'Tool trials'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl-YdkODqF_373dwGfs-wocVHOJf1QhUjcFLjkbgsN4q9zCMRCbMq2SSIgr-OBeybCgLgL7F1Ssc6ExiYFyAmMkLkSqOY_PHQBVUmrCOfsPXLTl4eiU-5TzQxxBVIJOSRgNlev6V2g5SrGpqYCCA52Oje7UcxhOYVtsUTZMIQPDaQTemvftS3OATI9jp-LZ1cx_dpN3VbSlcUDLNq6iXMPCla7Fl3vZUh7jAja0X2ldReJABVEe8u5oEHxyvOCqR4N_GjAt7QUwc2C',
      statLabel: isZh ? '缩短 T0 周期' : 'faster T0 planning',
      statValue: '35%'
    },
    {
      index: '02',
      title: t('pricing.injectionMolding'),
      price: t('pricing.injectionMoldingPrice'),
      unit: t('pricing.injectionMoldingUnit'),
      description: isZh
        ? '覆盖 50T-800T 注塑设备与高性能材料，适合对精度、洁净度和交期有要求的项目。'
        : '31 molding machines, specialty materials, and clean manufacturing controls support demanding production programs.',
      features: injectionMoldingFeatures.slice(0, 4),
      tags: isZh ? ['50T-800T', '双色注塑', '医疗级', '高性能材料'] : ['50T-800T', 'Two-shot', 'Medical grade', 'Specialty plastics'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe_pVGlGuGi9Dx6Eoy5hEq8NuGhBy8IBtjIaDL6zlqWQe7cW5BuTIT-0P_mP8cENnx70EuEJMuMNjLB_-Ic0uRKbi5_KtgsKXpuYlQd5O2QtZOVg0qKkVbvpkNSbcnOA7XSb_QSgAz7sO5X1FIw-wm623O6MbGXG-kSA9Mw7NFMgpjSffyBothT4Ng-j-2IBOgk2pmTrDJYt3K-27YQrKgyz4HtFAYytxNsGWkVY32saoxy7AT2GJN2lSLfCEGukswOjsXn4UBCESa',
      statLabel: isZh ? '稳定精度控制' : 'repeatable tolerance control',
      statValue: '±0.01mm'
    },
    {
      index: '03',
      title: t('pricing.surfaceTreatment'),
      price: t('pricing.surfaceTreatmentPrice'),
      unit: t('pricing.surfaceTreatmentUnit'),
      description: isZh
        ? '把喷涂、UV、丝印、移印和装配放到同一交付节奏里，减少跨供应商沟通成本。'
        : 'Finishing, UV, printing, and assembly stay on one coordinated delivery path instead of fragmenting across vendors.',
      features: surfaceTreatmentFeatures.slice(0, 4),
      tags: isZh ? ['无尘喷漆', 'UV工艺', '丝印移印', '组装检测'] : ['Clean spray', 'UV process', 'Printing', 'Assembly'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxeC9KccqxAkoKxr1aKOPIMyAp_Hj-GFVqe5aTAi122w67FFfft570x1-cfjJRGiKkIOkMrgchqs4BRukGYAq3Jiywhu6gVdy4yndrG8dzx09Hsd4v-PnHmhbKy5V79oJw3mGJkoDRt-Kxe0SalFOzQek4O-OoTgzmp1jpyKN3_0q39xMA7_bdnRPECgOOtLhDK6hPTYsHbFNpDkR5DbPMFCWHcLPSA8LdCjidvrlKgdR00JfWyST0xMLA5-5PHtXx7eEVYgUnlbn8',
      statLabel: isZh ? '洁净与外观工艺' : 'clean finishing workflow',
      statValue: '100K'
    }
  ]

  const overviewStats = isZh
    ? [
        { value: '24h', label: '初步响应' },
        { value: '31', label: '注塑设备' },
        { value: 'ISO', label: '质量体系' }
      ]
    : [
        { value: '24h', label: 'first response' },
        { value: '31', label: 'injection machines' },
        { value: 'ISO', label: 'quality systems' }
      ]

  const performanceMetrics = isZh
    ? [
        { label: '质量达成率', value: '99.8%', bars: [44, 68, 94] },
        { label: '设备效率', value: 'OEE 88%', bars: [78, 70, 86] },
        { label: '周期优化', value: '-12.5%', bars: [34, 54, 76] }
      ]
    : [
        { label: 'quality yield', value: '99.8%', bars: [44, 68, 94] },
        { label: 'equipment efficiency', value: 'OEE 88%', bars: [78, 70, 86] },
        { label: 'cycle optimization', value: '-12.5%', bars: [34, 54, 76] }
      ]

  const materials = [
    { name: 'PEEK', description: t('pricing.materials.PEEK.description') },
    { name: 'PEI', description: t('pricing.materials.PEI.description') },
    { name: 'PPSU', description: t('pricing.materials.PPSU.description') },
    { name: 'PPS', description: t('pricing.materials.PPS.description') },
    { name: 'PFA', description: t('pricing.materials.PFA.description') },
    { name: 'TPE', description: t('pricing.materials.TPE.description') }
  ]

  return (
    <>
      <PageHeader
        kicker={t('nav.products')}
        title={t('pricing.pageTitle')}
        subtitle={t('pricing.pageSubtitle')}
        showLogo
        ctaLabel={isZh ? '提交项目需求' : 'Send Project Brief'}
        ctaHref="/contact"
      />

      <section className="capability-intro-section" id="core-services">
        <div className="container px-4 px-lg-5">
          <div className="row g-4 align-items-end">
            <div className="col-lg-7">
              <div className="section-header section-header-compact mb-0">
                <p className="section-kicker">{isZh ? '能力框架' : 'Capability System'}</p>
                <h2 className="section-title">
                  {isZh ? '把“产品服务”页面改成更像制造能力页面。' : 'A services page that reads like a manufacturing capability brief.'}
                </h2>
                <p className="section-subtitle mb-0">
                  {isZh
                    ? '参考 Stitch 的章节式结构，我们保留现有内容，但把表达方式收成了更直接的能力、指标和材料视角。'
                    : 'The content stays grounded in the current site, but the structure now follows a more editorial, engineering-first layout inspired by Stitch.'}
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="capability-overview-grid">
                {overviewStats.map((item) => (
                  <div key={item.label} className="capability-overview-stat">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {capabilityBands.map((band, index) => (
        <section
          key={band.title}
          className={`capability-band ${index % 2 === 1 ? 'capability-band-alt' : ''}`}
        >
          <div className="container px-4 px-lg-5">
            <div className="row g-5 align-items-center">
              <div className={`col-lg-6 ${index % 2 === 1 ? 'order-lg-2' : ''}`}>
                <div className="capability-band-media">
                  <img src={band.image} alt={band.title} />
                  <div className="capability-band-badge">
                    <span>{band.statLabel}</span>
                    <strong>{band.statValue}</strong>
                  </div>
                </div>
              </div>
              <div className={`col-lg-6 ${index % 2 === 1 ? 'order-lg-1' : ''}`}>
                <div className="capability-band-copy">
                  <div className="capability-band-index">
                    <span>{band.index}</span>
                    <div></div>
                  </div>
                  <h2>{band.title}</h2>
                  <p className="capability-band-description">{band.description}</p>
                  <div className="capability-band-price">
                    <strong>{band.price}</strong>
                    <span>{band.unit}</span>
                  </div>
                  <div className="industry-tags mb-4">
                    {band.tags.map((tag) => (
                      <span key={tag} className="industry-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="capability-feature-list">
                    {band.features.map((feature) => (
                      <div key={feature} className="capability-feature-item">
                        <i className="bi bi-check2"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="precision-metrics-section">
        <div className="container px-4 px-lg-5">
          <div className="row g-5 align-items-start">
            <div className="col-lg-4">
              <p className="section-kicker">{isZh ? '制造指标' : 'Precision Metrics'}</p>
              <h2 className="section-title">
                {isZh ? '让能力描述配上更直观的数据感。' : 'Supporting the capability story with a clearer performance rhythm.'}
              </h2>
              <p className="section-subtitle mb-0">
                {isZh
                  ? '不把页面做复杂，而是用少量图形和数字把质量、效率和周期感受讲清楚。'
                  : 'Rather than adding complexity, the section uses a few simple visual cues to explain yield, efficiency, and cycle improvement.'}
              </p>
            </div>
            <div className="col-lg-8">
              <div className="row g-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.label} className="col-md-4">
                    <div className="metric-card">
                      <div className="metric-bars">
                        {metric.bars.map((height, idx) => (
                          <span key={`${metric.label}-${idx}`} style={{ height: `${height}%` }}></span>
                        ))}
                      </div>
                      <p>{metric.label}</p>
                      <strong>{metric.value}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="materials-editorial-section">
        <div className="container px-4 px-lg-5">
          <div className="section-header text-center mx-auto">
            <p className="section-kicker">{t('pricing.specialtyMaterials')}</p>
            <h2 className="section-title">
              {isZh ? '材料专长保留，但表达更轻一些。' : 'Material expertise, presented in a lighter and clearer way.'}
            </h2>
            <p className="section-subtitle mb-0">{t('pricing.specialtyMaterialsSubtitle')}</p>
          </div>

          <div className="materials-editorial-grid">
            {materials.map((material) => (
              <article key={material.name} className="material-editorial-card">
                <div className="material-editorial-head">
                  <strong>{material.name}</strong>
                  <span>{isZh ? '特种材料' : 'Specialty polymer'}</span>
                </div>
                <p>{material.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-promo-section">
        <div className="container px-4 px-lg-5">
          <div className="quote-promo-shell">
            <div>
              <p className="section-kicker">{t('pricing.getQuote')}</p>
              <h2 className="final-cta-title">
                {isZh ? '如果你已经有图纸、材料方向或量产节奏，我们可以开始评估。' : 'If you already have drawings, material goals, or a target production rhythm, we can start reviewing it.'}
              </h2>
            </div>
            <div className="final-cta-actions">
              <Link className="btn-cta-primary" to="/contact">{t('common.contactUs')}</Link>
              <Link className="final-cta-link" to="/about">
                {t('common.learnMore')} <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
