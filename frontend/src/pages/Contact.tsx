import { useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useTranslation()

  const sendEmail = (e: FormEvent) => {
    e.preventDefault()

    if (form.current) {
      setIsSubmitting(true)
      emailjs.sendForm('service_5zuwifn', 'template_tmqtmbu', form.current, 'BATcGtGTu--0S1rZz')
        .then((result) => {
          console.log(result.text)
          alert(t('contact.successMessage'))
          form.current?.reset()
        }, (error) => {
          console.log(error.text)
          alert(t('contact.errorMessage'))
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    }
  }

  return (
    <>
      {/* Subtle Page Hero */}
      <header className="page-hero-subtle">
        <div className="container px-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center">
                <h1 className="fw-bold text-white mb-2">{t('contact.pageTitle')}</h1>
                <p className="lead text-white mb-0">{t('contact.pageSubtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Subtle Transition */}
      <div className="page-hero-subtle-transition"></div>

      {/* Main Content */}
      <section className="py-5 contact-section-bg">
        <div className="container px-4">
          {/* Contact Form Card */}
          <div className="contact-form-card mb-5">
            <div className="text-center mb-4">
              <div className="contact-method-icon d-inline-flex mb-3">
                <i className="bi bi-envelope"></i>
              </div>
              <h2 className="h4 fw-bold mb-1">{t('contact.submitMessage')}</h2>
            </div>
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-floating mb-3">
                <input className="form-control" name="name" id="name" type="text" placeholder={t('contact.namePlaceholder')} required />
                <label htmlFor="name">{t('contact.name')}</label>
              </div>
              <div className="form-floating mb-3">
                <input className="form-control" name="email" id="email" type="email" placeholder="name@example.com" required />
                <label htmlFor="email">{t('contact.email')}</label>
              </div>
              <div className="form-floating mb-3">
                <input className="form-control" name="phone" id="phone" type="tel" placeholder="(123) 456-7890" />
                <label htmlFor="phone">{t('contact.phone')}</label>
              </div>
              <div className="form-floating mb-4">
                <textarea className="form-control" name="message" id="message" placeholder={t('contact.messagePlaceholder')} style={{ height: '8rem' }} required></textarea>
                <label htmlFor="message">{t('contact.message')}</label>
              </div>
              <div className="d-grid">
                <button
                  className="btn btn-gradient-primary btn-lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.submitting') : t('contact.submitMessage')}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Methods */}
          <div className="contact-methods">
            <div className="row g-0">
              <div className="col-6 col-lg-3 contact-method-item">
                <div className="contact-method-icon">
                  <i className="bi bi-chat-dots"></i>
                </div>
                <div className="h6 mb-1">{t('contact.onlineChat')}</div>
                <p className="text-muted small mb-0">{t('contact.onlineChatDesc')}</p>
              </div>
              <div className="col-6 col-lg-3 contact-method-item">
                <div className="contact-method-icon">
                  <i className="bi bi-people"></i>
                </div>
                <div className="h6 mb-1">{t('contact.joinCommunity')}</div>
                <p className="text-muted small mb-0">{t('contact.joinCommunityDesc')}</p>
              </div>
              <div className="col-6 col-lg-3 contact-method-item">
                <div className="contact-method-icon">
                  <i className="bi bi-question-circle"></i>
                </div>
                <div className="h6 mb-1">{t('contact.helpCenter')}</div>
                <p className="text-muted small mb-0">{t('contact.helpCenterDesc')}</p>
              </div>
              <div className="col-6 col-lg-3 contact-method-item">
                <div className="contact-method-icon">
                  <i className="bi bi-telephone"></i>
                </div>
                <div className="h6 mb-1">{t('contact.callUs')}</div>
                <p className="text-muted small mb-0">{t('contact.callUsDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
