// Runs before `next build` so each deploy brings the Neon schema and historical vote archive up to date.
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as schema from "../db/schema";
import { seedHistoricalVotes } from "../db/seed-historical-votes";

if (!process.env.DATABASE_URL) {
  console.log("migrate: DATABASE_URL not set, migrating and seeding local .pglite");
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle: drizzlePglite } = await import("drizzle-orm/pglite");
  const { migrate: migratePglite } = await import("drizzle-orm/pglite/migrator");
  const pglite = new PGlite(".pglite");
  const local = drizzlePglite(pglite, { schema });
  await migratePglite(local, { migrationsFolder: "drizzle" });
  const seeded = await seedHistoricalVotes(local);
  await pglite.close();
  console.log(`migrate: local .pglite done (seeded ${seeded} historical votes)`);
} else {
  const db = drizzle(neon(process.env.DATABASE_URL), { schema });
  await migrate(db, { migrationsFolder: "drizzle" });
  const seeded = await seedHistoricalVotes(db);
  console.log(`migrate: done (seeded ${seeded} historical votes)`);
}
