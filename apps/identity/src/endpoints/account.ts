import { ErrorCode, createError, useValidatedBody } from "@coverbase/http";
import {
    accounts,
    createAccountSchema,
    members,
    sessions,
    tokens,
    updateAccountSchema,
} from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { Handler } from "hono";
import { useAccount } from "../utils/account";
import { useDatabase } from "../utils/database";

export const createAccount: Handler = async (context) => {
    const db = useDatabase(context);

    const { firstName, lastName, emailAddress } = await useValidatedBody(
        context,
        createAccountSchema
    );

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
};

export const updateAccount: Handler = async (context) => {
    const db = useDatabase(context);
    const account = await useAccount(context);

    const { firstName, lastName, emailAddress } = await useValidatedBody(
        context,
        updateAccountSchema
    );

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
};

export const deleteAccount: Handler = async (context) => {
    const db = useDatabase(context);
    const account = await useAccount(context);

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
};

export const getAccount: Handler = async (context) => {
    const account = await useAccount(context);

    return context.json(account);
};
