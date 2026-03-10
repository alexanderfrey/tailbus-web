import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
  max: 5,
  ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false },
});

let tableReady = false;

async function ensureWaitlistTable() {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tailbus_waitlist (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      signed_up_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  tableReady = true;
}

export async function addToWaitlist(email: string): Promise<boolean> {
  await ensureWaitlistTable();
  const result = await pool.query(
    `INSERT INTO tailbus_waitlist (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING id`,
    [email]
  );
  return result.rowCount !== null && result.rowCount > 0;
}

export { pool };
