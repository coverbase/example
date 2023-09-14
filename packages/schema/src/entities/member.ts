import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { AccountEntity, accounts } from "./account";
import { ProjectEntity, projects } from "./project";
import { RoleEntity, roles } from "./role";

export const members = pgTable("Members", {
    id: uuid("Id").primaryKey().defaultRandom(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

    roleId: uuid("RoleId")
        .notNull()
        .references(() => roles.id),

    accountId: uuid("AccountId")
        .notNull()
        .references(() => accounts.id),

    projectId: uuid("ProjectId")
        .notNull()
        .references(() => projects.id),
});

export const memberRelations = relations(members, ({ one }) => ({
    role: one(roles, {
        fields: [members.roleId],
        references: [roles.id],
    }),

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
    role?: RoleEntity;
    account?: AccountEntity;
    project?: ProjectEntity;
};
