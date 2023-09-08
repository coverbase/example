import { useValidatedBody } from "@coverbase/http";
import { ErrorCode, accounts, createAccountSchema, updateAccountSchema } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { createError, eventHandler, sendError } from "h3";
import { useAuth } from "../utils/auth";
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
        sendError(
            event,
            createError({
                message: ErrorCode.EMAIL_ALREADY_EXISTS,
                status: 400,
            })
        );
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
    const account = await useAuth(event);

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

    sendError(
        event,
        createError({
            message: ErrorCode.NOT_FOUND,
            status: 404,
        })
    );
});

export const deleteAccount = eventHandler(async (event) => {
    const db = useDatabase();
    const account = await useAuth(event);

    if (account) {
        const [accountDelete] = await db
            .delete(accounts)
            .where(eq(accounts.id, account.id))
            .returning();

        return accountDelete;
    }

    sendError(
        event,
        createError({
            message: ErrorCode.NOT_FOUND,
            status: 404,
        })
    );
});

export const getAccount = eventHandler(async (event) => {
    return await useAuth(event);
});
