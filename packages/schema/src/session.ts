import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { Output, email, object, string } from "valibot";
import { AccountEntity, accounts } from "./account";

export const createSessionSchema = object({
    emailAddress: string([email()]),
});

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

export type CreateSessionRequest = Output<typeof createSessionSchema>;

export type SessionEntity = InferSelectModel<typeof sessions> & {
    account?: AccountEntity;
};
