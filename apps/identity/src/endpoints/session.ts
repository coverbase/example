import { ErrorCode, createError, useValidatedBody } from "@coverbase/http";
import { sign } from "@coverbase/jwt";
import { accounts, createSessionSchema, sessions } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { Handler } from "hono";
import { env } from "hono/adapter";
import { generateToken } from "../utils/account";
import { useDatabase } from "../utils/database";
import { sendMail } from "../utils/mail";

export const createSession: Handler = async (context) => {
    const db = useDatabase(context);

    const { emailAddress } = await useValidatedBody(context, createSessionSchema);

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

        const redirect = `http://localhost:3000/session/${sessionCreate.token}`;
        const html = `<a href="${redirect}">${redirect}</a>`;

        await sendMail(context, account.emailAddress, "Authentication Code", html);

        return context.text("Success", 200);
    }

    throw createError({
        code: ErrorCode.NOT_FOUND,
    });
};

export const getSession: Handler = async (context) => {
    const db = useDatabase(context);
    const { SECRET } = env(context);

    const { sessionId } = context.req.param();

    const session = await db.query.sessions.findFirst({
        where: eq(sessions.token, sessionId),
        with: {
            account: true,
        },
    });

    if (session) {
        await db.delete(sessions).where(eq(sessions.token, sessionId));

        const accessToken = await sign(
            {
                sub: session.account.id,
                firstName: session.account.firstName,
                lastName: session.account.lastName,
                email: session.account.emailAddress,
            },
            SECRET
        );

        return context.text(accessToken);
    }

    throw createError({
        code: ErrorCode.NOT_FOUND,
    });
};
