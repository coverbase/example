import { auth } from "@coverbase/http";
import { Hono } from "hono";
import { useDatabase } from "../utils/database";

export function mapCountryEndpoints(app: Hono) {
    app.get("/v1/countries", auth(), async (context) => {
        const db = useDatabase(context);

        const countries = await db.query.countries.findMany();

        return context.json(countries);
    });
}
