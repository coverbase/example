import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { accounts } from "./account";
import { projects } from "./project";

export const members = pgTable("Members", {
    id: uuid("Id").primaryKey().defaultRandom(),

    accountId: uuid("AccountId")
        .notNull()
        .references(() => accounts.id),

    projectId: uuid("ProjectId")
        .notNull()
        .references(() => projects.id),
});

export const memberRelations = relations(members, ({ one }) => ({
    account: one(accounts, {
        fields: [members.accountId],
        references: [accounts.id],
    }),

    project: one(projects, {
        fields: [members.projectId],
        references: [projects.id],
    }),
}));

export type MemberEntity = InferSelectModel<typeof members>;
