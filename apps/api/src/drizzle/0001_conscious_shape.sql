CREATE TABLE IF NOT EXISTS "Files" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Type" varchar NOT NULL,
	"Size" integer NOT NULL,
	"Created" timestamp with time zone DEFAULT now() NOT NULL,
	"ProjectId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Files" ADD CONSTRAINT "Files_ProjectId_Projects_Id_fk" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
