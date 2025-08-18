CREATE TABLE "user" (
	"email" text NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "user" USING btree (lower("email"));