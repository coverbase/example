import { roles } from "@coverbase/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { useDatabase } from "../utils/database";

export function mapRoleEndpoints(app: Hono) {
    app.get("/projects/:projectId/roles", auth(), async (context) => {
        const database = useDatabase(context);
        const params = context.req.param();
        const session = context.get("session");

        const roleList = await database.query.roles.findMany({
            where: eq(roles.projectId, params.projectId),
        });

        return context.json(roleList);
    });
}
