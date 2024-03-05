ALTER TABLE "auth_user" RENAME COLUMN "image" TO "avatar_image";--> statement-breakpoint
ALTER TABLE "auth_user" ADD CONSTRAINT "auth_user_email_unique" UNIQUE("email");