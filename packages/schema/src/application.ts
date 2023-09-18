import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Output, object, optional, string } from "valibot";
import { AccountEntity, accounts } from "./account";

export const createApplicationSchema = object({
    name: string(),
});

export const updateApplicationSchema = object({
    name: optional(string()),
});

export const applications = pgTable("Applications", {
    id: uuid("Id").primaryKey().defaultRandom(),
    name: varchar("Name").notNull(),
    secret: varchar("Secret").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

    accountId: uuid("AccountId")
        .notNull()
        .references(() => accounts.id),
});

export const applicationRelations = relations(applications, ({ one }) => ({
    account: one(accounts, {
        fields: [applications.accountId],
        references: [accounts.id],
    }),
}));

export type CreateApplicationRequest = Output<typeof createApplicationSchema>;
export type UpdateApplicationRequest = Output<typeof updateApplicationSchema>;
export type ApplicationEntity = InferSelectModel<typeof applications> & {
    account?: AccountEntity;
};
