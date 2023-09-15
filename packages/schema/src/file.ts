import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Output, blob, object, optional, string } from "valibot";
import { ProjectEntity, projects } from "./project";

export const createFileSchema = object({
    name: string(),
    blob: blob(),
});

export const updateFileSchema = object({
    name: optional(string()),
    blob: optional(blob()),
});

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

export type CreateFileRequest = Output<typeof createFileSchema>;

export type UpdateFileRequest = Output<typeof updateFileSchema>;

export type FileEntity = InferSelectModel<typeof files> & {
    project?: ProjectEntity;
};
