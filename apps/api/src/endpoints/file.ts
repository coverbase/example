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
            const db = useDatabase(context);
            const { putFile } = useStorage(context);

            const { projectId } = context.req.param();
            const { sub } = context.get("auth");
            const { name, blob } = context.req.valid("form");

            const project = await db.query.projects.findFirst({
                where: and(eq(projects.id, projectId), eq(projects.accountId, sub)),
            });

            if (project) {
                const [fileCreate] = await db
                    .insert(files)
                    .values({
                        name: name,
                        type: blob?.type,
                        size: blob?.size,
                        projectId: projectId,
                    })
                    .returning();

                await putFile(fileCreate, blob);

                return context.json(fileCreate);
            }

            throw createError({
                code: ErrorCode.NOT_FOUND,
            });
        }
    );

    app.put("/v1/files/:fileId", auth(), validation("form", updateFileSchema), async (context) => {
        const db = useDatabase(context);
        const { putFile } = useStorage(context);

        const { fileId } = context.req.param();
        const { sub } = context.get("auth");
        const { name, blob } = context.req.valid("form");

        const file = await db.query.files.findFirst({
            where: eq(files.id, fileId),
        });

        if (file) {
            const [fileUpdate] = await db
                .update(files)
                .set({
                    name: name,
                    type: blob?.type,
                    size: blob?.size,
                })
                .returning();

            if (blob) {
                await putFile(fileUpdate, blob);
            }

            return context.json(fileUpdate);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.delete("/v1/files/:fileId", auth(), async (context) => {
        const db = useDatabase(context);
        const { deleteFile } = useStorage(context);

        const { fileId } = context.req.param();
        const { sub } = context.get("auth");

        const file = await db.query.files.findFirst({
            where: eq(files.id, fileId),
        });

        if (file) {
            const [fileDelete] = await db.delete(files).where(eq(files.id, file.id)).returning();

            await deleteFile(fileDelete);

            return context.json(fileDelete);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/files/:fileId", auth(), async (context) => {
        const db = useDatabase(context);

        const { fileId } = context.req.param();
        const { sub } = context.get("auth");

        const file = await db.query.files.findFirst({
            where: eq(files.id, fileId),
        });

        if (file) {
            return context.json(file);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/projects/:projectId/files", auth(), async (context) => {
        const db = useDatabase(context);

        const { projectId } = context.req.param();
        const { sub } = context.get("auth");

        const fileList = await db.query.files.findMany({
            where: eq(files.projectId, projectId),
            orderBy: asc(files.created),
        });

        return context.json(fileList);
    });
}
