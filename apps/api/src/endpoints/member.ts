import { ErrorCode, auth, createError, validation } from "@coverbase/http";
import {
    accounts,
    createMemberSchema,
    members,
    projects,
    updateMemberSchema,
} from "@coverbase/schema";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { useDatabase } from "../utils/database";

export function mapMemberEndpoints(app: Hono) {
    app.post(
        "/v1/projects/:projectId/members",
        auth(),
        validation("json", createMemberSchema),
        async (context) => {
            const db = useDatabase(context);

            const { projectId } = context.req.param();
            const { sub } = context.get("auth");
            const { emailAddress } = context.req.valid("json");

            const project = await db.query.projects.findFirst({
                where: and(eq(projects.id, projectId), eq(projects.accountId, sub)),
            });

            const account = await db.query.accounts.findFirst({
                where: eq(accounts.emailAddress, emailAddress),
            });

            if (project && account) {
                const [memberCreate] = await db
                    .insert(members)
                    .values({
                        accountId: account.id,
                        projectId: project.id,
                    })
                    .returning();

                return context.json(memberCreate);
            }

            throw createError({
                code: ErrorCode.NOT_FOUND,
            });
        }
    );

    app.put(
        "/v1/members/:memberId",
        auth(),
        validation("json", updateMemberSchema),
        async (context) => {
            const db = useDatabase(context);

            const { memberId } = context.req.param();
            const { sub } = context.get("auth");
            const {} = context.req.valid("json");

            const member = await db.query.members.findFirst({
                where: eq(members.id, memberId),
            });

            if (member) {
                const [memberUpdate] = await db
                    .update(members)
                    .set({
                        id: member.id,
                    })
                    .returning();

                return context.json(memberUpdate);
            }

            throw createError({
                code: ErrorCode.NOT_FOUND,
            });
        }
    );

    app.delete("/v1/members/:memberId", auth(), async (context) => {
        const db = useDatabase(context);

        const { memberId } = context.req.param();
        const { sub } = context.get("auth");

        const member = await db.query.members.findFirst({
            where: eq(members.id, memberId),
        });

        if (member) {
            const [memberDelete] = await db
                .delete(members)
                .where(eq(members.id, member.id))
                .returning();

            return context.json(memberDelete);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/members/:memberId", auth(), async (context) => {
        const db = useDatabase(context);

        const { memberId } = context.req.param();
        const { sub } = context.get("auth");

        const member = await db.query.members.findFirst({
            where: eq(members.id, memberId),
        });

        if (member) {
            return context.json(member);
        }

        throw createError({
            code: ErrorCode.NOT_FOUND,
        });
    });

    app.get("/v1/projects/:projectId/members", auth(), async (context) => {
        const db = useDatabase(context);

        const { projectId } = context.req.param();
        const { sub } = context.get("auth");

        const memberList = await db.query.members.findMany({
            where: eq(members.projectId, projectId),
        });

        return context.json(memberList);
    });
}
