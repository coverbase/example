import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Output, object, optional, string } from "valibot";
import { AccountEntity, accounts } from "./account";
import { FileEntity, files } from "./file";
import { MemberEntity, members } from "./member";
import { RoleEntity, roles } from "./role";

export const createProjectSchema = object({
    name: string(),
});

export const updateProjectSchema = object({
    name: optional(string()),
});

export const projects = pgTable("Projects", {
    id: uuid("Id").primaryKey().defaultRandom(),
    name: varchar("Name").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

    accountId: uuid("AccountId")
        .notNull()
        .references(() => accounts.id),
});

export const projectRelations = relations(projects, ({ one, many }) => ({
    files: many(files),
    members: many(members),
    roles: many(roles),

    account: one(accounts, {
        fields: [projects.accountId],
        references: [accounts.id],
    }),
}));

export type CreateProjectRequest = Output<typeof createProjectSchema>;

export type UpdateProjectRequest = Output<typeof updateProjectSchema>;

export type ProjectEntity = InferSelectModel<typeof projects> & {
    files?: Array<FileEntity>;
    members?: Array<MemberEntity>;
    roles?: Array<RoleEntity>;
    account?: AccountEntity;
};
