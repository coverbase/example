CREATE TABLE IF NOT EXISTS "Countries" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Code" varchar NOT NULL,
	"Numeric" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Languages" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Code" varchar NOT NULL
);
