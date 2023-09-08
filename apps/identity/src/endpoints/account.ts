import { ErrorCode, useValidatedBody } from "@coverbase/http";
import { accounts, createAccountSchema, updateAccountSchema } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { createError, eventHandler } from "h3";
import { useAccount } from "../utils/account";
import { useDatabase } from "../utils/database";

export const createAccount = eventHandler(async (event) => {
    const db = useDatabase();

    const { firstName, lastName, phoneNumber, emailAddress } = await useValidatedBody(
        event,
        createAccountSchema
    );

    const account = await db.query.accounts.findFirst({
        where: eq(accounts.emailAddress, emailAddress),
    });

    if (account) {
        throw createError({
            message: ErrorCode.EMAIL_ALREADY_EXISTS,
            status: 400,
        });
    }

    const [accountCreate] = await db
        .insert(accounts)
        .values({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            emailAddress: emailAddress,
        })
        .returning();

    return accountCreate;
});

export const updateAccount = eventHandler(async (event) => {
    const db = useDatabase();
    const account = await useAccount(event);

    const { firstName, lastName, phoneNumber, emailAddress } = await useValidatedBody(
        event,
        updateAccountSchema
    );

    if (account) {
        const [accountUpdate] = await db
            .update(accounts)
            .set({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress,
            })
            .where(eq(accounts.id, account.id))
            .returning();

        return accountUpdate;
    }

    throw createError({
        message: ErrorCode.NOT_FOUND,
        status: 404,
    });
});

export const deleteAccount = eventHandler(async (event) => {
    const db = useDatabase();
    const account = await useAccount(event);

    if (account) {
        const [accountDelete] = await db
            .delete(accounts)
            .where(eq(accounts.id, account.id))
            .returning();

        return accountDelete;
    }

    throw createError({
        message: ErrorCode.NOT_FOUND,
        status: 404,
    });
});

export const getAccount = eventHandler(async (event) => {
    return await useAccount(event);
});
