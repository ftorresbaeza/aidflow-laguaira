import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env into process.env before any module initializes (including Prisma client)
try {
  const raw = readFileSync(resolve(process.cwd(), '.env'), 'utf-8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^([^#\s][^=]*)=(.+)$/);
    if (m) {
      const key = m[1].trim();
      const val = m[2].trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
} catch {
  // no .env file — rely on existing process.env (CI environment)
}
