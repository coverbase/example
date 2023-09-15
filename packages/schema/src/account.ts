import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Output, email, object, optional, string } from "valibot";
import { MemberEntity, members } from "./member";
import { ProjectEntity, projects } from "./project";
import { SessionEntity, sessions } from "./session";
import { TokenEntity, tokens } from "./token";

export const createAccountSchema = object({
    firstName: string(),
    lastName: string(),
    emailAddress: string([email()]),
});

export const updateAccountSchema = object({
    firstName: optional(string()),
    lastName: optional(string()),
    emailAddress: optional(string([email()])),
});

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

export type CreateAccountRequest = Output<typeof createAccountSchema>;

export type UpdateAccountRequest = Output<typeof updateAccountSchema>;

export type AccountEntity = InferSelectModel<typeof accounts> & {
    sessions?: Array<SessionEntity>;
    tokens?: Array<TokenEntity>;
    projects?: Array<ProjectEntity>;
    members?: Array<MemberEntity>;
};
