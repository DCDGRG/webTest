import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { NewsItem } from '../types/News'
import { formatDate } from '../utils/formatDate'
import { isZhLocale } from '../utils/locale'
import { splitParagraphs, categoryLabel, categoryListHref } from '../utils/news'
import { usePageMeta } from '../hooks/usePageMeta'

type Status = 'loading' | 'ready' | 'notfound'

export default function NewsArticle() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const isZh = isZhLocale(i18n.language)
  const [item, setItem] = useState<NewsItem | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let active = true
    setStatus('loading')
    fetch('/data/news.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load news data')
        return res.json()
      })
      .then((data: NewsItem[]) => {
        if (!active) return
        const found = data.find((n) => n.id === id) ?? null
        setItem(found)
        setStatus(found ? 'ready' : 'notfound')
      })
      .catch(() => {
        if (active) setStatus('notfound')
      })
    return () => {
      active = false
    }
  }, [id])

  usePageMeta(
    item
      ? `${item.title} | 上海奎星电子科技`
      : isZh
        ? '资讯 | 上海奎星电子科技'
        : 'News | Shanghai Kuixing Electronics'
  )

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('common.loading')}</span>
        </div>
      </div>
    )
  }

  if (status === 'notfound' || !item) {
    return (
      <section className="py-5">
        <div className="container px-5 my-5 text-center" style={{ minHeight: '40vh' }}>
          <h1 className="fw-bolder gradient-text mb-3">{isZh ? '未找到文章' : 'Article not found'}</h1>
          <p className="text-muted mb-4">
            {isZh ? '该文章可能已被移除或链接有误。' : 'This article may have been removed or the link is incorrect.'}
          </p>
          <Link className="btn btn-gradient-primary" to="/blog-home">
            <i className="bi bi-arrow-left me-2"></i>{isZh ? '返回资讯' : 'Back to news'}
          </Link>
        </div>
      </section>
    )
  }

  const date = formatDate(item.published_at, i18n.language)
  const label = categoryLabel(item.category, isZh)
  const listHref = categoryListHref(item.category)
  const paragraphs = splitParagraphs(item.content || item.summary)

  return (
    <article className="py-5">
      <div className="container px-4 px-lg-5 my-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Link className="news-feed-link d-inline-flex align-items-center mb-4" to={listHref}>
              <i className="bi bi-arrow-left me-2"></i>
              {isZh ? '返回资讯列表' : 'Back to news'}
            </Link>

            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
              <span className="badge bg-primary bg-gradient rounded-pill">{label}</span>
              <span className="text-muted small">{item.source_name}</span>
              <span className="text-muted small">·</span>
              <span className="text-muted small">{date}</span>
            </div>

            <h1 className="fw-bolder gradient-text mb-4">{item.title}</h1>

            {item.image_url && (
              <img
                className="img-fluid rounded-3 mb-4 w-100"
                src={item.image_url}
                alt={item.title}
                style={{ maxHeight: '420px', objectFit: 'cover' }}
              />
            )}

            <div className="news-article-body fs-6">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-body mb-4" style={{ lineHeight: 1.9 }}>
                  {p}
                </p>
              ))}
            </div>

            <hr className="my-5" />
            <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
              <Link className="news-feed-link d-inline-flex align-items-center" to={listHref}>
                <i className="bi bi-arrow-left me-2"></i>
                {isZh ? '返回资讯列表' : 'Back to news'}
              </Link>
              <Link className="btn btn-gradient-primary" to="/contact">
                {isZh ? '联系我们' : 'Contact us'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
