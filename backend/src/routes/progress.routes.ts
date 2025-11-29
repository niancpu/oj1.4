import { Router, Response } from 'express';
import { progressQueries } from '../database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware.js';

const router = Router();

// All progress routes require authentication
router.use(authenticateToken);

/**
 * GET /api/progress/solved
 * Get user's solved problems
 */
router.get('/solved', (req: AuthRequest, res: Response) => {
    try {
        const problems = progressQueries.getSolvedProblems.all(req.userId!) as any[];
        const solvedIds = problems.map(p => p.problem_id);
        res.json({ solvedProblems: solvedIds });
    } catch (error) {
        console.error('Get solved problems error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * POST /api/progress/solved
 * Mark a problem as solved
 */
router.post('/solved', (req: AuthRequest, res: Response) => {
    try {
        const { problemId } = req.body;

        if (!problemId) {
            return res.status(400).json({ error: 'Problem ID required' });
        }

        progressQueries.addSolved.run(req.userId!, problemId);
        res.json({ message: 'Problem marked as solved' });
    } catch (error) {
        console.error('Add solved problem error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * POST /api/progress/migrate
 * Migrate solved problems from localStorage
 */
router.post('/migrate', (req: AuthRequest, res: Response) => {
    try {
        const { solvedProblems } = req.body;

        if (!Array.isArray(solvedProblems)) {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        // Add all solved problems
        solvedProblems.forEach(problemId => {
            progressQueries.addSolved.run(req.userId!, problemId);
        });

        res.json({
            message: 'Progress migrated successfully',
            count: solvedProblems.length
        });
    } catch (error) {
        console.error('Migrate progress error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
