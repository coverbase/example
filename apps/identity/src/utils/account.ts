import { ErrorCode, useAuth } from "@coverbase/http";
import { AccountEntity, accounts } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { H3Event, createError } from "h3";
import { customAlphabet } from "nanoid";
import { useDatabase } from "./database";

export const generateToken = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 50);

export async function useAccount(event: H3Event): Promise<AccountEntity | undefined> {
    const db = useDatabase(event);
    const auth = await useAuth(event);

    const account = await db.query.accounts.findFirst({
        where: eq(accounts.id, auth.sub ?? ""),
    });

    if (account) {
        return account;
    }

    throw createError({
        message: ErrorCode.NOT_FOUND,
        status: 404,
    });
}
