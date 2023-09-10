import { ErrorCode, createError, useAuth } from "@coverbase/http";
import { AccountEntity, accounts } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { Context } from "hono";
import { customAlphabet } from "nanoid";
import { useDatabase } from "./database";

export const generateToken = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 50);

export async function useAccount(context: Context): Promise<AccountEntity | undefined> {
    const db = useDatabase(context);
    const auth = await useAuth(context);

    const account = await db.query.accounts.findFirst({
        where: eq(accounts.id, auth.sub ?? ""),
    });

    if (account) {
        return account;
    }

    throw createError({
        code: ErrorCode.NOT_FOUND,
    });
}
