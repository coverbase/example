import { SessionEntity, sessions } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { Env, Input, MiddlewareHandler } from "hono";
import { ErrorCode, createError } from "../types/error";
import { useDatabase } from "../utils/database";

declare module "hono" {
    interface ContextVariableMap {
        session: SessionEntity;
    }
}

export function auth<
    E extends Env = any,
    P extends string = any,
    I extends Input = {},
>(): MiddlewareHandler<E, P, I> {
    return async (context, next) => {
        const db = useDatabase(context);

        const header = context.req.raw.headers.get("Authorization");

        if (header) {
            const secret = header.replace(/Bearer\s+/i, "");

            const session = await db.query.sessions.findFirst({
                where: eq(sessions.secret, secret),
                with: {
                    account: true,
                },
            });

            if (session) {
                context.set("session", session);
            } else {
                throw createError({
                    code: ErrorCode.UNAUTHORIZED,
                });
            }
        }

        await next();
    };
}
