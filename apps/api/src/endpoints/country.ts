import { Hono } from "hono";
import { auth } from "../middleware/auth";
import { useDatabase } from "../utils/database";

export function mapCountryEndpoints(app: Hono) {
    app.get("/v1/countries", auth(), async (context) => {
        const database = useDatabase(context);

        const countries = await database.query.countries.findMany();

        return context.json(countries);
    });
}
