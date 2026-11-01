ALTER TABLE "elections" ADD COLUMN IF NOT EXISTS "seats" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "parliament_seats" (
	"seat_number" integer PRIMARY KEY NOT NULL,
	"user_id" text,
	"member_name" text NOT NULL,
	"party" text NOT NULL,
	"coalition" text DEFAULT 'government' NOT NULL,
	"role" text DEFAULT 'Member of Parliament' NOT NULL,
	"color" text DEFAULT '#d60000' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"election_title" text NOT NULL,
	"party" text NOT NULL,
	"author_id" text NOT NULL,
	"author_name" text NOT NULL,
	"title" text NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"image_url" text,
	"color" text DEFAULT '#c8102e' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
