import bcrypt from 'bcrypt';
import db from './schema.js';

const SALT_ROUNDS = 12;

async function seed() {
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'changeme123';
    const passwordHash = await bcrypt.hash(defaultPassword, SALT_ROUNDS);

    // Check if admin already exists
    const existingAdmin = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin');

    if (!existingAdmin) {
        db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', passwordHash);
        console.log('Admin user created with username: admin');
        console.log('Default password:', defaultPassword);
    } else {
        console.log('Admin user already exists');
    }

    // Add some sample news if none exist
    const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get() as { count: number };

    if (newsCount.count === 0) {
        const sampleNews = [
            {
                id: 'sample-1',
                title: '2024年注塑行业发展趋势报告',
                summary: '随着智能制造和绿色生产的推进，注塑行业正在经历深刻变革...',
                content: '详细内容...',
                url: '',
                published_at: new Date().toISOString(),
                source_name: 'Admin',
                category: 'industry',
                image_url: null,
                is_published: 1
            },
            {
                id: 'sample-2',
                title: 'PEEK材料在医疗器械中的应用',
                summary: 'PEEK作为一种高性能特种工程塑料，在医疗器械领域有着广泛应用...',
                content: '详细内容...',
                url: '',
                published_at: new Date().toISOString(),
                source_name: 'Admin',
                category: 'technical',
                image_url: null,
                is_published: 1
            }
        ];

        const insertStmt = db.prepare(`
            INSERT INTO news (id, title, summary, content, url, published_at, source_name, category, image_url, is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        for (const news of sampleNews) {
            insertStmt.run(
                news.id, news.title, news.summary, news.content, news.url,
                news.published_at, news.source_name, news.category, news.image_url, news.is_published
            );
        }
        console.log('Sample news items created');
    }

    console.log('Seed completed');
}

seed().catch(console.error);
