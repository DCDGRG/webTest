import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isZhLocale } from '../utils/locale'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  const { i18n } = useTranslation()
  const isZh = isZhLocale(i18n.language)

  usePageMeta(
    isZh ? '页面未找到 | 上海奎星电子科技' : 'Page Not Found | Shanghai Kuixing Electronics'
  )

  return (
    <section className="py-5">
      <div
        className="container px-4 px-lg-5 text-center"
        style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <p className="display-1 fw-bolder gradient-text mb-2">404</p>
        <h1 className="fw-bolder mb-3">{isZh ? '页面未找到' : 'Page not found'}</h1>
        <p className="text-muted mb-4" style={{ maxWidth: '440px' }}>
          {isZh
            ? '抱歉，您访问的页面不存在或已被移动。请返回首页或浏览其他栏目。'
            : "Sorry, the page you're looking for doesn't exist or has moved. Try the homepage or another section."}
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link className="btn btn-gradient-primary" to="/">
            <i className="bi bi-house-door me-2"></i>{isZh ? '返回首页' : 'Back home'}
          </Link>
          <Link className="btn btn-outline-secondary" to="/contact">
            {isZh ? '联系我们' : 'Contact us'}
          </Link>
        </div>
      </div>
    </section>
  )
}
