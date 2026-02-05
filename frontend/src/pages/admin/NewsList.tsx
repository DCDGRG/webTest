import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, type NewsItem } from '../../services/api';

export default function AdminNewsList() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const result = await api.getNews({ page, limit: 20, includeUnpublished: true });
            setNews(result.news);
            setTotalPages(result.pagination.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load news');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [page]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;

        try {
            setDeleting(id);
            await api.deleteNews(id);
            setNews(news.filter(n => n.id !== id));
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="container py-5" style={{ paddingTop: '100px !important' }}>
            <div className="d-flex justify-content-between align-items-center mb-4" style={{ marginTop: '60px' }}>
                <div>
                    <Link to="/admin" className="text-decoration-none">&larr; Dashboard</Link>
                    <h1 className="h3 mt-2">News Management</h1>
                </div>
                <Link to="/admin/news/new" className="btn btn-primary">
                    + New Article
                </Link>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : news.length === 0 ? (
                <div className="text-center py-5 text-muted">
                    <p>No news articles yet.</p>
                    <Link to="/admin/news/new" className="btn btn-primary">Create your first article</Link>
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Published</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <Link to={`/admin/news/${item.id}/edit`} className="text-decoration-none">
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td>
                                            <span className={`badge ${item.category === 'industry' ? 'bg-success' : 'bg-info'}`}>
                                                {item.category === 'industry' ? 'Industry' : 'Technical'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${item.is_published ? 'bg-primary' : 'bg-secondary'}`}>
                                                {item.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td>{new Date(item.published_at).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                to={`/admin/news/${item.id}/edit`}
                                                className="btn btn-sm btn-outline-primary me-2"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(item.id)}
                                                disabled={deleting === item.id}
                                            >
                                                {deleting === item.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <nav className="d-flex justify-content-center">
                            <ul className="pagination">
                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => setPage(p => p - 1)}>Previous</button>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li key={i + 1} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => setPage(p => p + 1)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </div>
    );
}
