import "server-only";
import { asc, desc } from "drizzle-orm";
import { getDb } from "@/db";
import * as schema from "@/db/schema";

export async function listParliamentSeats(): Promise<schema.ParliamentSeat[]> {
  const db = await getDb();
  return db
    .select()
    .from(schema.parliamentSeats)
    .orderBy(asc(schema.parliamentSeats.seatNumber));
}

export async function listCampaigns(): Promise<schema.Campaign[]> {
  const db = await getDb();
  return db
    .select()
    .from(schema.campaigns)
    .orderBy(desc(schema.campaigns.createdAt), desc(schema.campaigns.id));
}
