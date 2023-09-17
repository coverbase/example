import { createTokenSchema, tokens, updateTokenSchema } from "@coverbase/schema";
import { and, asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { validation } from "../middleware/validation";
import { ErrorCode, createError } from "../types/error";
import { generateToken } from "../utils/account";
import { useDatabase } from "../utils/database";

export function mapTokenEndpoints(app: Hono) {
    app.post("/v1/tokens", auth(), validation("json", createTokenSchema), async (context) => {
        const database = useDatabase(context);
        const session = context.get("session");
        const request = context.req.valid("json");

        const [tokenCreate] = await database
            .insert(tokens)
            .values({
                name: request.name,
                secret: generateToken(),
                accountId: session.accountId,
            })
            .returning();

        return context.json(tokenCreate);
    });

    app.put(
        "/v1/tokens/:tokenId",
        auth(),
        validation("json", updateTokenSchema),
        async (context) => {
            const database = useDatabase(context);
            const params = context.req.param();
            const session = context.get("session");
            const request = context.req.valid("json");

            const token = await database.query.tokens.findFirst({
                where: and(eq(tokens.id, params.tokenId), eq(tokens.accountId, session.accountId)),
                columns: {
                    secret: false,
                },
            });

            if (token) {
                const [tokenUpdate] = await database
                    .update(tokens)
                    .set({
                        name: request.name,
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
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const token = await database.query.tokens.findFirst({
            where: and(eq(tokens.id, params.tokenId), eq(tokens.accountId, session.accountId)),
            columns: {
                secret: false,
            },
        });

        if (token) {
            const [tokenDelete] = await database
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
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const token = await database.query.tokens.findFirst({
            where: and(eq(tokens.id, params.tokenId), eq(tokens.accountId, session.accountId)),
            with: {
                account: true,
            },
            columns: {
                secret: false,
            },
        });

        if (token) {
            return context.json(token);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/tokens", auth(), async (context) => {
        const database = useDatabase(context);
        const session = context.get("session");

        const tokenList = await database.query.tokens.findMany({
            where: and(eq(tokens.accountId, session.accountId)),
            orderBy: asc(tokens.created),
            with: {
                account: true,
            },
            columns: {
                secret: false,
            },
        });

        return context.json(tokenList);
    });
}
