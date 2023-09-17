import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { useDatabase } from "../utils/database";

export function mapLanguageEndpoints(app: Hono) {
    app.get("/v1/languages", auth(), async (context) => {
        const database = useDatabase(context);

        const languages = await database.query.languages.findMany();

        return context.json(languages);
    });
}
