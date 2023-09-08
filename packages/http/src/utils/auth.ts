import { decode, verify } from "@coverbase/jwt";
import { H3Event, createError } from "h3";
import { ErrorCode } from "../types";

export async function useAuth(event: H3Event) {
    const header = event.headers.get("Authorization");

    if (header) {
        const token = header.replace(/Bearer\s+/i, "");
        const isValid = await verify(token, process.env.SECRET!);

        if (isValid) {
            const { payload } = decode(token);

            return payload;
        }
    }

    throw createError({
        message: ErrorCode.UNAUTHORIZED,
        status: 401,
    });
}
