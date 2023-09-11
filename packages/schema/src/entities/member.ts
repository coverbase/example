import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { accounts } from "./account";
import { organizations } from "./organization";

export const members = pgTable("Members", {
    id: uuid("Id").primaryKey().defaultRandom(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

    accountId: uuid("AccountId")
        .notNull()
        .references(() => accounts.id),

    organizationId: uuid("OrganizationId")
        .notNull()
        .references(() => organizations.id),
});

export const memberRelations = relations(members, ({ one }) => ({
    account: one(accounts, {
        fields: [members.accountId],
        references: [accounts.id],
    }),

    organization: one(organizations, {
        fields: [members.organizationId],
        references: [organizations.id],
    }),
}));

export type MemberEntity = InferSelectModel<typeof members>;
