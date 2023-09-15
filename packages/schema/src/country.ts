import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const countries = pgTable("Countries", {
    id: uuid("Id").primaryKey().defaultRandom(),
    name: varchar("Name").notNull(),
    code: varchar("Code").notNull(),
    numeric: integer("Numeric").notNull(),
});

export type CountryEntity = InferSelectModel<typeof countries>;
