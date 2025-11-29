import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get database path from environment or use default
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../data/oj.db');

// Ensure data directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize schema
export function initializeDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Devices table
  db.exec(`
    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      device_fingerprint TEXT NOT NULL,
      device_name TEXT NOT NULL,
      last_login DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, device_fingerprint)
    )
  `);

  // User progress table for solved problems
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      problem_id INTEGER NOT NULL,
      solved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, problem_id)
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_devices_user_id ON devices(user_id);
    CREATE INDEX IF NOT EXISTS idx_devices_fingerprint ON devices(device_fingerprint);
    CREATE INDEX IF NOT EXISTS idx_progress_user_id ON user_progress(user_id);
  `);

  console.log('✅ Database initialized successfully');
}

// User queries
export const userQueries = {
  create: db.prepare(`
    INSERT INTO users (username, password_hash)
    VALUES (?, ?)
  `),

  findByUsername: db.prepare(`
    SELECT * FROM users WHERE username = ?
  `),

  findById: db.prepare(`
    SELECT id, username, created_at FROM users WHERE id = ?
  `)
};

// Device queries
export const deviceQueries = {
  create: db.prepare(`
    INSERT INTO devices (user_id, device_fingerprint, device_name)
    VALUES (?, ?, ?)
  `),

  findByUserAndFingerprint: db.prepare(`
    SELECT * FROM devices 
    WHERE user_id = ? AND device_fingerprint = ?
  `),

  countByUser: db.prepare(`
    SELECT COUNT(*) as count FROM devices WHERE user_id = ?
  `),

  findByUser: db.prepare(`
    SELECT * FROM devices WHERE user_id = ? ORDER BY last_login DESC
  `),

  updateLastLogin: db.prepare(`
    UPDATE devices SET last_login = CURRENT_TIMESTAMP 
    WHERE user_id = ? AND device_fingerprint = ?
  `),

  delete: db.prepare(`
    DELETE FROM devices WHERE id = ? AND user_id = ?
  `),

  findByFingerprint: db.prepare(`
    SELECT DISTINCT user_id FROM devices WHERE device_fingerprint = ?
  `)
};

// Progress queries
export const progressQueries = {
  addSolved: db.prepare(`
    INSERT OR IGNORE INTO user_progress (user_id, problem_id)
    VALUES (?, ?)
  `),

  getSolvedProblems: db.prepare(`
    SELECT problem_id FROM user_progress WHERE user_id = ?
  `),

  isSolved: db.prepare(`
    SELECT COUNT(*) as count FROM user_progress 
    WHERE user_id = ? AND problem_id = ?
  `)
};

export default db;
