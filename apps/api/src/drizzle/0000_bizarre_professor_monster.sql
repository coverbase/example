CREATE TABLE IF NOT EXISTS "Accounts" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"FirstName" varchar NOT NULL,
	"LastName" varchar NOT NULL,
	"EmailAddress" varchar NOT NULL,
	"Created" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Applications" (
	"Id" uuid NOT NULL,
	"Name" varchar NOT NULL,
	"Secret" varchar NOT NULL,
	"Created" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Countries" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Code" varchar NOT NULL,
	"Numeric" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Files" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Type" varchar NOT NULL,
	"Size" integer NOT NULL,
	"Created" timestamp with time zone DEFAULT now() NOT NULL,
	"ProjectId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Languages" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Code" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Members" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Created" timestamp with time zone DEFAULT now() NOT NULL,
	"RoleId" uuid NOT NULL,
	"AccountId" uuid NOT NULL,
	"ProjectId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Projects" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Created" timestamp with time zone DEFAULT now() NOT NULL,
	"AccountId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Roles" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Created" timestamp with time zone DEFAULT now() NOT NULL,
	"ProjectId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Session" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Secret" varchar NOT NULL,
	"Created" timestamp with time zone DEFAULT now() NOT NULL,
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
 ALTER TABLE "Applications" ADD CONSTRAINT "Applications_Id_Accounts_Id_fk" FOREIGN KEY ("Id") REFERENCES "Accounts"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Files" ADD CONSTRAINT "Files_ProjectId_Projects_Id_fk" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Members" ADD CONSTRAINT "Members_RoleId_Roles_Id_fk" FOREIGN KEY ("RoleId") REFERENCES "Roles"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Members" ADD CONSTRAINT "Members_AccountId_Accounts_Id_fk" FOREIGN KEY ("AccountId") REFERENCES "Accounts"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Members" ADD CONSTRAINT "Members_ProjectId_Projects_Id_fk" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Projects" ADD CONSTRAINT "Projects_AccountId_Accounts_Id_fk" FOREIGN KEY ("AccountId") REFERENCES "Accounts"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Roles" ADD CONSTRAINT "Roles_ProjectId_Projects_Id_fk" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
