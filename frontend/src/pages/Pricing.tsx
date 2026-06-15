import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import { isZhLocale } from '../utils/locale'

export default function Pricing() {
  const { i18n } = useTranslation()
  const isZh = isZhLocale(i18n.language)

  const capabilityProofs = isZh
    ? [
        { value: '24h', label: '初步响应', detail: '先看图纸、材料和批量。' },
        { value: '31', label: '注塑设备', detail: '50T-800T 覆盖打样到量产。' },
        { value: 'ISO', label: '质量体系', detail: '过程记录按体系执行。' },
        { value: 'DFM', label: '导入支持', detail: '评审、试样、量产切换。' }
      ]
    : [
        { value: '24h', label: 'Initial response', detail: 'First look at drawings, materials, and volume.' },
        { value: '31', label: 'Molding machines', detail: '50T-800T from pilot to production.' },
        { value: 'ISO', label: 'Quality systems', detail: 'Controlled under documented procedures.' },
        { value: 'DFM', label: 'Launch support', detail: 'Review, trials, and production handoff.' }
      ]

  const capabilityModules = isZh
    ? [
        {
            title: '前期评审与模具方案',
            description: '先判断结构、分型、浇口和公差风险。',
            points: ['图纸评审', '模流建议']
        },
        {
            title: 'CNC 加工与模具制造',
            description: '加工、试模和修模放在同一节奏里推进。',
            points: ['CNC / EDM 加工', '试模修正']
        },
        {
            title: '注塑成型与试样验证',
            description: '确认材料、尺寸、外观和过程稳定性。',
            points: ['50T-800T 注塑', '双色 / 薄壁工艺']
        },
        {
            title: '表面处理与装配交付',
            description: '喷涂、印刷、焊接和装配可集中协同。',
            points: ['喷涂 / 印刷', '装配与出货']
        }
      ]
    : [
        {
          title: 'Early review and tooling plan',
          description: 'Parting, gate, tolerance, and tooling risk are checked first.',
          points: ['Drawing review', 'Mold-flow guidance']
        },
        {
          title: 'CNC machining and tool build',
          description: 'Machining, trials, and corrections stay in one loop.',
          points: ['CNC / EDM machining', 'Trial correction']
        },
        {
          title: 'Molding and sample validation',
          description: 'Materials, dimensions, appearance, and repeatability are confirmed in trials.',
          points: ['50T-800T molding', 'Two-shot / thin-wall']
        },
        {
          title: 'Finishing and assembly delivery',
          description: 'Coating, printing, welding, and assembly move under one schedule.',
          points: ['Finishing processes', 'Assembly and shipment']
        }
      ]

  const processSteps = isZh
    ? [
        { title: '需求确认', description: '图纸、材料和批量。' },
        { title: '技术评估', description: '结构、工艺和风险判断。' },
        { title: '试样推进', description: '模具、试模和参数确认。' },
        { title: '检验交付', description: '检验、包装和出货配合。' }
      ]
    : [
        { title: 'Requirement review', description: 'Drawings, materials, and expected volume.' },
        { title: 'Technical evaluation', description: 'Structure, process path, and risk.' },
        { title: 'Trial execution', description: 'Tooling, trials, and parameter setting.' },
        { title: 'Inspection and delivery', description: 'Checks, packing, and shipment.' }
      ]

  const equipmentGroups = isZh
    ? [
        {
          title: '设备基础',
          items: ['50T-800T 注塑设备', 'CNC 加工中心', '火花机与线切割', '喷涂 / UV', '装配工位']
        },
        {
          title: '支持材料',
          items: ['PEEK / PEI / PPSU', 'PPS / PFA / TPE', '工程塑料', '医疗与耐温材料']
        },
        {
          title: '加工方式',
          items: ['常规 / 薄壁注塑', '双色 / 嵌件注塑', '喷涂与印刷', '焊接与装配']
        }
      ]
    : [
        {
          title: 'Equipment base',
          items: ['50T-800T molding machines', 'CNC machining centers', 'EDM and wire cutting', 'Spray / UV line', 'Assembly stations']
        },
        {
          title: 'Supported materials',
          items: ['PEEK / PEI / PPSU', 'PPS / PFA / TPE', 'Engineering plastics', 'Medical and high-temperature materials']
        },
        {
          title: 'Process coverage',
          items: ['Standard / thin-wall molding', 'Two-shot / insert molding', 'Coating and printing', 'Welding and assembly']
        }
      ]

  const materials = [
    { name: 'PEEK', description: isZh ? '适合高温和尺寸要求更高的零件。' : 'For higher heat and dimensional requirements.' },
    { name: 'PPSU', description: isZh ? '常用于耐温、耐化学场景。' : 'Often used in high-heat and chemical-resistant applications.' },
    { name: 'PFA', description: isZh ? '适合高洁净和耐腐蚀方向。' : 'Used where cleanliness and corrosion resistance matter.' },
    { name: 'TPE', description: isZh ? '适合包胶、密封和柔性接触件。' : 'Suitable for overmolding, sealing, and soft-touch parts.' }
  ]

  const industries = isZh
    ? [
        { title: '汽车零部件', description: '结构件、功能件和稳定交付项目。' },
        { title: '消费电子', description: '外观一致性和装配精度要求较高。' },
        { title: '工业设备', description: '尺寸稳定和材料耐受要求明确。' },
        { title: '医疗与洁净制造', description: '对材料和过程控制要求更高。' }
      ]
    : [
        { title: 'Automotive parts', description: 'For structural and functional parts with stable supply needs.' },
        { title: 'Consumer electronics', description: 'For cosmetic consistency and fit-critical parts.' },
        { title: 'Industrial equipment', description: 'For dimensional stability and material resistance.' },
        { title: 'Medical and clean manufacturing', description: 'For tighter material and process-control requirements.' }
      ]

  const deliveryPoints = isZh
    ? [
        { title: '质量标准', description: '按 ISO 体系组织记录和控制。' },
        { title: '检验方式', description: '尺寸、外观和功能确认。' },
        { title: '交付节奏', description: '支持打样到量产切换。' },
        { title: '项目支持', description: '异常反馈和交付跟进。' }
      ]
    : [
        { title: 'Quality standards', description: 'Controlled under ISO-based procedures.' },
        { title: 'Inspection coverage', description: 'Dimensional, cosmetic, and functional checks.' },
        { title: 'Delivery rhythm', description: 'From pilot runs to production handoff.' },
        { title: 'Program support', description: 'Issue response and shipment follow-up.' }
      ]

  const heroTitle = isZh ? '制造能力总览' : 'Manufacturing Capabilities'
  const heroSubtitle = isZh
    ? '模具、注塑、表面处理和装配交付的核心能力概览。'
    : 'A concise view of tooling, molding, finishing, and assembly capability.'

  return (
    <>
      <PageHeader
        kicker={isZh ? '制造能力' : 'Capabilities'}
        title={heroTitle}
        subtitle={heroSubtitle}
        variant="capability"
        showLogo
        ctaLabel={isZh ? '提交项目需求' : 'Submit Project Brief'}
        ctaHref="/contact"
        links={[
          { label: isZh ? '能力模块' : 'Capability Modules', href: '#capability-modules' },
          { label: isZh ? '制造流程' : 'Process Flow', href: '#process-flow' },
          { label: isZh ? '设备与材料' : 'Equipment & Materials', href: '#equipment-materials' },
          { label: isZh ? '质量与交付' : 'Quality & Delivery', href: '#quality-delivery' }
        ]}
        metaItems={[
          {
            label: isZh ? '工艺支持' : 'Process support',
            value: isZh ? '评审、试样、量产导入' : 'Review, trials, and launch'
          },
          {
            label: isZh ? '设备覆盖' : 'Equipment coverage',
            value: isZh ? '50T-800T 注塑与加工支持' : '50T-800T molding and tool support'
          },
          {
            label: isZh ? '交付支持' : 'Delivery support',
            value: isZh ? '检验记录、追溯和出货配合' : 'Records, traceability, and shipment support'
          }
        ]}
      />

      <section className="manufacturing-overview-section">
        <div className="container px-4 px-lg-5">
          <div className="manufacturing-intro">
            <div className="manufacturing-intro-copy">
              <p className="section-kicker">{isZh ? '能力范围' : 'Capability Scope'}</p>
              <h2 className="section-title">
                {isZh ? '先看范围，再判断项目能不能推进。' : 'Start with scope, then judge whether the program is practical.'}
              </h2>
              <p className="section-subtitle mb-0">
                {isZh
                  ? '把客户最常问的工艺、设备、交付和质量信息放在一起。'
                  : 'The most practical information is grouped here: process, equipment, delivery, and quality.'}
              </p>
            </div>
            <div className="manufacturing-proof-grid">
              {capabilityProofs.map((item) => (
                <article key={item.label} className="manufacturing-proof-item">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="manufacturing-section" id="capability-modules">
        <div className="container px-4 px-lg-5">
          <div className="manufacturing-section-head">
            <p className="section-kicker">{isZh ? '能力模块' : 'Capability Modules'}</p>
            <h2 className="section-title">{isZh ? '可以承担的制造环节' : 'Manufacturing stages we can own'}</h2>
          </div>
          <div className="capability-module-list">
            {capabilityModules.map((module, index) => (
              <article key={module.title} className="capability-module-row">
                <div className="capability-module-index">{`0${index + 1}`}</div>
                <div className="capability-module-copy">
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
                <div className="capability-module-points">
                  {module.points.map((point) => (
                    <div key={point} className="capability-module-point">
                      <i className="bi bi-dash-lg"></i>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="manufacturing-section manufacturing-section-muted" id="process-flow">
        <div className="container px-4 px-lg-5">
          <div className="manufacturing-section-head">
            <p className="section-kicker">{isZh ? '制造流程' : 'Manufacturing Flow'}</p>
            <h2 className="section-title">{isZh ? '项目推进节奏' : 'Project workflow'}</h2>
          </div>
          <div className="process-flow-grid">
            {processSteps.map((step, index) => (
              <article key={step.title} className="process-flow-step">
                <span className="process-flow-number">{`0${index + 1}`}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="manufacturing-section" id="equipment-materials">
        <div className="container px-4 px-lg-5">
          <div className="manufacturing-section-head">
            <p className="section-kicker">{isZh ? '设备与材料' : 'Equipment and Materials'}</p>
            <h2 className="section-title">{isZh ? '设备、材料与工艺范围' : 'Equipment, materials, and process range'}</h2>
          </div>
          <div className="equipment-material-grid">
            {equipmentGroups.map((group) => (
              <article key={group.title} className="equipment-material-block">
                <h3>{group.title}</h3>
                <div className="equipment-material-list">
                  {group.items.map((item) => (
                    <div key={item} className="equipment-material-item">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="material-reference-strip">
            {materials.map((material) => (
              <article key={material.name} className="material-reference-item">
                <strong>{material.name}</strong>
                <p>{material.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="manufacturing-section manufacturing-section-muted">
        <div className="container px-4 px-lg-5">
          <div className="manufacturing-section-head">
            <p className="section-kicker">{isZh ? '适用行业' : 'Industry Fit'}</p>
            <h2 className="section-title">{isZh ? '常见应用方向' : 'Typical applications'}</h2>
          </div>
          <div className="industry-fit-grid">
            {industries.map((industry) => (
              <article key={industry.title} className="industry-fit-item">
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="manufacturing-section" id="quality-delivery">
        <div className="container px-4 px-lg-5">
          <div className="manufacturing-section-head">
            <p className="section-kicker">{isZh ? '质量与交付' : 'Quality and Delivery'}</p>
            <h2 className="section-title">{isZh ? '质量控制与交付支持' : 'Quality control and delivery support'}</h2>
          </div>
          <div className="delivery-assurance-list">
            {deliveryPoints.map((item) => (
              <article key={item.title} className="delivery-assurance-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-promo-section">
        <div className="container px-4 px-lg-5">
          <div className="quote-promo-shell manufacturing-cta-shell">
            <div>
              <p className="section-kicker">{isZh ? '项目沟通' : 'Project Intake'}</p>
              <h2 className="final-cta-title">
                {isZh ? '已有图纸、材料方向或预计批量，可先进入制造评估。' : 'If drawings, material direction, or expected volume are ready, we can start with a manufacturing review.'}
              </h2>
            </div>
            <div className="final-cta-actions">
              <Link className="btn-cta-primary" to="/contact">{isZh ? '提交项目需求' : 'Submit Project Brief'}</Link>
              <Link className="final-cta-link" to="/contact">
                {isZh ? '查看提交流程' : 'View inquiry path'} <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
