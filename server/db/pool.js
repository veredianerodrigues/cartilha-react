import pg from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, 'schema.sql');

// Bancos locais (Docker/localhost, ex. docker-compose.dev.yml) não falam SSL —
// só liga ssl pro host gerenciado de produção.
const isLocalDb = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL || '');

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocalDb ? false : { rejectUnauthorized: false },
});

// Idempotente (CREATE TABLE/INDEX IF NOT EXISTS) — roda a cada boot, mesmo
// padrão de auto-provisionamento que a versão SQLite já usava.
export async function ensureSchema() {
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  await pool.query(schema);
}

export default pool;
