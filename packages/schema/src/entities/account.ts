import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { MemberEntity, members } from "./member";
import { ProjectEntity, projects } from "./project";
import { SessionEntity, sessions } from "./session";
import { TokenEntity, tokens } from "./token";

export const accounts = pgTable("Accounts", {
    id: uuid("Id").primaryKey().defaultRandom(),
    firstName: varchar("FirstName").notNull(),
    lastName: varchar("LastName").notNull(),
    emailAddress: varchar("EmailAddress").notNull(),
    created: timestamp("Created", { withTimezone: true }).notNull().defaultNow(),
});

export const accountRelations = relations(accounts, ({ many }) => ({
    sessions: many(sessions),
    tokens: many(tokens),
    projects: many(projects),
    members: many(members),
}));

export type AccountEntity = InferSelectModel<typeof accounts> & {
    sessions?: Array<SessionEntity>;
    tokens?: Array<TokenEntity>;
    projects?: Array<ProjectEntity>;
    members?: Array<MemberEntity>;
};
