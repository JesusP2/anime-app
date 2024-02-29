ALTER TABLE "auth_user" ADD COLUMN "email" varchar(255);--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "image" varchar(191);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users__email__idx" ON "auth_user" ("email");