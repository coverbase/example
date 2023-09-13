import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { accounts } from "./account";

export const projects = pgTable("Projects", {
    id: uuid("Id").primaryKey().defaultRandom(),
    name: varchar("Name").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),

    accountId: uuid("AccountId")
        .notNull()
        .references(() => accounts.id),
});

export const projectRelations = relations(projects, ({ one }) => ({
    account: one(accounts, {
        fields: [projects.accountId],
        references: [accounts.id],
    }),
}));

export type ProjectEntity = InferSelectModel<typeof projects>;
