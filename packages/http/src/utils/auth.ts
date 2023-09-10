import { decode, verify } from "@coverbase/jwt";
import { Context } from "hono";
import { env } from "hono/adapter";
import { ErrorCode, createError } from "../types";

export async function useAuth(context: Context) {
    const { SECRET } = env(context);

    const header = context.req.headers.get("Authorization");

    if (header) {
        const token = header.replace(/Bearer\s+/i, "");
        const isValid = await verify(token, SECRET);

        if (isValid) {
            const { payload } = decode(token);

            return payload;
        }
    }

    throw createError({
        code: ErrorCode.UNAUTHORIZED,
    });
}
