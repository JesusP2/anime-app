ALTER TABLE "entity_actions_tracker" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tracked_entity" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "score" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "url" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "authors" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "serializations" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "genres" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "explicit_genres" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "themes" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "demographics" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "title_synonyms" json;--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "publishing" boolean;--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "published" json;--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "popularity" integer;--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "favorites" integer;--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "relations" json;--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "external" json;--> statement-breakpoint
ALTER TABLE "manga" DROP COLUMN IF EXISTS "image_url";