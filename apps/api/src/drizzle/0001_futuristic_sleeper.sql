ALTER TABLE "Applications" DROP CONSTRAINT "Applications_Id_Accounts_Id_fk";
--> statement-breakpoint
ALTER TABLE "Applications" ADD PRIMARY KEY ("Id");--> statement-breakpoint
ALTER TABLE "Applications" ALTER COLUMN "Id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "Applications" ADD COLUMN "AccountId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Applications" ADD CONSTRAINT "Applications_AccountId_Accounts_Id_fk" FOREIGN KEY ("AccountId") REFERENCES "Accounts"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
