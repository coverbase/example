import { ErrorCode, auth, createError, validation } from "@coverbase/http";
import {
    accounts,
    createAccountSchema,
    members,
    sessions,
    tokens,
    updateAccountSchema,
} from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { useDatabase } from "../utils/database";

export function mapAccountEndpoints(app: Hono) {
    app.post("/accounts", validation("json", createAccountSchema), async (context) => {
        const db = useDatabase(context);

        const { firstName, lastName, emailAddress } = context.req.valid("json");

        const account = await db.query.accounts.findFirst({
            where: eq(accounts.emailAddress, emailAddress),
        });

        if (account) {
            throw createError({
                code: ErrorCode.EMAIL_ALREADY_EXISTS,
            });
        }

        const [accountCreate] = await db
            .insert(accounts)
            .values({
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
            })
            .returning();

        return context.json(accountCreate);
    });

    app.put("/accounts", auth(), validation("json", updateAccountSchema), async (context) => {
        const db = useDatabase(context);

        const { sub } = context.get("auth");
        const { firstName, lastName, emailAddress } = context.req.valid("json");

        const account = await db.query.accounts.findFirst({
            where: eq(accounts.id, sub),
        });

        if (account) {
            const [accountUpdate] = await db
                .update(accounts)
                .set({
                    firstName: firstName,
                    lastName: lastName,
                    emailAddress: emailAddress,
                })
                .where(eq(accounts.id, account.id))
                .returning();

            return context.json(accountUpdate);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.delete("/accounts", auth(), async (context) => {
        const db = useDatabase(context);

        const { sub } = context.get("auth");

        const account = await db.query.accounts.findFirst({
            where: eq(accounts.id, sub),
        });

        if (account) {
            await db.delete(sessions).where(eq(accounts.id, account.id));
            await db.delete(tokens).where(eq(accounts.id, account.id));
            await db.delete(members).where(eq(accounts.id, account.id));

            const [accountDelete] = await db
                .delete(accounts)
                .where(eq(accounts.id, account.id))
                .returning();

            return context.json(accountDelete);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/accounts", auth(), async (context) => {
        const db = useDatabase(context);

        const { sub } = context.get("auth");

        const account = await db.query.accounts.findFirst({
            where: eq(accounts.id, sub),
        });

        if (account) {
            return context.json(account);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });
}
