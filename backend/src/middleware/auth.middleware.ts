import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthRequest extends Request {
    userId?: number;
    username?: string;
}

/**
 * Middleware to verify JWT token and extract user info
 */
export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string };
        req.userId = decoded.userId;
        req.username = decoded.username;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}

/**
 * Generate JWT token
 */
export function generateToken(userId: number, username: string): string {
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn });
}
