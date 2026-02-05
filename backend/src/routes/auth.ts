import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../db/schema.js';
import { authMiddleware, generateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();
const SALT_ROUNDS = 12;

interface Admin {
    id: number;
    username: string;
    password_hash: string;
    created_at: string;
}

// Login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return;
        }

        const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username) as Admin | undefined;

        if (!admin) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const validPassword = await bcrypt.compare(password, admin.password_hash);

        if (!validPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = generateToken({ id: admin.id, username: admin.username });

        res.json({
            token,
            admin: {
                id: admin.id,
                username: admin.username
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current admin info
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
    res.json({ admin: req.admin });
});

// Change password
router.post('/change-password', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            res.status(400).json({ error: 'Current password and new password are required' });
            return;
        }

        if (newPassword.length < 8) {
            res.status(400).json({ error: 'New password must be at least 8 characters' });
            return;
        }

        const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.admin!.id) as Admin;

        const validPassword = await bcrypt.compare(currentPassword, admin.password_hash);

        if (!validPassword) {
            res.status(401).json({ error: 'Current password is incorrect' });
            return;
        }

        const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

        db.prepare('UPDATE admins SET password_hash = ? WHERE id = ?').run(newPasswordHash, admin.id);

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
