import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export default function AdminDashboard() {
    const { admin, logout } = useAuth();
    const [stats, setStats] = useState({ total: 0, industry: 0, technical: 0 });

    useEffect(() => {
        api.getNews({ limit: 1000, includeUnpublished: true })
            .then(result => {
                const industry = result.news.filter(n => n.category === 'industry').length;
                const technical = result.news.filter(n => n.category === 'technical').length;
                setStats({
                    total: result.news.length,
                    industry,
                    technical
                });
            })
            .catch(console.error);
    }, []);

    return (
        <div className="container py-5" style={{ paddingTop: '100px !important' }}>
            <div className="d-flex justify-content-between align-items-center mb-4" style={{ marginTop: '60px' }}>
                <h1 className="h3">Admin Dashboard</h1>
                <div>
                    <span className="text-muted me-3">Welcome, {admin?.username}</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card bg-primary text-white">
                        <div className="card-body">
                            <h5 className="card-title">Total News</h5>
                            <p className="display-4">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <h5 className="card-title">Industry News</h5>
                            <p className="display-4">{stats.industry}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-info text-white">
                        <div className="card-body">
                            <h5 className="card-title">Technical Articles</h5>
                            <p className="display-4">{stats.technical}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">News Management</h5>
                            <p className="card-text">Create, edit, and manage news articles.</p>
                            <Link to="/admin/news" className="btn btn-primary">
                                Manage News
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Quick Actions</h5>
                            <p className="card-text">Common administrative tasks.</p>
                            <Link to="/admin/news/new" className="btn btn-success me-2">
                                New Article
                            </Link>
                            <Link to="/admin/settings" className="btn btn-outline-secondary">
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
