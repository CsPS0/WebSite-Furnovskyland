// Runs before `next build` so each deploy brings the Neon schema up to date.
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

if (!process.env.DATABASE_URL) {
  console.log("migrate: DATABASE_URL not set, skipping (local dev uses .pglite)");
} else {
  await migrate(drizzle(neon(process.env.DATABASE_URL)), { migrationsFolder: "drizzle" });
  console.log("migrate: done");
}
