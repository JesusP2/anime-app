CREATE TABLE IF NOT EXISTS "entity_actions_tracker" (
	"id" varchar(255) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tracked_entity_id" varchar(255),
	"operation" varchar(255) NOT NULL,
	"action_time" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_key" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tracked_entity" (
	"id" varchar(255) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"user_type" varchar NOT NULL,
	"entity_type" varchar NOT NULL,
	"entity_status" varchar(255) NOT NULL,
	"mal_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_user" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"username" varchar(30),
	"role" varchar(255),
	"avatar_image" varchar(191),
	CONSTRAINT "auth_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"mal_id" integer,
	"url" text,
	"images" json,
	"trailer" json,
	"approved" boolean,
	"titles" json,
	"type" varchar(255),
	"source" varchar(255),
	"episodes" integer,
	"status" varchar(255),
	"airing" boolean,
	"aired" json,
	"duration" varchar(255),
	"rating" varchar(255),
	"score" numeric,
	"scored_by" integer,
	"rank" integer,
	"popularity" integer,
	"members" integer,
	"favorites" integer,
	"synopsis" text,
	"background" text,
	"season" varchar(255),
	"year" integer,
	"broadcast" json,
	"producers" json,
	"licensors" json,
	"studios" json,
	"genres" json,
	"explicit_genres" json,
	"themes" json,
	"demographics" json,
	"relations" json,
	"theme" json,
	"external" json,
	"streaming" json,
	"created_at" timestamp,
	"updated_at" timestamp
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
CREATE UNIQUE INDEX IF NOT EXISTS "users__email__idx" ON "auth_user" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users__username__idx" ON "auth_user" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_key" ADD CONSTRAINT "user_key_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
