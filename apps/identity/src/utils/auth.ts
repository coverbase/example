import { decode, verify } from "@coverbase/jwt";
import { AccountEntity, accounts } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { H3Event, createError, sendError } from "h3";
import { customAlphabet } from "nanoid";
import { useDatabase } from "./database";

export const generateToken = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 50);

export async function useAuth(event: H3Event): Promise<AccountEntity | undefined> {
    const db = useDatabase();

    const header = event.headers.get("Authorization");

    if (header) {
        const token = header.replace(/Bearer\s+/i, "");
        const isValid = await verify(token, process.env.SECRET!);

        if (isValid) {
            const { payload } = decode(token);

            const account = await db.query.accounts.findFirst({
                where: eq(accounts.id, payload.sub ?? ""),
            });

            if (account) {
                return account;
            }
        }
    }

    sendError(
        event,
        createError({
            message: "UNAUTHORIZED",
            status: 401,
        })
    );
}
