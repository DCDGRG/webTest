import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { NewsItem } from '../types/News'
import NewsCard from './NewsCard'

interface NewsSectionProps {
    limit?: number
    showFilter?: boolean
    cols?: string
    title?: string
    category?: string
}

export default function NewsSection({
    limit,
    cols = "row-cols-lg-3",
    title,
    category
}: NewsSectionProps) {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const { t } = useTranslation()

    useEffect(() => {
        fetch('/data/news.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to load news data')
                }
                return res.json()
            })
            .then(data => {
                setNews(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setNews([])
                setLoading(false)
            })
    }, [])

    const filteredNews = category
        ? news.filter(item => item.category === category)
        : news

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>

    return (
        <section className="py-5 bg-light" id="news-feed">
            <div className="container px-5 my-5">
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        <div className="text-center">
                            <h2 className="fw-bolder gradient-text">{title}</h2>
                            <p className="lead fw-normal text-muted mb-5">{t('blog.newsSubtitle')}</p>
                        </div>
                    </div>
                </div>


                {news.length === 0 ? (
                    <div className="text-center text-muted">
                        <p>{t('blog.noNews')}</p>
                    </div>
                ) : (
                    <div className={`row gx-5 row-cols-1 row-cols-md-2 ${cols}`}>
                        {filteredNews.slice(0, limit || filteredNews.length).map((item) => (
                            <div key={item.id} className="col mb-5">
                                <NewsCard item={item} />
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-4">
                </div>
            </div>
        </section>
    )
}
