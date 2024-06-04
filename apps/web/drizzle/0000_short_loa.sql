CREATE TABLE `anime_anime` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`mal_id` integer,
	`url` text,
	`images` text,
	`trailer` text,
	`approved` integer,
	`titles` text,
	`type` text(255),
	`source` text(255),
	`episodes` integer,
	`status` text(255),
	`airing` integer,
	`aired` text,
	`duration` text(255),
	`rating` text(255),
	`score` integer,
	`scored_by` integer,
	`rank` integer,
	`popularity` integer,
	`members` integer,
	`favorites` integer,
	`synopsis` text,
	`background` text,
	`season` text(255),
	`year` integer,
	`broadcast` text,
	`producers` text,
	`licensors` text,
	`studios` text,
	`genres` text,
	`explicit_genres` text,
	`themes` text,
	`demographics` text,
	`relations` text,
	`theme` text,
	`external` text,
	`streaming` text,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `anime_character` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`mal_id` integer,
	`url` text,
	`images` text,
	`name` text,
	`name_kanji` text,
	`nicknames` text,
	`favorites` integer,
	`about` text,
	`anime` text,
	`manga` text,
	`voices` text,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `anime_entity_actions_tracker` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`tracked_entity_id` text(255),
	`operation` text(255) NOT NULL,
	`action_time` text,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `anime_user_key` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(64) NOT NULL,
	`hashed_password` text(255),
	FOREIGN KEY (`user_id`) REFERENCES `anime_auth_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `anime_user_session` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`user_id` text(64) NOT NULL,
	`active_expires` integer NOT NULL,
	`idle_expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `anime_auth_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `anime_tracked_entity` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(64) NOT NULL,
	`user_type` text NOT NULL,
	`entity_status` text(255) NOT NULL,
	`mal_id` integer NOT NULL,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `anime_auth_user` (
	`id` text(15) PRIMARY KEY NOT NULL,
	`email` text(255),
	`username` text(30),
	`role` text(255),
	`avatar_image` text(191)
);
--> statement-breakpoint
CREATE TABLE `anime_manga` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`mal_id` integer,
	`url` text(255),
	`images` text,
	`approved` integer,
	`titles` text,
	`title_synonyms` text,
	`type` text(255),
	`chapters` integer,
	`volumes` integer,
	`status` text(255),
	`publishing` integer,
	`published` text,
	`score` integer,
	`scored_by` integer,
	`rank` integer,
	`popularity` integer,
	`members` integer,
	`favorites` integer,
	`synopsis` text,
	`background` text,
	`authors` text,
	`serializations` text,
	`genres` text,
	`explicit_genres` text,
	`themes` text,
	`demographics` text,
	`relations` text,
	`external` text,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `anime_character_mal_id_unique` ON `anime_character` (`mal_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `anime_character_url_unique` ON `anime_character` (`url`);--> statement-breakpoint
CREATE UNIQUE INDEX `anime_auth_user_email_unique` ON `anime_auth_user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users__email__idx` ON `anime_auth_user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users__username__idx` ON `anime_auth_user` (`username`);