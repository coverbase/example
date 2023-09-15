import { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable("Languages", {
    id: uuid("Id").primaryKey().defaultRandom(),
    name: varchar("Name").notNull(),
    code: varchar("Code").notNull(),
});

export type LanguageEntity = InferSelectModel<typeof languages>;
