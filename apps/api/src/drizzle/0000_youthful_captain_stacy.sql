CREATE TABLE IF NOT EXISTS "Accounts" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"FirstName" varchar NOT NULL,
	"LastName" varchar NOT NULL,
	"EmailAddress" varchar NOT NULL,
	"Created" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Session" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Token" varchar NOT NULL,
	"AccountId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tokens" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Secret" varchar NOT NULL,
	"Created" timestamp with time zone DEFAULT now() NOT NULL,
	"AccountId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Session" ADD CONSTRAINT "Session_AccountId_Accounts_Id_fk" FOREIGN KEY ("AccountId") REFERENCES "Accounts"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_AccountId_Accounts_Id_fk" FOREIGN KEY ("AccountId") REFERENCES "Accounts"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
