import { useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sendEmail = (e: FormEvent) => {
    e.preventDefault()

    if (form.current) {
      setIsSubmitting(true)
      emailjs.sendForm('service_5zuwifn', 'template_tmqtmbu', form.current, 'BATcGtGTu--0S1rZz')
        .then((result) => {
          console.log(result.text)
          alert('我们已收到您的留言，会尽快联系您！')
          form.current?.reset()
        }, (error) => {
          console.log(error.text)
          alert('发送失败，请稍后重试或直接通过电话联系我们。')
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
            <h1 className="fw-bolder">联系我们</h1>
            <p className="lead fw-normal text-muted mb-0">我们期待您的来信，随时为您解答疑问</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <form ref={form} onSubmit={sendEmail}>
                <div className="form-floating mb-3">
                  <input className="form-control" name="name" id="name" type="text" placeholder="请输入您的姓名..." required />
                  <label htmlFor="name">姓名</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" name="email" id="email" type="email" placeholder="name@example.com" required />
                  <label htmlFor="email">电子邮箱</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" name="phone" id="phone" type="tel" placeholder="(123) 456-7890" />
                  <label htmlFor="phone">联系电话</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea className="form-control" name="message" id="message" placeholder="请输入您的留言内容..." style={{ height: '10rem' }} required></textarea>
                  <label htmlFor="message">留言内容</label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '正在提交...' : '提交留言'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row gx-5 row-cols-2 row-cols-lg-4 py-5">
          <div className="col">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-chat-dots"></i></div>
            <div className="h5 mb-2">在线咨询</div>
            <p className="text-muted mb-0">与我们的支持专家实时交流，获取即时帮助。</p>
          </div>
          <div className="col">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-people"></i></div>
            <div className="h5">加入社区</div>
            <p className="text-muted mb-0">探索我们的社区论坛，与其他用户交流心得。</p>
          </div>
          <div className="col">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-question-circle"></i></div>
            <div className="h5">帮助中心</div>
            <p className="text-muted mb-0">浏览常见问题解答(FAQ)和支持文章，寻找解决方案。</p>
          </div>
          <div className="col">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-telephone"></i></div>
            <div className="h5">致电我们</div>
            <p className="text-muted mb-0">请在工作时间拨打我们的服务热线 (021) 1234-5678。</p>
          </div>
        </div>
      </div>
    </section>
  )
} 