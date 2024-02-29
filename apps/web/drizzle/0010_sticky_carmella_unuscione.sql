CREATE TABLE IF NOT EXISTS "entity_actions_tracker" (
	"id" varchar(255) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tracked_entity_id" varchar(255),
	"operation" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tracked_entity" (
	"id" varchar(255) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"entity_type" varchar NOT NULL,
	"status" varchar(255) NOT NULL,
	"mal_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime" (
	"id" varchar(255) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mal_id" integer,
	"url" text,
	"images" json,
	"trailer" text,
	"approved" boolean,
	"titles" json,
	"type" varchar(255),
	"source" varchar(255),
	"episodes" integer,
	"status" varchar(255),
	"airing" boolean,
	"aired" json NOT NULL,
	"duration" varchar(255),
	"rating" varchar(255),
	"score" numeric,
	"scored_by" integer,
	"rank" integer,
	"popularity" integer,
	"member" integer,
	"favorites" integer,
	"synopsis" text,
	"background" text,
	"season" varchar(255),
	"year" integer,
	"broadcast" json NOT NULL,
	"producers" json NOT NULL,
	"licensors" json NOT NULL,
	"studios" json NOT NULL,
	"genres" json NOT NULL,
	"explicit_genres" json NOT NULL,
	"themes" json NOT NULL,
	"demographics" json NOT NULL,
	"openings" json,
	"endings" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manga" (
	"id" varchar(255) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mal_id" integer,
	"url" text,
	"images" json,
	"image_url" text,
	"approved" boolean,
	"titles" json,
	"type" varchar(255),
	"chapters" integer,
	"volumes" integer,
	"status" varchar(255),
	"score" numeric,
	"scored_by" integer,
	"members" integer,
	"rank" integer,
	"synopsis" text,
	"background" text,
	"authors" json NOT NULL,
	"serializations" json NOT NULL,
	"genres" json NOT NULL,
	"explicit_genres" json NOT NULL,
	"themes" json NOT NULL,
	"demographics" json NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "anime_followed";--> statement-breakpoint
DROP TABLE "light_novel_followed";--> statement-breakpoint
DROP TABLE "mangas_followed";--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "role" varchar(255);