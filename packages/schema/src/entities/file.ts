import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { ProjectEntity, projects } from "./project";

export const files = pgTable("Files", {
    id: uuid("Id").primaryKey().defaultRandom(),
    name: varchar("Name").notNull(),
    type: varchar("Type").notNull(),
    size: integer("Size").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

    projectId: uuid("ProjectId")
        .notNull()
        .references(() => projects.id),
});

export const fileRelations = relations(files, ({ one }) => ({
    project: one(projects, {
        fields: [files.projectId],
        references: [projects.id],
    }),
}));

export type FileEntity = InferSelectModel<typeof files> & {
    project?: ProjectEntity;
};
