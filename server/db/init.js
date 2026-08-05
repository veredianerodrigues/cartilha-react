import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'data.db');
const schemaPath = path.join(__dirname, 'schema.sql');

fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(schemaPath, 'utf-8'));

// Migração idempotente: bancos criados antes da coluna is_front_matter existir
// (CREATE TABLE IF NOT EXISTS não altera tabelas já existentes).
const sectionColumns = db.prepare('PRAGMA table_info(sections)').all().map((c) => c.name);
if (!sectionColumns.includes('is_front_matter')) {
  db.exec('ALTER TABLE sections ADD COLUMN is_front_matter INTEGER NOT NULL DEFAULT 0');
}

export default db;
