ALTER TABLE "elections" ADD COLUMN IF NOT EXISTS "announce_channel_id" text;--> statement-breakpoint
ALTER TABLE "elections" ADD COLUMN IF NOT EXISTS "results_visibility" text DEFAULT 'after_close' NOT NULL;
