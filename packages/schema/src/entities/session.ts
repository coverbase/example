import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { accounts } from "./account";

export const sessions = pgTable("Session", {
    id: uuid("Id").primaryKey().defaultRandom(),
    token: varchar("Token").notNull(),

    accountId: uuid("AccountId")
        .notNull()
        .references(() => accounts.id),
});

export const sessionRelations = relations(sessions, ({ one }) => ({
    account: one(accounts, {
        fields: [sessions.accountId],
        references: [accounts.id],
    }),
}));

export type SessionEntity = InferSelectModel<typeof sessions>;
