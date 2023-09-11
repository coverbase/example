import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { members } from "./member";

export const organizations = pgTable("Organizations", {
    id: uuid("Id").primaryKey().defaultRandom(),
    name: varchar("Name").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),
});

export const organizationRelations = relations(organizations, ({ many }) => ({
    members: many(members),
}));

export type OrganizationEntity = InferSelectModel<typeof organizations>;
