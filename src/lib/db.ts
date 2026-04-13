// lib/db.ts
import { neon } from '@neondatabase/serverless';

// This will work in both development and production
const sql = neon(process.env.POSTGRES_URL!);

export { sql };