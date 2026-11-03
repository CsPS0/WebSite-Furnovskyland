import { expect, test } from "bun:test";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { count, eq } from "drizzle-orm";
import * as schema from "./schema";
import { seedHistoricalVotes } from "./seed-historical-votes";

async function freshDb() {
  const db = drizzle(new PGlite(), { schema });
  await migrate(db, { migrationsFolder: "drizzle" });
  return db;
}

const electionCount = async (db: Awaited<ReturnType<typeof freshDb>>) =>
  (await db.select({ n: count() }).from(schema.elections))[0].n;

test("seeds once, then leaves admin deletions deleted", async () => {
  const db = await freshDb();
  const seeded = await seedHistoricalVotes(db);
  expect(seeded).toBeGreaterThan(0);
  expect(await electionCount(db)).toBe(seeded);

  const [first] = await db.select({ id: schema.elections.id }).from(schema.elections).limit(1);
  await db.delete(schema.elections).where(eq(schema.elections.id, first.id));
  await db.delete(schema.campaigns);

  expect(await seedHistoricalVotes(db)).toBe(0);
  expect(await electionCount(db)).toBe(seeded - 1);
  expect((await db.select({ n: count() }).from(schema.campaigns))[0].n).toBe(0);
}, 30_000);

test("a database seeded before the marker existed is only marked", async () => {
  const db = await freshDb();
  const seeded = await seedHistoricalVotes(db);
  await db.delete(schema.appMeta);
  const [first] = await db.select({ id: schema.elections.id }).from(schema.elections).limit(1);
  await db.delete(schema.elections).where(eq(schema.elections.id, first.id));

  expect(await seedHistoricalVotes(db)).toBe(0);
  expect(await electionCount(db)).toBe(seeded - 1);
  expect(await db.select().from(schema.appMeta)).toHaveLength(1);
}, 30_000);
