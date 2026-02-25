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
    <section className="py-5">
      <div className="container px-5">
        <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
          <div className="text-center mb-5">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
            <h1 className="fw-bolder">{t('contact.pageTitle')}</h1>
            <p className="lead fw-normal text-muted mb-0">{t('contact.pageSubtitle')}</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 col-xl-6">
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
                <div className="form-floating mb-3">
                  <textarea className="form-control" name="message" id="message" placeholder={t('contact.messagePlaceholder')} style={{ height: '10rem' }} required></textarea>
                  <label htmlFor="message">{t('contact.message')}</label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('contact.submitting') : t('contact.submitMessage')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row gx-5 row-cols-2 row-cols-lg-4 py-5">
          <div className="col">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-chat-dots"></i></div>
            <div className="h5 mb-2">{t('contact.onlineChat')}</div>
            <p className="text-muted mb-0">{t('contact.onlineChatDesc')}</p>
          </div>
          <div className="col">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-people"></i></div>
            <div className="h5">{t('contact.joinCommunity')}</div>
            <p className="text-muted mb-0">{t('contact.joinCommunityDesc')}</p>
          </div>
          <div className="col">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-question-circle"></i></div>
            <div className="h5">{t('contact.helpCenter')}</div>
            <p className="text-muted mb-0">{t('contact.helpCenterDesc')}</p>
          </div>
          <div className="col">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-telephone"></i></div>
            <div className="h5">{t('contact.callUs')}</div>
            <p className="text-muted mb-0">{t('contact.callUsDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
