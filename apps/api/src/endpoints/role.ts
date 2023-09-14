import { roles } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { useDatabase } from "../utils/database";

export function mapRoleEndpoints(app: Hono) {
    app.get("/projects/:projectId/roles", auth(), async (context) => {
        const db = useDatabase(context);

        const { projectId } = context.req.param();
        const { sub } = context.get("auth");

        const roleList = await db.query.roles.findMany({
            where: eq(roles.projectId, projectId),
        });

        return context.json(roleList);
    });
}
