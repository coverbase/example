import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { sessions } from "./session";

export const accounts = pgTable("Accounts", {
    id: uuid("Id").primaryKey().defaultRandom(),
    firstName: varchar("FirstName"),
    lastName: varchar("LastName"),
    emailAddress: varchar("EmailAddress").notNull(),
    phoneNumber: varchar("PhoneNumber"),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),
});

export const accountRelations = relations(accounts, ({ many }) => ({
    sessions: many(sessions),
}));

export type AccountEntity = InferSelectModel<typeof accounts>;
