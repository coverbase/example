import {
    accounts,
    createAccountSchema,
    sessions,
    tokens,
    updateAccountSchema,
} from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { validation } from "../middleware/validation";
import { ErrorCode, createError } from "../types/error";
import { useDatabase } from "../utils/database";

export function mapAccountEndpoints(app: Hono) {
    app.post("/v1/accounts", validation("json", createAccountSchema), async (context) => {
        const database = useDatabase(context);
        const request = context.req.valid("json");

        const account = await database.query.accounts.findFirst({
            where: eq(accounts.emailAddress, request.emailAddress),
        });

        if (account) {
            throw createError({
                code: ErrorCode.EMAIL_ALREADY_EXISTS,
            });
        }

        const [accountCreate] = await database
            .insert(accounts)
            .values({
                firstName: request.firstName,
                lastName: request.lastName,
                emailAddress: request.emailAddress,
            })
            .returning();

        return context.json(accountCreate);
    });

    app.put("/v1/accounts", auth(), validation("json", updateAccountSchema), async (context) => {
        const database = useDatabase(context);
        const session = context.get("session");
        const request = context.req.valid("json");

        const account = await database.query.accounts.findFirst({
            where: eq(accounts.id, session.accountId),
        });

        if (account) {
            const [accountUpdate] = await database
                .update(accounts)
                .set({
                    firstName: request.firstName,
                    lastName: request.lastName,
                    emailAddress: request.emailAddress,
                })
                .where(eq(accounts.id, account.id))
                .returning();

            return context.json(accountUpdate);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.delete("/v1/accounts", auth(), async (context) => {
        const database = useDatabase(context);
        const session = context.get("session");

        const account = await database.query.accounts.findFirst({
            where: eq(accounts.id, session.accountId),
        });

        if (account) {
            await database.delete(sessions).where(eq(accounts.id, account.id));
            await database.delete(tokens).where(eq(accounts.id, account.id));

            const [accountDelete] = await database
                .delete(accounts)
                .where(eq(accounts.id, account.id))
                .returning();

            return context.json(accountDelete);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/accounts", auth(), async (context) => {
        const database = useDatabase(context);
        const session = context.get("session");

        const account = await database.query.accounts.findFirst({
            where: eq(accounts.id, session.accountId),
        });

        if (account) {
            return context.json(account);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });
}
