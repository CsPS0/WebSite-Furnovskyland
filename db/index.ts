import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { seedHistoricalVotes } from "./seed-historical-votes";

async function connect() {
  const db = drizzle(neon(process.env.DATABASE_URL!), { schema });
  await seedHistoricalVotes(db);
  return db;
}

export type Db = Awaited<ReturnType<typeof connect>>;

// On globalThis because the dev server loads this module once per bundle layer, and PGlite allows only one instance per folder.
const shared = globalThis as unknown as { furnovskyDb?: Promise<Db> };

/** Neon in production. Without DATABASE_URL (local dev), an embedded Postgres in .pglite/ instead. */
export function getDb(): Promise<Db> {
  shared.furnovskyDb ??= process.env.DATABASE_URL ? connect() : localDb();
  return shared.furnovskyDb;
}

async function localDb(): Promise<Db> {
  if (process.env.NODE_ENV === "production") throw new Error("DATABASE_URL is not set");
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const local = drizzle(new PGlite(".pglite"), { schema });
  await migrate(local, { migrationsFolder: "drizzle" });
  await seedHistoricalVotes(local);
  // shortcut: the PGlite client shares the query builder API we use, but not Neon's batch(); switch to a real Postgres if that's ever needed locally.
  return local as unknown as Db;
}
