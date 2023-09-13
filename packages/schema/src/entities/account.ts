import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { projects } from "./project";
import { sessions } from "./session";
import { tokens } from "./token";

export const accounts = pgTable("Accounts", {
    id: uuid("Id").primaryKey().defaultRandom(),
    firstName: varchar("FirstName").notNull(),
    lastName: varchar("LastName").notNull(),
    emailAddress: varchar("EmailAddress").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),
});

export const accountRelations = relations(accounts, ({ many }) => ({
    sessions: many(sessions),
    tokens: many(tokens),
    projects: many(projects),
}));

export type AccountEntity = InferSelectModel<typeof accounts>;
