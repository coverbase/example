import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { AccountEntity, accounts } from "./account";
import { ProjectEntity, projects } from "./project";

export const members = pgTable("Members", {
    id: uuid("Id").primaryKey().defaultRandom(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

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

export type MemberEntity = InferSelectModel<typeof members> & {
    account?: AccountEntity;
    project?: ProjectEntity;
};
