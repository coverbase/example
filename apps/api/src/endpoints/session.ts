import { accounts, createSessionSchema, sessions } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { validation } from "../middleware/validation";
import { ErrorCode, createError } from "../types/error";
import { generateToken } from "../utils/account";
import { useDatabase } from "../utils/database";
import { sign } from "../utils/jwt";
import { sendMail } from "../utils/mail";

export function mapSessionEndpoints(app: Hono) {
    app.post("/v1/sessions", validation("json", createSessionSchema), async (context) => {
        const db = useDatabase(context);

        const { emailAddress } = context.req.valid("json");

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

            const redirect = `http://localhost:3000/sessions/${sessionCreate.token}`;
            const html = `<a href="${redirect}">${redirect}</a>`;

            await sendMail(context, account.emailAddress, "Authentication Code", html);

            return context.text("Success", 200);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/sessions/:sessionId", async (context) => {
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
    });
}
