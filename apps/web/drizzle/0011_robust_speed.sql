ALTER TABLE "tracked_entity" RENAME COLUMN "status" TO "user_type";--> statement-breakpoint
ALTER TABLE "anime" RENAME COLUMN "member" TO "members";--> statement-breakpoint
ALTER TABLE "user_key" ALTER COLUMN "user_id" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "user_session" ALTER COLUMN "user_id" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "tracked_entity" ALTER COLUMN "user_id" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "tracked_entity" ALTER COLUMN "user_type" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "trailer" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "aired" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "broadcast" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "producers" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "licensors" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "studios" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "genres" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "explicit_genres" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "themes" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "demographics" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "entity_actions_tracker" ADD COLUMN "action_time" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "tracked_entity" ADD COLUMN "entity_status" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "anime" ADD COLUMN "relations" json;--> statement-breakpoint
ALTER TABLE "anime" ADD COLUMN "theme" json;--> statement-breakpoint
ALTER TABLE "anime" ADD COLUMN "external" json;--> statement-breakpoint
ALTER TABLE "anime" ADD COLUMN "streaming" json;--> statement-breakpoint
ALTER TABLE "anime" DROP COLUMN IF EXISTS "openings";--> statement-breakpoint
ALTER TABLE "anime" DROP COLUMN IF EXISTS "endings";
