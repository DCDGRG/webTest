import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api, type NewsItem } from '../../services/api';

export default function AdminNewsEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        title: '',
        summary: '',
        content: '',
        url: '',
        category: 'industry' as 'industry' | 'technical',
        image_url: '',
        is_published: true,
        published_at: new Date().toISOString().slice(0, 16)
    });

    useEffect(() => {
        if (!isNew && id) {
            api.getNewsItem(id)
                .then((item: NewsItem) => {
                    setForm({
                        title: item.title,
                        summary: item.summary || '',
                        content: item.content || '',
                        url: item.url || '',
                        category: item.category as 'industry' | 'technical',
                        image_url: item.image_url || '',
                        is_published: item.is_published,
                        published_at: item.published_at.slice(0, 16)
                    });
                })
                .catch(err => setError(err instanceof Error ? err.message : 'Failed to load'))
                .finally(() => setLoading(false));
        }
    }, [id, isNew]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const data = {
                ...form,
                published_at: new Date(form.published_at).toISOString(),
                summary: form.summary || null,
                content: form.content || null,
                url: form.url || null,
                image_url: form.image_url || null
            };

            if (isNew) {
                await api.createNews(data);
            } else {
                await api.updateNews(id!, data);
            }
            navigate('/admin/news');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center" style={{ paddingTop: '120px !important' }}>
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    return (
        <div className="container py-5" style={{ paddingTop: '100px !important' }}>
            <div className="row justify-content-center">
                <div className="col-lg-8" style={{ marginTop: '60px' }}>
                    <Link to="/admin/news" className="text-decoration-none">&larr; Back to News List</Link>
                    <h1 className="h3 mt-2 mb-4">{isNew ? 'Create New Article' : 'Edit Article'}</h1>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title *</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    id="category"
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value as 'industry' | 'technical' })}
                                >
                                    <option value="industry">Industry News</option>
                                    <option value="technical">Technical Article</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="published_at" className="form-label">Publish Date</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="published_at"
                                    value={form.published_at}
                                    onChange={e => setForm({ ...form, published_at: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="summary" className="form-label">Summary</label>
                            <textarea
                                className="form-control"
                                id="summary"
                                rows={3}
                                value={form.summary}
                                onChange={e => setForm({ ...form, summary: e.target.value })}
                                placeholder="Brief description of the article..."
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea
                                className="form-control"
                                id="content"
                                rows={10}
                                value={form.content}
                                onChange={e => setForm({ ...form, content: e.target.value })}
                                placeholder="Full article content..."
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="url" className="form-label">External URL (optional)</label>
                            <input
                                type="url"
                                className="form-control"
                                id="url"
                                value={form.url}
                                onChange={e => setForm({ ...form, url: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image_url" className="form-label">Image URL (optional)</label>
                            <input
                                type="url"
                                className="form-control"
                                id="image_url"
                                value={form.image_url}
                                onChange={e => setForm({ ...form, image_url: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="mb-4">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="is_published"
                                    checked={form.is_published}
                                    onChange={e => setForm({ ...form, is_published: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="is_published">
                                    Published (visible to public)
                                </label>
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={saving}>
                                {saving ? 'Saving...' : (isNew ? 'Create Article' : 'Save Changes')}
                            </button>
                            <Link to="/admin/news" className="btn btn-outline-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
