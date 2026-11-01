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
export type ElectionType = (typeof electionTypes)[number];
export type ElectionStatus = (typeof electionStatuses)[number];

export const elections = pgTable("elections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  type: text("type", { enum: electionTypes }).notNull(),
  maxPicks: integer("max_picks").notNull().default(1),
  eligibleRoleIds: text("eligible_role_ids").array().notNull().default([]), // empty = every server member
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

export type Election = typeof elections.$inferSelect;
export type Option = typeof options.$inferSelect;
export type Ballot = typeof ballots.$inferSelect;
