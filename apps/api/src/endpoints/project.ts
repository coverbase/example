import {
    createProjectSchema,
    members,
    projects,
    roles,
    updateProjectSchema,
} from "@coverbase/schema";
import { and, asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { validation } from "../middleware/validation";
import { ErrorCode, createError } from "../types/error";
import { useDatabase } from "../utils/database";

export function mapProjectEndpoints(app: Hono) {
    app.post("/v1/projects", auth(), validation("json", createProjectSchema), async (context) => {
        const database = useDatabase(context);
        const session = context.get("session");
        const request = context.req.valid("json");

        const [projectCreate] = await database
            .insert(projects)
            .values({
                name: request.name,
                accountId: session.accountId,
            })
            .returning();

        const [roleCreate] = await database
            .insert(roles)
            .values({
                name: "Admin",
                projectId: projectCreate.id,
            })
            .returning();

        await database.insert(members).values({
            accountId: session.accountId,
            projectId: projectCreate.id,
            roleId: roleCreate.id,
        });

        return context.json(projectCreate);
    });

    app.put(
        "/v1/projects/:projectId",
        auth(),
        validation("json", updateProjectSchema),
        async (context) => {
            const database = useDatabase(context);
            const params = context.req.param();
            const session = context.get("session");
            const request = context.req.valid("json");

            const project = await database.query.projects.findFirst({
                where: and(
                    eq(projects.id, params.projectId),
                    eq(projects.accountId, session.accountId)
                ),
            });

            if (project) {
                const [projectUpdate] = await database
                    .update(projects)
                    .set({
                        name: request.name,
                    })
                    .where(eq(projects.id, project.id))
                    .returning();

                return context.json(projectUpdate);
            }

            throw createError({
                code: ErrorCode.NOT_FOUND,
            });
        }
    );

    app.delete("/v1/projects/:projectId", auth(), async (context) => {
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const project = await database.query.projects.findFirst({
            where: and(
                eq(projects.id, params.projectId),
                eq(projects.accountId, session.accountId)
            ),
        });

        if (project) {
            const [projectDelete] = await database
                .delete(projects)
                .where(eq(projects.id, project.id))
                .returning();

            return context.json(projectDelete);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/projects/:projectId", auth(), async (context) => {
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const project = await database.query.projects.findFirst({
            where: and(
                eq(projects.id, params.projectId),
                eq(projects.accountId, session.accountId)
            ),
            with: {
                account: true,
            },
        });

        if (project) {
            return context.json(project);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/projects", auth(), async (context) => {
        const database = useDatabase(context);
        const session = context.get("session");

        const projectList = await database.query.projects.findMany({
            where: eq(projects.accountId, session.accountId),
            orderBy: asc(projects.created),
            with: {
                account: true,
            },
        });

        return context.json(projectList);
    });
}
