import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

export interface AuthRequest extends Request {
    admin?: {
        id: number;
        username: string;
    };
}

// Verify the Bearer token on a request, returning the decoded admin or null.
// Use this when a route wants to know whether the caller is authenticated
// without rejecting unauthenticated requests outright (the middleware does that).
export function verifyAuthToken(req: Request): { id: number; username: string } | null {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.substring(7);

    try {
        return jwt.verify(token, JWT_SECRET) as { id: number; username: string };
    } catch {
        return null;
    }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }

    const admin = verifyAuthToken(req);

    if (!admin) {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }

    req.admin = admin;
    next();
}

export function generateToken(admin: { id: number; username: string }): string {
    return jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
}
