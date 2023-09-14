import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { AccountEntity, accounts } from "./account";
import { MemberEntity, members } from "./member";
import { RoleEntity, roles } from "./role";

export const projects = pgTable("Projects", {
    id: uuid("Id").primaryKey().defaultRandom(),
    name: varchar("Name").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

    accountId: uuid("AccountId")
        .notNull()
        .references(() => accounts.id),
});

export const projectRelations = relations(projects, ({ one, many }) => ({
    members: many(members),
    roles: many(roles),

    account: one(accounts, {
        fields: [projects.accountId],
        references: [accounts.id],
    }),
}));

export type ProjectEntity = InferSelectModel<typeof projects> & {
    members?: Array<MemberEntity>;
    roles?: Array<RoleEntity>;
    account?: AccountEntity;
};
