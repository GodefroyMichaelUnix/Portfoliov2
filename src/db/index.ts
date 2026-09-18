import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.ts';

// Add global connection pool caching to persist across hot-reloads
declare global {
  var _postgresPool: Pool | undefined;
}

// Function to create or retrieve the connection pool.
export const createPool = (): Pool => {
  if (!global._postgresPool) {
    if (!process.env.SQL_HOST) {
      console.warn('[AI Studio] PostgreSQL not configured — using mock pool');
      const mockPool = {
        query: async () => ({ rows: [] }),
        connect: async () => ({
          query: async () => ({ rows: [] }),
          release: () => {},
        }),
        on: () => mockPool,
        end: async () => {},
      } as unknown as Pool;
      return mockPool;
    }

    global._postgresPool = new Pool({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB_NAME,
      max: 10,
      connectionTimeoutMillis: 15000,
    });

    // Prevent unhandled pool-level errors from crashing the application
    global._postgresPool.on('error', (err) => {
      console.error('Unexpected error on idle SQL pool client:', err);
    });
  }
  return global._postgresPool;
};

// Initialize Drizzle with safe fallback
let db: any;
try {
  if (process.env.SQL_HOST) {
    const pool = createPool();
    db = drizzle(pool, { schema });
  } else {
    throw new Error('SQL_HOST not defined');
  }
} catch {
  console.warn('[AI Studio] Database not connected — using mock');
  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (d: any) => d?.data ?? {},
    update: async (d: any) => d?.data ?? {},
    delete: async () => ({})
  };
  db = new Proxy({}, {
    get: (_, prop) => prop === 'query'
      ? new Proxy({}, { get: () => noOp })
      : async () => [],
  });
}

export { db };
