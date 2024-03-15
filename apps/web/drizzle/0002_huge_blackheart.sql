CREATE TABLE IF NOT EXISTS "anime_character" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"mal_id" integer,
	"url" text,
	"images" json,
	"name" text,
	"name_kanji" text,
	"nicknames" json,
	"favorites" integer,
	"about" text,
	"anime" json,
	"manga" json,
	"voices" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "anime_character_mal_id_unique" UNIQUE("mal_id"),
	CONSTRAINT "anime_character_url_unique" UNIQUE("url")
);
