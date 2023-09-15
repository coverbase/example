import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Output, email, object, string } from "valibot";
import { AccountEntity, accounts } from "./account";

export const createSessionSchema = object({
    emailAddress: string([email()]),
});

export const sessions = pgTable("Session", {
    id: uuid("Id").primaryKey().defaultRandom(),
    secret: varchar("Secret").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

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
