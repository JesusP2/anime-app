CREATE TABLE IF NOT EXISTS "anime_followed" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15),
	"status" "status",
	"mal_id" integer,
	"image" text,
	"aired" timestamp,
	"type" varchar(255),
	"episodes" integer,
	"title" varchar(255),
	"synopsis" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "light_novel_followed" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15),
	"status" "status",
	"mal_id" integer,
	"image" text,
	"type" varchar(255),
	"title" varchar(255),
	"synopsis" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mangas_followed" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15),
	"status" "status",
	"mal_id" integer,
	"image" text,
	"type" varchar(255),
	"title" varchar(255),
	"synopsis" text
);
