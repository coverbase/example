import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Output, object, optional, string } from "valibot";
import { AccountEntity, accounts } from "./account";

export const createTokenSchema = object({
    name: string(),
});

export const updateTokenSchema = object({
    name: optional(string()),
});

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

export type CreateTokenRequest = Output<typeof createTokenSchema>;

export type UpdateTokenRequest = Output<typeof updateTokenSchema>;

export type TokenEntity = InferSelectModel<typeof tokens> & {
    account?: AccountEntity;
};
