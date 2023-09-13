import { ErrorCode, auth, createError, validation } from "@coverbase/http";
import { createTokenSchema, tokens, updateTokenSchema } from "@coverbase/schema";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { generateToken } from "../utils/account";
import { useDatabase } from "../utils/database";

export function mapTokenEndpoints(app: Hono) {
    app.post("/v1/tokens", auth(), validation("json", createTokenSchema), async (context) => {
        const db = useDatabase(context);

        const { sub } = context.get("auth");
        const { name } = context.req.valid("json");

        const [tokenCreate] = await db
            .insert(tokens)
            .values({
                name: name,
                secret: generateToken(),
                accountId: sub,
            })
            .returning();

        return context.json(tokenCreate);
    });

    app.put(
        "/v1/tokens/:tokenId",
        auth(),
        validation("json", updateTokenSchema),
        async (context) => {
            const db = useDatabase(context);

            const { tokenId } = context.req.param();
            const { sub } = context.get("auth");
            const { name } = context.req.valid("json");

            const token = await db.query.tokens.findFirst({
                where: and(eq(tokens.id, tokenId), eq(tokens.accountId, sub)),
            });

            if (token) {
                const [tokenUpdate] = await db
                    .update(tokens)
                    .set({
                        name: name,
                    })
                    .where(eq(tokens.id, token.id))
                    .returning();

                return context.json(tokenUpdate);
            }

            throw createError({
                code: ErrorCode.NOT_FOUND,
            });
        }
    );

    app.delete("/v1/tokens/:tokenId", auth(), async (context) => {
        const db = useDatabase(context);

        const { tokenId } = context.req.param();
        const { sub } = context.get("auth");

        const token = await db.query.tokens.findFirst({
            where: and(eq(tokens.id, tokenId), eq(tokens.accountId, sub)),
        });

        if (token) {
            const [tokenDelete] = await db
                .delete(tokens)
                .where(eq(tokens.id, token.id))
                .returning();

            return context.json(tokenDelete);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/tokens/:tokenId", auth(), async (context) => {
        const db = useDatabase(context);

        const { tokenId } = context.req.param();
        const { sub } = context.get("auth");

        const token = await db.query.tokens.findFirst({
            where: and(eq(tokens.id, tokenId), eq(tokens.accountId, sub)),
        });

        if (token) {
            return context.json(token);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/tokens", auth(), async (context) => {
        const db = useDatabase(context);

        const { sub } = context.get("auth");

        const tokenList = await db.query.tokens.findMany({
            where: and(eq(tokens.accountId, sub)),
        });

        return context.json(tokenList);
    });
}
