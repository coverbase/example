import { Env, Input, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { ErrorCode, createError } from "../types/error";
import { JwtPayload, decode, verify } from "../utils/jwt";

declare module "hono" {
    interface ContextVariableMap {
        auth: JwtPayload;
    }
}

export function auth<
    E extends Env = any,
    P extends string = any,
    I extends Input = {},
>(): MiddlewareHandler<E, P, I> {
    return async (context, next) => {
        const { SECRET } = env(context);

        const header = context.req.headers.get("Authorization");

        if (header) {
            const token = header.replace(/Bearer\s+/i, "");
            const isValid = await verify(token, SECRET);

            if (isValid) {
                const { payload } = decode(token);

                context.set("auth", payload);
            } else {
                throw createError({
                    code: ErrorCode.UNAUTHORIZED,
                });
            }
        }

        await next();
    };
}
