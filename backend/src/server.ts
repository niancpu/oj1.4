import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './database.js';
import authRoutes from './routes/auth.routes.js';
import progressRoutes from './routes/progress.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Allow requests from common Vite dev server ports
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(express.json());

// Initialize database
initializeDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'OJ Backend Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Online Judge Backend API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            progress: '/api/progress',
            health: '/health'
        }
    });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Accepting requests from: localhost:3000, localhost:5173, localhost:5174`);
});
