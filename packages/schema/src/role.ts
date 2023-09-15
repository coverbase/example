import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { MemberEntity, members } from "./member";
import { ProjectEntity, projects } from "./project";

export const roles = pgTable("Roles", {
    id: uuid("Id").primaryKey().defaultRandom(),
    name: varchar("Name").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

    projectId: uuid("ProjectId")
        .notNull()
        .references(() => projects.id),
});

export const roleRelations = relations(roles, ({ many, one }) => ({
    members: many(members),

    project: one(projects, {
        fields: [roles.projectId],
        references: [projects.id],
    }),
}));

export type RoleEntity = InferSelectModel<typeof roles> & {
    members?: Array<MemberEntity>;
    project?: ProjectEntity;
};
