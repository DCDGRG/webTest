import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import PageHeader from '../components/PageHeader'
import { isZhLocale } from '../utils/locale'
import { usePageMeta } from '../hooks/usePageMeta'

// EmailJS credentials — overridable via env (VITE_EMAILJS_*), with the existing
// project values as fallback so the form keeps working without extra config.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_5zuwifn'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_tmqtmbu'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'BATcGtGTu--0S1rZz'

export default function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const { t, i18n } = useTranslation()
  const isZh = isZhLocale(i18n.language)

  usePageMeta(
    isZh ? '联系我们 | 上海奎星电子科技' : 'Contact Us | Shanghai Kuixing Electronics',
    isZh
      ? '提交图纸、材料方向与预计批量，我们将在 24 小时内做出初步制造与可行性评估。'
      : 'Send drawings, material direction and expected volume for an initial manufacturing review within 24 hours.'
  )

  const industries = isZh
    ? ['医疗器械', '汽车零部件', '电子电器', '智能家居', '工业设备']
    : ['Medical devices', 'Automotive parts', 'Electronics', 'Smart home', 'Industrial equipment']

  const volumes = isZh
    ? ['打样 / 小批量', '5,000 件以内', '5,000 - 50,000 件', '50,000 件以上']
    : ['Prototype / pilot', 'Below 5,000 pcs', '5,000 - 50,000 pcs', '50,000+ pcs']

  const timelines = isZh
    ? ['尽快推进', '1-3 个月', '3-6 个月', '方案评估阶段']
    : ['ASAP', '1-3 months', '3-6 months', 'Planning stage']

  const materialOptions = ['PEEK', 'PEI', 'PPSU', 'PPS', 'PFA', 'TPE']

  const projectSteps = isZh
    ? [
        { state: '进行中', title: '项目需求' },
        { state: '准备中', title: '图纸与材料' },
        { state: '准备中', title: '联系方式' }
      ]
    : [
        { state: 'Active', title: 'Project brief' },
        { state: 'Pending', title: 'Files and materials' },
        { state: 'Pending', title: 'Contact info' }
      ]

  const supportPromises = isZh
    ? [
        '24 小时内初步响应',
        '提供 DFM 与材料方向建议',
        '支持 NDA 与项目资料保密'
      ]
    : [
        'First response within 24 hours',
        'DFM and material direction support',
        'NDA-ready project handling'
      ]

  const sendEmail = (e: FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    const el = form.current
    if (!el) return

    const data = new FormData(el)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const phoneValid = phone === '' || /^[+\d][\d\s()\-]{5,}$/.test(phone)

    if (!name || !email || !message) {
      setFeedback({ type: 'error', text: isZh ? '请填写姓名、邮箱和需求说明。' : 'Please fill in your name, email and message.' })
      return
    }
    if (!emailValid) {
      setFeedback({ type: 'error', text: isZh ? '请输入有效的邮箱地址。' : 'Please enter a valid email address.' })
      return
    }
    if (!phoneValid) {
      setFeedback({ type: 'error', text: isZh ? '请输入有效的电话号码。' : 'Please enter a valid phone number.' })
      return
    }

    setIsSubmitting(true)
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, el, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setFeedback({ type: 'success', text: t('contact.successMessage') })
        el.reset()
      })
      .catch(() => {
        setFeedback({
          type: 'error',
          text: isZh
            ? '提交失败，请稍后重试，或直接邮件联系我们。'
            : 'Submission failed. Please try again later, or email us directly.'
        })
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <>
      <PageHeader
        kicker={t('nav.contact')}
        title={t('contact.pageTitle')}
        subtitle={t('contact.pageSubtitle')}
        variant="contact"
        iconClass="bi-envelope-paper-fill"
        compact
        links={[
          { label: isZh ? '提交需求' : 'Inquiry Form', href: '#contact-form' },
          { label: isZh ? '制造能力' : 'Capabilities', href: '/pricing' },
          { label: isZh ? '公司概况' : 'Company Profile', href: '/about' }
        ]}
        metaItems={[
          {
            label: isZh ? '沟通路径' : 'Inquiry path',
            value: isZh ? '需求确认、工艺判断、后续跟进' : 'Requirement review, process evaluation, and follow-up'
          },
          {
            label: isZh ? '联系方式' : 'Contact',
            value: isZh ? 'support@domain.com / (021) 1234-5678' : 'support@domain.com / (021) 1234-5678'
          },
          {
            label: isZh ? '工厂与办公' : 'Factory and office',
            value: isZh ? '上海制造支持与项目沟通' : 'Shanghai manufacturing support and project coordination'
          }
        ]}
      />

      <section className="quote-intake-section" id="contact-form">
        <div className="container px-4 px-lg-5">
          <div className="quote-intake-shell">
            <aside className="quote-sidebar">
              <p className="section-kicker">{isZh ? '项目沟通' : 'Project Intake'}</p>
              <h2>
                {isZh ? '先把项目背景、材料方向和交付要求说明清楚。' : 'Start with the project background, material direction, and delivery requirements.'}
              </h2>
              <p>
                {isZh
                  ? '我们会根据这些信息判断工艺路径、打样安排和后续沟通方式，便于尽快进入评估。'
                  : 'These details help us judge the process path, sample plan, and follow-up workflow before formal review starts.'}
              </p>

              <div className="quote-sidebar-steps">
                {projectSteps.map((step, index) => (
                  <div key={step.title} className={`quote-step ${index === 0 ? 'quote-step-active' : ''}`}>
                    <div className="quote-step-number">{`0${index + 1}`}</div>
                    <div>
                      <span>{step.state}</span>
                      <strong>{step.title}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="quote-sidebar-note">
                <div className="quote-sidebar-note-dot"></div>
                <div>
                  <span>{isZh ? '体系状态' : 'System status'}</span>
                  <strong>{isZh ? 'ISO 9001 / ISO 13485 制造体系' : 'ISO 9001 / ISO 13485 manufacturing system'}</strong>
                </div>
              </div>

              <div className="quote-sidebar-links">
                <Link to="/pricing">{isZh ? '查看制造能力' : 'View capabilities'}</Link>
                <Link to="/about">{t('hero.aboutUs')}</Link>
              </div>
            </aside>

            <div className="quote-form-shell">
              <form ref={form} onSubmit={sendEmail} className="quote-form-layout" noValidate>
                <section className="quote-form-block">
                  <div className="quote-form-heading">
                    <span>01</span>
                    <div>
                      <h3>{isZh ? '项目参数' : 'Project parameters'}</h3>
                      <p>{isZh ? '先告诉我们行业、体量和材料方向。' : 'Start with industry, target volume, and material direction.'}</p>
                    </div>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="quote-label" htmlFor="industry">{isZh ? '目标行业' : 'Target industry'}</label>
                      <select className="form-select quote-input" id="industry" name="industry" defaultValue="">
                        <option value="">{isZh ? '请选择行业' : 'Select an industry'}</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="quote-label" htmlFor="volume">{isZh ? '预计体量' : 'Expected volume'}</label>
                      <select className="form-select quote-input" id="volume" name="volume" defaultValue="">
                        <option value="">{isZh ? '请选择体量' : 'Select a volume'}</option>
                        {volumes.map((volume) => (
                          <option key={volume} value={volume}>{volume}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="quote-label">{isZh ? '材料方向' : 'Material direction'}</label>
                      <div className="quote-chip-group">
                        {materialOptions.map((material) => (
                          <label key={material} className="quote-chip">
                            <input type="checkbox" name="material" value={material} />
                            <span>{material}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="quote-form-block">
                  <div className="quote-form-heading">
                    <span>02</span>
                    <div>
                      <h3>{isZh ? '项目说明' : 'Project brief'}</h3>
                      <p>{isZh ? '把时间节奏、公司信息和需求重点写清楚。' : 'Share timing, company context, and the core manufacturing request.'}</p>
                    </div>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="quote-label" htmlFor="company">{isZh ? '公司名称' : 'Company name'}</label>
                      <input className="form-control quote-input" id="company" name="company" type="text" />
                    </div>
                    <div className="col-md-6">
                      <label className="quote-label" htmlFor="timeline">{isZh ? '项目节奏' : 'Project timeline'}</label>
                      <select className="form-select quote-input" id="timeline" name="timeline" defaultValue="">
                        <option value="">{isZh ? '请选择时间' : 'Select a timeline'}</option>
                        {timelines.map((timeline) => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="quote-label" htmlFor="message">{t('contact.message')}</label>
                      <textarea
                        className="form-control quote-input quote-textarea"
                        name="message"
                        id="message"
                        placeholder={t('contact.messagePlaceholder')}
                        rows={5}
                        required
                      ></textarea>
                    </div>
                  </div>
                </section>

                <section className="quote-form-block">
                  <div className="quote-form-heading">
                    <span>03</span>
                    <div>
                      <h3>{isZh ? '联系人信息' : 'Contact details'}</h3>
                      <p>{isZh ? '我们会根据这些信息尽快与你联系。' : 'We will use these details to follow up quickly.'}</p>
                    </div>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="quote-label" htmlFor="name">{t('contact.name')}</label>
                      <input className="form-control quote-input" name="name" id="name" type="text" placeholder={t('contact.namePlaceholder')} required />
                    </div>
                    <div className="col-md-6">
                      <label className="quote-label" htmlFor="email">{t('contact.email')}</label>
                      <input className="form-control quote-input" name="email" id="email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="col-md-6">
                      <label className="quote-label" htmlFor="phone">{t('contact.phone')}</label>
                      <input className="form-control quote-input" name="phone" id="phone" type="tel" placeholder="(021) 1234-5678" />
                    </div>
                  </div>
                </section>

                {feedback && (
                  <div
                    className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'} mb-0`}
                    role="alert"
                  >
                    {feedback.text}
                  </div>
                )}

                <div className="quote-form-actions">
                  <div className="quote-form-security">
                    <i className="bi bi-shield-check"></i>
                    <span>{isZh ? '项目信息仅用于技术评估与商务沟通。' : 'Project details are used only for engineering review and follow-up.'}</span>
                  </div>
                  <button
                    className="btn-cta-primary quote-submit-button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('contact.submitting') : (isZh ? '提交项目需求' : 'Initiate Request')}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="quote-support-strip">
            {supportPromises.map((item) => (
              <div key={item} className="quote-support-item">
                <i className="bi bi-check2-circle"></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
