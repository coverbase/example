import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { accounts } from "./account";

export const tokens = pgTable("Tokens", {
    id: uuid("Id").primaryKey().defaultRandom(),
    name: varchar("Name").notNull(),
    secret: varchar("Secret").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

    accountId: uuid("AccountId")
        .notNull()
        .references(() => accounts.id),
});

export const tokenRelations = relations(tokens, ({ one }) => ({
    account: one(accounts, {
        fields: [tokens.accountId],
        references: [accounts.id],
    }),
}));

export type TokenEntity = InferSelectModel<typeof tokens>;
