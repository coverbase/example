import { accounts, createSessionSchema, sessions } from "@coverbase/schema";
import { and, asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { validation } from "../middleware/validation";
import { ErrorCode, createError } from "../types/error";
import { generateToken } from "../utils/account";
import { useDatabase } from "../utils/database";
import { sendMail } from "../utils/mail";

export function mapSessionEndpoints(app: Hono) {
    app.post("/v1/sessions", validation("json", createSessionSchema), async (context) => {
        const db = useDatabase(context);

        const { emailAddress } = context.req.valid("json");

        const account = await db.query.accounts.findFirst({
            where: eq(accounts.emailAddress, emailAddress),
        });

        if (account) {
            const secret = generateToken();

            const [sessionCreate] = await db
                .insert(sessions)
                .values({
                    secret: secret,
                    accountId: account.id,
                })
                .returning();

            const redirect = `http://localhost:3000/sessions/${sessionCreate.secret}`;
            const html = `<a href="${redirect}">${redirect}</a>`;

            await sendMail(context, account.emailAddress, "Authentication Code", html);

            return context.text("Success", 200);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.delete("/v1/sessions/:sessionId", auth(), async (context) => {
        const db = useDatabase(context);

        const { sessionId } = context.req.param();
        const { accountId } = context.get("session");

        const session = await db.query.sessions.findFirst({
            where: and(eq(sessions.id, sessionId), eq(sessions.accountId, accountId)),
        });

        if (session) {
            const [sessionDelete] = await db
                .delete(sessions)
                .where(eq(sessions.id, sessionId))
                .returning();

            return context.json(sessionDelete);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/sessions", auth(), async (context) => {
        const db = useDatabase(context);

        const { accountId } = context.get("session");

        const sessionList = await db.query.sessions.findMany({
            where: eq(sessions.accountId, accountId),
            orderBy: asc(sessions.created),
            columns: {
                secret: false,
            },
        });

        return context.json(sessionList);
    });
}
