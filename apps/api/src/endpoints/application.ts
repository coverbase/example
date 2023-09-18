import { applications, createApplicationSchema, updateApplicationSchema } from "@coverbase/schema";
import { and, asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { validation } from "../middleware/validation";
import { ErrorCode, createError } from "../types/error";
import { useDatabase } from "../utils/database";

export function mapApplicationEndpoints(app: Hono) {
    app.post(
        "/v1/applications",
        auth(),
        validation("json", createApplicationSchema),
        async (context) => {
            const database = useDatabase(context);
            const session = context.get("session");
            const request = context.req.valid("json");

            const [applicationCreate] = await database
                .insert(applications)
                .values({
                    name: request.name,
                    secret: "SECRET",
                    accountId: session.accountId,
                })
                .returning();

            return context.json(applicationCreate);
        }
    );

    app.put(
        "/v1/applications/:applicationId",
        auth(),
        validation("json", updateApplicationSchema),
        async (context) => {
            const database = useDatabase(context);
            const params = context.req.param();
            const session = context.get("session");
            const request = context.req.valid("json");

            const application = await database.query.applications.findFirst({
                where: and(
                    eq(applications.id, params.applicationId),
                    eq(applications.accountId, session.accountId)
                ),
            });

            if (application) {
                const [applicationUpdate] = await database
                    .update(applications)
                    .set({
                        name: request.name,
                    })
                    .where(eq(applications.id, application.id))
                    .returning();

                return context.json(applicationUpdate);
            }

            throw createError({
                code: ErrorCode.NOT_FOUND,
            });
        }
    );

    app.delete("/v1/applications/:applicationId", auth(), async (context) => {
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const application = await database.query.applications.findFirst({
            where: and(
                eq(applications.id, params.applicationId),
                eq(applications.accountId, session.accountId)
            ),
        });

        if (application) {
            const [applicationDelete] = await database
                .delete(applications)
                .where(eq(applications.id, application.id))
                .returning();

            return context.json(applicationDelete);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/applications/:applicationId", auth(), async (context) => {
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const application = await database.query.applications.findFirst({
            where: and(
                eq(applications.id, params.applicationId),
                eq(applications.accountId, session.accountId)
            ),
            with: {
                account: true,
            },
        });

        if (application) {
            return context.json(application);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/applications", auth(), async (context) => {
        const database = useDatabase(context);
        const session = context.get("session");

        const applicationList = await database.query.applications.findMany({
            where: eq(applications.accountId, session.accountId),
            orderBy: asc(applications.created),
            with: {
                account: true,
            },
        });

        return context.json(applicationList);
    });
}
