import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { useDatabase } from "../utils/database";

export function mapLanguageEndpoints(app: Hono) {
    app.get("/v1/languages", auth(), async (context) => {
        const db = useDatabase(context);

        const languages = await db.query.languages.findMany();

        return context.json(languages);
    });
}
