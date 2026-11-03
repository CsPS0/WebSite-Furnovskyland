"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { getDb } from "@/db";
import * as schema from "@/db/schema";
import { canManageParliament, canPublishCampaign, getMember, isAdmin, isEmperor } from "@/lib/discord";
import { hexColor, isSafeImageUrl } from "@/lib/sanitize";
import { getSessionUser } from "@/lib/session";

export async function updateParliamentSeat(form: FormData) {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  const member = await getMember(user.id).catch(() => null);
  if (!canManageParliament(member)) throw new Error("Forbidden");

  const seatNumber = Number(form.get("seatNumber"));
  if (!Number.isInteger(seatNumber) || seatNumber < 1 || seatNumber > 15) return;

  const memberName = String(form.get("memberName") ?? "").trim();
  const userId = String(form.get("userId") ?? "").trim() || null;
  const party = String(form.get("party") ?? "").trim();
  const coalition = form.get("coalition") === "opposition" ? ("opposition" as const) : ("government" as const);
  const role = String(form.get("role") ?? "").trim() || "Member of Parliament";
  const color = hexColor(form.get("color"), "#d60000");

  if (!memberName || !party) return;

  const db = await getDb();
  await db
    .insert(schema.parliamentSeats)
    .values({
      seatNumber,
      userId,
      memberName,
      party,
      coalition,
      role,
      color,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: schema.parliamentSeats.seatNumber,
      set: {
        userId,
        memberName,
        party,
        coalition,
        role,
        color,
        updatedAt: new Date(),
      },
    });

  refresh();
}

export async function createCampaign(form: FormData) {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  const member = await getMember(user.id).catch(() => null);
  if (!canPublishCampaign(member)) throw new Error("Forbidden");

  const electionTitle = String(form.get("electionTitle") ?? "").trim();
  const party = String(form.get("party") ?? "").trim();
  const title = String(form.get("title") ?? "").trim();
  const body = String(form.get("body") ?? "").trim();
  const imageUrlRaw = String(form.get("imageUrl") ?? "").trim();
  const imageUrl = imageUrlRaw || null;
  const color = hexColor(form.get("color"), "#c8102e");

  if (!electionTitle || !party || !title) return;
  if (imageUrl && !isSafeImageUrl(imageUrl)) return;

  const db = await getDb();
  await db.insert(schema.campaigns).values({
    electionTitle,
    party,
    authorId: user.id,
    authorName: user.name,
    title,
    body,
    imageUrl,
    color,
  });

  refresh();
}

export async function deleteCampaign(form: FormData) {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  const member = await getMember(user.id).catch(() => null);
  const id = Number(form.get("id"));
  if (!Number.isInteger(id)) return;

  const db = await getDb();
  const [existing] = await db.select().from(schema.campaigns).where(eq(schema.campaigns.id, id));
  if (!existing) return;

  if (!isAdmin(member) && !isEmperor(member) && existing.authorId !== user.id) {
    throw new Error("Forbidden");
  }

  await db.delete(schema.campaigns).where(eq(schema.campaigns.id, id));
  refresh();
}
