CREATE TABLE IF NOT EXISTS "Members" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"AccountId" uuid NOT NULL,
	"ProjectId" uuid NOT NULL
);
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
