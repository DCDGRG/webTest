import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/schema.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

interface NewsItem {
    id: string;
    title: string;
    summary: string | null;
    content: string | null;
    url: string | null;
    published_at: string;
    source_name: string;
    category: string;
    image_url: string | null;
    is_published: number;
    created_at: string;
}

// Public: List news (paginated)
router.get('/', (req: Request, res: Response) => {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
        const category = req.query.category as string | undefined;
        const includeUnpublished = req.query.includeUnpublished === 'true';
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM news';
        let countQuery = 'SELECT COUNT(*) as total FROM news';
        const params: (string | number)[] = [];
        const conditions: string[] = [];

        // Only show published news for public access
        if (!includeUnpublished) {
            conditions.push('is_published = 1');
        }

        if (category && ['industry', 'technical'].includes(category)) {
            conditions.push('category = ?');
            params.push(category);
        }

        if (conditions.length > 0) {
            const whereClause = ' WHERE ' + conditions.join(' AND ');
            query += whereClause;
            countQuery += whereClause;
        }

        query += ' ORDER BY published_at DESC LIMIT ? OFFSET ?';

        const countParams = [...params];
        params.push(limit, offset);

        const news = db.prepare(query).all(...params) as NewsItem[];
        const { total } = db.prepare(countQuery).get(...countParams) as { total: number };

        res.json({
            news: news.map(item => ({
                ...item,
                is_published: Boolean(item.is_published)
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('List news error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Public: Get single news item
router.get('/:id', (req: Request, res: Response) => {
    try {
        const news = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id) as NewsItem | undefined;

        if (!news) {
            res.status(404).json({ error: 'News not found' });
            return;
        }

        res.json({
            ...news,
            is_published: Boolean(news.is_published)
        });
    } catch (error) {
        console.error('Get news error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin: Create news
router.post('/', authMiddleware, (req: AuthRequest, res: Response) => {
    try {
        const { title, summary, content, url, published_at, source_name, category, image_url, is_published } = req.body;

        if (!title) {
            res.status(400).json({ error: 'Title is required' });
            return;
        }

        if (category && !['industry', 'technical'].includes(category)) {
            res.status(400).json({ error: 'Category must be "industry" or "technical"' });
            return;
        }

        const id = uuidv4();
        const publishedAt = published_at || new Date().toISOString();

        db.prepare(`
            INSERT INTO news (id, title, summary, content, url, published_at, source_name, category, image_url, is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            id,
            title,
            summary || null,
            content || null,
            url || null,
            publishedAt,
            source_name || 'Admin',
            category || 'industry',
            image_url || null,
            is_published !== false ? 1 : 0
        );

        const news = db.prepare('SELECT * FROM news WHERE id = ?').get(id) as NewsItem;

        res.status(201).json({
            ...news,
            is_published: Boolean(news.is_published)
        });
    } catch (error) {
        console.error('Create news error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin: Update news
router.put('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
    try {
        const existingNews = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id) as NewsItem | undefined;

        if (!existingNews) {
            res.status(404).json({ error: 'News not found' });
            return;
        }

        const { title, summary, content, url, published_at, source_name, category, image_url, is_published } = req.body;

        if (category && !['industry', 'technical'].includes(category)) {
            res.status(400).json({ error: 'Category must be "industry" or "technical"' });
            return;
        }

        db.prepare(`
            UPDATE news SET
                title = ?,
                summary = ?,
                content = ?,
                url = ?,
                published_at = ?,
                source_name = ?,
                category = ?,
                image_url = ?,
                is_published = ?
            WHERE id = ?
        `).run(
            title ?? existingNews.title,
            summary ?? existingNews.summary,
            content ?? existingNews.content,
            url ?? existingNews.url,
            published_at ?? existingNews.published_at,
            source_name ?? existingNews.source_name,
            category ?? existingNews.category,
            image_url ?? existingNews.image_url,
            is_published !== undefined ? (is_published ? 1 : 0) : existingNews.is_published,
            req.params.id
        );

        const news = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id) as NewsItem;

        res.json({
            ...news,
            is_published: Boolean(news.is_published)
        });
    } catch (error) {
        console.error('Update news error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin: Delete news
router.delete('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
    try {
        const result = db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);

        if (result.changes === 0) {
            res.status(404).json({ error: 'News not found' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        console.error('Delete news error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
