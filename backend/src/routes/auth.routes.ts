import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { userQueries, deviceQueries } from '../database.js';
import { generateToken, authenticateToken, AuthRequest } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user with device tracking
 */
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password, deviceFingerprint, deviceName } = req.body;

        // Validation
        if (!username || !password || !deviceFingerprint || !deviceName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({ error: 'Username must be 3-20 characters' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if username already exists
        const existingUser = userQueries.findByUsername.get(username) as any;
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Check if device is already registered with 2 different users
        const deviceUsers = deviceQueries.findByFingerprint.all(deviceFingerprint) as any[];
        if (deviceUsers.length >= 2) {
            return res.status(403).json({
                error: 'This device is already registered with maximum number of accounts (2)'
            });
        }

        // Hash password with bcrypt
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const result = userQueries.create.run(username, passwordHash);
        const userId = result.lastInsertRowid as number;

        // Register device
        deviceQueries.create.run(userId, deviceFingerprint, deviceName);

        // Generate token
        const token = generateToken(userId, username);

        // Get user data
        const user = userQueries.findById.get(userId);

        res.status(201).json({
            message: 'Registration successful',
            user,
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * POST /api/auth/login
 * Login with username, password, and device fingerprint
 */
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password, deviceFingerprint, deviceName } = req.body;

        // Validation
        if (!username || !password || !deviceFingerprint) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Find user
        const user = userQueries.findByUsername.get(username) as any;
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check if device is already registered for this user
        const existingDevice = deviceQueries.findByUserAndFingerprint.get(user.id, deviceFingerprint) as any;

        if (existingDevice) {
            // Update last login time
            deviceQueries.updateLastLogin.run(user.id, deviceFingerprint);
        } else {
            // Check device limit
            const deviceCount = deviceQueries.countByUser.get(user.id) as any;
            if (deviceCount.count >= 2) {
                return res.status(403).json({
                    error: 'Maximum device limit reached (2 devices). Please remove a device before adding a new one.',
                    deviceLimitReached: true
                });
            }

            // Register new device
            deviceQueries.create.run(user.id, deviceFingerprint, deviceName || 'Unknown Device');
        }

        // Generate token
        const token = generateToken(user.id, user.username);

        // Get user data (without password)
        const { password_hash, ...userData } = user;

        res.json({
            message: 'Login successful',
            user: userData,
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * GET /api/auth/me
 * Get current user info (protected route)
 */
router.get('/me', authenticateToken, (req: AuthRequest, res: Response) => {
    try {
        const user = userQueries.findById.get(req.userId!) as any;
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password_hash, ...userData } = user;
        res.json({ user: userData });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * GET /api/auth/devices
 * Get user's registered devices (protected route)
 */
router.get('/devices', authenticateToken, (req: AuthRequest, res: Response) => {
    try {
        const devices = deviceQueries.findByUser.all(req.userId!) as any[];
        res.json({ devices });
    } catch (error) {
        console.error('Get devices error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * DELETE /api/auth/device/:id
 * Remove a device (protected route)
 */
router.delete('/device/:id', authenticateToken, (req: AuthRequest, res: Response) => {
    try {
        const deviceId = parseInt(req.params.id);

        // Verify device belongs to user
        const result = deviceQueries.delete.run(deviceId, req.userId!);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Device not found or unauthorized' });
        }

        res.json({ message: 'Device removed successfully' });
    } catch (error) {
        console.error('Delete device error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * POST /api/auth/logout
 * Logout (client-side token removal, this endpoint is optional)
 */
router.post('/logout', authenticateToken, (req: AuthRequest, res: Response) => {
    // With JWT, logout is primarily client-side (removing token)
    // This endpoint can be used for logging or cleanup if needed
    res.json({ message: 'Logout successful' });
});

export default router;
