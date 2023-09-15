import {
    accounts,
    createMemberSchema,
    members,
    projects,
    roles,
    updateMemberSchema,
} from "@coverbase/schema";
import { and, asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { validation } from "../middleware/validation";
import { ErrorCode, createError } from "../types/error";
import { useDatabase } from "../utils/database";

export function mapMemberEndpoints(app: Hono) {
    app.post(
        "/v1/projects/:projectId/members",
        auth(),
        validation("json", createMemberSchema),
        async (context) => {
            const db = useDatabase(context);

            const { projectId } = context.req.param();
            const { accountId } = context.get("session");
            const { emailAddress, roleId } = context.req.valid("json");

            const project = await db.query.projects.findFirst({
                where: and(eq(projects.id, projectId), eq(projects.accountId, accountId)),
            });

            const role = await db.query.roles.findFirst({
                where: and(eq(projects.id, projectId), eq(roles.id, roleId)),
            });

            const account = await db.query.accounts.findFirst({
                where: eq(accounts.emailAddress, emailAddress),
            });

            if (project && role && account) {
                const [memberCreate] = await db
                    .insert(members)
                    .values({
                        accountId: account.id,
                        projectId: project.id,
                        roleId: role.id,
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
            const { accountId } = context.get("session");
            const { roleId } = context.req.valid("json");

            const member = await db.query.members.findFirst({
                where: eq(members.id, memberId),
            });

            if (member) {
                const [memberUpdate] = await db
                    .update(members)
                    .set({
                        id: member.id,
                        roleId: roleId,
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
        const { accountId } = context.get("session");

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
        const { accountId } = context.get("session");

        const member = await db.query.members.findFirst({
            where: eq(members.id, memberId),
            with: {
                account: true,
                role: true,
            },
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
        const { accountId } = context.get("session");

        const memberList = await db.query.members.findMany({
            where: eq(members.projectId, projectId),
            orderBy: asc(members.created),
            with: {
                account: true,
                role: true,
            },
        });

        return context.json(memberList);
    });
}
