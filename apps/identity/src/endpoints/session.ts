import { ErrorCode, env, useValidatedBody } from "@coverbase/http";
import { sign } from "@coverbase/jwt";
import { accounts, createSessionSchema, sessions } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { createError, eventHandler, getQuery } from "h3";
import { generateToken } from "../utils/account";
import { useDatabase } from "../utils/database";
import { sendMail } from "../utils/mail";

export const createSession = eventHandler(async (event) => {
    const db = useDatabase(event);

    const { emailAddress } = await useValidatedBody(event, createSessionSchema);

    const account = await db.query.accounts.findFirst({
        where: eq(accounts.emailAddress, emailAddress),
    });

    if (account) {
        const token = generateToken();

        const [sessionCreate] = await db
            .insert(sessions)
            .values({
                token: token,
                accountId: account.id,
            })
            .returning();

        const params = new URLSearchParams({
            email: account.emailAddress,
            token: sessionCreate.token,
        });

        const redirect = "http://127.0.0.1:3000/#/session" + "?" + params.toString();
        const html = `<a href="${redirect}">${redirect}</a>`;

        await sendMail(event, account.emailAddress, "Authentication Code", html);

        return "Success";
    }

    throw createError({
        message: ErrorCode.NOT_FOUND,
        status: 404,
    });
});

export const getSession = eventHandler(async (event) => {
    const db = useDatabase(event);
    const { SECRET } = env(event);

    const { email, token } = getQuery<{
        email: string;
        token: string;
    }>(event);

    const session = await db.query.sessions.findFirst({
        where: eq(sessions.token, token),
        with: {
            account: true,
        },
    });

    if (session && session.account.emailAddress === email) {
        await db.delete(sessions).where(eq(sessions.token, token));

        return await sign(
            {
                sub: session.account.id,
                firstName: session.account.firstName,
                lastName: session.account.lastName,
                email: session.account.emailAddress,
            },
            SECRET
        );
    }

    throw createError({
        message: ErrorCode.NOT_FOUND,
        status: 404,
    });
});
