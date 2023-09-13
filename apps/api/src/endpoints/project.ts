import { ErrorCode, auth, createError, validation } from "@coverbase/http";
import { createProjectSchema, projects, updateProjectSchema } from "@coverbase/schema";
import { and, asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { useDatabase } from "../utils/database";

export function mapProjectEndpoints(app: Hono) {
    app.post("/v1/projects", auth(), validation("json", createProjectSchema), async (context) => {
        const db = useDatabase(context);

        const { sub } = context.get("auth");
        const { name } = context.req.valid("json");

        const [projectCreate] = await db
            .insert(projects)
            .values({
                name: name,
                accountId: sub,
            })
            .returning();

        return context.json(projectCreate);
    });

    app.put(
        "/v1/projects/:projectId",
        auth(),
        validation("json", updateProjectSchema),
        async (context) => {
            const db = useDatabase(context);

            const { projectId } = context.req.param();
            const { sub } = context.get("auth");
            const { name } = context.req.valid("json");

            const project = await db.query.projects.findFirst({
                where: and(eq(projects.id, projectId), eq(projects.accountId, sub)),
            });

            if (project) {
                const [projectUpdate] = await db
                    .update(projects)
                    .set({
                        name: name,
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
        const db = useDatabase(context);

        const { projectId } = context.req.param();
        const { sub } = context.get("auth");

        const project = await db.query.projects.findFirst({
            where: and(eq(projects.id, projectId), eq(projects.accountId, sub)),
        });

        if (project) {
            const [projectDelete] = await db
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
        const db = useDatabase(context);

        const { projectId } = context.req.param();
        const { sub } = context.get("auth");

        const project = await db.query.projects.findFirst({
            where: and(eq(projects.id, projectId), eq(projects.accountId, sub)),
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
        const db = useDatabase(context);

        const { sub } = context.get("auth");

        const projectList = await db.query.projects.findMany({
            where: eq(projects.accountId, sub),
            orderBy: asc(projects.created),
            with: {
                account: true,
            },
        });

        return context.json(projectList);
    });
}
