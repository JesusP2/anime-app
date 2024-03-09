CREATE TABLE IF NOT EXISTS "anime_entity_actions_tracker" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"tracked_entity_id" varchar(255),
	"operation" varchar(255) NOT NULL,
	"action_time" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime_user_key" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime_user_session" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime_tracked_entity" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"user_type" varchar NOT NULL,
	"entity_type" varchar NOT NULL,
	"entity_status" varchar(255) NOT NULL,
	"mal_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime_auth_user" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"username" varchar(30),
	"role" varchar(255),
	"avatar_image" varchar(191),
	CONSTRAINT "anime_auth_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime_anime" (
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
	"score" varchar(20),
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
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime_manga" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"mal_id" integer,
	"url" varchar(255),
	"images" json,
	"approved" boolean,
	"titles" json,
	"title_synonyms" json,
	"type" varchar(255),
	"chapters" integer,
	"volumes" integer,
	"status" varchar(255),
	"publishing" boolean,
	"published" json,
	"score" numeric,
	"scored_by" integer,
	"rank" integer,
	"popularity" integer,
	"members" integer,
	"favorites" integer,
	"synopsis" text,
	"background" text,
	"authors" json,
	"serializations" json,
	"genres" json,
	"explicit_genres" json,
	"themes" json,
	"demographics" json,
	"relations" json,
	"external" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users__email__idx" ON "anime_auth_user" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users__username__idx" ON "anime_auth_user" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anime_user_key" ADD CONSTRAINT "anime_user_key_user_id_anime_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "anime_auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anime_user_session" ADD CONSTRAINT "anime_user_session_user_id_anime_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "anime_auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
