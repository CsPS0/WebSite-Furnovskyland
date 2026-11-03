import { boolean, integer, jsonb, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import type { TallyResult } from "@/lib/tally";

const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Discord user id
  name: text("name").notNull(),
  avatar: text("avatar"),
  createdAt: createdAt(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }).notNull().defaultNow(),
});

export const electionTypes = ["law", "single", "multi", "ranked"] as const;
export const electionStatuses = ["draft", "scheduled", "open", "closed", "veto_window", "final", "vetoed", "cancelled"] as const;
export const resultsVisibilities = ["after_close", "live_public", "live_admin_only", "eligible_only", "admin_only"] as const;
export type ElectionType = (typeof electionTypes)[number];
export type ElectionStatus = (typeof electionStatuses)[number];
export type ResultsVisibility = (typeof resultsVisibilities)[number];

export const elections = pgTable("elections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  type: text("type", { enum: electionTypes }).notNull(),
  maxPicks: integer("max_picks").notNull().default(1),
  seats: integer("seats").notNull().default(0), // > 0 enables D'Hondt parliamentary seat allocation & hemicycle chart
  eligibleRoleIds: text("eligible_role_ids").array().notNull().default([]), // empty = every server member
  announceChannelId: text("announce_channel_id"), // Discord channel ID for bot announcements
  resultsVisibility: text("results_visibility", { enum: resultsVisibilities }).notNull().default("after_close"),
  majority: text("majority", { enum: ["simple", "two_thirds"] }).notNull().default("simple"),
  quorum: integer("quorum"),
  vetoHours: integer("veto_hours").notNull().default(0),
  opensAt: timestamp("opens_at", { withTimezone: true }).notNull(),
  closesAt: timestamp("closes_at", { withTimezone: true }).notNull(),
  vetoEndsAt: timestamp("veto_ends_at", { withTimezone: true }),
  status: text("status", { enum: electionStatuses }).notNull().default("draft"),
  result: jsonb("result").$type<TallyResult>(),
  createdBy: text("created_by").notNull().references(() => users.id),
  createdAt: createdAt(),
  // Set once each Discord post is sent, so a retried job never posts twice.
  announcedOpenAt: timestamp("announced_open_at", { withTimezone: true }),
  announcedResultAt: timestamp("announced_result_at", { withTimezone: true }),
  announcedFinalAt: timestamp("announced_final_at", { withTimezone: true }),
});

export const options = pgTable("options", {
  id: serial("id").primaryKey(),
  electionId: integer("election_id").notNull().references(() => elections.id, { onDelete: "cascade" }),
  label: text("label").notNull(), // law votes use the fixed labels "yes", "no", "abstain"
  position: integer("position").notNull(),
});

export const ballots = pgTable(
  "ballots",
  {
    id: serial("id").primaryKey(),
    electionId: integer("election_id").notNull().references(() => elections.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => users.id),
    choice: integer("choice").array().notNull(), // option ids; order matters for ranked votes
    deviceId: text("device_id").notNull(),
    ipHash: text("ip_hash").notNull(),
    memberJoinedAt: timestamp("member_joined_at", { withTimezone: true }),
    voided: boolean("voided").notNull().default(false),
    voidedBy: text("voided_by").references(() => users.id),
    voidReason: text("void_reason"),
    createdAt: createdAt(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique().on(t.electionId, t.userId)],
);

export const parliamentSeats = pgTable("parliament_seats", {
  seatNumber: integer("seat_number").primaryKey(),
  userId: text("user_id"),
  memberName: text("member_name").notNull(),
  party: text("party").notNull(),
  coalition: text("coalition", { enum: ["government", "opposition"] }).notNull().default("government"),
  role: text("role").notNull().default("Member of Parliament"),
  color: text("color").notNull().default("#d60000"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  electionTitle: text("election_title").notNull(),
  party: text("party").notNull(),
  authorId: text("author_id").notNull(),
  authorName: text("author_name").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  imageUrl: text("image_url"),
  color: text("color").notNull().default("#c8102e"),
  createdAt: createdAt(),
});

// One-off markers, e.g. that the historical archive was seeded, so later deploys don't undo admin deletions.
export const appMeta = pgTable("app_meta", {
  key: text("key").primaryKey(),
  createdAt: createdAt(),
});

export type Election = typeof elections.$inferSelect;
export type Option = typeof options.$inferSelect;
export type Ballot = typeof ballots.$inferSelect;
export type ParliamentSeat = typeof parliamentSeats.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
