import { useEffect, useState } from 'react';
import type { NewsItem } from '../types/News';
import NewsCard from './NewsCard';

interface NewsSectionProps {
    limit?: number;
    showFilter?: boolean;
    cols?: string; // bootstrap class e.g. "row-cols-lg-2"
    title?: string;
    category?: string; // New prop for filtering
}

export default function NewsSection({
    limit,
    cols = "row-cols-lg-3",
    title = "行业资讯流",
    category
}: NewsSectionProps) {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/news.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to load news data');
                }
                return res.json();
            })
            .then(data => {
                setNews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                // Fallback or empty state
                setNews([]);
                setLoading(false);
            });
    }, []);

    const filteredNews = category
        ? news.filter(item => item.category === category)
        : news;

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <section className="py-5 bg-light" id="news-feed">
            <div className="container px-5 my-5">
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        <div className="text-center">
                            <h2 className="fw-bolder gradient-text">{title}</h2>
                            <p className="lead fw-normal text-muted mb-5">汇聚注塑行业最新动态、技术干货与展会信息</p>
                        </div>
                    </div>
                </div>


                {news.length === 0 ? (
                    <div className="text-center text-muted">
                        <p>暂无最新资讯，请稍后再试。</p>
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
                    {/* Link to a full news page if we implemented one, or just more content */}
                    {/* <Link to="/news" className="btn btn-outline-primary">查看更多</Link> */}
                </div>
            </div>
        </section>
    );
}
