import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { NewsItem } from '../types/News'
import { formatDate } from '../utils/formatDate'
import { isExternalNews } from '../utils/news'

interface NewsCardProps {
    item: NewsItem
}

export default function NewsCard({ item }: NewsCardProps) {
    const { t, i18n } = useTranslation()

    const date = formatDate(item.published_at, i18n.language)
    const external = isExternalNews(item)

    // One link target for the whole card; rendered both as the stretched title
    // link and as the explicit "read more" link in the footer.
    const renderLink = (className: string, children: ReactNode, style?: React.CSSProperties) =>
        external ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className={className} style={style}>
                {children}
            </a>
        ) : (
            <Link to={`/news/${item.id}`} className={className} style={style}>
                {children}
            </Link>
        )

    return (
        <div className="card h-100 border-0 news-feed-card">
            {item.image_url && (
                <img className="card-img-top" src={item.image_url} alt={item.title} style={{ height: '200px', objectFit: 'cover' }} />
            )}
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-primary bg-gradient rounded-pill">{item.source_name}</span>
                    <small className="text-muted">{date}</small>
                </div>
                <h5 className="card-title mb-3">
                    {renderLink('news-feed-link stretched-link', item.title)}
                </h5>

                {item.summary && (
                    <p className="card-text text-muted mb-0 small">
                        {item.summary}
                    </p>
                )}
            </div>
            <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                <div className="d-flex align-items-center justify-content-end">
                    {/* A real link, layered above the stretched-link overlay (z-index) so
                        it is directly clickable. */}
                    {renderLink(
                        'news-feed-readmore text-primary fw-bold text-decoration-none small',
                        <>{t('common.readMore')} <i className={`bi ${external ? 'bi-box-arrow-up-right' : 'bi-arrow-right'} ms-1`}></i></>,
                        { position: 'relative', zIndex: 2 }
                    )}
                </div>
            </div>
        </div>
    )
}
