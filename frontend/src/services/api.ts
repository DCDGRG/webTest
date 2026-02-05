const API_BASE = '/api';

interface ApiError {
    error: string;
}

class ApiClient {
    private token: string | null = null;

    setToken(token: string | null) {
        this.token = token;
        if (token) {
            localStorage.setItem('admin_token', token);
        } else {
            localStorage.removeItem('admin_token');
        }
    }

    getToken(): string | null {
        if (!this.token) {
            this.token = localStorage.getItem('admin_token');
        }
        return this.token;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const token = this.getToken();
        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.setToken(null);
                window.location.href = '/admin/login';
                throw new Error('Unauthorized');
            }
            const error: ApiError = await response.json().catch(() => ({ error: 'Request failed' }));
            throw new Error(error.error || 'Request failed');
        }

        if (response.status === 204) {
            return undefined as T;
        }

        return response.json();
    }

    // Auth endpoints
    async login(username: string, password: string) {
        const result = await this.request<{ token: string; admin: { id: number; username: string } }>(
            '/auth/login',
            {
                method: 'POST',
                body: JSON.stringify({ username, password }),
            }
        );
        this.setToken(result.token);
        return result;
    }

    async logout() {
        this.setToken(null);
    }

    async getMe() {
        return this.request<{ admin: { id: number; username: string } }>('/auth/me');
    }

    async changePassword(currentPassword: string, newPassword: string) {
        return this.request<{ message: string }>('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
    }

    // News endpoints
    async getNews(params?: { page?: number; limit?: number; category?: string; includeUnpublished?: boolean }) {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set('page', String(params.page));
        if (params?.limit) searchParams.set('limit', String(params.limit));
        if (params?.category) searchParams.set('category', params.category);
        if (params?.includeUnpublished) searchParams.set('includeUnpublished', 'true');

        const query = searchParams.toString();
        return this.request<{
            news: NewsItem[];
            pagination: { page: number; limit: number; total: number; totalPages: number };
        }>(`/news${query ? `?${query}` : ''}`);
    }

    async getNewsItem(id: string) {
        return this.request<NewsItem>(`/news/${id}`);
    }

    async createNews(data: Partial<NewsItem>) {
        return this.request<NewsItem>('/news', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateNews(id: string, data: Partial<NewsItem>) {
        return this.request<NewsItem>(`/news/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteNews(id: string) {
        return this.request<void>(`/news/${id}`, {
            method: 'DELETE',
        });
    }
}

export interface NewsItem {
    id: string;
    title: string;
    summary: string | null;
    content: string | null;
    url: string | null;
    published_at: string;
    source_name: string;
    category: string;
    image_url: string | null;
    is_published: boolean;
    created_at: string;
}

export const api = new ApiClient();
