import { useTranslation } from 'react-i18next'
import type { NewsItem } from '../types/News'

interface NewsCardProps {
    item: NewsItem
}

export default function NewsCard({ item }: NewsCardProps) {
    const { t, i18n } = useTranslation()

    // Format date based on current language
    const date = new Date(item.published_at).toLocaleDateString(
        i18n.language === 'zh-CN' ? 'zh-CN' : 'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    )

    return (
        <div className="card h-100 shadow border-0 hover-shadow transition-all">
            {item.image_url && (
                <img className="card-img-top" src={item.image_url} alt={item.title} style={{ height: '200px', objectFit: 'cover' }} />
            )}
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-primary bg-gradient rounded-pill">{item.source_name}</span>
                    <small className="text-muted">{date}</small>
                </div>
                <h5 className="card-title mb-3">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark stretched-link">
                        {item.title}
                    </a>
                </h5>

                {item.summary && (
                    <p className="card-text text-muted mb-0 small">
                        {item.summary}
                    </p>
                )}
            </div>
            <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                <div className="d-flex align-items-center justify-content-end">
                    <small className="text-primary fw-bold">{t('common.readMore')} <i className="bi bi-arrow-right ms-1"></i></small>
                </div>
            </div>
        </div>
    )
}
