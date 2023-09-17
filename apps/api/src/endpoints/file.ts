import { createFileSchema, files, projects, updateFileSchema } from "@coverbase/schema";
import { and, asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { validation } from "../middleware/validation";
import { ErrorCode, createError } from "../types/error";
import { useDatabase } from "../utils/database";
import { useStorage } from "../utils/storage";

export function mapFileEndpoints(app: Hono) {
    app.post(
        "/v1/projects/:projectId/files",
        auth(),
        validation("form", createFileSchema),
        async (context) => {
            const database = useDatabase(context);
            const storage = useStorage(context);
            const params = context.req.param();
            const session = context.get("session");
            const request = context.req.valid("form");

            const project = await database.query.projects.findFirst({
                where: and(
                    eq(projects.id, params.projectId),
                    eq(projects.accountId, session.accountId)
                ),
            });

            if (project) {
                const [fileCreate] = await database
                    .insert(files)
                    .values({
                        name: request.name,
                        type: request.blob?.type,
                        size: request.blob?.size,
                        projectId: params.projectId,
                    })
                    .returning();

                await storage.createOrUpdateFile(fileCreate, request.blob);

                return context.json(fileCreate);
            }

            throw createError({
                code: ErrorCode.NOT_FOUND,
            });
        }
    );

    app.put("/v1/files/:fileId", auth(), validation("form", updateFileSchema), async (context) => {
        const database = useDatabase(context);
        const storage = useStorage(context);
        const params = context.req.param();
        const session = context.get("session");
        const request = context.req.valid("form");

        const file = await database.query.files.findFirst({
            where: eq(files.id, params.fileId),
        });

        if (file) {
            const [fileUpdate] = await database
                .update(files)
                .set({
                    name: request.name,
                    type: request.blob?.type,
                    size: request.blob?.size,
                })
                .returning();

            if (request.blob) {
                await storage.createOrUpdateFile(fileUpdate, request.blob);
            }

            return context.json(fileUpdate);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.delete("/v1/files/:fileId", auth(), async (context) => {
        const database = useDatabase(context);
        const storage = useStorage(context);
        const params = context.req.param();
        const session = context.get("session");

        const file = await database.query.files.findFirst({
            where: eq(files.id, params.fileId),
        });

        if (file) {
            const [fileDelete] = await database
                .delete(files)
                .where(eq(files.id, file.id))
                .returning();

            await storage.deleteFile(fileDelete);

            return context.json(fileDelete);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/files/:fileId", auth(), async (context) => {
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const file = await database.query.files.findFirst({
            where: eq(files.id, params.fileId),
        });

        if (file) {
            return context.json(file);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/projects/:projectId/files", auth(), async (context) => {
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const fileList = await database.query.files.findMany({
            where: eq(files.projectId, params.projectId),
            orderBy: asc(files.created),
        });

        return context.json(fileList);
    });
}
