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

            const role = await database.query.roles.findFirst({
                where: and(eq(projects.id, params.projectId), eq(roles.id, request.roleId)),
            });

            const account = await database.query.accounts.findFirst({
                where: eq(accounts.emailAddress, request.emailAddress),
            });

            if (project && role && account) {
                const [memberCreate] = await database
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
            const database = useDatabase(context);
            const params = context.req.param();
            const session = context.get("session");
            const request = context.req.valid("json");

            const member = await database.query.members.findFirst({
                where: eq(members.id, params.memberId),
            });

            if (member) {
                const [memberUpdate] = await database
                    .update(members)
                    .set({
                        id: member.id,
                        roleId: request.roleId,
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
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const member = await database.query.members.findFirst({
            where: eq(members.id, params.memberId),
        });

        if (member) {
            const [memberDelete] = await database
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
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const member = await database.query.members.findFirst({
            where: eq(members.id, params.memberId),
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
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const memberList = await database.query.members.findMany({
            where: eq(members.projectId, params.projectId),
            orderBy: asc(members.created),
            with: {
                account: true,
                role: true,
            },
        });

        return context.json(memberList);
    });
}
