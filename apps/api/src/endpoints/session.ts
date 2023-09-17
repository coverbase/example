import { accounts, createSessionSchema, sessions } from "@coverbase/schema";
import { and, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { validation } from "../middleware/validation";
import { ErrorCode, createError } from "../types/error";
import { generateToken } from "../utils/account";
import { useDatabase } from "../utils/database";
import { sendMail } from "../utils/mail";

export function mapSessionEndpoints(app: Hono) {
    app.post("/v1/sessions", validation("json", createSessionSchema), async (context) => {
        const database = useDatabase(context);
        const request = context.req.valid("json");

        const account = await database.query.accounts.findFirst({
            where: eq(accounts.emailAddress, request.emailAddress),
        });

        if (account) {
            const secret = generateToken();

            const [sessionCreate] = await database
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
        const database = useDatabase(context);
        const params = context.req.param();
        const auth = context.get("session");

        const session = await database.query.sessions.findFirst({
            where: and(eq(sessions.id, params.sessionId), eq(sessions.accountId, auth.accountId)),
        });

        if (session) {
            const [sessionDelete] = await database
                .delete(sessions)
                .where(eq(sessions.id, params.sessionId))
                .returning();

            return context.json(sessionDelete);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/sessions", auth(), async (context) => {
        const database = useDatabase(context);
        const session = context.get("session");

        const sessionList = await database.query.sessions.findMany({
            where: eq(sessions.accountId, session.accountId),
            orderBy: desc(sessions.created),
            columns: {
                secret: false,
            },
        });

        return context.json(sessionList);
    });
}
